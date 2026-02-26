import React, { useState } from 'react';
import { ArrowRight, Youtube } from 'lucide-react';
import { LoginModal } from './LoginModal';

interface HomeProps {
  onStart: () => void;
}

export function Home({ onStart }: HomeProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    onStart();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-200 -rotate-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
            <span className="text-xs font-bold text-gray-600 tracking-widest">IPARTNERS AX AGENCY</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
            DIGITAL<br />
            EVOLUTION,<br />
            NOW <span className="text-[#8B5CF6]">AI-DRIVEN.</span><br />
            THAT'S<br />
            IPARTNERS.
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl break-keep">
            아이파트너즈의 <strong>AI 방법론</strong>은 <strong>'AI-First'</strong> 사고방식을 기반으로 웹사이트 구축의 전 과정을 재설계하여, 단순 자동화를 넘어 <strong>창의적 가치</strong>와 <strong>완성도</strong>를 극대화하는 제작 표준입니다.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full text-left bg-white border-2 border-transparent p-6 rounded-2xl max-w-xl shadow-lg shadow-gray-100/50 hover:border-[#8B5CF6] hover:shadow-xl transition-all group ring-1 ring-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">TubeInsight</h3>
                  <p className="text-sm text-gray-500">YouTube 채널 & 키워드 AI 분석 솔루션</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#8B5CF6] transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative h-[600px]">
          {/* AX Diamond Graphic */}
          <div className="relative w-80 h-80 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] transform rotate-45 rounded-xl shadow-2xl flex items-center justify-center border border-white/20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPjwvc3ZnPg==')] opacity-50"></div>
            <span className="transform -rotate-45 text-7xl font-black text-white tracking-widest drop-shadow-lg">AX</span>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-[15%] left-[10%] bg-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
            <span className="text-xs font-extrabold text-gray-700 tracking-wider">I-SEARCH</span>
          </div>
          <div className="absolute top-[20%] right-[10%] bg-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></div>
            <span className="text-xs font-extrabold text-gray-700 tracking-wider">I-CONSULTANT</span>
          </div>
          <div className="absolute bottom-[25%] left-[15%] bg-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></div>
            <span className="text-xs font-extrabold text-gray-700 tracking-wider">I-DATA</span>
          </div>
          <div className="absolute bottom-[20%] right-[15%] bg-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></div>
            <span className="text-xs font-extrabold text-gray-700 tracking-wider">I-INTELLIGENCE</span>
          </div>
          <div className="absolute top-[50%] right-[5%] bg-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></div>
            <span className="text-xs font-extrabold text-gray-700 tracking-wider">I-CREATIVE</span>
          </div>
          <div className="absolute bottom-[5%] right-[30%] bg-white px-4 py-2.5 rounded-lg shadow-xl border border-gray-50 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
            <span className="text-xs font-extrabold text-gray-700 tracking-wider">I-AUTODEV</span>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={handleLoginSuccess} 
      />
    </div>
  );
}
