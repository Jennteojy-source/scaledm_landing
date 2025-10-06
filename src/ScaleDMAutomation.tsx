import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScaleDMAutomation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [aspect, setAspect] = useState<'1:1' | '9:16'>('9:16');

  // Variants kept for text elements only (no slide transitions)
  const textVariants = useMemo(() => ({
    fadeInUp: {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1 }
    }
  } as const), []);

  // (Slide 2 special per-line animation removed; using standard headline rendering)

  const slides = useMemo(() => [
    {
      id: 0,
      text: "", // Empty slide to start with
      bgColor: "bg-gradient-to-br from-[#00D4FF] via-[#0ea5e9] to-[#0284c7]",
      textColor: "text-white",
      animation: "fadeInUp",
      accent: "from-[#00D4FF]"
    },
    {
      id: 1,
      text: "Why do IG creators ask you to comment? Your comment triggers an instant DM with the link.",
      bgColor: "bg-gradient-to-br from-[#00D4FF] via-[#0ea5e9] to-[#0284c7]",
      textColor: "text-white",
      animation: "slideInFromLeft",
      accent: "from-[#00D4FF]"
    },
    {
      id: 2,
      text: "They use comment-to-DM automation. More conversions → link lands in inbox. More reach → algorithm boosts the post.",
      subtitle: "",
      bgColor: "bg-gradient-to-br from-[#8B5CF6] via-[#7c3aed] to-[#6d28d9]",
      textColor: "text-white",
      animation: "slideInFromRight",
      accent: "from-[#8B5CF6]"
    },
    {
      id: 3,
      text: "Set up your own comment-to-DM in 30s — free with ScaleDM",
      bgColor: "bg-gradient-to-br from-[#00D4FF] via-[#0ea5e9] to-[#0284c7]",
      textColor: "text-white",
      animation: "scaleInBounce",
      accent: "from-[#00D4FF]"
    },
    
  ], []);

  // Optimized slide durations for enhanced content
  const slideDurations = useMemo(() => {
    const SLIDE_DURATIONS = {
      0: 1.0, // Empty intro slide
      1: 4.0, // Question slide - longer for engagement
      2: 4.0, // Explanation slide - more detailed content
      3: 5.0  // Combined setup + CTA slide
    };

    return slides.map((slide) => SLIDE_DURATIONS[slide.id as keyof typeof SLIDE_DURATIONS] || 3.0);
  }, [slides]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const interSlideGapSeconds = 0.8; // slight pause between content changes

  // Memoized timer callback for better performance
  const scheduleNextSlide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const extraForSlide2 = currentSlide === 2 ? 0.5 : 0;
    const durationSeconds = (slideDurations[currentSlide] ?? 4) + interSlideGapSeconds + extraForSlide2;

    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, durationSeconds * 1000);
  }, [currentSlide, slideDurations, slides.length]);

  useEffect(() => {
    if (!isPlaying || isPaused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    scheduleNextSlide();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, isPaused, scheduleNextSlide]);

  const handleStart = () => {
    setCurrentSlide(0); // Ensure we start from the first slide
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isPlaying) {
      setIsPaused(!isPaused);
    }
  };

  const handleRestart = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#ffffff] via-[#f0f9ff] to-[#e0f2fe] flex flex-col overflow-hidden font-sans">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-20 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#00D4FF]/15 to-[#8B5CF6]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-[#00D4FF]/15 blur-3xl" />
      
      {/* Top navigation to switch aspect ratio */}
      <div className="w-full flex items-center justify-center pt-3">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-2 py-1 shadow-sm">
          <button
            onClick={() => setAspect('1:1')}
            className={`px-3 py-1.5 rounded-full text-sm border ${aspect==='1:1' ? 'bg-black text-white border-black' : 'bg-white text-black border-neutral-200'}`}
          >1:1</button>
          <button
            onClick={() => setAspect('9:16')}
            className={`px-3 py-1.5 rounded-full text-sm border ${aspect==='9:16' ? 'bg-black text-white border-black' : 'bg-white text-black border-neutral-200'}`}
          >9:16</button>
        </div>
      </div>
      
      {/* Animation Controls */}
      <div className="w-full flex items-center justify-center pt-3">
        <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
          <button
            onClick={handleStart}
            disabled={isPlaying && !isPaused}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              isPlaying && !isPaused 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#00D4FF] to-[#0ea5e9] text-white hover:from-[#0ea5e9] hover:to-[#00D4FF] shadow-lg'
            }`}
          >
            ▶ Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isPlaying}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              !isPlaying 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : isPaused 
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7c3aed] text-white hover:from-[#7c3aed] hover:to-[#8B5CF6] shadow-lg' 
                  : 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white hover:from-[#d97706] hover:to-[#f59e0b] shadow-lg'
            }`}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:from-[#dc2626] hover:to-[#ef4444] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Restart
          </button>
        </div>
      </div>

      {/* Progress Dots (optional visual cue) */}
      <div className="w-full flex items-center justify-center pt-2">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video-like Responsive Container */}
      <div className="w-full flex-1 flex items-center justify-center lg:items-start lg:pt-12 px-4" style={{ minHeight: '100vh' }}>
        <div
          className="video-container"
          style={{
            width: aspect === '1:1' ?
              'min(650px, calc(100vw - 2rem))' :
              'min(420px, calc(100vw - 2rem))',
            height: aspect === '1:1' ?
              'min(650px, calc(100vw - 2rem))' :
              'min(747px, calc(100vw * 1.78 - 2rem))',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#000',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            flexShrink: 0,
            flexGrow: 0,
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 200px)'
          }}
        >
              {/* Single continuous slide (fixed background, no slide transitions) */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-[#00D4FF] via-[#0ea5e9] to-[#0284c7] overflow-hidden`}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                  {/* Top-of-slide space preserved after toast removal */}
                  {/* Enhanced animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className={`absolute top-10 left-10 w-32 h-32 bg-gradient-to-br ${currentSlideData.accent} opacity-20 rounded-full blur-2xl`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.35, 0.15],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className={`absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-br ${currentSlideData.accent} opacity-25 rounded-full blur-xl`}
                      animate={{
                        y: [0, -25, 0],
                        scale: [1, 1.2, 1],
                        x: [0, 10, 0]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className={`absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br ${currentSlideData.accent} opacity-30 rounded-full blur-lg`}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.45, 0.2],
                        rotate: [0, -120, -240, -360]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Additional floating elements */}
                    <motion.div
                      className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/40 rounded-full"
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.4, 0.8, 0.4]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/30 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Enhanced backdrop with floating elements */}
                  <div
                    className="absolute inset-0 bg-black/10 backdrop-blur-[1px] rounded-lg"
                    style={{ zIndex: 1 }}
                  />

                  {/* Floating decorative elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-white/25 rounded-full"
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.25, 0.6, 0.25]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <div className="text-center px-6 sm:px-8 md:px-12 relative z-10">
                    {/* Render only current slide's text; no slide transitions */}
                    {currentSlide > 0 && (
                      <>
                        {currentSlideData.subtitle && (
                          <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.9, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          >
                            <p className={`text-lg md:text-xl font-semibold ${currentSlideData.textColor} tracking-wider leading-relaxed`}>
                              {currentSlideData.subtitle}
                            </p>
                          </motion.div>
                        )}
                        {currentSlide === slides.length - 1 ? (
                          <motion.div
                            className={`font-black tracking-tight ${currentSlideData.textColor}`}
                            style={{
                              fontSize: aspect === '9:16' ? 'clamp(18px, 4.5vw, 32px)' : 'clamp(22px, 3.5vw, 36px)',
                              lineHeight: aspect === '9:16' ? '1.3' : '1.2',
                              textAlign: 'center'
                            }}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {/* Two-line emphasis for stronger ad cadence */}
                            <span>{currentSlideData.text.split('Ready to Scale')[0]}</span>
                            <br />
                            <span className="inline-block bg-white/15 px-2 py-1 rounded-md">
                              Ready to Scale?
                            </span>
                            {/* subtle shimmer underline */}
                            <motion.div
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                              className="mx-auto mt-3 h-1 w-1/2 rounded-full bg-gradient-to-r from-white/20 via-white/60 to-white/20"
                              style={{ transformOrigin: 'left' }}
                            />
                          </motion.div>
                        ) : (
                          <div
                            className={`font-black leading-tight tracking-tight ${currentSlideData.textColor}`}
                            style={{
                              fontSize: aspect === '9:16' ? 'clamp(16px, 4vw, 28px)' : 'clamp(20px, 3vw, 32px)',
                              lineHeight: aspect === '9:16' ? '1.3' : '1.2',
                              textAlign: 'center'
                            }}
                          >
                            {currentSlideData.text.split(' ').map((word, wi) => (
                              <motion.span
                                key={`${currentSlide}-${wi}`}
                                className={word.length > 6 || /[.!?]/.test(word) ? 'inline-block mr-2' : 'inline-block mr-1'}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + wi * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              >
                                {word}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {/* Enhanced CTA arrow for final slide */}
                    {currentSlide >= slides.length - 1 && (
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          y: [0, -10, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          delay: 1.5,
                          duration: 0.8,
                          ease: "easeOut",
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          },
                          scale: {
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }
                        }}
                      >
                        <div
                          className="text-4xl md:text-6xl font-bold"
                          style={{
                            textShadow: '0 0 20px rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.4)',
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                          }}
                        >
                          ↓
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Smooth Decorative Elements */}
                    <motion.div 
                      className="absolute -top-6 -left-6 w-12 h-12 bg-white/20 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute -bottom-6 -right-6 w-8 h-8 bg-white/30 rounded-full"
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute top-1/4 -right-4 w-6 h-6 bg-white/25 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.25, 0.5, 0.25]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
              </div>
        </div>
      </div>

    </div>
  );
};

export default ScaleDMAutomation;
