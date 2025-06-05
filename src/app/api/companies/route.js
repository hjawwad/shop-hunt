import { NextResponse } from 'next/server';

// Sample companies data
const companies = [
    {
        id: 1,
        name: 'Science.bio',
        description: 'My #1 SARMs source',
        discount: 'SM10 for 10% off',
        purity: '99%+ pure verified purity',
        features: [
            'Tested, 99%+ purity',
            'SARMs in powder and liquid form',
            'Huge variety of other products',
            'Their customer support has been great whenever I\'ve needed it',
            'Very good shipping experience'
        ],
        website: 'https://science.bio',
        rating: 5,
        recommended: true
    },
    {
        id: 2,
        name: 'Chemyo',
        description: 'Reliable SARMs vendor',
        discount: 'SAVE15 for 15% off',
        purity: '99%+ pure verified',
        features: [
            'Third-party tested',
            'Fast shipping',
            'Excellent customer service',
            'Wide product selection'
        ],
        website: 'https://chemyo.com',
        rating: 4.5,
        recommended: true
    }
];

export async function GET() {
    return NextResponse.json(companies);
} 