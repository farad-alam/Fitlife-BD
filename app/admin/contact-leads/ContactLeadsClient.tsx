'use client';

import { useState } from 'react';
import { markLeadAsRead, saveLeadNotes, deleteLead } from './actions';

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  submittedAt: Date;
  isRead: boolean | null;
  notes: string | null;
};

export function ContactLeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(leads[0]?.id || null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');

  const activeLead = leads.find(l => l.id === activeLeadId);

  const handleSelectLead = async (lead: Lead) => {
    setActiveLeadId(lead.id);
    setCurrentNotes(lead.notes || '');
    setEditingNotes(false);
    
    if (!lead.isRead) {
      await markLeadAsRead(lead.id, true);
      setLeads(leads.map(l => l.id === lead.id ? { ...l, isRead: true } : l));
    }
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    await saveLeadNotes(activeLead.id, currentNotes);
    setLeads(leads.map(l => l.id === activeLead.id ? { ...l, notes: currentNotes } : l));
    setEditingNotes(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(id);
      setLeads(leads.filter(l => l.id !== id));
      if (activeLeadId === id) {
        setActiveLeadId(null);
      }
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    await markLeadAsRead(id, !currentStatus);
    setLeads(leads.map(l => l.id === id ? { ...l, isRead: !currentStatus } : l));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
      {/* Sidebar: List of leads */}
      <div className="w-full lg:w-1/3 bg-[#111] border border-white/5 rounded-xl overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-white/5 sticky top-0 bg-[#111] z-10">
          <h2 className="text-lg font-bold text-white">Inbox ({leads.length})</h2>
        </div>
        <div className="divide-y divide-white/5">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No leads found.</div>
          ) : (
            leads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => handleSelectLead(lead)}
                className={`w-full text-left p-4 transition-colors hover:bg-white/5 ${
                  activeLeadId === lead.id ? 'bg-white/10' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold ${lead.isRead ? 'text-gray-300' : 'text-white'}`}>
                    {lead.name}
                  </h3>
                  {!lead.isRead && (
                    <span className="w-2.5 h-2.5 bg-[#1AFF6B] rounded-full mt-1"></span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{lead.phone}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(lead.submittedAt).toLocaleDateString()}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content: Lead Details */}
      <div className="w-full lg:w-2/3 bg-[#111] border border-white/5 rounded-xl flex flex-col relative overflow-y-auto">
        {activeLead ? (
          <div className="p-8">
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/5">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{activeLead.name}</h2>
                <div className="flex gap-4 text-sm text-gray-400">
                  <p>📞 {activeLead.phone}</p>
                  {activeLead.email && <p>✉️ {activeLead.email}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleReadStatus(activeLead.id, activeLead.isRead || false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
                >
                  Mark as {activeLead.isRead ? 'Unread' : 'Read'}
                </button>
                <button
                  onClick={() => handleDelete(activeLead.id)}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Message</h3>
              <div className="bg-[#1A1A1A] p-6 rounded-lg border border-white/5 text-gray-300 whitespace-pre-wrap">
                {activeLead.message || <span className="text-gray-500 italic">No message provided.</span>}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase">Internal Notes</h3>
                {!editingNotes ? (
                  <button
                    onClick={() => setEditingNotes(true)}
                    className="text-xs text-[#1AFF6B] hover:underline"
                  >
                    Edit Notes
                  </button>
                ) : (
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs bg-[#1AFF6B] text-black px-3 py-1 rounded hover:bg-[#15e65d] transition-colors"
                  >
                    Save Notes
                  </button>
                )}
              </div>
              
              {editingNotes ? (
                <textarea
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[#1AFF6B]/50 min-h-[120px]"
                  placeholder="Add private notes about this lead..."
                />
              ) : (
                <div className="bg-[#1A1A1A] p-4 rounded-lg border border-white/5 text-gray-300 min-h-[120px] whitespace-pre-wrap">
                  {activeLead.notes || <span className="text-gray-500 italic">No notes yet. Click 'Edit Notes' to add some.</span>}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Select a lead to view details
          </div>
        )}
      </div>
    </div>
  );
}
