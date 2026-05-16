import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, Mail, Phone, Globe, Activity, Filter, Search, Sparkles, Download, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

// Anonymized sample sourced from running campaign — international buyer flow
// US wholesale/liquidation + UAE/EU dermatology verticals
const LEADS = [
  { name: 'Supreme Wholesale Liquidation', cat: 'Wholesaler', region: 'US', city: 'Wayne, NJ', web: '—', phone: '(718) ███-9279', status: 'new' },
  { name: 'Bargain Central Warehouse', cat: 'Discount Store', region: 'US', city: 'Mesa, AZ', web: 'bargaincentralwarehouse.com', phone: '(480) ███-6155', status: 'contacted' },
  { name: 'Cactus Liquidation Inc', cat: 'Liquidator', region: 'US', city: 'Glendale, AZ', web: '—', phone: '(602) ███-7018', status: 'new' },
  { name: 'America Wholesale Furniture', cat: 'Furniture & Décor', region: 'US', city: 'Phoenix, AZ', web: 'americawholesalefurniture.com', phone: '(602) ███-4122', status: 'replied' },
  { name: 'Coast-to-Coast Liquidators', cat: 'Discount Store', region: 'US', city: 'Phoenix, AZ', web: 'coastliquidation.com', phone: '(602) ███-8741', status: 'contacted' },
  { name: 'Las Vegas Liquidation Pallets', cat: 'Liquidator', region: 'US', city: 'Las Vegas, NV', web: 'lasvegasliquidationpallets.com', phone: '(702) ███-3333', status: 'new' },
  { name: '888 Lots', cat: 'Liquidator', region: 'US', city: 'Linden, NJ', web: '888lots.com', phone: '(908) ███-9300', status: 'replied' },
  { name: 'Dr Omar Al Khalili Clinic', cat: 'Dermatologue', region: 'AE', city: 'Dubai', web: 'dromarkhalili.com', phone: '+971 4 ███-4423', status: 'contacted' },
  { name: 'Perla Dermatology Clinic', cat: 'Dermatologue', region: 'AE', city: 'Dubai · Al Wasl', web: 'perla-dc.com', phone: '+971 4 ███-7711', status: 'new' },
  { name: 'Athena Dermatology Clinic', cat: 'Dermatologue', region: 'AE', city: 'Dubai · Sheikh Zayed', web: 'athenaderma.com', phone: '+971 4 ███-8090', status: 'new' },
  { name: 'Glow Aesthetics Dermatology', cat: 'Dermatologue', region: 'AE', city: 'Dubai · Burjuman', web: 'glowdubai.ae', phone: '+971 4 ███-2244', status: 'contacted' },
  { name: 'Centro Dermatológico Nuria Romero', cat: 'Dermatólogo', region: 'ES', city: 'Madrid · Chamberí', web: '—', phone: '+34 91 ███-4421', status: 'new' },
  { name: 'Clínica IMEDE', cat: 'Cosmetic Medical', region: 'ES', city: 'Madrid · Chamberí', web: 'imede.es', phone: '+34 91 ███-1180', status: 'contacted' },
  { name: 'Clínica AB Derma', cat: 'Dermatology Clinic', region: 'ES', city: 'Madrid · Salamanca', web: '—', phone: '+34 91 ███-9090', status: 'new' },
  { name: 'Derma360 — Clínica de Dermatologia', cat: 'Skincare Clinic', region: 'PT', city: 'Lisbon', web: 'derma360.pt', phone: '+351 21 ███-4052', status: 'replied' },
  { name: 'A|D Lisbon Aesthetic & Dermatology', cat: 'Medical Clinic', region: 'PT', city: 'Lisbon', web: 'adlisbon.pt', phone: '+351 963 ███-090', status: 'contacted' },
  { name: 'Centro de Dermatologia de Lisboa', cat: 'Dermatologist', region: 'PT', city: 'Lisbon', web: 'cdlisboa.pt', phone: '+351 21 ███-4090', status: 'new' },
  { name: 'Personal Derma Clinic & Esthetic', cat: 'Dermatologist', region: 'PT', city: 'Lisbon', web: 'personalderma.pt', phone: '+351 910 ███-055', status: 'new' },
];

