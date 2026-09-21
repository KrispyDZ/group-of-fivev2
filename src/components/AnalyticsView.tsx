import React, { useState } from 'react';

export const AnalyticsView: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<'week' | 'month' | '3m' | 'year'>('week');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const weeklyData = [
    { day: 'M', kcal: 2080, heightPct: 68, isIdeal: true },
    { day: 'T', kcal: 1990, heightPct: 62, isIdeal: true },
    { day: 'W', kcal: 2120, heightPct: 70, isIdeal: true },
    { day: 'T', kcal: 2050, heightPct: 67, isIdeal: true, isHighlight: true },
    { day: 'F', kcal: 2210, heightPct: 76, isIdeal: false },
    { day: 'S', kcal: 1910, heightPct: 58, isIdeal: false },
    { day: 'S', kcal: 1955, heightPct: 61, isIdeal: true },
  ];

  const handleExport = () => {
    setShowExportModal(true);
    setReportGenerated(true);
  };

  return (
    <div id="analytics-screen-container" className="flex flex-col w-full px-4 sm:px-5 space-y-4 pb-28 max-w-md mx-auto">
      {/* 1. Header Welcome & Micro Feedback */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#4c6358] uppercase tracking-widest">
            Performance Insights
          </span>
          <h2 className="text-[22px] font-bold text-[#151d19]">Weekly Rhythm</h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#cee9da] text-[#52695e] shadow-xs border border-[#3e6b56]/15">
          <span
            className="material-symbols-outlined text-[18px] text-[#25533f]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
          <span className="text-[12px] font-bold text-[#25533f]">On Track</span>
        </div>
      </div>

      {/* 2. Time Period Toggle */}
      <div
        id="period-selector-container"
        className="w-full bg-[#e1eae3] p-1 rounded-full flex items-center shadow-inner"
      >
        {(['week', 'month', '3m', 'year'] as const).map((period) => {
          const isActive = activePeriod === period;
          const labels: Record<string, string> = {
            week: 'Week',
            month: 'Month',
            '3m': '3 Months',
            year: 'Year',
          };
          return (
            <button
              key={period}
              id={`period-btn-${period}`}
              onClick={() => setActivePeriod(period)}
              className={`flex-1 py-1.5 text-center rounded-full text-[12px] font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-[#25533f] shadow-xs'
                  : 'text-[#414944] hover:text-[#151d19]'
              }`}
            >
              {labels[period]}
            </button>
          );
        })}
      </div>

      {/* 3. Weekly Calorie Intake Bar Chart */}
      <section
        id="calorie-intake-chart-section"
        className="bg-white rounded-xl p-4 shadow-xs border border-[#3e6b56]/10 flex flex-col space-y-2"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[34px] font-extrabold text-[#25533f] tracking-tight">
                2,045
              </span>
              <span className="text-[12px] text-[#414944] font-medium">kcal / day avg</span>
            </div>
            <p className="text-[13px] text-[#4c6358] flex items-center gap-1 mt-0.5 font-medium">
              <span
                className="material-symbols-outlined text-[16px] text-[#25533f]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              Within target band (±55 kcal of 2,100 goal)
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#edf6ee] px-2.5 py-1 rounded-lg border border-[#3e6b56]/10">
            <span className="w-2 h-2 rounded-full bg-[#25533f]" />
            <span className="text-[11px] font-bold text-[#414944]">Target 2.1k</span>
          </div>
        </div>

        {/* Interactive Visual Bar Chart */}
        <div className="pt-4 pb-1 relative">
          {/* Target Reference Line */}
          <div className="absolute w-full top-[38%] left-0 flex items-center pointer-events-none z-10">
            <div className="w-full border-t border-dashed border-[#25533f]/40" />
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-44 w-full pt-4">
            {weeklyData.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer relative"
              >
                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-4 text-[10px] font-bold text-[#151d19] bg-[#e1eae3] px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap z-20">
                  {item.kcal}
                </span>

                {/* Bar */}
                <div
                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                    item.isHighlight
                      ? 'bg-[#25533f] shadow-xs ring-2 ring-[#bceed3]'
                      : item.isIdeal
                      ? 'bg-[#3e6b56] group-hover:bg-[#25533f]'
                      : 'bg-[#b3ccbf] group-hover:bg-[#4c6358]'
                  }`}
                  style={{ height: `${item.heightPct}%` }}
                />

                {/* Day label */}
                <span
                  className={`text-[12px] font-bold ${
                    item.isHighlight ? 'text-[#25533f]' : 'text-[#414944]'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#edf6ee] text-[#414944] text-[11px] font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3e6b56]" />
            <span>Ideal (Within 4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b3ccbf]" />
            <span>Adaptive Shift</span>
          </div>
        </div>
      </section>

      {/* 4. Macro Consistency Breakdown Card */}
      <section
        id="macro-balance-card"
        className="bg-white rounded-xl p-4 shadow-xs border border-[#3e6b56]/10 flex flex-col space-y-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-bold text-[#151d19]">Macronutrient Balance</h3>
            <p className="text-[12px] text-[#4c6358]">Balanced fuel for sustained daily energy</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 bg-[#cee9da] text-[#354c41] px-2.5 py-1 rounded-full text-[11px] font-bold border border-[#25533f]/15">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              94% Match
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Donut Chart SVG */}
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" fill="none" r="48" stroke="#e7f0e9" strokeWidth="12" />
              {/* Carbs 45%: stroke-dasharray="135.7 301.6" */}
              <circle
                cx="60"
                cy="60"
                fill="none"
                r="48"
                stroke="#3e6b56"
                strokeDasharray="135.7 301.6"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeWidth="12"
              />
              {/* Protein 28%: stroke-dasharray="84.4 301.6", offset -140 */}
              <circle
                cx="60"
                cy="60"
                fill="none"
                r="48"
                stroke="#9f4831"
                strokeDasharray="84.4 301.6"
                strokeDashoffset="-140"
                strokeLinecap="round"
                strokeWidth="12"
              />
              {/* Fat 27%: stroke-dasharray="81.4 301.6", offset -229 */}
              <circle
                cx="60"
                cy="60"
                fill="none"
                r="48"
                stroke="#b3ccbf"
                strokeDasharray="81.4 301.6"
                strokeDashoffset="-229"
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[22px] font-extrabold text-[#25533f]">94%</span>
              <span className="text-[10px] text-[#414944] font-bold uppercase tracking-wider">
                Score
              </span>
            </div>
          </div>

          {/* Macro Indicators & Details */}
          <div className="flex-1 w-full space-y-2">
            {/* Carbs */}
            <div className="p-2 rounded-lg bg-[#edf6ee] flex items-center justify-between border border-[#3e6b56]/8">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#3e6b56]" />
                <div>
                  <span className="text-[12px] font-bold text-[#151d19] block">Carbohydrates</span>
                  <span className="text-[11px] text-[#414944]">230g avg (Target 45-50%)</span>
                </div>
              </div>
              <span className="text-[16px] text-[#25533f] font-extrabold">45%</span>
            </div>

            {/* Protein */}
            <div className="p-2 rounded-lg bg-[#edf6ee] flex items-center justify-between border border-[#3e6b56]/8">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#9f4831]" />
                <div>
                  <span className="text-[12px] font-bold text-[#151d19] block">Protein</span>
                  <span className="text-[11px] text-[#414944]">143g avg (Target 25-30%)</span>
                </div>
              </div>
              <span className="text-[16px] text-[#80311c] font-extrabold">28%</span>
            </div>

            {/* Fats */}
            <div className="p-2 rounded-lg bg-[#edf6ee] flex items-center justify-between border border-[#3e6b56]/8">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#b3ccbf]" />
                <div>
                  <span className="text-[12px] font-bold text-[#151d19] block">Healthy Fats</span>
                  <span className="text-[11px] text-[#414944]">61g avg (Target 25-30%)</span>
                </div>
              </div>
              <span className="text-[16px] text-[#4c6358] font-extrabold">27%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Weight & Body Trend Card */}
      <section
        id="weight-trajectory-card"
        className="bg-white rounded-xl p-4 shadow-xs border border-[#3e6b56]/10 relative overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-[#151d19]">Weight Trajectory</h3>
              <span className="flex items-center text-[#25533f] text-[11px] font-bold bg-[#bceed3] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                -0.8 kg
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[26px] font-extrabold text-[#151d19]">67.4</span>
              <span className="text-[13px] text-[#414944]">kg (Started 68.2)</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#4c6358] block">Goal: 65.0 kg</span>
            <span className="text-[12px] text-[#25533f] font-bold">68% of milestone</span>
          </div>
        </div>

        {/* Sparkline Inline SVG with Gentle Gradient Fill */}
        <div className="mt-4 h-16 w-full relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 60">
            <defs>
              <linearGradient id="weightGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3e6b56" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3e6b56" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polygon
              fill="url(#weightGradient)"
              points="0,10 50,15 100,24 150,20 200,38 250,42 300,50 300,60 0,60"
            />
            <polyline
              fill="none"
              points="0,10 50,15 100,24 150,20 200,38 250,42 300,50"
              stroke="#3e6b56"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <circle cx="0" cy="10" fill="#ffffff" r="3.5" stroke="#3e6b56" strokeWidth="2" />
            <circle cx="150" cy="20" fill="#ffffff" r="3.5" stroke="#3e6b56" strokeWidth="2" />
            <circle cx="300" cy="50" fill="#25533f" r="4.5" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between items-center mt-2 text-[#414944] text-[11px]">
          <span>7 days ago (68.2 kg)</span>
          <span className="text-[#25533f] font-bold">Today (67.4 kg)</span>
        </div>
      </section>

      {/* 6. Habit & Milestone Streaks */}
      <section id="habits-consistency-section" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#151d19]">Habits &amp; Consistency</h3>
          <span className="text-[12px] text-[#4c6358] font-medium">Active cycle</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* 12-Day Nourish Streak Hero Tile */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#3e6b56]/10 flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3.5 z-10">
              <div className="w-12 h-12 rounded-full bg-[#cee9da] text-[#25533f] flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[14px] font-bold text-[#151d19]">12-Day Nourish Streak</h4>
                  <span className="px-1.5 py-0.5 rounded bg-[#bceed3] text-[#002114] text-[10px] font-bold">
                    Top 5%
                  </span>
                </div>
                <p className="text-[12px] text-[#4c6358]">Every meal logged with mindful precision</p>
              </div>
            </div>

            <div className="flex flex-col items-end z-10">
              <span className="text-[22px] font-bold text-[#25533f]">12</span>
              <span className="text-[11px] text-[#414944]">days active</span>
            </div>
            <div className="absolute -right-4 -bottom-6 w-24 h-24 bg-[#bceed3]/30 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Water Goal Achieved */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#3e6b56]/10 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#edf6ee] text-[#25533f] flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#151d19]">Daily Hydration</h4>
                <p className="text-[12px] text-[#414944]">2.4L daily goal achieved</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[13px] font-bold text-[#25533f]">6 / 7</span>
                <span className="text-[10px] text-[#4c6358]">days met</span>
              </div>
              <div className="w-10 h-2 bg-[#e1eae3] rounded-full overflow-hidden">
                <div className="bg-[#25533f] h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          {/* High Protein Days */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-[#3e6b56]/10 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#ffd5cb]/30 text-[#80311c] flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  fitness_center
                </span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#151d19]">Protein Target (&gt;130g)</h4>
                <p className="text-[12px] text-[#414944]">Supports muscular recovery</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[13px] font-bold text-[#80311c]">5 / 7</span>
                <span className="text-[10px] text-[#4c6358]">days met</span>
              </div>
              <div className="w-10 h-2 bg-[#e1eae3] rounded-full overflow-hidden">
                <div className="bg-[#9f4831] h-full rounded-full" style={{ width: '71%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Visual Healthy Plate Inspiration Thumbnail Pair */}
      <section className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#3e6b56]/10 flex flex-col space-y-2">
          <div className="w-full h-24 rounded-lg overflow-hidden relative bg-[#edf6ee]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Uzexmv3fo6dt8I3vKu_Q7MhspWi3p3f5V0aR0nJSVqw-ZeYwIbLSq1y6R2TEWZrEpmSidl_TYSDds6tj3bQVLoKDYgMOYTlACQ5CzsS4BTmtlhTaEdJqp6yTHau6qxDbC19dbsgb3hZ74hLBqqNd-SDY-darSn_MRZWGA_lBAt5EqKaSHB5r6KoGvDYTmsz6ejXpTM_EvKS-EHWIewPYF5fywku0FawPDrVPMHMK7CdDFUSvxhTX"
              alt="Wild Salmon Bowl"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] text-[#25533f] font-bold">
              Top Protein Meal
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-[12px] font-semibold text-[#151d19] truncate">Wild Salmon Bowl</span>
            <span className="text-[11px] text-[#4c6358] font-bold">48g P</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#3e6b56]/10 flex flex-col space-y-2">
          <div className="w-full h-24 rounded-lg overflow-hidden relative bg-[#edf6ee]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjYnDyRJWWP3V-uIeSeN0YDlc9FxyFUGy7DQtte1iDyj28oX49QWvdXXc5GW3NyF-DSEoMTbNdgBzjwzq5QrTQlT4qUEYbiWuI3DMQhMTEnjcAM8nOd-ne5DWsOI7--BvqMd15l9tnVU-LoJpJH32LBHZK7JyKPbFpUQYGe5UKJXPm9jgqnEoIBUu8M0pf_DR7B9SFaC2sx2pKJYpHVMWos4LxBz6oL-ua2JhldiqZFM0BWvWzcW1P"
              alt="Berries & Chia"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] text-[#25533f] font-bold">
              Routine Anchor
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-[12px] font-semibold text-[#151d19] truncate">Berries &amp; Chia</span>
            <span className="text-[11px] text-[#4c6358] font-bold">310 kcal</span>
          </div>
        </div>
      </section>

      {/* 8. Export & Share Report Actions */}
      <div className="pt-2 flex flex-col items-center space-y-2">
        <button
          id="share-report-btn"
          type="button"
          onClick={handleExport}
          className="w-full h-12 rounded-full bg-[#25533f] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98] hover:bg-[#3e6b56] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            {reportGenerated ? 'check' : 'ios_share'}
          </span>
          <span>{reportGenerated ? 'Weekly Report Exported!' : 'Export & Share Weekly Report'}</span>
        </button>
        <p className="text-[12px] text-[#414944] text-center">
          Generates PDF breakdown suitable for nutritionists or personal logs.
        </p>
      </div>

      {/* Export Report Preview Modal */}
      {showExportModal && (
        <div
          id="export-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            id="export-modal-card"
            className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-[#3e6b56]/20 flex flex-col space-y-4 animate-in fade-in zoom-in duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#25533f] text-[24px]">description</span>
                <h3 className="text-[16px] font-bold text-[#151d19]">Nourish Weekly Report</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#717973] hover:bg-[#edf6ee] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="bg-[#f3fcf4] p-3.5 rounded-xl border border-[#3e6b56]/15 space-y-2 text-[12px] text-[#414944]">
              <div className="flex justify-between font-semibold text-[#151d19]">
                <span>Week 43 (Oct 18 - Oct 24)</span>
                <span className="text-[#25533f]">On Track</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Daily Intake:</span>
                <span className="font-bold text-[#151d19]">2,045 kcal (Goal: 2,100)</span>
              </div>
              <div className="flex justify-between">
                <span>Macro Balance Score:</span>
                <span className="font-bold text-[#151d19]">94% Match</span>
              </div>
              <div className="flex justify-between">
                <span>Protein Compliance:</span>
                <span className="font-bold text-[#80311c]">5 of 7 days met</span>
              </div>
              <div className="flex justify-between">
                <span>Weight Shift:</span>
                <span className="font-bold text-[#25533f]">-0.8 kg</span>
              </div>
            </div>

            <p className="text-[11px] text-[#717973] italic">
              Ready for sharing via AirDrop, Email, or printing for your clinical nutritionist.
            </p>

            <button
              onClick={() => setShowExportModal(false)}
              className="w-full h-10 rounded-full bg-[#25533f] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#3e6b56] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download PDF Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
