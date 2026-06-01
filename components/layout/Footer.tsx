import Link from 'next/link';

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
  Contact: [
    { label: 'WhatsApp Us', href: 'https://wa.me/8801700000000' },
    { label: 'Facebook', href: 'https://facebook.com/fitlifegymrajshahi' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'FAQ', href: '#faq' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="font-display text-3xl font-black uppercase"
                style={{ color: 'var(--green)', lineHeight: 1 }}
              >
                FIT
              </span>
              <span
                className="font-display text-3xl font-black uppercase"
                style={{ color: 'var(--text)', lineHeight: 1 }}
              >
                LIFE
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ml-1"
                style={{ color: 'var(--muted)', alignSelf: 'flex-end', paddingBottom: '4px' }}
              >
                BD
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(240,240,240,0.45)', maxWidth: '260px' }}>
              Bangladesh&apos;s premier fitness chain. 7 locations. 1,000+ members. Transforming lives since 2017.
            </p>

            {/* Hours */}
            <div
              className="p-4 text-sm"
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="font-bold mb-1 font-display" style={{ color: 'var(--green)', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Open Hours
              </p>
              <p className="text-xs" style={{ color: 'rgba(240,240,240,0.5)' }}>
                Saturday – Thursday<br />
                7:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="font-display font-black uppercase text-sm mb-6"
                style={{ color: 'var(--text)', letterSpacing: '0.15em' }}
              >
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[var(--green)]"
                      style={{ color: 'rgba(240,240,240,0.45)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(240,240,240,0.3)' }}>
            © {new Date().getFullYear()} Fitlife Gym Bangladesh. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors hover:text-[var(--green)]" style={{ color: 'rgba(240,240,240,0.3)' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors hover:text-[var(--green)]" style={{ color: 'rgba(240,240,240,0.3)' }}>
              Terms
            </a>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: 'rgba(240,240,240,0.2)' }}>Crafted with</span>
              <span style={{ color: 'var(--green)', fontSize: '12px' }}>♥</span>
              <span className="text-xs" style={{ color: 'rgba(240,240,240,0.2)' }}>in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
