import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

// ──────────────────────────────────────────────────────────────────────────────
// Sparkline - micro SVG trendline (no deps)
// ──────────────────────────────────────────────────────────────────────────────
export const Sparkline = ({ data, color = '#ff7a18', width = 64, height = 18 }) => {
  const safeData = data && data.length ? data : [1, 2, 1, 3, 2, 4, 3, 5];
  const w = width, h = height;
  const max = Math.max(...safeData);
  const min = Math.min(...safeData);
  const range = max - min || 1;
  const pts = safeData.map((v, i) => {
    const x = (i / (safeData.length - 1)) * (w - 2) + 1;
    const y = h - 2 - ((v - min) / range) * (h - 4);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = `M ${pts.join(' L ')}`;
  const area = `M 1,${h - 1} L ${pts.join(' L ')} L ${w - 1},${h - 1} Z`;
  const gid = React.useId();
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="tw-block tw-overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(',')[0]} cy={pts[pts.length - 1].split(',')[1]} r="2" fill={color} />
    </svg>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Donut - circular progress
// ──────────────────────────────────────────────────────────────────────────────
export const Donut = ({ value, max = 100, color = '#6ee7b7', size = 56, label }) => {
  const r = size / 2 - 4;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const [animated, setAnimated] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1400);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(eased * pct);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="tw-block">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - animated)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.26} fontWeight="800" fill="white" style={{ fontFamily: 'ui-sans-serif, system-ui' }}>
        {Math.round(animated * 100)}%
      </text>
      {label && (
        <text x="50%" y="86%" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.45)" letterSpacing="1.5" style={{ textTransform: 'uppercase', fontFamily: 'ui-sans-serif, system-ui', fontWeight: 600 }}>
          {label}
        </text>
      )}
    </svg>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// KpiCard - counter + sparkline + delta
