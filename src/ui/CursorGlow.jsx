import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow = () => {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, { stiffness: 150, damping: 22, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 22, mass: 0.4 });
  const [isCoarse, setIsCoarse] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsCoarse(true);
      return;
    }
    const handler = (e) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  if (isCoarse) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="tw-pointer-events-none tw-fixed tw-left-0 tw-top-0 tw-z-[1] tw-h-[400px] tw-w-[400px] tw-rounded-full tw-blur-[100px]"
    >
      <div className="tw-h-full tw-w-full tw-rounded-full tw-bg-[radial-gradient(circle,rgba(255,122,24,0.22)_0%,rgba(255,106,0,0.08)_30%,transparent_60%)]" />
    </motion.div>
  );
};
