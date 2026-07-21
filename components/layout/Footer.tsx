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
    <footer style={{ background: 'var(--black)' }} className="relative overflow-hidden pt-24 pb-8 border-t border-[rgba(255,255,255,0.07)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
          {/* Left: Intro & Hours */}
          <div className="max-w-sm flex flex-col gap-10">
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.45)' }}>
              Bangladesh&apos;s premier fitness chain. 7 locations. 1,000+ members. Transforming lives since 2017.
            </p>
            
            {/* Hours block (keeping content) */}
            <div>
              <p className="font-bold mb-2 font-display text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--green)' }}>
                Open Hours
              </p>
              <p className="text-xs leading-relaxed uppercase tracking-widest" style={{ color: 'rgba(240,240,240,0.3)' }}>
                Sat – Thu <br />
                7:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Right: Links Grouped */}
          <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-24">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="font-display font-black uppercase text-xs mb-8 tracking-[0.15em]" style={{ color: 'var(--text)' }}>
                  {group}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs transition-colors duration-200 hover:text-[var(--green)] tracking-wider"
                        style={{ color: 'rgba(240,240,240,0.45)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Typography Section */}
        <div className="w-full flex justify-center mb-16 overflow-hidden">
          <h2 
            className="font-display font-black tracking-tighter uppercase whitespace-nowrap"
            style={{ 
              fontSize: 'clamp(4rem, 15vw, 13rem)', 
              lineHeight: '0.8', 
              color: 'var(--text)',
            }}
          >
            Fitlife <span style={{ color: 'var(--green)' }}>BD</span>
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[rgba(255,255,255,0.07)] text-[10px] uppercase tracking-[0.15em] font-bold" style={{ color: 'rgba(240,240,240,0.3)' }}>
          <div>
            © {new Date().getFullYear()} Fitlife Gym BD. All rights reserved.
          </div>
          
          <div className="hidden md:block" style={{ color: 'rgba(240,240,240,0.2)' }}>
            RAJSHAHI + DHAKA + BOGURA
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link href="#" className="hover:text-[var(--green)] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[var(--green)] transition-colors">Privacy Policy</Link>
            <div className="flex items-center gap-1" style={{ color: 'rgba(240,240,240,0.2)' }}>
              <span>Crafted in BD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
