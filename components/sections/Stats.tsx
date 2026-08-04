'use client';
import { FadeIn, FadeInStaggerItem } from '../ui/FadeIn';

const stats = [
  { num: '8+', label: 'Years', sub: 'Operating since 2017' },
  { num: '11,000+', label: 'Members', sub: 'And growing daily' },
  { num: '7', label: 'Branches', sub: 'Rajshahi & Dhaka' },
  { num: '30+', label: 'Coaches', sub: 'Certified trainers' },
];

const marqueeItems = [
  'WEIGHT TRAINING', 'CARDIO', 'HIIT', 'ZUMBA', 'PERSONAL COACHING',
  'NUTRITION PLANS', 'BODY TRANSFORMATION', 'GROUP CLASSES', 'STRENGTH',
];

export default function Stats() {
  return (
    <>
      {/* ── Marquee Ticker ─────────────────────── */}
      <div
        className="overflow-hidden py-4"
        style={{ background: 'var(--green)', borderTop: 'none' }}
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-display font-black text-base uppercase whitespace-nowrap"
              style={{ color: '#000', padding: '0 2rem', letterSpacing: '0.05em' }}
            >
              {item}
              <span style={{ marginLeft: '2rem', opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats Grid ─────────────────────────── */}
      <div
        className="relative"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <FadeIn staggerChildren={0.15}>
            <div
              className="grid grid-cols-2 lg:grid-cols-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
            {stats.map((stat, i) => (
              <FadeInStaggerItem
                key={stat.label}
                className="py-10 md:py-14 px-6 md:px-8 flex flex-col"
                style={{
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <p
                  className="font-display font-black"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--green)', lineHeight: 1 }}
                >
                  {stat.num}
                </p>
                <p
                  className="font-display font-black text-lg md:text-2xl uppercase mt-1"
                  style={{ color: 'var(--text)' }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: 'var(--muted)' }}
                >
                  {stat.sub}
                </p>
              </FadeInStaggerItem>
            ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
