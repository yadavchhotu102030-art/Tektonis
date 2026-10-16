import React, { useState, useMemo } from 'react';
import { Activity, Heart, Flame, Scale, Check, Copy } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(28);

  // Metric
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  const [activityLevel, setActivityLevel] = useState<number>(1.375); // Lightly active
  const [copied, setCopied] = useState(false);

  // Calculations
  const stats = useMemo(() => {
    let hMeters = 0;
    let wKg = 0;

    if (unitSystem === 'metric') {
      hMeters = heightCm / 100;
      wKg = weightKg;
    } else {
      const totalInches = heightFeet * 12 + heightInches;
      hMeters = totalInches * 0.0254;
      wKg = weightLbs * 0.453592;
    }

    if (hMeters <= 0 || wKg <= 0) {
      return {
        bmi: 0,
        category: 'N/A',
        color: 'text-slate-400',
        barPercent: 0,
        idealWeightMin: 0,
        idealWeightMax: 0,
        bmr: 0,
        tdee: 0,
      };
    }

    const bmi = Math.round((wKg / (hMeters * hMeters)) * 10) / 10;

    let category = 'Normal weight';
    let color = 'text-emerald-500';
    let barPercent = 50;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
      barPercent = Math.min(25, (bmi / 18.5) * 25);
    } else if (bmi <= 24.9) {
      category = 'Normal weight';
      color = 'text-emerald-500';
      barPercent = 25 + ((bmi - 18.5) / 6.4) * 25;
    } else if (bmi <= 29.9) {
      category = 'Overweight';
      color = 'text-amber-500';
      barPercent = 50 + ((bmi - 25) / 4.9) * 25;
    } else {
      category = 'Obese';
      color = 'text-rose-500';
      barPercent = Math.min(100, 75 + ((bmi - 30) / 10) * 25);
    }

    // Healthy weight range (BMI 18.5 - 24.9)
    const idealWeightMin = Math.round(18.5 * hMeters * hMeters * (unitSystem === 'imperial' ? 2.20462 : 1));
    const idealWeightMax = Math.round(24.9 * hMeters * hMeters * (unitSystem === 'imperial' ? 2.20462 : 1));

    // BMR (Mifflin-St Jeor Formula)
    // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
    // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
    const hCm = hMeters * 100;
    const baseBmr = 10 * wKg + 6.25 * hCm - 5 * age + (gender === 'male' ? 5 : -161);
    const bmr = Math.round(baseBmr);
    const tdee = Math.round(baseBmr * activityLevel);

    return {
      bmi,
      category,
      color,
      barPercent,
      idealWeightMin,
      idealWeightMax,
      bmr,
      tdee,
    };
  }, [unitSystem, gender, age, heightCm, weightKg, heightFeet, heightInches, weightLbs, activityLevel]);

  const handleCopy = () => {
    const text = `BMI: ${stats.bmi} (${stats.category}). Ideal Healthy Weight: ${stats.idealWeightMin} - ${stats.idealWeightMax} ${unitSystem === 'metric' ? 'kg' : 'lbs'}. Daily Calorie Burn (TDEE): ${stats.tdee.toLocaleString()} kcal/day. Calculated via Tektonis (https://tektonis.in).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Unit system toggle */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xs mx-auto">
        <button
          onClick={() => setUnitSystem('metric')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            unitSystem === 'metric' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
          }`}
        >
          Metric (cm, kg)
        </button>
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            unitSystem === 'imperial' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
          }`}
        >
          Imperial (ft/in, lbs)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input fields */}
        <div className="lg:col-span-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gender</label>
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-700 p-0.5">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    gender === 'male' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    gender === 'female' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-1.5 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          </div>

          {/* Height input */}
          {unitSystem === 'metric' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">
                Height: <span className="text-blue-600 font-mono">{heightCm} cm</span>
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">
                Height: <span className="text-blue-600 font-mono">{heightFeet} ft {heightInches} in</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Feet"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                />
                <input
                  type="number"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>
          )}

          {/* Weight input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">
              Weight: <span className="text-blue-600 font-mono">{unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}</span>
            </label>
            <input
              type="number"
              value={unitSystem === 'metric' ? weightKg : weightLbs}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                if (unitSystem === 'metric') setWeightKg(val);
                else setWeightLbs(val);
              }}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase mb-1">
              Activity Level (for Calorie Calculation)
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
            >
              <option value={1.2}>Sedentary (desk job, little exercise)</option>
              <option value={1.375}>Light Exercise (1-3 days/week)</option>
              <option value={1.55}>Moderate Exercise (3-5 days/week)</option>
              <option value={1.725}>Heavy Exercise (6-7 days/week)</option>
              <option value={1.9}>Athlete / Physical Job</option>
            </select>
          </div>
        </div>

        {/* Results column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main BMI Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Body Mass Index (BMI)</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Result'}</span>
              </button>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black font-mono text-slate-900 dark:text-white">
                {stats.bmi}
              </span>
              <span className={`text-xl font-extrabold ${stats.color}`}>
                {stats.category}
              </span>
            </div>

            {/* Gauge bar */}
            <div>
              <div className="w-full h-3 rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-500 relative my-2">
                <div
                  className="w-3.5 h-5 bg-slate-900 dark:bg-white rounded-sm shadow-md absolute -top-1 -translate-x-1/2 transition-all duration-300 border-2 border-white dark:border-slate-900"
                  style={{ left: `${Math.max(2, Math.min(98, stats.barPercent))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>&lt; 18.5 Under</span>
                <span>18.5 - 24.9 Normal</span>
                <span>25 - 29.9 Over</span>
                <span>30+ Obese</span>
              </div>
            </div>
          </div>

          {/* Ideal Weight & Calories Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Scale className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold">Healthy Weight Range</span>
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {stats.idealWeightMin} - {stats.idealWeightMax} <span className="text-xs font-normal text-slate-400">{unitSystem === 'metric' ? 'kg' : 'lbs'}</span>
              </p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">For normal BMI (18.5–24.9)</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">Daily Calories (TDEE)</span>
              </div>
              <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
                {stats.tdee.toLocaleString()} <span className="text-xs font-normal text-slate-400">kcal</span>
              </p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">BMR: {stats.bmr.toLocaleString()} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
