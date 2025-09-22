import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramInteractionDemoProps {
  width?: number | string;
  height?: number | string;
}

const ANIMATION_TIMINGS = {
  AUTO_START_DELAY: 2200,
  INTRO_DISPLAY_DURATION: 5500,  // Show intro text longer - slowed down
  INTRO_TRANSITION_DELAY: 2000,  // Longer pause before starting demo
  TAP_ANIMATION_DURATION: 200,  // Faster tap feedback duration
  SHEET_OPEN_DELAY: 120,  // Faster sheet response
  TYPING_START_DELAY: 600,  // Faster typing start
  TYPING_CHAR_DELAY: 80,  // Faster typing speed
  FADE_OUT_DELAY: 400,
  SUBMITTED_DELAY: 600,
  NOTIFICATION_DELAY: 800,  // Earlier notification
  NOTIFICATION_DURATION: 3000,
  NOTIFICATION_CLICK_DELAY: 600,  // Faster notification click
  // Notification should appear after the comment visibly renders
  COMMENT_APPEAR_DELAY: 150,
  COMMENT_APPEAR_ANIM_DURATION: 300,
  NOTIFICATION_AFTER_COMMENT_DELAY: 700,
  DM_PULSE_DELAY: 1800,
  DM_PULSE_DURATION: 1000,
  DM_CLICK_FLASH_DELAY: 700,
  DM_CLICK_FLASH_DURATION: 250,
  WEBSITE_OPEN_DELAY: 600,
  WEBSITE_DISPLAY_DURATION: 4000,
  SCALEDM_UPSELL_DISPLAY_DURATION: 4000,
  RESTART_DELAY: 1200,
} as const;

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const MOBILE_ANIMATION_TIMINGS = {
  ...ANIMATION_TIMINGS,
  TYPING_CHAR_DELAY: isMobile 
    ? Math.max(ANIMATION_TIMINGS.TYPING_CHAR_DELAY - 10, 60)
    : ANIMATION_TIMINGS.TYPING_CHAR_DELAY,
  TAP_ANIMATION_DURATION: isMobile 
    ? Math.max(ANIMATION_TIMINGS.TAP_ANIMATION_DURATION - 20, 150)
    : ANIMATION_TIMINGS.TAP_ANIMATION_DURATION,
};

const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HARDWARE_ACCELERATION_STYLES = {
  transform: 'translate3d(0,0,0)',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
} as const;

// iOS-style spring animation configs
const IOS_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8,
} as const;

const IOS_SPRING_SOFT = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.9,
} as const;

const IOS_TAP_SCALE = {
  pressed: 0.93,
  duration: 0.12,
} as const;

const TYPING_TEXT = "LINK";

// Video script text content
const VIDEO_SCRIPT = {
  intro: {
    question: "Are you an IG creator or business?",
    problem: "Can't share links on your IG posts? Losing traffic to your website? 💸"
  },
  solution: "automatically DM your link to every commenter 🚀",
  cta: "Sign up with ScaleDM to get started for free"
};

// Instagram-style icons - exact replicas

const InstagramCommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
  </svg>
);

const InstagramShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3L9.218 10.083M11.698 20.334L22 3.001H2l7.218 7.083 2.48 10.25z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
  </svg>
);

const InstagramBookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

type DemoPhase = "idle" | "intro" | "openSheet" | "typing" | "fadeOut" | "submitted" | "dm";

interface DemoState {
  typed: string;
  phase: DemoPhase;
  iteration: number;
  tapAnim: boolean;
  showNotification: boolean;
  dmPulseCTA: boolean;
  dmClickFlash: boolean;
  showWebsite: boolean;
  commentIconTapAnim: boolean;
  notificationTapAnim: boolean;
  ctaTapAnim: boolean;
  showScaleDMUpsell: boolean;
}

// removed unused useAnimationFrame hook

