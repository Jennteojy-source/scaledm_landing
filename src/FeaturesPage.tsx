import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  description: string;
  tier: 'free' | 'pro';
  icon: React.ReactNode;
  iconStyle: {
    background: string;
    gradient: string;
    shadow: string;
    shape: string;
  };
}

// SVG Icon Components
const PostIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M8 12h8"/>
    <path d="M8 8h8"/>
    <path d="M8 16h5"/>
  </svg>
);

const ReelsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="18" rx="4" ry="4"/>
    <path d="M8 3l4 5M16 3l4 5"/>
    <path d="M2 8h20"/>
  </svg>
);

const StoryIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const MentionsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"/>
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
  </svg>
);

const CommentIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>
    <path d="M8 9h8"/>
    <path d="M8 13h6"/>
  </svg>
);

const RewindIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 19 2 12 11 5 11 19"/>
    <polygon points="22 19 13 12 22 5 22 19"/>
  </svg>
);

const AdvertisingIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const LightningIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const AudienceIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const FeaturesPage: React.FC = () => {
  const features: Feature[] = [
    // Comment Automation Features (Grouped together)
    {
      id: 'post-autodm',
      title: 'Post AutoDM',
      description: 'Automatically reply to Instagram Post comments with a DM',
      tier: 'free',
      icon: <PostIcon />,
      iconStyle: {
        background: 'from-blue-500 to-blue-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-blue-200',
        shape: 'rounded-xl'
      }
    },
    {
      id: 'reels-autodm',
      title: 'Reels AutoDM',
      description: 'Automatically reply to Instagram Reel comments with a DM',
      tier: 'free',
      icon: <ReelsIcon />,
      iconStyle: {
        background: 'from-purple-500 to-purple-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-purple-200',
        shape: 'rounded-2xl'
      }
    },
    {
      id: 'comment-auto-reply',
      title: 'Comment Auto-Reply',
      description: 'Automatically reply to comments with a comment once a DM has been sent',
      tier: 'free',
      icon: <CommentIcon />,
      iconStyle: {
        background: 'from-cyan-500 to-cyan-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-cyan-200',
        shape: 'rounded-2xl'
      }
    },
    {
      id: 'live-comment-dm',
      title: 'Live Comment DM Automation',
      description: 'Real-time comment to DM automation with instant responses',
      tier: 'free',
      icon: <LightningIcon />,
      iconStyle: {
        background: 'from-yellow-500 to-orange-500',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-yellow-200',
        shape: 'rounded-xl'
      }
    },
    {
      id: 'advertising-autodm',
      title: 'Advertising AutoDM',
      description: 'Auto-reply to comments on your sponsored content and ads',
      tier: 'free',
      icon: <AdvertisingIcon />,
      iconStyle: {
        background: 'from-red-500 to-red-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-red-200',
        shape: 'rounded-full'
      }
    },
    // Story Features
    {
      id: 'story-autodm',
      title: 'Story AutoDM',
      description: 'Automatically respond to story replies with a DM',
      tier: 'free',
      icon: <StoryIcon />,
      iconStyle: {
        background: 'from-pink-500 to-pink-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-pink-200',
        shape: 'rounded-full'
      }
    },
    {
      id: 'story-mentions',
      title: 'Story Mentions',
      description: 'Automatically reply to story @mentions with a DM',
      tier: 'free',
      icon: <MentionsIcon />,
      iconStyle: {
        background: 'from-indigo-500 to-indigo-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-indigo-200',
        shape: 'rounded-lg'
      }
    },
    // Analytics & Management
    {
      id: 'click-analytics',
      title: 'Click Analytics',
      description: 'Track link click analytics on DMs sent with detailed insights',
      tier: 'free',
      icon: <AnalyticsIcon />,
      iconStyle: {
        background: 'from-emerald-500 to-emerald-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-emerald-200',
        shape: 'rounded-xl'
      }
    },
    {
      id: 'rewind',
      title: 'Rewind',
      description: 'Backsend DMs to eligible comments you may have missed',
      tier: 'free',
      icon: <RewindIcon />,
      iconStyle: {
        background: 'from-amber-500 to-amber-600',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-amber-200',
        shape: 'rounded-lg'
      }
    },
    // Pro Features
    {
      id: 'audience-tracking',
      title: 'Advanced Audience Tracking',
      description: 'Export contact information, track engagement patterns, and analyze audience demographics with detailed reports',
      tier: 'pro',
      icon: <AudienceIcon />,
      iconStyle: {
        background: 'from-slate-600 to-slate-700',
        gradient: 'bg-gradient-to-br',
        shadow: 'shadow-slate-300',
        shape: 'rounded-2xl'
      }
    }
  ];

  // Remove the unused useEffect and visibleFeatures state

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
        mass: 0.8
      }
    }
  };

  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.15,
      rotate: 10,
      y: -2,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.1
      }
    }
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <motion.div 
        className="text-center py-12 md:py-16 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
      >
        <motion.div 
          className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          KEY FEATURES
        </motion.div>
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.3
          }}
        >
          Unlock The Full Potential
        </motion.h1>
        <motion.p 
          className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.5
          }}
        >
          Dive deep into ScaleDM's capabilities with these standout features, each designed to enhance your experience and streamline your tasks. Discover what sets us apart.
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="max-w-6xl mx-auto px-4 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                rotateY: 2,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full overflow-hidden"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 ${feature.iconStyle.shape} ${feature.iconStyle.gradient} ${feature.iconStyle.background} flex items-center justify-center text-white shadow-lg ${feature.iconStyle.shadow}`}
                >
                  {feature.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <motion.div 
                    className="flex items-center space-x-2 mb-2"
                    variants={titleVariants}
                  >
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.3
                      }}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        feature.tier === 'pro' 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      } text-white shadow-md`}
                    >
                      {feature.tier === 'pro' ? 'PRO' : 'FREE'}
                    </motion.span>
                  </motion.div>
                  <motion.p 
                    className="text-sm text-gray-600 leading-relaxed"
                    variants={descriptionVariants}
                  >
                    {feature.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div 
        className="bg-white py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-blue-600 mb-4"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: 0.2
            }}
          >
            Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.4
            }}
          >
            Get unlimited Instagram automation completely free. Upgrade to Pro for advanced audience insights and analytics.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 relative"
              initial={{ opacity: 0, x: -30, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.6
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                rotateY: 2,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  FREE TIER
                </span>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-3xl font-bold text-green-600 mb-6">Free</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-full">
                    <span className="text-2xl">🚀</span>
                    <span className="text-gray-700 font-medium">All automation features</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-full">
                    <span className="text-2xl">⚡</span>
                    <span className="text-gray-700 font-medium">No usage limits</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-full">
                    <span className="text-2xl">💳</span>
                    <span className="text-gray-700 font-medium">No credit card required</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Paid Tier */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-200 relative"
              initial={{ opacity: 0, x: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.8
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                rotateY: -2,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  PRO TIER
                </span>
              </div>
              <div className="text-center mt-4">
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-4xl font-bold text-blue-600">$10</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-full">
                    <span className="text-2xl">✨</span>
                    <span className="text-gray-700 font-medium">Everything in free tier</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-full">
                    <span className="text-2xl">📈</span>
                    <span className="text-gray-700 font-medium">Advanced audience tracking</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-full">
                    <span className="text-2xl">⏰</span>
                    <span className="text-gray-700 font-medium">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-blue-700 py-16"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: 0.2
            }}
          >
            Ready to Scale Your Instagram?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.4
            }}
          >
            Join thousands of creators and businesses who are already automating their Instagram engagement.
          </motion.p>
          <motion.button
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform transition-all duration-200"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.6
            }}
            whileHover={{ 
              scale: 1.08,
              y: -2,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            Get Started Free
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;
