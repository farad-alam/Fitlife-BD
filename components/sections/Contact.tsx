'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FadeIn, FadeInStaggerItem } from '../ui/FadeIn';
import { MessageCircle } from 'lucide-react';

import { submitContactLead } from '@/app/actions';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', branch: '', goal: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullMessage = `Preferred Branch: ${form.branch}\nGoal: ${form.goal}\nMessage: ${form.message}`;

    try {
      await submitContactLead({
        name: form.name,
        phone: form.phone,
        message: fullMessage,
      });
    } catch (error) {
      console.error('Submission failed', error);
    }

    const text = encodeURIComponent(
      `Hi Fitlife! I'd like to enquire about membership.\n\nName: ${form.name}\nPhone: ${form.phone}\n${fullMessage}`
    );
    window.open(`https://wa.me/8801632442096?text=${text}`, '_blank');
    setSent(true);
    setLoading(false);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Full bleed image top half */}
      <div className="relative h-64 md:h-80" style={{ overflow: 'hidden' }}>
        <Image
          src="/images/gym-interior.png"
          alt="Fitlife Gym"
          fill
          className="object-cover object-center"
          style={{ filter: 'brightness(0.3) saturate(0.5)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, var(--surface) 100%)' }}
        />
        {/* Centered text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <FadeIn direction="up">
            <div className="label-tag mb-4 justify-center">Get In Touch</div>
            <h2
              className="text-display"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', color: 'var(--text)' }}
            >
              START YOUR<br />
              <span style={{ color: 'var(--green)' }}>JOURNEY TODAY</span>
            </h2>
          </FadeIn>
        </div>
      </div>

      {/* Form section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — contact info */}
          <FadeIn direction="right">
            <div>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: 'rgba(240,240,240,0.6)', maxWidth: '420px' }}
              >
                Ready to transform your life? Fill out the form and we&apos;ll get back to you instantly via WhatsApp.
                Or walk into any of our 7 branches — no appointment needed.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: 'Headquarters',
                    value: 'Kadirganj, Rajshahi, Bangladesh',
                  },
                  {
                    icon: <MessageCircle size={20} color="var(--green)" />,
                    label: 'WhatsApp',
                    value: '+880 1632 442096',
                    href: 'https://wa.me/8801632442096',
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                      </svg>
                    ),
                    label: 'Facebook',
                    value: 'facebook.com/profile.php?id=100047091586084',
                    href: 'https://www.facebook.com/profile.php?id=100047091586084',
                  },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href || '#'} target={href ? '_blank' : undefined} className="flex items-start gap-4 group">
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors group-hover:bg-[var(--green)]/10"
                      style={{ background: 'rgba(26,255,107,0.08)', border: '1px solid rgba(26,255,107,0.15)' }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted)' }}>
                        {label}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text)' }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=100047091586084"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[var(--green)] hover:text-black"
                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/fitlifegymnasium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[var(--green)] hover:text-black"
                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@abusufiantaj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[var(--green)] hover:text-black"
                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn direction="left" delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--green)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--green)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                  Preferred Branch
                </label>
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none transition-all appearance-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: form.branch ? 'var(--text)' : 'rgba(240,240,240,0.3)',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" style={{ background: '#0e0e0e' }}>Select branch...</option>
                  <option value="Kadirganj, Rajshahi" style={{ background: '#0e0e0e' }}>Kadirganj, Rajshahi</option>
                  <option value="Uposhohor, Rajshahi" style={{ background: '#0e0e0e' }}>Uposhohor, Rajshahi</option>
                  <option value="Vodra, Rajshahi" style={{ background: '#0e0e0e' }}>Vodra, Rajshahi</option>
                  <option value="Godagari, Rajshahi" style={{ background: '#0e0e0e' }}>Godagari, Rajshahi</option>
                  <option value="Chapai Nawabganj" style={{ background: '#0e0e0e' }}>Chapai Nawabganj</option>
                  <option value="Uttara, Dhaka" style={{ background: '#0e0e0e' }}>Uttara, Dhaka</option>
                  <option value="Dhanmondi, Dhaka" style={{ background: '#0e0e0e' }}>Dhanmondi, Dhaka</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                  Your Goal
                </label>
                <select
                  value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none transition-all appearance-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: form.goal ? 'var(--text)' : 'rgba(240,240,240,0.3)',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" style={{ background: '#0e0e0e' }}>Select goal...</option>
                  <option value="Weight Loss" style={{ background: '#0e0e0e' }}>Weight Loss</option>
                  <option value="Muscle Gain" style={{ background: '#0e0e0e' }}>Muscle Gain</option>
                  <option value="Body Recomposition" style={{ background: '#0e0e0e' }}>Body Recomposition</option>
                  <option value="General Fitness" style={{ background: '#0e0e0e' }}>General Fitness</option>
                  <option value="Sports Performance" style={{ background: '#0e0e0e' }}>Sports Performance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                Message (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Any questions or special requirements..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--green)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center text-base py-4 mt-2"
            >
              {sent ? '✓ Opening WhatsApp...' : 'Send via WhatsApp →'}
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
              Your message will be sent directly to our team via WhatsApp.
            </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
