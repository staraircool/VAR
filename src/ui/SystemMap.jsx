import React from 'react';
import { motion } from 'framer-motion';
import {
  Target, Database, Send, Zap, Mail, MessageSquare, PhoneCall, CheckCircle2,
  Activity, Clock, Sparkles, ArrowRight, ShieldCheck, Globe, Server, Cpu, Radio,
  TrendingUp, Layers, Boxes
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Sparkline, KpiCard, Ticker, makeSpark } from './dashboard-ui';

// ──────────────────────────────────────────────────────────────────────────────
// 4-stage pipeline definition
// ──────────────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    step: '01',
    label: 'Discover',
    icon: Target,
    accent: '#ffb878',
    accentBg: 'tw-from-[#ff7a18]/15 tw-to-[#ff7a18]/[0.02]',
    accentBorder: 'tw-border-[#ff7a18]/30',
    metric: '50–145',
    metricLabel: 'contacts/day',
    desc: 'AI scrapes industry, location, and buyer-fit signals to surface qualified businesses every morning.',
    chips: ['Industry filter', 'Geo targeting', 'Intent signals'],
    spark: makeSpark(101, 12, 'up'),
    delta: 18,
  },
  {
    step: '02',
    label: 'Enrich',
    icon: Database,
    accent: '#7dd3fc',
    accentBg: 'tw-from-sky-500/15 tw-to-sky-500/[0.02]',
    accentBorder: 'tw-border-sky-500/30',
    metric: '94%',
    metricLabel: 'data accuracy',
    desc: 'Each lead gets verified phone, email, website, decision-maker name, and category in one clean record.',
    chips: ['Phone verify', 'Email validate', 'Domain check'],
    spark: makeSpark(202, 12, 'up'),
    delta: 7,
  },
  {
    step: '03',
    label: 'Outreach',
    icon: Send,
    accent: '#a78bfa',
    accentBg: 'tw-from-violet-500/15 tw-to-violet-500/[0.02]',
    accentBorder: 'tw-border-violet-500/30',
    metric: '3 channels',
    metricLabel: 'orchestrated',
    desc: 'Personalised email, WhatsApp, and AI phone bot sequences move buyers through the conversation in parallel.',
    chips: ['AI Email', 'WhatsApp', 'AI Phone'],
    spark: makeSpark(303, 12, 'up'),
    delta: 24,
  },
  {
    step: '04',
    label: 'Convert',
    icon: Zap,
    accent: '#6ee7b7',
    accentBg: 'tw-from-emerald-500/15 tw-to-emerald-500/[0.02]',
    accentBorder: 'tw-border-emerald-500/30',
    metric: '6h 23m',
    metricLabel: 'avg first reply',
    desc: 'Hot leads ping your team with the full record. Name, channel, message. Closers only focus on real interest.',
    chips: ['Live alerts', 'Hot lead routing', 'Sheet sync'],
    spark: makeSpark(404, 12, 'up'),
    delta: 41,
  },
];

const CHANNELS = [
  { id: 'email',    label: 'Email',     icon: Mail,          color: '#a78bfa' },
  { id: 'whatsapp', label: 'WhatsApp',  icon: MessageSquare, color: '#6ee7b7' },
  { id: 'phone',    label: 'AI Phone',  icon: PhoneCall,     color: '#ffb878' },
  { id: 'sheet',    label: 'Sheet sync',icon: CheckCircle2,  color: '#7dd3fc' },
];

const PLANS = ['Starter', 'Growth', 'Premium'];
const MATRIX = [
  ['Daily targeted contacts',   '50',  '70',  '145'],
  ['Google Sheet dashboard',    true,  true,  true],
  ['Verified phone & email',    true,  true,  true],
  ['AI email outreach',         false, true,  true],
  ['Hot-lead reply alerts',     false, true,  true],
  ['WhatsApp outreach',         false, false, true],
  ['AI phone-call bot',         false, false, true],
  ['Multi-channel sequences',   false, false, true],
];

