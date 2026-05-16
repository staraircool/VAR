import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export const Accordion = ({ items, className }) => {
  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-2', className)}>
      {items.map(([q, a], i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={q}
            className={cn(
              'tw-overflow-hidden tw-rounded-xl tw-border tw-transition-all tw-duration-300',
              isOpen
                ? 'tw-border-[#ff7a18]/40 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-[#ff7a18]/[0.04]'
                : 'tw-border-white/10 tw-bg-white/[0.02] hover:tw-border-white/20'
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="tw-flex tw-w-full tw-items-center tw-justify-between tw-gap-4 tw-px-5 tw-py-4 tw-text-left tw-text-base tw-font-semibold tw-text-white tw-transition-colors hover:tw-text-[#ffb878]"
            >
              <span>{q}</span>
              <ChevronDown
                size={18}
                className={cn(
                  'tw-flex-shrink-0 tw-text-[#ff8a18] tw-transition-transform tw-duration-300',
                  isOpen && 'tw-rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'tw-grid tw-overflow-hidden tw-transition-all tw-duration-300',
                isOpen ? 'tw-grid-rows-[1fr] tw-opacity-100' : 'tw-grid-rows-[0fr] tw-opacity-0'
              )}
            >
              <div className="tw-overflow-hidden">
                <p className="tw-px-5 tw-pb-5 tw-text-sm tw-leading-relaxed tw-text-white/70">{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
