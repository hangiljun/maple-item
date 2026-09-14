import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './news.module.css';

export function MarkdownContent({ content }: { content: string }) {
  return <div className={styles.prose}><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h1: ({ children }) => <h2>{children}</h2>,
    table: ({ children }) => <div className={styles.tableScroll} role="region" aria-label="표 · 가로로 스크롤할 수 있습니다" tabIndex={0}><table>{children}</table></div>,
    a: ({ href, children }) => <a href={href} rel="noreferrer">{children}</a>,
  }}>{content}</ReactMarkdown></div>;
}
