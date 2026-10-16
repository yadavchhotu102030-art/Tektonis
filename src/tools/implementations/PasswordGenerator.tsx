import React, { useState, useEffect, useId } from 'react';
import { Copy, RefreshCw, Check, ShieldCheck, Key, ShieldAlert } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [mode, setMode] = useState<'custom' | 'pin' | 'memorable'>('custom');
  const [pinLength, setPinLength] = useState(6);
  const [bulkCount, setBulkCount] = useState(1);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const ambiguousChars = /[O0l1I]/g;

  const memorableWords = [
    'ocean', 'sunset', 'tiger', 'galaxy', 'quantum', 'forest', 'summit', 'falcon',
    'breeze', 'ember', 'shadow', 'aurora', 'crystal', 'nebula', 'planet', 'stride',
    'beacon', 'horizon', 'solitude', 'venture', 'glacier', 'zenith', 'canyon', 'vortex'
  ];

  const generateSinglePassword = (): string => {
    if (mode === 'pin') {
      let pin = '';
      const array = new Uint32Array(pinLength);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < pinLength; i++) {
        pin += (array[i] % 10).toString();
      }
      return pin;
    }

    if (mode === 'memorable') {
      const words: string[] = [];
      const array = new Uint32Array(4);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < 3; i++) {
        words.push(memorableWords[array[i] % memorableWords.length]);
      }
      const num = array[3] % 1000;
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-') + '-' + num;
    }

    let charPool = '';
    if (includeUpper) charPool += upperChars;
    if (includeLower) charPool += lowerChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (excludeAmbiguous) {
      charPool = charPool.replace(ambiguousChars, '');
    }

    if (!charPool) return 'Select at least one character type';

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charPool[array[i] % charPool.length];
    }
    return result;
  };

  const handleGenerate = () => {
    const main = generateSinglePassword();
    setPassword(main);

    if (bulkCount > 1) {
      const batch: string[] = [];
      for (let i = 0; i < bulkCount; i++) {
        batch.push(generateSinglePassword());
      }
      setBulkPasswords(batch);
    } else {
      setBulkPasswords([]);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous, mode, pinLength, bulkCount]);

  // Compute password entropy and strength
  const getEntropy = (pass: string) => {
    if (!pass) return { bits: 0, label: 'None', color: 'text-slate-400', crackTime: 'Instant' };
    let poolSize = 0;
    if (/[a-z]/.test(pass)) poolSize += 26;
    if (/[A-Z]/.test(pass)) poolSize += 26;
    if (/[0-9]/.test(pass)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pass)) poolSize += 32;

    if (poolSize === 0) return { bits: 0, label: 'Weak', color: 'text-rose-500', crackTime: 'Instant' };

    const bits = Math.round(pass.length * (Math.log(poolSize) / Math.log(2)));

    if (bits < 40) return { bits, label: 'Very Weak', color: 'text-rose-600', crackTime: 'Seconds' };
    if (bits < 60) return { bits, label: 'Fair', color: 'text-amber-500', crackTime: 'Hours/Days' };
    if (bits < 80) return { bits, label: 'Strong', color: 'text-blue-500', crackTime: 'Centuries' };
    return { bits, label: 'Very Strong', color: 'text-emerald-500', crackTime: 'Millions of Years' };
  };

  const entropy = getEntropy(password);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Mode Switcher */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => setMode('custom')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'custom' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Custom Characters
        </button>
        <button
          onClick={() => setMode('memorable')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'memorable' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Memorable Passphrase
        </button>
        <button
          onClick={() => setMode('pin')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            mode === 'pin' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Numeric PIN
        </button>
      </div>

      {/* Main Password Display */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-blue-500/30 dark:border-blue-500/40 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-mono text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 break-all select-all tracking-wider">
            {password}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(password, 0)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              {copiedIndex === 0 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedIndex === 0 ? 'Copied!' : 'Copy Password'}</span>
            </button>
            <button
              onClick={handleGenerate}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 transition"
              title="Generate New"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strength indicators */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Entropy:</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{entropy.bits} bits</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className={`font-bold ${entropy.color}`}>{entropy.label}</span>
          </div>
          <div className="text-slate-500">
            Est. Crack Time: <span className="font-semibold text-slate-700 dark:text-slate-300">{entropy.crackTime}</span>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-5">
        {mode === 'custom' && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Password Length: <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{length}</span>
                </label>
                <div className="flex gap-1.5">
                  {[12, 16, 24, 32].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setLength(preset)}
                      className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${
                        length === preset
                          ? 'bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="range"
                min={6}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => setIncludeUpper(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Uppercase Letters (A-Z)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => setIncludeLower(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Lowercase Letters (a-z)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Symbols (!@#$%^&*)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer sm:col-span-2">
                <input
                  type="checkbox"
                  checked={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded-sm"
                />
                <div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Avoid Ambiguous Characters</span>
                  <span className="block text-[11px] text-slate-500">Excludes visually similar characters like 1, l, I, 0, O</span>
                </div>
              </label>
            </div>
          </>
        )}

        {mode === 'pin' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                PIN Digits: <span className="text-blue-600 font-mono text-sm">{pinLength}</span>
              </label>
            </div>
            <input
              type="range"
              min={4}
              max={12}
              value={pinLength}
              onChange={(e) => setPinLength(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        )}

        {/* Bulk generation selector */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Bulk Passwords Quantity</span>
          <select
            value={bulkCount}
            onChange={(e) => setBulkCount(Number(e.target.value))}
            className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
          >
            <option value={1}>1 Password</option>
            <option value={5}>5 Passwords</option>
            <option value={10}>10 Passwords</option>
          </select>
        </div>
      </div>

      {/* Bulk list if selected */}
      {bulkPasswords.length > 1 && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bulk Generated Passwords</p>
          <div className="space-y-1.5">
            {bulkPasswords.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs font-mono"
              >
                <span className="truncate max-w-[80%]">{item}</span>
                <button
                  onClick={() => handleCopy(item, idx + 1)}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {copiedIndex === idx + 1 ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
