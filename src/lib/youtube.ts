const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const testApiKey = async (apiKey: string) => {
  const res = await fetch(`${BASE_URL}/search?part=snippet&maxResults=1&key=${apiKey}`);
  if (!res.ok) throw new Error('유효하지 않은 API 키입니다.');
  return true;
};

export const parseDuration = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
};

export interface VideoStats {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  durationSeconds: number;
  isShorts: boolean;
  thumbnail: string;
  popularityScore: number;
}

export const searchChannel = async (apiKey: string, channelName: string) => {
  const res = await fetch(`${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(channelName)}&maxResults=1&key=${apiKey}`);
  const data = await res.json();
  if (!data.items || data.items.length === 0) throw new Error('채널을 찾을 수 없습니다.');
  return data.items[0];
};

export const getChannelVideos = async (apiKey: string, channelId: string, maxResults: number = 50) => {
  const channelRes = await fetch(`${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`);
  const channelData = await channelRes.json();
  if (!channelData.items || channelData.items.length === 0) throw new Error('채널 정보를 가져올 수 없습니다.');
  
  const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

  const playlistRes = await fetch(`${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`);
  const playlistData = await playlistRes.json();
  if (!playlistData.items) return [];

  const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

  const videosRes = await fetch(`${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`);
  const videosData = await videosRes.json();

  return videosData.items.map((item: any): VideoStats => {
    const durationSeconds = parseDuration(item.contentDetails.duration);
    const viewCount = parseInt(item.statistics.viewCount || '0', 10);
    const likeCount = parseInt(item.statistics.likeCount || '0', 10);
    const commentCount = parseInt(item.statistics.commentCount || '0', 10);
    
    const popularityScore = Math.round((viewCount * 1 + likeCount * 5 + commentCount * 10) / 100);

    return {
      id: item.id,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      viewCount,
      likeCount,
      commentCount,
      durationSeconds,
      isShorts: durationSeconds < 180,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      popularityScore,
    };
  });
};

export const searchKeywordVideos = async (apiKey: string, keyword: string, regionCode: string = 'KR', maxResults: number = 50) => {
  const res = await fetch(`${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(keyword)}&maxResults=${maxResults}&regionCode=${regionCode}&key=${apiKey}`);
  const data = await res.json();
  if (!data.items) return [];

  const videoIds = data.items.map((item: any) => item.id.videoId).join(',');

  const videosRes = await fetch(`${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`);
  const videosData = await videosRes.json();

  return videosData.items.map((item: any): VideoStats => {
    const durationSeconds = parseDuration(item.contentDetails.duration);
    const viewCount = parseInt(item.statistics.viewCount || '0', 10);
    const likeCount = parseInt(item.statistics.likeCount || '0', 10);
    const commentCount = parseInt(item.statistics.commentCount || '0', 10);
    
    const popularityScore = Math.round((viewCount * 1 + likeCount * 5 + commentCount * 10) / 100);

    return {
      id: item.id,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      viewCount,
      likeCount,
      commentCount,
      durationSeconds,
      isShorts: durationSeconds < 180,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      popularityScore,
    };
  });
};
