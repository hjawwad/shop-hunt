import { NextResponse } from 'next/server';

// Sample products data
const products = [
    {
        id: 1,
        name: 'YK11 Myostine',
        description: 'Highly selective androgen receptor modulator',
        code: 'YK11',
        price: 59.99,
        image: '/images/products/yk11.jpg',
        link: 'https://science.bio/yk11-myostine/',
        category: 'sarms'
    },
    {
        id: 2,
        name: 'MK-677 Ibutamoren',
        description: 'Growth hormone secretagogue',
        code: 'MK-677',
        price: 49.99,
        image: '/images/products/mk677.jpg',
        link: 'https://science.bio/mk-677-ibutamoren/',
        category: 'sarms'
    },
    {
        id: 3,
        name: 'RAD140 Testolone',
        description: 'Potent selective androgen receptor modulator',
        code: 'RAD140',
        price: 54.99,
        image: '/images/products/rad140.jpg',
        link: 'https://science.bio/rad140-testolone/',
        category: 'sarms'
    }
];

export async function GET() {
    return NextResponse.json(products);
}

export async function POST(request) {
    const body = await request.json();

    // In a real app, you'd save to a database
    const newProduct = {
        id: products.length + 1,
        ...body,
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
} 