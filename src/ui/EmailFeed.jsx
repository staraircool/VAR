import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MailCheck, MailOpen, MailX, Reply, Send, Inbox, Search, Filter, MoreHorizontal,
  Sparkles, Activity, Paperclip, Star, Eye, Forward, Archive, ChevronDown, Zap, TrendingUp
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Sparkline, Donut, KpiCard, Ticker, GeoStack, Funnel, Kbd, GroupHeader, makeSpark } from './dashboard-ui';

// ──────────────────────────────────────────────────────────────────────────────
// DATA POOLS - VARPEC buyer verticals (US wholesalers + UAE/EU dermatology)
// ──────────────────────────────────────────────────────────────────────────────
const RECIPIENTS = [
  { handle: 'sales',          domain: 'supremewholesale.com',        name: 'Supreme Wholesale',         flag: '🇺🇸' },
  { handle: 'contact',        domain: 'bargaincentralwarehouse.com', name: 'Bargain Central',           flag: '🇺🇸' },
  { handle: 'orders',         domain: 'cactusliquidation.com',       name: 'Cactus Liquidation',        flag: '🇺🇸' },
  { handle: 'hello',          domain: 'americawholesalefurniture.com', name: 'America Wholesale',       flag: '🇺🇸' },
  { handle: 'info',           domain: 'coastliquidation.com',        name: 'Coast-to-Coast',            flag: '🇺🇸' },
  { handle: 'buy',            domain: 'lasvegasliquidationpallets.com', name: 'LV Liquidation Pallets', flag: '🇺🇸' },
  { handle: 'lots',           domain: '888lots.com',                 name: '888 Lots',                  flag: '🇺🇸' },
  { handle: 'wholesale',      domain: 'closeoutpallets.com',         name: 'Closeout Pallets',          flag: '🇺🇸' },
  { handle: 'team',           domain: 'salesumo.com',                name: 'SaleSumo',                  flag: '🇺🇸' },
  { handle: 'support',        domain: 'primoliquidation.com',        name: 'Primo Liquidation',        flag: '🇺🇸' },
  { handle: 'clinic',         domain: 'dromarkhalili.com',           name: 'Dr Omar Al Khalili Clinic', flag: '🇦🇪' },
  { handle: 'info',           domain: 'perladermatology.com',        name: 'Perla Dermatology',        flag: '🇦🇪' },
  { handle: 'reception',      domain: 'athenaderma.com',             name: 'Athena Dermatology',       flag: '🇦🇪' },
  { handle: 'hello',          domain: 'glowdubai.ae',                name: 'Glow Aesthetics Dubai',    flag: '🇦🇪' },
  { handle: 'admin',          domain: 'altaderma.com',               name: 'Altaderma Clinic',         flag: '🇦🇪' },
  { handle: 'bookings',       domain: 'eliveclinics.com',            name: 'Elive Beauty Spot',        flag: '🇦🇪' },
  { handle: 'office',         domain: 'dermaone.ae',                 name: 'Derma One Aesthetic',      flag: '🇦🇪' },
  { handle: 'info',           domain: 'imede.es',                    name: 'Clínica IMEDE',            flag: '🇪🇸' },
  { handle: 'consulta',       domain: 'dermomedic.com',              name: 'Clínica DermoMedic',       flag: '🇪🇸' },
  { handle: 'info',           domain: 'madriderma.com',              name: 'Madriderma',               flag: '🇪🇸' },
  { handle: 'info',           domain: 'imda.es',                     name: 'IMDA Madrid',              flag: '🇪🇸' },
  { handle: 'citaprevia',     domain: 'dermaniac.com',               name: 'Dermaniac Madrid',         flag: '🇪🇸' },
  { handle: 'info',           domain: 'oneskinmed.com',              name: 'ONESKIN-MED',              flag: '🇪🇸' },
  { handle: 'info',           domain: 'derma360.pt',                 name: 'Derma360',                 flag: '🇵🇹' },
  { handle: 'geral',          domain: 'cdlisboa.pt',                 name: 'Centro Derm. Lisboa',      flag: '🇵🇹' },
  { handle: 'geral',          domain: 'dermareeiro.pt',              name: 'Dermatologia Areeiro',     flag: '🇵🇹' },
  { handle: 'consultorio',    domain: 'joaoabelamaro.pt',            name: 'Dr. João Abel Amaro',      flag: '🇵🇹' },
];

