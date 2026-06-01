'use client';
import Image from 'next/image';
import { FadeIn, FadeInStaggerItem } from '../ui/FadeIn';

const services = [
  {
    id: '01',
    title: 'Weight Training',
    desc: 'Full free-weight & machine zone. Olympic bars, dumbbells up to 50kg, squat racks, bench press — everything you need for serious lifting.',
    image: '/images/workout-action.png',
  },
  {
    id: '02',
    title: 'Cardio Zone',
    desc: 'Premium treadmills, stationary bikes, rowing machines, and ellipticals. HIIT-ready with built-in programming.',
    image: '/images/gym-interior.png',
  },
  {
    id: '03',
    title: 'Group Classes',
    desc: 'High-energy HIIT, Zumba, Aerobics & more. Scheduled sessions led by certified instructors. Great for community and motivation.',
    image: '/images/workout-action.png',
  },
  {
    id: '04',
    title: 'Personal Training',
    desc: '1-on-1 sessions with your dedicated certified trainer. Custom programming, form correction, and accountability.',
    image: '/images/gym-interior.png',
  },
  {
    id: '05',
    title: 'Nutrition Coaching',
    desc: 'Custom meal plans tailored to your goal — fat loss, muscle gain, or body recomposition. Science-backed, locally adapted.',
    image: '/images/workout-action.png',
  },
  {
    id: '06',
    title: 'Body Transformation',
    desc: 'Full 12-week structured programs combining training and nutrition. Complete physique overhaul with measurable results.',
    image: '/images/gym-interior.png',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-pad relative"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="label-tag mb-4">What We Offer</div>
              <h2
                className="text-display"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
              >
                WORLD-CLASS<br />
                <span style={{ color: 'var(--green)' }}>TRAINING</span><br />
                PROGRAMS
              </h2>
            </div>
            <p
              className="max-w-xs text-sm leading-relaxed md:text-right"
              style={{ color: 'rgba(240,240,240,0.5)' }}
            >
              From beginner to advanced, every service is designed to move you closer to your goal.
            </p>
          </div>
        </FadeIn>

        {/* Accordion-style service list */}
        <FadeIn staggerChildren={0.1} direction="none">
          <div>
            {services.map((svc, i) => (
              <FadeInStaggerItem key={svc.id}>
                <ServiceRow svc={svc} last={i === services.length - 1} />
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ServiceRow({
  svc,
  last,
}: {
  svc: (typeof services)[0];
  last: boolean;
}) {
  return (
    <div
      className="group relative"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Hover background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'rgba(26,255,107,0.03)' }}
      />

      <div className="flex items-center justify-between py-6 md:py-8 gap-6 cursor-default">
        {/* Number */}
        <span
          className="font-display font-black text-lg md:text-xl flex-shrink-0 w-12 transition-colors duration-300 group-hover:text-[var(--green)]"
          style={{ color: 'rgba(240,240,240,0.2)' }}
        >
          {svc.id}
        </span>

        {/* Title */}
        <h3
          className="font-display font-black flex-1 uppercase transition-colors duration-300 group-hover:text-[var(--green)]"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--text)', letterSpacing: '-0.01em' }}
        >
          {svc.title}
        </h3>

        {/* Description — visible on hover desktop */}
        <p
          className="hidden lg:block max-w-xs text-sm leading-relaxed transition-opacity duration-300 group-hover:opacity-100 opacity-0"
          style={{ color: 'rgba(240,240,240,0.55)' }}
        >
          {svc.desc}
        </p>

        {/* Arrow */}
        <div
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 group-hover:bg-[var(--green)] group-hover:border-[var(--green)]"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-colors duration-300 group-hover:stroke-black"
            stroke="currentColor"
          >
            <path d="M2 7h10M7 2l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Mobile description */}
      <p
        className="lg:hidden pb-4 text-sm leading-relaxed"
        style={{ color: 'rgba(240,240,240,0.5)', paddingLeft: '3rem' }}
      >
        {svc.desc}
      </p>

      {last && (
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }} />
      )}
    </div>
  );
}
