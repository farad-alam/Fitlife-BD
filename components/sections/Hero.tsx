'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const headlines = ['TRAIN', 'TRANSFORM', 'DOMINATE'];
const bgImages = [
  '/images/hero-bg.png',
  '/images/hero_slider_2.png',
  '/images/hero_slider_3.png',
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const [bgIdx, setBgIdx] = useState(0);

  // Cycle headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % headlines.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Cycle background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', background: 'var(--black)' }}
    >
      {/* ── Background Image ──────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Fitlife Gym Interior ${i + 1}`}
            fill
            priority={i === 0}
            className="object-cover object-center transition-opacity duration-[1500ms] ease-in-out"
            style={{ 
              opacity: bgIdx === i ? 1 : 0,
              filter: 'brightness(0.45)',
              zIndex: bgIdx === i ? 1 : 0
            }}
          />
        ))}
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(8,8,8,0.85) 40%, rgba(8,8,8,0.2) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to top, var(--black) 0%, transparent 100%)',
          }}
        />
        {/* Green glow orb */}
        <div
          className="absolute orb-pulse"
          style={{
            top: '20%',
            right: '15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,255,107,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24"
        style={{ minHeight: '100svh', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Top tag */}
          <div className="label-tag mb-6 md:mb-8">
            Rajshahi & Dhaka, Bangladesh
          </div>

          {/* Animated headline */}
          <h1
            className="text-display mb-4"
            style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', color: 'var(--text)' }}
          >
            <span
              className="block transition-all duration-400"
              style={{
                color: 'var(--green)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              {headlines[idx]}
            </span>
            <span className="block" style={{ color: 'var(--text)', lineHeight: 0.85 }}>
              YOUR BODY
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mt-6 md:mt-8 max-w-lg text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(240,240,240,0.55)' }}
          >
            Bangladesh&apos;s premier fitness chain. 7 locations across Rajshahi & Dhaka.
            Elite equipment, certified coaches, real results since 2017.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 md:mt-10">
            <a href="#contact" className="btn-primary text-base md:text-lg px-8 py-4">
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#about" className="btn-outline text-base md:text-lg px-8 py-4">
              Our Story
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 md:gap-12 mt-12 md:mt-16"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}
          >
            {[
              { num: '7', label: 'Branches' },
              { num: '11K+', label: 'Members' },
              { num: '30+', label: 'Coaches' },
              { num: '2017', label: 'Founded' },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="font-display font-black"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--green)', lineHeight: 1 }}
                >
                  {s.num}
                </p>
                <p
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: 'rgba(240,240,240,0.4)', letterSpacing: '0.15em' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em] rotate-90 mb-2"
          style={{ color: 'rgba(240,240,240,0.3)' }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, var(--green), transparent)',
          }}
        />
      </div>

      {/* ── Floating WhatsApp ─────────────────────── */}
      <a
        href="https://wa.me/8801700000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
        style={{ background: '#25D366' }}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.057 23.57a.75.75 0 00.918.91l5.84-1.532A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.088-1.397l-.364-.217-3.77.99.998-3.662-.237-.376A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </section>
  );
}
