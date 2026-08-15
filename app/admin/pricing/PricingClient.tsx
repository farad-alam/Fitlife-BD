'use client';

import { useState } from 'react';
import { updatePricingPlan } from './actions';

type PricingPlan = {
  id: string;
  name: string;
  duration: string | null;
  bestFor: string | null;
  price: string;
  features: string[];
  isHighlighted: boolean | null;
  isActive: boolean | null;
  sortOrder: number | null;
};

export function PricingClient({ initialPlans }: { initialPlans: PricingPlan[] }) {
  const [plans, setPlans] = useState<PricingPlan[]>(initialPlans);
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleChange = (id: string, field: keyof PricingPlan, value: any) => {
    setPlans(plans.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleFeatureChange = (id: string, index: number, value: string) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        const newFeatures = [...p.features];
        newFeatures[index] = value;
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };

  const addFeature = (id: string) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, features: [...p.features, 'New Feature'] };
      }
      return p;
    }));
  };

  const removeFeature = (id: string, index: number) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, features: p.features.filter((_, i) => i !== index) };
      }
      return p;
    }));
  };

  const handleSave = async (plan: PricingPlan) => {
    setSavingId(plan.id);
    await updatePricingPlan(
      plan.id,
      plan.name,
      plan.price,
      plan.duration || '',
      plan.bestFor || '',
      plan.features,
      plan.isHighlighted || false,
      plan.isActive || true
    );
    setSavingId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 flex flex-col">
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={plan.name}
                onChange={(e) => handleChange(plan.id, 'name', e.target.value)}
                className="bg-transparent text-xl font-bold text-white focus:outline-none focus:border-b focus:border-[#1AFF6B]"
              />
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={plan.isHighlighted || false}
                  onChange={(e) => handleChange(plan.id, 'isHighlighted', e.target.checked)}
                  className="accent-[#1AFF6B]"
                />
                Featured
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Price</label>
              <input
                type="text"
                value={plan.price}
                onChange={(e) => handleChange(plan.id, 'price', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Duration</label>
              <input
                type="text"
                value={plan.duration || ''}
                onChange={(e) => handleChange(plan.id, 'duration', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Best For</label>
              <input
                type="text"
                value={plan.bestFor || ''}
                onChange={(e) => handleChange(plan.id, 'bestFor', e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1AFF6B]/50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase">Features</label>
                <button
                  onClick={() => addFeature(plan.id)}
                  className="text-xs text-[#1AFF6B] hover:underline"
                >
                  + Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(plan.id, i, e.target.value)}
                      className="flex-1 bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#1AFF6B]/50"
                    />
                    <button
                      onClick={() => removeFeature(plan.id, i)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSave(plan)}
            disabled={savingId === plan.id}
            className="w-full mt-6 px-6 py-3 bg-[#1AFF6B] hover:bg-[#15e65d] text-black font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {savingId === plan.id ? 'Saving...' : 'Save Plan'}
          </button>
        </div>
      ))}
    </div>
  );
}
