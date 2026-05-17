import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailCheck, MailOpen, MailX, Reply, Send, Inbox, Search, Filter, MoreHorizontal, Sparkles, Activity, Paperclip, Star } from 'lucide-react';
import { cn } from '../lib/utils';

// === DATA POOLS ===
// Synthetic but campaign-grade entries that mirror VARPEC's actual buyer verticals
// (US wholesalers/liquidators + UAE/EU dermatology clinics). Sensitive parts masked at render.
const RECIPIENTS = [
  // US Wholesalers / Liquidators
  { handle: 'sales', domain: 'supremewholesale.com', name: 'Supreme Wholesale', flag: '🇺🇸' },
  { handle: 'contact', domain: 'bargaincentralwarehouse.com', name: 'Bargain Central', flag: '🇺🇸' },
  { handle: 'orders', domain: 'cactusliquidation.com', name: 'Cactus Liquidation', flag: '🇺🇸' },
  { handle: 'hello', domain: 'americawholesalefurniture.com', name: 'America Wholesale', flag: '🇺🇸' },
  { handle: 'info', domain: 'coastliquidation.com', name: 'Coast-to-Coast', flag: '🇺🇸' },
  { handle: 'buy', domain: 'lasvegasliquidationpallets.com', name: 'LV Liquidation Pallets', flag: '🇺🇸' },
  { handle: 'lots', domain: '888lots.com', name: '888 Lots', flag: '🇺🇸' },
  { handle: 'wholesale', domain: 'closeoutpallets.com', name: 'Closeout Pallets', flag: '🇺🇸' },
  { handle: 'team', domain: 'salesumo.com', name: 'SaleSumo', flag: '🇺🇸' },
  { handle: 'support', domain: 'primoliquidation.com', name: 'Primo Liquidation', flag: '🇺🇸' },
  { handle: 'sales', domain: 'wrappedpallets.com', name: 'Wrapped Pallets', flag: '🇺🇸' },
  { handle: 'contact', domain: 'blowoutliquidation.com', name: 'Blowout Liquidation', flag: '🇺🇸' },
  // UAE Dermatology
  { handle: 'clinic', domain: 'dromarkhalili.com', name: 'Dr Omar Al Khalili Clinic', flag: '🇦🇪' },
  { handle: 'info', domain: 'perla-dc.com', name: 'Perla Dermatology', flag: '🇦🇪' },
  { handle: 'reception', domain: 'athenaderma.com', name: 'Athena Dermatology', flag: '🇦🇪' },
  { handle: 'hello', domain: 'glowdubai.ae', name: 'Glow Aesthetics Dubai', flag: '🇦🇪' },
  { handle: 'admin', domain: 'altaderma.com', name: 'Altaderma Clinic', flag: '🇦🇪' },
  { handle: 'bookings', domain: 'eliveclinics.com', name: 'Elive Beauty Spot', flag: '🇦🇪' },
  { handle: 'office', domain: 'dermaone.ae', name: 'Derma One Aesthetic', flag: '🇦🇪' },
  { handle: 'contact', domain: 'skinlaserdubai.com', name: 'Mahaveer Mehta Derm.', flag: '🇦🇪' },
  { handle: 'info', domain: 'gopremium.ae', name: 'Premium Cosmetic Laser', flag: '🇦🇪' },
  // EU Dermatology
  { handle: 'info', domain: 'imede.es', name: 'Clínica IMEDE', flag: '🇪🇸' },
  { handle: 'consulta', domain: 'dermomedic.com', name: 'Clínica DermoMedic', flag: '🇪🇸' },
  { handle: 'info', domain: 'madriderma.com', name: 'Madriderma', flag: '🇪🇸' },
  { handle: 'info', domain: 'imda.es', name: 'IMDA Madrid', flag: '🇪🇸' },
  { handle: 'citaprevia', domain: 'dermaniac.com', name: 'Dermaniac Madrid', flag: '🇪🇸' },
  { handle: 'info', domain: 'clinicaeguren.com', name: 'Clínica Eguren', flag: '🇪🇸' },
  { handle: 'info', domain: 'oneskinmed.com', name: 'ONESKIN-MED', flag: '🇪🇸' },
  { handle: 'madrid', domain: 'defelipe.com', name: 'De Felipe Dermatología', flag: '🇪🇸' },
  { handle: 'info', domain: 'derma360.pt', name: 'Derma360', flag: '🇵🇹' },
  { handle: 'geral', domain: 'cdlisboa.pt', name: 'Centro Derm. Lisboa', flag: '🇵🇹' },
  { handle: 'geral', domain: 'dermareeiro.pt', name: 'Dermatologia Areeiro', flag: '🇵🇹' },
  { handle: 'consultorio', domain: 'joaoabelamaro.com.pt', name: 'Dr. João Abel Amaro', flag: '🇵🇹' },
  { handle: 'clidermatologia', domain: 'isabelfonsecadermatologia.com', name: 'Dra Isabel Fonseca', flag: '🇵🇹' },
];

