import React from 'react';
import { cn } from '../lib/utils';

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 160,
  path = true,
}) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="tw-pointer-events-none tw-absolute tw-inset-0 tw-h-full tw-w-full"
        >
          <circle
            className="tw-stroke-white/10 tw-stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      <div
        style={{
          '--duration': duration,
          '--radius': radius,
          '--delay': -delay,
        }}
        className={cn(
          'tw-absolute tw-flex tw-h-12 tw-w-12 tw-transform-gpu tw-items-center tw-justify-center tw-rounded-full tw-border tw-bg-black/10 tw-backdrop-blur-md [animation-delay:calc(var(--delay)*1000ms)] tw-animate-[orbit_calc(var(--duration)*1s)_linear_infinite]',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
