import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Aspect = '1:1' | '9:16';

const slidesDefault = [
  { id: 1, title: 'Every Business need this in 2025' },
  { id: 2, title: 'ScaleDM – Automate your Instagram Growth', image: '/carousel_screen_2.jpeg' },
  { id: 3, title: 'Save Time with ReplyRush', image: '/notif.png' },
  { id: 4, title: "Don’t get stuck doing it all yourself!", image: '/amazon.png' },
];

const CarouselAds: React.FC = () => {
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
          <AnimatePresence mode="popLayout">
            <motion.div
              key={slides[index].id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex flex-col"
            >
              {slides[index].id === 1 ? (
                <div
                  className="flex-1 relative bg-white flex items-center justify-center"
                >
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
                      backgroundSize: '60px 60px',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="relative text-center px-6">
                    <div className="text-[28px] sm:text-[42px] md:text-[54px] font-extrabold text-black leading-tight tracking-tight">
                      <div>Every Business</div>
                      <div>need this in</div>
                      <div className="text-[#1e73ff] drop-shadow-[0_2px_0_rgba(30,115,255,0.15)]">2025</div>
                    </div>
                    <div className="mt-3 text-sm sm:text-base text-neutral-600">Swipe👉</div>
                  </div>
                </div>
              ) : slides[index].id === 2 ? (
                <div className="flex-1 relative bg-white">
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
                      backgroundSize: '60px 60px',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="relative h-full w-full flex flex-col">
                    <div className="px-5 pt-6 text-center">
                      <div className="inline-block">
                        <div className="text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-black leading-tight tracking-tight">ScaleDM</div>
                        <div className="h-1 bg-[#1e73ff] rounded-full mt-2" />
                      </div>
                      <div className="mt-3 mx-auto max-w-[720px] text-[13px] sm:text-base text-neutral-700">Automate DMs, comments, and Story replies—save time, grow sales, stay connected.</div>
                    </div>
                    <div className="relative flex-1 flex items-end justify-center px-4 pb-6">
                      <div className="absolute bottom-[22%] sm:bottom-[24%] h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-[#1e73ff]/10 blur-2xl" />
                      {slides[index].image && (
                        <img
                          src={slides[index].image}
                          alt="ScaleDM showcase"
                          className="max-h-[55%] sm:max-h-[65%] object-contain z-10"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute left-3 sm:left-6 top-[42%] sm:top-[40%] bg-white text-black rounded-2xl border border-[#1e73ff]/30 shadow-[0_8px_24px_rgba(30,115,255,0.18)] px-3 sm:px-4 py-2 text-xs sm:text-sm z-30">
                        Instant DM Replies for IG Post/Reels
                      </div>
                      <div className="absolute right-3 sm:right-8 top-[52%] sm:top-[46%] bg-white text-black rounded-2xl border border-[#1e73ff]/30 shadow-[0_8px_24px_rgba(30,115,255,0.18)] px-3 sm:px-4 py-2 text-xs sm:text-sm z-30">
                        Comment Auto Reply
                      </div>
                      <div className="absolute left-4 sm:left-10 bottom-[26%] sm:bottom-[28%] bg-white text-black rounded-2xl border border-[#1e73ff]/30 shadow-[0_8px_24px_rgba(30,115,255,0.18)] px-3 sm:px-4 py-2 text-xs sm:text-sm z-30">
                        Comment Rewind
                      </div>
                      <div className="absolute left-6 bottom-[16%] sm:bottom-[18%] bg-white text-black rounded-2xl border border-[#1e73ff]/30 shadow-[0_8px_24px_rgba(30,115,255,0.18)] px-3 sm:px-4 py-2 text-xs sm:text-sm z-30">
                        Welcome Openers
                      </div>
                      <div className="absolute right-6 bottom-[18%] sm:bottom-[20%] bg-white text-black rounded-2xl border border-[#1e73ff]/30 shadow-[0_8px_24px_rgba(30,115,255,0.18)] px-3 sm:px-4 py-2 text-xs sm:text-sm z-30">
                        Conversation Starters in Inbox
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 relative bg-black">
                  {slides[index].image && (
                    <img
                      src={slides[index].image}
                      alt={slides[index].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-black/0">
                    <div className="text-white text-lg sm:text-2xl font-bold leading-snug">{slides[index].title}</div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>

      <div className="text-xs text-neutral-500">Swipe gestures are supported on mobile via buttons; we can add drag/swipe later if needed.</div>
    </div>
  );
};

export default CarouselAds;


