'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'bmr' | 'macro' | 'bodyfat';
type Gender = 'male' | 'female';
type DietPlan = 'hc' | 'mc' | 'zd' | 'lc' | 'kd';
type ActivityLevel = 1 | 2 | 3 | 4 | 5;

const dietPlans = [
  { id: 'hc', label: 'High Carb', ratios: '(60:25:15)' },
  { id: 'mc', label: 'Moderate Carb', ratios: '(50:30:20)' },
  { id: 'zd', label: 'Zone Diet', ratios: '(40:30:30)' },
  { id: 'lc', label: 'Low Carb', ratios: '(25:35:40)' },
  { id: 'kd', label: 'Keto Diet', ratios: '(05:35:60)' },
];

export default function FitnessCalculator() {
  const [activeTab, setActiveTab] = useState<Tab>('bmr');

  // --- BMR State ---
  const [bmrGender, setBmrGender] = useState<Gender>('male');
  const [bmrWeight, setBmrWeight] = useState<string>('');
  const [bmrAge, setBmrAge] = useState<string>('');
  const [bmrFt, setBmrFt] = useState<string>('5');
  const [bmrIn, setBmrIn] = useState<string>('8');
  const [bmrActivity, setBmrActivity] = useState<ActivityLevel>(1);
  const [bmrBodyFat, setBmrBodyFat] = useState<string>('');

  const [calcBmr, setCalcBmr] = useState<number | null>(null);
  const [calcTdee, setCalcTdee] = useState<number | null>(null);

  // --- Macro State ---
  const [macroCals, setMacroCals] = useState<string>('');
  const [macroDiet, setMacroDiet] = useState<DietPlan>('mc');
  const [calcMacros, setCalcMacros] = useState<{ c: number; p: number; f: number } | null>(null);

  // --- Body Fat State ---
  const [bfGender, setBfGender] = useState<Gender>('male');
  const [bfWeight, setBfWeight] = useState<string>('');
  const [bfWaist, setBfWaist] = useState<string>('');
  const [bfWrist, setBfWrist] = useState<string>('');
  const [bfHip, setBfHip] = useState<string>('');
  const [bfForearm, setBfForearm] = useState<string>('');

  const [calcBf, setCalcBf] = useState<number | null>(null);

  // --- Logic: BMR ---
  const handleCalculateBmr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bmrWeight || !bmrAge || !bmrBodyFat) {
      alert("Please fill in weight, age, and body fat.");
      return;
    }

    const weightKg = parseFloat(bmrWeight);
    const age = parseInt(bmrAge);
    const bf = parseFloat(bmrBodyFat);
    const ft = parseInt(bmrFt);
    const inch = parseInt(bmrIn);

    if (isNaN(weightKg) || isNaN(age) || isNaN(bf)) return;

    // Convert height to cm
    const heightCm = Math.round(ft * 30.48 + inch * 2.54);
    
    // Lean mass formula from reference
    const leanMass = weightKg - (weightKg * bf) / 100;
    
    let baseBmr = 0;
    if (bmrGender === 'male') {
      baseBmr = 13.7 * leanMass + 5 * heightCm - 6.8 * age + 66;
    } else {
      baseBmr = 9.6 * leanMass + 1.8 * heightCm - 4.7 * age + 655;
    }

    let tdee = 0;
    switch (bmrActivity) {
      case 1: tdee = baseBmr * 1.2; break;
      case 2: tdee = baseBmr * 1.375; break;
      case 3: tdee = baseBmr * 1.53; break;
      case 4: tdee = baseBmr * 1.725; break;
      case 5: tdee = baseBmr * 1.9; break;
    }

    setCalcBmr(Math.floor(baseBmr));
    setCalcTdee(Math.floor(tdee));
    
    // Auto-fill macro calculator for convenience
    setMacroCals(Math.floor(tdee).toString());
  };

  // --- Logic: Macros ---
  useEffect(() => {
    if (!macroCals) {
      setCalcMacros(null);
      return;
    }
    const cals = parseFloat(macroCals);
    if (isNaN(cals)) return;

    let c = 0, p = 0, f = 0;
    switch (macroDiet) {
      case 'hc': c = (cals * 0.6) / 4; p = (cals * 0.25) / 4; f = (cals * 0.15) / 9; break;
      case 'mc': c = (cals * 0.5) / 4; p = (cals * 0.3) / 4; f = (cals * 0.2) / 9; break;
      case 'zd': c = (cals * 0.4) / 4; p = (cals * 0.3) / 4; f = (cals * 0.3) / 9; break;
      case 'lc': c = (cals * 0.25) / 4; p = (cals * 0.35) / 4; f = (cals * 0.4) / 9; break;
      case 'kd': c = (cals * 0.05) / 4; p = (cals * 0.35) / 4; f = (cals * 0.6) / 9; break;
    }

    setCalcMacros({
      c: parseFloat(c.toFixed(1)),
      p: parseFloat(p.toFixed(1)),
      f: parseFloat(f.toFixed(1))
    });
  }, [macroCals, macroDiet]);

  // --- Logic: Body Fat ---
  const handleCalculateBf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bfWeight || !bfWaist) {
      alert("Please enter at least weight and waist.");
      return;
    }
    
    const weightKg = parseFloat(bfWeight);
    const weightLbs = weightKg * 2.20462;
    const waistIn = parseFloat(bfWaist);
    
    let leanMass = 0;
    let fatMass = 0;
    let bfp = 0;

    if (bfGender === 'male') {
      leanMass = (weightLbs * 1.082) + 94.42 - (waistIn * 4.15);
    } else {
      const wristIn = parseFloat(bfWrist) || 0;
      const hipIn = parseFloat(bfHip) || 0;
      const forearmIn = parseFloat(bfForearm) || 0;
      
      if (!bfWrist || !bfHip || !bfForearm) {
        alert("For females, wrist, hip, and forearm measurements are also required.");
        return;
      }
      
      leanMass = (weightLbs * 0.732) + 8.987 + (wristIn / 3.14) - (waistIn * 0.157) - (hipIn * 0.249) + (forearmIn * 0.434);
    }
    
    fatMass = weightLbs - leanMass;
    bfp = (fatMass / weightLbs) * 100;
    
    setCalcBf(parseFloat(bfp.toFixed(2)));
  };

  const useBfForBmr = () => {
    if (calcBf) {
      setBmrBodyFat(calcBf.toString());
      if (bfWeight && !bmrWeight) setBmrWeight(bfWeight);
      if (bfGender !== bmrGender) setBmrGender(bfGender);
      setActiveTab('bmr');
    }
  };

  // Shared Input Style
  const inputClass = "w-full bg-[var(--surface-2)] border border-[rgba(255,255,255,0.07)] focus:border-[var(--green)] outline-none text-white px-4 py-3 text-sm transition-colors";
  const labelClass = "block text-[11px] font-bold text-[rgba(240,240,240,0.5)] uppercase tracking-wider mb-2";

  return (
    <section id="calculator" className="relative section-pad" style={{ background: 'var(--black)' }}>
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle 800px at center, rgba(26,255,107,0.05) 0%, transparent 100%)',
        }}
      />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Fitness <span className="text-green">Calculator</span>
          </h2>
          <p className="text-[rgba(240,240,240,0.6)] max-w-2xl mx-auto leading-relaxed">
            Instantly calculate your BMR, Macros, and Body Fat percentage. Knowing these details is the essential first step to structuring an effective fitness and diet plan.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[var(--surface)] border border-[rgba(255,255,255,0.1)] p-1">
            {(['bmr', 'macro', 'bodyfat'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[var(--green)] text-black shadow-[0_0_15px_rgba(26,255,107,0.3)]'
                    : 'text-[rgba(240,240,240,0.5)] hover:text-white'
                }`}
              >
                {tab === 'bmr' ? 'BMR' : tab === 'macro' ? 'Macros' : 'Body Fat'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Form Column */}
          <div className="w-full lg:w-1/2 bg-[var(--surface)] border border-[rgba(255,255,255,0.05)] p-6 md:p-10 shadow-2xl">
            <AnimatePresence mode="wait">
              
              {/* --- BMR TAB --- */}
              {activeTab === 'bmr' && (
                <motion.form
                  key="bmr"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleCalculateBmr}
                  className="space-y-6"
                >
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setBmrGender('male')} className={`flex-1 py-3 border text-sm font-bold uppercase tracking-wider transition-colors ${bmrGender === 'male' ? 'border-[var(--green)] text-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.1)] text-[rgba(240,240,240,0.5)] hover:border-[rgba(255,255,255,0.3)]'}`}>Male</button>
                    <button type="button" onClick={() => setBmrGender('female')} className={`flex-1 py-3 border text-sm font-bold uppercase tracking-wider transition-colors ${bmrGender === 'female' ? 'border-[var(--green)] text-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.1)] text-[rgba(240,240,240,0.5)] hover:border-[rgba(255,255,255,0.3)]'}`}>Female</button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className={labelClass}>Weight (KG)</label>
                      <input type="number" step="0.1" value={bmrWeight} onChange={e => setBmrWeight(e.target.value)} placeholder="e.g. 75" className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Age (YRS)</label>
                      <input type="number" value={bmrAge} onChange={e => setBmrAge(e.target.value)} placeholder="e.g. 28" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Height</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <select value={bmrFt} onChange={e => setBmrFt(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                        {[4,5,6,7].map(f => <option key={f} value={f} className="bg-black text-white">{f} Foot</option>)}
                      </select>
                      <select value={bmrIn} onChange={e => setBmrIn(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                        {Array.from({length: 12}).map((_, i) => <option key={i} value={i} className="bg-black text-white">{i} Inch</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Activity Level</label>
                    <select value={bmrActivity} onChange={e => setBmrActivity(Number(e.target.value) as ActivityLevel)} className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value={1} className="bg-black text-white">Very Little (Sedentary)</option>
                      <option value={2} className="bg-black text-white">1-3 Times per week (Light)</option>
                      <option value={3} className="bg-black text-white">3-5 Times per week (Moderate)</option>
                      <option value={4} className="bg-black text-white">6-7 Times per week (Heavy)</option>
                      <option value={5} className="bg-black text-white">Super Heavy / Twice a day</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Body Fat %</label>
                    <div className="flex gap-2">
                      <input type="number" step="0.1" value={bmrBodyFat} onChange={e => setBmrBodyFat(e.target.value)} placeholder="e.g. 15" className={inputClass} />
                    </div>
                    <div className="mt-2 text-right">
                      <button type="button" onClick={() => setActiveTab('bodyfat')} className="text-[10px] text-[var(--green)] uppercase tracking-wider hover:underline">I don&apos;t know my Fat Percentage</button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center mt-4 text-center">Calculate Calories</button>
                </motion.form>
              )}

              {/* --- MACRO TAB --- */}
              {activeTab === 'macro' && (
                <motion.form
                  key="macro"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className={labelClass}>Total Calories Per Day</label>
                    <input type="number" value={macroCals} onChange={e => setMacroCals(e.target.value)} placeholder="e.g. 2400" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Choose Diet Plan</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {dietPlans.map(plan => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setMacroDiet(plan.id as DietPlan)}
                          className={`p-3 border text-left transition-all ${macroDiet === plan.id ? 'border-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.05)] bg-[var(--surface-2)] hover:border-[rgba(255,255,255,0.2)]'}`}
                        >
                          <div className={`text-xs font-bold ${macroDiet === plan.id ? 'text-[var(--green)]' : 'text-white'}`}>{plan.label}</div>
                          <div className="text-[10px] text-[rgba(240,240,240,0.4)] mt-1">{plan.ratios}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.form>
              )}

              {/* --- BODY FAT TAB --- */}
              {activeTab === 'bodyfat' && (
                <motion.form
                  key="bodyfat"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleCalculateBf}
                  className="space-y-6"
                >
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setBfGender('male')} className={`flex-1 py-3 border text-sm font-bold uppercase tracking-wider transition-colors ${bfGender === 'male' ? 'border-[var(--green)] text-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.1)] text-[rgba(240,240,240,0.5)] hover:border-[rgba(255,255,255,0.3)]'}`}>Male</button>
                    <button type="button" onClick={() => setBfGender('female')} className={`flex-1 py-3 border text-sm font-bold uppercase tracking-wider transition-colors ${bfGender === 'female' ? 'border-[var(--green)] text-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.1)] text-[rgba(240,240,240,0.5)] hover:border-[rgba(255,255,255,0.3)]'}`}>Female</button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className={labelClass}>Weight (KG)</label>
                      <input type="number" step="0.1" value={bfWeight} onChange={e => setBfWeight(e.target.value)} className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Waist (Inch)</label>
                      <input type="number" step="0.1" value={bfWaist} onChange={e => setBfWaist(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  {bfGender === 'female' && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className={labelClass}>Wrist (Inch)</label>
                        <input type="number" step="0.1" value={bfWrist} onChange={e => setBfWrist(e.target.value)} className={inputClass} />
                      </div>
                      <div className="flex-1">
                        <label className={labelClass}>Hip (Inch)</label>
                        <input type="number" step="0.1" value={bfHip} onChange={e => setBfHip(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                  )}

                  {bfGender === 'female' && (
                    <div>
                      <label className={labelClass}>Forearm (Inch)</label>
                      <input type="number" step="0.1" value={bfForearm} onChange={e => setBfForearm(e.target.value)} className={inputClass} />
                    </div>
                  )}

                  <button type="submit" className="btn-primary w-full justify-center mt-4 text-center">Calculate Body Fat</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Results Column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {/* Default Empty State */}
              {activeTab === 'bmr' && !calcBmr && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center text-[rgba(240,240,240,0.4)]">
                  <h3 className="font-display text-2xl uppercase mb-4 text-white">Ready to Calculate</h3>
                  <p>Fill in the form on the left to discover your resting metabolic rate and total daily energy expenditure.</p>
                </motion.div>
              )}

              {/* BMR Result */}
              {activeTab === 'bmr' && calcBmr && calcTdee && (
                <motion.div key="bmr-res" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                  <div className="bg-[var(--surface-2)] border border-[rgba(26,255,107,0.2)] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <span className="font-display text-8xl">BMR</span>
                    </div>
                    <label className={labelClass}>Your BMR Is</label>
                    <div className="font-display text-5xl md:text-6xl text-[var(--green)] mb-2">{calcBmr} <span className="text-xl text-[rgba(240,240,240,0.4)] font-sans tracking-widest">KCAL</span></div>
                    <p className="text-xs text-[rgba(240,240,240,0.5)]">Calories burned at absolute rest.</p>
                  </div>
                  
                  <div className="bg-[var(--surface-2)] border border-[rgba(26,255,107,0.2)] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <span className="font-display text-8xl">TDEE</span>
                    </div>
                    <label className={labelClass}>Your TDEE Is</label>
                    <div className="font-display text-5xl md:text-6xl text-[var(--green)] mb-2">{calcTdee} <span className="text-xl text-[rgba(240,240,240,0.4)] font-sans tracking-widest">KCAL</span></div>
                    <p className="text-xs text-[rgba(240,240,240,0.5)]">Total daily energy expenditure based on activity.</p>
                  </div>

                  <button onClick={() => setActiveTab('macro')} className="btn-outline w-full justify-center">Now Check What To Eat &rarr;</button>
                </motion.div>
              )}

              {/* Macro Result */}
              {activeTab === 'macro' && (
                <motion.div key="macro-res" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
                  {!macroCals ? (
                    <div className="p-8 text-center text-[rgba(240,240,240,0.4)]">
                      <h3 className="font-display text-2xl uppercase mb-4 text-white">Macro Guide</h3>
                      <p>Enter your daily calorie target to generate your macronutrient split.</p>
                    </div>
                  ) : calcMacros ? (
                    <div>
                      <h3 className="font-display text-3xl uppercase mb-8 text-center">Your Daily Macros</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[var(--surface-2)] border-t-2 border-blue-400 p-6 text-center">
                          <label className={labelClass}>Carbs (g)</label>
                          <div className="font-display text-4xl text-blue-400 mt-2">{calcMacros.c}</div>
                        </div>
                        <div className="bg-[var(--surface-2)] border-t-2 border-[var(--green)] p-6 text-center">
                          <label className={labelClass}>Protein (g)</label>
                          <div className="font-display text-4xl text-[var(--green)] mt-2">{calcMacros.p}</div>
                        </div>
                        <div className="bg-[var(--surface-2)] border-t-2 border-orange-400 p-6 text-center">
                          <label className={labelClass}>Fats (g)</label>
                          <div className="font-display text-4xl text-orange-400 mt-2">{calcMacros.f}</div>
                        </div>
                      </div>
                      <div className="mt-8 p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-sm text-[rgba(240,240,240,0.6)] leading-relaxed">
                        <strong className="text-white block mb-1">How it works:</strong>
                        Macro (or macronutrients) are nutrients required in large quantities. A balanced split is essential for reaching specific fitness goals.
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              )}

              {/* Body Fat Result */}
              {activeTab === 'bodyfat' && (
                <motion.div key="bf-res" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full">
                  {!calcBf ? (
                    <div className="p-8 text-center text-[rgba(240,240,240,0.4)]">
                      <h3 className="font-display text-2xl uppercase mb-4 text-white">Estimate Body Fat</h3>
                      <p>Grab a measuring tape and fill in your details to calculate your estimated body fat percentage.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-[var(--surface-2)] border border-[rgba(26,255,107,0.2)] p-10 text-center relative overflow-hidden">
                        <label className={labelClass}>Estimated Body Fat</label>
                        <div className="font-display text-7xl text-[var(--green)] mt-4 mb-2">{calcBf}<span className="text-4xl">%</span></div>
                        <div className="mt-6 flex justify-center">
                          <span className={`px-4 py-1 text-xs font-bold uppercase tracking-wider ${calcBf <= (bfGender === 'male' ? 15 : 25) ? 'bg-[rgba(26,255,107,0.15)] text-[var(--green)]' : 'bg-[rgba(255,255,255,0.1)] text-white'}`}>
                            {calcBf <= (bfGender === 'male' ? 15 : 25) ? 'Recommended Range' : 'Above Average'}
                          </span>
                        </div>
                      </div>

                      <button onClick={useBfForBmr} className="btn-outline w-full justify-center">Use this in BMR Calculator &rarr;</button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
