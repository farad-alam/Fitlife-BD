'use client';

import { useState } from 'react';
import { updateStat } from './actions';

type Stat = {
  id: number;
  label: string;
  number: number;
  suffix: string | null;
  sortOrder: number | null;
};

export function StatsClient({ initialStats }: { initialStats: Stat[] }) {
  const [stats, setStats] = useState(initialStats);
  const [savingId, setSavingId] = useState<number | null>(null);

  const handleChange = (id: number, field: keyof Stat, value: string | number) => {
    setStats(stats.map(stat => stat.id === id ? { ...stat, [field]: value } : stat));
  };

  const handleSave = async (stat: Stat) => {
    setSavingId(stat.id);
    await updateStat(stat.id, stat.label, stat.number, stat.suffix || '');
    setSavingId(null);
  };

  return (
    <div className="space-y-6">
      {stats.map((stat) => (
        <div key={stat.id} className="flex flex-col md:flex-row gap-4 items-end bg-[#1A1A1A] p-4 rounded-lg border border-white/5">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Label</label>
            <input
              type="text"
              value={stat.label}
              onChange={(e) => handleChange(stat.id, 'label', e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#1AFF6B]/50"
            />
          </div>
          <div className="w-full md:w-32">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Number</label>
            <input
              type="number"
              value={stat.number}
              onChange={(e) => handleChange(stat.id, 'number', parseInt(e.target.value))}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#1AFF6B]/50"
            />
          </div>
          <div className="w-full md:w-24">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Suffix</label>
            <input
              type="text"
              value={stat.suffix || ''}
              onChange={(e) => handleChange(stat.id, 'suffix', e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#1AFF6B]/50"
            />
          </div>
          <button
            onClick={() => handleSave(stat)}
            disabled={savingId === stat.id}
            className="w-full md:w-auto px-6 py-2.5 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {savingId === stat.id ? 'Saving...' : 'Save'}
          </button>
        </div>
      ))}
    </div>
  );
}
