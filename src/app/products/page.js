'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ProductCard } from '../../components';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('product_name', { ascending: true });

            if (error) {
                throw error;
            }

            // Transform the data to match our ProductCard component structure
            const transformedProducts = data.map(product => ({
                id: product.id,
                name: product.product_name,
                price: product.price,
                code: product.coupon_code || '',
                link: product.buy_link || '#',
                description: `High-quality ${product.product_name}`,
                image: '/next.svg' // Using placeholder for now
            }));

            setProducts(transformedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                {/* Loading Hero Section */}
                <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Our Products
                        </h1>
                        <div className="text-xl text-gray-300">
                            Loading products...
                        </div>
                    </div>
                </section>

                {/* Loading Spinner */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                {/* Error Hero Section */}
                <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Our Products
                        </h1>
                        <div className="text-xl text-red-400">
                            Error loading products
                        </div>
                    </div>
                </section>

                {/* Error Message */}
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                            <div className="text-red-800 text-lg font-semibold mb-2">
                                Failed to load products
                            </div>
                            <div className="text-red-600">
                                {error}
                            </div>
                            <button
                                onClick={fetchProducts}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Our Products
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover our carefully curated selection of premium SARMs from trusted sources
                    </p>
                    <div className="mt-8">
                        <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
                            <span className="text-yellow-400 font-bold text-lg mr-2">{products.length}</span>
                            <span className="text-gray-300">Products Available</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-gray-50 rounded-xl p-12">
                                <div className="text-gray-400 text-6xl mb-4">📦</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
                                <p className="text-gray-600">
                                    We're currently updating our inventory. Please check back soon!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Need Help Choosing?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Our experts are here to help you find the perfect products for your goals
                    </p>
                    <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                        Contact Us
                    </button>
                </div>
            </section>
        </div>
    );
} 