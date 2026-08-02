"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  Heading2,
  Heading3,
  Undo,
  Redo
} from 'lucide-react';
import { useState } from 'react';
import { uploadImage } from '@/lib/upload';
import DOMPurify from 'isomorphic-dompurify';

interface TipTapEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
}

export function TipTapEditor({ value, onChange, label = "본문" }: TipTapEditorProps) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#FFB800] underline',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      // DOMPurify로 sanitize
      const sanitized = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 's',
          'h2', 'h3',
          'ul', 'ol', 'li',
          'a',
          'img',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'blockquote', 'code', 'pre'
        ],
        ALLOWED_ATTR: [
          'href', 'target', 'rel',
          'src', 'alt', 'width', 'height',
          'class'
        ],
        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
      });

      onChange(sanitized);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
    },
  });

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하만 가능합니다.');
        return;
      }

      try {
        setUploading(true);
        const url = await uploadImage(file, 'posts');

        if (editor) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  const addLink = () => {
    const url = window.prompt('URL을 입력하세요:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url, target: '_blank', rel: 'noopener noreferrer' }).run();
    }
  };

  const addTable = () => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, active, disabled, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded transition ${
        active
          ? 'bg-[#FFB800] text-white'
          : disabled
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {/* 도움말 */}
      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <strong>💡 WYSIWYG 에디터:</strong> 실제 표시되는 형태로 편집할 수 있습니다. 굵게, 기울임, 표, 이미지 등을 자유롭게 사용하세요.
      </div>

      {/* 툴바 */}
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="제목 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="제목 3"
        >
          <Heading3 size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="굵게"
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="기울임"
        >
          <Italic size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="목록"
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="번호 목록"
        >
          <ListOrdered size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={addLink}
          active={editor.isActive('link')}
          title="링크"
        >
          <Link2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={handleImageUpload}
          disabled={uploading}
          title={uploading ? "업로드 중..." : "이미지"}
        >
          <ImageIcon size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={addTable}
          title="표"
        >
          <TableIcon size={18} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="실행 취소"
        >
          <Undo size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="다시 실행"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>

      {/* 에디터 */}
      <div className="border border-t-0 border-gray-300 rounded-b-lg bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* 보안 안내 */}
      <div className="mt-2 text-xs text-gray-500">
        ⚠️ 보안: 저장 시 자동으로 위험한 스크립트가 제거됩니다.
      </div>
    </div>
  );
}