const useDemoAnimation = () => {
  const [state, setState] = useState<DemoState>({
    typed: "",
    phase: "idle",
    iteration: 0,
    tapAnim: false,
    showNotification: false,
    dmPulseCTA: false,
    dmClickFlash: false,
    showWebsite: false,
    commentIconTapAnim: false,
    notificationTapAnim: false,
    ctaTapAnim: false,
    showScaleDMUpsell: false,
  });
  
  const [isPaused, setIsPaused] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const clearAllIntervals = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }, []);

  const clearAllAnimations = useCallback(() => {
    clearAllTimeouts();
    clearAllIntervals();
  }, [clearAllTimeouts, clearAllIntervals]);

  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutsRef.current.push(timeout);
    return timeout;
  }, []);

  const updateState = useCallback((updates: Partial<DemoState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const startComments = useCallback(() => {
    if (isPaused) return;
    clearAllAnimations();
    if (prefersReducedMotion) {
      updateState({ 
        typed: TYPING_TEXT, 
        phase: "submitted", 
        tapAnim: false,
        commentIconTapAnim: false
      });
      return;
    }
    
    // Start with intro phase
    updateState({ phase: "intro" });
    
    // After intro, start the demo
    addTimeout(() => {
      updateState({ typed: "", commentIconTapAnim: true });
    }, ANIMATION_TIMINGS.INTRO_DISPLAY_DURATION);
    addTimeout(() => {
      updateState({ commentIconTapAnim: false });
      // Small delay before sheet opens for more natural feel
      addTimeout(() => {
        updateState({ phase: "openSheet" });
      }, 50);
    }, ANIMATION_TIMINGS.INTRO_DISPLAY_DURATION + ANIMATION_TIMINGS.TAP_ANIMATION_DURATION);
    addTimeout(() => {
      updateState({ phase: "typing" });
      let charIndex = 0;
      // Add slight random variation to typing speed for realism
      const typeNextChar = () => {
        if (isPaused) return;
        if (charIndex < TYPING_TEXT.length) {
          updateState({ typed: TYPING_TEXT.slice(0, charIndex + 1) });
          charIndex++;
          // Variable typing speed for more natural feel
          const nextDelay = MOBILE_ANIMATION_TIMINGS.TYPING_CHAR_DELAY + 
            (Math.random() * 40 - 20); // ±20ms variation
          addTimeout(() => typeNextChar(), nextDelay);
        } else {
          addTimeout(
            () => updateState({ phase: "fadeOut" }),
            ANIMATION_TIMINGS.FADE_OUT_DELAY
          );
          addTimeout(
            () => updateState({ phase: "submitted" }),
            ANIMATION_TIMINGS.SUBMITTED_DELAY
          );
        }
      };
      typeNextChar();
    }, ANIMATION_TIMINGS.INTRO_DISPLAY_DURATION + ANIMATION_TIMINGS.TYPING_START_DELAY);
  }, [addTimeout, clearAllAnimations, updateState, isPaused]);

  const handleNotification = useCallback(() => {
    if (state.phase !== "submitted") return;
    // Show notification only after the comment has appeared and animated in, plus a buffer
    const afterCommentDelay = 
      ANIMATION_TIMINGS.COMMENT_APPEAR_DELAY +
      ANIMATION_TIMINGS.COMMENT_APPEAR_ANIM_DURATION +
      ANIMATION_TIMINGS.NOTIFICATION_AFTER_COMMENT_DELAY;

    addTimeout(() => updateState({ showNotification: true }), afterCommentDelay);
    addTimeout(() => {
      updateState({ notificationTapAnim: true });
    }, afterCommentDelay + ANIMATION_TIMINGS.NOTIFICATION_DURATION);
    addTimeout(() => {
      updateState({ showNotification: false, notificationTapAnim: false });
      addTimeout(() => {
        updateState({ phase: "dm" });
      }, 100);
    }, afterCommentDelay + ANIMATION_TIMINGS.NOTIFICATION_DURATION + ANIMATION_TIMINGS.NOTIFICATION_CLICK_DELAY);
  }, [state.phase, addTimeout, updateState]);

  const handleDmPhase = useCallback(() => {
    if (state.phase !== "dm") return;
    addTimeout(() => {
      updateState({ ctaTapAnim: true });
    }, ANIMATION_TIMINGS.DM_PULSE_DELAY + ANIMATION_TIMINGS.DM_PULSE_DURATION);
  addTimeout(
    () => updateState({ showWebsite: true, ctaTapAnim: false }),
    ANIMATION_TIMINGS.DM_PULSE_DELAY + ANIMATION_TIMINGS.DM_PULSE_DURATION + ANIMATION_TIMINGS.WEBSITE_OPEN_DELAY
  );
  // Show ScaleDM upsell after website loads
  addTimeout(() => {
    updateState({ showScaleDMUpsell: true });
  }, ANIMATION_TIMINGS.DM_PULSE_DELAY + ANIMATION_TIMINGS.DM_PULSE_DURATION + ANIMATION_TIMINGS.WEBSITE_OPEN_DELAY + 2000);
  // Animation stops at upsell - no automatic restart
  }, [state.phase, state.iteration, addTimeout, updateState, startComments]);

  useEffect(() => {
    // Manual start only - no auto-start
    return () => {
      clearAllAnimations();
    };
  }, [clearAllAnimations]);

  useEffect(() => handleNotification(), [handleNotification]);
  useEffect(() => handleDmPhase(), [handleDmPhase]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      startComments();
    } else {
      setIsPaused(true);
      clearAllAnimations();
    }
  }, [isPaused, startComments, clearAllAnimations]);

  const resetAnimation = useCallback(() => {
    clearAllAnimations();
    setIsPaused(false);
    setState({
      typed: "",
      phase: "idle",
      iteration: 0,
      tapAnim: false,
      showNotification: false,
      dmPulseCTA: false,
      dmClickFlash: false,
      showWebsite: false,
      commentIconTapAnim: false,
      notificationTapAnim: false,
      ctaTapAnim: false,
      showScaleDMUpsell: false,
    });
  }, [clearAllAnimations]);

  return {
    state,
    startComments,
    updateState,
    isPaused,
    togglePause,
    resetAnimation,
  };
};

