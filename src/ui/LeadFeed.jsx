import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, Mail, Phone, Globe, Activity, Filter, Search, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

// Anonymized sample sourced from real Lead Dashboard CSV (107 leads tracked)
const LEADS = [
  ['Sephora', 'Cosmetics Store', 'US · New York', 'sephora.com', '(212) ███-0037', 'pending'],
  ['NoHo Hair Salon', 'Hair Salon', 'US · New York', 'nohosalon.com', '(212) ███-2899', 'pending'],
  ['Salon V', 'Hair Salon', 'US · New York', 'salonvnyc.com', '(212) ███-0241', 'contacted'],
  ['IGK Salon', 'Hair Salon', 'US · New York', 'igkhair.com', '(646) ███-1392', 'pending'],
  ['SF Skincare', 'Skincare Clinic', 'US · San Francisco', 'sfskincare.com', '(415) ███-5694', 'replied'],
  ['Skin Sanctuary', 'Dermatology', 'US · Los Angeles', 'skinsanctuaryla.com', '(213) ███-3073', 'contacted'],
  ['Madison25 H&N', 'Beauty Institute', 'US · New York', 'madison25nyc.com', '(212) ███-2623', 'pending'],
  ['DermaNew Skincare', 'Dermatology', 'US · Beverly Hills', '—', '(310) ███-1418', 'contacted'],
  ['California Cosmetics', 'Dermatology', 'US · Newport Beach', 'californiacosmetics.com', '(855) ███-1982', 'replied'],
  ['Mure Salon', 'Hair Salon', 'US · New York', 'muresalon.com', '(212) ███-5393', 'pending'],
  ['American Liquidations', 'Wholesale', 'US · Waterbury', 'americanliquidations.com', '(203) ███-4132', 'contacted'],
  ['Oceren Skincare Spa', 'Dermatology', 'US · Tustin', 'oceren.com', '(714) ███-7525', 'pending'],
  ['Skin Renewal', 'Dermatology', 'US · Laguna Hills', 'myskinrenewal.com', '(949) ███-3426', 'contacted'],
  ['Closeout Pallet', 'Wholesale', 'US · Garwood', 'closeoutpallets.com', '(347) ███-9335', 'pending'],
  ['The Drawing Room NY', 'Hair Salon', 'US · New York', 'thedrawingroomny.com', '(212) ███-2600', 'replied'],
];

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: Clock, color: 'tw-text-amber-300', bg: 'tw-bg-amber-500/10 tw-border-amber-500/30' },
  contacted: { label: 'Contacted', icon: Mail, color: 'tw-text-sky-300', bg: 'tw-bg-sky-500/10 tw-border-sky-500/30' },
  replied: { label: 'Replied', icon: CheckCircle2, color: 'tw-text-emerald-300', bg: 'tw-bg-emerald-500/10 tw-border-emerald-500/30' },
};

const StatusPill = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn('tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-px-2 tw-py-0.5 tw-text-[11px] tw-font-semibold', cfg.bg, cfg.color)}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

const Counter = ({ value, label, accent }) => {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let raf;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.floor(p * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="tw-flex tw-flex-col tw-gap-1 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/[0.02] tw-px-5 tw-py-4 tw-backdrop-blur-md">
      <span className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.18em] tw-text-white/45">{label}</span>
      <span className={cn('tw-text-2xl tw-font-black tw-tracking-tight md:tw-text-3xl', accent || 'tw-text-white')}>{n.toLocaleString()}</span>
    </div>
  );
};

