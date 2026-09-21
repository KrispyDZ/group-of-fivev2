import React from 'react';
import { TabType } from '../types';
import { NOURISH_LOGO, USER_AVATAR } from '../data/mockData';

interface HeaderProps {
  activeTab: TabType;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onOpenProfile }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'today':
        return 'Today';
      case 'log':
        return 'Log';
      case 'analytics':
        return 'Analytics';
      case 'goals':
        return 'Goals';
      default:
        return 'Today';
    }
  };

  return (
    <header
      id="main-app-header"
      className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#f3fcf4]/85 backdrop-blur-xl border-b border-[#3e6b56]/10 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-md mx-auto h-full px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            id="brand-logo-img"
            src={NOURISH_LOGO}
            alt="Nourish Calorie Tracker Logo"
            className="h-8 w-8 object-contain rounded-lg shadow-xs"
            referrerPolicy="no-referrer"
          />
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#25533f] tracking-tight">
            Nourish
          </span>
          <span className="text-[#717973]/60 text-xs font-normal mx-0.5">/</span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#151d19]">
            {getTabTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="profile-avatar-btn"
            onClick={onOpenProfile}
            aria-label="Profile and Settings"
            className="w-10 h-10 flex items-center justify-center rounded-full p-0.5 ring-2 ring-[#3e6b56]/15 hover:ring-[#3e6b56]/40 transition-all active:scale-95 cursor-pointer bg-white"
          >
            <img
              src={USER_AVATAR}
              alt="Elena Rostova Profile"
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
