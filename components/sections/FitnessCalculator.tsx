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

  // --- Body Fat State (US Navy Method) ---
  const [bfGender, setBfGender] = useState<Gender>('male');
  const [bfWeight, setBfWeight] = useState<string>('');
  const [bfWaist, setBfWaist] = useState<string>('');
  const [bfNeck, setBfNeck] = useState<string>('');
  const [bfHip, setBfHip] = useState<string>('');        // female only
  const [bfFt, setBfFt] = useState<string>('5');
  const [bfIn, setBfIn] = useState<string>('8');
  const [bfError, setBfError] = useState<string>('');

  const [calcBf, setCalcBf] = useState<number | null>(null);
  const [calcLeanMass, setCalcLeanMass] = useState<number | null>(null);
  const [calcFatMass, setCalcFatMass] = useState<number | null>(null);

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

  // --- Logic: Body Fat (US Navy Method) ---
  // Male:   BF% = 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
  // Female: BF% = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387
  // All measurements in inches.
  const handleCalculateBf = (e: React.FormEvent) => {
    e.preventDefault();
    setBfError('');
    setCalcBf(null);
    setCalcLeanMass(null);
    setCalcFatMass(null);

    const weightKg = parseFloat(bfWeight);
    const waistIn = parseFloat(bfWaist);
    const neckIn = parseFloat(bfNeck);
    const ft = parseInt(bfFt);
    const inch = parseInt(bfIn);
    const heightIn = ft * 12 + inch;

    if (!bfWeight || isNaN(weightKg)) { setBfError('Please enter your weight.'); return; }
    if (!bfWaist || isNaN(waistIn)) { setBfError('Please enter your waist measurement.'); return; }
    if (!bfNeck || isNaN(neckIn)) { setBfError('Please enter your neck measurement.'); return; }
    if (heightIn <= 0) { setBfError('Please select your height.'); return; }

    let bfp = 0;

    if (bfGender === 'male') {
      const diff = waistIn - neckIn;
      if (diff <= 0) {
        setBfError('Waist must be larger than neck. Please check your measurements.');
        return;
      }
      bfp = 86.010 * Math.log10(diff) - 70.041 * Math.log10(heightIn) + 36.76;
    } else {
      const hipIn = parseFloat(bfHip);
      if (!bfHip || isNaN(hipIn)) { setBfError('Please enter your hip measurement.'); return; }
      const combo = waistIn + hipIn - neckIn;
      if (combo <= 0) {
        setBfError('Please check your measurements — waist + hip must be greater than neck.');
        return;
      }
      bfp = 163.205 * Math.log10(combo) - 97.684 * Math.log10(heightIn) - 78.387;
    }

    if (bfp < 0 || bfp > 70) {
      setBfError('Result seems out of range. Please double-check your measurements are in inches.');
      return;
    }

    const fatMassKg = weightKg * (bfp / 100);
    const leanMassKg = weightKg - fatMassKg;

    setCalcBf(parseFloat(bfp.toFixed(1)));
    setCalcFatMass(parseFloat(fatMassKg.toFixed(1)));
    setCalcLeanMass(parseFloat(leanMassKg.toFixed(1)));
  };

  // ACE Body Fat Classification
  const getBfCategory = (bfp: number, gender: Gender): { label: string; color: string; bg: string } => {
    if (gender === 'male') {
      if (bfp <= 5)  return { label: 'Essential Fat', color: 'text-blue-400', bg: 'bg-blue-400/15 border-blue-400/30' };
      if (bfp <= 13) return { label: 'Athlete',       color: 'text-[var(--green)]', bg: 'bg-[rgba(26,255,107,0.1)] border-[rgba(26,255,107,0.3)]' };
      if (bfp <= 17) return { label: 'Fitness',       color: 'text-[var(--green)]', bg: 'bg-[rgba(26,255,107,0.08)] border-[rgba(26,255,107,0.2)]' };
      if (bfp <= 24) return { label: 'Average',       color: 'text-yellow-400',  bg: 'bg-yellow-400/10 border-yellow-400/30' };
      return               { label: 'Obese',          color: 'text-red-400',     bg: 'bg-red-400/10 border-red-400/30' };
    } else {
      if (bfp <= 13) return { label: 'Essential Fat', color: 'text-blue-400',    bg: 'bg-blue-400/15 border-blue-400/30' };
      if (bfp <= 20) return { label: 'Athlete',       color: 'text-[var(--green)]', bg: 'bg-[rgba(26,255,107,0.1)] border-[rgba(26,255,107,0.3)]' };
      if (bfp <= 24) return { label: 'Fitness',       color: 'text-[var(--green)]', bg: 'bg-[rgba(26,255,107,0.08)] border-[rgba(26,255,107,0.2)]' };
      if (bfp <= 31) return { label: 'Average',       color: 'text-yellow-400',  bg: 'bg-yellow-400/10 border-yellow-400/30' };
      return               { label: 'Obese',          color: 'text-red-400',     bg: 'bg-red-400/10 border-red-400/30' };
    }
  };

  const useBfForBmr = () => {
    if (calcBf) {
      setBmrBodyFat(calcBf.toString());
      if (bfWeight && !bmrWeight) setBmrWeight(bfWeight);
      if (bfGender !== bmrGender) setBmrGender(bfGender);
      // Carry height over too
      setBmrFt(bfFt);
      setBmrIn(bfIn);
      setActiveTab('bmr');
    }
  };

  // Shared Input Style
  const inputClass = "w-full bg-[var(--surface-2)] border border-[rgba(255,255,255,0.07)] focus:border-[var(--green)] outline-none text-white px-4 py-3 text-sm transition-colors";
  const labelClass = "block text-[11px] font-bold text-[rgba(240,240,240,0.5)] uppercase tracking-wider mb-2";
  const tipClass = "text-[10px] text-[rgba(240,240,240,0.35)] mt-1.5 leading-relaxed";

  return (
    <section id="calculator" className="relative min-h-[100svh] flex flex-col justify-center py-20" style={{ background: 'var(--black)' }}>
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

              {/* --- BODY FAT TAB (US Navy Method) --- */}
              {activeTab === 'bodyfat' && (
                <motion.form
                  key="bodyfat"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleCalculateBf}
                  className="space-y-5"
                >
                  {/* Method badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button type="button" onClick={() => { setBfGender('male'); setCalcBf(null); setBfError(''); }} className={`flex-1 py-3 px-6 border text-sm font-bold uppercase tracking-wider transition-colors ${bfGender === 'male' ? 'border-[var(--green)] text-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.1)] text-[rgba(240,240,240,0.5)] hover:border-[rgba(255,255,255,0.3)]'}`}>Male</button>
                      <button type="button" onClick={() => { setBfGender('female'); setCalcBf(null); setBfError(''); }} className={`flex-1 py-3 px-6 border text-sm font-bold uppercase tracking-wider transition-colors ${bfGender === 'female' ? 'border-[var(--green)] text-[var(--green)] bg-[rgba(26,255,107,0.05)]' : 'border-[rgba(255,255,255,0.1)] text-[rgba(240,240,240,0.5)] hover:border-[rgba(255,255,255,0.3)]'}`}>Female</button>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[rgba(26,255,107,0.7)] border border-[rgba(26,255,107,0.2)] px-2 py-1">US Navy Method</span>
                  </div>

                  {/* Error message */}
                  {bfError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      {bfError}
                    </div>
                  )}

                  {/* Weight */}
                  <div>
                    <label className={labelClass}>Weight (KG)</label>
                    <input type="number" step="0.1" value={bfWeight} onChange={e => setBfWeight(e.target.value)} placeholder="e.g. 75" className={inputClass} />
                  </div>

                  {/* Height */}
                  <div>
                    <label className={labelClass}>Height</label>
                    <div className="flex gap-3">
                      <select value={bfFt} onChange={e => setBfFt(e.target.value)} className={`${inputClass} appearance-none cursor-pointer flex-1`}>
                        {[4,5,6,7].map(f => <option key={f} value={f} className="bg-black text-white">{f} Foot</option>)}
                      </select>
                      <select value={bfIn} onChange={e => setBfIn(e.target.value)} className={`${inputClass} appearance-none cursor-pointer flex-1`}>
                        {Array.from({length: 12}).map((_, i) => <option key={i} value={i} className="bg-black text-white">{i} Inch</option>)}
                      </select>
                    </div>
                    <p className={tipClass}>Measure barefoot, standing straight.</p>
                  </div>

                  {/* Waist & Neck (both genders) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Waist (Inch)</label>
                      <input type="number" step="0.1" value={bfWaist} onChange={e => setBfWaist(e.target.value)} placeholder="e.g. 34" className={inputClass} />
                      <p className={tipClass}>{bfGender === 'male' ? 'At navel level.' : 'At narrowest point.'}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Neck (Inch)</label>
                      <input type="number" step="0.1" value={bfNeck} onChange={e => setBfNeck(e.target.value)} placeholder="e.g. 15" className={inputClass} />
                      <p className={tipClass}>Just below Adam&apos;s apple.</p>
                    </div>
                  </div>

                  {/* Hip — females only */}
                  {bfGender === 'female' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    >
                      <label className={labelClass}>Hip (Inch)</label>
                      <input type="number" step="0.1" value={bfHip} onChange={e => setBfHip(e.target.value)} placeholder="e.g. 38" className={inputClass} />
                      <p className={tipClass}>At the widest point of your hips/buttocks.</p>
                    </motion.div>
                  )}

                  <button type="submit" className="btn-primary w-full justify-center mt-2 text-center">Calculate Body Fat</button>
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
                    <div className="p-8 text-center text-[rgba(240,240,240,0.4)] space-y-4">
                      <h3 className="font-display text-2xl uppercase mb-2 text-white">US Navy Body Fat Method</h3>
                      <p className="text-sm leading-relaxed">
                        Grab a measuring tape and fill in your measurements on the left. This uses the same scientifically validated formula used by the U.S. military.
                      </p>
                      <div className="mt-6 space-y-2 text-left border border-[rgba(255,255,255,0.05)] p-4">
                        <p className="text-[10px] uppercase tracking-widest text-[rgba(240,240,240,0.3)] mb-3">ACE Body Fat Categories</p>
                        {bfGender === 'male' ? (
                          <>
                            <div className="flex justify-between text-xs"><span className="text-blue-400">Essential Fat</span><span>2 – 5%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-[var(--green)]">Athlete</span><span>6 – 13%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-[var(--green)]">Fitness</span><span>14 – 17%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-yellow-400">Average</span><span>18 – 24%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-red-400">Obese</span><span>25%+</span></div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between text-xs"><span className="text-blue-400">Essential Fat</span><span>10 – 13%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-[var(--green)]">Athlete</span><span>14 – 20%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-[var(--green)]">Fitness</span><span>21 – 24%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-yellow-400">Average</span><span>25 – 31%</span></div>
                            <div className="flex justify-between text-xs"><span className="text-red-400">Obese</span><span>32%+</span></div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {/* Main BF% display */}
                      <div className="bg-[var(--surface-2)] border border-[rgba(26,255,107,0.2)] p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                          <span className="font-display text-[10rem] leading-none">BF</span>
                        </div>
                        <label className={`${labelClass} justify-center`}>Estimated Body Fat</label>
                        <div className="font-display text-7xl text-[var(--green)] mt-3 mb-4">
                          {calcBf}<span className="text-4xl">%</span>
                        </div>
                        {/* ACE Category Badge */}
                        {(() => {
                          const cat = getBfCategory(calcBf, bfGender);
                          return (
                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 border text-xs font-bold uppercase tracking-widest ${cat.bg} ${cat.color}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {cat.label}
                            </span>
                          );
                        })()}
                      </div>

                      {/* Lean / Fat Mass Breakdown */}
                      {calcLeanMass !== null && calcFatMass !== null && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[var(--surface-2)] border border-[rgba(255,255,255,0.06)] p-5 text-center">
                            <label className={labelClass}>Lean Mass</label>
                            <div className="font-display text-3xl text-white mt-1">{calcLeanMass} <span className="text-sm text-[rgba(240,240,240,0.4)]">kg</span></div>
                            <p className="text-[10px] text-[rgba(240,240,240,0.3)] mt-1">Muscle, bone & water</p>
                          </div>
                          <div className="bg-[var(--surface-2)] border border-[rgba(255,255,255,0.06)] p-5 text-center">
                            <label className={labelClass}>Fat Mass</label>
                            <div className="font-display text-3xl text-orange-400 mt-1">{calcFatMass} <span className="text-sm text-[rgba(240,240,240,0.4)]">kg</span></div>
                            <p className="text-[10px] text-[rgba(240,240,240,0.3)] mt-1">Total body fat weight</p>
                          </div>
                        </div>
                      )}

                      {/* Disclaimer */}
                      <p className="text-[10px] text-[rgba(240,240,240,0.25)] text-center">
                        U.S. Navy Method — estimated accuracy ±3–4%. Not a substitute for clinical measurement.
                      </p>

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
