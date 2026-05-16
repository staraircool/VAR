import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-lg tw-text-sm tw-font-semibold tw-ring-offset-background tw-transition-all tw-duration-200 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[#ff7a18] focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50',
  {
    variants: {
      variant: {
        default: 'tw-bg-gradient-to-b tw-from-[#ff8a18] tw-to-[#ff5a00] tw-text-white tw-shadow-[0_4px_18px_rgba(255,122,24,0.45)] hover:tw-shadow-[0_6px_28px_rgba(255,122,24,0.65)] hover:tw--translate-y-0.5',
        outline: 'tw-border tw-border-white/15 tw-bg-white/5 tw-text-white tw-backdrop-blur-md hover:tw-bg-white/10 hover:tw-border-white/25',
        ghost: 'tw-text-white/70 hover:tw-bg-white/5 hover:tw-text-white',
        link: 'tw-text-[#ff8a18] tw-underline-offset-4 hover:tw-underline',
      },
      size: {
        default: 'tw-h-11 tw-px-5 tw-py-2',
        sm: 'tw-h-9 tw-px-3 tw-text-xs',
        lg: 'tw-h-12 tw-px-7 tw-text-base',
        icon: 'tw-h-10 tw-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.cloneElement(props.children, { ref, className: cn(buttonVariants({ variant, size }), className) }) : null;
  if (asChild) return Comp;
  return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = 'Button';
