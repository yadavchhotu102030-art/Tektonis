import React, { useState } from 'react';
import { Copy, Check, Pipette, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#3b82f6');
  const [bgHex, setBgHex] = useState('#ffffff');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Conversion helpers
  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace(/^#/, '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    if (clean.length !== 6) return { r: 59, g: 130, b: 246 };
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;
    const k = 1 - Math.max(r1, g1, b1);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    const c = Math.round(((1 - r1 - k) / (1 - k)) * 100);
    const m = Math.round(((1 - g1 - k) / (1 - k)) * 100);
    const y = Math.round(((1 - b1 - k) / (1 - k)) * 100);
    return { c, m, y, k: Math.round(k * 100) };
  };

  const rgbToHsv = (r: number, g: number, b: number) => {
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;
    const max = Math.max(r1, g1, b1);
    const min = Math.min(r1, g1, b1);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r1:
          h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
          break;
        case g1:
          h = (b1 - r1) / d + 2;
          break;
        case b1:
          h = (r1 - g1) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      try {
        const eyeDropper = new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          setHex(result.sRGBHex);
        }
      } catch {
        // User canceled selection
      }
    }
  };

  // Luminance and WCAG Contrast ratio
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const bgRgb = hexToRgb(bgHex);
  const lum1 = getLuminance(rgb.r, rgb.g, rgb.b);
  const lum2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const contrastRatio = Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;

  const passesAANormal = contrastRatio >= 4.5;
  const passesAALarge = contrastRatio >= 3.0;
  const passesAAANormal = contrastRatio >= 7.0;

  const handleCopy = (str: string, key: string) => {
    navigator.clipboard.writeText(str);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Harmonious palettes
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const palettes = [
    {
      title: 'Complementary',
      colors: [hex, hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)],
    },
    {
      title: 'Analogous',
      colors: [
        hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l),
        hex,
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
      ],
    },
    {
      title: 'Triadic',
      colors: [
        hex,
        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
      ],
    },
    {
      title: 'Monochromatic Tones',
      colors: [
        hslToHex(hsl.h, hsl.s, Math.max(15, hsl.l - 30)),
        hslToHex(hsl.h, hsl.s, Math.max(25, hsl.l - 15)),
        hex,
        hslToHex(hsl.h, hsl.s, Math.min(85, hsl.l + 15)),
        hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 30)),
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Main Color Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center">
            <div
              className="w-full h-32 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 transition-all"
              style={{ backgroundColor: hex }}
            />
            <div className="flex items-center gap-2.5 mt-4">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-28 px-3 py-1.5 font-mono text-sm uppercase font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
              {typeof window !== 'undefined' && 'EyeDropper' in window && (
                <button
                  type="button"
                  onClick={handleEyeDropper}
                  className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-400 transition"
                  title="Pick color from screen (Eyedropper)"
                  aria-label="Pick color from screen"
                >
                  <Pipette className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Formats table */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { label: 'HEX', val: hex.toUpperCase() },
              { label: 'RGB', val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
              { label: 'HSL', val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              { label: 'HSV', val: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
              { label: 'CMYK', val: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
              { label: 'Tailwind Hex', val: `bg-[${hex}]` },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">{f.label}</span>
                  <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">{f.val}</span>
                </div>
                <button
                  onClick={() => handleCopy(f.val, f.label)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition"
                  title="Copy format"
                >
                  {copiedKey === f.label ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WCAG Contrast Ratio Checker */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">WCAG 2.1 Contrast Checker</h3>
            <p className="text-xs text-slate-500">Ensure accessible text visibility for accessibility compliance and SEO</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Background:</span>
            <input
              type="color"
              value={bgHex}
              onChange={(e) => setBgHex(e.target.value)}
              className="w-7 h-7 rounded border border-slate-300 cursor-pointer"
            />
            <input
              type="text"
              value={bgHex}
              onChange={(e) => setBgHex(e.target.value)}
              className="w-24 px-2 py-0.5 text-xs font-mono uppercase rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div
          className="p-5 rounded-xl border border-slate-300 dark:border-slate-600 flex flex-col justify-center items-center text-center transition-colors"
          style={{ backgroundColor: bgHex }}
        >
          <p className="text-lg font-bold" style={{ color: hex }}>
            Large Heading Text (18pt / 24px)
          </p>
          <p className="text-sm mt-1" style={{ color: hex }}>
            Normal body copy text for standard paragraphs and button labels.
          </p>
        </div>

        {/* Score & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{contrastRatio} : 1</span>
            <span className="text-xs font-semibold text-slate-500">Contrast Ratio</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold ${
              passesAANormal ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              {passesAANormal ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>AA Normal (4.5:1)</span>
            </div>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold ${
              passesAALarge ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              {passesAALarge ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>AA Large (3.0:1)</span>
            </div>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-semibold ${
              passesAAANormal ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              {passesAAANormal ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>AAA Normal (7.0:1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Harmonic Palettes */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Harmonious Color Palettes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {palettes.map((p) => (
            <div key={p.title} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">{p.title}</p>
              <div className="flex rounded-lg overflow-hidden h-12 shadow-xs">
                {p.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopy(c, `${p.title}-${i}`)}
                    className="flex-1 h-full relative group transition hover:opacity-90 flex items-center justify-center"
                    style={{ backgroundColor: c }}
                    title={`Click to copy ${c}`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 font-mono text-[10px] font-bold px-1 py-0.5 rounded bg-black/75 text-white transition">
                      {copiedKey === `${p.title}-${i}` ? 'Copied' : c}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