const SUBJECTS = [
  ['Quick question for {{name}}',                'intro'],
  ['Helping {{name}} get more qualified buyers',  'intro'],
  ['Saw your work, quick idea',                   'intro'],
  ['{{name}}, quick automation idea',             'intro'],
  ['Worth a 15-min look?',                        'intro'],
  ['Following up on my last note',                'followup'],
  ['Bumping this, quick thought for {{name}}',    'followup'],
  ['Re: Helping {{name}} get more qualified buyers', 'reply'],
  ['Re: Quick question for {{name}}',             'reply'],
  ['Re: Worth a 15-min look?',                    'reply'],
  ['{{name}}, proposal inside',                   'proposal'],
  ['As promised, short loom and numbers',         'proposal'],
  ['Closing the loop',                            'breakup'],
];

const SEQUENCES = ['Day 1 · Intro', 'Day 3 · Follow-up', 'Day 7 · Follow-up', 'Day 12 · Case study', 'Day 18 · Breakup'];

const STATUS_POOL = [
  { id: 'sent', weight: 14 },
  { id: 'delivered', weight: 30 },
  { id: 'opened', weight: 28 },
  { id: 'replied', weight: 14 },
  { id: 'clicked', weight: 10 },
  { id: 'bounced', weight: 4 },
];

const STATUS_CONFIG = {
  sent:      { label: 'Sent',      icon: Send,      color: 'tw-text-white/80',    bg: 'tw-bg-white/5 tw-border-white/15' },
  delivered: { label: 'Delivered', icon: MailCheck, color: 'tw-text-sky-300',     bg: 'tw-bg-sky-500/10 tw-border-sky-500/30' },
  opened:    { label: 'Opened',    icon: MailOpen,  color: 'tw-text-violet-300',  bg: 'tw-bg-violet-500/10 tw-border-violet-500/30' },
  replied:   { label: 'Replied',   icon: Reply,     color: 'tw-text-emerald-300', bg: 'tw-bg-emerald-500/10 tw-border-emerald-500/30' },
  clicked:   { label: 'Clicked',   icon: Star,      color: 'tw-text-[#ffb878]',   bg: 'tw-bg-[#ff7a18]/10 tw-border-[#ff7a18]/30' },
  bounced:   { label: 'Bounced',   icon: MailX,     color: 'tw-text-red-300',     bg: 'tw-bg-red-500/10 tw-border-red-500/30' },
};

const FILTERS = [
  { id: 'all',       label: 'All Mail',  icon: Inbox },
  { id: 'replied',   label: 'Replies',   icon: Reply },
  { id: 'opened',    label: 'Opens',     icon: MailOpen },
  { id: 'delivered', label: 'Delivered', icon: MailCheck },
];

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function pickWeighted(rand, pool) {
  const total = pool.reduce((a, b) => a + b.weight, 0);
  let r = rand() * total;
  for (const item of pool) if ((r -= item.weight) <= 0) return item.id;
  return pool[0].id;
}

/**
 * Mask only the domain part after @ to keep handle clean, blur only some letters
 * of the domain name (TLD always visible).
 *   sales@supremewholesale.com  →  sales@sup████le.com
 *   info@perla-dc.com           →  info@pe███dc.com
 *   info@derma360.pt            →  info@der████60.pt
 */
function maskEmail(handle, domain) {
  const [name, ...tldParts] = domain.split('.');
  const tld = tldParts.join('.');
  let maskedName;
  if (name.length <= 3) {
    maskedName = name[0] + '██';
  } else if (name.length <= 5) {
    maskedName = name.slice(0, 2) + '███' + name.slice(-1);
  } else if (name.length <= 8) {
    maskedName = name.slice(0, 3) + '████' + name.slice(-2);
  } else {
    maskedName = name.slice(0, 3) + '████' + name.slice(-2);
  }
  return `${handle}@${maskedName}.${tld}`;
}

