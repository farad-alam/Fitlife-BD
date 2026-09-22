'use client';

import { useState } from 'react';
import { submitSessionRegistration } from './actions';

export default function FreeSessionClient({ session, branches }: { session: any, branches: any[] }) {
  const [form, setForm] = useState({
    name: '',
    whatsappNumber: '',
    email: '',
    age: '',
    gender: 'Male',
    healthCategory: 'General Fitness',
    otherCategory: '',
    fitnessGoal: '',
    preferredBranch: branches.length > 0 ? branches[0].name : '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await submitSessionRegistration({
        sessionEventId: session.id,
        name: form.name,
        whatsappNumber: form.whatsappNumber,
        email: form.email,
        age: parseInt(form.age, 10),
        gender: form.gender,
        healthCategory: form.healthCategory,
        otherCategory: form.healthCategory === 'Other' ? form.otherCategory : undefined,
        fitnessGoal: form.fitnessGoal,
        preferredBranch: form.preferredBranch,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-green-500/20 text-[var(--green)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
        <p className="text-gray-400">
          Your spot has been reserved. If you match the session criteria, our coaches will send you the invite link directly to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number *</label>
          <input
            required
            type="tel"
            pattern="[0-9+\- ]+"
            title="Only numbers, plus sign, spaces, and dashes are allowed"
            value={form.whatsappNumber}
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors"
            placeholder="+8801XXXXXXXXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors"
            placeholder="john@example.com"
          />
          <p className="text-xs text-gray-500 mt-1">We'll send the invite link here.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Age *</label>
          <input
            required
            type="number"
            min="10"
            max="100"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors"
            placeholder="25"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Gender *</label>
          <div className="flex gap-4 mt-3">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g} className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="accent-[var(--green)] w-4 h-4"
                />
                <span className="text-sm">{g}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Health Category *</label>
        <select
          required
          value={form.healthCategory}
          onChange={(e) => setForm({ ...form, healthCategory: e.target.value })}
          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors"
        >
          <option value="General Fitness">General Fitness</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Heart Patient">Heart Patient</option>
          <option value="Pregnant / Postpartum">Pregnant / Postpartum</option>
          <option value="Diabetes Management">Diabetes Management</option>
          <option value="Injury Rehabilitation">Injury Rehabilitation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {form.healthCategory === 'Other' && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Please specify *</label>
          <input
            required
            type="text"
            value={form.otherCategory}
            onChange={(e) => setForm({ ...form, otherCategory: e.target.value })}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors"
            placeholder="Type here..."
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Your Fitness Goal (Optional)</label>
        <textarea
          value={form.fitnessGoal}
          onChange={(e) => setForm({ ...form, fitnessGoal: e.target.value })}
          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--green)] transition-colors h-24 resize-none"
          placeholder="Tell us what you want to achieve..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-4 text-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Register for Session'}
      </button>
    </form>
  );
}
