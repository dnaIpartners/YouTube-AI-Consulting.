import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onNavigateHome: () => void;
}

export function Header({ onOpenSettings, onNavigateHome }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={onNavigateHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-3.5 h-3.5 rounded-full bg-[#A78BFA]"></div>
          <span className="font-extrabold text-gray-800 text-2xl tracking-tight">i-AX</span>
          <span className="text-gray-400 text-2xl font-light tracking-tight">Platform</span>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-400 hidden sm:block border-r border-gray-200 pr-4">TubeInsight</span>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-full transition-colors shadow-sm"
          >
            <Settings className="w-4 h-4" />
            API 설정
          </button>
        </div>
      </div>
    </header>
  );
}
