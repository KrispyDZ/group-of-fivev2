import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'today' as TabType, label: 'Today', icon: 'today' },
    { id: 'log' as TabType, label: 'Log', icon: 'restaurant_menu' },
    { id: 'analytics' as TabType, label: 'Analytics', icon: 'bar_chart' },
    { id: 'goals' as TabType, label: 'Goals', icon: 'track_changes' },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#f3fcf4]/90 backdrop-blur-xl border-t border-[#3e6b56]/10 shadow-[0_-2px_12px_rgba(44,61,52,0.06)] pb-safe"
    >
      <div className="max-w-md mx-auto h-20 px-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-btn-${tab.id}`}
              onClick={() => onChangeTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-w-[56px] min-h-[48px] flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-[#25533f] font-bold'
                  : 'text-[#414944] hover:text-[#151d19] font-medium'
              }`}
            >
              <div
                className={`w-12 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#cee9da] text-[#25533f] scale-105 shadow-xs'
                    : 'bg-transparent text-[#414944]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
