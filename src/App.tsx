import {
  BarChart3,
  Activity,
  Thermometer,
  Truck,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  Menu,
  X,
  Users,
  CheckCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { track } from './lib/analytics';
import { ChatWidget } from './components/chat/ChatWidget';

const isChatEnabledForThisVisitor = () => {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  const chat = params.get('chat') === '1';
  const pin = (params.get('pin') || '').trim();

  const expected = (import.meta.env.VITE_CHAT_PIN || '').trim();

  // Require explicit opt-in + correct pin
  return Boolean(chat && expected && pin && pin === expected);
};

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

const API_URL = import.meta.env.VITE_API_URL ?? '';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Platform', href: '#platform' },
  { label: 'Save time', href: '#today' },
  { label: 'Team', href: '#team' },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Catch consumption problems early',
    desc: 'Identify pens falling behind feed delivery before performance drops.',
  },
  {
    icon: Activity,
    title: 'Track health & treatments',
    desc: 'Monitor hospital headcount, treatment activity, and pen-level health signals.',
  },
  {
    icon: ClipboardList,
    title: 'Monitor death loss trends',
    desc: 'Track mortality across yards and spot patterns over time.',
  },
  {
    icon: Thermometer,
    title: 'Weather where it matters',
    desc: 'See conditions alongside operational signals that shift cattle performance.',
  },
  {
    icon: Truck,
    title: 'Loadmaster scale integration',
    desc: 'Check in feed deliveries, record weigh-outs, and track tonnage from a dedicated kiosk interface.',
  },
  {
    icon: ShieldCheck,
    title: "Management reporting that's usable",
    desc: "Clear summaries that don't require spreadsheets to interpret.",
  },
];

const PLATFORM_POINTS = [
  'Daily headcounts and KPIs across all yards',
  'Pen-level detail for treatments, intake, and performance',
  'Multi-yard support with location-based filtering',
  'Works on phones, tablets, and desktops',
  'Role-based access for managers and riders',
  'Secure, cloud-hosted infrastructure',
];

const WHAT_YOU_GET_TODAY = [
  {
    title: 'AMS dashboard on mobile',
    desc: 'Check headcounts, treatments, and feed events from your phone with daily updates.',
    icon: Activity,
  },
  {
    title: 'Pen & lot analytics',
    desc: 'Pen-level detail for intake and performance, with yard-wide rollups for quick checks.',
    icon: BarChart3,
  },
  {
    title: 'Invoice reconciliation',
    desc: 'Review charges against what hit the yard so you can catch discrepancies early.',
    icon: ClipboardList,
  },
];

const TEAM = [
  {
    name: 'Andrew',
    role: 'CEO',
    desc: 'Leadership & strategy, focused on practical day-to-day feedlot workflows.',
    linkedin: 'https://www.linkedin.com/in/andrew-uden-15182b9b/',
    photoSrc: '/team/andrew_headshot.webp',
  },
  {
    name: 'Jeff',
    role: 'CTO',
    desc: 'Product & engineering, building reliable systems for daily reporting and operations.',
    linkedin: 'https://www.linkedin.com/in/jsmitchel/',
    photoSrc: '/team/jeff_headshot.webp',
  },
  {
    name: 'Garrett',
    role: 'Data Science & AI',
    desc: 'Analytics and models that turn yard data into clear alerts, trends, and reporting.',
    linkedin: 'https://www.linkedin.com/in/garrett-ducharme-28852592/',
    photoSrc: '/team/garrett_headshot.webp',
  },
  {
    name: 'Amanda',
    role: 'Engineering & Web Systems',
    desc: 'Full-stack development and infrastructure, delivering robust and reliable platforms.',
    linkedin: 'https://www.linkedin.com/in/amandatreutler/',
    photoSrc: '/team/amanda_headshot.webp',
  },
];

