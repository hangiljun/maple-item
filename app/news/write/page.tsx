'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MarkdownContent } from '../article-content';
import styles from '../news.module.css';

const DRAFT_KEY = 'mapleitem-news1-draft-v1';
export default function MarkdownWriter() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const [storageError, setStorageError] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (typeof draft.title === 'string' && typeof draft.content === 'string') {
          // Browser-only draft hydration must run after the server-rendered first frame.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTitle(draft.title); setContent(draft.content);
        }
      }
    } catch { setStorageError(true); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, content })); }
    // Report a failed write to the external browser storage to the author.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    catch { setStorageError(true); }
  }, [title, content, ready]);
  async function copy() {
    try { await navigator.clipboard.writeText(content); setMessage('본문을 복사했습니다. 기존 관리자에서 제목과 함께 등록해주세요.'); }
    catch { inputRef.current?.focus(); inputRef.current?.select(); setMessage('자동 복사가 제한되어 본문을 선택했습니다. Ctrl+C 또는 복사 메뉴를 사용해주세요.'); }
  }
  function download() {
    const blob = new Blob([`# ${title.trim()}\n\n${content}`], { type:'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `${title.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g, '').slice(0, 80) || '메이플-소식'}.md`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage('마크다운 파일을 다운로드했습니다.');
  }
  return <div className={styles.container}><div className={styles.editorHeader}><Link href="/news" className={styles.back}>← 소식 목록</Link><h1>마크다운 작성</h1><p>내용에 집중해서 쓰고, 독자에게 보일 모습을 바로 확인하세요.<br />초안은 이 브라우저에만 저장됩니다. 실제 게시는 기존 관리자에서 진행합니다.</p></div>
    <label className={styles.titleField}>글 제목<input value={title} disabled={!ready} onChange={e => setTitle(e.target.value)} maxLength={200} /></label>
    <div className={styles.editorActions}><button className={styles.primary} onClick={copy} disabled={!content.trim()}>본문 복사</button><button className={styles.secondary} onClick={download} disabled={!title.trim() || !content.trim()}>.md 다운로드</button><Link href="/admin/posts" className={styles.secondary}>기존 관리자에서 게시 ↗</Link><span>{!ready ? '초안 불러오는 중' : storageError ? '자동 저장 불가 · 파일로 다운로드해주세요' : '이 브라우저에 자동 저장'} · {content.length.toLocaleString()}자</span></div>
    <p role="status" aria-live="polite">{message}</p>
    <details className={styles.help}><summary>마크다운 작성 도움말</summary><p><code>## 소제목</code>으로 내용을 나누고, <code>**중요한 내용**</code>을 강조하세요.<br /><code>- 목록</code>, <code>1. 순서</code>, <code>&gt; 인용문</code>, <code>[링크 이름](https://주소)</code>, <code>![이미지 설명](https://이미지주소)</code>를 사용할 수 있습니다.<br />표는 <code>| 항목 | 내용 |</code> 아래에 <code>| --- | --- |</code>를 추가해 작성합니다.</p><p>제목에는 글의 주제를 구체적으로 적고, 본문에는 확인 날짜와 출처를 함께 남겨주세요. 작성한 제목은 관리자 제목란에, 복사한 본문은 마크다운 입력란에 넣으면 됩니다.</p></details>
    <div className={styles.editorGrid}><section className={styles.editorPanel}><label className={styles.panelLabel} htmlFor="markdown-body">마크다운 본문</label><textarea id="markdown-body" ref={inputRef} value={content} disabled={!ready} onChange={e => setContent(e.target.value)} spellCheck={false} /></section><section className={styles.editorPanel} aria-label="글 미리보기"><div className={styles.panelLabel}>독자 화면 미리보기</div><div className={styles.previewContent}>{title && <h2>{title}</h2>}{content ? <MarkdownContent content={content} /> : <p className={styles.description}>본문을 작성하면 이곳에서 미리 볼 수 있습니다.</p>}</div></section></div>
  </div>;
}
