import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Dialog = ({ open, onClose, children, className }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handler = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', handler);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handler);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="tw-absolute tw-inset-0 tw-bg-black/80 tw-backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.94, y: 18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 12, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
            className={cn(
              'tw-relative tw-w-full tw-max-w-md tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-[#1a1a1a] tw-to-[#0a0a0a] tw-p-7 tw-shadow-[0_30px_80px_rgba(255,122,24,0.18)]',
              className
            )}
          >
            <button
              onClick={onClose}
              className="tw-absolute tw-right-4 tw-top-4 tw-rounded-full tw-p-1.5 tw-text-white/50 tw-transition hover:tw-bg-white/10 hover:tw-text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