const SUBJECTS = [
  ['Quick question for {{name}}', 'intro'],
  ['Helping {{name}} get more qualified buyers', 'intro'],
  ['Saw your work — quick idea', 'intro'],
  ['{{name}} — quick automation idea', 'intro'],
  ['Worth a 15-min look?', 'intro'],
  ['Following up on my last note', 'followup'],
  ['Bumping this — quick thought for {{name}}', 'followup'],
  ['Re: Helping {{name}} get more qualified buyers', 'reply'],
  ['Re: Quick question for {{name}}', 'reply'],
  ['Re: Worth a 15-min look?', 'reply'],
  ['{{name}} — proposal inside', 'proposal'],
  ['As promised — short loom + numbers', 'proposal'],
  ['Closing the loop', 'breakup'],
  ['One more before I close your file', 'breakup'],
];

const SEQUENCES = ['Day 1 · Intro', 'Day 3 · Follow-up', 'Day 7 · Follow-up', 'Day 12 · Case study', 'Day 18 · Breakup'];

const STATUS_POOL = [
  { id: 'sent', weight: 18 },
  { id: 'delivered', weight: 30 },
  { id: 'opened', weight: 28 },
  { id: 'replied', weight: 14 },
  { id: 'clicked', weight: 8 },
  { id: 'bounced', weight: 2 },
];

const STATUS_CONFIG = {
  sent:      { label: 'Sent',      icon: Send,      color: 'tw-text-white/80',       bg: 'tw-bg-white/5 tw-border-white/15' },
  delivered: { label: 'Delivered', icon: MailCheck, color: 'tw-text-sky-300',        bg: 'tw-bg-sky-500/10 tw-border-sky-500/30' },
  opened:    { label: 'Opened',    icon: MailOpen,  color: 'tw-text-violet-300',     bg: 'tw-bg-violet-500/10 tw-border-violet-500/30' },
  replied:   { label: 'Replied',   icon: Reply,     color: 'tw-text-emerald-300',    bg: 'tw-bg-emerald-500/10 tw-border-emerald-500/30' },
  clicked:   { label: 'Clicked',   icon: Star,      color: 'tw-text-[#ffb878]',      bg: 'tw-bg-[#ff7a18]/10 tw-border-[#ff7a18]/30' },
  bounced:   { label: 'Bounced',   icon: MailX,     color: 'tw-text-red-300',        bg: 'tw-bg-red-500/10 tw-border-red-500/30' },
};

// === HELPERS ===
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pickWeighted(rand, pool) {
  const total = pool.reduce((a, b) => a + b.weight, 0);
  let r = rand() * total;
  for (const item of pool) {
    if ((r -= item.weight) <= 0) return item.id;
  }
  return pool[0].id;
}

