'use client';
import styles from './news.module.css';
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className={styles.state} role="alert"><h1>소식을 불러오지 못했습니다.</h1><p>연결을 확인한 뒤 다시 시도해주세요.</p><button className={styles.secondary} onClick={reset}>다시 시도</button></div>; }
