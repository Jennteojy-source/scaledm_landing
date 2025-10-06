import React, { useState } from 'react';

const ManyChatComparisonV2: React.FC = () => {
  const [aspect] = useState<'1:1' | '9:16'>('1:1');

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col overflow-hidden font-sans">
      <div className="w-full flex-1 flex items-center justify-center p-2">
        {(() => {
          const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';
          const maxWidth = aspect === '1:1' ? 'max-w-[500px]' : 'max-w-[350px]';
          return (
            <div className={`relative w-full ${maxWidth} ${aspectClass} bg-white rounded-3xl overflow-hidden shadow-2xl`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-8 text-center">
                
                {/* Headline */}
                <div className="mb-8">
                  <div className={`${aspect === '1:1' ? 'text-2xl' : 'text-xl'} font-black text-red-600 mb-2 tracking-wide uppercase`}>
                    STOP OVERPAYING
                  </div>
                  <h1 className={`${aspect === '1:1' ? 'text-3xl' : 'text-2xl'} font-black text-[#1a1a1a] tracking-tight leading-tight`}>
                    for Instagram DM Automation
                  </h1>
                </div>

                {/* Comparison Panels */}
                <div className={`flex ${aspect === '1:1' ? 'gap-4' : 'gap-3'} w-full ${aspect === '1:1' ? 'max-w-[500px]' : 'max-w-[350px]'}`}>
                  {/* ScaleDM Panel */}
                  <div className="flex-1 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-2xl p-5 text-white shadow-2xl">
                    <div className="text-center mb-4">
                      <h3 className={`${aspect === '1:1' ? 'text-lg' : 'text-base'} font-bold mb-2 flex items-center justify-center gap-2`}>
                        ScaleDM <span className="text-yellow-300">⭐</span>
                      </h3>
                      <div className={`${aspect === '1:1' ? 'text-4xl' : 'text-3xl'} font-black mb-1`}>$10</div>
                      <div className={`${aspect === '1:1' ? 'text-sm' : 'text-xs'} opacity-90 mb-3`}>∞ Per month, unlimited DMs</div>
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
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-5 text-gray-600 shadow-xl">
                    <div className="text-center mb-4">
                      <h3 className={`${aspect === '1:1' ? 'text-lg' : 'text-base'} font-bold mb-2 flex items-center justify-center gap-2`}>
                        ManyChat <span className="text-gray-500">💰</span>
                      </h3>
                      <div className={`${aspect === '1:1' ? 'text-3xl' : 'text-2xl'} font-black mb-1`}>~$435</div>
                      <div className={`${aspect === '1:1' ? 'text-sm' : 'text-xs'} opacity-70 mb-3`}>💬 Per month, up to 100K DMs</div>
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
                <div className="mt-8">
                  <button className={`bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white font-bold ${aspect === '1:1' ? 'px-8 py-4' : 'px-6 py-3'} rounded-full shadow-xl`}>
                    <div className={`${aspect === '1:1' ? 'text-base' : 'text-sm'} leading-tight flex items-center justify-center gap-2`}>
                      <span>🚀</span>
                      <div>
                        <div className="font-bold">Join ScaleDM</div>
                        <div className="text-xs opacity-90">Get your first 10K DMs free</div>
                      </div>
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
