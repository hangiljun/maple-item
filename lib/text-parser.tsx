// 텍스트 파싱 유틸리티
import React from "react";

const colorMap: { [key: string]: string } = {
  "기본": "#2D2D2D",
  "빨강": "#EF4444",
  "주황": "#FFB800",
  "초록": "#10B981",
  "파랑": "#3B82F6",
  "보라": "#8B5CF6",
};

const sizeMap: { [key: string]: string } = {
  "작게": "12px",
  "보통": "16px",
  "크게": "20px",
  "더크게": "24px",
  "매우크게": "28px",
};

export function parseStyledText(content: string): React.ReactElement[] {
  if (!content) return [];

  const lines = content.split('\n');
  const result: React.ReactElement[] = [];

  lines.forEach((line, lineIndex) => {
    const parts: React.ReactElement[] = [];
    let currentPos = 0;
    let partKey = 0;

    // [색:태그]텍스트[/색] 및 [크기:태그]텍스트[/크기] 패턴 찾기
    const tagRegex = /\[(색|크기):([가-힣a-zA-Z0-9]+)\](.*?)\[\/(색|크기)\]/g;
    const matches: { start: number; end: number; type: string; value: string; text: string }[] = [];

    let match;
    while ((match = tagRegex.exec(line)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: match[1],
        value: match[2],
        text: match[3]
      });
    }

    if (matches.length === 0) {
      // 태그가 없으면 그냥 텍스트 추가
      result.push(<span key={`line-${lineIndex}`}>{line}{lineIndex < lines.length - 1 ? '\n' : ''}</span>);
    } else {
      // 태그가 있으면 파싱
      matches.forEach((tag, tagIndex) => {
        // 태그 이전의 일반 텍스트
        if (currentPos < tag.start) {
          parts.push(<span key={`${lineIndex}-${partKey++}`}>{line.substring(currentPos, tag.start)}</span>);
        }

        // 태그 적용된 텍스트
        const style: React.CSSProperties = {};
        if (tag.type === '색') {
          style.color = colorMap[tag.value] || "#2D2D2D";
        } else if (tag.type === '크기') {
          style.fontSize = sizeMap[tag.value] || "16px";
        }

        parts.push(<span key={`${lineIndex}-${partKey++}`} style={style}>{tag.text}</span>);

        currentPos = tag.end;
      });

      // 마지막 태그 이후의 일반 텍스트
      if (currentPos < line.length) {
        parts.push(<span key={`${lineIndex}-${partKey++}`}>{line.substring(currentPos)}</span>);
      }

      result.push(
        <span key={`line-${lineIndex}`}>
          {parts}
          {lineIndex < lines.length - 1 ? '\n' : ''}
        </span>
      );
    }
  });

  return result;
}
