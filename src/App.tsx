/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, MealType, LoggedMeal, FoodItem, DailyNutritionState } from './types';
import { INITIAL_MEALS, INITIAL_FOOD_ITEMS, INITIAL_STREAK } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TodayView } from './components/TodayView';
import { LogView } from './components/LogView';
import { AnalyticsView } from './components/AnalyticsView';
import { GoalsView } from './components/GoalsView';
import { ProfileModal } from './components/ProfileModal';
import { BarcodeModal } from './components/BarcodeModal';
import { QuickCalorieModal } from './components/QuickCalorieModal';
import { MealDetailModal } from './components/MealDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [activeMeal, setActiveMeal] = useState<MealType>('dinner');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-24');
  const [streakDays, setStreakDays] = useState(INITIAL_STREAK);

  const [nutritionState, setNutritionState] = useState<DailyNutritionState>({
    targetCalories: 2100,
    consumedCalories: 1420,
    burnedCalories: 340,
    carbsTarget: 220,
    carbsCurrent: 145,
    proteinTarget: 140,
    proteinCurrent: 110,
    fatTarget: 65,
    fatCurrent: 42,
    waterCups: 5,
    totalWaterCups: 8,
    streakDays: 12,
  });

  const [meals, setMeals] = useState<LoggedMeal[]>(INITIAL_MEALS);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [isQuickCalorieOpen, setIsQuickCalorieOpen] = useState(false);
  const [detailMeal, setDetailMeal] = useState<LoggedMeal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Water tracking actions
  const handleAddWater = () => {
    setNutritionState((prev) => {
      const nextCups = Math.min(prev.totalWaterCups, prev.waterCups + 1);
      if (nextCups === prev.totalWaterCups && prev.waterCups < prev.totalWaterCups) {
        showToast('Daily 2.0L Hydration Goal Completed!');
      }
      return { ...prev, waterCups: nextCups };
    });
  };

  const handleToggleCup = (index: number) => {
    setNutritionState((prev) => {
      const newCups = index + 1 === prev.waterCups ? index : index + 1;
      return { ...prev, waterCups: newCups };
    });
  };

  // Food staging in Log view
  const handleToggleStageFood = (id: string) => {
    setFoodItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isStaged: !item.isStaged } : item))
    );
  };

  const handleUpdateFoodPortion = (id: string, deltaGrams: number) => {
    setFoodItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newGrams = Math.max(50, Math.min(600, item.portionGrams + deltaGrams));
          const ratio = newGrams / 200; // base 200g
          return {
            ...item,
            portionGrams: newGrams,
            portion: `${newGrams}g`,
            calories: Math.round(412 * ratio),
            protein: Math.round(40 * ratio),
            fat: Math.round(26 * ratio),
          };
        }
        return item;
      })
    );
  };

  const handleClearTray = () => {
    setFoodItems((prev) => prev.map((item) => ({ ...item, isStaged: false })));
  };

  // Confirm logging staged meal
  const handleConfirmLogMeal = () => {
    const staged = foodItems.filter((it) => it.isStaged);
    if (staged.length === 0) return;

    const totalKcal = staged.reduce((sum, it) => sum + it.calories, 0);
    const totalP = staged.reduce((sum, it) => sum + it.protein, 0);
    const totalC = staged.reduce((sum, it) => sum + it.carbs, 0);
    const totalF = staged.reduce((sum, it) => sum + it.fat, 0);

    // Update Meals list
    setMeals((prev) =>
      prev.map((m) => {
        if (m.id === activeMeal) {
          const names = staged.map((s) => s.name).join(', ');
          return {
            ...m,
            calories: totalKcal,
            isLogged: true,
            description: names,
            image: staged[0]?.image,
            items: staged.map((s) => ({
              name: s.name,
              calories: s.calories,
              portion: s.portion,
            })),
          };
        }
        return m;
      })
    );

    // Update daily nutrition metrics
    setNutritionState((prev) => ({
      ...prev,
      consumedCalories: prev.consumedCalories + totalKcal,
      proteinCurrent: prev.proteinCurrent + totalP,
      carbsCurrent: prev.carbsCurrent + totalC,
      fatCurrent: prev.fatCurrent + totalF,
    }));

    // Mark current day streak as completed
    setStreakDays((prev) =>
      prev.map((d) => (d.dateKey === selectedDate ? { ...d, isCompleted: true } : d))
    );

    // Unstage items
    setFoodItems((prev) => prev.map((item) => ({ ...item, isStaged: false })));

    showToast(`Logged ${totalKcal} kcal to ${activeMeal.toUpperCase()}!`);

    // Switch back to Today view to see updated rings and meal card!
    setTimeout(() => {
      setActiveTab('today');
    }, 1200);
  };

  // Quick calorie add
  const handleLogQuickCalories = (calories: number, mealType: MealType, note: string) => {
    setMeals((prev) =>
      prev.map((m) => {
        if (m.id === mealType) {
          return {
            ...m,
            calories: m.calories + calories,
            isLogged: true,
            description: note || `${m.description} (+${calories} kcal)`,
            items: [
              ...(m.items || []),
              { name: note || 'Quick Calorie Add', calories, portion: '1 serving' },
            ],
          };
        }
        return m;
      })
    );

    setNutritionState((prev) => ({
      ...prev,
      consumedCalories: prev.consumedCalories + calories,
      carbsCurrent: prev.carbsCurrent + Math.round(calories * 0.12),
      proteinCurrent: prev.proteinCurrent + Math.round(calories * 0.06),
      fatCurrent: prev.fatCurrent + Math.round(calories * 0.04),
    }));

    showToast(`Added ${calories} kcal to ${mealType.toUpperCase()}!`);
  };

  // Scanned food add
  const handleScanFood = (newItem: FoodItem) => {
    setFoodItems((prev) => [newItem, ...prev]);
    showToast(`Scanned: ${newItem.name} added!`);
  };

  // Reset meal handler
  const handleDeleteMeal = (mealId: string) => {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;
    const removedKcal = meal.calories;

    setMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, calories: 0, isLogged: false, items: [] } : m))
    );

    setNutritionState((prev) => ({
      ...prev,
      consumedCalories: Math.max(0, prev.consumedCalories - removedKcal),
    }));

    showToast(`${meal.title} reset`);
  };

  return (
    <div className="min-h-screen bg-[#f3fcf4] text-[#151d19] font-['Plus_Jakarta_Sans',sans-serif] antialiased flex flex-col relative">
      {/* Top Header */}
      <Header activeTab={activeTab} onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-18 pb-20 bg-[#f3fcf4]">
        {activeTab === 'today' && (
          <TodayView
            nutritionState={nutritionState}
            meals={meals}
            streakDays={streakDays}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onAddWater={handleAddWater}
            onToggleCup={handleToggleCup}
            onNavigateToLog={() => {
              setActiveMeal('dinner');
              setActiveTab('log');
            }}
            onOpenMealDetail={(meal) => setDetailMeal(meal)}
          />
        )}

        {activeTab === 'log' && (
          <LogView
            foodItems={foodItems}
            nutritionState={nutritionState}
            activeMeal={activeMeal}
            onChangeMeal={setActiveMeal}
            onToggleStageFood={handleToggleStageFood}
            onUpdateFoodPortion={handleUpdateFoodPortion}
            onClearTray={handleClearTray}
            onConfirmLogMeal={handleConfirmLogMeal}
            onOpenBarcodeModal={() => setIsBarcodeOpen(true)}
            onOpenQuickCalorieModal={() => setIsQuickCalorieOpen(true)}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsView />}

        {activeTab === 'goals' && (
          <GoalsView
            nutritionState={nutritionState}
            onUpdateGoals={(updates) => setNutritionState((prev) => ({ ...prev, ...updates }))}
          />
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Global Toast */}
      {toastMessage && (
        <div
          id="global-feedback-toast"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#25533f] text-white text-[13px] font-bold shadow-xl border border-[#bceed3]/30 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <span className="material-symbols-outlined text-[18px] text-[#bceed3]">task_alt</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile & Settings Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Barcode Scanner Modal */}
      <BarcodeModal
        isOpen={isBarcodeOpen}
        onClose={() => setIsBarcodeOpen(false)}
        onScanFood={handleScanFood}
      />

      {/* Quick Calorie Modal */}
      <QuickCalorieModal
        isOpen={isQuickCalorieOpen}
        activeMeal={activeMeal}
        onClose={() => setIsQuickCalorieOpen(false)}
        onLogQuickCalories={handleLogQuickCalories}
      />

      {/* Meal Detail Modal */}
      <MealDetailModal
        meal={detailMeal}
        isOpen={!!detailMeal}
        onClose={() => setDetailMeal(null)}
        onDeleteMeal={handleDeleteMeal}
      />
    </div>
  );
}
