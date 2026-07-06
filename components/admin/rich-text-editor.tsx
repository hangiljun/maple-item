"use client";

import { useState } from "react";
import { Type, Palette } from "lucide-react";

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

  const colors = [
    { name: "기본", value: "#2D2D2D" },
    { name: "빨강", value: "#EF4444" },
    { name: "주황", value: "#FFB800" },
    { name: "초록", value: "#10B981" },
    { name: "파랑", value: "#3B82F6" },
    { name: "보라", value: "#8B5CF6" },
  ];

  const sizes = [
    { name: "작게", value: "sm" },
    { name: "보통", value: "base" },
    { name: "크게", value: "lg" },
    { name: "더크게", value: "xl" },
    { name: "매우크게", value: "2xl" },
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {/* 스타일 도구 */}
      <div className="flex gap-4 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        {/* 색상 선택 */}
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-gray-600" />
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorChange(color.value)}
                className={`w-8 h-8 rounded-lg border-2 transition ${
                  selectedColor === color.value
                    ? "border-[#FFB800] scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* 크기 선택 */}
        <div className="flex items-center gap-2">
          <Type size={18} className="text-gray-600" />
          <select
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none"
          >
            {sizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 텍스트 에리어 */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none transition resize-none"
        style={{
          color: selectedColor,
          fontSize: selectedSize === "sm" ? "14px" :
                   selectedSize === "lg" ? "18px" :
                   selectedSize === "xl" ? "20px" :
                   selectedSize === "2xl" ? "24px" : "16px"
        }}
        placeholder="내용을 입력하세요..."
      />

      {/* 미리보기 */}
      <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-600 mb-2">미리보기:</div>
        <div
          className="leading-relaxed whitespace-pre-wrap"
          style={{
            color: selectedColor,
            fontSize: selectedSize === "sm" ? "14px" :
                     selectedSize === "lg" ? "18px" :
                     selectedSize === "xl" ? "20px" :
                     selectedSize === "2xl" ? "24px" : "16px"
          }}
        >
          {value || "텍스트를 입력하세요..."}
        </div>
      </div>
    </div>
  );
}
