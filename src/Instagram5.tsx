import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramInteractionDemoProps {
  width?: number | string;
  height?: number | string;
}

const ANIMATION_TIMINGS = {
  AUTO_START_DELAY: 2000,
  TAP_ANIMATION_DURATION: 500,
  SHEET_OPEN_DELAY: 500,
  TYPING_START_DELAY: 1500,
  TYPING_CHAR_DELAY: 450,
  FADE_OUT_DELAY: 600,
  SUBMITTED_DELAY: 1000,
  NOTIFICATION_DELAY: 1200,
  NOTIFICATION_DURATION: 3200,
  NOTIFICATION_CLICK_DELAY: 800,
  DM_PULSE_DELAY: 2500,
  DM_PULSE_DURATION: 1200,
  DM_CLICK_FLASH_DELAY: 1000,
  DM_CLICK_FLASH_DURATION: 350,
  WEBSITE_OPEN_DELAY: 1000,
  WEBSITE_DISPLAY_DURATION: 5000,
  RESTART_DELAY: 1000,
} as const;

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const MOBILE_ANIMATION_TIMINGS = {
  ...ANIMATION_TIMINGS,
  TYPING_CHAR_DELAY: isMobile ? 300 : 450,
  TAP_ANIMATION_DURATION: isMobile ? 500 : 600,
};

const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HARDWARE_ACCELERATION_STYLES = {
  transform: 'translate3d(0,0,0)',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
} as const;

const TYPING_TEXT = "RECIPE";

type DemoPhase = "idle" | "openSheet" | "typing" | "fadeOut" | "submitted" | "dm";

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
    updateState({ typed: "", commentIconTapAnim: true });
    addTimeout(() => {
      updateState({ commentIconTapAnim: false, phase: "openSheet" });
    }, ANIMATION_TIMINGS.TAP_ANIMATION_DURATION);
    addTimeout(() => updateState({ phase: "openSheet" }), ANIMATION_TIMINGS.SHEET_OPEN_DELAY + 800);
    addTimeout(() => {
      updateState({ phase: "typing" });
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (isPaused) {
          clearInterval(typeInterval);
          return;
        }
        if (charIndex < TYPING_TEXT.length) {
          updateState({ typed: TYPING_TEXT.slice(0, charIndex + 1) });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          addTimeout(
            () => updateState({ phase: "fadeOut" }),
            ANIMATION_TIMINGS.FADE_OUT_DELAY
          );
          addTimeout(
            () => updateState({ phase: "submitted" }),
            ANIMATION_TIMINGS.SUBMITTED_DELAY
          );
        }
      }, MOBILE_ANIMATION_TIMINGS.TYPING_CHAR_DELAY);
      intervalsRef.current.push(typeInterval as unknown as NodeJS.Timeout);
    }, ANIMATION_TIMINGS.TYPING_START_DELAY);
  }, [addTimeout, clearAllAnimations, updateState, isPaused]);

  const handleNotification = useCallback(() => {
    if (state.phase !== "submitted") return;
    addTimeout(() => updateState({ showNotification: true }), ANIMATION_TIMINGS.NOTIFICATION_DELAY);
    addTimeout(() => {
      updateState({ notificationTapAnim: true });
    }, ANIMATION_TIMINGS.NOTIFICATION_DELAY + ANIMATION_TIMINGS.NOTIFICATION_DURATION);
    addTimeout(() => {
      updateState({ showNotification: false, notificationTapAnim: false });
      addTimeout(() => {
        updateState({ phase: "dm" });
      }, 150);
    }, ANIMATION_TIMINGS.NOTIFICATION_DELAY + ANIMATION_TIMINGS.NOTIFICATION_DURATION + ANIMATION_TIMINGS.NOTIFICATION_CLICK_DELAY);
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
    addTimeout(() => {
      updateState({
        showWebsite: false,
        typed: "",
        phase: "idle",
        iteration: state.iteration + 1,
        ctaTapAnim: false,
      });
      addTimeout(() => startComments(), ANIMATION_TIMINGS.RESTART_DELAY);
    }, ANIMATION_TIMINGS.DM_PULSE_DELAY + ANIMATION_TIMINGS.DM_PULSE_DURATION + ANIMATION_TIMINGS.WEBSITE_OPEN_DELAY + ANIMATION_TIMINGS.WEBSITE_DISPLAY_DURATION);
  }, [state.phase, state.iteration, addTimeout, updateState, startComments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startComments();
    }, ANIMATION_TIMINGS.AUTO_START_DELAY);
    
    return () => {
      clearTimeout(timer);
      clearAllAnimations();
    };
  }, [startComments, clearAllAnimations]);

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

