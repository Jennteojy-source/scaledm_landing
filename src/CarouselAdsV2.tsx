import React, { useMemo, useState, useCallback } from 'react';

type Aspect = '1:1' | '9:16';

const slidesDefault = [
  { 
    id: 1, 
    title: 'Why do creators ask you to comment "LINK"?',
    subtitle: 'They want your attention... but there\'s a smarter way'
  },
  { 
    id: 2, 
    title: 'Top creators use this secret',
    subtitle: 'Comment keywords trick the algorithm to show their posts to more people'
  },
  { 
    id: 3, 
    title: 'Then they auto-DM everyone',
    subtitle: 'Sending website links directly to your inbox for instant traffic'
  },
  { 
    id: 4, 
    title: 'ScaleDM automates this entire process',
    subtitle: 'Set it up once, grow forever'
  },
  { 
    id: 5, 
    title: 'Instagram approved • First 10k DMs free',
    subtitle: 'Join thousands of creators growing with ScaleDM'
  },
];

const CarouselAdsV2: React.FC = () => {
  const [aspect, setAspect] = useState<Aspect>('1:1');
  const [index, setIndex] = useState<number>(0);
  const slides = useMemo(() => slidesDefault, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  const containerAspect = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 p-3">
      <div className="w-full max-w-[900px] flex items-center justify-between gap-3">
        <button onClick={prev} className="px-3 py-1.5 rounded-md border border-neutral-300">Prev</button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAspect('1:1')}
            className={`hidden sm:inline-flex px-3 py-1.5 rounded-md text-sm border ${aspect==='1:1' ? 'bg-black text-white' : 'bg-white'} border-neutral-300`}
          >1:1</button>
          <button
            onClick={() => setAspect('9:16')}
            className={`hidden sm:inline-flex px-3 py-1.5 rounded-md text-sm border ${aspect==='9:16' ? 'bg-black text-white' : 'bg-white'} border-neutral-300`}
          >9:16</button>
        </div>
        <button onClick={next} className="px-3 py-1.5 rounded-md border border-neutral-300">Next</button>
      </div>

      <div className={`relative w-full max-w-[900px] bg-white border border-neutral-200 shadow overflow-hidden ${containerAspect}`}>
        <div className="absolute inset-0">
          <div className="w-full h-full flex flex-col">
              {/* Common background pattern */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
                  backgroundSize: aspect === '1:1' ? '75px 75px' : '50px 50px',
                  backgroundPosition: 'center',
                }}
              />

              {/* Slide 1 */}
              {slides[index].id === 1 && (
                <div className="flex-1 relative bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="absolute inset-[6%] sm:inset-[7%] md:inset-[8%] flex flex-col items-center justify-center">
                    <div className="text-center px-4">
                      <div className={`${aspect === '1:1' ? 'text-[28px] sm:text-[36px] md:text-[42px]' : 'text-[20px] sm:text-[28px]'} font-extrabold text-black leading-tight tracking-tight mb-4`}>
                        Why do creators ask you to comment "LINK"?
                      </div>
                      
                      <div className={`${aspect === '1:1' ? 'text-[16px] sm:text-[18px] md:text-[20px]' : 'text-[14px] sm:text-[16px]'} text-neutral-700 leading-relaxed`}>
                        They want your attention... but there's a smarter way
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 2 */}
              {slides[index].id === 2 && (
                <div className="flex-1 relative bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="absolute inset-[6%] sm:inset-[7%] md:inset-[8%] flex flex-col items-center justify-center">
                    <div className="text-center px-4">
                      <div className={`${aspect === '1:1' ? 'text-[28px] sm:text-[36px] md:text-[42px]' : 'text-[20px] sm:text-[28px]'} font-extrabold text-black leading-tight tracking-tight mb-4`}>
                        Top creators use this secret
                      </div>
                      
                      <div className={`${aspect === '1:1' ? 'text-[16px] sm:text-[18px] md:text-[20px]' : 'text-[14px] sm:text-[16px]'} text-neutral-700 leading-relaxed`}>
                        Comment keywords trick the algorithm to show their posts to more people
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3 */}
              {slides[index].id === 3 && (
                <div className="flex-1 relative bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="absolute inset-[6%] sm:inset-[7%] md:inset-[8%] flex flex-col items-center justify-center">
                    <div className="text-center px-4">
                      <div className={`${aspect === '1:1' ? 'text-[28px] sm:text-[36px] md:text-[42px]' : 'text-[20px] sm:text-[28px]'} font-extrabold text-black leading-tight tracking-tight mb-4`}>
                        Then they auto-DM everyone
                      </div>
                      
                      <div className={`${aspect === '1:1' ? 'text-[16px] sm:text-[18px] md:text-[20px]' : 'text-[14px] sm:text-[16px]'} text-neutral-700 leading-relaxed`}>
                        Sending website links directly to your inbox for instant traffic
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 4 */}
              {slides[index].id === 4 && (
                <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="absolute inset-[6%] sm:inset-[7%] md:inset-[8%] flex flex-col items-center justify-center">
                    <div className="text-center px-4">
                      <div className={`${aspect === '1:1' ? 'text-[28px] sm:text-[36px] md:text-[42px]' : 'text-[20px] sm:text-[28px]'} font-extrabold text-black leading-tight tracking-tight mb-4`}>
                        ScaleDM automates this entire process
                      </div>
                      
                      <div className={`${aspect === '1:1' ? 'text-[20px] sm:text-[24px] md:text-[28px]' : 'text-[16px] sm:text-[20px]'} font-bold text-blue-600 leading-relaxed`}>
                        Set it up once, grow forever
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 5 */}
              {slides[index].id === 5 && (
                <div className="flex-1 relative bg-gradient-to-br from-emerald-50 to-green-50">
                  <div className="absolute inset-[6%] sm:inset-[7%] md:inset-[8%] flex flex-col items-center justify-center">
                    <div className="text-center px-4">
                      <div className={`${aspect === '1:1' ? 'text-[24px] sm:text-[32px] md:text-[38px]' : 'text-[18px] sm:text-[24px]'} font-extrabold text-black leading-tight tracking-tight mb-4`}>
                        Instagram approved • First 10k DMs free
                      </div>
                      
                      <div className={`${aspect === '1:1' ? 'text-[18px] sm:text-[20px] md:text-[22px]' : 'text-[14px] sm:text-[16px]'} text-neutral-700 leading-relaxed mb-6`}>
                        Join thousands of creators growing with ScaleDM
                      </div>

                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full shadow-xl font-bold text-base sm:text-lg">
                        Join ScaleDM
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        
        {/* Slide indicator dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-xs text-neutral-500">Swipe gestures are supported on mobile via buttons; we can add drag/swipe later if needed.</div>
    </div>
  );
};

export default CarouselAdsV2;
