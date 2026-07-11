"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Icons removed
import { uploadImage } from "@/lib/upload";
import { submitReview } from "@/app/reviews/actions";
import { useRouter } from "next/navigation";

export function ReviewForm() {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author || !content) {
      alert("닉네임과 후기 내용을 모두 입력해주세요.");
      return;
    }

    setUploading(true);

    try {
      let imageUrl: string | undefined;

      // 이미지가 있으면 Firebase Storage에 업로드
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'reviews');
      }

      const result = await submitReview({
        author,
        content,
        image: imageUrl,
      });

      if (result.success) {
        alert("후기가 등록되었습니다! 감사합니다 😊");

        // 폼 초기화
        setAuthor("");
        setContent("");
        setImageFile(null);
        setImagePreview("");

        // 페이지 새로고침
        router.refresh();
      } else {
        alert(result.error || '후기 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('후기 등록 실패:', error);
      alert('후기 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하만 가능합니다.");
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setImageFile(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
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
                  <span className="text-gray-600">📷 클릭해서 이미지 업로드</span>
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
                  className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm"
                >
                  ✕ 삭제
                </button>
              </div>
            )}
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full"
            disabled={uploading}
          >
            {uploading ? "📤 업로드 중..." : "✍️ 후기 등록하기"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
