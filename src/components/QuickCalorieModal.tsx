import React, { useState } from 'react';
import { MealType } from '../types';

interface QuickCalorieModalProps {
  isOpen: boolean;
  activeMeal: MealType;
  onClose: () => void;
  onLogQuickCalories: (calories: number, meal: MealType, note: string) => void;
}

export const QuickCalorieModal: React.FC<QuickCalorieModalProps> = ({
  isOpen,
  activeMeal,
  onClose,
  onLogQuickCalories,
}) => {
  const [calories, setCalories] = useState('250');
  const [selectedMeal, setSelectedMeal] = useState<MealType>(activeMeal);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kcal = parseInt(calories, 10);
    if (!isNaN(kcal) && kcal > 0) {
      onLogQuickCalories(kcal, selectedMeal, note || 'Quick Calorie Entry');
      onClose();
    }
  };

  return (
    <div
      id="quick-calorie-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="quick-calorie-modal-card"
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#3e6b56]/20 flex flex-col space-y-4 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#25533f] text-[22px]">flash_on</span>
            <h3 className="text-[16px] font-bold text-[#151d19]">Quick Calorie Entry</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#717973] hover:bg-[#edf6ee] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Calorie Numeric Input */}
          <div className="flex flex-col items-center justify-center py-2 bg-[#f3fcf4] rounded-xl border border-[#3e6b56]/15">
            <label htmlFor="quick-kcal-input" className="text-[11px] font-bold text-[#4c6358] uppercase">
              Calories (kcal)
            </label>
            <div className="flex items-baseline gap-1 mt-1">
              <input
                id="quick-kcal-input"
                type="number"
                min="10"
                max="3000"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-32 text-center text-[34px] font-extrabold text-[#25533f] bg-transparent focus:outline-none border-b-2 border-[#25533f]/40 focus:border-[#25533f]"
                autoFocus
              />
              <span className="text-[14px] text-[#414944] font-medium">kcal</span>
            </div>
          </div>

          {/* Meal Target Selector */}
          <div>
            <label className="text-[12px] font-bold text-[#151d19] block mb-1">Assign to Meal</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['breakfast', 'lunch', 'dinner', 'snacks'] as MealType[]).map((meal) => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setSelectedMeal(meal)}
                  className={`py-1.5 text-center rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    selectedMeal === meal
                      ? 'bg-[#25533f] text-white shadow-xs'
                      : 'bg-[#edf6ee] text-[#414944] hover:bg-[#e7f0e9]'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Description */}
          <div>
            <label htmlFor="quick-note-input" className="text-[12px] font-bold text-[#151d19] block mb-1">
              Note (Optional)
            </label>
            <input
              id="quick-note-input"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Afternoon oat latte & biscuit"
              className="w-full h-10 px-3 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/15 text-[13px] text-[#151d19] focus:outline-none focus:ring-1 focus:ring-[#25533f]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#25533f] text-white text-[13px] font-bold shadow-xs hover:bg-[#3e6b56] active:scale-[0.98] transition-all cursor-pointer"
          >
            Add {calories} kcal
          </button>
        </form>
      </div>
    </div>
  );
};