const IntroOverlay: React.FC<{
  show: boolean;
  phase: DemoPhase;
}> = ({ show, phase }) => (
  <AnimatePresence>
    {show && phase === "intro" && (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)",
          borderRadius: "inherit",
          ...HARDWARE_ACCELERATION_STYLES
        }}
      >
        <Box sx={{ textAlign: "center", color: "white", maxWidth: "90%" }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                lineHeight: 1.2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              {VIDEO_SCRIPT.intro.question}
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 4,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                lineHeight: 1.4,
                color: "#ffeb3b",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)"
              }}
            >
              {VIDEO_SCRIPT.intro.problem}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            <Box sx={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 1,
              px: 3, 
              py: 1.5, 
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)"
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  color: "#4caf50"
                }}
              >
                {VIDEO_SCRIPT.solution}
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    )}
  </AnimatePresence>
);

const NotificationBanner: React.FC<{
  show: boolean;
  onClose: () => void;
  tapAnim: boolean;
}> = ({ show, onClose, tapAnim }) => (
  <AnimatePresence>
    {show && (
        <Box
          component={motion.div}
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: tapAnim ? [1, IOS_TAP_SCALE.pressed, 1] : 1,
          }}
          exit={{ 
            y: -100, 
            opacity: 0, 
            scale: 0.95,
            transition: { 
              duration: 0.25, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          transition={{ 
            ...IOS_SPRING_SOFT,
            scale: tapAnim ? {
              duration: IOS_TAP_SCALE.duration * 2,
              ease: "easeInOut"
            } : undefined
          }}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            mx: "auto",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
            bgcolor: "rgba(255,255,255,0.98)",
            border: "1px solid rgba(0,0,0,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            cursor: "pointer",
            ...HARDWARE_ACCELERATION_STYLES
          }}
          onClick={onClose}
        >
        <Avatar src="/animation_profile.png" alt="stylebysarah business profile" sx={{ width: 28, height: 28 }} />
        <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.2, alignItems: "flex-start", textAlign: "left", flex: 1 }}>
          <Typography variant="body2" sx={{ 
            fontWeight: 600, 
            fontSize: 14, 
            color: "#262626" 
          }}>
            stylebysarah
          </Typography>
          <Typography variant="body2" sx={{ 
            fontSize: 13, 
            color: "#8e8e8e",
            width: "100%" 
          }}>
            Sent a message
          </Typography>
        </Box>
      </Box>
    )}
  </AnimatePresence>
);