function timeAgo(seconds) {
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function buildEmails(seed) {
  const rand = rng(seed);
  const emails = [];
  for (let i = 0; i < 200; i++) {
    const recipient = RECIPIENTS[Math.floor(rand() * RECIPIENTS.length)];
    const [subjectTpl, subjType] = SUBJECTS[Math.floor(rand() * SUBJECTS.length)];
    const subject = subjectTpl.replace('{{name}}', recipient.name.split(' ')[0]);
    let secondsAgo;
    const bucket = rand();
    if (bucket < 0.18) secondsAgo = Math.floor(rand() * 60);
    else if (bucket < 0.42) secondsAgo = 60 + Math.floor(rand() * 14 * 60);
    else if (bucket < 0.65) secondsAgo = 15 * 60 + Math.floor(rand() * 45 * 60);
    else if (bucket < 0.88) secondsAgo = 60 * 60 + Math.floor(rand() * 7 * 3600);
    else secondsAgo = 8 * 3600 + Math.floor(rand() * 30 * 3600);

    let status = pickWeighted(rand, STATUS_POOL);
    if (subjType === 'reply') status = rand() < 0.85 ? 'replied' : 'opened';
    if (status === 'replied' && subjType !== 'reply') status = 'opened';

    const sequence = SEQUENCES[subjType === 'reply' ? 1 : Math.floor(rand() * SEQUENCES.length)];
    const hasAttachment = rand() < 0.18;
    const priority = rand() < 0.07;

    emails.push({
      id: i,
      recipient,
      subject,
      status,
      sequence,
      secondsAgo,
      hasAttachment,
      priority,
      isReply: subjType === 'reply',
    });
  }
  emails.sort((a, b) => a.secondsAgo - b.secondsAgo);
  return emails;
}

const StatusPill = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={cn('tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-[11px] tw-font-semibold', cfg.bg, cfg.color)}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
};

