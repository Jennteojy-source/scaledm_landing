import React, { useState } from 'react';
import SharedContent from './SharedContent';

const AdLanding: React.FC = () => {
  const [aspect, setAspect] = useState<'1:1' | '9:16'>('9:16');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#ffffff] via-[#f0f9ff] to-[#e0f2fe] flex flex-col overflow-hidden font-sans">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-20 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#00D4FF]/15 to-[#8B5CF6]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-[#00D4FF]/15 blur-3xl" />
      {/* Top controls */}
      <div className="w-full flex items-center justify-center gap-4 pt-3 flex-wrap">
        {/* Aspect ratio */}
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
        {/* Play controls outside the ad container */}
        <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
          <button
            onClick={() => { setIsPlaying(true); setIsPaused(false); }}
            disabled={isPlaying && !isPaused}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${isPlaying && !isPaused ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-[#00D4FF] to-[#0ea5e9] text-white'} shadow`}
          >▶ Start</button>
          <button
            onClick={() => { if (isPlaying) setIsPaused(!isPaused); }}
            disabled={!isPlaying}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${!isPlaying ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white'} shadow`}
          >{isPaused ? '▶ Resume' : '⏸ Pause'}</button>
          <button
            onClick={() => { setIsPlaying(false); setIsPaused(false); setResetCounter(c => c + 1); }}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow"
          >🔄 Restart</button>
        </div>
      </div>

      {/* Aspect-controlled container wrapping ALL content */}
      <div className="w-full flex-1 flex items-center justify-center px-4 py-6">
        {(() => {
          const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';
          const maxWidth = aspect === '1:1' ? 'max-w-[600px]' : 'max-w-[400px]';
          return (
            <div className={`relative w-full ${maxWidth} ${aspectClass} bg-white border border-neutral-200 shadow-xl rounded-2xl overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <SharedContent is916={false} aspect={aspect} playing={isPlaying} paused={isPaused} resetCounter={resetCounter} />
              </div>
            </div>
          );
        })()}
      </div>

    </div>
  );
};

export default AdLanding;