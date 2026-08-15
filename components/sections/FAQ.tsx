'use client';

type FAQData = {
  q: string;
  a: string;
};

import { useState } from 'react';

export default function FAQ({ data }: { data?: FAQData[] }) {
  // Use DB data if provided, otherwise fallback to empty array or default
  const faqs = data && data.length > 0 ? data : [
    {
      q: 'How do I join Fitlife Gym?',
      a: 'Walk into any of our 7 branches and our staff will set you up immediately. You can also start the process via WhatsApp — we\'ll guide you through everything before you even arrive.',
    },
    {
      q: 'What are the membership fees?',
      a: 'Plans start from ৳1,500/month for a 1-month Starter plan, going down to ৳1,000/month for our 6–12 month Elite plan. Contact us for the latest pricing at your nearest branch.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! First-time visitors get a complimentary trial day. Come in, try the equipment, meet our coaches, and decide if Fitlife is right for you — no commitment required.',
    },
    {
      q: 'What are the operating hours?',
      a: 'All branches are open 7:00 AM to 11:00 PM, Saturday through Thursday. We are closed on Fridays.',
    },
    {
      q: 'Is Fitlife suitable for women?',
      a: 'Absolutely. Fitlife is built for everyone. We have female-friendly training areas, female coaches, and specific group classes like Zumba and aerobics designed for all fitness levels.',
    },
    {
      q: 'Can I pause or cancel my membership?',
      a: 'Elite plan members can freeze their membership for up to 1 month per year — useful for travel or medical situations. Contact your branch for details.',
    },
    {
      q: 'Do you provide personal training?',
      a: 'We have 30+ certified trainers across all branches offering personalized 1-on-1 coaching. Sessions can be added to any membership plan.',
    },
    {
      q: 'Can I use any branch with one membership?',
      a: 'Elite plan members have access to all 7 Fitlife branches. Starter and Pro plans are branch-specific. Speak with us for multi-branch upgrade options.',
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section-pad"
      style={{ background: 'var(--black)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="label-tag mb-4">FAQ</div>
            <h2
              className="text-display mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--text)' }}
            >
              HAVE<br />
              QUESTIONS?<br />
              <span style={{ color: 'var(--green)' }}>WE HAVE<br />ANSWERS.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(240,240,240,0.5)' }}>
              Still need help? Our team is available on WhatsApp 7 days a week.
            </p>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ask on WhatsApp
            </a>
          </div>

          {/* Right — accordion */}
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-4 py-5 md:py-6"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span
                    className="text-base md:text-lg font-medium pr-4"
                    style={{
                      color: open === i ? 'var(--green)' : 'var(--text)',
                      transition: 'color 0.2s ease',
                      textAlign: 'left',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300"
                    style={{
                      border: open === i ? '1px solid var(--green)' : '1px solid rgba(255,255,255,0.15)',
                      background: open === i ? 'var(--green)' : 'transparent',
                      transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6 1v10M1 6h10"
                        stroke={open === i ? '#000' : 'currentColor'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: open === i ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <p
                    className="text-sm leading-relaxed pb-6"
                    style={{ color: 'rgba(240,240,240,0.55)' }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
