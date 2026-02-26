import { GoogleGenAI } from "@google/genai";
import { VideoStats } from "./youtube";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateConsultingReport = async (
  analysisType: 'channel' | 'keyword',
  query: string,
  videos: VideoStats[]
) => {
  const prompt = `
당신은 유튜브 채널 성장 및 운영 전략을 컨설팅하는 전문가입니다.
다음은 사용자가 분석한 ${analysisType === 'channel' ? '채널' : '키워드'} "${query}"에 대한 최근 영상 데이터 요약입니다.

[데이터 요약]
- 분석된 영상 수: ${videos.length}개
- 평균 조회수: ${Math.round(videos.reduce((acc, v) => acc + v.viewCount, 0) / videos.length).toLocaleString()}회
- 평균 좋아요 수: ${Math.round(videos.reduce((acc, v) => acc + v.likeCount, 0) / videos.length).toLocaleString()}개
- 평균 댓글 수: ${Math.round(videos.reduce((acc, v) => acc + v.commentCount, 0) / videos.length).toLocaleString()}개
- 쇼츠(3분 미만) 비율: ${Math.round((videos.filter(v => v.isShorts).length / videos.length) * 100)}%
- 가장 인기 있는 영상 Top 3:
${videos.sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 3).map((v, i) => `  ${i + 1}. ${v.title} (조회수: ${v.viewCount.toLocaleString()}, 인기도: ${v.popularityScore})`).join('\n')}

위 데이터를 바탕으로 다음 항목을 포함하여 구체적이고 실용적인 유튜브 운영 전략(컨설팅 리포트)을 한국어로 작성해주세요:
1. 현재 데이터 분석 및 평가 (강점과 약점)
2. 시청자 반응(조회수, 좋아요, 댓글)을 기반으로 한 콘텐츠 방향성 제안
3. 일반 영상과 쇼츠(Shorts) 활용 전략
4. 향후 성장을 위한 3가지 핵심 액션 플랜

마크다운 형식으로 가독성 좋게 작성해주세요.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};
