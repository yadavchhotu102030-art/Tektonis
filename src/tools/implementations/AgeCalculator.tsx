import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Gift, Sparkles, Heart, Sun, ArrowRight, Share2, Check } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const today = new Date();
  const [birthDate, setBirthDate] = useState<string>('2000-01-15');
  const [targetDate, setTargetDate] = useState<string>(today.toISOString().slice(0, 10));
  const [activeTab, setActiveTab] = useState<'dob' | 'diff'>('dob');

  // Second date for difference calculation
  const [date1, setDate1] = useState<string>(today.toISOString().slice(0, 10));
  const [date2, setDate2] = useState<string>('2026-12-31');

  const [copied, setCopied] = useState(false);

  // Age calculations
  const ageDetails = useMemo(() => {
    const start = new Date(birthDate);
    const end = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDiffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next Birthday calculation
    const currentYearBirthday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    let nextBday = currentYearBirthday;
    if (currentYearBirthday < end) {
      nextBday = new Date(end.getFullYear() + 1, start.getMonth(), start.getDate());
    }

    const daysUntilNextBday = Math.ceil((nextBday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));

    // Day of week born
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekBorn = weekdays[start.getDay()];

    // Zodiac sign
    const getZodiac = (m: number, d: number) => {
      const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
      const signs = [
        'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
        'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'
      ];
      return d < dates[m - 1] ? signs[m - 1] : signs[m % 12];
    };
    const zodiac = getZodiac(start.getMonth() + 1, start.getDate());

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilNextBday,
      dayOfWeekBorn,
      zodiac,
      nextBirthdayDate: nextBday.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    };
  }, [birthDate, targetDate]);

  // Date difference calculation
  const dateDifference = useMemo(() => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    return {
      days,
      weeks,
      remainingDays,
      hours: days * 24,
    };
  }, [date1, date2]);

  const handleCopySummary = () => {
    if (!ageDetails) return;
    const text = `Age: ${ageDetails.years} years, ${ageDetails.months} months, ${ageDetails.days} days (${ageDetails.totalDays.toLocaleString()} total days). Born on a ${ageDetails.dayOfWeekBorn}. Zodiac: ${ageDetails.zodiac}. Next birthday in ${ageDetails.daysUntilNextBday} days. Calculated via Tektonis (https://tektonis.in).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('dob')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeTab === 'dob' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Age from Birthday</span>
        </button>
        <button
          onClick={() => setActiveTab('diff')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeTab === 'diff' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Date Difference</span>
        </button>
      </div>

      {activeTab === 'dob' ? (
        <div className="space-y-6">
          {/* Inputs */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-medium outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Age at the Date of
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-medium outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Primary Result Card */}
          {ageDetails ? (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
                      Your Exact Age
                    </span>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-4xl sm:text-6xl font-black tracking-tight">{ageDetails.years}</span>
                      <span className="text-xl sm:text-2xl font-bold opacity-90">years</span>
                      <span className="text-3xl sm:text-4xl font-extrabold">{ageDetails.months}</span>
                      <span className="text-lg sm:text-xl font-bold opacity-90">months</span>
                      <span className="text-3xl sm:text-4xl font-extrabold">{ageDetails.days}</span>
                      <span className="text-lg sm:text-xl font-bold opacity-90">days</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopySummary}
                    className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-md transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
                  </button>
                </div>
              </div>

              {/* Fun Milestones & Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Gift className="w-3.5 h-3.5 text-rose-500" />
                    <span className="font-semibold">Next Birthday</span>
                  </div>
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400">{ageDetails.daysUntilNextBday} <span className="text-xs font-medium text-slate-500">days</span></p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{ageDetails.nextBirthdayDate}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-semibold">Total Days Lived</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{ageDetails.totalDays.toLocaleString()}</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{ageDetails.totalWeeks.toLocaleString()} weeks</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold">Born on a</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{ageDetails.dayOfWeekBorn}</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Day of week</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    <span className="font-semibold">Zodiac Sign</span>
                  </div>
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{ageDetails.zodiac}</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Astrological sign</span>
                </div>
              </div>

              {/* Secondary conversions breakdown */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Lifespan in Other Time Units
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Hours</span>
                    <span className="text-base font-extrabold font-mono text-slate-800 dark:text-slate-200">{ageDetails.totalHours.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Minutes</span>
                    <span className="text-base font-extrabold font-mono text-slate-800 dark:text-slate-200">{ageDetails.totalMinutes.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Seconds</span>
                    <span className="text-base font-extrabold font-mono text-slate-800 dark:text-slate-200">{ageDetails.totalSeconds.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-rose-500 text-sm font-semibold rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
              Please ensure the birth date is prior to the comparison date.
            </div>
          )}
        </div>
      ) : (
        /* Date Difference Tab */
        <div className="space-y-6">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-medium outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm font-medium outline-hidden"
              />
            </div>
          </div>

          {dateDifference && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Difference Between Dates</span>
              <p className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {dateDifference.days.toLocaleString()} <span className="text-xl font-bold text-slate-600 dark:text-slate-300">Days</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Equal to <strong>{dateDifference.weeks} weeks and {dateDifference.remainingDays} days</strong> ({dateDifference.hours.toLocaleString()} hours)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