// Build group sections from a list of emails (with current bump applied)
function buildGroups(emails, bump) {
  const buckets = [
    { id: 'now',      label: 'Just now',      max: 60,          items: [] },
    { id: '15m',      label: 'Last 15 min',   max: 15 * 60,     items: [] },
    { id: '1h',       label: 'Last hour',     max: 60 * 60,     items: [] },
    { id: 'today',    label: 'Earlier today', max: 24 * 3600,   items: [] },
    { id: 'yesterday',label: 'Yesterday',     max: Infinity,    items: [] },
  ];
  for (const e of emails) {
    const s = e.secondsAgo + bump;
    for (const b of buckets) {
      if (s < b.max) { b.items.push({ ...e, _liveSeconds: s }); break; }
    }
  }
  return buckets;
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export const EmailFeed = () => {
  const [emails] = React.useState(() => buildEmails(91827));
  const [filter, setFilter] = React.useState('all');
  const [bump, setBump] = React.useState(0);
  const [pulseTick, setPulseTick] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setBump((b) => b + 1), 1000);
    return () => clearInterval(id);
  }, []);
  React.useEffect(() => {
    const id = setInterval(() => setPulseTick((p) => p + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const filteredAll = React.useMemo(() => (
    filter === 'all' ? emails : emails.filter((e) => e.status === filter)
  ), [emails, filter]);

  // Stats (computed from full 200, stable)
  const total = 200;
  const delivered = emails.filter((e) => e.status !== 'bounced' && e.status !== 'sent').length;
  const opens     = emails.filter((e) => ['opened', 'replied', 'clicked'].includes(e.status)).length;
  const replies   = emails.filter((e) => e.status === 'replied').length;
  const health    = Math.round((delivered / total) * 100);

  // Geo
  const geoData = React.useMemo(() => {
    const counts = {};
    for (const e of emails) {
      const k = e.recipient.flag;
      counts[k] = (counts[k] || 0) + 1;
    }
    return [
      { code: 'US', flag: '🇺🇸', count: counts['🇺🇸'] || 0 },
      { code: 'AE', flag: '🇦🇪', count: counts['🇦🇪'] || 0 },
      { code: 'ES', flag: '🇪🇸', count: counts['🇪🇸'] || 0 },
      { code: 'PT', flag: '🇵🇹', count: counts['🇵🇹'] || 0 },
    ];
  }, [emails]);

  // Group sections (cap each group)
  const groups = React.useMemo(() => buildGroups(filteredAll, bump), [filteredAll, bump]);
  const visibleGroups = groups
    .filter((g) => g.items.length > 0)
    .map((g) => ({ ...g, items: g.items.slice(0, g.id === 'now' ? 4 : g.id === '15m' ? 4 : g.id === '1h' ? 4 : 3) }));

  const totalVisible = visibleGroups.reduce((a, g) => a + g.items.length, 0);
  const totalAvailable = filteredAll.length;
  const pulseId = visibleGroups[0]?.items[pulseTick % Math.max(1, visibleGroups[0]?.items.length || 1)]?.id;

  // Ticker
  const tickerItems = [
    <><Reply size={11} className="tw-text-emerald-400" /><span><b className="tw-text-emerald-300">Reply received</b> · Athena Dermatology Clinic (Dubai)</span></>,
    <><Send size={11} className="tw-text-[#ffb878]" /><span><b className="tw-text-[#ffb878]">Day 3 follow-up</b> sent to Supreme Wholesale</span></>,
    <><MailOpen size={11} className="tw-text-violet-300" /><span><b className="tw-text-violet-300">Opened</b> · Bargain Central Warehouse (3rd time)</span></>,
    <><Zap size={11} className="tw-text-emerald-400" /><span><b className="tw-text-emerald-300">12 emails</b> delivered in the last 60 seconds</span></>,
    <><Star size={11} className="tw-text-[#ffb878]" /><span><b className="tw-text-[#ffb878]">Link clicked</b> · 888 Lots · opportunity flagged</span></>,
  ];

  return (
    <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-2 sm:tw-px-5">
      {/* KPI ROW - 5 cards with sparklines + deltas */}
      <div className="tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-5">
        <KpiCard value={total}     label="Emails Sent" accent="tw-text-white"         sparkColor="#ffffff" spark={makeSpark(11, 12, 'up')}   delta={18} />
        <KpiCard value={delivered} label="Delivered"   accent="tw-text-sky-300"       sparkColor="#7dd3fc" spark={makeSpark(22, 12, 'up')}   delta={4}  suffix={`/${total}`} />
        <KpiCard value={opens}     label="Opens"       accent="tw-text-violet-300"    sparkColor="#a78bfa" spark={makeSpark(33, 12, 'up')}   delta={11} />
        <KpiCard value={replies}   label="Replies"     accent="tw-text-emerald-300"   sparkColor="#6ee7b7" spark={makeSpark(44, 12, 'up')}   delta={32} />
        <div className="tw-col-span-2 tw-flex tw-items-center tw-gap-3 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.045] tw-to-white/[0.01] tw-px-5 tw-py-5 tw-backdrop-blur-md md:tw-col-span-1">
          <Donut value={health} max={100} color="#6ee7b7" size={62} />
          <div className="tw-flex tw-flex-col tw-gap-0.5">
            <span className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-white/45">Send Health</span>
            <span className="tw-text-[11px] tw-font-semibold tw-text-emerald-300">Excellent</span>
            <span className="tw-text-[10px] tw-text-white/40">Inbox · {health}%</span>
          </div>
        </div>
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
            <span className="tw-text-xs tw-font-semibold tw-text-white/60">OUTREACH · Varpec · Send Queue</span>
            <span className="tw-hidden tw-rounded tw-bg-white/[0.05] tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-mono tw-text-white/45 sm:tw-inline">v2.4 · prod</span>
          </div>
          <div className="tw-hidden tw-items-center tw-gap-2 sm:tw-flex">
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-semibold tw-text-emerald-300">
              <span className="tw-relative tw-flex tw-h-1.5 tw-w-1.5">
                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                <span className="tw-relative tw-inline-flex tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-emerald-400" />
              </span>
              SENDING
            </span>
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Search size={10} /> Search <Kbd>/</Kbd></span>
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
            const Icon = f.icon;
            const count = f.id === 'all' ? emails.length : emails.filter((e) => e.status === f.id).length;
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
                <Icon size={11} /> {f.label}
                <span className={cn('tw-ml-0.5 tw-rounded-full tw-px-1.5 tw-py-px tw-text-[9px] tw-tabular-nums', active ? 'tw-bg-white/20 tw-text-white' : 'tw-bg-white/[0.06] tw-text-white/55')}>{count}</span>
              </button>
            );
          })}
          <span className="tw-ml-auto tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55">
            <span className="tw-text-white/35">Sort:</span> Most recent <ChevronDown size={10} />
          </span>
        </div>

        {/* Email list with group headers */}
        <ul className="tw-divide-y tw-divide-white/5">
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group) => (
              <React.Fragment key={group.id}>
                <GroupHeader
                  label={group.label}
                  count={group.items.length}
                  accent={group.id === 'now' ? 'tw-text-[#ffb878]' : 'tw-text-white/45'}
                />
                {group.items.map((email, i) => {
                  const isPulse = email.id === pulseId && group.id === 'now';
                  const seconds = email._liveSeconds;
                  return (
                    <motion.li
                      key={email.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, delay: i * 0.015 }}
                      className={cn(
                        'tw-group/row tw-relative tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-transition-colors sm:tw-gap-4 sm:tw-px-5',
                        isPulse ? 'tw-bg-[#ff7a18]/[0.06]' : 'hover:tw-bg-white/[0.025]'
                      )}
                      style={isPulse ? { boxShadow: 'inset 3px 0 0 #ff7a18' } : undefined}
                    >
                      {/* Priority strip */}
                      {email.priority && !isPulse && (
                        <span className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-[2px] tw-bg-gradient-to-b tw-from-[#ffb878] tw-to-[#ff5a00]" />
                      )}

                      {/* Avatar */}
                      <div className="tw-relative tw-flex tw-h-9 tw-w-9 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-gradient-to-br tw-from-white/[0.08] tw-to-white/[0.01] tw-text-base">
                        <span>{email.recipient.flag}</span>
                        {isPulse && (
                          <span className="tw-absolute -tw-right-0.5 -tw-top-0.5 tw-flex tw-h-2.5 tw-w-2.5">
                            <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-[#ff7a18] tw-opacity-75" />
                            <span className="tw-relative tw-inline-flex tw-h-2.5 tw-w-2.5 tw-rounded-full tw-bg-[#ff7a18] tw-ring-2 tw-ring-black" />
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col tw-gap-0.5">
                        <div className="tw-flex tw-items-center tw-gap-2">
                          <span className="tw-truncate tw-text-sm tw-font-semibold tw-text-white">
                            {email.isReply && <span className="tw-mr-1 tw-font-bold tw-text-emerald-400">Re:</span>}
                            {email.subject}
                          </span>
                          {email.hasAttachment && <Paperclip size={11} className="tw-flex-shrink-0 tw-text-white/35" />}
                          {email.priority && <Star size={11} className="tw-flex-shrink-0 tw-fill-[#ffb878] tw-text-[#ffb878]" />}
                          <AnimatePresence>
                            {isPulse && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#ff7a18]/20 tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-bold tw-text-[#ffb878]"
                              >
                                <Sparkles size={9} /> JUST SENT
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-2 tw-gap-y-0.5 tw-text-[11px] tw-text-white/45">
                          <span className="tw-truncate tw-font-mono">
                            <span className="tw-text-white/55">to</span>{' '}
                            <span className="tw-text-white/75">{maskEmail(email.recipient.handle, email.recipient.domain)}</span>
                          </span>
                          <span className="tw-text-white/20">·</span>
                          <span className="tw-hidden sm:tw-inline">{email.recipient.name}</span>
                          <span className="tw-hidden tw-text-white/20 sm:tw-inline">·</span>
                          <span className="tw-text-[#ffb878]/75">{email.sequence}</span>
                        </div>
                      </div>

                      {/* Right column with status pill + time-ago, swap with action icons on hover */}
                      <div className="tw-relative tw-flex tw-flex-shrink-0 tw-items-center">
                        <div className="tw-flex tw-items-center tw-gap-3 tw-transition-opacity tw-duration-150 group-hover/row:tw-opacity-0">
                          <StatusPill status={email.status} />
                          <span className="tw-hidden tw-w-16 tw-text-right tw-text-[11px] tw-font-medium tw-tabular-nums tw-text-white/50 sm:tw-block">
                            {timeAgo(seconds)}
                          </span>
                        </div>
                        <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-gap-1 tw-opacity-0 tw-transition-opacity tw-duration-150 group-hover/row:tw-opacity-100">
                          <button type="button" className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-border-emerald-400/40 hover:tw-bg-emerald-500/10 hover:tw-text-emerald-300" aria-label="Reply"><Reply size={12} /></button>
                          <button type="button" className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-border-violet-400/40 hover:tw-bg-violet-500/10 hover:tw-text-violet-300" aria-label="Open"><Eye size={12} /></button>
                          <button type="button" className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-border-[#ff7a18]/40 hover:tw-bg-[#ff7a18]/10 hover:tw-text-[#ffb878]" aria-label="Forward"><Forward size={12} /></button>
                          <button type="button" className="tw-hidden tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-text-white/70 tw-transition-all hover:tw-bg-white/10 sm:tw-flex" aria-label="Archive"><Archive size={12} /></button>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </ul>

        {/* Footer */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3 tw-text-[11px] tw-text-white/50">
          <span className="tw-inline-flex tw-items-center tw-gap-1.5">
            <Activity size={12} className="tw-text-emerald-400" /> Live queue · showing {totalVisible} of {totalAvailable} {filter === 'all' ? '' : `(${filter})`} · 200 delivered today
          </span>
          <span className="tw-flex tw-items-center tw-gap-1.5">
            <Mail size={11} className="tw-text-white/35" /> Domain partially anonymised in preview
          </span>
        </div>
      </div>

      {/* FUNNEL */}
      <div className="tw-mt-6">
        <Funnel
          title="Outreach Conversion Funnel"
          steps={[
            { label: 'Sent',      value: total,     color: '#ffffff', icon: Send },
            { label: 'Delivered', value: delivered, color: '#7dd3fc', icon: MailCheck },
            { label: 'Opened',    value: opens,     color: '#a78bfa', icon: MailOpen },
            { label: 'Replied',   value: replies,   color: '#6ee7b7', icon: Reply },
          ]}
        />
      </div>
    </div>
  );
};
