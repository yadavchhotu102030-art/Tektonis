import React, { useState } from 'react';
import { Sliders, Copy, Check, Eye, Sparkles, Layers } from 'lucide-react';

export const BoxShadowGenerator: React.FC = () => {
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(10);
  const [blur, setBlur] = useState<number>(25);
  const [spread, setSpread] = useState<number>(-5);
  const [shadowColor, setShadowColor] = useState<string>('#000000');
  const [opacity, setOpacity] = useState<number>(20); // 0 to 100
  const [isInset, setIsInset] = useState<boolean>(false);
  const [boxColor, setBoxColor] = useState<string>('#ffffff');
  const [canvasDark, setCanvasDark] = useState<boolean>(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Convert hex + opacity to rgba
  const hexToRgba = (hex: string, alphaPercent: number) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const a = Math.round((alphaPercent / 100) * 100) / 100;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const rgbaColor = hexToRgba(shadowColor, opacity);
  const boxShadowValue = `${isInset ? 'inset ' : ''}${xOffset}px ${yOffset}px ${blur}px ${spread}px ${rgbaColor}`;
  const cssCode = `box-shadow: ${boxShadowValue};`;
  const tailwindCode = `shadow-[${boxShadowValue.replace(/\s+/g, '_')}]`;

  // Presets
  const presets = [
    { name: 'Soft Modern', x: 0, y: 10, blur: 25, spread: -5, op: 15, col: '#000000', inset: false },
    { name: 'Elevated Card', x: 0, y: 20, blur: 30, spread: -10, op: 25, col: '#0f172a', inset: false },
    { name: 'Float Glow', x: 0, y: 15, blur: 35, spread: 0, op: 30, col: '#3b82f6', inset: false },
    { name: 'Hard Neo-Brutalist', x: 6, y: 6, blur: 0, spread: 0, op: 100, col: '#0f172a', inset: false },
    { name: 'Inner Depths', x: 0, y: 4, blur: 15, spread: 0, op: 25, col: '#000000', inset: true },
    { name: 'Ambient Minimal', x: 0, y: 2, blur: 10, spread: 0, op: 8, col: '#000000', inset: false },
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setXOffset(p.x);
    setYOffset(p.y);
    setBlur(p.blur);
    setSpread(p.spread);
    setOpacity(p.op);
    setShadowColor(p.col);
    setIsInset(p.inset);
  };

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sliders Column */}
        <div className="lg:col-span-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Shadow Controls</span>
            </h3>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isInset}
                onChange={(e) => setIsInset(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Inset Shadow</span>
            </label>
          </div>

          {/* X Offset */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Horizontal Offset (X)</span>
              <span className="font-mono text-blue-600">{xOffset}px</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={xOffset}
              onChange={(e) => setXOffset(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Y Offset */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Vertical Offset (Y)</span>
              <span className="font-mono text-blue-600">{yOffset}px</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={yOffset}
              onChange={(e) => setYOffset(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Blur Radius */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Blur Radius</span>
              <span className="font-mono text-blue-600">{blur}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Spread Radius */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Spread Radius</span>
              <span className="font-mono text-blue-600">{spread}px</span>
            </div>
            <input
              type="range"
              min={-40}
              max={40}
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Shadow Color & Opacity */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Shadow Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600 p-0"
                />
                <span className="text-xs font-mono uppercase text-slate-600 dark:text-slate-300">{shadowColor}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Opacity</span>
                <span className="font-mono text-blue-600">{opacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Preview & Code Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Interactive Visual Canvas */}
          <div className={`p-8 rounded-3xl border transition-colors flex flex-col items-center justify-center min-h-[260px] relative ${
            canvasDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 dark:bg-slate-850 border-slate-200 dark:border-slate-700'
          }`}>
            <button
              onClick={() => setCanvasDark(!canvasDark)}
              className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs hover:bg-white transition"
            >
              {canvasDark ? 'Light Canvas' : 'Dark Canvas'}
            </button>

            {/* Target Element */}
            <div
              className="w-44 h-44 rounded-3xl flex items-center justify-center text-center p-4 transition-all"
              style={{
                backgroundColor: canvasDark ? '#1e293b' : boxColor,
                boxShadow: boxShadowValue,
              }}
            >
              <span className="text-xs font-bold text-slate-500 select-none">
                Preview Element
              </span>
            </div>
          </div>

          {/* Generated Code Boxes */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">CSS Property</span>
              <button
                onClick={() => handleCopy(cssCode, 'css')}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300"
              >
                {copiedKey === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <p className="p-2.5 rounded-lg bg-slate-950 text-emerald-400 break-all select-all border border-slate-800">
              {cssCode}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tailwind CSS Class</span>
              <button
                onClick={() => handleCopy(tailwindCode, 'tw')}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300"
              >
                {copiedKey === 'tw' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'tw' ? 'Copied' : 'Copy Tailwind'}</span>
              </button>
            </div>
            <p className="p-2.5 rounded-lg bg-slate-950 text-cyan-400 break-all select-all border border-slate-800">
              {tailwindCode}
            </p>
          </div>
        </div>
      </div>

      {/* Designer Presets Grid */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
          Curated Design Presets
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 text-left transition group"
            >
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block group-hover:text-blue-600 truncate">
                {preset.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                {preset.blur}px blur
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
