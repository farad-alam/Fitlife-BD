'use client';

import { useState } from 'react';
import { createWorkshop, updateWorkshop, deleteWorkshop, addPaymentMethod, deletePaymentMethod, updatePaymentStatus } from './actions';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, CreditCard, Check, X } from 'lucide-react';
import Image from 'next/image';

export default function WorkshopsClient({ initialWorkshops, initialRegistrations, initialPaymentMethods }: { initialWorkshops: any[], initialRegistrations: any[], initialPaymentMethods: any[] }) {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  
  const [activeTab, setActiveTab] = useState('workshops'); // 'workshops' | 'registrations'

  // Workshop Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '', description: '', instructor: '', workshopDate: '', duration: '', price: '', totalSeats: '', imageUrl: '', isActive: false, isFree: false
  });

  // Payment Method Form
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ operator: 'bKash', accountNumber: '', accountType: 'Personal' });

  // Registration Filter
  const [filterWorkshopId, setFilterWorkshopId] = useState<string>(workshops[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  const [loading, setLoading] = useState(false);

  // Computed
  const filteredRegs = registrations.filter(r => 
    (filterWorkshopId === 'All' || r.workshopId === filterWorkshopId) && 
    (filterStatus === 'All' || r.paymentStatus === filterStatus)
  );

  const handleOpenForm = (workshop?: any) => {
    if (workshop) {
      setEditingId(workshop.id);
      setForm({
        title: workshop.title,
        description: workshop.description || '',
        instructor: workshop.instructor || '',
        workshopDate: new Date(workshop.workshopDate).toISOString().slice(0, 16),
        duration: workshop.duration || '',
        price: workshop.price || '',
        totalSeats: workshop.totalSeats.toString(),
        imageUrl: workshop.imageUrl || '',
        isActive: workshop.isActive,
        isFree: workshop.isFree || false,
      });
    } else {
      setEditingId(null);
      setForm({
        title: '', description: '', instructor: '', workshopDate: '', duration: '', price: '', totalSeats: '', imageUrl: '', isActive: false, isFree: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, totalSeats: parseInt(form.totalSeats, 10), workshopDate: new Date(form.workshopDate) };

    if (editingId) {
      await updateWorkshop(editingId, payload);
    } else {
      await createWorkshop(payload);
    }
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure? This will delete all registrations and payment methods linked to this workshop.')) {
      await deleteWorkshop(id);
      window.location.reload();
    }
  };

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addPaymentMethod(paymentForm.operator, paymentForm.accountNumber, paymentForm.accountType);
    window.location.reload();
  };

  const handleDeletePaymentMethod = async (id: string) => {
    if (confirm('Delete this payment number?')) {
      await deletePaymentMethod(id);
      window.location.reload();
    }
  };

  const handleStatusChange = async (regId: string, newStatus: string) => {
    if (confirm(`Change status to ${newStatus}?`)) {
      await updatePaymentStatus(regId, newStatus);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
        <button onClick={() => setActiveTab('workshops')} className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'workshops' ? 'bg-[var(--green)] text-black' : 'text-gray-400 hover:text-white'}`}>
          Manage Workshops
        </button>
        <button onClick={() => setActiveTab('registrations')} className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'registrations' ? 'bg-[var(--green)] text-black' : 'text-gray-400 hover:text-white'}`}>
          Registrations & Payments
        </button>
      </div>

      {activeTab === 'workshops' && (
        <div className="space-y-6">
          <div className="bg-[#111] border border-white/10 p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard className="w-5 h-5 text-[var(--green)]" /> Global Payment Numbers</h2>
              <button onClick={() => setIsPaymentModalOpen(true)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 text-sm rounded-lg transition-colors">
                <Plus className="w-4 h-4" /> Add Number
              </button>
            </div>
            {paymentMethods.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No global payment numbers configured. Paid workshops won't be able to receive payments.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="bg-[#1A1A1A] border border-white/5 p-4 rounded-lg flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white mb-1">{method.operator}</div>
                      <div className="text-gray-400 font-mono text-sm">{method.accountNumber}</div>
                      <div className="text-xs text-gray-500 uppercase mt-1">{method.accountType}</div>
                    </div>
                    <button onClick={() => handleDeletePaymentMethod(method.id)} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">All Workshops</h2>
            <button onClick={() => handleOpenForm()} className="flex items-center gap-2 bg-[var(--green)] text-black px-4 py-2 rounded-lg font-bold hover:bg-green-400">
              <Plus className="w-4 h-4" /> New Workshop
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {workshops.map(workshop => (
              <div key={workshop.id} className="bg-[#111] border border-white/10 rounded-xl p-6 relative flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="h-32 relative bg-black rounded-lg overflow-hidden mb-4 border border-white/10">
                    {workshop.imageUrl ? (
                      <Image src={workshop.imageUrl} alt={workshop.title} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold uppercase text-xs text-center p-4">No Cover Image</div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenForm(workshop)} className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm transition-colors">
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={() => handleDelete(workshop.id)} className="flex justify-center items-center w-10 text-red-400 bg-red-400/5 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white pr-4">{workshop.title}</h3>
                    {workshop.isActive ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--green)] bg-green-500/10 px-2 py-1 rounded">ACTIVE</span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-500/10 px-2 py-1 rounded">INACTIVE</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">
                    <div><span className="text-gray-500">Instructor:</span> {workshop.instructor}</div>
                    <div><span className="text-gray-500">Date:</span> {new Date(workshop.workshopDate).toLocaleDateString()}</div>
                    <div><span className="text-gray-500">Duration:</span> {workshop.duration}</div>
                    <div><span className="text-gray-500">Price:</span> <span className="text-[var(--green)] font-bold">{workshop.isFree ? 'FREE' : workshop.price}</span></div>
                    <div><span className="text-gray-500">Seats:</span> {workshop.totalSeats}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="space-y-6">
          <div className="bg-[#111] border border-white/10 p-4 rounded-xl flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Filter Workshop</label>
              <select value={filterWorkshopId} onChange={(e) => setFilterWorkshopId(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white">
                <option value="All">All Workshops</option>
                {workshops.map(w => <option key={w.id} value={w.id}>{w.title}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Payment Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white">
                <option value="All">All Statuses</option>
                <option value="pending">🟡 Pending</option>
                <option value="confirmed">🟢 Confirmed</option>
                <option value="rejected">🔴 Rejected</option>
              </select>
            </div>
            <div className="text-right ml-auto px-4">
              <span className="block text-2xl font-bold text-white">{filteredRegs.length}</span>
              <span className="text-xs text-gray-400 uppercase">Found</span>
            </div>
          </div>

          <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
                <thead className="bg-[#1A1A1A] text-gray-300">
                  <tr>
                    <th className="px-6 py-4 font-medium">User / Date</th>
                    <th className="px-6 py-4 font-medium">Contact</th>
                    <th className="px-6 py-4 font-medium">Payment Info</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredRegs.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{reg.name}</div>
                        <div className="text-xs">{new Date(reg.submittedAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">{reg.whatsappNumber}</div>
                        <div className="text-xs text-gray-500">{reg.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {reg.paymentOperator ? (
                          <>
                            <div className="flex gap-2 items-center mb-1">
                              <span className="font-bold text-white text-xs">{reg.paymentOperator}</span>
                              <span className="text-xs">to {reg.paymentToNumber}</span>
                            </div>
                            <div className="text-xs bg-black px-2 py-1 rounded border border-white/10 inline-block font-mono tracking-widest text-[var(--green)] mb-1">
                              TXN: {reg.transactionId}
                            </div>
                            {reg.senderPhoneNumber && (
                              <div className="text-xs text-gray-400">
                                Sender: <span className="text-white">{reg.senderPhoneNumber}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-gray-500 italic">Free Workshop</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {reg.paymentStatus === 'confirmed' && <span className="inline-flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs font-bold"><CheckCircle className="w-3 h-3"/> Confirmed</span>}
                        {reg.paymentStatus === 'pending' && <span className="inline-flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs font-bold">🟡 Pending</span>}
                        {reg.paymentStatus === 'rejected' && <span className="inline-flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs font-bold"><XCircle className="w-3 h-3"/> Rejected</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {reg.paymentStatus !== 'confirmed' && (
                            <button onClick={() => handleStatusChange(reg.id, 'confirmed')} className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded" title="Confirm Payment">
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {reg.paymentStatus !== 'rejected' && (
                            <button onClick={() => handleStatusChange(reg.id, 'rejected')} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded" title="Reject Payment">
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          {reg.paymentStatus !== 'pending' && (
                            <button onClick={() => handleStatusChange(reg.id, 'pending')} className="text-xs underline text-gray-500 hover:text-white px-2">
                              Reset
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRegs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Workshop Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Workshop' : 'Create Workshop'}</h3>
            <form onSubmit={handleSaveWorkshop} className="space-y-4">
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
                  <label className="block text-sm text-gray-400 mb-1">Instructor Name *</label>
                  <input required type="text" value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Workshop Date & Time *</label>
                  <input required type="datetime-local" value={form.workshopDate} onChange={e => setForm({...form, workshopDate: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration (e.g. 3 hours) *</label>
                  <input required type="text" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price (e.g. ৳1,500) *</label>
                  <input required type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Total Seats *</label>
                  <input required type="number" min="1" value={form.totalSeats} onChange={e => setForm({...form, totalSeats: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Image URL (Optional)</label>
                  <input type="url" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="https://" />
                </div>

                <div className="col-span-2 pt-4 border-t border-white/10 flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-5 h-5 accent-[var(--green)]" />
                    <span className="text-white font-bold">Set as Active</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.isFree} onChange={e => setForm({...form, isFree: e.target.checked})} className="w-5 h-5 accent-[var(--green)]" />
                    <span className="text-white font-bold">Free Workshop</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-bold transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[var(--green)] hover:bg-green-400 text-black py-3 rounded-lg font-bold transition-colors">
                  {loading ? 'Saving...' : 'Save Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Add Payment Number</h3>
            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Operator *</label>
                <select value={paymentForm.operator} onChange={e => setPaymentForm({...paymentForm, operator: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white">
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Upay">Upay</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Account Number *</label>
                <input required type="tel" value={paymentForm.accountNumber} onChange={e => setPaymentForm({...paymentForm, accountNumber: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="017..." />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Account Type *</label>
                <select value={paymentForm.accountType} onChange={e => setPaymentForm({...paymentForm, accountType: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-2 text-white">
                  <option value="Personal">Personal</option>
                  <option value="Agent">Agent</option>
                  <option value="Merchant">Merchant</option>
                </select>
              </div>

              <div className="flex gap-4 mt-8 pt-4">
                <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-bold transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[var(--green)] hover:bg-green-400 text-black py-2 rounded-lg font-bold transition-colors">
                  {loading ? 'Adding...' : 'Add Number'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
