import React, { useState } from 'react';
import { Percent, ArrowRight, Tag, TrendingUp, TrendingDown, Copy, Check } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState<number>(15);
  const [val1B, setVal1B] = useState<number>(200);

  // Mode 2: X is what percent of Y?
  const [val2A, setVal2A] = useState<number>(45);
  const [val2B, setVal2B] = useState<number>(150);

  // Mode 3: Percentage increase / decrease from X to Y
  const [val3A, setVal3A] = useState<number>(80);
  const [val3B, setVal3B] = useState<number>(120);

  // Mode 4: Discount & Sale Price
  const [origPrice, setOrigPrice] = useState<number>(99);
  const [discountPercent, setDiscountPercent] = useState<number>(25);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Calculations
  const res1 = (val1A * val1B) / 100;
  const res2 = val2B !== 0 ? (val2A / val2B) * 100 : 0;
  const diff3 = val3B - val3A;
  const res3 = val3A !== 0 ? (diff3 / val3A) * 100 : 0;
  const discountAmount = (origPrice * discountPercent) / 100;
  const finalPrice = Math.max(0, origPrice - discountAmount);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: What is X% of Y? */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Percent className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                What is X% of Y?
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Percentage (X %)</label>
                <input
                  type="number"
                  value={val1A}
                  onChange={(e) => setVal1A(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Total (Y)</label>
                <input
                  type="number"
                  value={val1B}
                  onChange={(e) => setVal1B(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Result</span>
              <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                {Math.round(res1 * 1000) / 1000}
              </span>
            </div>
            <button
              onClick={() => handleCopy(String(Math.round(res1 * 1000) / 1000), 'card1')}
              className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-800 transition"
              title="Copy result"
            >
              {copiedKey === 'card1' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Percent className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                X is what percent of Y?
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Part (X)</label>
                <input
                  type="number"
                  value={val2A}
                  onChange={(e) => setVal2A(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Whole (Y)</label>
                <input
                  type="number"
                  value={val2B}
                  onChange={(e) => setVal2B(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Percentage</span>
              <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {Math.round(res2 * 100) / 100}%
              </span>
            </div>
            <button
              onClick={() => handleCopy(`${Math.round(res2 * 100) / 100}%`, 'card2')}
              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 transition"
              title="Copy result"
            >
              {copiedKey === 'card2' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Card 3: % Increase / Decrease */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                {res3 >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Percentage Change (Increase / Decrease)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Initial Value</label>
                <input
                  type="number"
                  value={val3A}
                  onChange={(e) => setVal3A(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Final Value</label>
                <input
                  type="number"
                  value={val3B}
                  onChange={(e) => setVal3B(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {res3 >= 0 ? 'Increase of' : 'Decrease of'}
              </span>
              <span className={`text-2xl font-black font-mono ${res3 >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {res3 >= 0 ? '+' : ''}{Math.round(res3 * 100) / 100}%
              </span>
            </div>
            <button
              onClick={() => handleCopy(`${res3 >= 0 ? '+' : ''}${Math.round(res3 * 100) / 100}%`, 'card3')}
              className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-800 transition"
              title="Copy result"
            >
              {copiedKey === 'card3' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Card 4: Discount & Sale Price */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Tag className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Discount & Sale Price Calculator
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Original Price ($)</label>
                <input
                  type="number"
                  value={origPrice}
                  onChange={(e) => setOrigPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Discount (% Off)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Final Sale Price</span>
              <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                ${Math.round(finalPrice * 100) / 100}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                Saved: ${Math.round(discountAmount * 100) / 100}
              </span>
            </div>
            <button
              onClick={() => handleCopy(`$${Math.round(finalPrice * 100) / 100}`, 'card4')}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-white dark:hover:bg-slate-800 transition"
              title="Copy result"
            >
              {copiedKey === 'card4' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
