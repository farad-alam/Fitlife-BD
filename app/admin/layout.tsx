import { ReactNode } from 'react';


import Link from 'next/link';
import { LogOut, Home, BarChart2, Mail, Tag, HelpCircle, Users, MapPin, Image as ImageIcon, Settings, Repeat } from 'lucide-react';
import { signOut } from '@/lib/auth'; // Wait, server action sign out is tricky, we can use client component for the button or a server action form

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: Home },
  { label: 'Gym Stats', href: '/admin/stats', icon: BarChart2 },
  { label: 'Contact Leads', href: '/admin/contact-leads', icon: Mail },
  { label: 'Pricing Plans', href: '/admin/pricing', icon: Tag },
  { label: 'FAQs', href: '/admin/faq', icon: HelpCircle },
  { label: 'Trainers', href: '/admin/trainers', icon: Users },
  { label: 'Transformations', href: '/admin/transformations', icon: Repeat },
  { label: 'Branches', href: '/admin/branches', icon: MapPin },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#080808] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-display font-black tracking-tight flex items-center gap-2">
            <span className="text-[#1AFF6B]">FITLIFE</span> ADMIN
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <form
            action={async () => {
              'use server';
              // Note: you can't use next-auth's signOut here directly unless you import from the configured auth.ts correctly
              // We'll fix the signOut action in a separate component if needed, or inline here
              const { signOut } = await import('@/lib/auth');
              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
