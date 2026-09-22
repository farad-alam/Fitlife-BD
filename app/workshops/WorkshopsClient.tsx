'use client';

import { useState } from 'react';
import Image from 'next/image';
import { submitWorkshopRegistration } from './actions';

export default function WorkshopsClient({ workshops, paymentMethodsMap, branches }: { workshops: any[], paymentMethodsMap: Record<string, any[]>, branches: any[] }) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment & Submit, 3: Success

  const [form, setForm] = useState({
    name: '',
    whatsappNumber: '',
    email: '',
    preferredBranch: branches.length > 0 ? branches[0].name : '',
    paymentOperator: '',
    transactionId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setStep(1);
    setForm({ ...form, paymentOperator: '' });
    setError('');
  };

  const closeModal = () => {
    setSelectedWorkshop(null);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.paymentOperator) {
      setError('Please select a payment method');
      return;
    }
    
    setLoading(true);
    setError('');

    const methods = paymentMethodsMap[selectedWorkshop.id] || [];
    const selectedMethod = methods.find(m => m.operator === form.paymentOperator);

    try {
      const res = await submitWorkshopRegistration({
        workshopId: selectedWorkshop.id,
        name: form.name,
        whatsappNumber: form.whatsappNumber,
        email: form.email,
        preferredBranch: form.preferredBranch,
        paymentOperator: form.paymentOperator,
        paymentToNumber: selectedMethod ? selectedMethod.accountNumber : '',
        transactionId: form.transactionId,
      });

      if (res.success) {
        setStep(3);
      } else {
        setError(res.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (workshops.length === 0) {
    return (
      <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">No Active Workshops</h2>
        <p className="text-gray-400">Please check back later for our next workshop announcements.</p>
      </div>
    );
  }

  return (
    <>
      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <div key={workshop.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
            <div className="h-48 relative bg-black">
              {workshop.imageUrl ? (
                <Image src={workshop.imageUrl} alt={workshop.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold uppercase tracking-widest text-xl">
                  FITLIFE WORKSHOP
                </div>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-1">{workshop.title}</h3>
              <p className="text-gray-400 text-sm mb-4">Instructor: {workshop.instructor}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-300 gap-2">
                  <span>📅</span> {new Date(workshop.workshopDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center text-sm text-gray-300 gap-2">
                  <span>⏱️</span> {workshop.duration}
                </div>
                <div className="flex items-center text-sm text-gray-300 gap-2">
                  <span>💺</span> {workshop.totalSeats} seats total
                </div>
                <div className="flex items-center text-sm text-[var(--green)] font-bold gap-2">
                  <span>💰</span> {workshop.price}
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 line-clamp-3">{workshop.description}</p>
              
              <button 
                onClick={() => handleOpenModal(workshop)}
                className="mt-auto w-full btn-outline justify-center py-3"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#111] p-6 border-b border-white/10 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-white truncate pr-4">{selectedWorkshop.title}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white p-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white/5 p-4 rounded-lg mb-6 flex justify-between items-center">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Registration Fee</span>
                      <span className="text-xl font-bold text-[var(--green)]">{selectedWorkshop.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Date</span>
                      <span className="text-sm font-medium text-white">{new Date(selectedWorkshop.workshopDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                    <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number *</label>
                    <input required type="tel" value={form.whatsappNumber} onChange={e => setForm({...form, whatsappNumber: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Branch *</label>
                    <select required value={form.preferredBranch} onChange={e => setForm({...form, preferredBranch: e.target.value})} className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]">
                      {branches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full btn-primary py-4 justify-center text-lg mt-4">
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-white">
                      ← Back
                    </button>
                    <h4 className="text-lg font-bold text-white">Payment Details</h4>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-400">1. Select Payment Method</label>
                    <div className="flex flex-wrap gap-3">
                      {(paymentMethodsMap[selectedWorkshop.id] || []).map(method => (
                        <label key={method.id} className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${form.paymentOperator === method.operator ? 'border-[var(--green)] bg-green-500/5' : 'border-white/10 bg-[#1A1A1A] hover:border-white/30'}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="operator" 
                              value={method.operator}
                              checked={form.paymentOperator === method.operator}
                              onChange={() => setForm({...form, paymentOperator: method.operator})}
                              className="accent-[var(--green)] w-4 h-4"
                            />
                            <span className="font-bold text-white">{method.operator}</span>
                          </div>
                        </label>
                      ))}
                      {(!paymentMethodsMap[selectedWorkshop.id] || paymentMethodsMap[selectedWorkshop.id].length === 0) && (
                        <p className="text-sm text-red-400">No payment methods configured for this workshop.</p>
                      )}
                    </div>
                  </div>

                  {form.paymentOperator && (
                    <div className="bg-[#1A1A1A] border border-[var(--green)]/30 rounded-xl p-5 text-center animate-in fade-in zoom-in-95">
                      <p className="text-sm text-gray-400 mb-2">Send <strong className="text-white">{selectedWorkshop.price}</strong> to this {form.paymentOperator} number:</p>
                      <p className="text-3xl font-display font-black tracking-widest text-[var(--green)] mb-1">
                        {paymentMethodsMap[selectedWorkshop.id].find(m => m.operator === form.paymentOperator)?.accountNumber}
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">
                        {paymentMethodsMap[selectedWorkshop.id].find(m => m.operator === form.paymentOperator)?.accountType} Account
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-sm font-medium text-gray-400 mb-2">2. Enter Transaction ID *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.transactionId} 
                      onChange={e => setForm({...form, transactionId: e.target.value})} 
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] uppercase" 
                      placeholder="e.g. 8AB9C3D" 
                    />
                    <p className="text-xs text-gray-500 mt-2">After sending money, enter the Transaction ID you received.</p>
                  </div>

                  <button type="submit" disabled={loading} className="w-full btn-primary py-4 justify-center text-lg mt-4 disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </form>
              )}

              {step === 3 && (
                <div className="text-center py-8 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-green-500/20 text-[var(--green)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Registration Submitted!</h3>
                  <p className="text-gray-400 mb-6">
                    Your payment is currently under review. We'll confirm your registration within 24 hours via WhatsApp.
                  </p>
                  <button onClick={closeModal} className="btn-outline justify-center w-full py-3">
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
