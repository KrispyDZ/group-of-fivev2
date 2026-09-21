import React, { useState } from 'react';
import { DailyNutritionState } from '../types';

interface GoalsViewProps {
  nutritionState: DailyNutritionState;
  onUpdateGoals: (updates: Partial<DailyNutritionState>) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({ nutritionState, onUpdateGoals }) => {
  const [targetKcal, setTargetKcal] = useState(nutritionState.targetCalories);
  const [targetCarbs, setTargetCarbs] = useState(nutritionState.carbsTarget);
  const [targetProtein, setTargetProtein] = useState(nutritionState.proteinTarget);
  const [targetFat, setTargetFat] = useState(nutritionState.fatTarget);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    onUpdateGoals({
      targetCalories: targetKcal,
      carbsTarget: targetCarbs,
      proteinTarget: targetProtein,
      fatTarget: targetFat,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div id="goals-screen-container" className="flex flex-col w-full px-4 sm:px-5 space-y-4 pb-28 max-w-md mx-auto">
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#4c6358] uppercase tracking-widest">
            Personal Targets
          </span>
          <h2 className="text-[22px] font-bold text-[#151d19]">Nutrition Goals</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#cee9da] text-[#25533f] text-[12px] font-bold border border-[#3e6b56]/15">
          Active Plan
        </div>
      </div>

      {/* Daily Calorie Target Card */}
      <section className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#cee9da] text-[#25533f] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">energy_savings_leaf</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#151d19]">Daily Energy Goal</h3>
              <p className="text-[12px] text-[#4c6358]">Caloric baseline for steady vitality</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[22px] font-extrabold text-[#25533f]">{targetKcal}</span>
            <span className="text-[11px] text-[#414944] block -mt-1">kcal/day</span>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center justify-between pt-1 gap-2">
          <button
            onClick={() => setTargetKcal((prev) => Math.max(1200, prev - 50))}
            className="flex-1 py-2 rounded-lg bg-[#edf6ee] text-[#25533f] font-bold text-[13px] hover:bg-[#e7f0e9] active:scale-95 transition-all cursor-pointer"
          >
            - 50 kcal
          </button>
          <button
            onClick={() => setTargetKcal((prev) => Math.min(3500, prev + 50))}
            className="flex-1 py-2 rounded-lg bg-[#edf6ee] text-[#25533f] font-bold text-[13px] hover:bg-[#e7f0e9] active:scale-95 transition-all cursor-pointer"
          >
            + 50 kcal
          </button>
        </div>
      </section>

      {/* Macronutrient Ratios Card */}
      <section className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#151d19]">Macronutrient Allocation</h3>
            <p className="text-[12px] text-[#4c6358]">Target gram splits per day</p>
          </div>
          <span className="text-[11px] font-bold text-[#25533f] bg-[#edf6ee] px-2 py-0.5 rounded-full">
            Nordic Balance
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {/* Protein */}
          <div className="space-y-1">
            <div className="flex justify-between text-[12px]">
              <span className="font-bold text-[#80311c]">Protein</span>
              <span className="font-bold text-[#151d19]">{targetProtein}g</span>
            </div>
            <input
              type="range"
              min="80"
              max="220"
              step="5"
              value={targetProtein}
              onChange={(e) => setTargetProtein(Number(e.target.value))}
              className="w-full accent-[#9f4831] cursor-pointer"
            />
          </div>

          {/* Carbs */}
          <div className="space-y-1">
            <div className="flex justify-between text-[12px]">
              <span className="font-bold text-[#3e6b56]">Carbohydrates</span>
              <span className="font-bold text-[#151d19]">{targetCarbs}g</span>
            </div>
            <input
              type="range"
              min="100"
              max="350"
              step="5"
              value={targetCarbs}
              onChange={(e) => setTargetCarbs(Number(e.target.value))}
              className="w-full accent-[#3e6b56] cursor-pointer"
            />
          </div>

          {/* Fat */}
          <div className="space-y-1">
            <div className="flex justify-between text-[12px]">
              <span className="font-bold text-[#52695e]">Healthy Fats</span>
              <span className="font-bold text-[#151d19]">{targetFat}g</span>
            </div>
            <input
              type="range"
              min="30"
              max="120"
              step="2"
              value={targetFat}
              onChange={(e) => setTargetFat(Number(e.target.value))}
              className="w-full accent-[#4c6358] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Mindful Routine & Weight Goal */}
      <section className="bg-white p-4 rounded-xl shadow-xs border border-[#3e6b56]/10 space-y-3">
        <h3 className="text-[14px] font-bold text-[#151d19]">Hydration &amp; Weight Goals</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/8 flex flex-col">
            <span className="text-[11px] text-[#414944] font-medium">Daily Water Target</span>
            <span className="text-[16px] font-bold text-[#25533f] mt-0.5">2.0 Liters</span>
            <span className="text-[11px] text-[#4c6358]">8 standard cups</span>
          </div>

          <div className="p-3 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/8 flex flex-col">
            <span className="text-[11px] text-[#414944] font-medium">Goal Weight</span>
            <span className="text-[16px] font-bold text-[#25533f] mt-0.5">65.0 kg</span>
            <span className="text-[11px] text-[#4c6358]">-2.4 kg remaining</span>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="w-full h-12 rounded-full bg-[#25533f] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs hover:bg-[#3e6b56] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">check</span>
          <span>Save Goal Preferences</span>
        </button>
      </div>

      {savedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#25533f] text-white text-[12px] font-bold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <span className="material-symbols-outlined text-[16px]">task_alt</span>
          <span>Goals updated successfully!</span>
        </div>
      )}
    </div>
  );
};
