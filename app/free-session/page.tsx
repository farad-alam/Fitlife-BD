import { db } from '@/db';
import { sessionEvents, branches } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FreeSessionClient from './FreeSessionClient';

export const revalidate = 86400; // ISR: rebuild max once per 24 hours. Admin saves trigger immediate revalidation.

export default async function FreeSessionPage() {
  let activeSession = null;
  let activeBranches: any[] = [];

  try {
    const sessions = await db
      .select()
      .from(sessionEvents)
      .where(eq(sessionEvents.isActive, true))
      .limit(1);
    
    if (sessions.length > 0) {
      activeSession = sessions[0];
    }

    activeBranches = await db
      .select()
      .from(branches)
      .where(eq(branches.isActive, true))
      .orderBy(asc(branches.sortOrder));
  } catch (error) {
    console.error('Failed to fetch data for free session page:', error);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-wider uppercase mb-4" style={{ color: 'var(--text)' }}>
              Free <span style={{ color: 'var(--green)' }}>Session</span>
            </h1>
          </div>

          {!activeSession ? (
            <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">No Upcoming Sessions</h2>
              <p className="text-gray-400">Please check back later for our next free session announcement.</p>
            </div>
          ) : (
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 md:p-10">
              <div className="mb-8 pb-8 border-b border-white/10 text-center">
                <span className="inline-block px-3 py-1 bg-green-500/10 text-[var(--green)] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  NOW OPEN
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{activeSession.title}</h2>
                <p className="text-gray-400 mb-6">{activeSession.description}</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(activeSession.sessionDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <FreeSessionClient session={activeSession} branches={activeBranches} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
