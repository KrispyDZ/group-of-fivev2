import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem('nourish-theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const toastTimeoutRef = useRef<number | null>(null);
  const tabTimeoutRef = useRef<number | null>(null);

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [isQuickCalorieOpen, setIsQuickCalorieOpen] = useState(false);
  const [detailMeal, setDetailMeal] = useState<LoggedMeal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('nourish-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) window.clearTimeout(toastTimeoutRef.current);
      if (tabTimeoutRef.current !== null) window.clearTimeout(tabTimeoutRef.current);
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current !== null) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 3000);
  }, []);

  const handleAddWater = useCallback(() => {
    setNutritionState((prev) => {
      const nextCups = Math.min(prev.totalWaterCups, prev.waterCups + 1);
      if (nextCups === prev.totalWaterCups && prev.waterCups < prev.totalWaterCups) {
        showToast('Daily 2.0L Hydration Goal Completed!');
      }
      return { ...prev, waterCups: nextCups };
    });
  }, [showToast]);

  const handleToggleCup = useCallback((index: number) => {
    setNutritionState((prev) => ({
      ...prev,
      waterCups: index + 1 === prev.waterCups ? index : index + 1,
    }));
  }, []);

  const handleToggleStageFood = useCallback((id: string) => {
    setFoodItems((prev) => prev.map((item) => (item.id === id ? { ...item, isStaged: !item.isStaged } : item)));
  }, []);

  const handleUpdateFoodPortion = useCallback((id: string, deltaGrams: number) => {
    setFoodItems((prev) => prev.map((item) => {
      if (item.id !== id) return item;
      const newGrams = Math.max(50, Math.min(600, item.portionGrams + deltaGrams));
      const ratio = newGrams / 200;
      return { ...item, portionGrams: newGrams, portion: `${newGrams}g`, calories: Math.round(412 * ratio), protein: Math.round(40 * ratio), fat: Math.round(26 * ratio) };
    }));
  }, []);

  const handleClearTray = useCallback(() => setFoodItems((prev) => prev.map((item) => ({ ...item, isStaged: false }))), []);

  const handleConfirmLogMeal = useCallback(() => {
    const staged = foodItems.filter((it) => it.isStaged);
    if (staged.length === 0) return;
    const totalKcal = staged.reduce((sum, it) => sum + it.calories, 0);
    const totalP = staged.reduce((sum, it) => sum + it.protein, 0);
    const totalC = staged.reduce((sum, it) => sum + it.carbs, 0);
    const totalF = staged.reduce((sum, it) => sum + it.fat, 0);
    setMeals((prev) => prev.map((m) => m.id === activeMeal ? { ...m, calories: totalKcal, isLogged: true, description: staged.map((s) => s.name).join(', '), image: staged[0]?.image, items: staged.map((s) => ({ name: s.name, calories: s.calories, portion: s.portion })) } : m));
    setNutritionState((prev) => ({ ...prev, consumedCalories: prev.consumedCalories + totalKcal, proteinCurrent: prev.proteinCurrent + totalP, carbsCurrent: prev.carbsCurrent + totalC, fatCurrent: prev.fatCurrent + totalF }));
    setStreakDays((prev) => prev.map((d) => (d.dateKey === selectedDate ? { ...d, isCompleted: true } : d)));
    setFoodItems((prev) => prev.map((item) => ({ ...item, isStaged: false })));
    showToast(`Logged ${totalKcal} kcal to ${activeMeal.toUpperCase()}!`);
    if (tabTimeoutRef.current !== null) window.clearTimeout(tabTimeoutRef.current);
    tabTimeoutRef.current = window.setTimeout(() => { setActiveTab('today'); tabTimeoutRef.current = null; }, 1200);
  }, [activeMeal, foodItems, selectedDate, showToast]);

  const handleLogQuickCalories = useCallback((calories: number, mealType: MealType, note: string) => {
    setMeals((prev) => prev.map((m) => m.id === mealType ? { ...m, calories: m.calories + calories, isLogged: true, description: note || `${m.description} (+${calories} kcal)`, items: [...(m.items || []), { name: note || 'Quick Calorie Add', calories, portion: '1 serving' }] } : m));
    setNutritionState((prev) => ({ ...prev, consumedCalories: prev.consumedCalories + calories, carbsCurrent: prev.carbsCurrent + Math.round(calories * 0.12), proteinCurrent: prev.proteinCurrent + Math.round(calories * 0.06), fatCurrent: prev.fatCurrent + Math.round(calories * 0.04) }));
    showToast(`Added ${calories} kcal to ${mealType.toUpperCase()}!`);
  }, [showToast]);

  const handleScanFood = useCallback((newItem: FoodItem) => { setFoodItems((prev) => [newItem, ...prev]); showToast(`Scanned: ${newItem.name} added!`); }, [showToast]);

  const handleDeleteMeal = useCallback((mealId: string) => {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;
    setMeals((prev) => prev.map((m) => (m.id === mealId ? { ...m, calories: 0, isLogged: false, items: [] } : m)));
    setNutritionState((prev) => ({ ...prev, consumedCalories: Math.max(0, prev.consumedCalories - meal.calories) }));
    showToast(`${meal.title} reset`);
  }, [meals, showToast]);

  return (
    <div className="app-shell min-h-screen text-[#151d19] font-['Plus_Jakarta_Sans',sans-serif] antialiased flex flex-col relative">
      <Header activeTab={activeTab} onOpenProfile={() => setIsProfileOpen(true)} />
      <main className="app-main flex-1 flex flex-col relative w-full pt-18 pb-20">
        {activeTab === 'today' && <TodayView nutritionState={nutritionState} meals={meals} streakDays={streakDays} selectedDate={selectedDate} onSelectDate={setSelectedDate} onAddWater={handleAddWater} onToggleCup={handleToggleCup} onNavigateToLog={() => { setActiveMeal('dinner'); setActiveTab('log'); }} onOpenMealDetail={(meal) => setDetailMeal(meal)} />}
        {activeTab === 'log' && <LogView foodItems={foodItems} nutritionState={nutritionState} activeMeal={activeMeal} onChangeMeal={setActiveMeal} onToggleStageFood={handleToggleStageFood} onUpdateFoodPortion={handleUpdateFoodPortion} onClearTray={handleClearTray} onConfirmLogMeal={handleConfirmLogMeal} onOpenBarcodeModal={() => setIsBarcodeOpen(true)} onOpenQuickCalorieModal={() => setIsQuickCalorieOpen(true)} />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'goals' && <GoalsView nutritionState={nutritionState} onUpdateGoals={(updates) => setNutritionState((prev) => ({ ...prev, ...updates }))} />}
      </main>
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      {toastMessage && <div id="global-feedback-toast" className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#25533f] text-white text-[13px] font-bold shadow-xl border border-[#bceed3]/30 flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-[#bceed3]">task_alt</span><span>{toastMessage}</span></div>}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode((value) => !value)} />
      <BarcodeModal isOpen={isBarcodeOpen} onClose={() => setIsBarcodeOpen(false)} onScanFood={handleScanFood} />
      <QuickCalorieModal isOpen={isQuickCalorieOpen} activeMeal={activeMeal} onClose={() => setIsQuickCalorieOpen(false)} onLogQuickCalories={handleLogQuickCalories} />
      <MealDetailModal meal={detailMeal} isOpen={!!detailMeal} onClose={() => setDetailMeal(null)} onDeleteMeal={handleDeleteMeal} />
    </div>
  );
}
