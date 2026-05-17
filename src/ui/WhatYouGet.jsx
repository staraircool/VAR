import React from 'react';
import { motion } from 'framer-motion';
import {
  Star, ArrowRight, Search, Send, Bell, Clock,
  Sparkles, AlertTriangle, Check
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// AVATARS - free stock from pravatar.cc (real photos, no attribution required)
// ──────────────────────────────────────────────────────────────────────────────
const AVATARS = [
  { src: 'https://i.pravatar.cc/96?img=12', alt: 'Founder, Wholesale (NYC)' },
  { src: 'https://i.pravatar.cc/96?img=47', alt: 'CEO, Dermatology (Dubai)' },
  { src: 'https://i.pravatar.cc/96?img=33', alt: 'Agency owner, Madrid' },
  { src: 'https://i.pravatar.cc/96?img=49', alt: 'Sales lead, Lisbon' },
  { src: 'https://i.pravatar.cc/96?img=68', alt: 'Founder, eCommerce (Phoenix)' },
  { src: 'https://i.pravatar.cc/96?img=44', alt: 'Operator, Skincare (Spain)' },
];

const TESTIMONIALS = [
  { quote: 'Best $399 I spend every month. The replies just show up.', who: 'Founder, Wholesale, Phoenix AZ' },
  { quote: 'Replaced my SDR. Zero regrets, faster pipeline.', who: 'CEO, Dermatology, Dubai' },
  { quote: '12 calls booked in week one. Closed 3.', who: 'Sales lead, eCom, Madrid' },
];

// ──────────────────────────────────────────────────────────────────────────────
// TRUST STRIP - avatar stack + count + 5 stars + countries
// ──────────────────────────────────────────────────────────────────────────────
const TrustStrip = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="tw-mx-auto tw-flex tw-w-full tw-max-w-3xl tw-flex-col tw-items-center tw-gap-3 tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.045] tw-to-white/[0.01] tw-px-5 tw-py-4 tw-backdrop-blur-md sm:tw-flex-row sm:tw-justify-center sm:tw-gap-5"
  >
    {/* avatar stack */}
    <div className="tw-flex tw--space-x-2">
      {AVATARS.map((a, i) => (
        <img
          key={i}
          src={a.src}
          alt={a.alt}
          width="36"
          height="36"
          loading="lazy"
          decoding="async"
          className="tw-h-9 tw-w-9 tw-rounded-full tw-border-2 tw-border-black tw-object-cover tw-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
          style={{ zIndex: AVATARS.length - i }}
        />
      ))}
      <span className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-black tw-bg-[#ff7a18] tw-text-[10px] tw-font-black tw-text-white">+1k</span>
    </div>

    {/* stars + text */}
    <div className="tw-flex tw-flex-col tw-items-center sm:tw-items-start">
      <div className="tw-flex tw-items-center tw-gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={13} className="tw-fill-[#ffb878] tw-text-[#ffb878]" />
        ))}
        <span className="tw-ml-1.5 tw-text-[12px] tw-font-bold tw-text-white">4.9/5</span>
      </div>
      <p className="tw-mt-0.5 tw-text-[12px] tw-text-white/55">
        <span className="tw-font-bold tw-text-white">Trusted by 1,247 businesses</span>
        <span className="tw-hidden sm:tw-inline"> in 18+ countries</span>
      </p>
    </div>
  </motion.div>
);

