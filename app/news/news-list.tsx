'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Pin } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import type { NewsPost } from '@/lib/types';
import { KAKAO_LINK } from '@/lib/constants';
import styles from './news.module.css';
import { filterPosts, summary } from './news-utils';

const categories = ['전체', '공지', '이벤트', '시세정보'];
const PAGE_SIZE = 8;


export function NewsList({ initialPosts }: { initialPosts: NewsPost[] | null }) {
  const [posts, setPosts] = useState<NewsPost[]>(initialPosts || []);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(initialPosts ? 'ready' : 'loading');
  const [retry, setRetry] = useState(0);
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (initialPosts && retry === 0) return;
    let active = true;
    getAllPosts().then(data => { if (active) { setPosts(data); setStatus('ready'); } }).catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [initialPosts, retry]);
  const sorted = filterPosts(posts, '전체', '');
  const filtered = filterPosts(posts, category, query);
  const featured = category === '전체' && !query.trim() ? sorted[0] : undefined;
  const rows = filtered.filter(post => post.id !== featured?.id);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  return <div className={styles.container}>
    <section data-maple-hero="compact" className={styles.intro}><div><p className={styles.eyebrow}>메이플스토리 소식</p><h1>알아두면 좋은 소식,<br /><span>판매 전에 한 번 더.</span></h1><p className={styles.description}>메이플 이벤트부터 아이템 시세 정보까지.<br />필요한 소식을 찾아보고, 아이템 정리를 준비하세요.</p></div></section>
    <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label="소식 분류">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setPage(1); }}>{item}</button>)}</div><label className={styles.search}><Search size={18} aria-hidden="true" /><span className={styles.srOnly}>소식 검색</span><input type="search" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="제목 또는 내용 검색" /></label></div>
    {status === 'loading' ? <div className={styles.state} role="status">소식을 불러오고 있습니다.</div> : status === 'error' ? <div className={styles.state} role="alert"><h2>소식을 불러오지 못했습니다.</h2><p>인터넷 연결을 확인하고 다시 시도해주세요.</p><button className={styles.secondary} onClick={() => { setStatus('loading'); setRetry(retry + 1); }}>다시 불러오기</button></div> : <>
      {featured && <Link href={`/news/${featured.id}`} className={styles.featured}><article><div className={styles.meta}><span className={styles.badge}>{featured.category}</span>{featured.pinned && <span><Pin size={13} aria-hidden="true" /> 고정 소식</span>}<time dateTime={featured.date}>{featured.date}</time></div><h2>{featured.title}</h2><p>{summary(featured)}</p><span className={styles.readMore}>자세히 읽기 <ArrowRight size={17} aria-hidden="true" /></span></article>{featured.image && <div className={styles.featuredImage}><Image src={featured.image} alt="" width={300} height={220} unoptimized /></div>}</Link>}
      <div className={styles.contentGrid}><section aria-label="소식 목록"><div className={styles.listHeading}><h2>{query.trim() ? '검색 결과' : category === '전체' ? '전체 소식' : category}</h2><span role="status">{filtered.length}개의 글</span></div>{!filtered.length ? <div className={styles.state}><h3>{query ? '검색 결과가 없습니다.' : '등록된 소식이 없습니다.'}</h3><p>{query ? '다른 검색어를 입력하거나 분류를 바꿔보세요.' : '새 소식이 등록되면 이곳에서 확인할 수 있습니다.'}</p>{(query || category !== '전체') && <button className={styles.secondary} onClick={() => { setQuery(''); setCategory('전체'); setPage(1); }}>전체 소식 보기</button>}</div> : rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(post => <Link className={styles.row} href={`/news/${post.id}`} key={post.id}><article><div className={styles.meta}><span className={styles.badge}>{post.category}</span><time dateTime={post.date}>{post.date}</time>{post.pinned && <Pin size={13} aria-label="고정 글" />}</div><h3>{post.title}</h3><p>{summary(post)}</p></article><ArrowRight size={20} aria-hidden="true" /></Link>)}{pages > 1 && <nav aria-label="소식 페이지" className={styles.pagination}><button disabled={page === 1} onClick={() => setPage(page - 1)}>이전</button><span aria-live="polite">{page} / {pages}</span><button disabled={page === pages} onClick={() => setPage(page + 1)}>다음</button></nav>}</section><aside className={styles.aside}><p className={styles.eyebrow}>아이템 판매 상담</p><h2>내 아이템은<br />얼마에 팔 수 있을까요?</h2><p>서버와 아이템 옵션을 알려주시면<br />시세를 확인하고 안내해드립니다.</p><a className={styles.primary} href={KAKAO_LINK} target="_blank" rel="noreferrer">카카오톡으로 문의 <ArrowRight size={16} aria-hidden="true" /></a><Link className={styles.guideLink} href="/guide">처음 거래한다면 이용가이드 <ArrowRight size={15} aria-hidden="true" /></Link></aside></div>
    </>}
  </div>;
}
