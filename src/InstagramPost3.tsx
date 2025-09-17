import React, { useEffect, useMemo, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';

const InstagramPost3: React.FC = () => {
  const targetClicks = 762;
  const [displayClicks, setDisplayClicks] = useState<number>(0);
  const clicksMv = useMotionValue(0);

  useEffect(() => {
    let isCancelled = false;
    const unsub = clicksMv.on("change", (v) => setDisplayClicks(Math.round(v as number)));

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const loop = async () => {
      while (!isCancelled) {
        clicksMv.set(0);
        const controls = animate(clicksMv, targetClicks, {
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1]
        });
        await controls.finished.catch(() => {});
        await sleep(1200);
      }
    };
    loop();

    return () => {
      isCancelled = true;
      unsub();
    };
  }, [clicksMv, targetClicks]);

  const bubbleShadow = useMemo(() => ({
    boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
  }), []);

  return (
    <div className="w-full flex flex-col items-center px-3 pb-10">
      {/* Component-specific headline */}
      <h2 className="w-full max-w-[900px] text-center px-4 pt-6 pb-3 text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
        Track how many people click your link
      </h2>
      <div className="relative max-w-[850px] w-full bg-white rounded-none shadow border border-neutral-200 overflow-hidden flex flex-col h-[660px] sm:h-[700px] md:h-[760px] min-h-0">
        {/* Post header */}
        <div className="px-4 py-3 flex items-center gap-3">
          <img src="/business.png" alt="profile" className="w-9 h-9 rounded-full object-cover" />
          <div className="text-sm">
            <p className="font-semibold">bestdailydeals</p>
          </div>
          <div className="ml-auto text-neutral-500">•••</div>
        </div>

        {/* Media */}
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] bg-neutral-50">
          <img src="/hero-5.webp" alt="product" className="w-full h-full object-cover" loading="lazy" />

          {/* Floating clicks bubble */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={bubbleShadow}
            className="absolute right-3 sm:right-6 -bottom-8 sm:-bottom-10 bg-white rounded-[28px] px-4 sm:px-5 py-3 flex items-center gap-3 border border-neutral-200"
          >
            <motion.span
              initial={{ scale: 0.9, rotate: -6 }}
              animate={{ scale: [1, 1.08, 1], rotate: [-6, -2, -6] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3l6 12 2-4 4-2-12-6z" />
                <path d="M14 14l3 3" />
              </svg>
            </motion.span>
            <span className="text-neutral-800 text-base sm:text-lg font-semibold tabular-nums">{displayClicks.toLocaleString()} clicks</span>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 flex items-center gap-4 text-neutral-800">
          <IconHeart />
          <IconComment />
          <IconDM />
          <div className="ml-auto"><IconSave /></div>
        </div>

        {/* Caption */}
        <div className="px-4 pb-4 text-sm">
          <p className="font-semibold">2,341 likes</p>
          <p className="mt-1"><span className="font-semibold">bestdailydeals</span> Denim Blue Jeans — lightweight, stretchy, and quick drying.</p>
          <div className="mt-3">
            <button className="px-4 py-2 rounded-md bg-neutral-900 text-white text-sm font-semibold">Buy here</button>
          </div>
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

export default InstagramPost3;