const CommentsPanel: React.FC<{
  phase: DemoPhase;
  typed: string;
}> = ({ phase, typed }) => {
  const showPanel = phase === "openSheet" || phase === "typing" || phase === "fadeOut" || phase === "submitted";
  return (
    <AnimatePresence mode="wait">
      {showPanel && (
        <Box
          component={motion.div}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={IOS_SPRING}
          sx={{ 
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            bgcolor: "white",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: "0 -2px 10px rgba(0,0,0,0.08)",
            overflow: "hidden",
            ...HARDWARE_ACCELERATION_STYLES
          }}
        >
          <Box sx={{ 
            width: "100%", 
            bgcolor: "white", 
            p: { xs: 1.5, sm: 2 },
            minHeight: { xs: 200, sm: 220 },
            maxHeight: { xs: 280, sm: 320 },
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}>
            <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: 36, height: 5, bgcolor: "rgba(0,0,0,0.3)", borderRadius: 100, mb: 1.5 }} />
            </Box>
            <Typography variant="h6" align="center" sx={{ fontWeight: 700, mb: 1.5 }}>Comments</Typography>
            <AnimatePresence>
              {phase === "submitted" && (
                  <Box 
                  component={motion.div} 
                  initial={{ opacity: 0, y: 6 }} 
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: ANIMATION_TIMINGS.COMMENT_APPEAR_DELAY / 1000,
                      ...IOS_SPRING_SOFT
                    }
                  }} 
                  exit={{ opacity: 0 }} 
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1.5 }}
                >
                  <Avatar src="/user1.png" alt="nomnomlife user profile" sx={{ width: 24, height: 24 }} />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>nomnomlife</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>1m</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ textAlign: "left", mt: 0.25, fontSize: 13, fontWeight: 500, color: "#262626" }}>{TYPING_TEXT}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, cursor: "pointer", textAlign: "left", display: "block", fontSize: 11 }}>Reply</Typography>
                  </Box>
                  <Box sx={{ color: "text.secondary" }}>
                    <FavoriteBorderIcon fontSize="small" />
                  </Box>
                </Box>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {phase !== "submitted" && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 1, y: 0 }}
                  animate={phase === "fadeOut" ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  sx={{ display: "flex", alignItems: "center", gap: 1, pt: 0.5, mt: "auto" }}
                >
                  <Avatar src="/user1.png" alt="nomnomlife user profile" sx={{ width: 28, height: 28 }} />
                  <Box sx={{ flex: 1, position: "relative" }}>
                    <Box sx={{ borderRadius: 10, border: (t) => `1px solid ${t.palette.divider}`, px: 1.5, py: 1, color: typed ? "text.primary" : "text.disabled", fontSize: 14, display: "flex", alignItems: "center", minHeight: 40 }}>
                      <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={phase === "fadeOut" ? { opacity: 0 } : { opacity: typed ? 1 : 0.5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ 
                          display: "flex", 
                          alignItems: "center",
                          ...HARDWARE_ACCELERATION_STYLES
                        }}
                      >
                        <Typography component="span" variant="body2">
                          {typed || "Add a comment..."}
                        </Typography>
                        {phase === "typing" && (
                          <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: [0, 1, 0] }} 
                            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} 
                            style={{ 
                              marginLeft: 2,
                              ...HARDWARE_ACCELERATION_STYLES
                            }}
                          >|</motion.span>
                        )}
                      </motion.span>
                    </Box>
                  </Box>
                </Box>
              )}
            </AnimatePresence>
            {phase === "submitted" && <Box sx={{ height: 44, mt: "auto" }} />}
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

const ScaleDMUpsellOverlay: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => (
  <AnimatePresence>
    {show && (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderRadius: "inherit",
          ...HARDWARE_ACCELERATION_STYLES
        }}
        className="bg-black/60"
        onClick={onClose}
      >
        <Box
          component={motion.div}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "relative",
            ...HARDWARE_ACCELERATION_STYLES
          }}
          className="bg-white rounded-3xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 w-[95%] max-w-sm text-center"
        >
          {/* Emoji header */}
          <Typography 
            sx={{ 
              fontSize: { xs: "2rem", sm: "2.5rem" },
              mb: 2,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            }}
          >
            🚀💬
          </Typography>

          {/* Main headline with gradient */}
          <Typography 
            variant="h4"
            sx={{ 
              fontWeight: 900, 
              mb: 2.5,
              letterSpacing: -0.5,
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.4rem", sm: "1.6rem" },
              lineHeight: 1.2
            }}
          >
            Set up your comment-to-DM automation with ScaleDM 100% free in under 30 seconds
          </Typography>

          {/* Arrow pointing down */}
          <Box sx={{ mb: 3 }}>
            <Box
              component={motion.div}
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              sx={{
                fontSize: "2rem",
                color: "#1976d2",
                fontWeight: "bold"
              }}
            >
              ↓
            </Box>
          </Box>
        </Box>
      </Box>
    )}
  </AnimatePresence>
);

