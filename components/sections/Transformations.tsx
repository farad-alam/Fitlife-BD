'use client';
import Image from 'next/image';

const transformations = [
  {
    name: 'Rahul M.',
    goal: 'Lost 18kg in 4 months',
    duration: '4 months',
    quote: 'Fitlife completely changed my approach. The coaches pushed me beyond what I thought possible.',
    img: '/images/transformation-1.png',
  },
  {
    name: 'Sarah T.',
    goal: 'Gained 5kg lean muscle',
    duration: '6 months',
    quote: 'The trainers are incredibly supportive. I&apos;ve never felt stronger or more confident.',
    img: '/images/transformation-1.png',
  },
  {
    name: 'Amin K.',
    goal: 'Complete body recomposition',
    duration: '5 months',
    quote: 'The combination of nutrition coaching and training made all the difference for me.',
    img: '/images/transformation-1.png',
  },
];

export default function Transformations() {
  return (
    <section
      id="transformations"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--black)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="label-tag mb-4">Real Results</div>
            <h2
              className="text-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
            >
              REAL STORIES.<br />
              <span style={{ color: 'var(--green)' }}>VISIBLE</span><br />
              PROGRESS.
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: 'rgba(240,240,240,0.5)' }}
          >
            Every member has a unique journey. These are just a few of the thousands we&apos;ve helped transform.
          </p>
        </div>

        {/* Transformation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {transformations.map((t, i) => (
            <div
              key={t.name}
              className="group relative overflow-hidden"
              style={{ background: 'var(--surface)' }}
            >
              {/* Image with before/after overlay */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={t.img}
                  alt={`${t.name} transformation`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'saturate(0.7)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%)',
                  }}
                />
                {/* Duration badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 font-display font-bold text-xs uppercase tracking-wider"
                  style={{ background: 'rgba(26,255,107,0.9)', color: '#000' }}
                >
                  {t.duration}
                </div>
                {/* Result text */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p
                    className="font-display font-black text-2xl uppercase"
                    style={{ color: 'var(--text)', lineHeight: 1.1 }}
                  >
                    {t.goal}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--green)' }}>
                    — {t.name}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="p-5">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mb-3">
                  <path d="M0 18V10.5C0 7 1.5 4 4.5 2L7 0l1.5 1.5L6 4c2 .5 3.5 2.5 3.5 5v9H0zM13.5 18V10.5C13.5 7 15 4 18 2L20.5 0 22 1.5 19.5 4C21.5 4.5 23 6.5 23 9.5v8.5h-9.5z" fill="rgba(26,255,107,0.4)"/>
                </svg>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.6)' }}>
                  {t.quote}
                </p>
              </div>

              {/* Number watermark */}
              <div
                className="absolute top-4 right-4 font-display font-black text-5xl pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.07)' }}
              >
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="relative overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'var(--surface)', border: '1px solid rgba(26,255,107,0.15)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 70% 50%, rgba(26,255,107,0.06) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10">
            <p className="label-tag mb-2">Your Turn</p>
            <h3
              className="font-display font-black uppercase"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
            >
              START YOUR TRANSFORMATION TODAY
            </h3>
          </div>
          <a
            href="https://wa.me/8801700000000"
            className="btn-primary relative z-10 flex-shrink-0 text-base px-8 py-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Trial
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
