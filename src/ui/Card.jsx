import React from 'react';
import { cn } from '../lib/utils';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-text-white tw-shadow-[0_12px_40px_rgba(0,0,0,0.5)] tw-backdrop-blur-md',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('tw-flex tw-flex-col tw-gap-1.5 tw-p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-white', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('tw-text-sm tw-text-white/60 tw-leading-relaxed', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('tw-p-6 tw-pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('tw-flex tw-items-center tw-p-6 tw-pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';
