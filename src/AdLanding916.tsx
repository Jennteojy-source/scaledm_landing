import React from 'react';
import SharedContent from './SharedContent';

// 9:16 version (405x720) for Stories/Reels style ads
const AdLanding916: React.FC = () => {
  return (
    <div className="relative w-[405px] h-[720px] bg-gradient-to-b from-[#ffffff] via-[#f0f9ff] to-[#e0f2fe] flex flex-col overflow-hidden font-sans">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#00D4FF]/15 to-[#8B5CF6]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-[#00D4FF]/15 blur-3xl" />

      {/* Main Content */}
      <SharedContent is916={true} />
    </div>
  );
};

export default AdLanding916;


