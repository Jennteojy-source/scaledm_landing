import React, { useState } from 'react';

const ManyChatComparisonV2: React.FC = () => {
  const [aspect, setAspect] = useState<'1:1' | '9:16'>('1:1');

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#ffffff] via-[#f0f9ff] to-[#e0f2fe] flex flex-col overflow-hidden font-sans">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-20 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#8B5CF6]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#8B5CF6]/20 to-[#00D4FF]/20 blur-3xl" />
      
      {/* Top navigation to switch aspect ratio */}
      <div className="w-full flex items-center justify-center pt-3">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-2 py-1 shadow-sm">
          <button
            onClick={() => setAspect('1:1')}
            className={`px-3 py-1.5 rounded-full text-sm border ${aspect==='1:1' ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-black border-neutral-200'}`}
          >1:1</button>
          <button
            onClick={() => setAspect('9:16')}
            className={`px-3 py-1.5 rounded-full text-sm border ${aspect==='9:16' ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-black border-neutral-200'}`}
          >9:16</button>
        </div>
      </div>

      {/* Aspect-controlled container wrapping ALL content */}
      <div className="w-full flex-1 flex items-center justify-center px-4 py-6">
        {(() => {
          const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';
          const maxWidth = aspect === '1:1' ? 'max-w-[600px]' : 'max-w-[400px]';
          return (
            <div className={`relative w-full ${maxWidth} ${aspectClass} bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-6 text-center">
                
                {/* Headline */}
                <div className="mb-6">
                  <h1 className={`${aspect === '1:1' ? 'text-4xl' : 'text-2xl'} font-black text-[#1a1a1a] mb-4 tracking-tight leading-tight`}>
                    Looking for <span className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] bg-clip-text text-transparent">ManyChat</span><br />Alternative
                  </h1>
                </div>

                {/* Comparison Panels */}
                <div className={`flex ${aspect === '1:1' ? 'gap-4' : 'gap-3'} w-full ${aspect === '1:1' ? 'max-w-[500px]' : 'max-w-[350px]'}`}>
                  {/* ScaleDM Panel */}
                  <div className="flex-1 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-2xl p-4 text-white shadow-2xl border border-blue-300/20">
                    <div className="text-center mb-4">
                      <h3 className={`${aspect === '1:1' ? 'text-base' : 'text-sm'} font-bold mb-2`}>
                        ScaleDM
                      </h3>
                      <div className={`${aspect === '1:1' ? 'text-2xl' : 'text-xl'} font-black mb-1`}>$10</div>
                      <div className={`${aspect === '1:1' ? 'text-xs' : 'text-xs'} opacity-90 mb-3`}>Per month</div>
                    </div>
                    
                    <div className={`space-y-${aspect === '1:1' ? '2' : '1'}`}>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-green-400">✓</span>
                        <span>Unlimited DMs</span>
                      </div>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-green-400">✓</span>
                        <span>{aspect === '1:1' ? 'Setup less than 30s' : 'Quick setup'}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-green-400">✓</span>
                        <span>Resend DMs</span>
                      </div>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-green-400">✓</span>
                        <span>Simple pricing</span>
                      </div>
                    </div>
                  </div>

                  {/* ManyChat Panel */}
                  <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-2xl p-4 text-gray-600 shadow-xl">
                    <div className="text-center mb-4">
                      <h3 className={`${aspect === '1:1' ? 'text-base' : 'text-sm'} font-bold mb-2`}>
                        ManyChat
                      </h3>
                      <div className={`${aspect === '1:1' ? 'text-2xl' : 'text-xl'} font-black mb-1`}>$195</div>
                      <div className={`${aspect === '1:1' ? 'text-xs' : 'text-xs'} opacity-70 mb-3`}>Per month</div>
                    </div>
                    
                    <div className={`space-y-${aspect === '1:1' ? '2' : '1'}`}>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-gray-400">•</span>
                        <span>Up to 40K DMs</span>
                      </div>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-gray-400">•</span>
                        <span>Complex setup</span>
                      </div>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-gray-400">•</span>
                        <span>Ignore missed DMs</span>
                      </div>
                      <div className={`flex items-center gap-2 ${aspect === '1:1' ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-gray-400">•</span>
                        <span>Complex pricing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button at bottom */}
                <div className="mt-6">
                  <button className={`bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white font-bold ${aspect === '1:1' ? 'px-6 py-2' : 'px-4 py-1.5'} rounded-full shadow-xl border border-blue-400/30`}>
                    <div className={`${aspect === '1:1' ? 'text-sm' : 'text-xs'} leading-tight`}>
                      {aspect === '1:1' ? 'Join ScaleDM and get your first 10K DMs for free' : 'Join ScaleDM • Get 10K DMs free'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ManyChatComparisonV2;
