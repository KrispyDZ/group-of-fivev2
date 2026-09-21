export type TabType = 'today' | 'log' | 'analytics' | 'goals';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface FoodItem {
  id: string;
  name: string;
  subtitle: string;
  portion: string;
  portionGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  imageAlt: string;
  category?: string;
  isStaged?: boolean;
}

export interface LoggedMeal {
  id: MealType;
  title: string;
  description: string;
  calories: number;
  isLogged: boolean;
  budgetKcal?: number;
  image?: string;
  imageAlt?: string;
  items?: { name: string; calories: number; portion: string }[];
}

export interface DayStreak {
  dayName: string; // 'M', 'T', 'W', etc.
  dateNum: number;
  isCompleted: boolean;
  isActiveToday?: boolean;
  dateKey: string;
}

export interface DailyNutritionState {
  targetCalories: number;
  burnedCalories: number;
  consumedCalories: number;
  carbsTarget: number;
  carbsCurrent: number;
  proteinTarget: number;
  proteinCurrent: number;
  fatTarget: number;
  fatCurrent: number;
  waterCups: number;
  totalWaterCups: number;
  streakDays: number;
}
