import React, { useState, useMemo } from 'react';
import { FoodItem, MealType, DailyNutritionState } from '../types';

interface LogViewProps {
  foodItems: FoodItem[];
  nutritionState: DailyNutritionState;
  activeMeal: MealType;
  onChangeMeal: (meal: MealType) => void;
  onToggleStageFood: (id: string) => void;
  onUpdateFoodPortion: (id: string, deltaGrams: number) => void;
  onClearTray: () => void;
  onConfirmLogMeal: () => void;
  onOpenBarcodeModal: () => void;
  onOpenQuickCalorieModal: () => void;
}

export const LogView: React.FC<LogViewProps> = ({
  foodItems,
  nutritionState,
  activeMeal,
  onChangeMeal,
  onToggleStageFood,
  onUpdateFoodPortion,
  onClearTray,
  onConfirmLogMeal,
  onOpenBarcodeModal,
  onOpenQuickCalorieModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Recent');
  const [isListening, setIsListening] = useState(false);

  // Filter food items based on query & category
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (selectedCategory === 'Recent') return true;
      if (selectedCategory === 'Favorites') return item.category === 'Favorites';
      if (selectedCategory === 'Frequent') return item.category === 'Frequent';
      return true;
    });
  }, [foodItems, searchQuery, selectedCategory]);

  // Calculate staged summary
  const stagedItems = useMemo(() => foodItems.filter((item) => item.isStaged), [foodItems]);
  const stagedKcal = stagedItems.reduce((acc, item) => acc + item.calories, 0);
  const stagedProtein = stagedItems.reduce((acc, item) => acc + item.protein, 0);
  const stagedCarbs = stagedItems.reduce((acc, item) => acc + item.carbs, 0);
  const stagedFat = stagedItems.reduce((acc, item) => acc + item.fat, 0);

  const remainingKcal = Math.max(0, nutritionState.targetCalories - nutritionState.consumedCalories);
  const remainingAfterLog = Math.max(0, remainingKcal - stagedKcal);

  const mealTabLabels: { id: MealType; label: string; icon: string }[] = [
    { id: 'breakfast', label: 'Breakfast', icon: 'wb_twilight' },
    { id: 'lunch', label: 'Lunch', icon: 'sunny' },
    { id: 'dinner', label: 'Dinner', icon: 'dinner_dining' },
    { id: 'snacks', label: 'Snacks', icon: 'cookie' },
  ];

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Salmon');
    }, 1500);
  };

  return (
    <div id="log-screen-container" className="flex flex-col w-full pb-32 max-w-md mx-auto">
      {/* 1. Active Meal Selector Bar */}
      <section id="meal-selector-bar" className="px-4 sm:px-5 pt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[18px] text-[#151d19] font-bold capitalize">
              {activeMeal} Target
            </span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#25533f] animate-pulse" />
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#edf6ee] border border-[#3e6b56]/15 text-[#4c6358]">
            <span className="material-symbols-outlined text-[15px] text-[#25533f]">pie_chart</span>
            <span className="text-[12px] font-bold text-[#25533f]">
              {remainingKcal.toLocaleString()} kcal
            </span>
            <span className="text-[11px] text-[#414944]">remaining</span>
          </div>
        </div>

        {/* Meal Tabs Slider */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {mealTabLabels.map((tab) => {
            const isActive = activeMeal === tab.id;
            return (
              <button
                key={tab.id}
                id={`meal-tab-${tab.id}`}
                onClick={() => onChangeMeal(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold shrink-0 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#25533f] text-white shadow-xs'
                    : 'bg-[#e7f0e9] text-[#414944] hover:bg-[#e1eae3]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Search & Scan Action Bar */}
      <section id="search-action-bar" className="px-4 sm:px-5 mt-3 flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#4c6358] text-[20px] pointer-events-none">
            search
          </span>
          <input
            id="food-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search food, brand, or meal..."
            className="w-full h-12 pl-10 pr-10 rounded-full bg-white shadow-xs border border-[#3e6b56]/15 text-[#151d19] placeholder-[#717973] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#25533f]/30 transition-all"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#717973] hover:text-[#151d19] flex items-center justify-center p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Barcode Scanner Quick Action */}
        <button
          id="barcode-scanner-btn"
          aria-label="Scan barcode"
          onClick={onOpenBarcodeModal}
          className="h-12 w-12 rounded-full bg-white shadow-xs border border-[#3e6b56]/15 flex items-center justify-center text-[#25533f] active:scale-95 transition-all hover:bg-[#edf6ee] cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[22px]">barcode_scanner</span>
        </button>

        {/* Voice Input Quick Action */}
        <button
          id="voice-input-btn"
          aria-label="Voice input"
          onClick={handleVoiceInput}
          className={`h-12 w-12 rounded-full shadow-xs border border-[#3e6b56]/15 flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0 ${
            isListening ? 'bg-[#ffdad6] text-[#ba1a1a] animate-pulse' : 'bg-white text-[#25533f] hover:bg-[#edf6ee]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">{isListening ? 'mic' : 'mic'}</span>
        </button>
      </section>

      {/* 3. Category Quick Filter Chips */}
      <section
        id="category-filter-chips"
        className="px-4 sm:px-5 mt-3 overflow-x-auto no-scrollbar flex items-center gap-2 py-0.5"
      >
        <button
          id="filter-chip-recent"
          onClick={() => setSelectedCategory('Recent')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'Recent'
              ? 'bg-[#cee9da] text-[#354c41] border border-[#25533f]/20'
              : 'bg-[#e7f0e9] text-[#414944] hover:bg-[#e1eae3]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#25533f]" />
          Recent
        </button>

        <button
          id="filter-chip-favorites"
          onClick={() => setSelectedCategory('Favorites')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
            selectedCategory === 'Favorites'
              ? 'bg-[#cee9da] text-[#354c41] font-bold border border-[#25533f]/20'
              : 'bg-[#e7f0e9] text-[#414944] hover:bg-[#e1eae3]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[15px]"
            style={selectedCategory === 'Favorites' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            star
          </span>
          Favorites
        </button>

        <button
          id="filter-chip-frequent"
          onClick={() => setSelectedCategory('Frequent')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'Frequent'
              ? 'bg-[#cee9da] text-[#354c41] font-bold border border-[#25533f]/20'
              : 'bg-[#e7f0e9] text-[#414944] hover:bg-[#e1eae3]'
          }`}
        >
          Frequent
        </button>

        <button
          id="filter-chip-custom"
          onClick={() => setSelectedCategory('Custom')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium shrink-0 transition-all cursor-pointer ${
            selectedCategory === 'Custom'
              ? 'bg-[#cee9da] text-[#354c41] font-bold border border-[#25533f]/20'
              : 'bg-[#e7f0e9] text-[#414944] hover:bg-[#e1eae3]'
          }`}
        >
          Custom Meals
        </button>

        <button
          id="filter-chip-quick-add"
          onClick={onOpenQuickCalorieModal}
          className="px-3.5 py-1.5 rounded-full bg-[#edf6ee] border border-[#3e6b56]/20 text-[#25533f] text-[12px] font-semibold shrink-0 flex items-center gap-1 hover:bg-[#cee9da] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">flash_on</span>
          Quick Calorie Add
        </button>
      </section>

      {/* 4. Nutrient Allocation Visual Cue */}
      <section id="nutrient-suggestion-banner" className="px-4 sm:px-5 mt-3.5">
        <div className="p-3.5 rounded-xl bg-white shadow-xs border border-[#3e6b56]/10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#cee9da] flex items-center justify-center text-[#25533f] shrink-0">
              <span className="material-symbols-outlined text-[20px]">nutrition</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-[#151d19]">
                {activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1)} Smart Suggestion
              </span>
              <span className="text-[12px] text-[#414944] truncate">
                High lean protein with controlled complex carbs
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block px-2 py-0.5 rounded bg-[#bceed3] text-[#002114] text-[11px] font-bold">
              Optimal
            </span>
          </div>
        </div>
      </section>

      {/* 5. Food Items Listing */}
      <section id="food-items-listing-section" className="px-4 sm:px-5 mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#151d19]">
            {searchQuery ? `Results for "${searchQuery}"` : 'Suggested For Tonight'}
          </h2>
          <span className="text-[12px] text-[#414944] font-medium">
            {filteredItems.length} items found
          </span>
        </div>

        {filteredItems.map((item) => {
          const isStaged = item.isStaged;
          return (
            <article
              key={item.id}
              id={`food-item-card-${item.id}`}
              className="p-4 rounded-xl bg-white shadow-xs border border-[#3e6b56]/10 flex flex-col gap-3 transition-all hover:border-[#3e6b56]/20"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#e7f0e9] border border-[#3e6b56]/8">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold text-[#151d19] truncate">{item.name}</h3>
                      <p className="text-[12px] text-[#414944]">
                        {item.subtitle} · <span className="font-semibold">{item.portion}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[20px] font-bold text-[#25533f] leading-none">
                        {item.calories}
                      </span>
                      <span className="text-[11px] text-[#414944] block -mt-0.5">kcal</span>
                    </div>
                  </div>

                  {/* Macro tags */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#edf6ee] text-[11px] text-[#9f4831] font-semibold">
                      P: {item.protein}g
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#edf6ee] text-[11px] text-[#4c6358] font-semibold">
                      C: {item.carbs}g
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#edf6ee] text-[11px] text-[#52695e] font-semibold">
                      F: {item.fat}g
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="pt-1 flex items-center justify-between border-t border-[#edf6ee]">
                {/* Portion Stepper if adjustable */}
                {item.id === 'salmon' ? (
                  <div className="flex items-center rounded-full bg-[#edf6ee] p-0.5 border border-[#3e6b56]/10">
                    <button
                      aria-label="Decrease portion"
                      onClick={() => onUpdateFoodPortion(item.id, -50)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#414944] hover:bg-[#e7f0e9] active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="w-12 text-center text-[12px] font-bold text-[#151d19]">
                      {item.portion}
                    </span>
                    <button
                      aria-label="Increase portion"
                      onClick={() => onUpdateFoodPortion(item.id, 50)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#414944] hover:bg-[#e7f0e9] active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-[12px] text-[#414944]">
                    {item.id === 'rice'
                      ? '1 serving logged often'
                      : item.id === 'asparagus'
                      ? 'Low calorie side'
                      : 'Healthy monounsaturated fat'}
                  </span>
                )}

                {/* Staged / Add Button */}
                <button
                  id={`stage-food-btn-${item.id}`}
                  onClick={() => onToggleStageFood(item.id)}
                  className={`px-4 py-2 rounded-full text-[12px] font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs ${
                    isStaged
                      ? 'bg-[#25533f] text-white'
                      : 'bg-[#cee9da] text-[#25533f] hover:bg-[#25533f] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isStaged ? 'check' : 'add'}
                  </span>
                  <span>{isStaged ? 'Staged' : 'Add'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* 6. Floating Staged Meal Tray / Basket (Sticky in parent flow) */}
      {stagedItems.length > 0 && (
        <aside
          id="staged-meal-tray-aside"
          className="sticky bottom-20 px-4 sm:px-5 mt-6 z-30 pointer-events-auto"
        >
          <div className="p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_10px_28px_-6px_rgba(44,61,52,0.14),0_4px_12px_-2px_rgba(44,61,52,0.08)] border border-[#3e6b56]/20 flex flex-col gap-3">
            {/* Tray Header & Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#bceed3] flex items-center justify-center text-[#002114] shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#151d19] font-bold">
                    Staged: <span id="tray-count">{stagedItems.length} items</span> ·{' '}
                    <span className="text-[#25533f] font-extrabold" id="tray-kcal">
                      {stagedKcal} kcal
                    </span>
                  </span>
                  <span className="text-[11px] text-[#414944]">
                    Remaining for goal: {remainingAfterLog} kcal
                  </span>
                </div>
              </div>

              <button
                id="clear-tray-btn"
                onClick={onClearTray}
                className="text-[12px] text-[#4c6358] hover:text-[#ba1a1a] transition-colors px-2 py-1 font-semibold cursor-pointer"
              >
                Clear
              </button>
            </div>

            {/* Live Macros Distribution Pills */}
            <div className="grid grid-cols-3 gap-2">
              <div className="px-2 py-1.5 rounded-lg bg-[#edf6ee] flex flex-col items-center border border-[#3e6b56]/8">
                <span className="text-[11px] text-[#414944] font-medium">Protein</span>
                <span className="text-[13px] text-[#80311c] font-bold" id="tray-p">
                  {stagedProtein}g
                </span>
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-[#edf6ee] flex flex-col items-center border border-[#3e6b56]/8">
                <span className="text-[11px] text-[#414944] font-medium">Carbs</span>
                <span className="text-[13px] text-[#4c6358] font-bold" id="tray-c">
                  {stagedCarbs}g
                </span>
              </div>
              <div className="px-2 py-1.5 rounded-lg bg-[#edf6ee] flex flex-col items-center border border-[#3e6b56]/8">
                <span className="text-[11px] text-[#414944] font-medium">Fat</span>
                <span className="text-[13px] text-[#52695e] font-bold" id="tray-f">
                  {stagedFat}g
                </span>
              </div>
            </div>

            {/* Primary Confirmation Log CTA */}
            <button
              id="confirm-log-btn"
              onClick={onConfirmLogMeal}
              className="w-full h-12 rounded-full bg-[#25533f] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#3e6b56] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>
                Log to {activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1)} ({stagedKcal} kcal)
              </span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
