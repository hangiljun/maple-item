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

// 재귀적으로 중첩된 태그 파싱
function parseNestedTags(text: string, key: string = "0"): React.ReactElement {
  // 태그 정규식
  const tagRegex = /\[(색|크기):([가-힣a-zA-Z0-9]+)\](.*?)\[\/(색|크기)\]/;
  const match = tagRegex.exec(text);

  if (!match) {
    // 태그가 없으면 텍스트 그대로 반환
    return <span key={key}>{text}</span>;
  }

  const [fullMatch, tagType, tagValue, innerText] = match;
  const beforeTag = text.substring(0, match.index);
  const afterTag = text.substring(match.index + fullMatch.length);

  const style: React.CSSProperties = {};
  if (tagType === '색') {
    style.color = colorMap[tagValue] || "#2D2D2D";
  } else if (tagType === '크기') {
    style.fontSize = sizeMap[tagValue] || "16px";
  }

  return (
    <span key={key}>
      {beforeTag && parseNestedTags(beforeTag, `${key}-before`)}
      <span style={style}>
        {parseNestedTags(innerText, `${key}-inner`)}
      </span>
      {afterTag && parseNestedTags(afterTag, `${key}-after`)}
    </span>
  );
}

export function parseStyledText(content: string): React.ReactElement[] {
  if (!content) return [];

  const lines = content.split('\n');
  return lines.map((line, index) => (
    <span key={`line-${index}`}>
      {parseNestedTags(line, `line-${index}`)}
      {index < lines.length - 1 ? '\n' : ''}
    </span>
  ));
}
