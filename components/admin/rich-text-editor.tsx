"use client";

import React, { useState, useRef } from "react";
import { Type, Palette, Paintbrush, TextQuote } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: string) => void;
  label?: string;
}

export function RichTextEditor({
  value,
  onChange,
  onColorChange,
  onSizeChange,
  label = "내용"
}: RichTextEditorProps) {
  const [selectedColor, setSelectedColor] = useState("#2D2D2D");
  const [selectedSize, setSelectedSize] = useState("base");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const colors = [
    { name: "기본", value: "#2D2D2D", tag: "기본" },
    { name: "빨강", value: "#EF4444", tag: "빨강" },
    { name: "주황", value: "#FFB800", tag: "주황" },
    { name: "초록", value: "#10B981", tag: "초록" },
    { name: "파랑", value: "#3B82F6", tag: "파랑" },
    { name: "보라", value: "#8B5CF6", tag: "보라" },
  ];

  const sizes = [
    { name: "작게", value: "sm", tag: "작게" },
    { name: "보통", value: "base", tag: "보통" },
    { name: "크게", value: "lg", tag: "크게" },
    { name: "더크게", value: "xl", tag: "더크게" },
    { name: "매우크게", value: "2xl", tag: "매우크게" },
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  // 선택한 텍스트에 색상 적용
  const applyColorToSelection = (colorTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      alert("색상을 적용할 텍스트를 먼저 드래그해서 선택하세요!");
      return;
    }

    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newValue = `${beforeText}[색:${colorTag}]${selectedText}[/색]${afterText}`;
    onChange(newValue);

    // 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + `[색:${colorTag}]${selectedText}[/색]`.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 선택한 텍스트에 크기 적용
  const applySizeToSelection = (sizeTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      alert("크기를 적용할 텍스트를 먼저 드래그해서 선택하세요!");
      return;
    }

    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newValue = `${beforeText}[크기:${sizeTag}]${selectedText}[/크기]${afterText}`;
    onChange(newValue);

    // 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + `[크기:${sizeTag}]${selectedText}[/크기]`.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 미리보기용 파싱 함수 - 중첩 태그 지원
  const parseContent = (content: string) => {
    if (!content) return [];

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
    const parseNestedTags = (text: string, key: string = "0"): React.ReactElement => {
      const tagRegex = /\[(색|크기):([가-힣a-zA-Z0-9]+)\](.*?)\[\/(색|크기)\]/;
      const match = tagRegex.exec(text);

      if (!match) {
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
    };

    const lines = content.split('\n');
    return lines.map((line, index) => (
      <span key={`line-${index}`}>
        {parseNestedTags(line, `line-${index}`)}
        {index < lines.length - 1 ? '\n' : ''}
      </span>
    ));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {/* 도움말 */}
      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <strong>💡 사용법:</strong> 강조하고 싶은 텍스트를 드래그한 후, 아래 색상 또는 크기 버튼을 클릭하세요!
        <br />
        <span className="text-xs text-blue-600 mt-1 block">※ 입력창의 태그는 저장용이며, 미리보기와 실제 게시글에서는 스타일만 표시됩니다.</span>
      </div>

      {/* 스타일 도구 - 선택 영역에 적용 */}
      <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
        {/* 색상 적용 버튼 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Paintbrush size={16} className="text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">선택한 텍스트에 색상 적용:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => applyColorToSelection(color.tag)}
                className="px-3 py-1.5 rounded-lg border-2 border-gray-300 hover:border-[#FFB800] transition text-xs font-medium flex items-center gap-1"
                title={`선택한 텍스트를 ${color.name}으로 변경`}
              >
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </button>
            ))}
          </div>
        </div>

        {/* 크기 적용 버튼 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TextQuote size={16} className="text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">선택한 텍스트에 크기 적용:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => applySizeToSelection(size.tag)}
                className="px-3 py-1.5 rounded-lg border-2 border-gray-300 hover:border-[#FFB800] transition text-xs font-medium"
                title={`선택한 텍스트를 ${size.name} 크기로 변경`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 텍스트 에리어 */}
      <div className="mb-2">
        <label className="text-xs text-gray-600">📝 내용 입력 (태그는 자동으로 추가됩니다)</label>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none transition resize-none font-mono text-sm"
        placeholder="내용을 입력하세요..."
      />

      {/* 미리보기 */}
      <div className="mt-3 p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-200">
          <div className="text-xs font-bold text-green-700">✓ 미리보기 (실제 표시 결과)</div>
        </div>
        <div className="leading-relaxed whitespace-pre-wrap min-h-[60px]">
          {value ? parseContent(value) : <span className="text-gray-400 text-sm">텍스트를 입력하고 스타일을 적용해보세요...</span>}
        </div>
      </div>
    </div>
  );
}
