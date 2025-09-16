import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage =
  | 'post'            // 1. Post feed with CTA in caption
  | 'typeComment'     // 2. User types comment
  | 'showComment'     // 3. Comment appears in thread
  | 'notify'          // 4. IG DM notification badge + banner
  | 'openDm'          // 5. DM thread with message + CTA button
  | 'openWeb'         // 6. In-app browser opening landing page
  ;

const PHONE_W = 375; // iPhone X width for authenticity

const Animation: React.FC = () => {
  const [stage, setStage] = useState<Stage>('post');
  const [typed, setTyped] = useState<string>('');
  const [isPressingCta, setIsPressingCta] = useState<boolean>(false);
  const [dmDot, setDmDot] = useState<boolean>(false);
  const loopRef = useRef<number>(0);

  const commentText = useMemo(() => 'scale', []);

  // Orchestrate the sequence and ensure auto-start + loop
  useEffect(() => {
    const timers: number[] = [];

    const kickOff = () => {
      setStage('typeComment');
      setTyped('');
      const chars = commentText.split('');
      chars.forEach((ch, i) => {
        timers.push(window.setTimeout(() => setTyped(prev => prev + ch), 220 * (i + 1)));
      });
      timers.push(window.setTimeout(() => setStage('showComment'), 220 * commentText.length + 500));
    };

    if (stage === 'post') {
      timers.push(window.setTimeout(kickOff, 800));
    }

    if (stage === 'showComment') {
      // Brief pause, then show notification
      timers.push(window.setTimeout(() => {
        setDmDot(true);
        setStage('notify');
      }, 900));
    }

    if (stage === 'notify') {
      // Show banner, then open DM
      timers.push(window.setTimeout(() => setStage('openDm'), 1600));
    }

    if (stage === 'openDm') {
      // Auto press CTA, then open web
      timers.push(window.setTimeout(() => {
        setIsPressingCta(true);
        timers.push(window.setTimeout(() => {
          setIsPressingCta(false);
          setStage('openWeb');
        }, 260));
      }, 1200));
    }

    if (stage === 'openWeb') {
      // Pause then loop back and reset DM dot
      timers.push(window.setTimeout(() => {
        loopRef.current += 1;
        setDmDot(false);
        setStage('post');
      }, 2400));
    }

    return () => timers.forEach(t => window.clearTimeout(t));
  }, [stage, commentText]);

  const openRealLanding = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="w-full flex justify-center py-6">
      <div className="bg-black rounded-[40px] overflow-hidden border-4 border-neutral-800 shadow-2xl" style={{ width: PHONE_W, height: 812 }}>
        {/* IG Header */}
        <div className="h-12 flex items-center justify-between px-3 border-b border-neutral-800 text-white">
          <InstagramWordmark />
          <div className="flex items-center gap-4">
            <HeartIcon />
            <div className="relative">
              <DmIcon />
              {dmDot && (
                <span className="absolute -top-0.5 -right-0.5 inline-block w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
              )}
            </div>
          </div>
        </div>

        {/* Notification banner */}
        <AnimatePresence>
          {stage === 'notify' && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-[320px] z-20"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              <div className="bg-neutral-900/95 text-white backdrop-blur border border-neutral-800 shadow-lg rounded-2xl px-3 py-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <RocketIcon />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="font-semibold">New message from scaledm.io</div>
                  <div className="text-neutral-400">Check your inbox for the link!</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen area */}
        <div className="relative w-full h-[calc(100%-48px)] bg-black text-white">
          {/* Post screen */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ x: stage === 'post' || stage === 'typeComment' || stage === 'showComment' ? 0 : -24, opacity: stage === 'post' || stage === 'typeComment' || stage === 'showComment' ? 1 : 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <PostScreenIG stage={stage} typed={typed} />
          </motion.div>

          {/* DM screen */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ x: stage === 'openDm' ? 0 : 24, opacity: stage === 'openDm' ? 1 : 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <DmScreenIG pressing={isPressingCta} />
          </motion.div>

          {/* Web screen */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ y: stage === 'openWeb' ? 0 : 812 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <WebScreenIG onOpenReal={openRealLanding} />
          </motion.div>
        </div>

        {/* IG Footer */}
        <div className="h-12 flex items-center justify-around border-t border-neutral-800 bg-black text-white">
          <HomeIcon />
          <SearchIcon />
          <PlusIcon />
          <ReelsIcon />
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img src="/user3.png" alt="profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PostScreenIG: React.FC<{ stage: Stage; typed: string; }> = ({ stage, typed }) => {
  const isTyping = stage === 'typeComment';
  const hasSubmitted = stage === 'showComment' || stage === 'notify' || stage === 'openDm' || stage === 'openWeb';
  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Post header */}
      <div className="flex items-center px-3 py-2">
        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
          <img src="/business.png" alt="business" className="w-full h-full object-cover" />
        </div>
        <span className="font-semibold text-sm">scaledm.io</span>
        <div className="ml-auto opacity-70"><MoreIcon /></div>
      </div>

      {/* Media */}
      <div className="bg-neutral-800 aspect-square w-full" />

      {/* Action bar */}
      <div className="flex items-center p-3 gap-4">
        <HeartIcon />
        <CommentIcon />
        <DmIcon />
        <div className="ml-auto"><BookmarkIcon /></div>
      </div>

      {/* Likes + caption */}
      <div className="px-3 text-sm">
        <p className="font-semibold">1,234 likes</p>
        <p>
          <span className="font-semibold">scaledm.io</span> Want to automatically send a link to everyone who comments? Comment <span className="font-bold text-sky-400">SCALE</span> to get started.
        </p>
      </div>

      {/* Comments */}
      <div className="px-3 text-sm mt-2 space-y-2">
        {isTyping ? (
          <div className="text-neutral-500">Add a comment...</div>
        ) : null}
        {hasSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="/user1.png" alt="user1" className="w-full h-full object-cover" />
            </div>
            <p><span className="font-semibold">you</span> {typed}</p>
          </motion.div>
        ) : null}
        {/* Preloaded sample commenters */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src="/user1.png" alt="jae lissy" className="w-full h-full object-cover" />
          </div>
          <p><span className="font-semibold">jae lissy</span> love this 🍂</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src="/user2.png" alt="jinglekitty" className="w-full h-full object-cover" />
          </div>
          <p><span className="font-semibold">jinglekitty</span> cozy socks season!</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src="/user3.png" alt="dinanaleson" className="w-full h-full object-cover" />
          </div>
          <p><span className="font-semibold">dinanaleson</span> need a pair 😍</p>
        </div>
      </div>

      {/* Typing input simulation */}
      {isTyping && (
        <motion.div className="p-3 border-t border-neutral-800" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="/user2.png" alt="user2" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow ml-3 text-neutral-300">
              <span>{typed}</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const DmScreenIG: React.FC<{ pressing: boolean; }> = ({ pressing }) => {
  return (
    <div className="h-full flex flex-col bg-black text-white">
      <div className="flex items-center p-3 border-b border-neutral-800">
        <ChevronLeftIcon />
        <div className="w-8 h-8 rounded-full overflow-hidden ml-4 mr-3">
          <img src="/business.png" alt="business" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-sm leading-none">scaledm.io</p>
          <p className="text-xs text-neutral-400">Business chat</p>
        </div>
        <div className="flex items-center gap-4 ml-auto opacity-80">
          <PhoneIcon />
          <VideoIcon />
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-end gap-2">
        <motion.div className="p-3 bg-neutral-800 rounded-2xl max-w-[70%] self-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-bold">Automate your Instagram engagement with ScaleDM</p>
          <p className="text-sm mt-1 text-neutral-300">Transform comments into conversations and boost your social media presence.</p>
        </motion.div>
        <motion.div className="self-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button className={`bg-white text-black font-semibold py-2 px-5 rounded-2xl transition-transform ${pressing ? 'scale-95' : 'scale-100'}`}>Get Started</button>
        </motion.div>
      </div>
      <div className="p-3 border-t border-neutral-800">
        <div className="bg-neutral-900 rounded-full flex items-center px-4 py-2">
          <SmileIcon />
          <div className="bg-transparent flex-grow mx-3 text-sm text-neutral-400">Message...</div>
          <MicIcon />
          <PaperclipIcon />
        </div>
      </div>
    </div>
  );
};

const WebScreenIG: React.FC<{ onOpenReal: () => void; }> = ({ onOpenReal }) => {
  return (
    <div className="h-full bg-neutral-100 flex flex-col text-black">
      <div className="p-2 bg-neutral-200">
        <div className="bg-white rounded-lg px-3 py-1 text-sm text-neutral-600 flex items-center">
          <LockIcon />
          scaledm.io
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-6">
            <RocketIcon />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to ScaleDM</h1>
          <p className="text-neutral-600 max-w-sm mx-auto">Your journey to automated Instagram growth starts now. Sign up to get started!</p>
          <button className="mt-6 bg-blue-500 text-white font-bold py-2.5 px-6 rounded-lg shadow hover:bg-blue-600" onClick={onOpenReal}>Create Free Account</button>
        </div>
      </div>
    </div>
  );
};

// ----- Inline SVG Icons (minimal set, no extra libs) -----
const InstagramWordmark: React.FC = () => (
  <div className="flex items-center h-full">
    <span className="text-xl font-semibold">Instagram</span>
  </div>
);

const RocketIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#0095F6"/>
    <path d="M26.2857 12.8572L18.8571 20.2857M26.2857 12.8572L21.4286 27.4286C21.2595 27.7853 21.0068 28.0932 20.702 28.3219C20.3972 28.5506 20.0522 28.6914 19.6929 28.7286C19.3335 28.7658 18.9764 28.6981 18.6548 28.5323C18.3333 28.3665 18.0592 28.1091 17.8629 27.7914L14.5714 22.2857L9.06571 18.9943C8.74803 18.798 8.49061 18.5238 8.32483 18.2023C8.15905 17.8808 8.09132 17.5237 8.12857 17.1643C8.16578 16.8049 8.30664 16.46 8.53531 16.1552C8.76398 15.8504 9.07193 15.5977 9.42857 15.4286L24.5714 10.5714C24.9308 10.4023 25.3268 10.3236 25.7143 10.3429C26.1018 10.3621 26.4714 10.4786 26.7914 10.68L26.2857 12.8572Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
);
const DmIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
);
const CommentIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>
);
const BookmarkIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>
);
const MoreIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
);
const HomeIcon: React.FC = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"/></svg>
);
const SearchIcon: React.FC = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
);
const PlusIcon: React.FC = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
);
const ReelsIcon: React.FC = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="4"/><path d="M2 8h20M8 3l4 5M16 3l4 5"/></svg>
);
const ChevronLeftIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
);
const PhoneIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.19a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z"/></svg>
);
const VideoIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
);
const SmileIcon: React.FC = () => (
  <svg className="w-6 h-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
const MicIcon: React.FC = () => (
  <svg className="w-6 h-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
);
const PaperclipIcon: React.FC = () => (
  <svg className="w-6 h-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05 12 20.5a6 6 0 1 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.17 18.17a2 2 0 1 1-2.83-2.83l8.49-8.49"/></svg>
);
const LockIcon: React.FC = () => (
  <svg className="w-4 h-4 mr-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
);

export default Animation;


