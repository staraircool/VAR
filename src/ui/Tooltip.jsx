import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Tooltip = ({ content, children, side = 'top', className }) => {
  const [open, setOpen] = React.useState(false);
  const positions = {
    top: 'tw-bottom-full tw-left-1/2 -tw-translate-x-1/2 tw-mb-2',
    bottom: 'tw-top-full tw-left-1/2 -tw-translate-x-1/2 tw-mt-2',
    left: 'tw-right-full tw-top-1/2 -tw-translate-y-1/2 tw-mr-2',
    right: 'tw-left-full tw-top-1/2 -tw-translate-y-1/2 tw-ml-2',
  };
  return (
    <span
      className="tw-relative tw-inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.14 }}
            className={cn(
              'tw-pointer-events-none tw-absolute tw-z-50 tw-whitespace-nowrap tw-rounded-md tw-border tw-border-white/15 tw-bg-black/95 tw-px-2.5 tw-py-1.5 tw-text-xs tw-font-medium tw-text-white tw-shadow-lg tw-backdrop-blur',
              positions[side],
              className
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
