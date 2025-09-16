import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InstagramPost2: React.FC = () => {
  const [step, setStep] = useState<number>(0); // each commenter has 2 steps: comment then reply
  const commenters = useMemo(() => [
    { user: 'jae_lissy_', text: 'NEED', avatar: '/user1.png' },
    { user: 'jinglekitty', text: 'Need', avatar: '/user2.png' },
    { user: 'diana.nelson.7127', text: 'Need', avatar: '/user3.png' },
  ], []);
  const keyword = useMemo(() => 'NEED', []);

  useEffect(() => {
    const totalSteps = commenters.length * 2;
    const delay = step % 2 === 0 ? 700 : 900; // comment then reply

    if (step < totalSteps) {
      const t = window.setTimeout(() => setStep(prev => prev + 1), delay);
      return () => window.clearTimeout(t);
    }

    // Pause, then loop
    const resetTimer = window.setTimeout(() => setStep(0), 1800);
    return () => window.clearTimeout(resetTimer);
  }, [step, commenters.length]);

  return (
    <div className="w-full flex justify-center px-3 pb-10">
      <div className="max-w-[680px] w-full bg-white rounded-2xl shadow border border-neutral-200 overflow-hidden flex flex-col h-[820px]">

        {/* Post header */}
        <div className="px-4 py-3 flex items-center gap-3">
          <img src="/business.png" alt="profile" className="w-9 h-9 rounded-full object-cover" />
          <div className="text-sm">
            <p className="font-semibold">bestdailydeals</p>
          </div>
          <div className="ml-auto text-neutral-500">•••</div>
        </div>

        {/* Caption area (no media) */}
        <div className="w-full px-4 pt-2 pb-4">
          <p className="text-sm"><span className="font-semibold">bestdailydeals</span> Amazon deals on stuff you actually need!</p>
          <p className="text-sm mt-3">Comment <span className="font-bold">NEED</span> and I’ll DM you all the promo codes and Amazon product links.</p>
          <p className="text-sky-500 text-sm mt-3">#amazondeals #deals</p>
          <p className="text-neutral-400 text-xs mt-2">14h</p>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 flex items-center gap-4 text-neutral-800">
          <IconHeart />
          <IconComment />
          <IconDM />
          <div className="ml-auto"><IconSave /></div>
        </div>

        {/* Caption */}
        <div className="px-4 pb-2 text-sm">
          <p className="font-semibold">1,058 likes</p>
          <p className="mt-1">
            <span className="font-semibold">bestdailydeals</span> Comment <span className="font-bold">NEED</span> and I’ll DM you all the promo codes and links.
          </p>
          <p className="text-sky-500 mt-1">#amazondeals #deals #amazoncodes</p>
        </div>

        {/* Comments thread */}
        <div className="px-4 pb-4 text-sm flex-1 overflow-visible">
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
                          <p className="text-neutral-800"><span className="font-semibold">bestdailydeals</span> <span className="text-sky-600">@{c.user}</span> Sent! Check your message requests if you don’t see it.</p>
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


