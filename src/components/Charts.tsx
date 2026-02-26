import React from 'react';
import { VideoStats } from '../lib/youtube';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

interface ChartsProps {
  videos: VideoStats[];
}

export function Charts({ videos }: ChartsProps) {
  if (videos.length === 0) return null;

  const barData = videos.slice(0, 10).map(v => ({
    name: v.title.length > 15 ? v.title.substring(0, 15) + '...' : v.title,
    조회수: v.viewCount,
    좋아요: v.likeCount,
    댓글: v.commentCount,
    인기도: v.popularityScore
  }));

  const scatterData = videos.map(v => ({
    name: v.title,
    조회수: v.viewCount,
    좋아요: v.likeCount,
    인기도: v.popularityScore,
    isShorts: v.isShorts ? 'Shorts' : '일반'
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top 10 영상 인기도 분석</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis yAxisId="left" orientation="left" stroke="#6366f1" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="조회수" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="인기도" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">조회수 대비 좋아요 산점도</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" dataKey="조회수" name="조회수" tick={{ fontSize: 12 }} />
              <YAxis type="number" dataKey="좋아요" name="좋아요" tick={{ fontSize: 12 }} />
              <ZAxis type="number" dataKey="인기도" range={[50, 400]} name="인기도" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Scatter name="일반 영상" data={scatterData.filter(d => d.isShorts === '일반')} fill="#6366f1" />
              <Scatter name="Shorts" data={scatterData.filter(d => d.isShorts === 'Shorts')} fill="#ec4899" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
