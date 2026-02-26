import React from 'react';
import { VideoStats } from '../lib/youtube';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';

interface VideoListProps {
  videos: VideoStats[];
}

export function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) return <div className="text-center py-10 text-gray-500">데이터가 없습니다.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative aspect-video">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
              {video.isShorts ? 'Shorts' : `${Math.floor(video.durationSeconds / 60)}:${(video.durationSeconds % 60).toString().padStart(2, '0')}`}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 line-clamp-2 mb-3" title={video.title}>{video.title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {video.viewCount.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                {video.likeCount.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {video.commentCount.toLocaleString()}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400">{new Date(video.publishedAt).toLocaleDateString()}</span>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                인기도: {video.popularityScore.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
