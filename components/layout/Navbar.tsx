'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Hire Coach', href: '#hire-coach' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Branches', href: '#branches' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(8,8,8,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-16 h-10 md:w-20 md:h-12">
            <Image
              src="/images/logo.png"
              alt="Fitlife Gymnasium Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center">
            <span
              className="font-display text-xl md:text-2xl font-black tracking-wider uppercase"
              style={{ color: 'var(--green)', lineHeight: 1 }}
            >
              FIT
            </span>
            <span
              className="font-display text-xl md:text-2xl font-black tracking-wider uppercase"
              style={{ color: 'var(--text)', lineHeight: 1 }}
            >
              LIFE
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-50"
              style={{ color: 'var(--muted)', alignSelf: 'flex-end', paddingBottom: '3px' }}
            >
              BD
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:text-[var(--green)]"
              style={{ color: 'rgba(240,240,240,0.6)', letterSpacing: '0.1em' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Join Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              background: 'var(--text)',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              background: 'var(--text)',
              opacity: open ? 0 : 1,
              transform: open ? 'scaleX(0)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[2px] transition-all duration-300"
            style={{
              background: 'var(--text)',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden transition-all duration-500 overflow-hidden"
        style={{
          maxHeight: open ? '400px' : '0',
          background: 'rgba(8,8,8,0.98)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-xl font-bold uppercase tracking-wider py-2 border-b transition-colors"
              style={{
                color: 'rgba(240,240,240,0.7)',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary w-full justify-center mt-2"
          >
            Join Now
          </a>
        </div>
      </div>
    </header>
  );
}
