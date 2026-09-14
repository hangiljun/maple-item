import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마크다운 작성',
  robots: { index: false, follow: false },
};

export default function WriteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
