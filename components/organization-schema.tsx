export function OrganizationSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '메이플아이템',
    url: 'https://mapleitem.co.kr',
    logo: 'https://mapleitem.co.kr/logo.png',
    description: '메이플스토리 급처템 고가구매 전문 업체',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'Korean',
      areaServed: 'KR'
    },
    sameAs: [
      'https://mapleitem.co.kr'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
