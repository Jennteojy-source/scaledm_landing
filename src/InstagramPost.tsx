import React from 'react';
import { Icon } from '@iconify/react';

// Reusable pumpkin SVG (no external libraries)
const Pumpkin: React.FC<{ scale?: number; opacity?: number } & React.SVGProps<SVGGElement>> = ({ scale = 1, opacity = 0.9, ...props }) => (
  <g transform={`scale(${scale})`} opacity={opacity} {...props}>
    <defs>
      <linearGradient id="pumpkinBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <radialGradient id="pumpkinHighlight" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Lobes */}
    <ellipse cx="60" cy="40" rx="26" ry="24" fill="url(#pumpkinBody)" />
    <ellipse cx="42" cy="42" rx="22" ry="22" fill="url(#pumpkinBody)" />
    <ellipse cx="78" cy="42" rx="22" ry="22" fill="url(#pumpkinBody)" />
    {/* Center rib shading */}
    <path d="M60 18c-10 24-10 40 0 56" stroke="#9a3412" strokeWidth="3" strokeOpacity=".25" fill="none" />
    {/* Highlight */}
    <circle cx="48" cy="32" r="20" fill="url(#pumpkinHighlight)" />
    {/* Stem */}
    <path d="M60 16c0 0 0-10 8-12 5-2 10 0 14-6" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="56" y="10" width="8" height="12" rx="2" fill="#16a34a" />
    {/* Leaf */}
    <path d="M78 10c8 6 10 10 8 14-4 6-14 2-18-4 2-4 4-7 10-10z" fill="#22c55e" opacity=".8" />
    {/* Shadow */}
    <ellipse cx="60" cy="66" rx="34" ry="10" fill="#7c2d12" opacity=".15" />
  </g>
);

const InstagramPost: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-transparent">
      <div className="relative overflow-hidden" style={{ width: 'min(1080px, 92vw)', height: 'min(1080px, 92vw)' }}>
      {/* Fall background */}
      <div className="absolute inset-0">
        {/* warm fall gradient with transparency */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/70 via-orange-200/70 to-red-200/70"></div>
        {/* Fall leaves pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 1080 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="#ef4444"/>
            </linearGradient>
          </defs>
          {/* scatter leaves */}
          <g fill="url(#leafGrad)">
            <path d="M40 120c30-10 60 10 70 40-30 10-60-10-70-40z" opacity=".7"/>
            <path d="M240 80c28-8 50 8 58 34-26 9-49-7-58-34z" opacity=".6"/>
            <path d="M380 220c22-10 46 6 54 26-24 8-45-6-54-26z" opacity=".55"/>
            <path d="M720 140c30-12 56 10 66 36-28 10-55-8-66-36z" opacity=".6"/>
            <path d="M900 260c34-12 62 12 72 40-32 10-60-10-72-40z" opacity=".55"/>
            <path d="M160 420c34-12 60 12 70 38-30 10-58-10-70-38z" opacity=".5"/>
            <path d="M520 520c30-10 58 12 66 36-28 10-56-10-66-36z" opacity=".55"/>
            <path d="M860 520c26-10 50 8 58 30-24 10-48-6-58-30z" opacity=".5"/>
            <path d="M300 760c28-12 56 10 64 34-26 10-52-8-64-34z" opacity=".55"/>
            <path d="M680 800c34-12 60 12 70 38-30 10-58-10-70-38z" opacity=".55"/>
            <path d="M980 920c28-10 52 10 60 32-26 10-50-8-60-32z" opacity=".5"/>
            <path d="M120 900c22-8 42 8 48 26-22 8-40-6-48-26z" opacity=".5"/>
            <path d="M440 880c30-12 60 12 70 38-30 10-58-10-70-38z" opacity=".5"/>
            <path d="M820 700c22-10 42 8 50 24-22 10-40-6-50-24z" opacity=".5"/>
            <path d="M560 300c26-10 48 8 56 28-24 10-46-6-56-28z" opacity=".55"/>
            <path d="M100 600c28-12 56 10 64 34-26 10-52-8-64-34z" opacity=".45"/>
            <path d="M940 460c24-10 46 6 54 24-22 10-44-6-54-24z" opacity=".45"/>
          </g>
          
        </svg>
        {/* Iconify pumpkins layered as HTML for full compatibility */}
        <div className="absolute left-[90px] bottom-[80px] opacity-90">
          <Icon icon="noto:pumpkin" width="120" height="120" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[40px] opacity-85">
          <Icon icon="twemoji:pumpkin" width="100" height="100" />
        </div>
        <div className="absolute right-[90px] bottom-[80px] opacity-85">
          <Icon icon="fluent-emoji-high-contrast:jack-o-lantern-48" width="130" height="130" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-6">
        {/* Header text */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 text-center mb-6 leading-tight max-w-3xl">
          Using ScaleDM to drive traffic to your Amazon affiliates
        </h1>

        {/* Hero image without container */}
        <img 
          src="/hero-5.webp" 
          alt="Hero" 
          className="max-w-[90%] max-h-[75%] object-contain"
        />
      </div>

      {/* Logo removed per request */}
    </div>
    </div>
  );
};

export default InstagramPost;
