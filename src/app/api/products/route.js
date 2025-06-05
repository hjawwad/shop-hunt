import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../../lib/supabase';

export async function GET() {
    try {
        // Use service role client for server-side operations
        const supabase = getSupabaseClient(true);

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('product_name', { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch products', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ products: data, count: data.length });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
    const body = await request.json();
        const { product_name, price, coupon_code, buy_link } = body;

        // Validate required fields
        if (!product_name || !price) {
            return NextResponse.json(
                { error: 'Missing required fields: product_name and price are required' },
                { status: 400 }
            );
        }

        // Use service role client for server-side operations
        const supabase = getSupabaseClient(true);

        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    product_name,
                    price: parseFloat(price),
                    coupon_code: coupon_code || null,
                    buy_link: buy_link || null,
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to create product', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ product: data }, { status: 201 });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
} 