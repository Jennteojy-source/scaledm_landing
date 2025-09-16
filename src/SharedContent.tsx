import React from 'react';

interface SharedContentProps {
  is916?: boolean;
}

const SharedContent: React.FC<SharedContentProps> = ({ is916 = false }) => {
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

  // Responsive classes based on version
  const classes = is916 ? {
    container: "flex flex-col items-center px-5 pt-8 pb-4 text-center",
    headline: "mb-4 text-[2rem] leading-[1.1] font-black tracking-[-0.02em] drop-shadow-lg text-[#1a1a1a]",
    problem: "text-[#6b7280] text-[1.2rem] font-medium mb-4 leading-relaxed max-w-[95%]",
    solution: "mb-5 text-[#374151] text-[1.1rem] font-bold leading-tight max-w-[98%]",
    hero: "w-[420px] max-w-[95%] object-cover mb-5 rounded-lg shadow-lg",
    featuresContainer: "flex flex-wrap justify-center gap-2.5 w-full",
    feature: "px-6 py-4 rounded-full text-base font-bold shadow-md border-2"
  } : {
    container: "flex flex-col items-center px-8 pt-12 pb-6 text-center",
    headline: "mb-6 text-[3.2rem] leading-[1.05] font-black tracking-[-0.02em] drop-shadow-xl text-[#1a1a1a]",
    problem: "text-[#6b7280] text-[1.8rem] font-medium mb-6 leading-relaxed max-w-[95%]",
    solution: "mb-8 text-[#374151] text-[1.6rem] font-bold leading-tight max-w-[98%]",
    hero: "w-[900px] max-w-[95%] object-cover mb-8 rounded-xl shadow-xl",
    featuresContainer: "flex flex-wrap justify-center gap-3",
    feature: "px-8 py-5 rounded-full text-lg font-bold shadow-lg border-2"
  };

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

      {/* Hero */}
      <img src="/Final v2.png" alt="ScaleDM example" className={classes.hero} />

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
