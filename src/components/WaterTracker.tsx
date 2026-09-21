import React, { useState, useEffect } from 'react';

interface WaterTrackerProps {
  dailyGoalMl?: number; // Default: 2000 ml (~8 glasses)
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ dailyGoalMl = 2000 }) => {
  const [waterMl, setWaterMl] = useState<number>(() => {
    const saved = localStorage.getItem('nourish_water_ml');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('nourish_water_ml', waterMl.toString());
  }, [waterMl]);

  const addWater = (amount: number) => {
    setWaterMl((prev) => Math.max(0, prev + amount));
  };

  const resetWater = () => {
    setWaterMl(0);
  };

  const percentage = Math.min(100, Math.round((waterMl / dailyGoalMl) * 100));

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-white shadow-md my-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-sky-400 flex items-center gap-2">
            💧 Water Intake
          </h3>
          <p className="text-xs text-slate-400">
            {waterMl} ml / {dailyGoalMl} ml ({percentage}%)
          </p>
        </div>
        <button
          onClick={resetWater}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
          title="Reset today's water"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => addWater(250)}
          className="flex-1 py-2 px-3 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 rounded-xl text-sm font-medium transition-all active:scale-95 text-center"
        >
          +250 ml (1 glass)
        </button>
        <button
          onClick={() => addWater(500)}
          className="flex-1 py-2 px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-xl text-sm font-medium transition-all active:scale-95 text-center"
        >
          +500 ml (1 bottle)
        </button>
        <button
          onClick={() => addWater(-250)}
          disabled={waterMl <= 0}
          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl text-sm font-medium transition-all"
          title="Undo 250ml"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
