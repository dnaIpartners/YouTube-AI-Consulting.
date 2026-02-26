import React, { useState } from 'react';
import { ArrowRight, Youtube, BarChart3, Sparkles, Zap, TrendingUp, Search, Play } from 'lucide-react';
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>The next generation of YouTube analytics</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-bold tracking-tighter leading-[1.05] mb-8 text-white flex flex-col items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">YouTube</span>
              <div className="inline-flex items-center justify-center w-16 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20 bg-[#FF0000] rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(255,0,0,0.3)] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white ml-1 sm:ml-2" fill="currentColor" />
              </div>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">AI Consulting.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            TubeInsight provides deep data analysis, keyword tracking, and AI-driven consulting to help creators and agencies dominate the YouTube algorithm.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 group"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Youtube className="w-5 h-5 text-red-500" />
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Mockup / Visual */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl p-2 sm:p-4 shadow-2xl shadow-indigo-500/10">
          <div className="rounded-2xl border border-white/5 bg-[#111] overflow-hidden aspect-[16/9] relative flex items-center justify-center">
            {/* Abstract Dashboard UI */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/dashboard/1920/1080?blur=10')] opacity-20 mix-blend-overlay" referrerPolicy="no-referrer"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
            
            <div className="grid grid-cols-3 gap-4 w-full h-full p-8 opacity-80">
              <div className="col-span-2 space-y-4">
                <div className="h-1/3 rounded-xl bg-white/5 border border-white/5"></div>
                <div className="h-2/3 rounded-xl bg-white/5 border border-white/5"></div>
              </div>
              <div className="space-y-4">
                <div className="h-1/2 rounded-xl bg-white/5 border border-white/5"></div>
                <div className="h-1/2 rounded-xl bg-white/5 border border-white/5"></div>
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">Everything you need to scale</h2>
          <p className="text-gray-400 text-lg font-light">Powerful tools designed for serious YouTube creators.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Large Feature */}
          <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
            <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
              <Search className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Deep Channel Analysis</h3>
            <p className="text-gray-400 leading-relaxed max-w-md font-light">
              Instantly analyze any YouTube channel. Get insights on views, engagement rates, and content performance across all videos and shorts.
            </p>
          </div>

          {/* Small Feature 1 */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30">
              <TrendingUp className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Keyword Tracking</h3>
            <p className="text-gray-400 leading-relaxed font-light">
              Discover trending topics and optimize your titles and tags for maximum reach.
            </p>
          </div>

          {/* Small Feature 2 */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
              <BarChart3 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Performance Metrics</h3>
            <p className="text-gray-400 leading-relaxed font-light">
              Visualize your growth with beautiful, easy-to-understand charts and graphs.
            </p>
          </div>

          {/* Large Feature 2 */}
          <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI-Powered Consulting</h3>
            <p className="text-gray-400 leading-relaxed max-w-md font-light">
              Generate custom strategy reports using advanced AI. Get actionable recommendations based on your unique channel data.
            </p>
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
