import React from 'react';
import { cn } from '../lib/utils';

export const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'tw-bg-[#ff7a18]/10 tw-text-[#ffb878] tw-border-[#ff7a18]/30',
    outline: 'tw-bg-white/5 tw-text-white/80 tw-border-white/15',
    success: 'tw-bg-emerald-500/10 tw-text-emerald-300 tw-border-emerald-500/30',
  };

  return (
    <span
      className={cn(
        'tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-tracking-wide tw-backdrop-blur-md',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
