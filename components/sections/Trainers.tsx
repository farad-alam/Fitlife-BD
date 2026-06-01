'use client';
import Image from 'next/image';

const trainers = [
  {
    name: 'Abu Sufian Taj',
    title: 'Founder & Head Coach',
    specialty: 'Strength & Conditioning',
    exp: '10+ yrs',
    img: '/images/trainer-1.png',
    certified: ['ISSA', 'IBA MBA'],
  },
  {
    name: 'Trainer 2',
    title: 'Senior Coach',
    specialty: 'Bodybuilding',
    exp: '7+ yrs',
    img: '/images/athlete-hero.png',
    certified: ['NSCA', 'CPT'],
  },
  {
    name: 'Trainer 3',
    title: 'Group Fitness Coach',
    specialty: 'Zumba & HIIT',
    exp: '5+ yrs',
    img: '/images/trainer-1.png',
    certified: ['ACE', 'Zumba Pro'],
  },
  {
    name: 'Trainer 4',
    title: 'Nutrition Specialist',
    specialty: 'Diet & Wellness',
    exp: '6+ yrs',
    img: '/images/athlete-hero.png',
    certified: ['ISSN', 'CPT'],
  },
];

export default function Trainers() {
  return (
    <section
      id="trainers"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--black)' }}
    >
      {/* Large watermark text */}
      <div
        className="absolute bottom-0 left-0 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 18rem)',
          color: 'rgba(255,255,255,0.02)',
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
        }}
      >
        COACHES
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="label-tag mb-4">The Team</div>
            <h2
              className="text-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
            >
              MEET YOUR<br />
              <span style={{ color: 'var(--green)' }}>COACHES</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline self-start md:self-end">
            Train with us →
          </a>
        </div>

        {/* Trainer cards horizontal scroll on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t, i) => (
            <div
              key={t.name}
              className="group relative overflow-hidden"
              style={{ background: 'var(--surface)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'saturate(0.7) contrast(1.1)' }}
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 50%, transparent 100%)',
                  }}
                />
                {/* Index number */}
                <span
                  className="absolute top-4 right-4 font-display font-black text-4xl"
                  style={{ color: 'rgba(26,255,107,0.3)' }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex gap-2 mb-2 flex-wrap">
                  {t.certified.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
                      style={{
                        border: '1px solid rgba(26,255,107,0.3)',
                        color: 'var(--green)',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-display font-bold text-xl uppercase"
                  style={{ color: 'var(--text)' }}
                >
                  {t.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--green)' }}>
                  {t.title}
                </p>
                <div
                  className="flex items-center justify-between mt-3 pt-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    {t.specialty}
                  </span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                    {t.exp}
                  </span>
                </div>
              </div>

              {/* Green bottom line hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full w-0"
                style={{ background: 'var(--green)' }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <p
          className="text-center mt-10 text-sm"
          style={{ color: 'var(--muted)' }}
        >
          And 26+ more certified coaches across all our branches.
        </p>
      </div>
    </section>
  );
}
