import React, { useState, useEffect } from 'react';

const ScaleDMAutomation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [aspect, setAspect] = useState<'1:1' | '9:16'>('9:16');

  const slides = [
    {
      id: 1,
      text: "DO YOU SEE YOUR FAVORITE IG INFLUENCER ASK TO COMMENT ON THEIR POST FOR LINK?",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      id: 2,
      text: "THIS DRIVES MORE ENGAGEMENT, SIGNALLING TO THE INSTAGRAM ALGORITHM TO SHOW YOUR CONTENT TO MORE PEOPLE",
      bgColor: "bg-black",
      textColor: "text-yellow-400"
    },
    {
      id: 3,
      text: "WANT A SOLUTION THAT IS FREE, APPROVED BY META?",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      id: 4,
      text: "NO WORRIES WE CAN HELP",
      bgColor: "bg-black",
      textColor: "text-yellow-400"
    },
    {
      id: 5,
      text: "JOIN SCALEDM.IO SET UP IN LESS THAN 30S, 100% FREE",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // 3 seconds per slide
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
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isPlaying && !isPaused 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            ▶ Start
          </button>
          <button
            onClick={handlePause}
            disabled={!isPlaying}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              !isPlaying 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : isPaused 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-black scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Animation Container - Dynamic Aspect Ratio */}
      <div className="w-full flex-1 flex items-center justify-center px-4 py-6">
        {(() => {
          const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';
          const maxWidth = aspect === '1:1' ? 'max-w-[600px]' : 'max-w-[400px]';
          return (
            <div className={`relative w-full ${maxWidth} ${aspectClass} bg-white border border-neutral-200 shadow-xl rounded-2xl overflow-hidden`}>
              {/* Animation Slide */}
              <div 
                key={currentSlide}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${currentSlideData.bgColor}`}
              >
                <div className="text-center px-8">
                  <h1 
                    className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${currentSlideData.textColor} animate-fade-in`}
                    style={{
                      animation: 'fadeInUp 1s ease-out'
                    }}
                  >
                    {currentSlideData.text}
                  </h1>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

    </div>
  );
};

export default ScaleDMAutomation;
