import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Trash2, Check, Copy, Split, Columns } from 'lucide-react';

export const DiffChecker: React.FC = () => {
  const [original, setOriginal] = useState<string>(
    `function calculateDiscount(price, userType) {
  if (userType === 'vip') {
    return price * 0.8;
  }
  return price * 0.95;
}`
  );

  const [modified, setModified] = useState<string>(
    `function calculateDiscount(price, userType, promoCode) {
  if (promoCode === 'SUPER20') {
    return price * 0.8;
  }
  if (userType === 'vip') {
    return price * 0.85;
  }
  return price;
}`
  );

  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [copied, setCopied] = useState(false);

  // Line-by-line Diff Computation
  const diffResult = useMemo(() => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');

    // Simple LCS (Longest Common Subsequence) diff algorithm
    const m = origLines.length;
    const n = modLines.length;
    const dp: number[][] = Array(m + 1)
      .fill(0)
      .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (origLines[i - 1] === modLines[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    let i = m;
    let j = n;
    const lines: { type: 'added' | 'removed' | 'unchanged'; text: string; origNum?: number; modNum?: number }[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
        lines.unshift({ type: 'unchanged', text: origLines[i - 1], origNum: i, modNum: j });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        lines.unshift({ type: 'added', text: modLines[j - 1], modNum: j });
        j--;
      } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
        lines.unshift({ type: 'removed', text: origLines[i - 1], origNum: i });
        i--;
      }
    }

    const addedCount = lines.filter((l) => l.type === 'added').length;
    const removedCount = lines.filter((l) => l.type === 'removed').length;
    const unchangedCount = lines.filter((l) => l.type === 'unchanged').length;
    const totalLines = addedCount + removedCount + unchangedCount;
    const similarity = totalLines > 0 ? Math.round((unchangedCount / (totalLines || 1)) * 100) : 100;

    return {
      lines,
      addedCount,
      removedCount,
      unchangedCount,
      similarity,
    };
  }, [original, modified]);

  const handleSwap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
            <span>+{diffResult.addedCount} additions</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800">
            <span>-{diffResult.removedCount} deletions</span>
          </div>
          <div className="text-slate-500">
            Similarity: <strong className="text-slate-800 dark:text-slate-200">{diffResult.similarity}%</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSwap}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>

          <div className="flex items-center bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                viewMode === 'split' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                viewMode === 'unified' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Unified Diff
            </button>
          </div>
        </div>
      </div>

      {/* Inputs side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>Original Text (Before)</span>
            <button onClick={() => setOriginal('')} className="text-slate-400 hover:text-rose-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={7}
            className="w-full p-3 font-mono text-xs bg-transparent outline-hidden resize-y text-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>Modified Text (After)</span>
            <button onClick={() => setModified('')} className="text-slate-400 hover:text-rose-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            rows={7}
            className="w-full p-3 font-mono text-xs bg-transparent outline-hidden resize-y text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Diff Result Viewer */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Visual Comparison Output ({viewMode === 'split' ? 'Split Side-by-Side' : 'Unified Stream'})</span>
        </div>

        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700 font-mono text-xs max-h-96 overflow-y-auto">
            {/* Left Column: Original */}
            <div className="p-3 overflow-x-auto space-y-0.5">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 pb-1.5 mb-1 border-b border-slate-100 dark:border-slate-800">
                Original
              </div>
              {diffResult.lines
                .filter((line) => line.type !== 'added')
                .map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start px-2 py-0.5 rounded ${
                      line.type === 'removed'
                        ? 'bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-7 select-none text-slate-400 dark:text-slate-600 text-[10px] shrink-0">
                      {line.origNum ?? ''}
                    </span>
                    <span
                      className={`w-5 select-none font-bold shrink-0 ${
                        line.type === 'removed' ? 'text-rose-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      {line.type === 'removed' ? '-' : ' '}
                    </span>
                    <span className="whitespace-pre-wrap break-all">{line.text || ' '}</span>
                  </div>
                ))}
            </div>

            {/* Right Column: Modified */}
            <div className="p-3 overflow-x-auto space-y-0.5">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 pb-1.5 mb-1 border-b border-slate-100 dark:border-slate-800">
                Modified
              </div>
              {diffResult.lines
                .filter((line) => line.type !== 'removed')
                .map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start px-2 py-0.5 rounded ${
                      line.type === 'added'
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="w-7 select-none text-slate-400 dark:text-slate-600 text-[10px] shrink-0">
                      {line.modNum ?? ''}
                    </span>
                    <span
                      className={`w-5 select-none font-bold shrink-0 ${
                        line.type === 'added' ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      {line.type === 'added' ? '+' : ' '}
                    </span>
                    <span className="whitespace-pre-wrap break-all">{line.text || ' '}</span>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="p-3 overflow-x-auto font-mono text-xs max-h-96 space-y-0.5">
            {diffResult.lines.map((line, idx) => {
              if (line.type === 'added') {
                return (
                  <div key={idx} className="flex items-start bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded">
                    <span className="w-7 select-none text-emerald-600/60 dark:text-emerald-400/60 text-[10px] shrink-0">{line.modNum ?? ''}</span>
                    <span className="w-6 select-none text-emerald-500 font-bold shrink-0">+</span>
                    <span className="whitespace-pre-wrap break-all">{line.text || ' '}</span>
                  </div>
                );
              }
              if (line.type === 'removed') {
                return (
                  <div key={idx} className="flex items-start bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 px-2 py-0.5 rounded">
                    <span className="w-7 select-none text-rose-600/60 dark:text-rose-400/60 text-[10px] shrink-0">{line.origNum ?? ''}</span>
                    <span className="w-6 select-none text-rose-500 font-bold shrink-0">-</span>
                    <span className="whitespace-pre-wrap break-all">{line.text || ' '}</span>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex items-start text-slate-600 dark:text-slate-400 px-2 py-0.5">
                  <span className="w-7 select-none text-slate-400 dark:text-slate-600 text-[10px] shrink-0">{line.origNum ?? ''}</span>
                  <span className="w-6 select-none text-slate-300 dark:text-slate-600 shrink-0"> </span>
                  <span className="whitespace-pre-wrap break-all">{line.text || ' '}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
