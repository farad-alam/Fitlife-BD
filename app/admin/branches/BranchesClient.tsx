'use client';

import { useState } from 'react';
import { addBranch, updateBranch, deleteBranch } from './actions';

type Branch = {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string | null;
  mapLink: string | null;
  mapEmbed: string | null;
  isActive: boolean | null;
};

export function BranchesClient({ initialBranches }: { initialBranches: Branch[] }) {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [newBranch, setNewBranch] = useState({
    city: '',
    name: '',
    address: '',
    phone: '',
    mapLink: '',
    mapEmbed: '',
  });

  const handleChange = (id: string, field: keyof Branch, value: any) => {
    setBranches(branches.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleSave = async (branch: Branch) => {
    setSavingId(branch.id);
    await updateBranch(branch.id, {
      city: branch.city,
      name: branch.name,
      address: branch.address,
      phone: branch.phone || '',
      mapLink: branch.mapLink || '',
      mapEmbed: branch.mapEmbed || '',
      isActive: branch.isActive ?? true,
    });
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      setSavingId(id);
      await deleteBranch(id);
      setBranches(branches.filter(b => b.id !== id));
      setSavingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.city || !newBranch.name || !newBranch.address) {
      alert('City, Name, and Address are required');
      return;
    }
    setIsAdding(true);
    await addBranch(newBranch);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Add New Branch Form */}
      <form onSubmit={handleAdd} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 space-y-4">
        <h3 className="text-lg font-bold text-white mb-2">Add New Branch</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">City / Region</label>
            <input
              type="text"
              value={newBranch.city}
              onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              placeholder="e.g., Rajshahi"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Branch Name</label>
            <input
              type="text"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              placeholder="e.g., Kadirganj Headquarters"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Address</label>
          <textarea
            value={newBranch.address}
            onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50 h-20 resize-none"
            placeholder="Full street address..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone</label>
            <input
              type="text"
              value={newBranch.phone}
              onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              placeholder="e.g., +8801632442096"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Google Maps URL</label>
            <input
              type="text"
              value={newBranch.mapLink}
              onChange={(e) => setNewBranch({ ...newBranch, mapLink: e.target.value })}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={newBranch.mapEmbed}
              onChange={(e) => setNewBranch({ ...newBranch, mapEmbed: e.target.value })}
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isAdding}
          className="px-6 py-2.5 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add Branch'}
        </button>
      </form>

      {/* Existing Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col gap-4 relative">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={branch.isActive ?? true}
                  onChange={(e) => handleChange(branch.id, 'isActive', e.target.checked)}
                  className="accent-[#1AFF6B]"
                />
                Active
              </label>
              <button
                onClick={() => handleDelete(branch.id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
                disabled={savingId === branch.id}
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">City / Region</label>
                <input
                  type="text"
                  value={branch.city}
                  onChange={(e) => handleChange(branch.id, 'city', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Branch Name</label>
                <input
                  type="text"
                  value={branch.name}
                  onChange={(e) => handleChange(branch.id, 'name', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Address</label>
              <textarea
                value={branch.address}
                onChange={(e) => handleChange(branch.id, 'address', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone</label>
              <input
                type="text"
                value={branch.phone || ''}
                onChange={(e) => handleChange(branch.id, 'phone', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Map URL</label>
                <input
                  type="text"
                  value={branch.mapLink || ''}
                  onChange={(e) => handleChange(branch.id, 'mapLink', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Map Embed Src</label>
                <input
                  type="text"
                  value={branch.mapEmbed || ''}
                  onChange={(e) => handleChange(branch.id, 'mapEmbed', e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                />
              </div>
            </div>

            <button
              onClick={() => handleSave(branch)}
              disabled={savingId === branch.id}
              className="w-full py-2.5 mt-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {savingId === branch.id ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
