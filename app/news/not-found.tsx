import Link from 'next/link';
import styles from './news.module.css';
export default function MissingPost() { return <div className={styles.state}><h1>소식을 찾을 수 없습니다.</h1><p>삭제되었거나 주소가 변경된 글입니다.</p><Link href="/news" className={styles.secondary}>소식 목록으로</Link></div>; }
