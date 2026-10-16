import React, { useState } from 'react';
import { Ruler, Scale, Thermometer, HardDrive, Gauge, Copy, Check } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temp' | 'storage' | 'speed';

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Conversion definitions (base units: Length: meter; Weight: kg; Temp: special; Storage: Bytes; Speed: m/s)
  const lengthUnits: Record<string, { name: string; toBase: number }> = {
    m: { name: 'Meters (m)', toBase: 1 },
    km: { name: 'Kilometers (km)', toBase: 1000 },
    cm: { name: 'Centimeters (cm)', toBase: 0.01 },
    mm: { name: 'Millimeters (mm)', toBase: 0.001 },
    mi: { name: 'Miles (mi)', toBase: 1609.344 },
    yd: { name: 'Yards (yd)', toBase: 0.9144 },
    ft: { name: 'Feet (ft)', toBase: 0.3048 },
    in: { name: 'Inches (in)', toBase: 0.0254 },
  };

  const weightUnits: Record<string, { name: string; toBase: number }> = {
    kg: { name: 'Kilograms (kg)', toBase: 1 },
    g: { name: 'Grams (g)', toBase: 0.001 },
    mg: { name: 'Milligrams (mg)', toBase: 0.000001 },
    lb: { name: 'Pounds (lbs)', toBase: 0.45359237 },
    oz: { name: 'Ounces (oz)', toBase: 0.0283495231 },
    stone: { name: 'Stones (st)', toBase: 6.35029318 },
    ton: { name: 'Metric Tonnes (t)', toBase: 1000 },
  };

  const storageUnits: Record<string, { name: string; toBase: number }> = {
    b: { name: 'Bytes (B)', toBase: 1 },
    kb: { name: 'Kilobytes (KB)', toBase: 1024 },
    mb: { name: 'Megabytes (MB)', toBase: 1024 ** 2 },
    gb: { name: 'Gigabytes (GB)', toBase: 1024 ** 3 },
    tb: { name: 'Terabytes (TB)', toBase: 1024 ** 4 },
    pb: { name: 'Petabytes (PB)', toBase: 1024 ** 5 },
  };

  const speedUnits: Record<string, { name: string; toBase: number }> = {
    ms: { name: 'Meters / second (m/s)', toBase: 1 },
    kmh: { name: 'Kilometers / hour (km/h)', toBase: 0.277777778 },
    mph: { name: 'Miles / hour (mph)', toBase: 0.44704 },
    knot: { name: 'Knots (kn)', toBase: 0.514444 },
  };

  // Temperature calculations
  const convertTemp = (val: number, from: string, to: string): number => {
    let kelvin = val;
    if (from === 'c') kelvin = val + 273.15;
    if (from === 'f') kelvin = ((val - 32) * 5) / 9 + 273.15;

    if (to === 'c') return kelvin - 273.15;
    if (to === 'f') return ((kelvin - 273.15) * 9) / 5 + 32;
    return kelvin;
  };

  const handleCopy = (valStr: string, key: string) => {
    navigator.clipboard.writeText(valStr);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Reset default unit when category changes
  const switchCategory = (cat: UnitCategory) => {
    setCategory(cat);
    if (cat === 'length') setFromUnit('m');
    if (cat === 'weight') setFromUnit('kg');
    if (cat === 'temp') setFromUnit('c');
    if (cat === 'storage') setFromUnit('mb');
    if (cat === 'speed') setFromUnit('kmh');
  };

  // Compute results table
  const results = (() => {
    if (category === 'temp') {
      const units = [
        { key: 'c', name: 'Celsius (°C)' },
        { key: 'f', name: 'Fahrenheit (°F)' },
        { key: 'k', name: 'Kelvin (K)' },
      ];
      return units.map((u) => {
        const converted = convertTemp(value, fromUnit, u.key);
        return {
          key: u.key,
          name: u.name,
          val: Math.round(converted * 1000) / 1000,
        };
      });
    }

    let dict = lengthUnits;
    if (category === 'weight') dict = weightUnits;
    if (category === 'storage') dict = storageUnits;
    if (category === 'speed') dict = speedUnits;

    const baseVal = value * (dict[fromUnit]?.toBase || 1);

    return Object.entries(dict).map(([k, meta]) => {
      const converted = baseVal / meta.toBase;
      const rounded = converted >= 0.0001 && converted < 1e10 ? Math.round(converted * 100000) / 100000 : converted.toExponential(4);
      return {
        key: k,
        name: meta.name,
        val: rounded,
      };
    });
  })();

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        {[
          { id: 'length', label: 'Length & Distance', icon: Ruler },
          { id: 'weight', label: 'Weight & Mass', icon: Scale },
          { id: 'temp', label: 'Temperature', icon: Thermometer },
          { id: 'storage', label: 'Digital Storage', icon: HardDrive },
          { id: 'speed', label: 'Speed & Velocity', icon: Gauge },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = category === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchCategory(tab.id as UnitCategory)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input row */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Input Value & Source Unit</label>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 text-lg font-bold font-mono rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-5">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-full px-3 py-2.5 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-hidden"
            >
              {category === 'temp' ? (
                <>
                  <option value="c">Celsius (°C)</option>
                  <option value="f">Fahrenheit (°F)</option>
                  <option value="k">Kelvin (K)</option>
                </>
              ) : (
                Object.entries(
                  category === 'length'
                    ? lengthUnits
                    : category === 'weight'
                    ? weightUnits
                    : category === 'storage'
                    ? storageUnits
                    : speedUnits
                ).map(([k, m]) => (
                  <option key={k} value={k}>
                    {m.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Real-time Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {results.map((r) => {
          const isCopied = copiedKey === r.key;
          const isSelected = r.key === fromUnit;

          return (
            <div
              key={r.key}
              className={`p-3.5 rounded-xl border transition flex items-center justify-between ${
                isSelected
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{r.name}</p>
                <p className="text-base font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">{r.val}</p>
              </div>

              <button
                onClick={() => handleCopy(String(r.val), r.key)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                title="Copy value"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
