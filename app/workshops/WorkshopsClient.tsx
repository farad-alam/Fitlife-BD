'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { submitWorkshopRegistration } from './actions';

const USER_INFO_STORAGE_KEY = 'fitlife_user_workshop_registration_info';

export default function WorkshopsClient({ workshops, globalPaymentMethods }: { workshops: any[], globalPaymentMethods: any[] }) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment & Submit, 3: Success

  const [form, setForm] = useState({
    name: '',
    whatsappNumber: '',
    email: '',
    senderPhoneNumber: '',
    paymentOperator: '',
    transactionId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-load saved user registration details from localStorage
  useEffect(() => {
    try {
      const savedInfo = localStorage.getItem(USER_INFO_STORAGE_KEY);
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        setForm(prev => ({
          ...prev,
          name: parsed.name || prev.name,
          whatsappNumber: parsed.whatsappNumber || prev.whatsappNumber,
          email: parsed.email || prev.email,
        }));
      }
    } catch (e) {
      console.error('Failed to load saved form state:', e);
    }
  }, []);

  // Save details to localStorage
  const persistUserInfo = (name: string, whatsappNumber: string, email: string) => {
    try {
      localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify({ name, whatsappNumber, email }));
    } catch (e) {
      console.error('Failed to save form state:', e);
    }
  };

  const handleOpenModal = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setStep(1);
    setForm(prev => ({ ...prev, paymentOperator: '', senderPhoneNumber: '', transactionId: '' }));
    setError('');

    // Ensure latest saved data is loaded into form fields
    try {
      const savedInfo = localStorage.getItem(USER_INFO_STORAGE_KEY);
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        setForm(prev => ({
          ...prev,
          name: parsed.name || prev.name,
          whatsappNumber: parsed.whatsappNumber || prev.whatsappNumber,
          email: parsed.email || prev.email,
          paymentOperator: '',
        }));
      }
    } catch (e) {}
  };

  const closeModal = () => {
    setSelectedWorkshop(null);
  };

  const submitRegistration = async (isFree: boolean) => {
    setLoading(true);
    setError('');

    // Save info to localStorage for future registrations
    persistUserInfo(form.name, form.whatsappNumber, form.email);

    const selectedMethod = globalPaymentMethods.find(m => m.operator === form.paymentOperator);

    try {
      const res = await submitWorkshopRegistration({
        workshopId: selectedWorkshop.id,
        name: form.name,
        whatsappNumber: form.whatsappNumber,
        email: form.email,
        senderPhoneNumber: isFree ? null : form.senderPhoneNumber,
        paymentOperator: isFree ? null : form.paymentOperator,
        paymentToNumber: isFree ? null : (selectedMethod ? selectedMethod.accountNumber : ''),
        transactionId: isFree ? null : form.transactionId,
        paymentStatus: isFree ? 'confirmed' : 'pending',
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

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate WhatsApp number strictly (digits, +, spaces, dashes only, min 8 digits)
    const digitsOnly = form.whatsappNumber.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 8) {
      setError('Please enter a valid WhatsApp number (must contain at least 8 digits).');
      return;
    }

    // Persist details on step 1 success
    persistUserInfo(form.name, form.whatsappNumber, form.email);

    if (selectedWorkshop.isFree) {
      await submitRegistration(true);
    } else {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.paymentOperator) {
      setError('Please select a payment method');
      return;
    }
    if (!form.senderPhoneNumber) {
      setError('Please provide the phone number you sent money from');
      return;
    }

    const senderDigits = form.senderPhoneNumber.replace(/[^0-9]/g, '');
    if (senderDigits.length < 8) {
      setError('Please enter a valid sender phone number (must contain at least 8 digits).');
      return;
    }
    
    await submitRegistration(false);
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
        {workshops.map(workshop => {
          const isFree = workshop.isFree;
          return (
            <div 
              key={workshop.id} 
              className={`rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 relative ${
                isFree 
                  ? 'bg-gradient-to-b from-[#14291c] to-[#111] border-2 border-[var(--green)]/70 shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                  : 'bg-[#111] border border-white/10'
              }`}
            >
              {/* Distinctive Free Badge */}
              {isFree && (
                <div className="absolute top-3 right-3 z-20 bg-[var(--green)] text-black font-black px-3 py-1 text-xs rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  FREE WORKSHOP
                </div>
              )}

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
                  <div className="flex items-center text-sm font-bold gap-2">
                    <span>💰</span> 
                    {isFree ? (
                      <span className="px-2 py-0.5 bg-[var(--green)] text-black rounded text-xs font-black tracking-wider uppercase">
                        FREE ACCESS
                      </span>
                    ) : (
                      <span className="text-[var(--green)]">{workshop.price}</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">{workshop.description}</p>
                
                <button 
                  onClick={() => handleOpenModal(workshop)}
                  className={`mt-auto w-full py-3 font-bold rounded-lg transition-colors flex justify-center items-center ${
                    isFree 
                      ? 'bg-[var(--green)] text-black hover:bg-green-400 shadow-md' 
                      : 'btn-outline'
                  }`}
                >
                  {isFree ? 'Join Free Workshop' : 'Register Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#111] p-6 border-b border-white/10 flex justify-between items-center z-10">
              <div className="flex items-center gap-3 truncate pr-4">
                <h3 className="text-xl font-bold text-white truncate">{selectedWorkshop.title}</h3>
                {selectedWorkshop.isFree && (
                  <span className="bg-[var(--green)] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">Free</span>
                )}
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-white p-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
                  {error}
                </div>
              )}

              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-white/5 p-4 rounded-lg mb-6 flex justify-between items-center">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Registration Fee</span>
                      <span className="text-xl font-bold text-[var(--green)]">{selectedWorkshop.isFree ? 'FREE' : selectedWorkshop.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Date</span>
                      <span className="text-sm font-medium text-white">{new Date(selectedWorkshop.workshopDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.name} 
                      onChange={e => {
                        const val = e.target.value;
                        setForm(f => ({ ...f, name: val }));
                        persistUserInfo(val, form.whatsappNumber, form.email);
                      }} 
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" 
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number * (Numbers only)</label>
                    <input 
                      required 
                      type="tel" 
                      pattern="[0-9+\s-]{8,15}"
                      title="Please enter a valid phone number (digits only)"
                      value={form.whatsappNumber} 
                      onChange={e => {
                        // Restrict non-numeric text input
                        const val = e.target.value.replace(/[^0-9+\s-]/g, '');
                        setForm(f => ({ ...f, whatsappNumber: val }));
                        persistUserInfo(form.name, val, form.email);
                      }} 
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" 
                      placeholder="e.g. 01712345678"
                    />
                    <p className="text-xs text-gray-500 mt-1">We will send workshop details to this WhatsApp number.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      value={form.email} 
                      onChange={e => {
                        const val = e.target.value;
                        setForm(f => ({ ...f, email: val }));
                        persistUserInfo(form.name, form.whatsappNumber, val);
                      }} 
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full btn-primary py-4 justify-center text-lg mt-4 disabled:opacity-50">
                    {loading ? 'Processing...' : (selectedWorkshop.isFree ? 'Complete Registration' : 'Continue to Payment')}
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

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-400">1. Select Payment Method</label>
                    <div className="flex flex-wrap gap-3">
                      {globalPaymentMethods.map(method => (
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
                      {globalPaymentMethods.length === 0 && (
                        <p className="text-sm text-red-400">No payment methods configured globally.</p>
                      )}
                    </div>
                  </div>

                  {form.paymentOperator && (
                    <div className="bg-[#1A1A1A] border border-[var(--green)]/30 rounded-xl p-5 text-center animate-in fade-in zoom-in-95">
                      <p className="text-sm text-gray-400 mb-2">Send <strong className="text-white">{selectedWorkshop.price}</strong> to this {form.paymentOperator} number:</p>
                      <p className="text-3xl font-display font-black tracking-widest text-[var(--green)] mb-1">
                        {globalPaymentMethods.find(m => m.operator === form.paymentOperator)?.accountNumber}
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">
                        {globalPaymentMethods.find(m => m.operator === form.paymentOperator)?.accountType} Account
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">2. Sender Phone Number * (Numbers only)</label>
                      <input 
                        required 
                        type="tel" 
                        pattern="[0-9+\s-]{8,15}"
                        title="Please enter a valid phone number (digits only)"
                        value={form.senderPhoneNumber} 
                        onChange={e => {
                          const val = e.target.value.replace(/[^0-9+\s-]/g, '');
                          setForm({...form, senderPhoneNumber: val});
                        }} 
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)]" 
                        placeholder="The number you sent money from" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">3. Enter Transaction ID *</label>
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
                    {selectedWorkshop.isFree 
                      ? "Your registration for this free workshop is confirmed! We'll send you further details via WhatsApp."
                      : "Your payment is currently under review. We'll confirm your registration within 24 hours via WhatsApp."}
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

