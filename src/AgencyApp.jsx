import React from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, Banknote, Bitcoin, Check, ChevronRight, CreditCard, Flame, Landmark, Mail, Orbit, PhoneCall, Radar, ShieldCheck, Target, TrendingUp, Zap } from 'lucide-react';
import laptopFull from '../assets/laptop-full.png';
import laptopHalf from '../assets/laptop-half-top-view.png';
import varpecLogo from '../assets/logo.png';
import './agency.css';
import './agency-performance.css';
import './visual-sections.css';
import './visual-refinement.css';
import './visual-final.css';
import './visual-placement.css';
import './visual-clean.css';
import './hero-orbit.css';
import './hero-redesign.css';
import './tailwind.css';
import './premium-sections.css';
import { Spotlight } from './ui/Spotlight';
import { Badge } from './ui/Badge';
import { Accordion } from './ui/Accordion';
import { Dialog } from './ui/Dialog';
import { Sheet } from './ui/Sheet';
import { Tooltip } from './ui/Tooltip';
import { ScrollProgress } from './ui/ScrollProgress';
import { CursorGlow } from './ui/CursorGlow';
import { useToast } from './ui/Toast';
import { Menu, Info } from 'lucide-react';
import { getCalApi } from '@calcom/embed-react';

const HeroScene3D = React.lazy(() => import('./HeroScene3D.jsx'));

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const signals = ['50 to 145 daily contacts', '300+ to 1,000+ weekly contacts', 'AI email outreach', 'AI WhatsApp outreach', 'AI phone call bot', 'Interested lead alerts', 'Google Sheet dashboard', '5,000+ monthly contacts'];

const services = [
  [Target, 'Targeted buyer contacts every single day', 'VARPEC finds targeted buyers for your products and delivers fresh contacts daily, so your pipeline does not depend on luck.'],
  [Mail, 'AI email outreach on your behalf', 'Growth and Premium plans send personalised email outreach automatically, so your offer keeps moving while you focus on sales.'],
  [PhoneCall, 'WhatsApp and AI phone call automation', 'Premium runs a fully automated campaign across email, WhatsApp, and AI phone calls to qualify serious interest faster.'],
  [Radar, 'Instant interested lead alerts', 'When a buyer replies or says yes, you receive an alert with their full details, so you speak with people already showing interest.']
];

const process = [
  ['01', 'Position', 'We make your offer easy to understand and attractive to the right business buyer.'],
  ['02', 'Target', 'We organize prospect direction around industry, location, business type, and opportunity fit.'],
  ['03', 'Automate', 'Depending on your plan, we deliver contacts, send email outreach, or run email, WhatsApp, and phone call campaigns.'],
  ['04', 'Convert', 'Interested buyers are pushed to you with details, so you can focus on closing deals instead of chasing cold lists.']
];

const plans = [
  ['Starter', '$99 / month', 'For self-managed outreach', ['50 daily contacts', '300+ weekly contacts', '1,500+ monthly contacts'], 'Best for businesses that want to handle their own outreach but need a consistent daily supply of targeted contacts.', ['Targeted lead list', 'Name, phone, email and business category', 'Google Sheet dashboard', 'You decide how and when to reach out']],
  ['Growth', '$199 / month', 'Most chosen automation plan', ['70 daily contacts', '500+ weekly contacts', '2,500+ monthly contacts'], 'Best for businesses that want leads found and contacted automatically without lifting a finger.', ['Targeted lead list', 'AI personalised email outreach', 'Interested lead alerts', 'Google Sheet dashboard'], true],
  ['Premium', '$399 / month', 'Fully automated sales machine', ['145 daily contacts', '1,000+ weekly contacts', '5,000+ monthly contacts'], 'Best for businesses that want a fully automated sales machine running around the clock.', ['Targeted lead list', 'AI email outreach', 'AI WhatsApp outreach', 'AI phone call bot', 'Interested lead alerts', 'Google Sheet dashboard']]
];

const payments = [[Bitcoin, 'Crypto'], [Landmark, 'Bank Transfer'], [CreditCard, 'Card Payment'], [Banknote, 'Western Union']];

