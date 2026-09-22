import Link from 'next/link';

export default function SessionsTeaser() {
  return (
    <section className="py-12 md:py-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-green-500">Upcoming Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Session Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-10 transition-transform hover:-translate-y-1 bg-[#111]">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3">
              FREE <span className="text-[var(--green)]">SESSION</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Join a free guided session with our expert coaches. Perfect for beginners and specific health goals.
            </p>
            
            <Link href="/free-session" className="inline-flex items-center gap-2 text-white font-bold hover:text-[var(--green)] transition-colors group">
              Register for Free
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Paid Workshops Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-10 transition-transform hover:-translate-y-1 bg-gradient-to-br from-[#111] to-black">
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3">
              PAID <span className="text-[var(--green)]">WORKSHOPS</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Deep-dive skill building and masterclasses. Limited seats available for dedicated learners.
            </p>
            
            <Link href="/workshops" className="inline-flex items-center gap-2 text-white font-bold hover:text-[var(--green)] transition-colors group">
              Browse Workshops
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
