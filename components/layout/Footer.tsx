'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Services: [
    { label: 'Weight Training', href: '#services' },
    { label: 'Cardio Zone', href: '#services' },
    { label: 'Group Classes', href: '#services' },
    { label: 'Personal Training', href: '#services' },
    { label: 'Nutrition Coaching', href: '#services' },
  ],
  Company: [
    { label: 'Our Story', href: '#about' },
    { label: 'Our Team', href: '#trainers' },
    { label: 'Locations', href: '#branches' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Transformations', href: '#transformations' },
  ],
  Connect: [
    { label: 'WhatsApp Us', href: 'https://wa.me/8801632442096' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100047091586084' },
    { label: 'Instagram', href: 'https://www.instagram.com/fitlifegymnasium' },
    { label: 'YouTube', href: 'https://www.youtube.com/@abusufiantaj' },
    { label: 'FAQ', href: '#faq' },
  ],
};

// Decorative floating block positions (like the Digital Metal reference)
const floatingBlocks = [
  { top: '8%',  left: '5%',   w: '9vw',  h: '18%', opacity: 0.55 },
  { top: '4%',  left: '16%',  w: '7vw',  h: '28%', opacity: 0.4  },
  { top: '0%',  left: '26%',  w: '10vw', h: '38%', opacity: 0.5  },
  { top: '5%',  left: '38%',  w: '8vw',  h: '26%', opacity: 0.35 },
  { top: '10%', left: '48%',  w: '11vw', h: '22%', opacity: 0.6  },
  { top: '3%',  left: '61%',  w: '9vw',  h: '32%', opacity: 0.45 },
  { top: '8%',  left: '72%',  w: '8vw',  h: '20%', opacity: 0.5  },
  { top: '2%',  left: '82%',  w: '10vw', h: '30%', opacity: 0.38 },
  { top: '7%',  left: '92%',  w: '7vw',  h: '24%', opacity: 0.55 },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--black)' }}
    >
      {/* ── Atmospheric glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(26,255,107,0.09) 0%, rgba(26,255,107,0.03) 45%, transparent 75%)',
        }}
      />
      {/* Horizontal light streak like the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '44%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(26,255,107,0.18) 20%, rgba(26,255,107,0.5) 50%, rgba(26,255,107,0.18) 80%, transparent 100%)',
          boxShadow: '0 0 40px 8px rgba(26,255,107,0.12)',
        }}
      />

      {/* ── Floating decorative blocks ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {floatingBlocks.map((b, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: b.top,
              left: b.left,
              width: b.w,
              height: b.h,
              opacity: b.opacity,
              background:
                'linear-gradient(180deg, rgba(26,255,107,0.06) 0%, rgba(26,255,107,0.02) 60%, transparent 100%)',
              border: '1px solid rgba(26,255,107,0.12)',
              backdropFilter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* ── Top content row ── */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10"
        style={{ paddingTop: '5rem' }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 pb-16">
          {/* Left: tagline + hours */}
          <div className="flex flex-col gap-10 max-w-xs">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.45)' }}>
              Bangladesh&apos;s premier fitness chain. 7 locations.
              11,000+ members. Transforming lives since 2017.
            </p>

            <div>
              <p
                className="font-display font-black text-xs uppercase tracking-[0.18em] mb-2"
                style={{ color: 'var(--green)' }}
              >
                Open Hours
              </p>
              <p className="text-xs uppercase tracking-widest leading-loose" style={{ color: 'rgba(240,240,240,0.3)' }}>
                Sat – Thu<br />7:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Right: nav links */}
          <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-20">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4
                  className="font-display font-black text-xs uppercase mb-7 tracking-[0.18em]"
                  style={{ color: 'rgba(240,240,240,0.6)' }}
                >
                  {group}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs tracking-wider transition-colors duration-200 hover:text-[var(--green)]"
                        style={{ color: 'rgba(240,240,240,0.35)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MASSIVE brand name ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 overflow-hidden" style={{ lineHeight: 0 }}>
        {/* Green glow behind the text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 100% at 50% 80%, rgba(26,255,107,0.07) 0%, transparent 70%)',
          }}
        />
        <h2
          className="font-display font-black uppercase text-center select-none w-full flex justify-between"
          style={{
            fontSize: 'clamp(4rem, 17.5vw, 16rem)',
            lineHeight: 0.82,
            letterSpacing: '0.04em',
            /* Split-color using a background clip trick */
            background:
              'linear-gradient(180deg, #f0f0f0 0%, rgba(240,240,240,0.55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            /* Layered shadow for depth */
            filter:
              'drop-shadow(0 0 80px rgba(26,255,107,0.08))',
            paddingBottom: '0.05em',
            paddingLeft: '1vw',
            paddingRight: '1vw',
          }}
        >
          <span>F</span>
          <span>I</span>
          <span>T</span>
          <span>L</span>
          <span>I</span>
          <span>F</span>
          <span>E</span>
          <span> </span>
          <span
            style={{
              background: 'linear-gradient(180deg, var(--green) 0%, var(--green-dim) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(26,255,107,0.55))',
            }}
          >
            B
          </span>
          <span
            style={{
              background: 'linear-gradient(180deg, var(--green) 0%, var(--green-dim) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(26,255,107,0.55))',
            }}
          >
            D
          </span>
        </h2>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'rgba(240,240,240,0.28)',
        }}
      >
        <span>© {new Date().getFullYear()} Fitlife Gym Bangladesh. All rights reserved.</span>

        <div className="flex items-center">
          <span style={{ color: 'rgba(240,240,240,0.6)', letterSpacing: '0.1em' }}>
            Design & Develop by{' '}
            <a
              href="https://www.motionbite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 border-b border-[rgba(26,255,107,0.3)] pb-1 hover:border-[var(--green)] hover:text-[var(--green)]"
              style={{ color: 'var(--green)', textShadow: '0 0 20px rgba(26,255,107,0.4)' }}
            >
              MotionBite
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