// ──────────────────────────────────────────────────────────────────────────────
export const KpiCard = ({ value, label, accent = 'tw-text-white', sparkColor = '#ff7a18', spark, delta, deltaSuffix = '%', suffix }) => {
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
  const positive = delta != null && delta >= 0;
  return (
    <div ref={ref} className="tw-group tw-relative tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.045] tw-to-white/[0.01] tw-px-5 tw-py-5 tw-backdrop-blur-md tw-transition-all hover:tw-border-[#ff7a18]/30 hover:tw-shadow-[0_10px_30px_-10px_rgba(255,122,24,0.35)]">
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-[#ff7a18]/60 tw-to-transparent tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100" />
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
        <span className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-white/45">{label}</span>
        {delta != null && (
          <span className={cn('tw-inline-flex tw-items-center tw-gap-0.5 tw-rounded-full tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-bold tw-tabular-nums', positive ? 'tw-bg-emerald-500/10 tw-text-emerald-300' : 'tw-bg-red-500/10 tw-text-red-300')}>
            {positive ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
            {positive ? '+' : ''}{delta}{deltaSuffix}
          </span>
        )}
      </div>
      <div className="tw-mt-1.5 tw-flex tw-items-end tw-justify-between tw-gap-3">
        <div className="tw-flex tw-items-baseline tw-gap-1">
          <span className={cn('tw-text-3xl tw-font-black tw-tracking-tight md:tw-text-[34px] tw-leading-none tw-tabular-nums', accent)}>{n.toLocaleString()}</span>
          {suffix && <span className="tw-text-xs tw-font-semibold tw-text-white/40">{suffix}</span>}
        </div>
        {spark && <Sparkline data={spark} color={sparkColor} width={66} height={20} />}
      </div>
      <div className="tw-mt-2 tw-h-px tw-w-full tw-bg-gradient-to-r tw-from-transparent tw-via-white/10 tw-to-transparent" />
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Live ticker - animated single-line activity ticker
// ──────────────────────────────────────────────────────────────────────────────
export const Ticker = ({ items, interval = 2800 }) => {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);
  return (
    <div className="tw-relative tw-flex tw-h-7 tw-items-center tw-overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="tw-flex tw-items-center tw-gap-2 tw-whitespace-nowrap tw-text-[11px] tw-font-medium tw-text-white/70"
        >
          {items[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Geo chip stack - flag + count with subtle bar
// ──────────────────────────────────────────────────────────────────────────────
export const GeoStack = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="tw-flex tw-items-center tw-gap-3">
      {data.map((d) => (
        <div key={d.code} className="tw-flex tw-flex-col tw-items-start tw-gap-1">
          <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-[10px]">
            <span className="tw-text-sm tw-leading-none">{d.flag}</span>
            <span className="tw-font-bold tw-text-white tw-tabular-nums">{d.count}</span>
          </div>
          <div className="tw-h-0.5 tw-w-10 tw-overflow-hidden tw-rounded-full tw-bg-white/10">
            <div className="tw-h-full tw-rounded-full tw-bg-gradient-to-r tw-from-[#ff7a18] tw-to-[#ff5a00]" style={{ width: `${(d.count / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Funnel - horizontal progression with conversion %
// ──────────────────────────────────────────────────────────────────────────────
export const Funnel = ({ steps, title }) => {
  const top = steps[0]?.value || 1;
  return (
    <div className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.04] tw-to-white/[0.01] tw-p-5 tw-backdrop-blur-md">
      {title && (
        <div className="tw-mb-3 tw-flex tw-items-center tw-justify-between">
          <span className="tw-text-[10px] tw-font-semibold tw-uppercase tw-tracking-[0.2em] tw-text-white/45">{title}</span>
          <span className="tw-text-[10px] tw-text-white/35">end-to-end conversion</span>
        </div>
      )}
      <div className="tw-grid tw-gap-3 sm:tw-grid-cols-4">
        {steps.map((s, i) => {
          const widthPct = (s.value / top) * 100;
          const prev = i > 0 ? steps[i - 1].value : null;
          const stepPct = prev ? Math.round((s.value / prev) * 100) : 100;
          const Icon = s.icon;
          return (
            <div key={s.label} className="tw-relative">
              <div className="tw-flex tw-items-center tw-justify-between tw-text-[10px] tw-uppercase tw-tracking-[0.18em] tw-text-white/45">
                <span className="tw-inline-flex tw-items-center tw-gap-1">
                  {Icon && <Icon size={10} />} {s.label}
                </span>
                {i > 0 && <span className="tw-font-bold tw-text-white/55 tw-tabular-nums">{stepPct}%</span>}
              </div>
              <div className="tw-mt-1.5 tw-text-2xl tw-font-black tw-tabular-nums tw-text-white">{s.value.toLocaleString()}</div>
              <div className="tw-mt-2 tw-h-1.5 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${widthPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.12, ease: 'easeOut' }}
                  className="tw-h-full tw-rounded-full"
                  style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Keyboard shortcut badge
// ──────────────────────────────────────────────────────────────────────────────
export const Kbd = ({ children }) => (
  <kbd className="tw-inline-flex tw-h-5 tw-min-w-[20px] tw-items-center tw-justify-center tw-rounded tw-border tw-border-white/15 tw-bg-white/[0.04] tw-px-1 tw-font-mono tw-text-[10px] tw-font-semibold tw-text-white/55">{children}</kbd>
);

// ──────────────────────────────────────────────────────────────────────────────
// Group header (inside row lists)
// ──────────────────────────────────────────────────────────────────────────────
export const GroupHeader = ({ label, count, accent = 'tw-text-white/45' }) => (
  <li className="tw-flex tw-items-center tw-gap-2 tw-bg-black/30 tw-px-5 tw-py-1.5 tw-text-[9px] tw-font-bold tw-uppercase tw-tracking-[0.22em]">
    <span className={cn(accent)}>{label}</span>
    <span className="tw-rounded-full tw-bg-white/[0.06] tw-px-1.5 tw-py-0.5 tw-text-[9px] tw-font-bold tw-text-white/55 tw-tabular-nums">{count}</span>
    <span className="tw-ml-1 tw-h-px tw-flex-1 tw-bg-white/5" />
  </li>
);

// ──────────────────────────────────────────────────────────────────────────────
// Deterministic sparkline generator (so they don't shuffle every render)
// ──────────────────────────────────────────────────────────────────────────────
export function makeSpark(seed, len = 12, trend = 'up') {
  let s = seed >>> 0;
  const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const arr = [];
  let base = 4 + rand() * 3;
  for (let i = 0; i < len; i++) {
    const drift = trend === 'up' ? (i / len) * 4 : trend === 'down' ? -(i / len) * 3 : 0;
    const noise = (rand() - 0.5) * 2;
    arr.push(Math.max(0.5, base + drift + noise));
  }
  return arr;
}
