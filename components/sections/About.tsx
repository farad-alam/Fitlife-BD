'use client';
import Image from 'next/image';
import { FadeIn, FadeInStaggerItem } from '../ui/FadeIn';

export default function About() {
  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--black)' }}
    >
      {/* Subtle background text */}
      <div
        className="absolute top-0 right-0 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 20vw, 22rem)',
          color: 'rgba(26,255,107,0.025)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}
      >
        STORY
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <FadeIn direction="right">
            <div className="relative">
              {/* Main image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4/5', maxWidth: '520px' }}
              >
                <Image
                  src="/images/gym-interior.png"
                  alt="Fitlife Gym Interior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  style={{ filter: 'saturate(0.8)' }}
                />
                {/* Green accent border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: 'var(--green)' }}
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute bottom-[-2rem] right-[-1rem] md:right-[-3rem] p-6"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(26,255,107,0.2)',
                  minWidth: '180px',
                }}
              >
                <p
                  className="font-display font-black"
                  style={{ fontSize: '3.5rem', color: 'var(--green)', lineHeight: 1 }}
                >
                  8+
                </p>
                <p
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: 'rgba(240,240,240,0.5)' }}
                >
                  Years of Excellence
                </p>
              </div>

              {/* Green accent line */}
              <div
                className="absolute top-8 left-[-1.5rem] w-1 h-32"
                style={{ background: 'linear-gradient(to bottom, var(--green), transparent)' }}
              />
            </div>
          </FadeIn>

          {/* Text column */}
          <FadeIn direction="left">
            <div>
              <div className="label-tag mb-6">Our Story</div>

              <h2
                className="text-display mb-6"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--text)' }}
              >
                MORE THAN A<br />
                <span style={{ color: 'var(--green)' }}>GYM.</span> A<br />
                COMMUNITY.
              </h2>

              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: 'rgba(240,240,240,0.6)' }}
              >
                <p>
                  Founded in 2017 by <strong style={{ color: 'var(--text)' }}>Abu Sufian Taj (A.S. Taj)</strong> — an MBA graduate from IBA, Rajshahi University —
                  Fitlife was born from a simple belief: that every person in Bangladesh deserves access to world-class fitness.
                </p>
                <p>
                  What started as a single gym in Rajshahi has grown into a network of 7 branches spanning Rajshahi and Dhaka,
                  serving 1,000+ members with 30+ certified coaches and state-of-the-art equipment.
                </p>
                <p>
                  We don&apos;t just build bodies — we transform lives, build discipline, and create lasting change.
                </p>
              </div>

              {/* 4 pillars */}
              <FadeIn staggerChildren={0.15} direction="none">
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {[
                    { label: 'Expert Coaches', desc: '30+ certified trainers' },
                    { label: 'Premium Equipment', desc: 'Olympic grade gear' },
                    { label: 'Real Results', desc: '1000+ transformations' },
                    { label: 'Community', desc: 'Supportive environment' },
                  ].map((p) => (
                    <FadeInStaggerItem key={p.label}>
                      <div className="p-4 card-dark h-full">
                        <div
                          className="w-8 h-[2px] mb-3"
                          style={{ background: 'var(--green)' }}
                        />
                        <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{p.label}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.desc}</p>
                      </div>
                    </FadeInStaggerItem>
                  ))}
                </div>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
