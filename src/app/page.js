'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Dialog from '../components/Dialog';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productSuppliers, setProductSuppliers] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all products once on mount
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      setAllProducts(data || []);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products as the user types
    if (searchQuery.trim()) {
      setFilteredProducts(
        allProducts.filter(
          (p) =>
            p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setLoadingSuppliers(true);
    setShowProductModal(true);

    try {
      const { data } = await supabase
        .from('suppliers')
        .select('*')
        .eq('product_id', product.id)
        .order('name', { ascending: true });

      setProductSuppliers(data || []);
    } catch (error) {
      setProductSuppliers([]);
    } finally {
      setLoadingSuppliers(false);
      setFilteredProducts([]);
    }
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    setProductSuppliers([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchResults(filteredProducts);
    setShowSearchModal(true);
    setFilteredProducts([]);
  };

  return (
    <div>
      {/* Hero Section with Search Bar */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-yellow-900/20"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-400/5 rounded-full blur-lg"></div>

        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Search Container */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Find Your Perfect
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent"> Products</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Search through trusted sources and verified products
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for SARMs, companies, or products..."
                  className="w-full h-16 pl-6 pr-20 text-lg bg-white rounded-2xl shadow-xl border-2 border-transparent focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 placeholder-gray-500 text-gray-900"
                  disabled={isSearching}
                  autoComplete="off"
                />
                {/* Product Names Dropdown */}
                {searchQuery && filteredProducts.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto border border-gray-200">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="px-6 py-3 hover:bg-indigo-50 cursor-pointer text-left text-gray-900 font-semibold"
                      >
                        {product.product_name}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSearching ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Shop Hunt?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover premium products from verified suppliers with exclusive deals and transparent information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Suppliers</h3>
              <p className="text-gray-600">All suppliers are thoroughly vetted for quality and reliability.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Coupons</h3>
              <p className="text-gray-600">Get the best deals with verified coupon codes and special offers.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">Find exactly what you need with our powerful search functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-lg text-gray-600">Explore our wide range of product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">SARMs</h3>
              <p className="text-sm text-gray-600">Selective Androgen Receptor Modulators</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">PE</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Peptides</h3>
              <p className="text-sm text-gray-600">Research peptides and compounds</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">SU</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Supplements</h3>
              <p className="text-sm text-gray-600">Health and fitness supplements</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">AC</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Accessories</h3>
              <p className="text-sm text-gray-600">Tools and accessories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Verified Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-300">Trusted Suppliers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-300">Active Coupons</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Product?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers who trust Shop Hunt for their product needs.
          </p>
          <button
            onClick={() => document.querySelector('input[type="text"]').focus()}
            className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Searching Now
          </button>
        </div>
      </section>

      {/* Search Results Modal */}
      <Dialog
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        title={`Search Results (${searchResults.length})`}
      >
        <div className="max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.product_name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.description || `High-quality ${product.product_name}`}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {product.category || 'SARMs'}
                        </span>
                        {product.coupon_code && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Code: {product.coupon_code}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">Try searching with different keywords.</p>
            </div>
          )}
        </div>
      </Dialog>

      {/* Product Details with Suppliers Modal */}
      <Dialog
        isOpen={showProductModal}
        onClose={closeProductModal}
        title={selectedProduct?.product_name || 'Product Details'}
      >
        <div className="space-y-6">
          {/* Product Info */}
          {selectedProduct && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {(selectedProduct.category || 'SARM').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.product_name}</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.category || 'SARMs'}</p>
                </div>
              </div>
              {selectedProduct.description && (
                <p className="text-gray-700 text-sm mb-3">{selectedProduct.description}</p>
              )}
              {selectedProduct.coupon_code && (
                <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                  Coupon: {selectedProduct.coupon_code}
                </div>
              )}
            </div>
          )}

          {/* Suppliers List */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Suppliers</h4>

            {loadingSuppliers ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : productSuppliers.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {productSuppliers.map((supplier) => (
                  <div key={supplier.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{supplier.country}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{supplier.name}</h5>
                          <p className="text-sm text-gray-600">Supplier from {supplier.country}</p>
                        </div>
                      </div>
                      <a
                        href={supplier.store_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Visit Store
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Suppliers Available</h3>
                <p className="text-gray-600">This product doesn't have any suppliers listed yet.</p>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