export const LeadFeed = () => {
  const [tick, setTick] = React.useState(0);

  // Live row highlight pulse — rotates which row appears "just delivered"
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % LEADS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="dashboard" className="tw-relative tw-mx-auto tw-mt-8 tw-w-full tw-max-w-6xl tw-px-5 tw-py-20">
      <div className="agencySectionHead">
        <div className="tw-flex tw-justify-center tw-mb-3">
          <span className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-text-emerald-300">
            <span className="tw-relative tw-flex tw-h-2 tw-w-2"><span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75"></span><span className="tw-relative tw-inline-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-emerald-400"></span></span>
            LIVE DASHBOARD PREVIEW
          </span>
        </div>
        <p>Inside the system</p>
        <h2>This is the dashboard your team wakes up to.</h2>
        <span>A clean Google Sheet of qualified buyer leads delivered daily — names, categories, locations, websites, contact methods, and outreach status. Numbers below from a real running campaign.</span>
      </div>

      <div className="tw-mt-10 tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-4">
        <Counter value={107} label="Total Leads" accent="tw-text-white" />
        <Counter value={97} label="Phones Found" accent="tw-text-sky-300" />
        <Counter value={84} label="Websites Found" accent="tw-text-[#ffb878]" />
        <Counter value={12} label="Replies This Week" accent="tw-text-emerald-300" />
      </div>

      <div className="tw-mt-8 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-shadow-[0_30px_80px_rgba(0,0,0,0.5)] tw-backdrop-blur-md">
        <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3">
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-flex tw-gap-1.5">
              <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-red-500/70" />
              <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-yellow-500/70" />
              <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500/70" />
            </div>
            <span className="tw-ml-3 tw-text-xs tw-font-semibold tw-text-white/60">LEADS — Lead Dashboard</span>
          </div>
          <div className="tw-hidden tw-items-center tw-gap-2 md:tw-flex">
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Filter size={10} /> Filter</span>
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Search size={10} /> Search</span>
          </div>
        </div>

        <div className="tw-overflow-x-auto">
          <table className="tw-w-full tw-min-w-[640px] tw-text-left tw-text-sm">
            <thead>
              <tr className="tw-border-b tw-border-white/10 tw-bg-white/[0.03] tw-text-[10px] tw-uppercase tw-tracking-[0.18em] tw-text-white/45">
                <th className="tw-px-4 tw-py-3">#</th>
                <th className="tw-px-4 tw-py-3">Business</th>
                <th className="tw-px-4 tw-py-3">Category</th>
                <th className="tw-hidden tw-px-4 tw-py-3 md:tw-table-cell">Location</th>
                <th className="tw-hidden tw-px-4 tw-py-3 lg:tw-table-cell">Website</th>
                <th className="tw-hidden tw-px-4 tw-py-3 md:tw-table-cell">Phone</th>
                <th className="tw-px-4 tw-py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map(([name, cat, loc, web, phone, status], i) => {
                const isLive = i === tick;
                return (
                  <motion.tr
                    key={name}
                    className={cn(
                      'tw-border-b tw-border-white/5 tw-text-white/75 tw-transition-colors',
                      isLive ? 'tw-bg-[#ff7a18]/[0.06]' : 'hover:tw-bg-white/[0.03]'
                    )}
                    animate={isLive ? { boxShadow: 'inset 3px 0 0 #ff7a18' } : { boxShadow: 'inset 0 0 0 transparent' }}
                    transition={{ duration: 0.4 }}
                  >
                    <td className="tw-px-4 tw-py-3 tw-text-xs tw-font-mono tw-text-white/35">{String(i + 1).padStart(3, '0')}</td>
                    <td className="tw-px-4 tw-py-3 tw-font-semibold tw-text-white">
                      <span className="tw-flex tw-items-center tw-gap-2">
                        {name}
                        <AnimatePresence>
                          {isLive && (
                            <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#ff7a18]/15 tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-bold tw-text-[#ffb878]">
                              <Sparkles size={9} /> NEW
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </td>
                    <td className="tw-px-4 tw-py-3 tw-text-xs">{cat}</td>
                    <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs md:tw-table-cell">
                      <span className="tw-inline-flex tw-items-center tw-gap-1"><MapPin size={11} className="tw-text-white/35" />{loc}</span>
                    </td>
                    <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs lg:tw-table-cell">
                      <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-[#9fc8ff]"><Globe size={11} />{web}</span>
                    </td>
                    <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs tw-font-mono md:tw-table-cell">
                      <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-white/65"><Phone size={11} />{phone}</span>
                    </td>
                    <td className="tw-px-4 tw-py-3"><StatusPill status={status} /></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3 tw-text-[11px] tw-text-white/50">
          <span className="tw-inline-flex tw-items-center tw-gap-1.5"><Activity size={12} className="tw-text-emerald-400" /> Auto-updating · last sync 12s ago</span>
          <span>Showing 15 of 107 leads · phone digits anonymised in preview</span>
        </div>
      </div>
    </section>
  );
};
