import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Sheet = ({ open, onClose, children, className, side = 'right' }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const sides = {
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, className: 'tw-right-0 tw-top-0 tw-h-full tw-w-full sm:tw-max-w-sm' },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, className: 'tw-left-0 tw-top-0 tw-h-full tw-w-full sm:tw-max-w-sm' },
    top: { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' }, className: 'tw-left-0 tw-top-0 tw-w-full' },
  };
  const cfg = sides[side];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="tw-fixed tw-inset-0 tw-z-[100] tw-bg-black/70 tw-backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={cfg.initial}
            animate={cfg.animate}
            exit={cfg.exit}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={cn(
              'tw-fixed tw-z-[101] tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-[#0a0a0a] tw-to-black tw-p-7 tw-shadow-2xl',
              cfg.className,
              className
            )}
          >
            <button
              onClick={onClose}
              className="tw-absolute tw-right-5 tw-top-5 tw-rounded-full tw-p-2 tw-text-white/60 tw-transition hover:tw-bg-white/10 hover:tw-text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
