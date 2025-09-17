import React from 'react';

const InstagramPost4: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Square 1080px component */}
      <div className="relative w-[1080px] h-[1080px]">
        <div
          className="relative w-full h-full bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff] border border-neutral-200 shadow rounded-xl overflow-hidden"
        >
          {/* Headline inside the component - bigger with Instagram-style font */}
          <div className="absolute top-10 left-0 right-0 z-20">
            <h2 className="text-center px-6 text-4xl font-black tracking-tight text-neutral-900" style={{ fontFamily: 'Instagram Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Automatically send links to your audience via DM
            </h2>
          </div>

          {/* Subtle background accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-pink-200/30 blur-2xl" />
            <div className="absolute -bottom-12 -right-12 w-60 h-60 rounded-full bg-sky-200/30 blur-2xl" />
          </div>

          {/* Compact layout with tighter spacing */}
          <div className="relative z-10 h-full w-full p-5 pt-8">
            <div className="grid grid-cols-[1.3fr_0.4fr_1.3fr] gap-4 h-full items-center">
              {/* Base image - object-contain, no borders */}
              <div className="flex items-center justify-center h-full">
                <img 
                  src="/base.png" 
                  alt="base" 
                  className="max-w-full max-h-full object-contain rounded-lg" 
                />
              </div>

              {/* Arrow column with improved UI indication */}
              <div className="flex flex-col items-center justify-center h-full gap-4">
                {/* Comment trigger indicator */}
                <div className="bg-blue-500 text-white rounded-full px-6 py-3 text-base font-bold shadow-lg">
                  Comment "LINKS"
                </div>
                
                {/* Right arrow */}
                <svg viewBox="0 0 200 60" className="w-40 h-12 opacity-90">
                  <defs>
                    <marker id="arrow-right-4" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
                      <path d="M0,0 L8,4 L0,8 z" fill="#0ea5e9" />
                    </marker>
                  </defs>
                  <path d="M10,30 C70,30 130,30 190,30" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow-right-4)" strokeDasharray="6 6" fill="none" />
                </svg>

                {/* Notification indicator */}
                <div className="bg-green-500 text-white rounded-full px-6 py-3 text-base font-bold shadow-lg">
                  Get DM notification with links
                </div>
              </div>

              {/* Notif image - object-contain, no borders */}
              <div className="flex items-center justify-center h-full">
                <img 
                  src="/notif.png" 
                  alt="notification" 
                  className="max-w-full max-h-full object-contain rounded-lg" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPost4;