/* ────────────────────────────────────────────────────────────
   Components
   ──────────────────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        <a href="#" className="block">
          <img src="/brand-logo.svg" alt="Cattlytx" className="h-14 w-auto md:h-16" />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-2 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => track('marketing_cta_click', { source: 'nav' })}
            className="rounded-lg bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-hover)]"
          >
            Request a Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-[var(--text-secondary)] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 pb-6 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => { setOpen(false); track('marketing_cta_click', { source: 'nav_mobile' }); }}
            className="mt-2 block rounded-lg bg-[var(--brand)] px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-[var(--brand-hover)]"
          >
            Request a Demo
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-24 lg:pb-36">
      {/* Subtle gradient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--brand)] opacity-[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Every pen. Every day. One place.
        </h1>
        <p className="mt-4 flex flex-col items-center justify-center gap-y-2 text-sm font-semibold uppercase tracking-widest text-[var(--brand)] sm:flex-row sm:gap-x-3 sm:gap-y-0 md:text-base">
          <span className="whitespace-nowrap">PEN-LEVEL</span>
          <span className="mx-2 hidden text-xl leading-none sm:inline md:text-2xl">|</span>
          <span className="whitespace-nowrap">TREATMENTS &amp; HEADCOUNTS</span>
          <span className="mx-2 hidden text-xl leading-none sm:inline md:text-2xl">|</span>
          <span className="whitespace-nowrap">FEED EVENTS</span>
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Daily updates on headcounts, treatments, and feed events. Works on phones, tablets, and desktops so you can check the yard anywhere. No report requests, no waiting.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            onClick={() => track('marketing_cta_click', { source: 'hero' })}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--brand-hover)]"
          >
            Request a Demo
            <ArrowRight size={18} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-8 py-3.5 text-base font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            See Features
          </a>
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          30-minute walkthrough. No commitment.
        </p>
      </div>
    </section>
  );
}

function Screenshot() {
  return (
    <section className="pb-24 md:pb-14 lg:pb-36">
      <div className="mx-auto max-w-7xl px-12 sm:px-6">
        <div className="overflow-hidden rounded-xl border-4 border-[var(--brand)]/45 bg-[var(--bg-surface)] shadow-2xl shadow-black/40">
          {/* Browser chrome mockup */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-[#ef4444]/60" />
            <div className="h-3 w-3 rounded-full bg-[#eab308]/60" />
            <div className="h-3 w-3 rounded-full bg-[#22c55e]/60" />
            <div className="ml-4 flex-1 rounded-md bg-[var(--bg)] px-4 py-1 text-xs text-[var(--text-muted)]">
              app.cattlytx.com
            </div>
          </div>
          <div className="aspect-[9/16] bg-[var(--bg-elevated)] sm:aspect-[4/3]">
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet="/screenshots/mobile_dashboard.png"
              />
              <img
                src="/screenshots/dashboard.webp"
                alt="Cattlytx feedlot dashboard showing daily headcounts, consumption alerts, and weather conditions"
                className="h-full w-full object-contain sm:object-cover sm:object-[75%_0%]"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 md:py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Core tools for daily feedlot operations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
            Daily tools for intake, treatments, death loss, weather, and pen-level performance
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="h-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-hover)] sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10">
                  <f.icon size={20} className="text-[var(--brand)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="scroll-mt-20 py-12 md:py-14 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Left — text */}
          <div className="mx-auto w-full max-w-2xl lg:mx-0">
            <h2 className="text-center text-3xl font-bold md:text-4xl lg:text-left">
              Built for feedlot operations
            </h2>
            <ul className="mx-auto mt-6 flex max-w-xl flex-col items-start space-y-3 lg:block lg:max-w-none lg:columns-2 lg:gap-10">
              {PLATFORM_POINTS.map((point) => (
                <li
                  key={point}
                  className="break-inside-avoid flex w-full items-start justify-start gap-3 text-[var(--text-secondary)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span className="text-left">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — second screenshot placeholder */}
          <div className="overflow-hidden rounded-xl border-4 border-[var(--brand)]/45 bg-[var(--bg-surface)] p-0 sm:p-4">
            <div className="aspect-[2/3] overflow-hidden rounded-none bg-[var(--bg-elevated)] sm:aspect-[4/3] sm:rounded-lg">
              <picture className="block h-full w-full">
                <source
                  media="(max-width: 639px)"
                  srcSet="/screenshots/pens_mobile.png"
                />
                <img
                  src="/screenshots/pens_screenshot.webp"
                  alt="Cattlytx pens view with pen-level treatment, intake, and performance details"
                  className="block h-full w-full object-cover object-[50%_0%] sm:object-cover sm:object-center"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYouGetToday() {
  return (
    <section id="today" className="scroll-mt-20 border-t-0 border-[var(--border)] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Where we save you time</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_YOU_GET_TODAY.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-4 transition-colors hover:border-[var(--border-hover)]"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand)]/10">
                  <item.icon size={20} className="text-[var(--brand)]" />
                </div>
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="scroll-mt-20 pt-20 pb-16 md:pt-20 md:pb-14 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Meet the Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
            Experienced leaders with agriculture and software experience
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <a
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('marketing_linkedin_click', { name: member.name })}
              className="group block rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 text-center transition-colors hover:border-[var(--border-hover)]"
              aria-label={`${member.name} on LinkedIn`}
            >
              {/* Avatar placeholder */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                {member.photoSrc ? (
                  <img
                    src={member.photoSrc}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Users
                    size={28}
                    className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]"
                  />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-sm font-medium text-[var(--brand)]">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {member.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    try {
      const res = await fetch(`${API_URL}/api/v1/demo_requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Request failed');
      track('marketing_demo_request');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t-0 border-[var(--border)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">See how Cattlytx fits your yard</h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Request a demo and we&apos;ll walk through your current workflow and show where
            Cattlytx improves visibility and control
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            30-minute walkthrough. No commitment.
          </p>

          {status === 'success' ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/8 px-6 py-8">
              <CheckCircle size={36} className="text-[#4ADE80]" />
              <p className="text-lg font-semibold text-[var(--text-primary)]">You&apos;re on the list.</p>
              <p className="text-sm text-[var(--text-secondary)]">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <form className="mt-8 flex flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  disabled={status === 'submitting'}
                  className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-hover)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Request a Demo'}
                  {status !== 'submitting' && <ArrowRight size={18} />}
                </button>
              </form>

              {status === 'error' && (
                <p className="mt-3 text-sm text-red-400">
                  Something went wrong — please email us directly at{' '}
                  <a href="mailto:contact@cattlytx.com" className="underline">
                    contact@cattlytx.com
                  </a>
                </p>
              )}

              <p className="mt-4 text-xs text-[var(--text-muted)]">
                No spam, ever.
              </p>
            </>
          )}

          <p className="mt-6 text-sm text-[var(--text-muted)]">
            Or email us directly at{' '}
            <a
              href="mailto:contact@cattlytx.com"
              onClick={() => track('marketing_contact_click', { source: 'contact_section' })}
              className="text-[var(--brand)] hover:underline"
            >
              contact@cattlytx.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-[var(--text-muted)] sm:flex-row sm:justify-between">
        <div>
          <span className="font-semibold text-[var(--text-secondary)]">
            Cattlytx
          </span>
          <span className="ml-2">Livestock operations software</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:contact@cattlytx.com"
            onClick={() => track('marketing_contact_click', { source: 'footer' })}
            className="transition-colors hover:text-[var(--text-secondary)]"
          >
            contact@cattlytx.com
          </a>
          <a
            href="https://app.cattlytx.com/privacy"
            className="transition-colors hover:text-[var(--text-secondary)]"
          >
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-6xl px-6 text-center text-xs text-[var(--text-muted)] sm:text-left">
        &copy; {new Date().getFullYear()} Cattlytx. All rights reserved.
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────
   App
   ──────────────────────────────────────────────────────────── */

export default function App() {
  useEffect(() => {
    track('marketing_page_view', { page: 'home' });
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Screenshot />
        <Platform />
        <WhatYouGetToday />
        <Team />
        <Contact />
      </main>
      <Footer />
      {isChatEnabledForThisVisitor() ? <ChatWidget /> : null}
    </>
  );
}