const NotificationBanner: React.FC<{
  show: boolean;
  onClose: () => void;
  tapAnim: boolean;
}> = ({ show, onClose, tapAnim }) => (
  <AnimatePresence>
    {show && (
        <Box
          component={motion.div}
          initial={{ y: -80, opacity: 0, scale: 0.8 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: tapAnim ? [1, 0.75, 1.25, 1] : 1,
            boxShadow: [
              "0 4px 20px rgba(0,0,0,0.1)",
              "0 8px 30px rgba(0,0,0,0.15)",
              "0 4px 20px rgba(0,0,0,0.1)"
            ]
          }}
          exit={{ 
            y: -80, 
            opacity: 0, 
            scale: 0.8,
            transition: { 
              duration: 0.3, 
              ease: "easeIn" 
            }
          }}
          transition={{ 
            duration: tapAnim ? 0.6 : 0.6, 
            ease: "easeOut",
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            times: tapAnim ? [0, 0.3, 0.7, 1] : undefined
          }}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            mx: "auto",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            columnGap: 1,
            px: 1,
            py: 0.75,
            borderRadius: 3,
            boxShadow: (t) => t.shadows[6],
            bgcolor: (t) => t.palette.mode === "dark" ? "rgba(38,38,38,0.85)" : "rgba(255,255,255,0.9)",
            border: (t) => `1px solid ${t.palette.divider}`,
            backdropFilter: "saturate(1.2) blur(12px)",
            cursor: "pointer",
            ...HARDWARE_ACCELERATION_STYLES
          }}
          onClick={onClose}
        >
        <Avatar src="/animation_profile.png" alt="fitfoodie_life business profile" sx={{ width: 28, height: 28 }} />
        <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.2, alignItems: "flex-start", textAlign: "left" }}>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>fitfoodie_life</Typography>
          </Box>
          <Typography variant="body2" sx={{ width: "100%" }}>Sent a message</Typography>
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
    <AnimatePresence>
      {showPanel && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          sx={{ 
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            mt: 0,
            mb: { xs: 0, sm: 1 },
            bgcolor: "white"
          }}
        >
          <Box sx={{ 
            width: "100%", 
            bgcolor: "white", 
            borderTopLeftRadius: 8, 
            borderTopRightRadius: 8, 
            boxShadow: { xs: "none", sm: (t) => t.shadows[2] }, 
            p: { xs: 1.5, sm: 2 },
            minHeight: { xs: 140, sm: 160 },
            maxHeight: { xs: 220, sm: 250 },
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 2
          }}>
            <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: 40, height: 4, bgcolor: "grey.300", borderRadius: 2, mb: 1 }} />
            </Box>
            <Typography variant="h6" align="center" sx={{ fontWeight: 700, mb: 1 }}>Comments</Typography>
            <AnimatePresence>
              {phase === "submitted" && (
                <Box component={motion.div} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1.5 }}>
                  <Avatar src="/user1.png" alt="nomnomlife user profile" sx={{ width: 24, height: 24 }} />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>nomnomlife</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>1m</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ textAlign: "left", mt: 0.25, fontSize: 11 }}>{TYPING_TEXT}</Typography>
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
                        initial={{ opacity: 0.6 }}
                        animate={phase === "fadeOut" ? { opacity: 0 } : { opacity: typed ? 1 : 0.6 }}
                        transition={{ duration: 0.25 }}
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
                            transition={{ repeat: Infinity, duration: 1 }} 
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
          onClick={togglePause}
          style={{
            padding: "6px 12px",
            backgroundColor: isPaused ? "#28a745" : "#ffc107",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold"
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
      {/* Fixed 4:5 ratio: larger dimensions for demo */}
      <Box sx={{ 
        width: { xs: '400px', sm: '480px' }, 
        height: { xs: '500px', sm: '600px' }, 
        maxWidth: '480px',
        maxHeight: '600px',
        aspectRatio: '4/5',
        display: 'flex',
        margin: 'auto'
      }}>
        <Box 
          sx={{ 
          width: "100%", 
          height: "100%", 
          bgcolor: "white", 
          borderRadius: 1.5, 
          display: "flex", 
          flexDirection: "column", 
          border: (t) => `1px solid ${t.palette.divider}`,
          position: "relative",
          overflow: "hidden"
        }}
        >
        <NotificationBanner 
          show={state.showNotification} 
          onClose={() => updateState({ showNotification: false, phase: "dm" })} 
          tapAnim={state.notificationTapAnim}
        />
        <Box sx={{ px: 1.25, py: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src="/animation_profile.png" alt="fitfoodie_life business profile" sx={{ width: 28, height: 28 }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>fitfoodie_life</Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton size="small" aria-label="More options"><MoreHorizIcon fontSize="small" /></IconButton>
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
        <Box sx={{ px: 0.5, py: 0.5, display: "flex", alignItems: "center", position: "relative", gap: 0.25, height: 36 }}>
          <IconButton size="small" aria-label="Like post" sx={{ color: "#262626", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FavoriteBorderIcon sx={{ fontSize: 22, verticalAlign: "middle" }} />
          </IconButton>
          <Box sx={{ position: "relative" }}>
            <IconButton 
              component={motion.div}
              animate={state.commentIconTapAnim ? {
                scale: [1, 0.7, 1.3, 1]
              } : { scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1]
              }}
              size="small" 
              aria-label="Add comment"
              sx={{ 
                color: "#262626", 
                width: 32, 
                height: 32, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                ...HARDWARE_ACCELERATION_STYLES
              }} 
              onClick={startComments}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 22, verticalAlign: "middle" }} />
            </IconButton>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <IconButton size="small" aria-label="Save post" sx={{ color: "#262626", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookmarkBorderOutlinedIcon sx={{ fontSize: 22, verticalAlign: "middle" }} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ px: 1.25 }}>
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            <strong>fitfoodie_life</strong> Comment <strong>{TYPING_TEXT}</strong> and I'll DM you the link to this yummy treat!
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, textAlign: "left" }}>52 minutes ago</Typography>
        </Box>
        <CommentsPanel phase={state.phase} typed={state.typed} />
        <AnimatePresence>
          {state.phase === "dm" && (
            <Box
              component={motion.div}
              initial={{ 
                y: "100%",
                opacity: 0,
                scale: 0.95
              }}
              animate={{ 
                y: 0,
                opacity: 1,
                scale: 1
              }}
              exit={{ 
                y: "100%",
                opacity: 0,
                scale: 0.95
              }}
              transition={{ 
                type: "spring", 
                stiffness: 280, 
                damping: 30,
                mass: 0.8,
                opacity: { duration: 0.3, ease: "easeOut" },
                scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
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
                <Avatar src="/animation_profile.png" alt="fitfoodie_life business profile" sx={{ width: 26, height: 26 }} />
                <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>fitfoodie_life</Typography>
                </Box>
              </Box>
              <Box sx={{ px: 2, py: 1, textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">New messages</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>10:22 AM</Typography>
              </Box>
              <Box sx={{ px: 2, textAlign: "center", mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  <strong>fitfoodie_life</strong> messaged you about a comment that you made on their post. <u>See post</u>
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
                  <Avatar src="/animation_profile.png" alt="fitfoodie_life business profile" sx={{ width: 24, height: 24, mt: 0.5 }} />
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
                        <Box component="img" src="/hero-5.webp" alt="Recipe" sx={{ 
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
                            Oatmeal Peach Bake
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            fontSize: 13, 
                            color: "text.secondary", 
                            mb: 0, 
                            lineHeight: 1.4,
                            display: "block",
                            textAlign: "left"
                          }}>
                            A healthy and satisfying bowl of baked oatmeal topped with warm, spiced peaches.
                          </Typography>
                        </Box>
                        <Box sx={{ position: "relative", display: "flex", justifyContent: "center", width: "100%", p: { xs: 1, sm: 1.5 } }}>
                          <Box 
                            component={motion.div}
                            animate={state.ctaTapAnim ? {
                              scale: [1, 0.75, 1.3, 1]
                            } : { scale: 1 }}
                            transition={{ 
                              duration: 0.6,
                              ease: "easeInOut",
                              times: [0, 0.3, 0.7, 1]
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
                            Get the Recipe
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
                  <Box component={motion.div} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} sx={{ position: "absolute", inset: 0, zIndex: 4, bgcolor: "background.paper", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ px: 1.25, py: 1, borderBottom: (t) => `1px solid ${t.palette.divider}` }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: "flex", gap: 0.5, mr: 1 }}>
                          <Box sx={{ width: 10, height: 10, borderRadius: 5, bgcolor: "#FF5F57" }} />
                          <Box sx={{ width: 10, height: 10, borderRadius: 5, bgcolor: "#FFBD2E" }} />
                          <Box sx={{ width: 10, height: 10, borderRadius: 5, bgcolor: "#28C840" }} />
                        </Box>
                        <Box sx={{ flex: 1, borderRadius: 12, border: (t) => `1px solid ${t.palette.divider}`, px: 1.25, py: 0.6, display: "flex", alignItems: "center" }}>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>fitfoodielife.com</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 1, height: 2, bgcolor: (t) => t.palette.action.hover, borderRadius: 1, overflow: "hidden" }}>
                        <Box 
                          component={motion.div} 
                          initial={{ width: 0 }} 
                          animate={{ width: "100%" }} 
                          transition={{ duration: 1.2, ease: "easeInOut" }} 
                          style={HARDWARE_ACCELERATION_STYLES}
                          sx={{ height: "100%", bgcolor: "primary.main" }} 
                        />
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "#fafafa" }}>
                      <Box sx={{ bgcolor: "#f5f5f0", px: 2, py: 0.25, display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#333", fontSize: "0.6rem" }}>New recipes weekly!</Typography>
                        <Box sx={{ ml: "auto" }}>→</Box>
                      </Box>
                      <Box sx={{ bgcolor: "#f5f5f0", px: 2, py: 0.5, borderBottom: "1px solid #e0e0e0" }}>
                        <Typography variant="h6" sx={{ fontFamily: "cursive", fontWeight: 400, color: "#8B4513", textAlign: "center", fontSize: "0.95rem" }}>fitfoodie life</Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 0.25 }}>
                          <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>♡</Box>
                          <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>🔍</Box>
                          <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>☰</Box>
                        </Box>
                      </Box>
                      <Box sx={{ px: 2, py: 0.15, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
                        <Typography variant="caption" sx={{ color: "#666", fontSize: "0.6rem" }}>{"BREAKFAST > "}<u>OATMEAL</u></Typography>
                      </Box>
                      <Box sx={{ px: 2, py: 1.5, bgcolor: "white" }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: "#000", mb: 1.5, fontSize: "1.3rem" }}>Oatmeal Peach Bake</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Avatar src="/animation_profile.png" alt="fitfoodie_life business profile" sx={{ width: 24, height: 24 }} />
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem" }}>By <strong>FITFOODIE LIFE</strong></Typography>
                          <Box sx={{ ml: "auto", display: "flex", gap: 1, alignItems: "center" }}>
                            <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>⭐ 4.8</Typography>
                            <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>💬 127</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                          <Box sx={{ px: 1.5, py: 0.75, bgcolor: "#000", color: "white", borderRadius: 1, fontWeight: 700, fontSize: "0.75rem" }}>JUMP TO RECIPE</Box>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>P</Box>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>♡</Box>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }}>🖨</Box>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                          <Box sx={{ px: 0.75, py: 0.25, bgcolor: "#8B4513", color: "white", borderRadius: 2, fontSize: "0.55rem", fontWeight: 700 }}>GF</Box>
                          <Box sx={{ px: 0.75, py: 0.25, bgcolor: "#FF8C00", color: "white", borderRadius: 2, fontSize: "0.55rem", fontWeight: 700 }}>DF</Box>
                          <Box sx={{ px: 0.75, py: 0.25, bgcolor: "#228B22", color: "white", borderRadius: 2, fontSize: "0.55rem", fontWeight: 700 }}>V</Box>
                        </Box>
                        <Box sx={{ mb: 1.5 }}>
                          <Box component="img" src="/hero-5.webp" alt="Oatmeal Peach Bake" sx={{ width: "100%", height: { xs: 160, sm: 200 }, objectFit: "cover", borderRadius: 1 }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: "#333", lineHeight: 1.4, mb: 1, fontSize: "0.85rem" }}>
                          Perfect <strong>oatmeal peach bake</strong> for busy mornings. Healthy and satisfying!
                        </Typography>
                        <Box sx={{ mt: 1.5, p: 1.5, bgcolor: "#f8f8f8", borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.8rem", mb: 0.5 }}>Ingredients:</Typography>
                          <Typography variant="caption" sx={{ fontSize: "0.7rem", color: "#666", lineHeight: 1.3 }}>
                            • Rolled oats • Fresh peaches • Cinnamon • Maple syrup • Vanilla extract
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
      </Box>
    </Box>
  );
};

export default InstagramInteractionDemo;