// ──────────────────────────────────────────────────────────────────────────────
// Animated connection beam between stage cards (SVG with traveling dots)
// ──────────────────────────────────────────────────────────────────────────────
const Beam = ({ direction = 'horizontal' }) => {
  if (direction === 'horizontal') {
    return (
      <div className="tw-pointer-events-none tw-relative tw-flex tw-h-px tw-w-full tw-items-center" aria-hidden>
        <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" className="tw-h-px tw-w-full">
          <defs>
            <linearGradient id="beam-h" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff7a18" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff7a18" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff7a18" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="1" x2="100" y2="1" stroke="url(#beam-h)" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
        <motion.span
          className="tw-absolute tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-[#ff7a18] tw-shadow-[0_0_10px_#ff7a18]"
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }
  return (
    <div className="tw-relative tw-mx-auto tw-h-12 tw-w-px tw-overflow-hidden" aria-hidden>
      <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-transparent tw-via-[#ff7a18]/60 tw-to-transparent" />
      <motion.span
        className="tw-absolute tw-left-1/2 tw-h-1.5 tw-w-1.5 -tw-translate-x-1/2 tw-rounded-full tw-bg-[#ff7a18] tw-shadow-[0_0_10px_#ff7a18]"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Single stage card
// ──────────────────────────────────────────────────────────────────────────────
const StageCard = ({ stage, index }) => {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'tw-group tw-relative tw-flex tw-h-full tw-flex-col tw-overflow-hidden tw-rounded-2xl tw-border tw-bg-gradient-to-b tw-px-5 tw-py-5 tw-backdrop-blur-md tw-transition-all hover:-tw-translate-y-0.5',
        stage.accentBg,
        'tw-border-white/10 hover:' + stage.accentBorder
      )}
    >
      {/* Top sheen */}
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-white/30 tw-to-transparent tw-opacity-50" />

      {/* Step + icon header */}
      <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
        <span className="tw-font-mono tw-text-[10px] tw-font-bold tw-tracking-[0.32em] tw-text-white/35">STAGE / {stage.step}</span>
        <div
          className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-white/10 tw-bg-black/30"
          style={{ boxShadow: `0 0 22px -8px ${stage.accent}` }}
        >
          <Icon size={16} style={{ color: stage.accent }} />
        </div>
      </div>

      {/* Label + description */}
      <h3 className="tw-text-xl tw-font-black tw-tracking-tight tw-text-white">{stage.label}</h3>
      <p className="tw-mt-1.5 tw-text-[13px] tw-leading-relaxed tw-text-white/60">{stage.desc}</p>

      {/* Metric */}
      <div className="tw-mt-4 tw-flex tw-items-end tw-justify-between tw-gap-3">
        <div>
          <div className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-white/40">{stage.metricLabel}</div>
          <div className="tw-mt-0.5 tw-flex tw-items-baseline tw-gap-1.5">
            <span className="tw-text-2xl tw-font-black tw-tracking-tight tw-tabular-nums" style={{ color: stage.accent }}>{stage.metric}</span>
            <span className="tw-rounded-full tw-bg-emerald-500/10 tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-bold tw-text-emerald-300">+{stage.delta}%</span>
          </div>
        </div>
        <Sparkline data={stage.spark} color={stage.accent} width={70} height={22} />
      </div>

      {/* Chips */}
      <div className="tw-mt-5 tw-flex tw-flex-wrap tw-gap-1.5 tw-border-t tw-border-white/5 tw-pt-4">
        {stage.chips.map((c) => (
          <span
            key={c}
            className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.04] tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-white/65"
          >
            <span className="tw-h-1 tw-w-1 tw-rounded-full" style={{ background: stage.accent }} />
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Capability matrix row
// ──────────────────────────────────────────────────────────────────────────────
const Cell = ({ value }) => {
  if (value === true) return <CheckCircle2 size={14} className="tw-mx-auto tw-text-emerald-400" aria-label="Included" />;
  if (value === false) return <span className="tw-text-white/20">-</span>;
  return <span className="tw-font-bold tw-tabular-nums tw-text-white">{value}</span>;
};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────
export const SystemMap = () => {
  const tickerItems = [
    <><Sparkles size={11} className="tw-text-[#ffb878]" /><span><b className="tw-text-[#ffb878]">42 new contacts</b> discovered in the last hour</span></>,
    <><CheckCircle2 size={11} className="tw-text-sky-300" /><span><b className="tw-text-sky-300">31 records</b> enriched with phone + website</span></>,
    <><Send size={11} className="tw-text-violet-300" /><span><b className="tw-text-violet-300">Day 3 sequence</b> dispatched to 87 buyers</span></>,
    <><Zap size={11} className="tw-text-emerald-400" /><span><b className="tw-text-emerald-300">Hot lead</b> · Athena Dermatology · routed to closer</span></>,
    <><Activity size={11} className="tw-text-[#ffb878]" /><span><b className="tw-text-[#ffb878]">7 automations</b> running across email · WhatsApp · phone</span></>,
  ];

  return (
    <section id="system" className="tw-relative tw-w-full tw-bg-black tw-py-24">
      <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-5">
        {/* HEADER */}
        <div className="agencySectionHead">
          <div className="tw-mb-3 tw-flex tw-justify-center">
            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-[#ff7a18]/30 tw-bg-[#ff7a18]/10 tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-text-[#ffb878]">
              <Layers size={12} /> SYSTEM ARCHITECTURE
            </span>
          </div>
          <p>How it works</p>
          <h2>Targeted buyers found, contacted, and qualified every day.</h2>
          <span>A four-stage automation pipeline that runs on autopilot. Discover, enrich, outreach, convert. Across email, WhatsApp, and AI phone calls.</span>
        </div>

        {/* PIPELINE - 4 stage cards with connecting beams */}
        <div className="tw-mt-12 tw-relative">
          {/* Desktop horizontal layout */}
          <div className="tw-hidden lg:tw-grid lg:tw-grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:tw-items-stretch lg:tw-gap-3">
            {STAGES.map((stage, i) => (
              <React.Fragment key={stage.step}>
                <StageCard stage={stage} index={i} />
                {i < STAGES.length - 1 && (
                  <div className="tw-flex tw-w-12 tw-items-center">
                    <Beam direction="horizontal" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Mobile/tablet stacked layout with vertical beams */}
          <div className="tw-grid tw-gap-3 sm:tw-grid-cols-2 lg:tw-hidden">
            {STAGES.map((stage, i) => (
              <StageCard key={stage.step} stage={stage} index={i} />
            ))}
          </div>
        </div>

        {/* SYSTEM CONSOLE - runtime telemetry panel */}
        <div className="tw-mt-10 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-shadow-[0_30px_80px_rgba(0,0,0,0.55)] tw-backdrop-blur-md">
          {/* chrome */}
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex tw-gap-1.5">
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-red-500/70" />
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-yellow-500/70" />
                <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500/70" />
              </div>
              <span className="tw-text-xs tw-font-semibold tw-text-white/60"><Cpu size={11} className="tw-mb-0.5 tw-mr-1 tw-inline" />SYSTEM · varpec.app · runtime telemetry</span>
              <span className="tw-hidden tw-rounded tw-bg-white/[0.05] tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-mono tw-text-white/45 sm:tw-inline">healthy · 99.97% uptime</span>
            </div>
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-semibold tw-text-emerald-300">
              <span className="tw-relative tw-flex tw-h-1.5 tw-w-1.5">
                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                <span className="tw-relative tw-inline-flex tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-emerald-400" />
              </span>
              ALL SYSTEMS GO
            </span>
          </div>

          {/* Live ticker */}
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-border-b tw-border-white/10 tw-bg-black/20 tw-px-5 tw-py-3">
            <div className="tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2">
              <span className="tw-inline-flex tw-h-5 tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#ff7a18]/15 tw-px-2 tw-text-[9px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-[#ffb878]">
                <Radio size={9} /> Live
              </span>
              <Ticker items={tickerItems} />
            </div>
            <span className="tw-hidden tw-text-[10px] tw-text-white/40 sm:tw-inline">last sync · just now</span>
          </div>

          {/* Telemetry grid */}
          <div className="tw-grid tw-grid-cols-2 tw-gap-px tw-bg-white/5 md:tw-grid-cols-4">
            {[
              { label: 'Active automations', value: '7',     accent: 'tw-text-[#ffb878]', icon: Server,     spark: makeSpark(11, 10, 'flat') },
              { label: 'Channels online',     value: '4 / 4', accent: 'tw-text-emerald-300', icon: Boxes,    spark: makeSpark(22, 10, 'flat') },
              { label: 'Match accuracy',      value: '94%',  accent: 'tw-text-sky-300',    icon: ShieldCheck,spark: makeSpark(33, 10, 'up') },
              { label: 'Avg first reply',     value: '6h 23m', accent: 'tw-text-violet-300', icon: Clock,    spark: makeSpark(44, 10, 'down') },
            ].map((t) => {
              const I = t.icon;
              return (
                <div key={t.label} className="tw-flex tw-flex-col tw-justify-between tw-bg-black/40 tw-px-5 tw-py-4">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <span className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-white/45">{t.label}</span>
                    <I size={12} className="tw-text-white/35" />
                  </div>
                  <div className="tw-mt-2 tw-flex tw-items-end tw-justify-between tw-gap-2">
                    <span className={cn('tw-text-2xl tw-font-black tw-tabular-nums', t.accent)}>{t.value}</span>
                    <Sparkline data={t.spark} color="#ff7a18" width={56} height={18} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Channel grid */}
          <div className="tw-grid tw-grid-cols-2 tw-gap-px tw-border-t tw-border-white/5 tw-bg-white/5 sm:tw-grid-cols-4">
            {CHANNELS.map((c) => {
              const I = c.icon;
              return (
                <div key={c.id} className="tw-flex tw-items-center tw-gap-2.5 tw-bg-black/40 tw-px-5 tw-py-3">
                  <span className="tw-flex tw-h-7 tw-w-7 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-white/[0.03]" style={{ color: c.color }}>
                    <I size={13} />
                  </span>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-[12px] tw-font-bold tw-text-white">{c.label}</span>
                    <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-[10px] tw-text-emerald-300">
                      <span className="tw-relative tw-flex tw-h-1.5 tw-w-1.5">
                        <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                        <span className="tw-relative tw-inline-flex tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-emerald-400" />
                      </span>
                      Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CAPABILITY MATRIX */}
        <div className="tw-mt-10 tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-backdrop-blur-md">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2 tw-border-b tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3">
            <div className="tw-flex tw-items-center tw-gap-2">
              <Boxes size={13} className="tw-text-[#ffb878]" />
              <span className="tw-text-[12px] tw-font-bold tw-text-white">What runs on each plan</span>
            </div>
            <span className="tw-text-[10px] tw-text-white/45">All capabilities · zero hidden infra</span>
          </div>
          <div className="tw-overflow-x-auto">
            <table className="tw-w-full tw-min-w-[560px] tw-text-left tw-text-sm">
              <thead>
                <tr className="tw-border-b tw-border-white/10 tw-bg-white/[0.02] tw-text-[10px] tw-uppercase tw-tracking-[0.2em] tw-text-white/40">
                  <th className="tw-px-5 tw-py-3 tw-font-semibold">Capability</th>
                  {PLANS.map((p, i) => (
                    <th key={p} className={cn('tw-px-5 tw-py-3 tw-text-center tw-font-semibold', i === 1 && 'tw-text-[#ffb878]')}>
                      {p}
                      {i === 1 && <span className="tw-ml-1 tw-rounded-full tw-bg-[#ff7a18]/20 tw-px-1.5 tw-py-px tw-text-[8px] tw-text-[#ffb878]">POPULAR</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(([label, ...vals], i) => (
                  <tr key={label} className={cn('tw-border-b tw-border-white/5 tw-text-white/80 tw-transition-colors hover:tw-bg-white/[0.025]', i === MATRIX.length - 1 && 'tw-border-b-0')}>
                    <td className="tw-px-5 tw-py-3 tw-text-[13px] tw-font-medium tw-text-white/85">{label}</td>
                    {vals.map((v, j) => (
                      <td key={j} className={cn('tw-px-5 tw-py-3 tw-text-center', j === 1 && 'tw-bg-[#ff7a18]/[0.04]')}>
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3 tw-text-[11px] tw-text-white/50">
            <span className="tw-inline-flex tw-items-center tw-gap-1.5">
              <ShieldCheck size={12} className="tw-text-emerald-400" /> All plans include verified contact data and Sheet dashboard access
            </span>
            <a href="#plans" className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-full tw-bg-[#ff7a18]/15 tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-bold tw-text-[#ffb878] tw-transition hover:tw-bg-[#ff7a18]/25">
              Compare full plans <ArrowRight size={10} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
