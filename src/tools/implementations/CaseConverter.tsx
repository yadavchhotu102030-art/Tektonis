import React, { useState } from 'react';
import { Copy, Trash2, Check, ArrowRightLeft, Sparkles } from 'lucide-react';

export const CaseConverter: React.FC = () => {
  const [input, setInput] = useState<string>(
    'Search engine optimization (SEO) helps your web content rank higher on Google search results!'
  );
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Transformation helper functions
  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        if (!word) return '';
        const minorWords = new Set(['and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'a', 'an', 'of', 'with']);
        if (minorWords.has(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ')
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    const words = str.match(/[a-zA-Z0-9]+/g) || [];
    if (words.length === 0) return '';
    return words
      .map((w, i) => {
        const lower = w.toLowerCase();
        if (i === 0) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join('');
  };

  const toPascalCase = (str: string) => {
    const words = str.match(/[a-zA-Z0-9]+/g) || [];
    return words
      .map((w) => {
        const lower = w.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join('');
  };

  const toSnakeCase = (str: string) => {
    const words = str.match(/[a-zA-Z0-9]+/g) || [];
    return words.map((w) => w.toLowerCase()).join('_');
  };

  const toKebabCase = (str: string) => {
    const words = str.match(/[a-zA-Z0-9]+/g) || [];
    return words.map((w) => w.toLowerCase()).join('-');
  };

  const toConstantCase = (str: string) => {
    const words = str.match(/[a-zA-Z0-9]+/g) || [];
    return words.map((w) => w.toUpperCase()).join('_');
  };

  const toDotCase = (str: string) => {
    const words = str.match(/[a-zA-Z0-9]+/g) || [];
    return words.map((w) => w.toLowerCase()).join('.');
  };

  const toInverseCase = (str: string) => {
    return str
      .split('')
      .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
      .join('');
  };

  const toAlternatingCase = (str: string) => {
    let capitalize = false;
    return str
      .split('')
      .map((c) => {
        if (/[a-zA-Z]/.test(c)) {
          capitalize = !capitalize;
          return capitalize ? c.toUpperCase() : c.toLowerCase();
        }
        return c;
      })
      .join('');
  };

  const conversions = [
    { id: 'sentence', label: 'Sentence case', fn: toSentenceCase, desc: 'Capitalizes the first letter of each sentence' },
    { id: 'lower', label: 'lower case', fn: (s: string) => s.toLowerCase(), desc: 'All letters converted to lower case' },
    { id: 'upper', label: 'UPPER CASE', fn: (s: string) => s.toUpperCase(), desc: 'All letters converted to upper case' },
    { id: 'title', label: 'Title Case', fn: toTitleCase, desc: 'Capitalizes major words, ideal for blog & page titles' },
    { id: 'kebab', label: 'kebab-case (URL Slug)', fn: toKebabCase, desc: 'Hyphenated words, best for SEO friendly URLs' },
    { id: 'snake', label: 'snake_case', fn: toSnakeCase, desc: 'Underscore separated words for code and databases' },
    { id: 'camel', label: 'camelCase', fn: toCamelCase, desc: 'Variable naming in JavaScript, TypeScript, and Java' },
    { id: 'pascal', label: 'PascalCase', fn: toPascalCase, desc: 'Component and class names in React & OOP' },
    { id: 'constant', label: 'CONSTANT_CASE', fn: toConstantCase, desc: 'Global constants & environment variables' },
    { id: 'dot', label: 'dot.case', fn: toDotCase, desc: 'Configuration properties and package namespaces' },
    { id: 'alternating', label: 'aLtErNaTiNg cAsE', fn: toAlternatingCase, desc: 'Meme and stylized alternating character case' },
    { id: 'inverse', label: 'InVeRsE cAsE', fn: toInverseCase, desc: 'Inverts current case of each letter' },
  ];

  return (
    <div className="space-y-6">
      {/* Input Textarea */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-sm">
          <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <ArrowRightLeft className="w-4 h-4 text-blue-500" />
            <span>Original Input Text</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInput('')}
              disabled={!input}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to convert instantly across all case formats..."
          rows={4}
          className="w-full p-4 text-slate-800 dark:text-slate-100 bg-transparent resize-y outline-hidden text-base leading-relaxed"
        />
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {conversions.map((item) => {
          const transformed = item.fn(input);
          const isCopied = copiedIndex === item.id;

          return (
            <div
              key={item.id}
              className="group p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(transformed, item.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-md transition ${
                      isCopied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">{item.desc}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 break-all select-all min-h-[38px] flex items-center">
                {transformed || <span className="text-slate-400 italic font-sans text-xs">No text</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