function maskEmail(handle, domain) {
  const maskedHandle = handle.length <= 3
    ? handle[0] + '█'.repeat(Math.max(1, handle.length - 1))
    : handle.slice(0, 2) + '█'.repeat(handle.length - 2);
  const [name, ...tldParts] = domain.split('.');
  const tld = tldParts.join('.');
  const maskedName = name.length <= 4
    ? name[0] + '█'.repeat(name.length - 1)
    : name.slice(0, 2) + '█'.repeat(name.length - 4) + name.slice(-2);
  return `${maskedHandle}@${maskedName}.${tld}`;
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

// Generate 200 emails deterministically (seeded so it doesn't reshuffle on rerender)
function buildEmails(seed) {
  const rand = rng(seed);
  const emails = [];
  // Time offsets distributed: many recent (last hour), some today, some yesterday
  for (let i = 0; i < 200; i++) {
    const recipient = RECIPIENTS[Math.floor(rand() * RECIPIENTS.length)];
    const [subjectTpl, subjType] = SUBJECTS[Math.floor(rand() * SUBJECTS.length)];
    const subject = subjectTpl.replace('{{name}}', recipient.name.split(' ')[0]);
    let secondsAgo;
    const bucket = rand();
    if (bucket < 0.25) secondsAgo = Math.floor(rand() * 60);              // 0–60s
    else if (bucket < 0.55) secondsAgo = 60 + Math.floor(rand() * 3540);  // 1m–1h
    else if (bucket < 0.85) secondsAgo = 3600 + Math.floor(rand() * 7 * 3600); // 1h–8h
    else secondsAgo = 8 * 3600 + Math.floor(rand() * 36 * 3600);          // 8h–44h

    let status = pickWeighted(rand, STATUS_POOL);
    // Subject-aware status: replies only for "Re:" subjects
    if (subjType === 'reply') status = rand() < 0.8 ? 'replied' : 'opened';
    if (status === 'replied' && subjType !== 'reply') status = 'opened';

    const sequence = SEQUENCES[subjType === 'reply' ? 1 : Math.floor(rand() * SEQUENCES.length)];
    const hasAttachment = rand() < 0.18;

    emails.push({
      id: i,
      recipient,
      subject,
      status,
      sequence,
      secondsAgo,
      hasAttachment,
      isReply: subjType === 'reply',
    });
  }
  // Sort by recency
  emails.sort((a, b) => a.secondsAgo - b.secondsAgo);
  return emails;
}

const FILTERS = [
  { id: 'all',       label: 'All Mail',  icon: Inbox },
  { id: 'replied',   label: 'Replies',   icon: Reply },
  { id: 'opened',    label: 'Opens',     icon: MailOpen },
  { id: 'delivered', label: 'Delivered', icon: MailCheck },
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

const Counter = ({ value, label, accent, suffix }) => {
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
      <div className="tw-mt-2 tw-flex tw-items-baseline tw-gap-1">
        <span className={cn('tw-text-3xl tw-font-black tw-tracking-tight md:tw-text-4xl tw-tabular-nums', accent || 'tw-text-white')}>{n.toLocaleString()}</span>
        {suffix && <span className="tw-text-sm tw-font-semibold tw-text-white/40">{suffix}</span>}
      </div>
    </div>
  );
};

export const EmailFeed = () => {
  const [emails] = React.useState(() => buildEmails(91827));
  const [filter, setFilter] = React.useState('all');
  // Bump shifts every email's secondsAgo forward — gives the live feel
  const [bump, setBump] = React.useState(0);
  // newPulse holds the index in `filtered` of the row currently showing JUST SENT
  const [newPulse, setNewPulse] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setBump((b) => b + 1), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => setNewPulse((p) => p + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const filtered = React.useMemo(() => {
    const list = filter === 'all' ? emails : emails.filter((e) => e.status === filter);
    return list.slice(0, 14);
  }, [emails, filter]);

  const pulseRow = filtered.length ? newPulse % Math.min(3, filtered.length) : 0;

  // Stats
  const total = 200;
  const delivered = emails.filter((e) => e.status !== 'bounced' && e.status !== 'sent').length;
  const opens = emails.filter((e) => ['opened', 'replied', 'clicked'].includes(e.status)).length;
  const replies = emails.filter((e) => e.status === 'replied').length;

  return (
    <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-2 sm:tw-px-5">
      <div className="tw-grid tw-grid-cols-2 tw-gap-3 md:tw-grid-cols-4">
        <Counter value={total} label="Emails Sent" accent="tw-text-white" />
        <Counter value={delivered} label="Delivered" accent="tw-text-sky-300" suffix={`/${total}`} />
        <Counter value={opens} label="Opens" accent="tw-text-[#ffb878]" />
        <Counter value={replies} label="Replies" accent="tw-text-emerald-300" />
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
            <span className="tw-text-xs tw-font-semibold tw-text-white/60">OUTREACH — Varpec · Send Queue</span>
          </div>
          <div className="tw-hidden tw-items-center tw-gap-2 sm:tw-flex">
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-emerald-500/30 tw-bg-emerald-500/10 tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-semibold tw-text-emerald-300">
              <span className="tw-relative tw-flex tw-h-1.5 tw-w-1.5">
                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-emerald-400 tw-opacity-75" />
                <span className="tw-relative tw-inline-flex tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-emerald-400" />
              </span>
              SENDING
            </span>
            <span className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><Search size={10} /> /</span>
            <span className="tw-inline-flex tw-items-center tw-gap-1 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/5 tw-px-2 tw-py-1 tw-text-[10px] tw-text-white/55"><MoreHorizontal size={12} /></span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-border-b tw-border-white/10 tw-bg-black/20 tw-px-4 tw-py-2.5">
          <Filter size={12} className="tw-text-white/40 tw-mr-1" />
          {FILTERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-px-3 tw-py-1 tw-text-[11px] tw-font-semibold tw-transition-all',
                  filter === f.id
                    ? 'tw-bg-gradient-to-b tw-from-[#ff8a18] tw-to-[#ff5a00] tw-text-white tw-shadow-[0_2px_10px_rgba(255,122,24,0.4)]'
                    : 'tw-text-white/55 hover:tw-bg-white/5 hover:tw-text-white'
                )}
              >
                <Icon size={11} /> {f.label}
              </button>
            );
          })}
          <span className="tw-ml-auto tw-text-[10px] tw-text-white/40">{filtered.length} of {filter === 'all' ? total : emails.filter((e) => e.status === filter).length} shown</span>
        </div>

        {/* Inbox-style list */}
        <ul className="tw-divide-y tw-divide-white/5">
          <AnimatePresence mode="popLayout">
            {filtered.map((email, i) => {
              const isPulse = i === pulseRow && email.secondsAgo + bump < 30;
              const seconds = email.secondsAgo + bump;
              return (
                <motion.li
                  key={email.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, delay: i * 0.015 }}
                  className={cn(
                    'tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-transition-colors sm:tw-gap-4 sm:tw-px-5',
                    isPulse ? 'tw-bg-[#ff7a18]/[0.06]' : 'hover:tw-bg-white/[0.025]'
                  )}
                  style={isPulse ? { boxShadow: 'inset 3px 0 0 #ff7a18' } : undefined}
                >
                  {/* Avatar */}
                  <div className="tw-flex tw-h-9 tw-w-9 tw-flex-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-white/10 tw-bg-gradient-to-br tw-from-white/10 tw-to-white/[0.02] tw-text-base">
                    <span>{email.recipient.flag}</span>
                  </div>

                  {/* Body */}
                  <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col tw-gap-0.5">
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <span className="tw-truncate tw-font-semibold tw-text-white tw-text-sm">
                        {email.isReply && <span className="tw-text-emerald-400 tw-font-bold tw-mr-1">Re:</span>}
                        {email.subject}
                      </span>
                      {email.hasAttachment && <Paperclip size={11} className="tw-flex-shrink-0 tw-text-white/35" />}
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
                        <span className="tw-text-white/60">to</span>{' '}
                        <span className="tw-text-white/75">{maskEmail(email.recipient.handle, email.recipient.domain)}</span>
                      </span>
                      <span className="tw-text-white/20">·</span>
                      <span className="tw-hidden sm:tw-inline">{email.recipient.name}</span>
                      <span className="tw-hidden tw-text-white/20 sm:tw-inline">·</span>
                      <span className="tw-text-[#ffb878]/70">{email.sequence}</span>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="tw-flex tw-flex-shrink-0 tw-items-center tw-gap-3">
                    <StatusPill status={email.status} />
                    <span className="tw-hidden tw-w-16 tw-text-right tw-text-[11px] tw-font-medium tw-tabular-nums tw-text-white/45 sm:tw-block">
                      {timeAgo(seconds)}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Footer */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-border-t tw-border-white/10 tw-bg-black/30 tw-px-5 tw-py-3 tw-text-[11px] tw-text-white/50">
          <span className="tw-inline-flex tw-items-center tw-gap-1.5">
            <Activity size={12} className="tw-text-emerald-400" /> Live queue · {total} emails delivered today
          </span>
          <span className="tw-flex tw-items-center tw-gap-1.5">
            <Mail size={11} className="tw-text-white/35" /> Recipient handles & domains anonymised in preview
          </span>
        </div>
      </div>
    </div>
  );
};
