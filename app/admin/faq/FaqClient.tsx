'use client';

import { useState } from 'react';
import { addFaq, updateFaq, deleteFaq } from './actions';

type Faq = {
  id: string;
  question: string;
  answer: string;
  isVisible: boolean | null;
};

export function FaqClient({ initialFaqs }: { initialFaqs: Faq[] }) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [savingId, setSavingId] = useState<string | null>(null);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (id: string, field: keyof Faq, value: any) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleSave = async (faq: Faq) => {
    setSavingId(faq.id);
    await updateFaq(faq.id, faq.question, faq.answer, faq.isVisible ?? true);
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setSavingId(id);
      await deleteFaq(id);
      setFaqs(faqs.filter(f => f.id !== id));
      setSavingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    setIsAdding(true);
    await addFaq(newQuestion, newAnswer);
    // Reload the page to get the new list with generated IDs
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Add New FAQ Form */}
      <form onSubmit={handleAdd} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 space-y-4">
        <h3 className="text-lg font-bold text-white mb-2">Add New FAQ</h3>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Answer</label>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50 min-h-[100px]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isAdding}
          className="px-6 py-2.5 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add FAQ'}
        </button>
      </form>

      {/* Existing FAQs */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={faq.isVisible ?? true}
                  onChange={(e) => handleChange(faq.id, 'isVisible', e.target.checked)}
                  className="accent-[#1AFF6B]"
                />
                Visible on public site
              </label>
              <button
                onClick={() => handleDelete(faq.id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
                disabled={savingId === faq.id}
              >
                Delete
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleChange(faq.id, 'question', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Answer</label>
              <textarea
                value={faq.answer}
                onChange={(e) => handleChange(faq.id, 'answer', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50 min-h-[100px]"
              />
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleSave(faq)}
                disabled={savingId === faq.id}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {savingId === faq.id ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
