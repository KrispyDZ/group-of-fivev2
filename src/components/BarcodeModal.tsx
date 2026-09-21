import React, { useState } from 'react';
import { FoodItem } from '../types';

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanFood: (item: FoodItem) => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({ isOpen, onClose, onScanFood }) => {
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const sampleScanItem: FoodItem = {
    id: 'nordic-skyr',
    name: 'Icelandic Vanilla Skyr',
    subtitle: 'High Protein · 170g pot',
    portion: '170g',
    portionGrams: 170,
    calories: 140,
    protein: 19,
    carbs: 11,
    fat: 0.5,
    isStaged: true,
    category: 'Recent',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVqUkOP9Ys5Her5BaNWNp6ZanWUrTu6sopq92kpw3JbNsgfF4v9R1ueaeR88kYkF6_CK5wgseuZfPyN7_d9LXuBUtbevQMArup9zt2qSH9JHElyl5GcZDV4h4Wp2hseTAvLtLD-vG6rGb-ul_deKVfxLzKW8omr7umcqZFbCjOBZKF_aIILHrhcQjJMfEmBByYUBnh8_OMDUlt1oerR8hUdlR9pxHYn7Qof057H1SYu88P-BA8ZKAr',
    imageAlt: 'Icelandic Vanilla Skyr pot',
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScanFood(sampleScanItem);
      onClose();
    }, 1000);
  };

  return (
    <div
      id="barcode-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        id="barcode-modal-card"
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#3e6b56]/20 flex flex-col space-y-4 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#25533f] text-[22px]">barcode_scanner</span>
            <h3 className="text-[16px] font-bold text-[#151d19]">Instant Barcode Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#717973] hover:bg-[#edf6ee] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Viewfinder Canvas Simulation */}
        <div className="relative w-full h-48 rounded-xl bg-black/90 overflow-hidden flex items-center justify-center">
          {/* Laser beam animation */}
          <div className="absolute w-full h-0.5 bg-[#bceed3] shadow-[0_0_12px_#bceed3] animate-bounce top-1/2" />

          {/* Barcode Frame corners */}
          <div className="w-48 h-32 border-2 border-white/60 rounded-lg relative flex items-center justify-center">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#bceed3]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#bceed3]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#bceed3]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#bceed3]" />
            <span className="text-[11px] text-white/80 font-medium tracking-wide">
              {isScanning ? 'Decoding Barcode...' : 'Align barcode within frame'}
            </span>
          </div>
        </div>

        <p className="text-[12px] text-[#414944] text-center">
          Point your device camera at packaged food labels for instant macro identification.
        </p>

        <button
          onClick={handleSimulateScan}
          disabled={isScanning}
          className="w-full h-11 rounded-full bg-[#25533f] text-white text-[13px] font-bold shadow-xs hover:bg-[#3e6b56] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">document_scanner</span>
          <span>{isScanning ? 'Analyzing Product...' : 'Simulate Scan: Skyr (140 kcal)'}</span>
        </button>
      </div>
    </div>
  );
};
