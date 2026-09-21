import React, { useState } from 'react';
import { USER_AVATAR } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  if (!isOpen) return null;

  return (
    <div
      id="profile-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="profile-modal-card"
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#3e6b56]/20 flex flex-col space-y-4 animate-in fade-in zoom-in duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#25533f] text-[22px]">account_circle</span>
            <h3 className="text-[16px] font-bold text-[#151d19]">Profile &amp; Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#717973] hover:bg-[#edf6ee] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#f3fcf4] border border-[#3e6b56]/15">
          <img
            src={USER_AVATAR}
            alt="Elena Rostova Profile"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#25533f]/30 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <h4 className="text-[15px] font-bold text-[#151d19] truncate">Elena Rostova</h4>
            <p className="text-[12px] text-[#4c6358] truncate">elena.rostova@nordicvitality.io</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#cee9da] text-[#25533f] text-[10px] font-bold">
              12-Day Nourish Streak · Top 5%
            </span>
          </div>
        </div>

        {/* Metabolic Profile Metrics */}
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div className="p-2.5 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/8 flex flex-col">
            <span className="text-[#414944] text-[11px]">Basal Metabolic Rate</span>
            <span className="text-[15px] font-bold text-[#25533f] mt-0.5">1,480 kcal</span>
            <span className="text-[10px] text-[#717973]">Resting expenditure</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#edf6ee] border border-[#3e6b56]/8 flex flex-col">
            <span className="text-[#414944] text-[11px]">TDEE Target</span>
            <span className="text-[15px] font-bold text-[#25533f] mt-0.5">2,100 kcal</span>
            <span className="text-[10px] text-[#717973]">Active maintenance</span>
          </div>
        </div>

        {/* Units Selector */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#edf6ee] border border-[#3e6b56]/8 text-[12px]">
          <span className="font-bold text-[#151d19]">Measurement Units</span>
          <div className="flex rounded-full bg-white p-0.5 border border-[#3e6b56]/15">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                unitSystem === 'metric'
                  ? 'bg-[#25533f] text-white shadow-xs'
                  : 'text-[#414944] hover:text-[#151d19]'
              }`}
            >
              Metric (kg/ml)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                unitSystem === 'imperial'
                  ? 'bg-[#25533f] text-white shadow-xs'
                  : 'text-[#414944] hover:text-[#151d19]'
              }`}
            >
              Imperial (lb/oz)
            </button>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="space-y-1.5 text-[12px]">
          <span className="font-bold text-[#151d19]">Dietary Archetype</span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-[#cee9da] text-[#25533f] font-semibold text-[11px]">
              High Lean Protein
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#cee9da] text-[#25533f] font-semibold text-[11px]">
              Pescatarian
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#edf6ee] text-[#414944] font-semibold text-[11px]">
              Whole Foods
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-full bg-[#25533f] text-white text-[13px] font-bold shadow-xs hover:bg-[#3e6b56] cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
