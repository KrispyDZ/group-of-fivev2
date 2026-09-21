import React from 'react';
import { LoggedMeal } from '../types';

interface MealDetailModalProps {
  meal: LoggedMeal | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteMeal?: (mealId: string) => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  meal,
  isOpen,
  onClose,
  onDeleteMeal,
}) => {
  if (!isOpen || !meal) return null;

  return (
    <div
      id="meal-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="meal-detail-modal-card"
        className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#3e6b56]/20 flex flex-col animate-in fade-in zoom-in duration-200"
      >
        {/* Cover Photo if exists */}
        {meal.image && (
          <div className="relative w-full h-44 bg-[#e7f0e9]">
            <img
              src={meal.image}
              alt={meal.imageAlt || meal.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#bceed3]">
                Logged Meal
              </span>
              <h3 className="text-[18px] font-bold leading-tight">{meal.title}</h3>
              <p className="text-[12px] text-white/90 truncate">{meal.description}</p>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3.5">
          {!meal.image && (
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#151d19]">{meal.title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#717973] hover:bg-[#edf6ee] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          )}

          {/* Calorie Pill Header */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f3fcf4] border border-[#3e6b56]/15">
            <span className="text-[13px] font-bold text-[#4c6358]">Calorie Total</span>
            <span className="text-[20px] font-extrabold text-[#25533f]">
              {meal.calories} <span className="text-[12px] font-normal text-[#414944]">kcal</span>
            </span>
          </div>

          {/* Itemized ingredients breakdown */}
          {meal.items && meal.items.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="text-[12px] font-bold text-[#151d19] uppercase tracking-wider">
                Ingredient Breakdown
              </h4>
              <div className="divide-y divide-[#edf6ee] rounded-xl border border-[#3e6b56]/10 overflow-hidden bg-white">
                {meal.items.map((it, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between text-[12px]">
                    <div>
                      <span className="font-semibold text-[#151d19] block">{it.name}</span>
                      <span className="text-[#717973] text-[11px]">{it.portion}</span>
                    </div>
                    <span className="font-bold text-[#25533f]">{it.calories} kcal</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex gap-2">
            {onDeleteMeal && (
              <button
                onClick={() => {
                  onDeleteMeal(meal.id);
                  onClose();
                }}
                className="flex-1 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-bold hover:bg-[#ba1a1a] hover:text-white transition-all cursor-pointer"
              >
                Reset Meal
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 h-10 rounded-full bg-[#25533f] text-white text-[12px] font-bold shadow-xs hover:bg-[#3e6b56] transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
