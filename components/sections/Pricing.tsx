'use client';
import { FadeIn, FadeInStaggerItem } from '../ui/FadeIn';

const plans = [
  {
    name: 'STARTER',
    tagline: 'Begin your journey',
    price: '1,500',
    duration: '/ month',
    period: '1-Month Plan',
    features: [
      'Full gym access',
      'Locker facility',
      'Basic guidance session',
      'Open 7AM – 11PM',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'PRO',
    tagline: 'Most popular choice',
    price: '1,200',
    duration: '/ month',
    period: '3-Month Plan',
    features: [
      'Everything in Starter',
      'Unlimited group classes',
      'Nutrition consultation',
      'Progress tracking',
      'Priority support',
    ],
    cta: 'Join Pro',
    highlight: true,
  },
  {
    name: 'ELITE',
    tagline: 'Maximum results',
    price: '1,000',
    duration: '/ month',
    period: '6–12 Month Plan',
    features: [
      'Everything in Pro',
      'Personal training (4x/mo)',
      'Custom meal plan',
      'Membership freeze option',
      'All branches access',
    ],
    cta: 'Go Elite',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Decorative bg number */}
      <div
        className="absolute -top-10 right-0 font-display font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(10rem, 22vw, 24rem)',
          color: 'rgba(26,255,107,0.03)',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        ৳
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <div className="label-tag mb-4 justify-center">Membership Plans</div>
            <h2
              className="text-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--text)' }}
            >
              FLEXIBLE OPTIONS FOR<br />
              <span style={{ color: 'var(--green)' }}>EVERY ATHLETE</span>
            </h2>
            <p
              className="mt-4 text-sm max-w-md mx-auto"
              style={{ color: 'rgba(240,240,240,0.5)' }}
            >
              Prices below are indicative. Contact us for exact current pricing at your preferred branch.
            </p>
          </div>
        </FadeIn>

        {/* Plans grid */}
        <FadeIn staggerChildren={0.2} direction="none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px" style={{ background: 'rgba(255,255,255,0.07)' }}>
            {plans.map((plan) => (
              <FadeInStaggerItem
                key={plan.name}
                className="relative p-8 md:p-10 flex flex-col h-full"
              style={{
                background: plan.highlight ? 'var(--surface-2)' : 'var(--surface)',
                ...(plan.highlight
                  ? { borderTop: '2px solid var(--green)' }
                  : {}),
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute top-0 right-8 px-3 py-1 font-display font-black text-xs uppercase tracking-wider"
                  style={{ background: 'var(--green)', color: '#000', transform: 'translateY(-50%)' }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--muted)' }}>
                  {plan.period}
                </p>
                <h3
                  className="font-display font-black text-4xl"
                  style={{ color: plan.highlight ? 'var(--green)' : 'var(--text)' }}
                >
                  {plan.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'rgba(240,240,240,0.4)' }}>
                  {plan.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-end gap-1">
                  <span
                    className="font-display font-black"
                    style={{ fontSize: '1rem', color: 'var(--green)', paddingBottom: '0.5rem' }}
                  >
                    ৳
                  </span>
                  <span
                    className="font-display font-black"
                    style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', color: 'var(--text)', lineHeight: 1 }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm pb-2" style={{ color: 'var(--muted)' }}>
                    {plan.duration}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="8" cy="8" r="7.5" stroke="rgba(26,255,107,0.4)" />
                      <path d="M5 8l2 2 4-4" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: 'rgba(240,240,240,0.7)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className={plan.highlight ? 'btn-primary justify-center' : 'btn-outline justify-center'}
              >
                {plan.cta}
                </a>
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeIn>

        {/* Footer note */}
        <FadeIn delay={0.4}>
          <p className="text-center mt-8 text-xs" style={{ color: 'var(--muted)' }}>
            🎁 First-time members get a <strong style={{ color: 'var(--text)' }}>complimentary trial day</strong>. No commitment required.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
