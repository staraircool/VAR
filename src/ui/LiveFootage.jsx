import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, MailX, Search, Sparkles, MessageSquare, Zap, Filter } from 'lucide-react';
import { KpiCard, Ticker, makeSpark } from './dashboard-ui';

// ──────────────────────────────────────────────────────────────────────────────
// MAIN  ·  Same visual language as LeadFeed / EmailFeed / SystemMap dashboards
// ──────────────────────────────────────────────────────────────────────────────
export const LiveFootage = () => {
  const videoRef = React.useRef(null);

  // Auto play/pause when scrolled in/out of viewport - saves CPU + data
  React.useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); },
      { threshold: 0.2 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  // Live event ticker (same component used by LeadFeed/EmailFeed)
  const tickerItems = [
    <><Sparkles size={11} className="tw-text-[#ffb878]" /><span><b className="tw-text-[#ffb878]">+1 hot lead</b> added · Athena Dermatology Clinic</span></>,
    <><MessageSquare size={11} className="tw-text-emerald-400" /><span><b className="tw-text-emerald-300">Reply received</b> · 888 Lots · 6h ago</span></>,
    <><Eye size={11} className="tw-text-violet-300" /><span><b className="tw-text-violet-300">184 rows</b> scrolled in this clip</span></>,
    <><Zap size={11} className="tw-text-sky-300" /><span><b className="tw-text-sky-300">Sheet auto-syncing</b> · last update 12s ago</span></>,
  ];

  return (
    <section id="footage" className="tw-relative tw-w-full tw-bg-black tw-py-24">
      <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-5">

        {/* SECTION HEAD - matches LeadFeed/EmailFeed/SystemMap */}
        <div className="agencySectionHead">
          <div className="tw-mb-3 tw-flex tw-justify-center">
            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-text-emerald-300">
              <span className="tw-relative tw-flex tw-h-2 tw-w-2">
                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                <span className="tw-relative tw-inline-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-emerald-400" />
              </span>
              LIVE FOOTAGE
            </span>
          </div>
          <p>Behind the screen</p>
          <h2>The actual sheet a paying client sees.</h2>
          <span>Real Google Sheet, scrolling live. Phones blurred. Email column blurred. Everything else is real.</span>
        </div>

        {/* KPI ROW - same KpiCard component as the other dashboards */}
        <div className="tw-mt-10 tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-4">
          <KpiCard value={184}  label="Rows In Clip"     accent="tw-text-white"       sparkColor="#ffffff" spark={makeSpark(5,  12, 'up')} delta={24} />
          <KpiCard value={1247} label="Buyers In Sheet"  accent="tw-text-sky-300"     sparkColor="#7dd3fc" spark={makeSpark(11, 12, 'up')} delta={18} suffix="/5K" />
          <KpiCard value={12}   label="Replies This Week"accent="tw-text-emerald-300" sparkColor="#6ee7b7" spark={makeSpark(19, 12, 'up')} delta={42} />
          <KpiCard value={99}   label="Sync Uptime"      accent="tw-text-[#ffb878]"   sparkColor="#ffb878" spark={makeSpark(27, 12, 'up')} delta={1}  suffix="%" />
        </div>

        {/* MAIN PANEL - identical chrome / shadow / border to the other dashboards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="tw-mt-8 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-shadow-[0_30px_80px_rgba(0,0,0,0.55)] tw-backdrop-blur-md"
        >
          {/* Window chrome */}
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex tw-gap-1.5">
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-red-500/70" />
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-yellow-500/70" />
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500/70" />
              </div>
              <span className="tw-text-xs tw-font-semibold tw-text-white/60">FOOTAGE · Varpec · Live Sheet Capture</span>
              <span className="tw-hidden tw-rounded tw-bg-white/[0.05] tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-mono tw-text-white/45 sm:tw-inline">sheet · live</span>
            </div>
            <div className="tw-hidden tw-items-center tw-gap-2 sm:tw-flex">
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Search size={10} /> Search</span>
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Filter size={10} /> Replied</span>
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-semibold tw-text-emerald-300">
                <span className="tw-relative tw-flex tw-h-1.5 tw-w-1.5">
                  <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                  <span className="tw-relative tw-inline-flex tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-emerald-400" />
                </span>
                LIVE
              </span>
            </div>
          </div>

          {/* Ticker row - same pattern as LeadFeed */}
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/5 tw-bg-black/20 tw-px-5 tw-py-2">
            <Ticker items={tickerItems} />
            <span className="tw-hidden tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-[#ff7a18]/25 tw-bg-[#ff7a18]/[0.06] tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-bold tw-tracking-[0.15em] tw-text-[#ffb878] sm:tw-inline-flex">
              <MailX size={10} /> EMAIL COLUMN  ·  PRIVACY GLASS
            </span>
          </div>

          {/* VIDEO - lightweight, autoplays muted, IntersectionObserver play/pause */}
          <div className="tw-relative tw-aspect-video tw-w-full tw-overflow-hidden tw-bg-black">
            <video
              ref={videoRef}
              src="/video.mp4"
              poster="/og-cover.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="tw-block tw-h-full tw-w-full tw-object-cover"
              aria-label="Live footage of a real client Google Sheet"
            />

            {/* Privacy frosted-glass strip over the email column.
                Adjust `left` and `width` if your sheet has the email column elsewhere. */}
            <div
              className="tw-pointer-events-none tw-absolute tw-top-0 tw-bottom-0 tw-z-10"
              style={{
                left: '44%',
                width: '28%',
                backdropFilter: 'blur(14px) saturate(1.05)',
                WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                borderLeft: '1px solid rgba(255,122,24,0.18)',
                borderRight: '1px solid rgba(255,122,24,0.18)',
              }}
            />

            {/* Tiny label to make it clear what's blurred (mobile + desktop) */}
            <div className="tw-pointer-events-none tw-absolute tw-top-3 tw-left-1/2 tw-z-20 tw--translate-x-1/2 tw-rounded-full tw-border tw-border-white/15 tw-bg-black/70 tw-px-2.5 tw-py-1 tw-text-[9px] tw-font-bold tw-tracking-[0.2em] tw-text-white/70 tw-backdrop-blur-md">
              <MailX size={9} className="tw-mr-1 tw-mb-0.5 tw-inline tw-text-[#ffb878]" />
              EMAILS  ·  BLURRED FOR PRIVACY
            </div>
          </div>

          {/* Footer - same as LeadFeed */}
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3 tw-text-[11px] tw-text-white/50">
            <span className="tw-inline-flex tw-items-center tw-gap-1.5">
              <Activity size={12} className="tw-text-emerald-400" /> Auto-syncing  ·  last update 12s ago  ·  1,247 of 5,000 buyers visible
            </span>
            <span>Phones and email column anonymised in preview  ·  Your live sheet is private</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
