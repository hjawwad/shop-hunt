'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);

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

            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (code, productId) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(productId);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-8">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-3"></div>
                            <span className="text-gray-600">Loading products...</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="animate-pulse flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                                            <div className="h-3 bg-gray-100 rounded w-32"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                                        <div className="h-10 bg-gray-200 rounded w-32"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md mx-auto text-center">
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-red-100">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Products</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={fetchProducts}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
                            <p className="text-gray-600">Discover our premium selection of SARMs and supplements</p>
                        </div>
                        <div className="bg-indigo-50 px-4 py-2 rounded-full">
                            <span className="text-sm font-medium text-indigo-700">
                                {products.length} Products
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products List */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {products.length > 0 ? (
                    <div className="space-y-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200"
                                >
                                    <div className="flex items-center justify-between">
                                        {/* Product Info */}
                                        <div className="flex items-center space-x-6">
                                            {/* Product Icon */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">
                                                    {(product.category || 'SARM').toUpperCase().slice(0, 2)}
                                                </span>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                    {product.product_name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {product.description || `High-quality ${product.product_name}`}
                                                </p>
                                                <div className="flex items-center space-x-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                        {product.category || 'SARMs'}
                                                    </span>
                                                    {product.price && (
                                                        <span className="text-lg font-bold text-green-600">
                                                            ${product.price}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center space-x-4">
                                            {/* Coupon Code */}
                                            {product.coupon_code && (
                                                <div className="flex items-center space-x-2">
                                                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                                                        {product.coupon_code}
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(product.coupon_code, product.id)}
                                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Copy coupon code"
                                                    >
                                                        {copiedCode === product.id ? (
                                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            )}

                                            {/* View Product Button */}
                                            <a
                                                href={product.buy_link || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
                                            >
                                                <span>View Product</span>
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
                                <p className="text-gray-600">
                                    We're currently updating our inventory. Please check back soon!
                                </p>
                            </div>
                        </div>
                    )}
            </div>

            {/* Copy Success Toast */}
            {copiedCode && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Coupon code copied!</span>
                    </div>
                </div>
            )}
        </div>
    );
} 