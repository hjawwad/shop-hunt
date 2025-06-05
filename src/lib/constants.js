// Site configuration
export const SITE_CONFIG = {
    name: 'SARMLEAKS.COM',
    description: '#1 SARMs Source Reviews & Recommendations',
    url: 'https://sarmleaks.com',
    ogImage: '/images/og-image.jpg',
};

// Navigation menu items
export const NAV_ITEMS = [
    { name: 'SARMs', href: '/sarms', hasDropdown: true },
    { name: 'MK-677', href: '/mk-677' },
    { name: 'Cardarine', href: '/cardarine' },
    { name: 'Stenabolic', href: '/stenabolic' },
    { name: 'Buy SARMs', href: '/buy-sarms', isButton: true },
];

// Footer links
export const FOOTER_LINKS = [
    { name: 'SarmLeaks.com', href: '/' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    { name: 'Medical Disclaimer', href: '/medical-disclaimer' },
    { name: 'Contact Me', href: '/contact' },
];

// Recommended companies
export const RECOMMENDED_COMPANIES = [
    {
        id: 1,
        name: 'Science.bio',
        description: 'My #1 SARMs source',
        discountCode: 'SM10',
        discountPercent: 10,
        website: 'https://science.bio',
        isPrimary: true,
    },
    {
        id: 2,
        name: 'Chemyo',
        description: 'Reliable alternative',
        discountCode: 'SAVE15',
        discountPercent: 15,
        website: 'https://chemyo.com',
        isPrimary: false,
    },
];

// Product categories
export const PRODUCT_CATEGORIES = [
    'SARMs',
    'Peptides',
    'Nootropics',
    'Research Chemicals',
]; 