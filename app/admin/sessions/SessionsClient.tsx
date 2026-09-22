'use client';

import { useState } from 'react';
import { createSessionEvent, updateSessionEvent, deleteSessionEvent, sendSessionInvitations } from './actions';
import { Plus, Edit2, Trash2, Mail, Users, CheckCircle, XCircle } from 'lucide-react';

export default function SessionsClient({ initialEvents, initialRegistrations }: { initialEvents: any[], initialRegistrations: any[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'registrations'

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    sessionDate: '',
    targetCategory: '',
    inviteLink: '',
    isActive: false,
  });

  // Filter states
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  const [loading, setLoading] = useState(false);

  // Computed
  const filteredRegs = registrations.filter(r => 
    r.sessionEventId === selectedEventId && 
    (filterCategory === 'All' || r.healthCategory === filterCategory)
  );

  const uninvitedCount = filteredRegs.filter(r => !r.isInvited).length;

  const handleOpenForm = (event?: any) => {
    if (event) {
      setEditingId(event.id);
      setForm({
        title: event.title,
        description: event.description || '',
        sessionDate: new Date(event.sessionDate).toISOString().slice(0, 16),
        targetCategory: event.targetCategory || '',
        inviteLink: event.inviteLink || '',
        isActive: event.isActive,
      });
    } else {
      setEditingId(null);
      setForm({
        title: '',
        description: '',
        sessionDate: '',
        targetCategory: '',
        inviteLink: '',
        isActive: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...form,
        // Send as ISO string to avoid Server Action serialization issues with Date objects
        sessionDate: new Date(form.sessionDate).toISOString(),
      };

      let res;
      if (editingId) {
        res = await updateSessionEvent(editingId, payload);
      } else {
        res = await createSessionEvent(payload);
      }
      
      if (res?.success) {
        window.location.reload();
      } else {
        alert(res?.error || 'Failed to save event');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Save event error:', err);
      alert('Error: ' + (err?.message || 'An unexpected error occurred while saving.'));
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this session? All associated registrations will also be deleted.')) {
      setLoading(true);
      const res = await deleteSessionEvent(id);
      if (res?.success) {
        window.location.reload();
      } else {
        alert(res?.error || 'Failed to delete event');
        setLoading(false);
      }
    }
  };

  const handleSendInvites = async () => {
    if (uninvitedCount === 0) return;
    if (!confirm(`Are you sure you want to send emails to ${uninvitedCount} uninvited people?`)) return;

    setLoading(true);
    const res = await sendSessionInvitations(selectedEventId, filterCategory);
    setLoading(false);

    if (res.success) {
      alert(`Success! Sent ${res.count} invitations.`);
      window.location.reload();
    } else {
      alert(`Error: ${res.error}`);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('events')} 
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'events' ? 'bg-[var(--green)] text-black' : 'text-gray-400 hover:text-white'}`}
        >
          Manage Events
        </button>
        <button 
          onClick={() => setActiveTab('registrations')} 
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'registrations' ? 'bg-[var(--green)] text-black' : 'text-gray-400 hover:text-white'}`}
        >
          Registrations & Invites
        </button>
      </div>

      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">All Session Events</h2>
            <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-[var(--green)] text-black px-4 py-2 rounded-lg font-bold hover:bg-green-400">
              <Plus className="w-4 h-4" /> New Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-[#111] border border-white/10 rounded-xl p-6 relative">
                {event.isActive && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-[var(--green)] bg-green-500/10 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3" /> ACTIVE
                  </span>
                )}
                <h3 className="text-lg font-bold text-white pr-20 mb-2 truncate">{event.title}</h3>
                <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2">{event.description}</p>
                <div className="text-sm text-gray-300 mb-6 space-y-1">
                  <div>📅 {new Date(event.sessionDate).toLocaleString()}</div>
                  <div>🎯 {event.targetCategory || 'Any'}</div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                  <button onClick={() => handleOpenForm(event)} className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="flex justify-center items-center w-10 text-red-400 bg-red-400/5 hover:bg-red-400/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="space-y-6">
          {/* Filters & Actions Bar */}
          <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex flex-wrap gap-4 items-end justify-between">
            <div className="flex gap-4 flex-1">
              <div className="flex-1 max-w-xs">
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Select Event</label>
                <select 
                  value={selectedEventId} 
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--green)]"
                >
                  {events.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
                </select>
              </div>
              <div className="flex-1 max-w-xs">
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Filter Category</label>
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--green)]"
                >
                  <option value="All">All Categories</option>
                  <option value="General Fitness">General Fitness</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Heart Patient">Heart Patient</option>
                  <option value="Pregnant / Postpartum">Pregnant / Postpartum</option>
                  <option value="Diabetes Management">Diabetes Management</option>
                  <option value="Injury Rehabilitation">Injury Rehabilitation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="block text-2xl font-bold text-white">{filteredRegs.length}</span>
                <span className="text-xs text-gray-400 uppercase">Found</span>
              </div>
              <button 
                onClick={handleSendInvites}
                disabled={loading || uninvitedCount === 0}
                className="flex items-center gap-2 bg-[var(--green)] text-black px-6 py-2 h-10 rounded-lg font-bold hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="w-4 h-4" />
                {loading ? 'Sending...' : `Send Invite (${uninvitedCount})`}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#1A1A1A] text-gray-300">
                  <tr>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">WhatsApp / Email</th>
                    <th className="px-6 py-4 font-medium">Demographics</th>
                    <th className="px-6 py-4 font-medium">Health Category</th>
                    <th className="px-6 py-4 font-medium">Branch</th>
                    <th className="px-6 py-4 font-medium text-center">Invited?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredRegs.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{reg.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-white">{reg.whatsappNumber}</div>
                        <div className="text-xs">{reg.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {reg.age} yrs, {reg.gender}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs">
                          {reg.healthCategory === 'Other' ? reg.otherCategory : reg.healthCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4">{reg.preferredBranch}</td>
                      <td className="px-6 py-4 text-center">
                        {reg.isInvited ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredRegs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No registrations found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Event' : 'Create Session Event'}</h3>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Title *</label>
                  <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white h-24"></textarea>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Session Date & Time *</label>
                  <input required type="datetime-local" value={form.sessionDate} onChange={e => setForm({...form, sessionDate: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Default Target Category</label>
                  <input type="text" value={form.targetCategory} onChange={e => setForm({...form, targetCategory: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="e.g. Heart Patient" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Invite Link (Zoom/Meet/WhatsApp)</label>
                  <input type="url" value={form.inviteLink} onChange={e => setForm({...form, inviteLink: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="https://" />
                  <p className="text-xs text-gray-500 mt-1">This link will be sent in the email to selected users.</p>
                </div>

                <div className="col-span-2 pt-4 border-t border-white/10">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-5 h-5 accent-[var(--green)]" />
                    <span className="text-white font-bold">Set as Active (Visible on public page)</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-8">Only one session can be active at a time. Checking this will deactivate others.</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-bold transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[var(--green)] hover:bg-green-400 text-black py-3 rounded-lg font-bold transition-colors">
                  {loading ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