const FLAGS = { US: '🇺🇸', AE: '🇦🇪', ES: '🇪🇸', PT: '🇵🇹' };

const STATUS_CONFIG = {
  new: { label: 'New Lead', icon: Sparkles, color: 'tw-text-[#ffb878]', bg: 'tw-bg-[#ff7a18]/10 tw-border-[#ff7a18]/30' },
  contacted: { label: 'Contacted', icon: Mail, color: 'tw-text-sky-300', bg: 'tw-bg-sky-500/10 tw-border-sky-500/30' },
  replied: { label: 'Replied', icon: CheckCircle2, color: 'tw-text-emerald-300', bg: 'tw-bg-emerald-500/10 tw-border-emerald-500/30' },
};

const StatusPill = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn('tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-[11px] tw-font-semibold', cfg.bg, cfg.color)}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

const Counter = ({ value, label, accent }) => {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let raf;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.floor(eased * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="tw-group tw-relative tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-px-5 tw-py-5 tw-backdrop-blur-md tw-transition-colors hover:tw-border-[#ff7a18]/30">
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-[#ff7a18]/60 tw-to-transparent tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100" />
      <span className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-white/45">{label}</span>
      <div className="tw-mt-2 tw-flex tw-items-baseline tw-gap-1.5">
        <span className={cn('tw-text-3xl tw-font-black tw-tracking-tight md:tw-text-4xl tw-tabular-nums', accent || 'tw-text-white')}>{n.toLocaleString()}</span>
      </div>
    </div>
  );
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'US', label: '🇺🇸 US' },
  { id: 'AE', label: '🇦🇪 UAE' },
  { id: 'ES', label: '🇪🇸 Spain' },
  { id: 'PT', label: '🇵🇹 Portugal' },
];