// ──────────────────────────────────────────────────────────────────────────────
// Three moves: how the system works in plain English
// ──────────────────────────────────────────────────────────────────────────────
const MOVES = [
  {
    n: '01',
    icon: Search,
    title: 'We find your buyers.',
    body: 'While you eat breakfast, our system already scanned 4,000+ businesses and pulled the ones that match what you sell. Real companies. Real decision makers. Real phones and emails.',
    proof: '50 to 145 fresh buyers every morning',
    color: '#ffb878',
  },
  {
    n: '02',
    icon: Send,
    title: 'We pitch them. You sleep.',
    body: 'Emails go out. WhatsApps go out. Our AI even phones them. All at the same time. All under your name. All without you lifting a finger.',
    proof: '3 channels firing 24 hours a day',
    color: '#7dd3fc',
  },
  {
    n: '03',
    icon: Bell,
    title: 'You get the hot replies.',
    body: 'When somebody writes back "yes tell me more", your phone buzzes. You hop on the call. You close. You bank. We did the heavy 80% so you only do the easy 20%.',
    proof: 'Average first reply in 6 hours 23 minutes',
    color: '#6ee7b7',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────────────────────────
export const WhatYouGet = () => {
  return (
    <section id="impact" className="tw-relative tw-w-full tw-bg-black tw-py-20">
      {/* ambient orange glow */}
      <div className="tw-pointer-events-none tw-absolute tw-inset-x-0 tw-top-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-[#ff7a18]/40 tw-to-transparent" />
      <div className="tw-mx-auto tw-w-full tw-max-w-6xl tw-px-5">

        {/* TRUST STRIP */}
        <TrustStrip />

        {/* HEADLINE HOOK */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="tw-mx-auto tw-mt-10 tw-max-w-3xl tw-text-center"
        >
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-rounded-full tw-border tw-border-[#ff7a18]/30 tw-bg-[#ff7a18]/10 tw-px-3 tw-py-1 tw-text-[11px] tw-font-bold tw-tracking-[0.2em] tw-text-[#ffb878]">
            <Sparkles size={11} /> WHAT YOU ACTUALLY GET
          </div>
          <h2 className="tw-mt-4 tw-text-3xl tw-font-black tw-leading-[1.1] tw-tracking-tight tw-text-white sm:tw-text-5xl">
            While you're reading this,<br />
            <span className="tw-text-[#ffb878]">somebody else is closing your buyer.</span>
          </h2>
          <p className="tw-mx-auto tw-mt-4 tw-max-w-xl tw-text-[15px] tw-leading-relaxed tw-text-white/65 sm:tw-text-base">
            You sell something good. The problem is nobody knows it exists.
            We fix that part. You keep the easy part: closing.
          </p>
        </motion.div>

        {/* THREE MOVES */}
        <div className="tw-mt-10 tw-grid tw-gap-3 sm:tw-grid-cols-3">
          {MOVES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-rounded-2xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-white/[0.045] tw-to-white/[0.01] tw-p-6 tw-backdrop-blur-md tw-transition-all hover:-tw-translate-y-0.5 hover:tw-border-[#ff7a18]/30"
              >
                <div className="tw-flex tw-items-start tw-justify-between">
                  <span className="tw-font-mono tw-text-[10px] tw-font-bold tw-tracking-[0.32em] tw-text-white/35">MOVE / {m.n}</span>
                  <div
                    className="tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-xl tw-border tw-border-white/10 tw-bg-black/30"
                    style={{ boxShadow: `0 0 25px -10px ${m.color}` }}
                  >
                    <Icon size={18} style={{ color: m.color }} />
                  </div>
                </div>
                <h3 className="tw-mt-5 tw-text-xl tw-font-black tw-tracking-tight tw-text-white sm:tw-text-2xl">{m.title}</h3>
                <p className="tw-mt-2 tw-text-[14px] tw-leading-relaxed tw-text-white/65">{m.body}</p>
                <div className="tw-mt-5 tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-border tw-border-white/5 tw-bg-black/30 tw-px-3 tw-py-2">
                  <Check size={12} style={{ color: m.color }} />
                  <span className="tw-text-[12px] tw-font-semibold tw-text-white/80">{m.proof}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SCARCITY BAR */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="tw-mt-6 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-rounded-2xl tw-border tw-border-[#ff7a18]/25 tw-bg-gradient-to-r tw-from-[#ff7a18]/[0.07] tw-via-transparent tw-to-[#ff7a18]/[0.07] tw-px-5 tw-py-4"
        >
          <div className="tw-flex tw-items-center tw-gap-3">
            <span className="tw-flex tw-h-8 tw-w-8 tw-items-center tw-justify-center tw-rounded-full tw-bg-[#ff7a18]/15">
              <AlertTriangle size={14} className="tw-text-[#ffb878]" />
            </span>
            <div className="tw-flex tw-flex-col">
              <span className="tw-text-[10px] tw-font-bold tw-tracking-[0.2em] tw-text-[#ffb878]">SLOT WATCH (LAST 30 DAYS)</span>
              <span className="tw-text-[13px] tw-font-semibold tw-text-white">
                247 founders applied. 8 onboarded. 239 told "next month".
              </span>
            </div>
          </div>

          <div className="tw-flex tw-items-center tw-gap-3 tw-text-[12px]">
            <div className="tw-flex tw-flex-col tw-items-end">
              <span className="tw-font-mono tw-text-[10px] tw-text-white/45">THIS MONTH</span>
              <span className="tw-font-bold tw-text-white">6 of 8 slots taken</span>
            </div>
            <div className="tw-relative tw-h-2 tw-w-28 tw-overflow-hidden tw-rounded-full tw-bg-white/10">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="tw-absolute tw-inset-y-0 tw-left-0 tw-rounded-full tw-bg-gradient-to-r tw-from-[#ff8a18] tw-to-[#ff5a00]"
              />
            </div>
          </div>
        </motion.div>

        {/* TESTIMONIAL CHIPS */}
        <div className="tw-mt-6 tw-grid tw-gap-3 sm:tw-grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-white/[0.025] tw-p-5 tw-backdrop-blur-md"
            >
              <div className="tw-flex tw-items-center tw-gap-1 tw-text-[#ffb878]">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={11} className="tw-fill-current" />)}
              </div>
              <blockquote className="tw-mt-2.5 tw-text-[14px] tw-font-medium tw-leading-snug tw-text-white">
                "{t.quote}"
              </blockquote>
              <figcaption className="tw-mt-3 tw-text-[11px] tw-text-white/45">{t.who}</figcaption>
            </motion.figure>
          ))}
        </div>

        {/* BIG CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="tw-mt-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 sm:tw-flex-row"
        >
          <a
            href="https://wa.me/447735390520?text=Hi%20VARPEC%2C%20I%27d%20like%20one%20of%20the%20remaining%20slots."
            target="_blank"
            rel="noopener noreferrer"
            className="agencyPrimaryBtn tw-inline-flex tw-items-center tw-gap-2"
          >
            Grab one of the remaining slots <ArrowRight size={18} />
          </a>
          <a href="#plans" className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-[13px] tw-font-semibold tw-text-white/65 tw-transition hover:tw-text-white">
            See the plans first <ArrowRight size={14} />
          </a>
        </motion.div>
        <p className="tw-mt-3 tw-text-center tw-text-[11px] tw-text-white/40">
          <Clock size={10} className="tw-mb-0.5 tw-mr-1 tw-inline" /> Slot usually fills inside 36 hours.
        </p>
      </div>
    </section>
  );
};
