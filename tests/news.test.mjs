import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterPosts, plainText, summary, listPost } from '../app/news/news-utils.ts';

const posts = [
  { id: 'new', title: '새 소식', category: '공지', date: '2026-09-14', time: '12:00', content: '가'.repeat(180) + ' 아케인', pinned: false },
  { id: 'pinned', title: '고정 소식', category: '시세정보', date: '2026-08-01', time: '10:00', content: 'Maple 아이템', pinned: true },
  { id: 'old', title: '이벤트 소식', category: '이벤트', date: '2026-08-01', time: '10:00', content: '이벤트 안내', pinned: false },
];
test('목록 서버 렌더링 데이터에서 Firestore 타임스탬프를 제외한다', () => {
  const result = listPost({ ...posts[0], createdAt: { toDate() { return new Date(); } } });
  assert.equal('createdAt' in result, false);
  assert.equal(result.id, 'new');
  assert.equal(result.content, posts[0].content);
});
test('고정 글 우선, 나머지는 최신순이며 원본 배열을 유지한다', () => {
  assert.deepEqual(filterPosts(posts, '전체', '').map(post => post.id), ['pinned', 'new', 'old']);
  assert.equal(posts[0].id, 'new');
});
test('요약에 잘린 본문 뒤쪽도 검색한다', () => {
  assert.equal(filterPosts(posts, '전체', '아케인')[0].id, 'new');
});
test('분류와 검색어를 함께 적용한다', () => {
  assert.equal(filterPosts(posts, '이벤트', '아케인').length, 0);
  assert.equal(filterPosts(posts, '시세정보', ' maple ')[0].id, 'pinned');
});
test('마크다운 링크와 HTML을 읽을 수 있는 요약으로 만든다', () => {
  assert.equal(plainText('## 제목\n**내용** [출처](https://example.com) ![사진](https://example.com/a.png)'), '제목 내용 출처');
  assert.equal(plainText('<p>안내</p><p>내용</p>'), '안내 내용');
});
test('작성한 요약은 유지하고 자동 요약 길이는 제한한다', () => {
  assert.equal(summary({ ...posts[0], excerpt: '직접 쓴 요약' }), '직접 쓴 요약');
  assert.equal(summary(posts[0]).length, 150);
});
test('빈 데이터와 일치하지 않는 검색어는 빈 배열을 반환한다', () => {
  assert.deepEqual(filterPosts([], '전체', ''), []);
  assert.deepEqual(filterPosts(posts, '전체', '없는 단어'), []);
});
