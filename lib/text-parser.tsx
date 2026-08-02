// 텍스트 파싱 유틸리티
import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

// 재귀적으로 중첩된 태그 파싱 (기존 커스텀 태그용)
function parseNestedTags(text: string, key: string = "0"): React.ReactElement {
  // 태그 정규식 - backreference로 여는 태그와 닫는 태그 매칭
  const tagRegex = /\[(색|크기):([가-힣a-zA-Z0-9]+)\](.*?)\[\/\1\]/;
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

// 기존 커스텀 태그 파싱 (하위 호환용)
function parseCustomTags(content: string): React.ReactElement[] {
  const lines = content.split('\n');
  return lines.map((line, index) => (
    <span key={`line-${index}`}>
      {parseNestedTags(line, `line-${index}`)}
      {index < lines.length - 1 ? '\n' : ''}
    </span>
  ));
}

// 하이브리드 파서: 커스텀 태그가 있으면 기존 파서, 없으면 마크다운 파서
export function parseStyledText(content: string): React.ReactElement | React.ReactElement[] {
  if (!content) return [];

  // 커스텀 태그 감지
  const hasCustomTags = /\[(색|크기):[^\]]+\].*?\[\/\1\]/.test(content);

  if (hasCustomTags) {
    // 기존 커스텀 태그 파서 사용 (하위 호환)
    return parseCustomTags(content);
  }

  // 마크다운 파서 사용 (새 글 지원)
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