const faqs = [
  ['How do the plans work?', 'Starter delivers contacts to your dashboard. Growth adds AI email outreach. Premium adds email, WhatsApp, and AI phone call automation.'],
  ['What is included in each contact?', 'Starter contacts include name, phone number, email address, and business category delivered to your Google Sheet dashboard.'],
  ['What happens when a buyer is interested?', 'Growth and Premium clients receive interested lead alerts with the buyer details, so they only speak with people who are already showing interest.'],
  ['Which payment methods are available?', 'Crypto, bank transfer, card payment, and Western Union are available for approved onboarding slots.']
];

export default function AgencyApp() {
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [leadOpen, setLeadOpen] = React.useState(false);
  const [leadEmail, setLeadEmail] = React.useState('');
  const [leadLoading, setLeadLoading] = React.useState(false);

  // Auto-trigger lead capture after 25s on first visit
  React.useEffect(() => {
    if (sessionStorage.getItem('varpec_lead_shown')) return;
    const t = setTimeout(() => {
      setLeadOpen(true);
      sessionStorage.setItem('varpec_lead_shown', '1');
    }, 25000);
    return () => clearTimeout(t);
  }, []);

  const submitLead = async (e) => {
    e.preventDefault();
    if (!leadEmail || !leadEmail.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'error' });
      return;
    }
    setLeadLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLeadLoading(false);
    setLeadOpen(false);
    setLeadEmail('');
    toast({ title: 'Playbook on its way', description: 'Check your inbox in the next minute.', variant: 'success' });
  };

  const reserveToast = () => {
    toast({ title: 'Opening WhatsApp', description: 'A growth advisor will reply shortly.', variant: 'info' });
  };

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.agencyTickerTrack', { xPercent: -50, duration: 18, repeat: -1, ease: 'none' });
      gsap.to('.agencyPulseNode', { scale: 1.24, opacity: 0.35, duration: 0.9, repeat: -1, yoyo: true, stagger: 0.12, ease: 'power2.inOut' });
      gsap.to('.agencyScanBeam', { x: '115vw', duration: 3.7, repeat: -1, ease: 'power1.inOut' });
    });
    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#ff7a18' } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VARPEC AUTOMATIONS',
    description: 'Automation agency for monthly lead generation, cold outreach, email systems, and business opportunity creation.',
    areaServed: 'Worldwide',
    knowsAbout: ['Automation agency', 'Lead generation automation', 'Cold email outreach', 'B2B prospecting']
  };

  return (
    <main className="agencyPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollProgress />
      <CursorGlow />
      <div className="agencyScanBeam" />
      <nav className="agencyNav">
        <a className="agencyBrand" href="#top"><em>VARPEC</em><i>AUTOMATIONS</i></a>
        <div className="agencyNavLinks"><a href="#system">System</a><a href="#process">Process</a><a href="#plans">Plans</a><a href="#contact">Order</a></div>
        <a className="agencyNavCta" href="#plans">View Plans</a>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="tw-ml-2 md:tw-hidden tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg tw-border tw-border-white/10 tw-bg-white/5 tw-text-white tw-backdrop-blur-md hover:tw-bg-white/10"
        >
          <Menu size={20} />
        </button>
      </nav>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} side="right">
        <div className="tw-mt-2 tw-flex tw-items-baseline tw-gap-2">
          <span className="tw-text-2xl tw-font-black tw-tracking-widest tw-text-white">VARPEC</span>
          <span className="tw-text-[10px] tw-tracking-[0.32em] tw-text-white/40 tw-border-l tw-border-white/15 tw-pl-2">AUTOMATIONS</span>
        </div>
        <nav className="tw-mt-10 tw-flex tw-flex-col tw-gap-1">
          {[['#system', 'System'], ['#process', 'Process'], ['#plans', 'Plans'], ['#faq', 'FAQ'], ['#contact', 'Order']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="tw-group tw-flex tw-items-center tw-justify-between tw-rounded-lg tw-px-3 tw-py-3 tw-text-base tw-font-semibold tw-text-white/80 tw-transition hover:tw-bg-white/5 hover:tw-text-white">
              <span>{label}</span>
              <ArrowRight size={16} className="tw-text-[#ff8a18] tw-opacity-0 -tw-translate-x-2 tw-transition group-hover:tw-opacity-100 group-hover:tw-translate-x-0" />
            </a>
          ))}
        </nav>
        <div className="tw-mt-8 tw-flex tw-flex-col tw-gap-3">
          <a href="https://wa.me/447735390520" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="agencyPrimaryBtn tw-w-full tw-justify-center">Reserve Your Slot <ArrowRight size={16} /></a>
          <button type="button" onClick={() => { setMenuOpen(false); setLeadOpen(true); }} className="agencySecondaryBtn tw-w-full tw-justify-center">Free Playbook</button>
        </div>
        <p className="tw-mt-10 tw-text-xs tw-text-white/40 tw-leading-relaxed">Premium B2B automation agency. AI email, WhatsApp, and phone outreach for serious growth teams.</p>
      </Sheet>

      <Dialog open={leadOpen} onClose={() => setLeadOpen(false)}>
        <div className="tw-mb-1 tw-text-[10px] tw-font-semibold tw-tracking-[0.32em] tw-text-[#ff8a18]">FREE PLAYBOOK</div>
        <h3 className="tw-text-2xl tw-font-black tw-leading-tight tw-text-white">Get the VARPEC outbound playbook.</h3>
        <p className="tw-mt-2 tw-text-sm tw-text-white/65">A 12-page breakdown of the exact stack, sequences, and triggers we run for B2B growth teams.</p>
        <form onSubmit={submitLead} className="tw-mt-5 tw-flex tw-flex-col tw-gap-2">
          <input
            type="email"
            required
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            placeholder="founder@yourcompany.com"
            className="tw-w-full tw-rounded-lg tw-border tw-border-white/10 tw-bg-white/5 tw-px-4 tw-py-3 tw-text-sm tw-text-white tw-placeholder-white/35 tw-outline-none tw-transition focus:tw-border-[#ff7a18] focus:tw-bg-white/[0.07]"
          />
          <button type="submit" disabled={leadLoading} className="agencyPrimaryBtn tw-w-full tw-justify-center disabled:tw-opacity-60">
            {leadLoading ? 'Sending…' : (<>Send me the playbook <ArrowRight size={16} /></>)}
          </button>
          <p className="tw-mt-1 tw-text-[11px] tw-text-white/40 tw-text-center">No spam. One email, then nothing unless you reply.</p>
        </form>
      </Dialog>

      <section id="top" className="agencyHero">
        <Spotlight className="-tw-top-40 tw-left-0 md:-tw-top-20 md:tw-left-60" fill="#ff7a18" />
        <div className="agencyHeroNoise" />
        <div className="agencyHeroGlow" />
        <motion.div className="agencyHeroLeft" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="agencyEyebrow"><Flame size={16} /> Limited monthly onboarding</div>
          <h1>The <em>automated lead machine</em> your competitors hope you <em>never install.</em></h1>
          <p>Targeted buyers found, contacted, and qualified — every single day.</p>
          <div className="agencyHeroActions"><a className="agencyPrimaryBtn" href="#plans">Claim a Growth Slot <ArrowRight size={18} /></a><a className="agencySecondaryBtn" href="#system">See the System <ChevronRight size={18} /></a></div>
          <div className="agencyTrustRow"><span><ShieldCheck size={14} /> Targeted buyers</span><span><Orbit size={14} /> Sheet dashboard</span><span><TrendingUp size={14} /> 5,000+ monthly contacts</span></div>
        </motion.div>
        <motion.div className="agencyHeroVisual" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <React.Suspense fallback={<div className="agencySceneFallback"><div /></div>}>
            <HeroScene3D />
          </React.Suspense>
        </motion.div>
      </section>

      <section className="agencyTicker"><div className="agencyTickerTrack">{[...signals, ...signals].map((item, index) => <span key={`${item}-${index}`}><Zap size={15} />{item}</span>)}</div></section>

      <section className="agencyDashboardSection">
        <div className="agencyDashboardVisual">
          <div className="agencyDataRail"><b>LEADS</b><b>STATUS</b><b>OUTREACH</b></div>
          <img src={laptopFull} alt="VARPEC Google Sheet dashboard showing targeted buyer lead contacts" />
          <div className="agencyDataLens"><strong>Buyer OS</strong><span>Daily prospect flow, structured for action.</span></div>
          <div className="agencyDashboardAura" />
        </div>
        <motion.div className="agencyDashboardCopy" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>Google Sheet command center</p>
          <h2>Every targeted buyer lands in a clean dashboard your team can act on.</h2>
          <span>Names, phone numbers, emails, categories, lead status, outreach notes, and campaign visibility stay organized in one place. No messy lists. No lost prospects. Just a daily buyer flow you can work from.</span>
          <div className="agencyShowcaseBadges"><b>50-145 daily contacts</b><b>Lead status tracking</b><b>Team-ready dashboard</b></div>
        </motion.div>
      </section>

      <section className="agencyEmailSection">
        <div className="agencyEmailWordmark" aria-hidden="true">OUTREACH</div>
        <motion.div className="agencyEmailCopy" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>// AI email delivery proof</p>
          <h2>Outreach that looks active, controlled, and already moving.</h2>
          <span>Email outreach should not feel invisible. This view turns delivery into proof — sent messages, clean movement, and a campaign engine that looks alive before the first interested reply arrives.</span>
        </motion.div>
        <div className="agencyEmailStats">
          <div><strong>01</strong><b>Delivered Emails</b><span>Live send queue with verified inbox placement.</span></div>
          <div><strong>02</strong><b>Personalised Outreach</b><span>Tailored messaging written for each buyer profile.</span></div>
          <div><strong>03</strong><b>Interested Lead Alerts</b><span>Instant signals when a buyer replies or shows intent.</span></div>
        </div>
        <div className="agencyEmailVisual">
          <img src={laptopHalf} alt="VARPEC delivered email outreach list preview" />
        </div>
      </section>

      <section id="system" className="agencySection">
        <motion.div className="agencySectionHead" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p>How it works</p><h2>Targeted buyers found, contacted, and qualified every day.</h2><span>Depending on your plan, we either deliver contacts to your dashboard, send outreach on your behalf, or run a fully automated campaign across email, WhatsApp, and phone calls.</span>
        </motion.div>
        <div className="agencyFeatureGrid">{services.map(([Icon, title, text]) => <motion.article className="agencyFeatureCard agencyPremiumCard" key={title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}><div className="agencyIconBox"><Icon /></div><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
      </section>

      <section className="agencyOpportunityWall">
        <div className="agencyWallCopy"><p>Hidden opportunity gap</p><h2>Most businesses are not losing because their offer is bad. They are losing because nobody sees it often enough.</h2></div>
        <div className="agencyWallGrid">
          <motion.div className="agencyWallCard agencyHot" whileHover={{ y: -8, scale: 1.02 }}><b>Manual outreach</b><span>Slow lists, forgotten follow-ups, inconsistent action.</span></motion.div>
          <motion.div className="agencyWallCard" whileHover={{ y: -8, scale: 1.02 }}><b>Automation advantage</b><span>Daily movement, cleaner targeting, stronger repeatability.</span></motion.div>
          <motion.div className="agencyWallCard" whileHover={{ y: -8, scale: 1.02 }}><b>Buyer psychology</b><span>Familiarity creates trust. Repetition creates replies.</span></motion.div>
          <motion.div className="agencyWallCard agencyHot" whileHover={{ y: -8, scale: 1.02 }}><b>Market timing</b><span>The first agency in the inbox usually frames the opportunity.</span></motion.div>
        </div>
      </section>

      <section id="process" className="agencySection">
        <div className="agencySectionHead"><p>The VARPEC growth sequence</p><h2>A simple system your buyers instantly understand.</h2></div>
        <div className="agencyProcessGrid">{process.map(([step, title, text]) => <motion.article className="agencyProcessCard" key={step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><strong>{step}</strong><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
      </section>

      <section className="agencyScarcityBand"><div><p>Scarcity without begging</p><h2>We only want clients who are ready to move. Slow decision makers leave the market open for faster competitors.</h2></div><a className="agencyPrimaryBtn" href="#contact">Ask for onboarding availability <ArrowRight size={18} /></a></section>

      <section id="plans" className="agencySection">
        <div className="agencySectionHead">
          <div className="tw-flex tw-justify-center tw-mb-3"><Badge><Flame size={11} /> Limited monthly slots</Badge></div>
          <p>Automated lead generation plans</p>
          <h2>Choose the plan that matches how you want to grow.</h2>
          <span>Each plan gives you targeted buyer contacts, a clean Google Sheet dashboard, and the automation level that matches your growth stage.</span>
          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-2 tw-mt-5">
            <Badge variant="outline"><ShieldCheck size={11} /> Cancel anytime</Badge>
            <Badge variant="outline"><Zap size={11} /> 24h onboarding</Badge>
            <Badge variant="success"><Check size={11} /> 4.9/5 rated</Badge>
          </div>
        </div>
        <div className="agencyPricingGrid">{plans.map(([name, price, label, stats, description, features, featured]) => <motion.article className={`agencyPriceCard ${featured ? 'agencyFeatured' : ''}`} key={name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><div className="agencyPlanTop"><span>{label}</span><h3>{name}</h3><strong>{price}</strong><p className="agencyPlanDescription">{description}</p></div><div className="agencyPlanStats">{stats.map((item) => <b key={item}>{item}</b>)}</div><ul>{features.map((item) => <li key={item}><Check size={18} />{item}<Tooltip content="Included on every plan day one" side="top"><span className="tw-ml-1 tw-inline-flex tw-cursor-help tw-text-white/30 hover:tw-text-[#ff8a18] tw-transition"><Info size={12} /></span></Tooltip></li>)}</ul><a className={featured ? 'agencyPrimaryBtn agencyFull' : 'agencySecondaryBtn agencyFull'} onClick={reserveToast} href={`https://wa.me/447735390520?text=${encodeURIComponent(`Hi VARPEC, I'd like to start the ${name} plan.`)}`} target="_blank" rel="noopener noreferrer">Reserve {name}</a></motion.article>)}</div>
      </section>

      <section className="agencyPayments"><h2>Payment routes for fast buyers</h2><div>{payments.map(([Icon, label]) => <span key={label}><Icon />{label}</span>)}</div></section>

      <section className="agencySection agencyProof"><div className="agencyProofCard agencyPremiumCard"><p>Trusted positioning</p><h2>Make cold outreach feel like a strategic asset, not spam.</h2><span>Clients want confidence. They want to believe the system is controlled, premium, and built by people who understand attention. VARPEC now speaks like a high-level automation partner, not a small vendor.</span></div><div className="agencyProofStats"><div><b>01</b><span>Clear market targeting</span></div><div><b>02</b><span>Automated email movement</span></div><div><b>03</b><span>Call-ready opportunity flow</span></div></div></section>

      <section className="agencyBookSection">
        <div className="agencyBookCard">
          <p className="agencyBookEyebrow">Discovery call</p>
          <h2>Book a 15-minute call with the founder.</h2>
          <span>Walk through your market, see if VARPEC fits, and reserve a slot before onboarding closes.</span>
          <button className="agencyPrimaryBtn" data-cal-link="varpec/discovery" data-cal-namespace="discovery" data-cal-config='{"layout":"month_view"}'>Book a Discovery Call <ArrowRight size={18} /></button>
        </div>
      </section>

      <section id="faq" className="agencySection agencyFaq"><div className="agencySectionHead"><p>Buyer confidence</p><h2>Questions that remove friction.</h2></div><div className="tw-mx-auto tw-w-full tw-max-w-3xl"><Accordion items={faqs} /></div></section>

      <section id="contact" className="agencyFinalCta"><p>Order window</p><h2>If you want more interested business conversations, this is the moment to build the machine.</h2><a className="agencyPrimaryBtn" onClick={reserveToast} href="https://wa.me/447735390520?text=Hi%20VARPEC%2C%20I%27d%20like%20to%20reserve%20a%20growth%20slot." target="_blank" rel="noopener noreferrer">Reserve Your Slot <ArrowRight size={18} /></a></section>

      <footer className="agencyFooter">
        <img src={varpecLogo} alt="VARPEC AUTOMATIONS" className="agencyFooterLogo" />
        <span>Automation agency for lead generation, cold outreach systems, and monthly opportunity creation.</span>
        <div className="agencyFooterMeta">
          <span>&copy; {new Date().getFullYear()} VARPEC AUTOMATIONS</span>
          <a href="https://wa.me/447735390520" target="_blank" rel="noopener noreferrer">Contact</a>
          <a href="#plans">Plans</a>
          <a href="#faq">FAQ</a>
        </div>
      </footer>
    </main>
  );
}
