import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, Copy, Check, Calendar, ArrowRight } from 'lucide-react';

export const EpochConverter: React.FC = () => {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [isLive, setIsLive] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Epoch to Date state
  const [epochInput, setEpochInput] = useState<string>(Math.floor(Date.now() / 1000).toString());

  // Date to Epoch state
  const now = new Date();
  const [dateInput, setDateInput] = useState<string>(now.toISOString().slice(0, 10));
  const [timeInput, setTimeInput] = useState<string>(now.toTimeString().slice(0, 8));

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  const handleCopy = (str: string, key: string) => {
    navigator.clipboard.writeText(str);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Convert epoch input to dates
  const parsedFromEpoch = (() => {
    const num = parseInt(epochInput.trim(), 10);
    if (isNaN(num)) return null;
    // Check if seconds or milliseconds
    const ms = epochInput.length > 11 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;

    // Relative calculation
    const diffSec = Math.floor((Date.now() - ms) / 1000);
    let relative = '';
    if (Math.abs(diffSec) < 60) {
      relative = 'Just now';
    } else if (diffSec > 0) {
      const mins = Math.floor(diffSec / 60);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) relative = `${days} days ago`;
      else if (hours > 0) relative = `${hours} hours ago`;
      else relative = `${mins} minutes ago`;
    } else {
      const futureSec = Math.abs(diffSec);
      const mins = Math.floor(futureSec / 60);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) relative = `in ${days} days`;
      else if (hours > 0) relative = `in ${hours} hours`;
      else relative = `in ${mins} minutes`;
    }

    return {
      utc: d.toUTCString(),
      local: d.toString(),
      iso: d.toISOString(),
      relative,
    };
  })();

  // Convert Date/Time input to epoch
  const convertedToEpoch = (() => {
    try {
      const full = `${dateInput}T${timeInput}`;
      const d = new Date(full);
      if (isNaN(d.getTime())) return null;
      return {
        seconds: Math.floor(d.getTime() / 1000),
        milliseconds: d.getTime(),
      };
    } catch {
      return null;
    }
  })();

  return (
    <div className="space-y-6">
      {/* Live Current Timestamp Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 animate-spin-slow" />
              <span>Current Unix Timestamp</span>
              {isLive && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <p className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white select-all">
              {currentEpoch}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLive(!isLive)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isLive ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => handleCopy(currentEpoch.toString(), 'current')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition"
            >
              {copiedKey === 'current' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'current' ? 'Copied' : 'Copy Timestamp'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Way Converter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp to Date */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Epoch Timestamp → Human Date</h3>
            <button
              onClick={() => setEpochInput(Math.floor(Date.now() / 1000).toString())}
              className="text-xs text-blue-600 hover:underline"
            >
              Set to Now
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Enter Timestamp (seconds or ms)</label>
            <input
              type="text"
              value={epochInput}
              onChange={(e) => setEpochInput(e.target.value)}
              placeholder="e.g. 1776250633"
              className="w-full px-3.5 py-2 font-mono text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
            />
          </div>

          {/* Quick offsets */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { label: '+1 Hour', val: 3600 },
              { label: '+1 Day', val: 86400 },
              { label: '+1 Week', val: 604800 },
              { label: '+1 Month', val: 2592000 },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => {
                  const current = parseInt(epochInput, 10) || Math.floor(Date.now() / 1000);
                  setEpochInput((current + btn.val).toString());
                }}
                className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px]"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {parsedFromEpoch ? (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60">
                <span className="text-slate-500 font-medium">UTC Time:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{parsedFromEpoch.utc}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60">
                <span className="text-slate-500 font-medium">Local Time:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[65%]">{parsedFromEpoch.local}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60">
                <span className="text-slate-500 font-medium">ISO 8601:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{parsedFromEpoch.iso}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60">
                <span className="text-slate-500 font-medium">Relative:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{parsedFromEpoch.relative}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-500 font-mono">Invalid epoch timestamp</p>
          )}
        </div>

        {/* Date to Timestamp */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Human Date → Epoch Timestamp</h3>
            <button
              onClick={() => {
                const d = new Date();
                setDateInput(d.toISOString().slice(0, 10));
                setTimeInput(d.toTimeString().slice(0, 8));
              }}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset to Current
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Time (Local)</label>
              <input
                type="time"
                step="1"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          </div>

          {convertedToEpoch && (
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Seconds</span>
                  <span className="font-mono text-base font-extrabold text-blue-600 dark:text-blue-400">
                    {convertedToEpoch.seconds}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(convertedToEpoch.seconds.toString(), 'seconds')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 border border-slate-200 hover:bg-slate-100"
                >
                  {copiedKey === 'seconds' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Milliseconds</span>
                  <span className="font-mono text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                    {convertedToEpoch.milliseconds}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(convertedToEpoch.milliseconds.toString(), 'ms')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 border border-slate-200 hover:bg-slate-100"
                >
                  {copiedKey === 'ms' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
