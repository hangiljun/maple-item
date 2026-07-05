"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Image, X } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (review: {
    author: string;
    content: string;
    image?: string;
  }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author || !content) {
      alert("닉네임과 후기 내용을 모두 입력해주세요.");
      return;
    }

    onSubmit({
      author,
      content,
      image: imagePreview || undefined,
    });

    // 폼 초기화
    setAuthor("");
    setContent("");
    setImagePreview("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하만 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
  };

  return (
    <Card className="border-2 border-[#FFB800]/30">
      <CardHeader>
        <CardTitle>💬 판매 후기 남기기</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              닉네임
            </label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="게임 닉네임"
              maxLength={20}
            />
          </div>

          {/* 후기 내용 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              후기 내용
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="판매 어떠셨나요? 솔직한 후기 남겨주세요!"
              rows={5}
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {content.length}/500
            </div>
          </div>

          {/* 사진 업로드 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📸 판매 인증샷 (선택)
            </label>

            {!imagePreview ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#FFB800] hover:bg-gray-50 transition"
                >
                  <Image size={24} className="text-gray-400" />
                  <span className="text-gray-600">클릭해서 이미지 업로드</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  * 최대 5MB, JPG/PNG 파일만 가능
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* 제출 버튼 */}
          <Button type="submit" variant="primary" size="large" className="w-full">
            <Send size={20} />
            후기 등록하기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
