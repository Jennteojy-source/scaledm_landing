import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScaleDMAutomation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [aspect, setAspect] = useState<'1:1' | '9:16'>('9:16');

  // Framer Motion animation variants with proper typing
  const slideVariants: Record<string, any> = {
    slideInFromLeft: {
      initial: { x: -200, opacity: 0, scale: 0.8 },
      animate: { x: 0, opacity: 1, scale: 1 },
      exit: { x: 200, opacity: 0, scale: 0.8 }
    },
    slideInFromRight: {
      initial: { x: 200, opacity: 0, scale: 0.8 },
      animate: { x: 0, opacity: 1, scale: 1 },
      exit: { x: -200, opacity: 0, scale: 0.8 }
    },
    scaleInBounce: {
      initial: { scale: 0.3, opacity: 0, rotate: -10 },
      animate: { scale: 1, opacity: 1, rotate: 0 },
      exit: { scale: 0.3, opacity: 0, rotate: 10 }
    },
    fadeInUp: {
      initial: { y: 100, opacity: 0, scale: 0.9 },
      animate: { y: 0, opacity: 1, scale: 1 },
      exit: { y: -100, opacity: 0, scale: 0.9 }
    },
    typewriter: {
      initial: { y: 50, opacity: 0, letterSpacing: '0.3em' },
      animate: { y: 0, opacity: 1, letterSpacing: 'normal' },
      exit: { y: -50, opacity: 0, letterSpacing: '0.3em' }
    }
  };

  const slides = [
    {
      id: 1,
      text: "Ever see IG creators\nask you to comment\nkeywords for a link?",
      bgColor: "bg-gradient-to-br from-[#00D4FF] via-[#0ea5e9] to-[#0284c7]",
      textColor: "text-white",
      animation: "slideInFromLeft",
      accent: "from-[#00D4FF]"
    },
    {
      id: 2,
      text: "This drives engagement,\nsignaling Instagram's\nalgorithm to show their\ncontent to more people",
      subtitle: "Smart creators know the secret",
      bgColor: "bg-gradient-to-br from-[#8B5CF6] via-[#7c3aed] to-[#6d28d9]",
      textColor: "text-white",
      animation: "slideInFromRight",
      accent: "from-[#8B5CF6]"
    },
    {
      id: 3,
      text: "Want to set this up\nyourself?\n100% free & setup in 30s",
      bgColor: "bg-gradient-to-br from-[#00D4FF] via-[#0ea5e9] to-[#0284c7]",
      textColor: "text-white",
      animation: "scaleInBounce",
      accent: "from-[#00D4FF]"
    },
    {
      id: 4,
      text: "Yes, and it's\nMeta approved",
      bgColor: "bg-gradient-to-br from-[#1877f2] via-[#42a5f5] to-[#1e40af]",
      textColor: "text-white",
      animation: "scaleInBounce",
      accent: "from-[#1877f2]"
    },
    {
      id: 5,
      text: "We've got\nyou covered",
      bgColor: "bg-gradient-to-br from-[#8B5CF6] via-[#7c3aed] to-[#6d28d9]",
      textColor: "text-white",
      animation: "fadeInUp",
      accent: "from-[#8B5CF6]"
    },
    {
      id: 6,
      text: "Join ScaleDM for free\nSetup your \ncomment-to-link solution\n in 30s",
      bgColor: "bg-gradient-to-br from-[#00D4FF] via-[#8B5CF6] to-[#00D4FF]",
      textColor: "text-white",
      animation: "typewriter",
      accent: "from-[#00D4FF]"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000); // 6 seconds per slide for better readability
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isPaused, slides.length]);

  const handleStart = () => {
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

      {/* Slide Counter */}
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

      {/* Video-like Fixed Container */}
      <div className="w-full flex-1 flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <div 
          className="video-container"
          style={{
            width: aspect === '1:1' ? '600px' : '400px',
            height: aspect === '1:1' ? '600px' : '711px',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#000',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            flexShrink: 0,
            flexGrow: 0
          }}
        >
              {/* Smooth Framer Motion Animation Slide */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  className={`absolute inset-0 ${currentSlideData.bgColor} overflow-hidden`}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={slideVariants[currentSlideData.animation]}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    staggerChildren: 0.1
                  }}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0">
                    <motion.div 
                      className={`absolute top-10 left-10 w-32 h-32 bg-gradient-to-br ${currentSlideData.accent} opacity-20 rounded-full blur-2xl`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className={`absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br ${currentSlideData.accent} opacity-30 rounded-full blur-xl`}
                      animate={{ 
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className={`absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br ${currentSlideData.accent} opacity-25 rounded-full blur-lg`}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.25, 0.5, 0.25]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  <div className="text-center px-8 relative z-10">
                    {/* Smooth Subtitle Animation */}
                    {currentSlideData.subtitle && (
                      <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                      >
                        <p className={`text-lg md:text-xl font-medium ${currentSlideData.textColor} tracking-wide`}>
                          {currentSlideData.subtitle}
                        </p>
                      </motion.div>
                    )}
                    
                    {/* Smooth Main Text Animation with Line Breaks */}
                    <motion.h1 
                      className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight ${currentSlideData.textColor}`}
                      style={{
                        textShadow: '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                        whiteSpace: 'pre-line',
                        textAlign: 'center'
                      }}
                      initial="initial"
                      animate="animate"
                      variants={slideVariants[currentSlideData.animation]}
                      transition={{ delay: 0.4, duration: 1.0, ease: "easeOut" }}
                    >
                      {currentSlideData.text}
                    </motion.h1>
                    
                    {/* Animated Thumbs Down for Slide 6 (CTA Direction) */}
                    {currentSlide === 5 && (
                      <motion.div 
                        className="mt-8"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          y: [0, -10, 0],
                          scale: 1
                        }}
                        transition={{ 
                          delay: 1.5, 
                          duration: 0.8, 
                          ease: "easeOut",
                          y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <div className="text-6xl animate-bounce">
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
                </motion.div>
              </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default ScaleDMAutomation;
