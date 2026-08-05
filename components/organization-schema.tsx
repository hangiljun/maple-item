export function OrganizationSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://mapleitem.co.kr/#organization',
        name: '메이플아이템',
        url: 'https://mapleitem.co.kr',
        logo: 'https://mapleitem.co.kr/logo.png',
        description: '메이플스토리 급처템 구매 서비스',
        sameAs: [
          'https://www.maplediscord.com',
          'https://discord.gg/2UwBw8dnSv'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: 'Korean'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://mapleitem.co.kr/#website',
        url: 'https://mapleitem.co.kr',
        name: '메이플아이템',
        inLanguage: 'ko-KR',
        publisher: {
          '@id': 'https://mapleitem.co.kr/#organization'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
