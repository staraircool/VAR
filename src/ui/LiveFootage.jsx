import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Lock, Circle, ShieldCheck, Sparkles, Activity, Zap, Eye, MapPin
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// Floating data chips that animate in/out around the video
// ──────────────────────────────────────────────────────────────────────────────
const FLOATING_CHIPS = [
  { icon: Sparkles, color: '#ffb878', text: '+1 hot lead added', position: 'top-right',    delay: 1.2 },
  { icon: ShieldCheck, color: '#7dd3fc', text: 'Phone verified  ·  Athena Derma', position: 'bottom-left', delay: 2.6 },
  { icon: Eye,      color: '#a78bfa',  text: 'Row 247 of 5,000 shown',      position: 'top-left',     delay: 3.8 },
  { icon: Zap,      color: '#6ee7b7',  text: 'Reply from 888 Lots  ·  6h ago', position: 'bottom-right', delay: 5.0 },
  { icon: MapPin,   color: '#ffb878',  text: 'Buyer found in Madrid',        position: 'top-right',    delay: 6.4 },
  { icon: Activity, color: '#7dd3fc',  text: 'Scroll velocity  ·  12 rows/s', position: 'bottom-left',  delay: 7.8 },
];

const POSITION_STYLES = {
  'top-left':     'tw-top-3 tw-left-3 sm:tw-top-6 sm:tw-left-6',
  'top-right':    'tw-top-3 tw-right-3 sm:tw-top-6 sm:tw-right-6',
  'bottom-left':  'tw-bottom-3 tw-left-3 sm:tw-bottom-6 sm:tw-left-6',
  'bottom-right': 'tw-bottom-3 tw-right-3 sm:tw-bottom-6 sm:tw-right-6',
};

