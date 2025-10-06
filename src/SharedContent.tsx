import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedContentProps {
  is916?: boolean;
  aspect?: '1:1' | '9:16';
  playing?: boolean; // controlled by parent
  paused?: boolean;  // controlled by parent
  resetCounter?: number; // increment to force reset
  onStepChange?: (step: number) => void; // notify parent
}

const SharedContent: React.FC<SharedContentProps> = ({ is916 = false, aspect = '9:16', playing = false, paused = false, resetCounter = 0, onStepChange }) => {
  // Content configuration - update here to change both versions
  const content = {
    problem: "Link in bio? Then you're losing conversions.",
    secondary: "Millions of IG creators are using comment automation to share their Links via DM",
    ctaLine: "Set up your automation with <strong>ScaleDM</strong> and automate your Instagram growth",
  };

  const [currentStep, setCurrentStep] = useState(0);
  // local mirrors of parent-controlled state are not needed; use props directly

  // Animation steps
  const steps = useMemo(() => [
    { id: 0, type: 'text', content: content.problem },
    { id: 1, type: 'text', content: content.secondary },
    { id: 2, type: 'image', content: '/link_to_dm.png' },
    { id: 3, type: 'cta', content: content.ctaLine },
  ], []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleNextStep = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const stepDurations = [3000, 4000, 6000, 5000]; // longer image step
    const duration = stepDurations[currentStep] || 3000;

    timerRef.current = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, duration);
  }, [currentStep, steps.length]);

  useEffect(() => {
    if (!playing || paused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    scheduleNextStep();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing, paused, scheduleNextStep]);

  // external reset
  const lastResetRef = useRef<number>(resetCounter);
  useEffect(() => {
    if (resetCounter !== lastResetRef.current) {
      lastResetRef.current = resetCounter;
      setCurrentStep(0);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [resetCounter]);

  // notify parent of step changes
  useEffect(() => {
    if (onStepChange) onStepChange(currentStep);
  }, [currentStep, onStepChange]);

  // Responsive classes based on version and aspect ratio
  const classes = is916 ? {
    container: "flex flex-col items-center px-5 pt-8 pb-4 text-center",
    headline: "hidden",
    problem: "text-[#1f2937] text-[1.2rem] font-extrabold mb-3 leading-relaxed max-w-[95%]",
    solution: "mb-5 text-[#374151] text-[1.05rem] font-semibold leading-tight max-w-[98%]",
    hero: "w-[420px] max-w-[95%] object-cover mb-5 rounded-lg shadow-lg",
    featuresContainer: "flex flex-wrap justify-center gap-2.5 w-full",
    feature: "px-6 py-4 rounded-full text-base font-bold shadow-md border-2"
  } : aspect === '1:1' ? {
    container: "flex flex-col items-center justify-center px-8 py-8 text-center h-full",
    headline: "hidden",
    problem: "text-[#1f2937] text-[1.1rem] font-extrabold mb-3 leading-relaxed max-w-[95%]",
    solution: "mb-4 text-[#374151] text-[1rem] font-semibold leading-tight max-w-[98%]",
    hero: "w-full h-full object-contain",
    featuresContainer: "flex flex-wrap justify-center gap-2 w-full",
    feature: "px-4 py-2.5 rounded-full text-sm font-bold shadow-md border-2"
  } : {
    container: "flex flex-col items-center justify-center px-6 py-8 text-center h-full",
    headline: "hidden",
    problem: "text-[#1f2937] text-[1.2rem] font-extrabold mb-4 leading-relaxed max-w-[95%]",
    solution: "mb-6 text-[#374151] text-[1.1rem] font-semibold leading-tight max-w-[98%]",
    hero: "w-[350px] max-w-[90%] object-cover mb-6 rounded-xl shadow-xl",
    featuresContainer: "flex flex-wrap justify-center gap-2.5",
    feature: "px-6 py-3 rounded-full text-base font-bold shadow-lg border-2"
  };

  const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[9/16]';

  return (
    <>
      <div className={classes.container}>
        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Step 0 & 1: Text lines */}
            {(currentStep === 0 || currentStep === 1) && (
              <div className="space-y-4">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={classes.problem}
                  >
                    {content.problem}
                  </motion.div>
                )}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={classes.solution}
                  >
                    {content.secondary}
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 2: Image */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`w-full ${aspect === '1:1' ? 'h-full px-2 py-2' : is916 ? 'max-w-[420px]' : 'max-w-[350px]'} ${aspect === '1:1' ? '' : aspectClass} ${aspect === '1:1' ? '' : 'mb-6'}`}
              >
                <img
                  src="/link_to_dm.png"
                  alt="ScaleDM example"
                  className={`w-full h-full ${aspect === '1:1' ? 'object-contain' : 'object-cover rounded-xl shadow-xl'}`}
                />
              </motion.div>
            )}

            {/* Step 3: CTA (minimal, ad-like) */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[460px] mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-6 py-6 text-center">
                  <div className="text-[1.35rem] sm:text-[1.5rem] font-black text-gray-900 leading-tight mb-3">
                    Automate your IG with <span className="px-2 py-0.5 rounded-md bg-gray-100">ScaleDM</span>
                  </div>
                  <div className="text-[12px] text-gray-600 mb-5">
                    30s setup • IG‑approved
                  </div>
                  <button
                    className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white font-bold px-6 py-3 rounded-full shadow-lg active:scale-95 transition-all"
                  >
                    Join ScaleDM
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default SharedContent;
