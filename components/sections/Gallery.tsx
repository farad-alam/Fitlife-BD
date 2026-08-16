'use client';
import Image from 'next/image';

type GalleryImageData = {
  id: string;
  imageUrl: string;
  caption: string | null;
  category: string | null;
};

export default function Gallery({ data }: { data?: GalleryImageData[] }) {
  // Use DB data if provided, otherwise fallback to empty array or default
  const images = data && data.length > 0 ? data : [
    { id: 'g1', imageUrl: '/images/gym-interior.png', caption: 'Main Training Floor', category: 'Gym' },
    { id: 'g2', imageUrl: '/images/workout-action.png', caption: 'Strength Training', category: 'Gym' },
    { id: 'g3', imageUrl: '/images/athlete-hero.png', caption: 'Athlete Development', category: 'Gym' },
    { id: 'g4', imageUrl: '/images/trainer-1.png', caption: 'Expert Coaching', category: 'Gym' },
    { id: 'g5', imageUrl: '/images/transformation-1.png', caption: 'Transformation Results', category: 'Gym' },
  ];

  const featuredImage = images[0];
  const otherImages = images.slice(1);

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
            href="https://www.facebook.com/profile.php?id=100047091586084"
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
          {featuredImage && (
            <div className="col-span-2 row-span-2 relative overflow-hidden group bg-[#111]" style={{ aspectRatio: '1/1' }}>
              <Image
                src={featuredImage.imageUrl}
                alt={featuredImage.caption || 'Fitlife Gym'}
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
                <p className="text-sm font-bold" style={{ color: 'var(--green)' }}>
                  {featuredImage.caption || 'Featured'}
                </p>
              </div>
            </div>
          )}

          {/* Smaller images */}
          {otherImages.map((img) => (
            <div
              key={img.id}
              className="relative overflow-hidden group bg-[#111]"
              style={{ aspectRatio: '1/1' }}
            >
              <Image
                src={img.imageUrl}
                alt={img.caption || 'Gym image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] hover:scale-105"
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
                <p className="text-xs font-bold" style={{ color: 'var(--green)' }}>
                  {img.caption || img.category || 'Gallery Image'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center mt-8 text-sm" style={{ color: 'var(--muted)' }}>
          Follow us{' '}
          <a
            href="https://www.facebook.com/profile.php?id=100047091586084"
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