// ──────────────────────────────────────────────────────────────────────────────
// Single floating chip with its own visibility cycle
// ──────────────────────────────────────────────────────────────────────────────
const FloatingChip = ({ chip, idx }) => {
  const Icon = chip.icon;
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const showAt = setTimeout(() => setVisible(true), chip.delay * 1000);
    const cycle = setInterval(() => {
      setVisible((v) => !v);
    }, 5500 + idx * 400);
    return () => { clearTimeout(showAt); clearInterval(cycle); };
  }, [chip.delay, idx]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={chip.text}
          initial={{ opacity: 0, scale: 0.85, y: chip.position.includes('top') ? -10 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: chip.position.includes('top') ? -10 : 10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`tw-pointer-events-none tw-absolute ${POSITION_STYLES[chip.position]} tw-z-20 tw-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-white/15 tw-bg-black/75 tw-px-3 tw-py-1.5 tw-text-[11px] tw-font-bold tw-text-white tw-backdrop-blur-md`}
          style={{ boxShadow: `0 10px 30px -10px ${chip.color}66` }}
        >
          <Icon size={11} style={{ color: chip.color }} />
          <span>{chip.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────
export const LiveFootage = () => {
  const videoRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [recTime, setRecTime] = React.useState(0);

  // Play/pause based on viewport visibility - saves CPU and data
  React.useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  // REC timer that loops
  React.useEffect(() => {
    const id = setInterval(() => setRecTime((t) => (t + 1) % 600), 1000);
    return () => clearInterval(id);
  }, []);

  // 3D parallax on mouse move (desktop only)
  const handleMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -2.5, y: x * 2.5 });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  const minutes = String(Math.floor(recTime / 60)).padStart(2, '0');
  const seconds = String(recTime % 60).padStart(2, '0');

  return (
    <section id="footage" className="tw-relative tw-w-full tw-overflow-hidden tw-bg-black tw-py-20 sm:tw-py-28">
      {/* ambient orange floor glow */}
      <div className="tw-pointer-events-none tw-absolute tw-bottom-0 tw-left-1/2 tw-h-[400px] tw-w-[800px] tw--translate-x-1/2 tw-translate-y-1/2 tw-rounded-full tw-bg-[#ff7a18]/15 tw-blur-[120px]" />

      <div className="tw-relative tw-mx-auto tw-w-full tw-max-w-6xl tw-px-4 sm:tw-px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="tw-mx-auto tw-max-w-3xl tw-text-center"
        >
          <div className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-full tw-border tw-border-red-500/30 tw-bg-red-500/[0.08] tw-px-3 tw-py-1.5 tw-text-[10px] tw-font-bold tw-tracking-[0.25em] tw-text-red-300">
            <span className="tw-relative tw-flex tw-h-2 tw-w-2">
              <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-red-500 tw-opacity-75" />
              <span className="tw-relative tw-inline-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-red-500" />
            </span>
            LIVE PRODUCTION FEED  ·  UNCUT  ·  NO EDITS
          </div>

          <h2 className="tw-mt-5 tw-text-3xl tw-font-black tw-leading-[1.1] tw-tracking-tight tw-text-white sm:tw-text-5xl">
            We weren't going to <span className="tw-text-[#ffb878]">show you this.</span>
          </h2>
          <p className="tw-mx-auto tw-mt-4 tw-max-w-xl tw-text-[15px] tw-leading-relaxed tw-text-white/65 sm:tw-text-base">
            Real Google Sheet from a paying client. Phones blurred. Names blurred.
            Everything else? Live.
          </p>
        </motion.div>

        {/* CINEMATIC VIDEO FRAME */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="tw-relative tw-mx-auto tw-mt-12 tw-max-w-5xl"
          style={{ perspective: '1500px' }}
        >
          {/* outer device frame with 3D tilt */}
          <div
            className="tw-relative tw-overflow-hidden tw-rounded-[20px] tw-border tw-border-white/15 tw-bg-gradient-to-b tw-from-[#1a1a1a] tw-to-[#0a0a0a] tw-shadow-[0_60px_120px_-30px_rgba(255,122,24,0.35),0_30px_60px_-20px_rgba(0,0,0,0.9)] tw-transition-transform tw-duration-300 tw-ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* BROWSER CHROME / TOP BAR */}
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-border-b tw-border-white/10 tw-bg-black/40 tw-px-3 tw-py-2.5 sm:tw-px-5 sm:tw-py-3">
              <div className="tw-flex tw-items-center tw-gap-3">
                <div className="tw-flex tw-gap-1.5">
                  <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-red-500/80" />
                  <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-yellow-500/80" />
                  <span className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500/80" />
                </div>
                <div className="tw-hidden tw-items-center tw-gap-1.5 tw-rounded-md tw-border tw-border-white/10 tw-bg-white/[0.04] tw-px-2.5 tw-py-1 tw-text-[10px] tw-font-mono tw-text-white/55 sm:tw-flex">
                  <Lock size={10} className="tw-text-emerald-400" />
                  <span>docs.google.com/spreadsheets/d/</span>
                  <span className="tw-text-white/30">██████████/edit</span>
                </div>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-red-500/40 tw-bg-red-500/15 tw-px-2 tw-py-0.5 tw-font-mono tw-text-[10px] tw-font-bold tw-text-red-300">
                  <Circle size={7} className="tw-animate-pulse tw-fill-red-500 tw-text-red-500" />
                  REC  {minutes}:{seconds}
                </span>
                <span className="tw-hidden tw-h-7 tw-w-7 tw-overflow-hidden tw-rounded-full tw-border tw-border-white/15 tw-bg-gradient-to-br tw-from-[#ff8a18] tw-to-[#ff5a00] tw-text-center tw-text-[10px] tw-font-black tw-leading-7 tw-text-white sm:tw-block">V</span>
              </div>
            </div>

            {/* VIDEO + OVERLAYS */}
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
                aria-label="Live footage of a real VARPEC client Google Sheet"
              />

              {/* corner vignettes */}
              <div className="tw-pointer-events-none tw-absolute tw-inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
              }} />

              {/* horizontal scan line that drops periodically */}
              <motion.div
                className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-[#ff7a18]/40 tw-to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* watermark */}
              <div className="tw-pointer-events-none tw-absolute tw-bottom-3 tw-right-3 tw-flex tw-items-center tw-gap-1.5 tw-rounded tw-bg-black/60 tw-px-2 tw-py-1 tw-text-[9px] tw-font-bold tw-tracking-[0.25em] tw-text-white/55 tw-backdrop-blur-md">
                <span className="tw-h-1.5 tw-w-1.5 tw-rounded-full tw-bg-[#ff7a18]" />
                VARPEC.APP
              </div>

              {/* floating data chips */}
              {FLOATING_CHIPS.map((chip, i) => (
                <FloatingChip key={i} chip={chip} idx={i} />
              ))}
            </div>

            {/* BOTTOM STATUS BAR */}
            <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-border-white/10 tw-bg-black/40 tw-px-4 tw-py-2.5 tw-text-[10px] tw-text-white/55 sm:tw-px-5">
              <span className="tw-inline-flex tw-items-center tw-gap-1.5">
                <Activity size={11} className="tw-text-emerald-400" />
                Auto-syncing  ·  last update 12s ago  ·  1,247 rows visible
              </span>
              <span className="tw-hidden tw-font-mono sm:tw-inline">phones anonymised in this clip  ·  your live sheet is private</span>
            </div>
          </div>

          {/* REFLECTION FLOOR */}
          <div
            aria-hidden="true"
            className="tw-pointer-events-none tw-mx-auto tw-mt-1 tw-h-24 tw-w-[92%] tw-overflow-hidden tw-rounded-b-[20px]"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,122,24,0.18) 0%, transparent 100%)',
              filter: 'blur(8px)',
              transform: 'scaleY(-0.5)',
              opacity: 0.5,
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* QUICK STATS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="tw-mx-auto tw-mt-10 tw-grid tw-max-w-3xl tw-grid-cols-2 tw-gap-3 sm:tw-grid-cols-3"
        >
          {[
            { label: 'Rows in this clip', value: '184', color: '#ffb878' },
            { label: 'Buyers in the live sheet', value: '1,247', color: '#7dd3fc' },
            { label: 'Average reply', value: '6h 23m', color: '#6ee7b7' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`tw-rounded-xl tw-border tw-border-white/10 tw-bg-white/[0.025] tw-px-4 tw-py-3 tw-text-center tw-backdrop-blur-md ${i === 2 ? 'tw-col-span-2 sm:tw-col-span-1' : ''}`}
            >
              <span className="tw-block tw-text-[9px] tw-font-bold tw-tracking-[0.25em] tw-text-white/45">
                {s.label.toUpperCase()}
              </span>
              <span className="tw-mt-1 tw-block tw-text-2xl tw-font-black tw-tabular-nums" style={{ color: s.color }}>
                {s.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="tw-mt-9 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 sm:tw-flex-row sm:tw-gap-4"
        >
          <a
            href="https://wa.me/447735390520?text=Hi%20VARPEC%2C%20I%20want%20a%20live%20sheet%20like%20the%20one%20in%20the%20footage."
            target="_blank"
            rel="noopener noreferrer"
            className="agencyPrimaryBtn tw-inline-flex tw-items-center tw-gap-2"
          >
            Get your own live sheet <ArrowRight size={18} />
          </a>
          <a href="#dashboard" className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-[13px] tw-font-semibold tw-text-white/65 tw-transition hover:tw-text-white">
            Or scroll the interactive version <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
