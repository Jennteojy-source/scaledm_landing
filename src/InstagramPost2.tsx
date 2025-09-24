import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AspectRatio = '1:1' | '4:5' | '9:16';
type AnimationState = 'playing' | 'paused' | 'stopped';

const InstagramPost2: React.FC = () => {
  const [step, setStep] = useState<number>(0); // each commenter has 2 steps: comment then reply
  const [animationState, setAnimationState] = useState<AnimationState>('stopped');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const timeoutRef = useRef<number | null>(null);
  const baseCommenters = useMemo(() => [
    { user: 'jae_lissy_', text: 'NEED' },
    { user: 'jinglekitty', text: 'Need' },
    { user: 'diana.nelson.7127', text: 'Need' },
    { user: 'shopper_guru', text: 'NEED' },
  ], []);

  const commenterAvatars = useMemo(() => [
    '/user1.png',
    '/user2.png',
    '/user3.png',
    '/animation_profile.png',
  ], []);

  const commenters = useMemo(() => baseCommenters.map((c, i) => ({
    ...c,
    avatar: commenterAvatars[i % commenterAvatars.length],
  })), [baseCommenters, commenterAvatars]);
  const keyword = useMemo(() => 'NEED', []);
  const replyVariants = useMemo(() => [
    "I DM’d you the promo codes and product links. Check your inbox.",
    "Just DM’d you all promo codes + product links — check your inbox.",
    "Sent a DM with the promo codes and Amazon links. Please check inbox.",
    "I’ve sent the promo codes and product links via DM. Check inbox.",
    "DM on the way with all the links and codes — peek inbox.",
    "Just sent you a DM with links/codes. Look for it in inbox.",
    "DM’d you the link bundle and promos. Check your messages.",
    "You’ve got a DM with product links + codes. Open inbox.",
  ], []);

  useEffect(() => {
    if (animationState !== 'playing') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const totalSteps = commenters.length * 2;
    let delay: number;
    
    if (step === 0) {
      delay = 6000; // Pause for intro overlay (extended by 1s)
    } else if (step <= totalSteps) {
      // Base cadence between comment and reply
      const baseDelay = step % 2 === 1 ? 1300 : 1800;
      // After the final reply (step === totalSteps), add 1s before transitioning to overlay
      delay = step === totalSteps ? baseDelay + 1000 : baseDelay;
    } else {
      // End overlay - pause and stop (no auto-loop)
      timeoutRef.current = window.setTimeout(() => {
        setAnimationState('stopped');
      }, 4000);
      return;
    }

    if (step <= totalSteps) {
      timeoutRef.current = window.setTimeout(() => setStep(prev => prev + 1), delay);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [step, commenters.length, animationState]);

  const handlePlay = () => {
    if (animationState === 'stopped') {
      setStep(0); // Reset to beginning when starting from stopped state
    }
    setAnimationState('playing');
  };
  const handlePause = () => setAnimationState('paused');
  const handleReset = () => {
    setStep(0);
    setAnimationState('stopped');
  };

  const getContainerDimensions = () => {
    switch (aspectRatio) {
      case '1:1':
        return { container: 'aspect-square' };
      case '4:5':
        return { container: 'aspect-[4/5]' };
      case '9:16':
        return { container: 'aspect-[9/16]' };
      default:
        return { container: 'aspect-[4/5]' };
    }
  };

  const dimensions = getContainerDimensions();

  return (
    <div className="w-full flex flex-col items-center px-3 gap-4">
      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-neutral-200 max-w-[850px] w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-700">Controls:</span>
          <button
            onClick={handlePlay}
            disabled={animationState === 'playing'}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-green-600 text-white disabled:bg-green-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            {animationState === 'stopped' ? 'Start' : 'Play'}
          </button>
          <button
            onClick={handlePause}
            disabled={animationState === 'paused' || animationState === 'stopped'}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-yellow-600 text-white disabled:bg-yellow-300 disabled:cursor-not-allowed hover:bg-yellow-700 transition-colors"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-700">Aspect Ratio:</span>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="px-2 py-1 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1:1">1:1 (Square)</option>
            <option value="4:5">4:5 (Portrait)</option>
            <option value="9:16">9:16 (Story)</option>
          </select>
        </div>
      </div>

      <div className={`relative max-w-[850px] w-full bg-white rounded-none shadow border border-neutral-200 overflow-hidden ${dimensions.container}`}>
        <div className="absolute inset-0 flex flex-col min-h-0">

        {/* Intro overlay - appears at the beginning */}
        <AnimatePresence>
          {animationState === 'playing' && step === 0 && (
            <motion.div
              key="intro-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center px-6 sm:px-8 py-8 max-w-[90%] sm:max-w-[80%]"
              >
                <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  Are you an IG creator or brand?
                </div>
                <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 tracking-normal sm:tracking-wide">
                  Want to <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-lime-300 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(34,211,238,0.45)]">instantly DM your links</span> to anyone who comments on your posts? 🚀
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post header */}
        <div className="px-4 py-3 flex items-center gap-3">
          <img src="/business.png" alt="profile" className="w-9 h-9 rounded-full object-cover" />
          <div className="text-sm">
            <p className="font-semibold">bestdailydeals</p>
          </div>
          <div className="ml-auto text-neutral-500">•••</div>
        </div>

        {/* Media (slightly taller) */}
        <div className={`w-full flex-none h-[38%] bg-white`}>
          <img src="/amazon.png" alt="post" className="w-full h-full object-contain" loading="lazy" />
        </div>

        {/* Actions under media */}
        

        {/* Actions */}
        <div className="px-4 py-3 flex items-center gap-4 text-neutral-800">
          <IconHeart />
          <IconComment />
          <IconDM />
          <div className="ml-auto"><IconSave /></div>
        </div>

        {/* Likes + Caption */}
        <div className="px-4 pb-2 text-sm">
          <p className="font-semibold">1,058 likes</p>
          <p className="mt-1"><span className="font-semibold">bestdailydeals</span> Amazing deals on stuff you actually need!</p>
          <p className="mt-1">Comment <span className="font-bold">NEED</span> and I’ll DM you all the promo codes and product links.</p>
        </div>

        {/* Comments thread */}
        <div className="px-4 pb-4 text-sm flex-1 min-h-0 overflow-auto">
          {commenters.map((c, i) => {
            const commentStep = i * 2 + 1; // when comment becomes visible
            const replyStep = i * 2 + 2;   // when reply becomes visible
            return (
              <div key={c.user} className="mb-4">
                <AnimatePresence>
                  {step >= commentStep && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <div className="flex items-start gap-2">
                        <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover bg-neutral-200" />
                        <div className="flex-1">
                          <div className="text-neutral-800"><span className="font-semibold">{c.user}</span> {c.text}</div>
                          <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                            <span>14h</span>
                            <span>1 like</span>
                            <span>Reply</span>
                          </div>
                        </div>
                        <IconHeart className="w-4 h-4 text-neutral-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {step >= replyStep && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="ml-10 mt-3">
                      <div className="flex items-start gap-2">
                        <img src="/business.png" alt="profile" className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="text-neutral-800"><span className="font-semibold">bestdailydeals</span> <span className="text-sky-600">@{c.user}</span> {replyVariants[i % replyVariants.length]}</p>
                          <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                            <span>14h</span>
                            <span>Reply</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* removed view replies row by request */}
              </div>
            );
          })}
        </div>

        {/* End overlay - Setup CTA */}
        <AnimatePresence>
          {step >= commenters.length * 2 && (
            <motion.div
              key="setup-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900/95 via-blue-900/95 to-cyan-900/95"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center px-6 sm:px-8 py-8 max-w-[90%] sm:max-w-[85%]"
              >
                <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6">
                  Setup your automation
                </div>
                <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8">
                  for <span className="text-green-300">FREE</span> with <span className="text-[#1976d2]">ScaleDM</span>
                </div>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <div className="text-blue-200 text-base sm:text-lg md:text-xl font-medium mb-3">
                    Learn more
                  </div>
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const IconHeart: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
);
const IconComment: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>
);
const IconDM: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
);
const IconSave: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>
);

export default InstagramPost2;


