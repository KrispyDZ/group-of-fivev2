import React from 'react';
import { LoggedMeal, DayStreak, DailyNutritionState } from '../types';
import { WaterTracker } from './WaterTracker';

interface TodayViewProps {
  nutritionState: DailyNutritionState;
  meals: LoggedMeal[];
  streakDays: DayStreak[];
  selectedDate: string;
  onSelectDate: (dateKey: string) => void;
  onAddWater: () => void;
  onToggleCup: (index: number) => void;
  onNavigateToLog: () => void;
  onOpenMealDetail: (meal: LoggedMeal) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  nutritionState,
  meals,
  streakDays,
  selectedDate,
  onSelectDate,
  onAddWater,
  onToggleCup,
  onNavigateToLog,
  onOpenMealDetail,
}) => {
  const {
    targetCalories,
    consumedCalories,
    burnedCalories,
    carbsTarget,
    carbsCurrent,
    proteinTarget,
    proteinCurrent,
    fatTarget,
    fatCurrent,
    waterCups,
    totalWaterCups,
  } = nutritionState;

  const remainingKcal = Math.max(0, targetCalories - consumedCalories);
  const intakeCircumference = 2 * Math.PI * 68; // ~427.25
  const intakeRatio = Math.min(1, consumedCalories / targetCalories);
  const intakeOffset = intakeCircumference * (1 - intakeRatio);

  const carbsPercent = Math.min(100, Math.round((carbsCurrent / carbsTarget) * 100));
  const proteinPercent = Math.min(100, Math.round((proteinCurrent / proteinTarget) * 100));
  const fatPercent = Math.min(100, Math.round((fatCurrent / fatTarget) * 100));

  return (
    <div id="today-screen-container" className="flex flex-col w-full px-4 sm:px-5 pb-8 space-y-4 max-w-md mx-auto">
      {/* 1. Date Picker Header & Streak Strip */}
      <section id="date-picker-streak-section" className="flex flex-col space-y-2 pt-2">
        {/* Date Switcher */}
        <div className="flex items-center justify-between">
          <button
            id="prev-day-btn"
            aria-label="Previous Day"
            onClick={() => {
              const curIdx = streakDays.findIndex((d) => d.dateKey === selectedDate);
              if (curIdx > 0) onSelectDate(streakDays[curIdx - 1].dateKey);
            }}
            className="w-9 h-9 rounded-full bg-[#e7f0e9] flex items-center justify-center text-[#151d19] hover:bg-[#e1eae3] transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[18px] text-[#25533f]">calendar_today</span>
            <span className="font-['Plus_Jakarta_Sans'] text-base text-[#151d19] font-bold">
              {selectedDate === '2026-10-24' ? 'Today, Oct 24' : `Day ${selectedDate.slice(-2)}, Oct`}
            </span>
          </div>

          <button
            id="next-day-btn"
            aria-label="Next Day"
            onClick={() => {
              const curIdx = streakDays.findIndex((d) => d.dateKey === selectedDate);
              if (curIdx < streakDays.length - 1) onSelectDate(streakDays[curIdx + 1].dateKey);
            }}
            className="w-9 h-9 rounded-full bg-[#e7f0e9] flex items-center justify-center text-[#151d19] hover:bg-[#e1eae3] transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

        {/* Weekly Mini Streak Strip */}
        <div
          id="weekly-streak-strip"
          className="grid grid-cols-7 gap-1.5 bg-white p-2 rounded-xl shadow-xs border border-[#3e6b56]/10"
        >
          {streakDays.map((item) => {
            const isSelected = item.dateKey === selectedDate;
            return (
              <button
                key={item.dateKey}
                id={`streak-day-${item.dateKey}`}
                onClick={() => onSelectDate(item.dateKey)}
                className={`flex flex-col items-center py-1.5 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#25533f] text-white shadow-xs scale-105 font-semibold'
                    : item.isCompleted
                    ? 'bg-[#edf6ee] text-[#414944] hover:bg-[#e7f0e9]'
                    : 'text-[#414944]/60 hover:bg-[#edf6ee]/50'
                }`}
              >
                <span className="text-[11px] font-bold uppercase">{item.dayName}</span>
                <span className="text-[12px] font-bold mt-0.5">{item.dateNum}</span>
                {item.isCompleted ? (
                  <span
                    className={`material-symbols-outlined text-[14px] mt-1 ${
                      isSelected ? 'text-[#bceed3]' : 'text-[#25533f]'
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : isSelected ? (
                  <span className="material-symbols-outlined text-[14px] text-[#bceed3] mt-1">lens</span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0c9c2] mt-2"></span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Daily Mindful Tip / Celebration Banner */}
      <section
        id="celebration-banner"
        className="flex items-center space-x-3 p-3 bg-[#cee9da] rounded-xl shadow-xs border border-[#3e6b56]/15"
      >
        <div className="w-9 h-9 rounded-full bg-[#25533f] flex items-center justify-center text-white shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#52695e] leading-snug">
          <span className="font-bold text-[#25533f]">Protein champion!</span> You hit your protein goal 4 days in a row.
          Keep the momentum high today!
        </p>
      </section>

      {/* 3. Calorie Summary Hero Card */}
      <section
        id="calorie-summary-hero-card"
        className="bg-white p-5 rounded-xl shadow-xs border border-[#3e6b56]/10 flex flex-col items-center relative overflow-hidden"
      >
        <div className="w-full flex justify-between items-center mb-1">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#414944] uppercase tracking-wider font-semibold">
              Daily Balance
            </span>
            <span className="text-[18px] text-[#151d19] font-bold">Energy &amp; Burn</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#edf6ee] text-[#25533f] text-[11px] font-bold border border-[#3e6b56]/15">
            Goal {targetCalories.toLocaleString()}
          </span>
        </div>

        {/* Concentric Ring Chart & Center Stats */}
        <div className="relative w-52 h-52 flex items-center justify-center my-2">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Outer Track */}
            <circle cx="80" cy="80" fill="none" r="68" stroke="#edf6ee" strokeWidth="12" />

            {/* Inner Burned Ring Accent Background */}
            <circle cx="80" cy="80" fill="none" opacity="0.4" r="54" stroke="#ffd5cb" strokeWidth="6" />
            {/* Calories Burned Ring */}
            <circle
              cx="80"
              cy="80"
              fill="none"
              r="54"
              stroke="#9f4831"
              strokeDasharray="339.29"
              strokeDashoffset="240"
              strokeLinecap="round"
              strokeWidth="6"
            />

            {/* Calorie Intake Ring */}
            <circle
              className="transition-all duration-1000 ease-out"
              cx="80"
              cy="80"
              fill="none"
              r="68"
              stroke="#3e6b56"
              strokeDasharray={intakeCircumference}
              strokeDashoffset={intakeOffset}
              strokeLinecap="round"
              strokeWidth="12"
            />
          </svg>

          {/* Center Typography */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-[11px] text-[#414944] font-medium tracking-wide">REMAINING</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[34px] text-[#25533f] font-extrabold tracking-tight leading-none my-0.5">
              {remainingKcal.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#414944] font-medium">kcal</span>
          </div>
        </div>

        {/* Bottom Secondary Metrics */}
        <div className="grid grid-cols-2 w-full gap-2 pt-2">
          <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/8">
            <div className="w-8 h-8 rounded-full bg-[#e1eae3] flex items-center justify-center text-[#25533f]">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#414944] font-medium">Consumed</span>
              <span className="text-[14px] text-[#151d19] font-bold">
                {consumedCalories.toLocaleString()}{' '}
                <span className="text-[12px] font-normal text-[#414944]">kcal</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/8">
            <div className="w-8 h-8 rounded-full bg-[#ffd5cb]/40 flex items-center justify-center text-[#9f4831]">
              <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#414944] font-medium">Burned</span>
              <span className="text-[14px] text-[#151d19] font-bold">
                +{burnedCalories}{' '}
                <span className="text-[12px] font-normal text-[#414944]">kcal</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Macronutrient Progress Bars */}
      <section
        id="macronutrient-progress-section"
        className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[18px] text-[#151d19] font-bold">Macronutrients</span>
          <span className="text-[12px] text-[#414944] font-medium">Daily Ratios</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Carbs */}
          <div className="flex flex-col bg-[#edf6ee] p-2.5 rounded-lg space-y-2 border border-[#3e6b56]/8">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#151d19]">Carbs</span>
              <span className="text-[12px] text-[#414944] font-medium">{carbsPercent}%</span>
            </div>
            <div className="w-full bg-[#dce5dd] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#4c6358] h-full rounded-full transition-all duration-500"
                style={{ width: `${carbsPercent}%` }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#151d19]">
                {carbsCurrent}
                <span className="font-normal text-[#414944]">/{carbsTarget}g</span>
              </span>
              <span className="text-[11px] text-[#414944]">
                {Math.max(0, carbsTarget - carbsCurrent)}g left
              </span>
            </div>
          </div>

          {/* Protein */}
          <div className="flex flex-col bg-[#edf6ee] p-2.5 rounded-lg space-y-2 border border-[#3e6b56]/8">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#151d19]">Protein</span>
              <span className="text-[12px] text-[#80311c] font-semibold">{proteinPercent}%</span>
            </div>
            <div className="w-full bg-[#dce5dd] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#9f4831] h-full rounded-full transition-all duration-500"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#151d19]">
                {proteinCurrent}
                <span className="font-normal text-[#414944]">/{proteinTarget}g</span>
              </span>
              <span className="text-[11px] text-[#414944]">
                {Math.max(0, proteinTarget - proteinCurrent)}g left
              </span>
            </div>
          </div>

          {/* Fat */}
          <div className="flex flex-col bg-[#edf6ee] p-2.5 rounded-lg space-y-2 border border-[#3e6b56]/8">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#151d19]">Fat</span>
              <span className="text-[12px] text-[#414944] font-medium">{fatPercent}%</span>
            </div>
            <div className="w-full bg-[#dce5dd] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#3e6b56] h-full rounded-full transition-all duration-500"
                style={{ width: `${fatPercent}%` }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#151d19]">
                {fatCurrent}
                <span className="font-normal text-[#414944]">/{fatTarget}g</span>
              </span>
              <span className="text-[11px] text-[#414944]">
                {Math.max(0, fatTarget - fatCurrent)}g left
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Water Intake Widget */}
      <section
        id="hydration-widget-section"
        className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span
              className="material-symbols-outlined text-[#25533f] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              water_drop
            </span>
            <span className="text-[18px] text-[#151d19] font-bold">Hydration</span>
          </div>
          <span className="text-[12px] text-[#414944] font-medium">
            {waterCups} of {totalWaterCups} cups ({(waterCups * 0.25).toFixed(2)}L / 2.0L)
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* 8-Cup Indicator Display */}
          <div id="water-cup-container" className="flex items-center space-x-1 sm:space-x-1.5">
            {Array.from({ length: totalWaterCups }).map((_, index) => {
              const isFilled = index < waterCups;
              return (
                <button
                  key={index}
                  id={`water-cup-btn-${index}`}
                  onClick={() => onToggleCup(index)}
                  aria-label={`Toggle cup ${index + 1}`}
                  className={`w-7 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                    isFilled
                      ? 'bg-[#cee9da] text-[#25533f] shadow-xs'
                      : 'bg-[#edf6ee] text-[#c0c9c2] hover:bg-[#e7f0e9]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={isFilled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    water_drop
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Add Cup Button */}
          <button
            id="add-water-btn"
            onClick={onAddWater}
            aria-label="Log 250ml cup"
            className="h-10 px-3 rounded-full bg-[#25533f] text-white flex items-center space-x-1 transition-all active:scale-95 shadow-xs hover:bg-[#3e6b56] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="text-[12px] font-bold">250ml</span>
          </button>
        </div>
      </section>

      {/* 6. Meals Overview List with Quick-Add */}
      <section id="todays-meals-overview-section" className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[18px] text-[#151d19] font-bold">Today's Nourishment</span>
          <span className="text-[12px] text-[#25533f] font-semibold">
            {meals.filter((m) => m.isLogged).length} of 4 Logged
          </span>
        </div>

        {meals.map((meal) => {
          if (!meal.isLogged) {
            return (
              <div
                key={meal.id}
                id={`meal-card-${meal.id}-unlogged`}
                className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10 flex items-center justify-between hover:border-[#3e6b56]/20 transition-all"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-[#edf6ee] flex items-center justify-center text-[#414944] shrink-0 border border-[#3e6b56]/8">
                    <span className="material-symbols-outlined text-[26px]">dinner_dining</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] text-[#151d19] font-bold">{meal.title}</span>
                    <span className="text-[12px] text-[#414944]">{meal.description}</span>
                  </div>
                </div>

                <button
                  id={`add-meal-cta-${meal.id}`}
                  onClick={onNavigateToLog}
                  className="h-9 px-4 rounded-full bg-[#25533f] text-white flex items-center space-x-1.5 transition-all active:scale-95 shadow-xs hover:bg-[#3e6b56] cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span className="text-[12px] font-bold">Add {meal.title}</span>
                </button>
              </div>
            );
          }

          return (
            <div
              key={meal.id}
              id={`meal-card-${meal.id}-logged`}
              onClick={() => onOpenMealDetail(meal)}
              className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10 flex items-center justify-between hover:border-[#3e6b56]/25 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 relative bg-[#edf6ee]">
                  {meal.image ? (
                    <img
                      src={meal.image}
                      alt={meal.imageAlt || meal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#25533f]">
                      <span className="material-symbols-outlined text-[24px]">restaurant</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-[#25533f] text-white rounded-full p-0.5 flex items-center justify-center shadow-xs">
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[14px] text-[#151d19] font-bold truncate">
                      {meal.title}
                    </span>
                    <span
                      className="text-[#25533f] material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <span className="text-[12px] text-[#414944] truncate">{meal.description}</span>
                  <span className="text-[12px] text-[#25533f] font-bold mt-0.5">
                    {meal.calories} kcal
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#414944] group-hover:bg-[#edf6ee] transition-colors shrink-0">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
