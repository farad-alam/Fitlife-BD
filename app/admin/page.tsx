import { auth } from '@/lib/auth';
import { db } from '@/db';
import { gymStats, contactLeads, trainers, branches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { BarChart2, Mail, Users, MapPin } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await auth();

  // We could fetch these counts from DB, but for now we'll do some basic queries or placeholders
  // A count query using Drizzle involves selecting sql`count(*)` but we can fetch all or use raw for simplicity in this phase.
  // We'll leave it as placeholders for now, except maybe unread leads.

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome back, {session?.user?.name}</h1>
      <p className="text-gray-400 mb-8">Here's what's happening at FitlifeBD today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Trainers" value="30+" icon={Users} color="text-blue-400" />
        <StatCard title="Active Branches" value="7" icon={MapPin} color="text-purple-400" />
        <StatCard title="Gym Stats" value="Active" icon={BarChart2} color="text-green-400" />
        <StatCard title="Unread Leads" value="0" icon={Mail} color="text-orange-400" />
      </div>

      <div className="card-dark p-6 rounded-xl border border-white/5 bg-[#111]">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/admin/stats" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
            Update Stats
          </a>
          <a href="/admin/pricing" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
            Manage Pricing
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) {
  return (
    <div className="bg-[#111] p-6 rounded-xl border border-white/5 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
