import React from 'react';
import { cn } from '../lib/utils';

export const BentoGrid = ({ className, children }) => (
  <div
    className={cn(
      'tw-mx-auto tw-grid tw-max-w-7xl tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 md:tw-auto-rows-[18rem]',
      className
    )}
  >
    {children}
  </div>
);

export const BentoGridItem = ({ className, title, description, header, icon }) => (
  <div
    className={cn(
      'tw-group/bento tw-row-span-1 tw-flex tw-flex-col tw-justify-between tw-space-y-4 tw-rounded-xl tw-border tw-border-white/10 tw-bg-white/[0.02] tw-p-5 tw-shadow-[0_8px_32px_rgba(0,0,0,0.35)] tw-transition tw-duration-300 hover:tw-border-[#ff7a18]/40 hover:tw-bg-white/[0.04]',
      className
    )}
  >
    {header}
    <div className="tw-transition tw-duration-200 group-hover/bento:tw-translate-x-1">
      <div className="tw-mb-2 tw-flex tw-items-center tw-gap-2 tw-text-[#ff7a18]">
        {icon}
      </div>
      <div className="tw-text-base tw-font-bold tw-text-white">{title}</div>
      <div className="tw-text-sm tw-text-white/60">{description}</div>
    </div>
  </div>
);
