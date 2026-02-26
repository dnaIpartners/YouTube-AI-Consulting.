import React, { useState, useEffect } from 'react';
import { searchChannel, getChannelVideos, searchKeywordVideos, VideoStats } from '../lib/youtube';
import { generateConsultingReport } from '../lib/gemini';
import { VideoList } from './VideoList';
import { Charts } from './Charts';
import { Search, Youtube, Hash, Sparkles, Loader2, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

type Tab = 'channel' | 'keyword' | 'consulting';
type FilterType = 'all' | 'normal' | 'shorts';
type RegionType = 'KR' | 'US' | 'JP' | 'GLOBAL';

interface AnalyzerProps {
  apiKey: string;
  onRequireApiKey: () => void;
}

export function Analyzer({ apiKey, onRequireApiKey }: AnalyzerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('channel');
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [videos, setVideos] = useState<VideoStats[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoStats[]>([]);
  const [channelInfo, setChannelInfo] = useState<any>(null);
  
  const [videoFilter, setVideoFilter] = useState<FilterType>('all');
  const [regionFilter, setRegionFilter] = useState<RegionType>('KR');
  
  const [consultingReport, setConsultingReport] = useState('');
  const [consultingLoading, setConsultingLoading] = useState(false);

  useEffect(() => {
    let result = videos;
    if (videoFilter === 'normal') {
      result = result.filter(v => !v.isShorts);
    } else if (videoFilter === 'shorts') {
      result = result.filter(v => v.isShorts);
    }
    setFilteredVideos(result);
  }, [videos, videoFilter]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      onRequireApiKey();
      return;
    }
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setVideos([]);
    setChannelInfo(null);
    setConsultingReport('');

    try {
      if (activeTab === 'channel') {
        const channel = await searchChannel(apiKey, query);
        setChannelInfo(channel);
        const vids = await getChannelVideos(apiKey, channel.id.channelId, 50);
        setVideos(vids);
      } else if (activeTab === 'keyword') {
        const vids = await searchKeywordVideos(apiKey, query, regionFilter === 'GLOBAL' ? '' : regionFilter, 50);
        setVideos(vids);
      }
    } catch (err: any) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleConsulting = async () => {
    if (filteredVideos.length === 0) return;
    setConsultingLoading(true);
    setActiveTab('consulting');
    try {
      const report = await generateConsultingReport(activeTab === 'channel' ? 'channel' : 'keyword', query, filteredVideos);
      setConsultingReport(report);
    } catch (err: any) {
      setError('컨설팅 리포트 생성 중 오류가 발생했습니다.');
      setActiveTab('channel');
    } finally {
      setConsultingLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Controls */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
              <button
                onClick={() => { setActiveTab('channel'); setVideos([]); setQuery(''); }}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                  activeTab === 'channel' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                채널 분석
              </button>
              <button
                onClick={() => { setActiveTab('keyword'); setVideos([]); setQuery(''); }}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                  activeTab === 'keyword' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                키워드 분석
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'channel' ? '채널명' : '키워드'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {activeTab === 'channel' ? <Youtube className="w-4 h-4 text-gray-400" /> : <Hash className="w-4 h-4 text-gray-400" />}
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={activeTab === 'channel' ? "예: 침착맨" : "예: 먹방, #브이로그"}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              {activeTab === 'keyword' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">지역 필터</label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value as RegionType)}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="KR">한국 (KR)</option>
                    <option value="US">미국 (US)</option>
                    <option value="JP">일본 (JP)</option>
                    <option value="GLOBAL">전세계</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                분석 시작
              </button>
            </form>
          </div>

          {videos.length > 0 && (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                <Filter className="w-4 h-4 text-indigo-600" />
                결과 필터링
              </div>
              <div className="space-y-2">
                {(['all', 'normal', 'shorts'] as const).map((type) => (
                  <label key={type} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="videoFilter"
                      value={type}
                      checked={videoFilter === type}
                      onChange={(e) => setVideoFilter(e.target.value as FilterType)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">
                      {type === 'all' ? '전체 영상' : type === 'normal' ? '일반 영상 (3분 이상)' : 'Shorts (3분 미만)'}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleConsulting}
                  disabled={consultingLoading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
                >
                  {consultingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  AI 운영 전략 컨설팅
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {!loading && videos.length === 0 && !error && activeTab !== 'consulting' && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-100 border-dashed">
              <Youtube className="w-12 h-12 mb-4 text-gray-300" />
              <p>채널명이나 키워드를 검색하여 분석을 시작하세요.</p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
              <p>데이터를 수집하고 분석하는 중입니다...</p>
            </div>
          )}

          {!loading && videos.length > 0 && activeTab !== 'consulting' && (
            <div className="space-y-8">
              {channelInfo && activeTab === 'channel' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                  <img src={channelInfo.snippet.thumbnails.default.url} alt="Channel" className="w-20 h-20 rounded-full border border-gray-200" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{channelInfo.snippet.title}</h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{channelInfo.snippet.description}</p>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-sm">
                    {filteredVideos.length}개
                  </span>
                  분석된 영상 목록
                </h2>
                <VideoList videos={filteredVideos} />
              </div>

              <div className="pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">데이터 시각화</h2>
                <Charts videos={filteredVideos} />
              </div>
            </div>
          )}

          {activeTab === 'consulting' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI 유튜브 운영 전략 컨설팅</h2>
                  <p className="text-sm text-gray-500 mt-1">분석된 {filteredVideos.length}개의 영상 데이터를 기반으로 생성된 리포트입니다.</p>
                </div>
              </div>

              {consultingLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin text-violet-600 mb-4" />
                  <p>AI가 데이터를 분석하여 최적의 전략을 수립하고 있습니다...</p>
                </div>
              ) : (
                <div className="prose prose-indigo max-w-none">
                  <div className="markdown-body">
                    <ReactMarkdown>{consultingReport}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
