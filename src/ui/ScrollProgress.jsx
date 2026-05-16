import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-z-[150] tw-h-[2px] tw-origin-left tw-bg-gradient-to-r tw-from-[#ffb86b] tw-via-[#ff7a18] tw-to-[#ff3d00]"
    />
  );
};
