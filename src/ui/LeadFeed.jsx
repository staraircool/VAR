import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, MapPin, Mail, Phone, Globe, Activity, Filter, Search, Sparkles, Download,
  MoreHorizontal, UserPlus, FileText, ChevronDown, Zap, TrendingUp, MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Sparkline, KpiCard, Ticker, GeoStack, Funnel, Kbd, makeSpark } from './dashboard-ui';

// ──────────────────────────────────────────────────────────────────────────────
// Anonymized sample from running campaign (US wholesale + UAE/EU dermatology)
// ──────────────────────────────────────────────────────────────────────────────
const LEADS = [
  { name: 'Supreme Wholesale Liquidation',     cat: 'Wholesaler',         region: 'US', city: 'Wayne, NJ',           web: '-',                              phone: '(718) ███-9279', status: 'new' },
  { name: 'Bargain Central Warehouse',         cat: 'Discount Store',     region: 'US', city: 'Mesa, AZ',            web: 'bargaincentralwarehouse.com',    phone: '(480) ███-6155', status: 'contacted' },
  { name: 'Cactus Liquidation Inc',            cat: 'Liquidator',         region: 'US', city: 'Glendale, AZ',        web: '-',                              phone: '(602) ███-7018', status: 'new' },
  { name: 'America Wholesale Furniture',       cat: 'Furniture & Décor',  region: 'US', city: 'Phoenix, AZ',         web: 'americawholesalefurniture.com',  phone: '(602) ███-4122', status: 'replied' },
  { name: 'Coast-to-Coast Liquidators',        cat: 'Discount Store',     region: 'US', city: 'Phoenix, AZ',         web: 'coastliquidation.com',           phone: '(602) ███-8741', status: 'contacted' },
  { name: 'Las Vegas Liquidation Pallets',     cat: 'Liquidator',         region: 'US', city: 'Las Vegas, NV',       web: 'lasvegasliquidationpallets.com', phone: '(702) ███-3333', status: 'new' },
  { name: '888 Lots',                          cat: 'Liquidator',         region: 'US', city: 'Linden, NJ',          web: '888lots.com',                    phone: '(908) ███-9300', status: 'replied' },
  { name: 'Dr Omar Al Khalili Clinic',         cat: 'Dermatologue',       region: 'AE', city: 'Dubai',               web: 'dromarkhalili.com',              phone: '+971 4 ███-4423', status: 'contacted' },
  { name: 'Perla Dermatology Clinic',          cat: 'Dermatologue',       region: 'AE', city: 'Dubai · Al Wasl',     web: 'perla-dc.com',                   phone: '+971 4 ███-7711', status: 'new' },
  { name: 'Athena Dermatology Clinic',         cat: 'Dermatologue',       region: 'AE', city: 'Dubai · Sheikh Zayed',web: 'athenaderma.com',                phone: '+971 4 ███-8090', status: 'new' },
  { name: 'Glow Aesthetics Dermatology',       cat: 'Dermatologue',       region: 'AE', city: 'Dubai · Burjuman',    web: 'glowdubai.ae',                   phone: '+971 4 ███-2244', status: 'contacted' },
  { name: 'Centro Dermatológico Nuria Romero', cat: 'Dermatólogo',        region: 'ES', city: 'Madrid · Chamberí',   web: '-',                              phone: '+34 91 ███-4421', status: 'new' },
  { name: 'Clínica IMEDE',                     cat: 'Cosmetic Medical',   region: 'ES', city: 'Madrid · Chamberí',   web: 'imede.es',                       phone: '+34 91 ███-1180', status: 'contacted' },
  { name: 'Clínica AB Derma',                  cat: 'Dermatology Clinic', region: 'ES', city: 'Madrid · Salamanca',  web: '-',                              phone: '+34 91 ███-9090', status: 'new' },
  { name: 'Derma360 Clínica de Dermatologia',  cat: 'Skincare Clinic',    region: 'PT', city: 'Lisbon',              web: 'derma360.pt',                    phone: '+351 21 ███-4052', status: 'replied' },
  { name: 'A|D Lisbon Aesthetic & Dermatology',cat: 'Medical Clinic',     region: 'PT', city: 'Lisbon',              web: 'adlisbon.pt',                    phone: '+351 963 ███-090', status: 'contacted' },
  { name: 'Centro de Dermatologia de Lisboa',  cat: 'Dermatologist',      region: 'PT', city: 'Lisbon',              web: 'cdlisboa.pt',                    phone: '+351 21 ███-4090', status: 'new' },
  { name: 'Personal Derma Clinic & Esthetic',  cat: 'Dermatologist',      region: 'PT', city: 'Lisbon',              web: 'personalderma.pt',               phone: '+351 910 ███-055', status: 'new' },
];

