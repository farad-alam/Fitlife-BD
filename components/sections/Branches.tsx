'use client';

type BranchData = {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string | null;
  mapLink: string | null;
  mapEmbed: string | null;
};

export default function Branches({ data }: { data?: BranchData[] }) {
  // Use DB data if provided, otherwise fallback to empty array or default
  const branches = data && data.length > 0 ? data : [
    {
      id: 'b1',
      city: 'Rajshahi',
      name: 'Kadirganj',
      address: '1st Floor, Nagar Vaban Area, Kadirganj, Greater Road',
      phone: '+880 17XX-XXXXXX',
      mapLink: 'https://maps.app.goo.gl/UQBPmm2b4hbcHooZA',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.5!2d88.6068!3d24.3636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbede2db4ce745%3A0xf0d02d48fdd6e8b!2sKadirganj%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1717000000000',
    },
    {
      id: 'b2',
      city: 'Rajshahi',
      name: 'Uposhohor',
      address: 'Opposite Karaitola Boro Masjid, Uposhahar',
      phone: '+880 17XX-XXXXXX',
      mapLink: 'https://maps.app.goo.gl/FD7MbH824rf6sFDL8',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635!2d88.5700!3d24.3700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbef7f67e5a5c7%3A0x5c68f28f9df9ccb2!2sUposhahar%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1717000000001',
    },
    {
      id: 'b3',
      city: 'Rajshahi',
      name: 'Vodra',
      address: 'Near Vodra Rail Crossing, Rajshahi',
      phone: '+880 17XX-XXXXXX',
      mapLink: 'https://maps.app.goo.gl/muvj6Ypsv9ZrAXTHA',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634!2d88.6300!3d24.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbede2db4ce745%3A0xf0d02d48fdd6e8b!2sVodra%2C%20Rajshahi!5e0!3m2!1sen!2sbd!4v1717000000002',
    },
  ];

  const cityGroups = Array.from(new Set(branches.map(b => b.city)));

  return (
    <section
      id="branches"
      className="section-pad"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="label-tag mb-4 justify-center">Our Network</div>
          <h2
            className="text-display"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
          >
            7 LOCATIONS.<br />
            <span style={{ color: 'var(--green)' }}>ONE COMMUNITY.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {cityGroups.map((city) => (
              <span
                key={city}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ border: '1px solid rgba(26,255,107,0.3)', color: 'var(--green)' }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Hours banner */}
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 p-4 mb-12 text-center"
          style={{
            background: 'rgba(26,255,107,0.06)',
            border: '1px solid rgba(26,255,107,0.15)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
              Open Daily: <strong>7:00 AM – 11:00 PM</strong>
            </span>
          </div>
          <div className="hidden md:block w-px h-4" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <span className="text-sm" style={{ color: 'var(--muted)' }}>
            Saturday to Thursday · Closed Fridays
          </span>
        </div>

        {/* Branches grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4">
          {branches.map((branch, i) => (
            <div
              key={`${branch.city}-${branch.name}`}
              className="group card-dark overflow-hidden flex flex-col cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => branch.mapLink && window.open(branch.mapLink, '_blank')}
            >
              {/* Map embed */}
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                <iframe
                  src={branch.mapEmbed || ''}
                  width="100%"
                  height="160"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(160deg) saturate(0.4)', pointerEvents: 'none' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${branch.name} map`}
                />
                {/* City badge */}
                <div
                  className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--green)', color: '#000' }}
                >
                  {branch.city}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className="font-display font-bold text-xl uppercase"
                    style={{ color: 'var(--text)' }}
                  >
                    {branch.name}
                  </h3>
                  <span
                    className="font-display font-black text-3xl opacity-10"
                    style={{ color: 'var(--text)', lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
                  {branch.address}
                </p>

                <div
                  className="flex items-center justify-between mt-4 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <a
                    href={branch.mapLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider transition-colors hover:text-[var(--green)]"
                    style={{ color: 'rgba(240,240,240,0.5)' }}
                  >
                    Get Directions →
                  </a>
                  <a
                    href="https://wa.me/8801700000000"
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--green)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
