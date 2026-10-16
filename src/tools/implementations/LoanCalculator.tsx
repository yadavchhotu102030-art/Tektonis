import React, { useState, useMemo } from 'react';
import { DollarSign, PieChart, Calendar, Calculator, Check, Copy } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [currency, setCurrency] = useState<string>('$');
  const [copied, setCopied] = useState(false);

  // EMI and Loan calculations
  const calculation = useMemo(() => {
    const P = loanAmount;
    const annualR = interestRate;
    const N = tenureYears * 12; // total months

    if (P <= 0 || annualR <= 0 || N <= 0) {
      return {
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPercent: 100,
        interestPercent: 0,
        schedule: [] as { year: number; principalPaid: number; interestPaid: number; balance: number }[],
      };
    }

    const r = annualR / (12 * 100); // monthly interest rate
    // EMI formula: E = P * r * (1+r)^N / ((1+r)^N - 1)
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const principalPercent = Math.round((P / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

    // Build yearly amortization table
    let balance = P;
    const schedule = [];
    for (let yr = 1; yr <= tenureYears; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const interest = balance * r;
        const principal = emi - interest;
        yearlyInterest += interest;
        yearlyPrincipal += principal;
        balance = Math.max(0, balance - principal);
      }
      schedule.push({
        year: yr,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        balance: Math.round(balance),
      });
    }

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent,
      interestPercent,
      schedule,
    };
  }, [loanAmount, interestRate, tenureYears]);

  const handleCopySummary = () => {
    const text = `Loan Summary: ${currency}${loanAmount.toLocaleString()} loan at ${interestRate}% for ${tenureYears} years. Monthly EMI: ${currency}${calculation.monthlyEmi.toLocaleString()}, Total Interest: ${currency}${calculation.totalInterest.toLocaleString()}, Total Payment: ${currency}${calculation.totalPayment.toLocaleString()}. Calculated on Tektonis (https://tektonis.in).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls and Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input sliders panel */}
        <div className="lg:col-span-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Loan & Mortgage Parameters</span>
            </h3>

            {/* Currency selector */}
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-0.5 text-xs font-bold">
              {['$', '€', '£', '₹'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    currency === curr ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Loan Amount
              </label>
              <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">
                {currency}{loanAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={1000000}
              step={5000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>{currency}5K</span>
              <span>{currency}500K</span>
              <span>{currency}1M</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Annual Interest Rate
              </label>
              <span className="font-mono text-base font-black text-indigo-600 dark:text-indigo-400">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>1%</span>
              <span>12.5%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Loan Tenure
              </label>
              <span className="font-mono text-base font-black text-purple-600 dark:text-purple-400">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Output cards & breakdown */}
        <div className="lg:col-span-6 space-y-4">
          {/* Monthly EMI Hero Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md relative overflow-hidden">
            <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-2">
              Monthly Payment (EMI)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono">
                {currency}{calculation.monthlyEmi.toLocaleString()}
              </span>
              <span className="text-sm font-semibold opacity-80">/ month</span>
            </div>

            <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
              <div>
                <span className="text-[11px] opacity-75 block">Total Repayment</span>
                <span className="text-lg font-bold font-mono">{currency}{calculation.totalPayment.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCopySummary}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                <span>Principal Amount: {currency}{loanAmount.toLocaleString()} ({calculation.principalPercent}%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>Total Interest: {currency}{calculation.totalInterest.toLocaleString()} ({calculation.interestPercent}%)</span>
              </span>
            </div>

            {/* Visual ratio bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex">
              <div
                style={{ width: `${calculation.principalPercent}%` }}
                className="bg-blue-600 h-full transition-all duration-300"
              />
              <div
                style={{ width: `${calculation.interestPercent}%` }}
                className="bg-amber-500 h-full transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Amortization Schedule Table */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Annual Amortization Schedule</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="p-2.5">Year</th>
                <th className="p-2.5">Principal Paid</th>
                <th className="p-2.5">Interest Paid</th>
                <th className="p-2.5">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {calculation.schedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300">Year {row.year}</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400">{currency}{row.principalPaid.toLocaleString()}</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400">{currency}{row.interestPaid.toLocaleString()}</td>
                  <td className="p-2.5 font-semibold text-slate-900 dark:text-white">{currency}{row.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