const FLAGS = { US: '🇺🇸', AE: '🇦🇪', ES: '🇪🇸', PT: '🇵🇹' };

const STATUS_CONFIG = {
  new:       { label: 'New Lead',   icon: Sparkles,     color: 'tw-text-[#ffb878]',  bg: 'tw-bg-[#ff7a18]/10 tw-border-[#ff7a18]/30' },
  contacted: { label: 'Contacted',  icon: Mail,         color: 'tw-text-sky-300',     bg: 'tw-bg-sky-500/10 tw-border-sky-500/30' },
  replied:   { label: 'Replied',    icon: CheckCircle2, color: 'tw-text-emerald-300', bg: 'tw-bg-emerald-500/10 tw-border-emerald-500/30' },
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'US',  label: '🇺🇸 US' },
  { id: 'AE',  label: '🇦🇪 UAE' },
  { id: 'ES',  label: '🇪🇸 Spain' },
  { id: 'PT',  label: '🇵🇹 Portugal' },
];

const StatusPill = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn('tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-[11px] tw-font-semibold', cfg.bg, cfg.color)}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

export const LeadFeed = () => {
  const [tick, setTick] = React.useState(0);
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  const filtered = filter === 'all' ? LEADS : LEADS.filter((l) => l.region === filter);
  const livePulseIdx = filtered.length ? tick % filtered.length : 0;

  const geoData = React.useMemo(() => ([
    { code: 'US', flag: '🇺🇸', count: LEADS.filter((l) => l.region === 'US').length * 6 },
    { code: 'AE', flag: '🇦🇪', count: LEADS.filter((l) => l.region === 'AE').length * 6 + 2 },
    { code: 'ES', flag: '🇪🇸', count: LEADS.filter((l) => l.region === 'ES').length * 5 + 3 },
    { code: 'PT', flag: '🇵🇹', count: LEADS.filter((l) => l.region === 'PT').length * 5 + 4 },
  ]), []);

  const tickerItems = [
    <><UserPlus size={11} className="tw-text-[#ffb878]" /><span><b className="tw-text-[#ffb878]">New lead</b> added · Glow Aesthetics Dermatology (Dubai)</span></>,
    <><Phone size={11} className="tw-text-sky-300" /><span><b className="tw-text-sky-300">Phone verified</b> · Clínica IMEDE (Madrid)</span></>,
    <><Mail size={11} className="tw-text-violet-300" /><span><b className="tw-text-violet-300">Outreach sent</b> · Las Vegas Liquidation Pallets</span></>,
    <><MessageSquare size={11} className="tw-text-emerald-400" /><span><b className="tw-text-emerald-300">Reply received</b> · 888 Lots · opportunity flagged</span></>,
    <><Globe size={11} className="tw-text-sky-300" /><span><b className="tw-text-sky-300">Website found</b> · adlisbon.pt · added to record</span></>,
    <><Zap size={11} className="tw-text-emerald-400" /><span><b className="tw-text-emerald-300">14 leads</b> enriched in the last 10 minutes</span></>,
  ];

  return (
    <section id="dashboard" className="tw-relative tw-w-full tw-bg-black tw-py-24">
      <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-5">
        {/* Section head */}
        <div className="agencySectionHead">
          <div className="tw-mb-3 tw-flex tw-justify-center">
            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-text-emerald-300">
              <span className="tw-relative tw-flex tw-h-2 tw-w-2">
                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                <span className="tw-relative tw-inline-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-emerald-400" />
              </span>
              LIVE COMMAND CENTER
            </span>
          </div>
          <p>Inside the system</p>
          <h2>The dashboard your team wakes up to.</h2>
          <span>A clean Google Sheet of targeted buyer leads. Names, categories, locations, websites, phones, and outreach status, delivered daily, ready to act on. Numbers below are from a live VARPEC campaign.</span>
        </div>

        {/* KPI ROW - 4 cards with sparklines + deltas */}
        <div className="tw-mt-10 tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-4">
          <KpiCard value={107} label="Total Leads"        accent="tw-text-white"       sparkColor="#ffffff" spark={makeSpark(7,  12, 'up')} delta={24} />
          <KpiCard value={97}  label="Phones Found"       accent="tw-text-sky-300"     sparkColor="#7dd3fc" spark={makeSpark(13, 12, 'up')} delta={9}  suffix="/107" />
          <KpiCard value={84}  label="Websites Found"     accent="tw-text-[#ffb878]"   sparkColor="#ffb878" spark={makeSpark(19, 12, 'up')} delta={6}  suffix="/107" />
          <KpiCard value={12}  label="Replies This Week"  accent="tw-text-emerald-300" sparkColor="#6ee7b7" spark={makeSpark(31, 12, 'up')} delta={42} />
        </div>

        {/* MAIN PANEL */}
        <div className="tw-mt-8 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-shadow-[0_30px_80px_rgba(0,0,0,0.55)] tw-backdrop-blur-md">
          {/* Window chrome */}
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex tw-gap-1.5">
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-red-500/70" />
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-yellow-500/70" />
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500/70" />
              </div>
              <span className="tw-text-xs tw-font-semibold tw-text-white/60">LEADS · Varpec · Lead Dashboard</span>
              <span className="tw-hidden tw-rounded tw-bg-white/[0.05] tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-mono tw-text-white/45 sm:tw-inline">sheet · live</span>
            </div>
            <div className="tw-hidden tw-items-center tw-gap-2 sm:tw-flex">
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Search size={10} /> Search <Kbd>/</Kbd></span>
              <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Download size={10} /> Export</span>
              <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><MoreHorizontal size={12} /></span>
            </div>
          </div>

          {/* Ticker + Geo bar */}
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-border-b tw-border-white/10 tw-bg-black/20 tw-px-5 tw-py-3">
            <div className="tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2">
              <span className="tw-inline-flex tw-h-5 tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#ff7a18]/15 tw-px-2 tw-text-[9px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-[#ffb878]">
                <Activity size={9} /> Live
              </span>
              <Ticker items={tickerItems} />
            </div>
            <div className="tw-flex tw-items-center tw-gap-3">
              <span className="tw-hidden tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.18em] tw-text-white/40 md:tw-inline">Geo split</span>
              <GeoStack data={geoData} />
            </div>
          </div>

          {/* Filter tabs + sort */}
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-border-b tw-border-white/10 tw-bg-black/15 tw-px-4 tw-py-2.5">
            <Filter size={12} className="tw-mr-1 tw-text-white/40" />
            {FILTERS.map((f) => {
              const count = f.id === 'all' ? LEADS.length : LEADS.filter((l) => l.region === f.id).length;
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-transition-all',
                    active
                      ? 'tw-bg-gradient-to-b tw-from-[#ff8a18] tw-to-[#ff5a00] tw-text-white tw-shadow-[0_2px_10px_rgba(255,122,24,0.4)]'
                      : 'tw-text-white/55 hover:tw-bg-white/5 hover:tw-text-white'
                  )}
                >
                  {f.label}
                  <span className={cn('tw-ml-0.5 tw-rounded-full tw-px-1.5 tw-py-px tw-text-[9px] tw-tabular-nums', active ? 'tw-bg-white/20 tw-text-white' : 'tw-bg-white/[0.06] tw-text-white/55')}>{count}</span>
                </button>
              );
            })}
            <span className="tw-ml-auto tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55">
              <span className="tw-text-white/35">Sort:</span> Newest first <ChevronDown size={10} />
            </span>
          </div>

          {/* Table */}
          <div className="tw-overflow-x-auto">
            <table className="tw-w-full tw-min-w-[760px] tw-text-left tw-text-sm">
              <thead>
                <tr className="tw-border-b tw-border-white/10 tw-bg-white/[0.02] tw-text-[10px] tw-uppercase tw-tracking-[0.2em] tw-text-white/40">
                  <th className="tw-px-4 tw-py-3 tw-font-semibold">#</th>
                  <th className="tw-px-4 tw-py-3 tw-font-semibold">Business</th>
                  <th className="tw-hidden tw-px-4 tw-py-3 tw-font-semibold md:tw-table-cell">Category</th>
                  <th className="tw-px-4 tw-py-3 tw-font-semibold">Location</th>
                  <th className="tw-hidden tw-px-4 tw-py-3 tw-font-semibold lg:tw-table-cell">Website</th>
                  <th className="tw-hidden tw-px-4 tw-py-3 tw-font-semibold md:tw-table-cell">Phone</th>
                  <th className="tw-px-4 tw-py-3 tw-text-right tw-font-semibold">Status</th>
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
                          'tw-group/row tw-border-b tw-border-white/5 tw-text-white/80 tw-transition-colors',
                          isLive ? 'tw-bg-[#ff7a18]/[0.06]' : 'hover:tw-bg-white/[0.025]'
                        )}
                        style={isLive ? { boxShadow: 'inset 3px 0 0 #ff7a18' } : undefined}
                      >
                        <td className="tw-px-4 tw-py-3 tw-font-mono tw-text-xs tw-text-white/30">{String(i + 1).padStart(3, '0')}</td>
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
                          {lead.web === '-' ? (
                            <span className="tw-text-white/30">-</span>
                          ) : (
                            <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-[#9fc8ff]"><Globe size={11} />{lead.web}</span>
                          )}
                        </td>
                        <td className="tw-hidden tw-px-4 tw-py-3 tw-text-xs tw-font-mono md:tw-table-cell">
                          <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-white/65"><Phone size={11} />{lead.phone}</span>
                        </td>
                        <td className="tw-px-4 tw-py-3 tw-text-right">
                          <div className="tw-relative tw-inline-flex tw-items-center tw-justify-end">
                            <div className="tw-transition-opacity tw-duration-150 group-hover/row:tw-opacity-0">
                              <StatusPill status={lead.status} />
                            </div>
                            <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-gap-1 tw-opacity-0 tw-transition-opacity tw-duration-150 group-hover/row:tw-opacity-100">
                              <button type="button" className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-border-sky-400/40 hover:tw-bg-sky-500/10 hover:tw-text-sky-300" aria-label="Call"><Phone size={12} /></button>
                              <button type="button" className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-border-violet-400/40 hover:tw-bg-violet-500/10 hover:tw-text-violet-300" aria-label="Email"><Mail size={12} /></button>
                              <button type="button" className="tw-hidden tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-border-[#ff7a18]/40 hover:tw-bg-[#ff7a18]/10 hover:tw-text-[#ffb878] sm:tw-flex" aria-label="Open record"><FileText size={12} /></button>
                            </div>
                          </div>
                        </td>
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
              <Activity size={12} className="tw-text-emerald-400" /> Auto-syncing · last update 12s ago · {filtered.length} of {LEADS.length} shown
            </span>
            <span>Phone digits anonymised in preview · Live Sheet shared with your team day one</span>
          </div>
        </div>

        {/* FUNNEL */}
        <div className="tw-mt-6">
          <Funnel
            title="Lead Pipeline Funnel"
            steps={[
              { label: 'Total Leads',    value: 107, color: '#ffffff', icon: UserPlus },
              { label: 'Phones Found',   value: 97,  color: '#7dd3fc', icon: Phone },
              { label: 'Websites Found', value: 84,  color: '#ffb878', icon: Globe },
              { label: 'Replies',        value: 12,  color: '#6ee7b7', icon: CheckCircle2 },
            ]}
          />
        </div>
      </div>
    </section>
  );
};