const InstagramInteractionDemo: React.FC<InstagramInteractionDemoProps> = ({
  width = "100%",
  height = "100%",
}) => {
  const { state, startComments, updateState, isPaused, togglePause, resetAnimation } = useDemoAnimation();
  const handleDmCTAClick = useCallback(() => {
    updateState({ showWebsite: true });
  }, [updateState]);

  return (
    <Box
      sx={{
        width,
        height,
        bgcolor: "transparent",
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "static",
        overflow: "hidden",
        zIndex: 0,
        flexDirection: "column",
        gap: 2,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Control Panel - Outside the animation */}
      <Box sx={{ 
        display: "flex", 
        gap: 1, 
        alignItems: "center",
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 1,
        borderRadius: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <button
          onClick={startComments}
          disabled={state.phase !== "idle"}
          style={{
            padding: "6px 12px",
            backgroundColor: state.phase === "idle" ? "#28a745" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: state.phase === "idle" ? "pointer" : "not-allowed",
            fontSize: "12px",
            fontWeight: "bold",
            opacity: state.phase === "idle" ? 1 : 0.6
          }}
        >
          ▶ Start
        </button>
        <button
          onClick={togglePause}
          disabled={state.phase === "idle"}
          style={{
            padding: "6px 12px",
            backgroundColor: isPaused ? "#28a745" : "#ffc107",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: state.phase !== "idle" ? "pointer" : "not-allowed",
            fontSize: "12px",
            fontWeight: "bold",
            opacity: state.phase !== "idle" ? 1 : 0.6
          }}
        >
          {isPaused ? "▶ Resume" : "⏸ Pause"}
        </button>
        <button
          onClick={resetAnimation}
          style={{
            padding: "6px 12px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold"
          }}
        >
          🔄 Reset
        </button>
      </Box>
      {/* Fixed 1:1 ratio: square dimensions for demo */}
          <Box sx={{ 
            width: '540px',
            height: '540px',
            display: 'flex',
            margin: 'auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            position: 'relative',
            // Add subtle shadow for depth
            boxShadow: { xs: 'none', sm: '0 10px 40px rgba(0,0,0,0.08)' },
            borderRadius: 0
          }}>
        <Box 
          sx={{ 
          width: "100%", 
          height: "100%", 
          bgcolor: "white", 
          borderRadius: 0, 
          display: "flex", 
          flexDirection: "column", 
          border: { xs: "none", sm: (t) => `1px solid ${t.palette.divider}` },
          position: "relative",
          overflow: "hidden",
          boxShadow: { xs: "none", sm: "0 0 0 1px rgba(0,0,0,0.1)" }
        }}
        >
        <NotificationBanner 
          show={state.showNotification} 
          onClose={() => updateState({ showNotification: false, phase: "dm" })} 
          tapAnim={state.notificationTapAnim}
        />

        <Box sx={{ px: 1.25, py: 1, display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid #efefef" }}>
          <Box sx={{ position: "relative" }}>
            <Avatar src="/animation_profile.png" alt="stylebysarah business profile" sx={{ 
              width: 32, 
              height: 32,
              border: "2px solid #efefef"
            }} />
            <Box sx={{
              position: "absolute",
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              zIndex: -1
            }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>stylebysarah</Typography>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: "50%", 
              bgcolor: "#0095f6", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              "&::after": {
                content: '"✓"',
                color: "white",
                fontSize: 8,
                fontWeight: "bold"
              }
            }} />
          </Box>
          <Box sx={{ ml: "auto" }}>
            <IconButton size="small" aria-label="More options" sx={{ color: "#262626" }}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
          <Box sx={{ 
            width: "100%", 
            height: "100%", 
            bgcolor: "grey.200", 
            overflow: "hidden", 
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Box component="img" src="/animation_post.png" alt="Post" sx={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              borderRadius: "0",
              maxWidth: "100%",
              maxHeight: "100%"
            }} />
          </Box>
        </Box>
        {/* Carousel pagination dots */}
        <Box sx={{ 
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
          py: 0.5
        }}>
          {[1, 2, 3, 4, 5].map((dot, index) => (
            <Box
              key={dot}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: index === 0 ? "#0095f6" : "#c7c7c7",
                transition: "background-color 0.2s ease"
              }}
            />
          ))}
        </Box>
        
        <Box sx={{ px: 1.25, py: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton size="small" aria-label="Like post" sx={{ color: "#262626", width: 24, height: 24, p: 0 }}>
                  <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                </IconButton>
                <Typography variant="caption" sx={{ fontSize: 14, color: "#262626" }}>23K</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ position: "relative" }}>
                  <IconButton 
                    component={motion.div}
                    animate={state.commentIconTapAnim ? {
                      scale: [1, IOS_TAP_SCALE.pressed, 1]
                    } : { scale: 1 }}
                    transition={{
                      duration: IOS_TAP_SCALE.duration * 2,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    size="small" 
                    aria-label="Add comment"
                    sx={{ 
                      color: "#262626", 
                      width: 24, 
                      height: 24, 
                      p: 0,
                      ...HARDWARE_ACCELERATION_STYLES
                    }} 
                    onClick={startComments}
                  >
                    <InstagramCommentIcon />
                  </IconButton>
                </Box>
                <Typography variant="caption" sx={{ fontSize: 14, color: "#262626" }}>481</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton size="small" aria-label="Share post" sx={{ color: "#262626", width: 24, height: 24, p: 0 }}>
                  <InstagramShareIcon />
                </IconButton>
                <Typography variant="caption" sx={{ fontSize: 14, color: "#262626" }}>146</Typography>
              </Box>
            </Box>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton size="small" aria-label="Save post" sx={{ color: "#262626", width: 24, height: 24, p: 0 }}>
                <InstagramBookmarkIcon />
              </IconButton>
            </Box>
          </Box>
          
        </Box>
        <Box sx={{ px: 1.25, pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, mb: 0.5 }}>
            <Typography variant="body2" sx={{ 
              fontWeight: 600, 
              fontSize: 14, 
              color: "#262626",
              textAlign: "left",
              lineHeight: 1.4
            }}>
              stylebysarah
            </Typography>
            <Typography variant="body2" sx={{ 
              fontSize: 14, 
              color: "#262626",
              textAlign: "left",
              lineHeight: 1.4
            }}>
              Comment <Box component="span" sx={{ fontWeight: 600 }}>{TYPING_TEXT}</Box> and I'll automatically DM you the link to get this outfit! 🛍️
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ 
            color: "#8e8e8e", 
            fontSize: 12,
            textAlign: "left",
            display: "block"
          }}>
            52 minutes ago
          </Typography>
        </Box>
        <CommentsPanel phase={state.phase} typed={state.typed} />
        <AnimatePresence>
          {state.phase === "dm" && (
            <Box
              component={motion.div}
              initial={{ 
                y: "100%"
              }}
              animate={{ 
                y: 0
              }}
              exit={{ 
                y: "100%"
              }}
              transition={IOS_SPRING}
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "background.paper",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                ...HARDWARE_ACCELERATION_STYLES
              }}
            >
              <Box sx={{ px: 1.25, py: 1, display: "flex", alignItems: "center", gap: 1, borderBottom: (t) => `1px solid ${t.palette.divider}` }}>
                <Avatar src="/animation_profile.png" alt="stylebysarah business profile" sx={{ width: 26, height: 26 }} />
                <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>stylebysarah</Typography>
                </Box>
              </Box>
              <Box sx={{ px: 2, py: 1, textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">New messages</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>10:22 AM</Typography>
              </Box>
              <Box sx={{ px: 2, textAlign: "center", mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  <strong>stylebysarah</strong> messaged you about a comment that you made on their post. <u>See post</u>
                </Typography>
              </Box>
              <Box sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                overflow: "auto",
                px: 2,
                py: 1
              }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
                  <Avatar src="/animation_profile.png" alt="stylebysarah business profile" sx={{ width: 24, height: 24, mt: 0.5 }} />
                  <Box sx={{ position: "relative", maxWidth: "85%", flex: 1 }}>
                    <motion.div animate={{}} transition={{}}>
                      <Box sx={{
                        bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        borderRadius: 2,
                        border: (t) => `1px solid ${t.palette.divider}`,
                        width: "100%",
                        backdropFilter: "blur(3px)",
                        textAlign: "left",
                        overflow: "hidden",
                        cursor: "default"
                      }}>
                        <Box component="img" src="/dress.png" alt="Sky-Blue Satin Evening Dress" sx={{ 
                          width: "100%", 
                          height: { xs: 140, sm: 170 },
                          objectFit: "cover",
                          display: "block",
                          cursor: "default"
                        }} />
                        <Box sx={{ p: { xs: 1.5, sm: 2 }, pb: 1, cursor: "default" }}>
                          <Typography variant="h6" sx={{ 
                            fontSize: 15, 
                            fontWeight: 700, 
                            mb: 0.5, 
                            lineHeight: 1.3,
                            color: "text.primary",
                            textAlign: "left"
                          }}>
                            Sky-Blue Satin Evening Dress
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            fontSize: 13, 
                            color: "text.secondary", 
                            mb: 0, 
                            lineHeight: 1.4,
                            display: "block",
                            textAlign: "left"
                          }}>
                            A sleek sky-blue satin dress with a timeless silhouette—effortlessly elegant for weddings, galas, and nights out.
                          </Typography>
                        </Box>
                        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", width: "100%", p: { xs: 1, sm: 1.5 } }}>
                          <Box 
                            component={motion.div}
                            animate={state.ctaTapAnim ? {
                              scale: [1, IOS_TAP_SCALE.pressed, 1.05, 1]
                            } : { scale: 1 }}
                            transition={{ 
                              duration: 0.25,
                              ease: [0.25, 0.46, 0.45, 0.94],
                              times: [0, 0.4, 0.7, 1]
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDmCTAClick();
                            }}
                            style={HARDWARE_ACCELERATION_STYLES}
                            sx={{
                              px: 2.5,
                              py: 1,
                              bgcolor: "common.white",
                              color: "text.primary",
                              borderRadius: 1,
                              border: (t) => `1px solid ${t.palette.divider}`,
                              fontWeight: 800,
                              boxShadow: 'none',
                              textAlign: "center",
                              fontSize: 13,
                              cursor: "pointer",
                              position: "relative",
                              width: "100%",
                              maxWidth: "100%"
                            }}
                          >
                            Shop
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, px: 1.5, py: { xs: 1, sm: 1 }, borderTop: (t) => `1px solid ${t.palette.divider}`, bgcolor: "background.paper" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1, textAlign: "left" }}>Message...</Typography>
                </Box>
              </Box>
              <AnimatePresence>
                {state.showWebsite && (
                  <Box component={motion.div} 
                    initial={{ y: "100%" }} 
                    animate={{ y: 0 }} 
                    exit={{ y: "100%" }} 
                    transition={IOS_SPRING} sx={{ position: "absolute", inset: 0, zIndex: 4, bgcolor: "background.paper", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ px: 1.25, py: 1, borderBottom: (t) => `1px solid ${t.palette.divider}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: "flex", gap: 0.5, mr: 1 }}>
                          <Box sx={{ width: 10, height: 10, borderRadius: 5, bgcolor: "#FF5F57" }} />
                          <Box sx={{ width: 10, height: 10, borderRadius: 5, bgcolor: "#FFBD2E" }} />
                          <Box sx={{ width: 10, height: 10, borderRadius: 5, bgcolor: "#28C840" }} />
                        </Box>
                        <Box sx={{ flex: 1, borderRadius: 12, border: (t) => `1px solid ${t.palette.divider}`, px: 1.25, py: 0.6, display: "flex", alignItems: "center" }}>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>stylebysarah.com</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 1, height: 2, bgcolor: (t) => t.palette.action.hover, borderRadius: 1, overflow: "hidden" }}>
                        <Box 
                          component={motion.div} 
                          initial={{ width: 0 }} 
                          animate={{ width: "100%" }} 
                          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} 
                          style={HARDWARE_ACCELERATION_STYLES}
                          sx={{ height: "100%", bgcolor: "primary.main" }} 
                        />
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "#fafafa" }}>
                      <Box sx={{ bgcolor: "#f5f5f0", px: 2, py: 0.25, display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#333", fontSize: "0.6rem" }}>New drops weekly!</Typography>
                        <Box sx={{ ml: "auto" }}>→</Box>
                      </Box>
                      <Box sx={{ bgcolor: "#f5f5f0", px: 2, py: 0.5, borderBottom: "1px solid #e0e0e0" }}>
                        <Typography variant="h6" sx={{ fontFamily: "cursive", fontWeight: 400, color: "#8B4513", textAlign: "center", fontSize: "0.95rem" }}>stylebysarah</Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 0.25 }}>
                          <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>♡</Box>
                          <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>🔍</Box>
                          <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>☰</Box>
                        </Box>
                      </Box>
                      <Box sx={{ px: 2, py: 0.15, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
                        <Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem" }}>{"FASHION > "}<u>EVENING DRESSES</u></Typography>
                      </Box>
                      <Box sx={{ px: 2, py: 1.5, bgcolor: "white" }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: "#000", mb: 1.5, fontSize: "1.3rem" }}>Sky-Blue Satin Evening Dress</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Avatar src="/animation_profile.png" alt="stylebysarah business profile" sx={{ width: 24, height: 24 }} />
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem" }}>By <strong>STYLE BY SARAH</strong></Typography>
                          <Box sx={{ ml: "auto", display: "flex", gap: 1, alignItems: "center" }}>
                            <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>⭐ 4.8</Typography>
                            <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>💬 127</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                          <Box sx={{ px: 1.5, py: 0.75, bgcolor: "#000", color: "white", borderRadius: 1, fontWeight: 700, fontSize: "0.75rem" }}>SHOP NOW</Box>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>P</Box>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>♡</Box>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>🖨</Box>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                          <Box sx={{ px: 0.75, py: 0.25, bgcolor: "#1DA1F2", color: "white", borderRadius: 2, fontSize: "0.55rem", fontWeight: 700 }}>SATIN</Box>
                          <Box sx={{ px: 0.75, py: 0.25, bgcolor: "#87CEEB", color: "#000", borderRadius: 2, fontSize: "0.55rem", fontWeight: 700 }}>SKY BLUE</Box>
                          <Box sx={{ px: 0.75, py: 0.25, bgcolor: "#4B0082", color: "white", borderRadius: 2, fontSize: "0.55rem", fontWeight: 700 }}>EVENING</Box>
                        </Box>
                        <Box sx={{ mb: 1.5 }}>
                          <Box component="img" src="/dress.png" alt="Sky-Blue Satin Evening Dress" sx={{ width: "100%", height: { xs: 160, sm: 200 }, objectFit: "cover", borderRadius: 1 }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: "#333", lineHeight: 1.4, mb: 1, fontSize: "0.85rem" }}>
                          A sophisticated sky-blue satin dress with a soft sheen, elegant drape, and a flattering fit—made to turn heads.
                        </Typography>
                        <Box sx={{ mt: 1.5, p: 1.5, bgcolor: "#f8f8f8", borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem", mb: 0.5 }}>Highlights:</Typography>
                          <Typography variant="caption" sx={{ fontSize: "0.7rem", color: "#666", lineHeight: 1.3 }}>
                            • Best seller • Great value • Trusted by customers • Fast delivery
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          )}
        </AnimatePresence>
        </Box>
        {/* Intro Overlay */}
        <IntroOverlay 
          show={state.phase === "intro"} 
          phase={state.phase}
        />
        
        {/* ScaleDM Upsell Overlay (inside frame) */}
        <ScaleDMUpsellOverlay 
          show={state.showScaleDMUpsell} 
          onClose={() => updateState({ showScaleDMUpsell: false })} 
        />
      </Box>
    </Box>
  );
};

export default InstagramInteractionDemo;


