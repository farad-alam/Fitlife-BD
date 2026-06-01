'use client';
import Image from 'next/image';

// Gallery uses gym images in a masonry-style grid
const galleryImages = [
  { src: '/images/gym-interior.png', alt: 'Gym floor', size: 'large' },
  { src: '/images/workout-action.png', alt: 'Weight training', size: 'small' },
  { src: '/images/athlete-hero.png', alt: 'Athlete training', size: 'small' },
  { src: '/images/trainer-1.png', alt: 'Coach', size: 'medium' },
  { src: '/images/transformation-1.png', alt: 'Transformation', size: 'medium' },
  { src: '/images/gym-interior.png', alt: 'Equipment', size: 'small' },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="section-pad"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="label-tag mb-4">Inside Fitlife</div>
            <h2
              className="text-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
            >
              ELITE FACILITIES.<br />
              <span style={{ color: 'var(--green)' }}>PROVEN RESULTS.</span>
            </h2>
          </div>
          <a
            href="https://facebook.com/fitlifegymrajshahi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline self-start md:self-end"
          >
            View More on Facebook →
          </a>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Large featured image */}
          <div className="col-span-2 row-span-2 relative overflow-hidden group" style={{ aspectRatio: '1/1' }}>
            <Image
              src="/images/gym-interior.png"
              alt="Fitlife Gym Interior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'saturate(0.8)' }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(26,255,107,0.08)' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{ background: 'rgba(8,8,8,0.8)' }}
            >
              <p className="text-sm font-bold" style={{ color: 'var(--green)' }}>Main Training Floor</p>
            </div>
          </div>

          {/* Smaller images */}
          {[
            { src: '/images/workout-action.png', label: 'Strength Training' },
            { src: '/images/athlete-hero.png', label: 'Athlete Development' },
            { src: '/images/trainer-1.png', label: 'Expert Coaching' },
            { src: '/images/transformation-1.png', label: 'Transformation Results' },
          ].map((img) => (
            <div
              key={img.label}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '1/1' }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: 'saturate(0.7)' }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(26,255,107,0.1)' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'rgba(8,8,8,0.85)' }}
              >
                <p className="text-xs font-bold" style={{ color: 'var(--green)' }}>{img.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center mt-8 text-sm" style={{ color: 'var(--muted)' }}>
          Follow us{' '}
          <a
            href="https://facebook.com/fitlifegymrajshahi"
            className="underline transition-colors hover:text-[var(--green)]"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text)' }}
          >
            @fitlifegymrajshahi
          </a>{' '}
          for daily workout inspiration and member success stories.
        </p>
      </div>
    </section>
  );
}
