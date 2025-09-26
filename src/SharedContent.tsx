import React from 'react';

interface SharedContentProps {
  is916?: boolean;
  aspect?: '1:1' | '9:16';
}

const SharedContent: React.FC<SharedContentProps> = ({ is916 = false, aspect = '9:16' }) => {
  // Content configuration - update here to change both versions
  const content = {
    headline: "Are you an IG creator or business?",
    problem: "Can't share links on your IG posts? Losing traffic to your website? 💸",
    solution: "Sign up with ScaleDM to automatically DM your link to every commenter 🚀",
    features: [
      { text: "💸 100% Free", color: "text-[#4b5563] bg-[#f8f9fa] border-[#e9ecef]" },
      { text: "⚡ 30s Setup", color: "text-[#4b5563] bg-[#f8f9fa] border-[#e9ecef]" },
        { text: "✅ Instagram Approved Solution", color: "text-[#4b5563] bg-[#f8f9fa] border-[#e9ecef]" }
    ]
  };

  // Responsive classes based on version and aspect ratio
  const classes = is916 ? {
    container: "flex flex-col items-center px-5 pt-8 pb-4 text-center",
    headline: "mb-4 text-[2rem] leading-[1.1] font-black tracking-[-0.02em] drop-shadow-lg text-[#1a1a1a]",
    problem: "text-[#6b7280] text-[1.2rem] font-medium mb-4 leading-relaxed max-w-[95%]",
    solution: "mb-5 text-[#374151] text-[1.1rem] font-bold leading-tight max-w-[98%]",
    hero: "w-[420px] max-w-[95%] object-cover mb-5 rounded-lg shadow-lg",
    featuresContainer: "flex flex-wrap justify-center gap-2.5 w-full",
    feature: "px-6 py-4 rounded-full text-base font-bold shadow-md border-2"
  } : aspect === '1:1' ? {
    container: "flex flex-col items-center justify-center px-8 py-8 text-center h-full",
    headline: "mb-3 text-[1.8rem] leading-[1.1] font-black tracking-[-0.02em] drop-shadow-lg text-[#1a1a1a]",
    problem: "text-[#6b7280] text-[1.1rem] font-medium mb-3 leading-relaxed max-w-[95%]",
    solution: "mb-4 text-[#374151] text-[1rem] font-bold leading-tight max-w-[98%]",
    hero: "w-full h-full object-contain",
    featuresContainer: "flex flex-wrap justify-center gap-2 w-full",
    feature: "px-4 py-2.5 rounded-full text-sm font-bold shadow-md border-2"
  } : {
    container: "flex flex-col items-center justify-center px-6 py-8 text-center h-full",
    headline: "mb-4 text-[2.2rem] leading-[1.05] font-black tracking-[-0.02em] drop-shadow-xl text-[#1a1a1a]",
    problem: "text-[#6b7280] text-[1.2rem] font-medium mb-4 leading-relaxed max-w-[95%]",
    solution: "mb-6 text-[#374151] text-[1.1rem] font-bold leading-tight max-w-[98%]",
    hero: "w-[350px] max-w-[90%] object-cover mb-6 rounded-xl shadow-xl",
    featuresContainer: "flex flex-wrap justify-center gap-2.5",
    feature: "px-6 py-3 rounded-full text-base font-bold shadow-lg border-2"
  };

  const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';

  return (
    <div className={classes.container}>
      {/* Problem opener */}
      <div className={classes.headline}>
        <span className="text-[#1a1a1a]">
          {content.headline}
        </span>
      </div>
      <div className={classes.problem}>
        {content.problem}
      </div>

      {/* Solution line */}
      <div className={classes.solution}>
        <span dangerouslySetInnerHTML={{
          __html: content.solution.replace('ScaleDM', '<span class="text-[#1a1a1a] font-black bg-[#f0f0f0] px-2 py-1 rounded-md">ScaleDM</span>')
        }} />
      </div>

      {/* Hero image */}
      <div className={`w-full ${aspect === '1:1' ? 'h-full px-2 py-2' : is916 ? 'max-w-[420px]' : 'max-w-[350px]'} ${aspect === '1:1' ? '' : aspectClass} ${aspect === '1:1' ? '' : 'mb-6'}`}>
        <img 
          src="/Final v2.png" 
          alt="ScaleDM example" 
          className={`w-full h-full ${aspect === '1:1' ? 'object-contain' : 'object-cover rounded-xl shadow-xl'}`} 
        />
      </div>

      {/* Feature Pills */}
      <div className={classes.featuresContainer}>
        {content.features.map((feature, index) => (
          <span key={index} className={`${classes.feature} ${feature.color}`}>
            {feature.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SharedContent;
