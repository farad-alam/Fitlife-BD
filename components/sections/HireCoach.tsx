'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FadeIn, FadeInStaggerItem } from '../ui/FadeIn';

const coachingGoals = [
  { id: 'fat-loss', label: '🔥 Fat Loss & Body Recomposition' },
  { id: 'muscle-gain', label: '💪 Muscle Building & Strength' },
  { id: 'preventative', label: '🌱 Diabetes & Fatty Liver Prevention' },
  { id: 'peak-performance', label: '🏆 Competition & Peak Performance' },
];

const coachingModes = [
  { id: 'in-person', label: 'In-Person (7 Branches across Rajshahi & Dhaka)' },
  { id: 'online', label: '1-on-1 Online Coaching (Worldwide / Bangladesh)' },
];

const coachingPillars = [
  {
    title: 'Scientific Program Design',
    desc: 'No guesswork. Workout periodization customized by ISSA & IBA MBA certified founder Abu Sufian Taj and our senior coaches.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Bangladeshi Lifestyle Nutrition',
    desc: 'Sustainable meal protocols designed for realistic Bangladeshi diets—enjoy family meals without sabotaging metabolic health.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'Preventative Health Focus',
    desc: 'Specialized protocols for reversing insulin resistance, managing obesity, and building metabolic resilience.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Direct Coach Accountability',
    desc: 'Weekly check-ins, form video analysis, and direct WhatsApp support to keep you consistent every step of the way.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HireCoach() {
  const [selectedGoal, setSelectedGoal] = useState(coachingGoals[0].label);
  const [selectedMode, setSelectedMode] = useState(coachingModes[0].label);

  const handleWhatsAppBooking = () => {
    const phoneNumber = '8801632442096';
    const message = `Hi Fitlife! I'd like to hire a fitness coach.\n\n🎯 Goal: ${selectedGoal}\n📍 Preferred Mode: ${selectedMode}\n\nPlease let me know how we can schedule my consultation!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section
      id="hire-coach"
      className="section-pad relative overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Layer 1: Massive Background Watermark Text */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 font-display font-black select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap z-0"
        style={{
          fontSize: 'clamp(7rem, 15vw, 16rem)',
          color: 'rgba(255, 255, 255, 0.02)',
          lineHeight: 1,
        }}
      >
        1-ON-1 COACHING
      </div>

      {/* Layer 2: Atmospheric Action Photo Overlay with Seamless Edge Fades */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-12">
        <Image
          src="/images/workout-action.png"
          alt="Fitlife Coaching Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Top & bottom smooth gradient mask to blend with Trainers & Pricing sections */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 85%, #080808 100%), linear-gradient(to right, #080808 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.8) 100%)',
          }}
        />
      </div>

      {/* Layer 3: Cyber-Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,255,107,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,255,107,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 60% at 70% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 70% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Layer 4: Neon Ambient Spotlights */}
      <div
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(26,255,107,0.07) 0%, rgba(26,255,107,0) 70%)',
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(26,255,107,0.06) 0%, rgba(26,255,107,0) 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column: Typography & Pillars */}
          <div className="lg:col-span-7">
            <FadeIn direction="right">
              <div className="label-tag mb-4">1-on-1 Personal & Online Coaching</div>
              <h2
                className="text-display mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)', color: 'var(--text)' }}
              >
                HIRE A <span style={{ color: 'var(--green)' }}>FITNESS COACH.</span><br />
                ACCELERATE YOUR RESULTS.
              </h2>
              <p
                className="text-base md:text-lg mb-10 max-w-xl leading-relaxed"
                style={{ color: 'rgba(240,240,240,0.7)' }}
              >
                Whether in-person across our <strong>7 branches in Rajshahi & Dhaka</strong> or online with ISSA Certified Founder <strong>Abu Sufian Taj</strong> and our elite trainers, get an evidence-based roadmap tailored to your body and lifestyle.
              </p>

              {/* 4 Pillars Grid */}
              <FadeIn staggerChildren={0.12} direction="none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {coachingPillars.map((pillar) => (
                    <FadeInStaggerItem key={pillar.title}>
                      <div
                        className="p-6 rounded-xl border transition-all duration-300 h-full flex flex-col justify-between group hover:border-[#1AFF6B]/40"
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderColor: 'rgba(255, 255, 255, 0.07)',
                        }}
                      >
                        <div>
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#1AFF6B]/20"
                            style={{
                              background: 'rgba(26, 255, 107, 0.1)',
                              color: 'var(--green)',
                            }}
                          >
                            {pillar.icon}
                          </div>
                          <h3
                            className="font-display font-bold text-lg mb-2"
                            style={{ color: 'var(--text)' }}
                          >
                            {pillar.title}
                          </h3>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: 'rgba(240,240,240,0.55)' }}
                          >
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    </FadeInStaggerItem>
                  ))}
                </div>
              </FadeIn>
            </FadeIn>
          </div>

          {/* Right column: Interactive Consultation Card */}
          <div className="lg:col-span-5">
            <FadeIn direction="left" delay={0.2}>
              <div
                className="p-8 md:p-10 rounded-2xl border relative overflow-hidden backdrop-blur-md"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  borderColor: 'rgba(26, 255, 107, 0.25)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                {/* Neon Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: 'var(--green)' }}
                />

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1AFF6B] animate-pulse" />
                    <span
                      className="text-xs font-display tracking-widest uppercase font-bold"
                      style={{ color: 'var(--green)' }}
                    >
                      Instant WhatsApp Consultation
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl" style={{ color: 'var(--text)' }}>
                    Start Your Custom Roadmap
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'rgba(240,240,240,0.6)' }}>
                    Select your goal and preferred coaching mode to connect directly with our coaching team on WhatsApp.
                  </p>
                </div>

                {/* Step 1: Select Goal */}
                <div className="mb-6">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: 'var(--text)' }}
                  >
                    1. What is your primary fitness goal?
                  </label>
                  <div className="flex flex-col gap-2">
                    {coachingGoals.map((goal) => {
                      const active = selectedGoal === goal.label;
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => setSelectedGoal(goal.label)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-xs font-medium transition-all duration-200 border flex items-center justify-between ${
                            active
                              ? 'border-[#1AFF6B] bg-[#1AFF6B]/15 text-white font-semibold'
                              : 'border-white/10 hover:border-white/25 text-white/70 hover:text-white bg-white/[0.02]'
                          }`}
                        >
                          <span>{goal.label}</span>
                          {active && (
                            <span className="w-4 h-4 rounded-full bg-[#1AFF6B] flex items-center justify-center text-black text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Mode */}
                <div className="mb-8">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: 'var(--text)' }}
                  >
                    2. Choose Your Coaching Mode
                  </label>
                  <div className="flex flex-col gap-2">
                    {coachingModes.map((mode) => {
                      const active = selectedMode === mode.label;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedMode(mode.label)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-xs font-medium transition-all duration-200 border flex items-center justify-between ${
                            active
                              ? 'border-[#1AFF6B] bg-[#1AFF6B]/15 text-white font-semibold'
                              : 'border-white/10 hover:border-white/25 text-white/70 hover:text-white bg-white/[0.02]'
                          }`}
                        >
                          <span>{mode.label}</span>
                          {active && (
                            <span className="w-4 h-4 rounded-full bg-[#1AFF6B] flex items-center justify-center text-black text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-4 px-6 rounded-xl font-display font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'var(--green)',
                    color: 'var(--black)',
                    boxShadow: '0 10px 30px rgba(26,255,107,0.3)',
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.131.56 4.135 1.543 5.867l-1.643 6 6.136-1.61c1.674.912 3.6 1.439 5.666 1.439 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12z" />
                  </svg>
                  <span>Chat with Coach on WhatsApp</span>
                </button>

                {/* Trust Footer */}
                <div className="mt-4 text-center">
                  <p className="text-[11px]" style={{ color: 'rgba(240,240,240,0.45)' }}>
                    Direct connection to <strong>+8801632442096</strong> • Free 15-min assessment • Zero spam
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
