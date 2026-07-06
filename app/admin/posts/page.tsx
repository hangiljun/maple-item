"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { ArrowLeft, Plus, Edit, Trash2, Pin, PinOff, Sparkles, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { uploadImage } from "@/lib/upload";
import { getAllPosts, createPost, updatePost, deletePost, togglePinPost } from "@/lib/posts";
import Link from "next/link";
import type { NewsPost } from "@/lib/types";

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);

  // 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("공지");
  const [tag, setTag] = useState("최신");
  const [featured, setFeatured] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [titleColor, setTitleColor] = useState("#2D2D2D");
  const [titleSize, setTitleSize] = useState<"sm" | "base" | "lg" | "xl" | "2xl">("base");
  const [contentColor, setContentColor] = useState("#2D2D2D");
  const [contentSize, setContentSize] = useState<"sm" | "base" | "lg" | "xl" | "2xl">("base");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const loadPosts = async () => {
    try {
      const posts = await getAllPosts();
      setPosts(posts);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    }
  };

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin");
    } else {
      loadPosts();
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUploading(true);

    try {
      const now = new Date();

      let imageUrl = imagePreview;

      // 새 이미지 파일이 있으면 Firebase에 업로드
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'posts');
      }

      const postData = {
        category,
        icon: category === "이벤트" ? "Sparkles" : category === "시세정보" ? "TrendingUp" : "AlertCircle",
        title,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].substring(0, 5),
        featured,
        pinned,
        content,
        details: content.split('\n').filter(line => line.trim()),
        tag,
        titleColor,
        titleSize,
        contentColor,
        contentSize,
        image: imageUrl || undefined,
      };

      if (editingPost) {
        // 수정
        await updatePost(editingPost.id, postData);
      } else {
        // 새 작성
        await createPost(postData);
      }

      await loadPosts();
      resetForm();
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("공지");
    setTag("최신");
    setFeatured(false);
    setPinned(false);
    setTitleColor("#2D2D2D");
    setTitleSize("base");
    setContentColor("#2D2D2D");
    setContentSize("base");
    setImageFile(null);
    setImagePreview("");
    setEditingPost(null);
    setShowEditor(false);
  };

  const handleEdit = (post: NewsPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setTag(post.tag);
    setFeatured(post.featured);
    setPinned(post.pinned);
    setTitleColor(post.titleColor || "#2D2D2D");
    setTitleSize(post.titleSize || "base");
    setContentColor(post.contentColor || "#2D2D2D");
    setContentSize(post.contentSize || "base");
    setImagePreview(post.image || "");
    setImageFile(null);
    setShowEditor(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하만 가능합니다.");
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      setImageFile(file);

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

  const handleDelete = async (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        await loadPosts();
      } catch (error) {
        console.error('게시글 삭제 실패:', error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleTogglePin = async (id: string, currentPinned: boolean) => {
    try {
      await togglePinPost(id, currentPinned);
      await loadPosts();
    } catch (error) {
      console.error('고정 상태 변경 실패:', error);
      alert('고정 상태 변경에 실패했습니다.');
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0; // Firestore에서 이미 createdAt으로 정렬됨
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 헤더 */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
          >
            <ArrowLeft size={20} />
            <span>대시보드로</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">게시글 관리</h1>
              <p className="text-gray-400 text-sm">총 {posts.length}개의 게시글</p>
            </div>
            <Button
              onClick={() => setShowEditor(!showEditor)}
              variant="primary"
            >
              <Plus size={20} />
              {showEditor ? "목록으로" : "새 게시글"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* 에디터 */}
        {showEditor && (
          <div className="glass rounded-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingPost ? "게시글 수정" : "새 게시글 작성"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 카테고리 및 옵션 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    카테고리
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none"
                    required
                  >
                    <option value="공지">공지</option>
                    <option value="이벤트">이벤트</option>
                    <option value="시세정보">시세정보</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    태그
                  </label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none"
                  >
                    <option value="최신">최신</option>
                    <option value="진행중">진행중</option>
                    <option value="마감">마감</option>
                    <option value="중요">중요</option>
                  </select>
                </div>
              </div>

              {/* 옵션 체크박스 */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[#FFB800] focus:ring-[#FFB800]"
                  />
                  <Sparkles size={18} className="text-yellow-400" />
                  <span>추천 게시글</span>
                </label>

                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-[#FFB800] focus:ring-[#FFB800]"
                  />
                  <Pin size={18} className="text-red-400" />
                  <span>상단 고정</span>
                </label>
              </div>

              {/* 제목 */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="게시글 제목"
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none"
                  style={{ color: titleColor, fontSize: titleSize === "2xl" ? "24px" : titleSize === "xl" ? "20px" : titleSize === "lg" ? "18px" : "16px" }}
                  required
                />

                {/* 제목 스타일링 */}
                <div className="mt-3 flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">제목 색상:</span>
                    <input
                      type="color"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">제목 크기:</span>
                    <select
                      value={titleSize}
                      onChange={(e) => setTitleSize(e.target.value as "sm" | "base" | "lg" | "xl" | "2xl")}
                      className="px-3 py-1 rounded-lg border border-gray-600 bg-gray-800 text-white text-sm"
                    >
                      <option value="sm">작게</option>
                      <option value="base">보통</option>
                      <option value="lg">크게</option>
                      <option value="xl">더 크게</option>
                      <option value="2xl">매우 크게</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 내용 (리치 텍스트 에디터) */}
              <RichTextEditor
                value={content}
                onChange={setContent}
                onColorChange={setContentColor}
                onSizeChange={(size) => setContentSize(size as "sm" | "base" | "lg" | "xl" | "2xl")}
                label="내용"
              />

              {/* 이미지 업로드 */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  📸 대표 이미지 (선택)
                </label>

                {!imagePreview ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="post-image-upload"
                    />
                    <label
                      htmlFor="post-image-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#FFB800] hover:bg-gray-800/30 transition"
                    >
                      <ImageIcon size={24} className="text-gray-500" />
                      <span className="text-gray-400">클릭해서 이미지 업로드</span>
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
              <div className="flex gap-4">
                <Button type="submit" variant="primary" size="large" className="flex-1" disabled={uploading}>
                  {uploading ? "업로드 중..." : editingPost ? "수정 완료" : "게시글 등록"}
                </Button>
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="secondary"
                  size="large"
                >
                  취소
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* 게시글 목록 */}
        {!showEditor && (
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <div
                key={post.id}
                className={`glass rounded-xl p-6 ${post.pinned ? "border-2 border-red-500/50" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {post.pinned && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold mb-2">
                        <Pin size={12} />
                        고정됨
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold">
                        {post.category}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs">
                        {post.tag}
                      </span>
                      {post.featured && (
                        <Sparkles size={16} className="text-yellow-400" />
                      )}
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        color: post.titleColor || "#fff",
                        fontSize: post.titleSize === "2xl" ? "24px" : post.titleSize === "xl" ? "20px" : post.titleSize === "lg" ? "18px" : "16px"
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-sm mb-2 whitespace-pre-wrap"
                      style={{
                        color: post.contentColor || "#9CA3AF",
                        fontSize: post.contentSize === "sm" ? "14px" :
                                 post.contentSize === "lg" ? "18px" :
                                 post.contentSize === "xl" ? "20px" :
                                 post.contentSize === "2xl" ? "24px" : "16px"
                      }}
                    >
                      {post.content.substring(0, 100)}...
                    </p>
                    <div className="text-xs text-gray-500">
                      {post.date} {post.time}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleTogglePin(post.id, post.pinned)}
                      className={post.pinned ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-gray-700/50 text-gray-400"}
                      size="default"
                    >
                      {post.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                    </Button>
                    <Button
                      onClick={() => handleEdit(post)}
                      className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                      size="default"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500/20 text-red-400 border-red-500/30"
                      size="default"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-16">
                <Sparkles className="mx-auto text-gray-600 mb-4" size={64} />
                <p className="text-gray-400 text-lg">등록된 게시글이 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
