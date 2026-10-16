import React, { useState } from 'react';
import { Copy, Trash2, Check, Download, Upload, AlertCircle, CheckCircle2, Minimize2, Maximize2 } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>(
    JSON.stringify(
      {
        site: "Tektonis",
        domain: "tektonis.in",
        version: "2.4.0",
        active: true,
        stats: {
          monthlyVisitors: 450000,
          privacyScore: 100,
          toolsAvailable: 15
        },
        tags: ["seo", "utilities", "developer", "free"]
      },
      null,
      2
    )
  );
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'tree'>('editor');

  const formatJson = (spaces: number) => {
    try {
      if (!input.trim()) {
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON syntax');
      }
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON syntax');
      }
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) {
        setError('Input is empty');
        return;
      }
      JSON.parse(input);
      setError(null);
      alert('Valid JSON! Syntax is clean.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON');
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
      try {
        JSON.parse(content);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      }
    };
    reader.readAsText(file);
  };

  // Render collapsible JSON tree
  const parsedData = (() => {
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  })();

  const renderJsonTreeNode = (keyName: string | null, value: unknown, depth = 0): React.ReactNode => {
    if (value === null) {
      return (
        <div key={keyName} style={{ paddingLeft: `${depth * 16}px` }} className="text-xs py-0.5">
          {keyName && <span className="text-purple-600 dark:text-purple-400 font-medium">{keyName}: </span>}
          <span className="text-slate-400 italic">null</span>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={keyName} style={{ paddingLeft: `${depth * 16}px` }} className="text-xs py-0.5">
          {keyName && <span className="text-purple-600 dark:text-purple-400 font-medium">{keyName}: </span>}
          <span className="text-amber-600 dark:text-amber-400 font-semibold">{String(value)}</span>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={keyName} style={{ paddingLeft: `${depth * 16}px` }} className="text-xs py-0.5">
          {keyName && <span className="text-purple-600 dark:text-purple-400 font-medium">{keyName}: </span>}
          <span className="text-blue-600 dark:text-blue-400 font-mono">{value}</span>
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <div key={keyName} style={{ paddingLeft: `${depth * 16}px` }} className="text-xs py-0.5">
          {keyName && <span className="text-purple-600 dark:text-purple-400 font-medium">{keyName}: </span>}
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">"{value}"</span>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={keyName || 'root'} style={{ paddingLeft: `${depth * 16}px` }} className="text-xs py-0.5">
          <span className="text-purple-600 dark:text-purple-400 font-medium">{keyName ? `${keyName}: ` : ''}</span>
          <span className="text-slate-500 font-semibold">[{value.length}]</span>
          <div className="border-l border-slate-200 dark:border-slate-700 ml-1">
            {value.map((item, idx) => renderJsonTreeNode(String(idx), item, depth + 1))}
          </div>
        </div>
      );
    }

    if (typeof value === 'object') {
      return (
        <div key={keyName || 'root'} style={{ paddingLeft: `${depth * 16}px` }} className="text-xs py-0.5">
          <span className="text-purple-600 dark:text-purple-400 font-medium">{keyName ? `${keyName}: ` : ''}</span>
          <span className="text-slate-500 font-semibold">{'{'}</span>
          <div className="border-l border-slate-200 dark:border-slate-700 ml-1">
            {Object.entries(value as Record<string, unknown>).map(([k, val]) =>
              renderJsonTreeNode(k, val, depth + 1)
            )}
          </div>
          <span className="text-slate-500 font-semibold">{'}'}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-0.5">
            <button
              onClick={() => {
                setIndent(2);
                formatJson(2);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                indent === 2 ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              2 Spaces
            </button>
            <button
              onClick={() => {
                setIndent(4);
                formatJson(4);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                indent === 4 ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              4 Spaces
            </button>
          </div>

          <button
            onClick={minifyJson}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>

          <button
            onClick={validateJson}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Validate</span>
          </button>

          <label className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload .json</span>
            <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                activeTab === 'editor' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                activeTab === 'tree' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Interactive Tree
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            onClick={() => setInput('')}
            className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded-md"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">JSON Syntax Error</p>
            <p className="font-mono text-[11px] mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Main View Area */}
      {activeTab === 'editor' ? (
        <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 shadow-inner overflow-hidden font-mono text-xs">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              try {
                if (e.target.value.trim()) JSON.parse(e.target.value);
                setError(null);
              } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
              }
            }}
            placeholder="Paste your JSON here..."
            rows={18}
            spellCheck={false}
            className="w-full p-4 bg-transparent resize-y outline-hidden font-mono text-sm leading-relaxed text-emerald-400 selection:bg-blue-600/50"
          />
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 min-h-[300px] overflow-auto">
          {parsedData ? (
            <div className="font-mono text-xs">{renderJsonTreeNode(null, parsedData, 0)}</div>
          ) : (
            <p className="text-xs text-rose-500 font-mono">Tree view unavailable while JSON has syntax errors.</p>
          )}
        </div>
      )}
    </div>
  );
};