export const LeadFeed = () => {
  const [tick, setTick] = React.useState(0);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  const filtered = filter === 'all' ? LEADS : LEADS.filter((l) => l.region === filter);
  const livePulseIdx = filtered.length ? tick % filtered.length : 0;

  return (
    <section id="dashboard" className="tw-relative tw-w-full tw-bg-black tw-py-24">
      <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-5">
      <div className="agencySectionHead">
        <div className="tw-flex tw-justify-center tw-mb-3">
          <span className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-text-emerald-300">
            <span className="tw-relative tw-flex tw-h-2 tw-w-2">
              <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75"></span>
              <span className="tw-relative tw-inline-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-emerald-400"></span>
            </span>
            LIVE COMMAND CENTER
          </span>
        </div>
        <p>Inside the system</p>
        <h2>The dashboard your team wakes up to.</h2>
        <span>A clean Google Sheet of targeted buyer leads — names, categories, locations, websites, phones, and outreach status — delivered daily, ready to act on. Numbers below are from a live VARPEC campaign.</span>
      </div>

      <div className="tw-mt-10 tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-4">
        <Counter value={107} label="Total Leads" accent="tw-text-white" />
        <Counter value={97} label="Phones Found" accent="tw-text-sky-300" />
        <Counter value={84} label="Websites Found" accent="tw-text-[#ffb878]" />
        <Counter value={12} label="Replies This Week" accent="tw-text-emerald-300" />
      </div>

      <div className="tw-mt-8 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-shadow-[0_30px_80px_rgba(0,0,0,0.55)] tw-backdrop-blur-md">
        {/* Window chrome */}
        <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-flex tw-gap-1.5">
              <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-red-500/70" />
              <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-yellow-500/70" />
              <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500/70" />
            </div>
            <span className="tw-text-xs tw-font-semibold tw-text-white/60">LEADS — Varpec · Lead Dashboard</span>
          </div>
          <div className="tw-hidden tw-items-center tw-gap-2 sm:tw-flex">
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Search size={10} /> /</span>
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Download size={10} /> Export</span>
            <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><MoreHorizontal size={12} /></span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-border-b tw-border-white/10 tw-bg-black/20 tw-px-4 tw-py-2.5">
          <Filter size={12} className="tw-text-white/40 tw-mr-1" />
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                'tw-rounded-full tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-transition-all',
                filter === f.id
                  ? 'tw-bg-gradient-to-b tw-from-[#ff8a18] tw-to-[#ff5a00] tw-text-white tw-shadow-[0_2px_10px_rgba(255,122,24,0.4)]'
                  : 'tw-text-white/55 hover:tw-bg-white/5 hover:tw-text-white'
              )}
            >
              {f.label}
            </button>
          ))}
          <span className="tw-ml-auto tw-text-[10px] tw-text-white/40">{filtered.length} of {LEADS.length} leads</span>
        </div>

        {/* Table */}
        <div className="tw-overflow-x-auto">
          <table className="tw-w-full tw-min-w-[720px] tw-text-left tw-text-sm">
            <thead>
              <tr className="tw-border-b tw-border-white/10 tw-bg-white/[0.02] tw-text-[10px] tw-uppercase tw-tracking-[0.2em] tw-text-white/40">
                <th className="tw-px-4 tw-py-3 tw-font-semibold">#</th>
                <th className="tw-px-4 tw-py-3 tw-font-semibold">Business</th>
                <th className="tw-hidden tw-px-4 tw-py-3 tw-font-semibold md:tw-table-cell">Category</th>
                <th className="tw-px-4 tw-py-3 tw-font-semibold">Location</th>
                <th className="tw-hidden tw-px-4 tw-py-3 tw-font-semibold lg:tw-table-cell">Website</th>
                <th className="tw-hidden tw-px-4 tw-py-3 tw-font-semibold md:tw-table-cell">Phone</th>
                <th className="tw-px-4 tw-py-3 tw-font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((lead, i) => {
                  const isLive = i === livePulseIdx;
                  return (
                    <motion.tr
                      key={lead.name}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, delay: i * 0.02 }}
                      className={cn(
                        'tw-border-b tw-border-white/5 tw-text-white/80 tw-transition-colors',
                        isLive ? 'tw-bg-[#ff7a18]/[0.06]' : 'hover:tw-bg-white/[0.025]'
                      )}
                      style={isLive ? { boxShadow: 'inset 3px 0 0 #ff7a18' } : undefined}
                    >
                      <td className="tw-px-4 tw-py-3 tw-text-xs tw-font-mono tw-text-white/30">{String(i + 1).padStart(3, '0')}</td>
                      <td className="tw-px-4 tw-py-3">
                        <span className="tw-flex tw-items-center tw-gap-2">
                          <span className="tw-font-semibold tw-text-white">{lead.name}</span>
                          <AnimatePresence>
                            {isLive && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#ff7a18]/20 tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-bold tw-text-[#ffb878]"
                              >
                                <Sparkles size={9} /> SYNCED
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                        <span className="tw-mt-0.5 tw-block tw-text-[11px] tw-text-white/40 md:tw-hidden">{lead.cat}</span>
                      </td>
                      <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs tw-text-white/60 md:tw-table-cell">{lead.cat}</td>
                      <td className="tw-px-4 tw-py-3 tw-text-xs">
                        <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-white/65">
                          <span className="tw-text-sm tw-leading-none">{FLAGS[lead.region]}</span>
                          <span>{lead.city}</span>
                        </span>
                      </td>
                      <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs lg:tw-table-cell">
                        {lead.web === '—' ? (
                          <span className="tw-text-white/30">—</span>
                        ) : (
                          <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-[#9fc8ff]"><Globe size={11} />{lead.web}</span>
                        )}
                      </td>
                      <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs tw-font-mono md:tw-table-cell">
                        <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-white/65"><Phone size={11} />{lead.phone}</span>
                      </td>
                      <td className="tw-px-4 tw-py-3"><StatusPill status={lead.status} /></td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3 tw-text-[11px] tw-text-white/50">
          <span className="tw-inline-flex tw-items-center tw-gap-1.5">
            <Activity size={12} className="tw-text-emerald-400" /> Auto-syncing · last update 12s ago
          </span>
          <span>Phone digits anonymised in preview · Live Sheet shared with your team day one</span>
        </div>
      </div>
      </div>
    </section>
  );
};
