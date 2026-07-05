import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '메이플아이템 - 메이플스토리 급처템 고가매입',
    short_name: '메이플아이템',
    description: '메이플스토리 급처템 빠르고 안전한 고가매입 플랫폼',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFBF5',
    theme_color: '#FFB800',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
