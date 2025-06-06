'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Dialog from '@/components/Dialog';
import ProductForm from '@/components/ProductForm';
import SupplierForm from '@/components/SupplierForm';
import { supabase } from '@/lib/supabase';
import { IoIosArrowForward } from 'react-icons/io';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Edit and Delete states
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch products on mount or when dialog closes
  useEffect(() => {
    if (!isProductDialogOpen && !isEditDialogOpen) fetchProducts();
  }, [isProductDialogOpen, isEditDialogOpen]);

  // Fetch suppliers on mount or when dialog closes
  useEffect(() => {
    if (!isSupplierDialogOpen) fetchSuppliers();
  }, [isSupplierDialogOpen]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase.from('products').select('*').order('product_name', { ascending: true });
    if (!error) setProducts(data || []);
    setLoadingProducts(false);
  };

  const fetchSuppliers = async () => {
    setLoadingSuppliers(true);
    const { data, error } = await supabase
      .from('suppliers')
      .select(`
        *,
        products (
          product_name
        )
      `)
      .order('name', { ascending: true });
    if (!error) setSuppliers(data || []);
    setLoadingSuppliers(false);
  };

  const handleLogout = () => {
    // Clear admin cookie
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  const handleProductSubmit = async (formData) => {
    try {
      // Save product to database
      const { name, description, category, couponCode, buyLink } = formData;
      const { error } = await supabase.from('products').insert([
        {
          product_name: name,
          description,
          category,
          coupon_code: couponCode,
          buy_link: buyLink,
        },
      ]);
      if (error) {
        alert('Failed to add product: ' + error.message);
        return;
      }
      setIsProductDialogOpen(false);
    } catch (err) {
      alert('Unexpected error: ' + err.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    try {
      const { name, description, category, couponCode, buyLink } = formData;
      const { error } = await supabase
        .from('products')
        .update({
          product_name: name,
          description,
          category,
          coupon_code: couponCode,
          buy_link: buyLink,
        })
        .eq('id', editingProduct.id);

      if (error) {
        alert('Failed to update product: ' + error.message);
        return;
      }

      setIsEditDialogOpen(false);
      setEditingProduct(null);
      setSelectedProduct(null);
    } catch (err) {
      alert('Unexpected error: ' + err.message);
    }
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id);

      if (error) {
        alert('Failed to delete product: ' + error.message);
        return;
      }

      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
      setSelectedProduct(null);
      fetchProducts(); // Refresh the list
    } catch (err) {
      alert('Unexpected error: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSupplierSubmit = async (formData) => {
    try {
      // Save supplier to database
      const { name, storeLink, country, productId } = formData;
      const { error } = await supabase.from('suppliers').insert([
        {
          name,
          store_link: storeLink,
          country: country,
          product_id: productId,
        },
      ]);
      if (error) {
        alert('Failed to add supplier: ' + error.message);
        return;
      }
      setIsSupplierDialogOpen(false);
    } catch (err) {
      alert('Unexpected error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Shop Hunt Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`${
                activeTab === 'products'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`${
                activeTab === 'suppliers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Suppliers
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'products' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <button
                  onClick={() => setIsProductDialogOpen(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Product
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                {loadingProducts ? (
                  <div className="text-gray-400 text-center py-8">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No products found.</div>
                ) : (
                      <div className="space-y-4">
                    {products.map((product, idx) => (
                      <div
                        key={product.id}
                        className={`bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 ${selectedProduct === product.id ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}`}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            {/* Product Main Info */}
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">{(product.category || 'SARM').toUpperCase().slice(0, 3)}</span>
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.product_name}</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                      {product.category || 'SARMs'}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                  >
                                    <IoIosArrowForward className={`text-xl transition-transform ${selectedProduct === product.id ? 'rotate-90' : ''}`} />
                                  </button>
                                </div>

                                {product.description && (
                                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{product.description}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-4">
                                  {/* Coupon Code */}
                                  {product.coupon_code ? (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500">Coupon:</span>
                                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                                        {product.coupon_code}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-400">No coupon code</span>
                                    </div>
                                  )}

                                  {/* Buy Link */}
                                  {product.buy_link ? (
                                    <a
                                      href={product.buy_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                    >
                                      <span>View Product</span>
                                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span className="text-sm text-gray-400">No buy link</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {selectedProduct === product.id && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Details */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Product Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Product ID:</span>
                                      <span className="text-gray-900 font-mono text-xs">{product.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Category:</span>
                                      <span className="text-gray-900">{product.category || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Coupon Code:</span>
                                      <span className="text-gray-900">{product.coupon_code || 'None'}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Actions</h4>
                                  <div className="space-y-2">
                                    <button
                                      onClick={() => handleEditProduct(product)}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                                    >
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                      </svg>
                                      Edit Product
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product)}
                                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                                    >
                                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      Delete Product
                                    </button>
                                    {product.buy_link && (
                                      <a
                                        href={product.buy_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center"
                                      >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Visit Product Page
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Full Buy Link */}
                              {product.buy_link && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Buy Link</h4>
                                  <div className="bg-gray-100 rounded-lg p-3">
                                    <code className="text-sm text-gray-700 break-all">{product.buy_link}</code>
                                  </div>
                                </div>
                              )}

                              {/* Full Description */}
                              {product.description && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Full Description</h4>
                                  <div className="bg-gray-100 rounded-lg p-3">
                                    <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                      </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Suppliers</h2>
                <button
                  onClick={() => setIsSupplierDialogOpen(true)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Add New Supplier
                </button>
              </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  {loadingSuppliers ? (
                    <div className="text-gray-400 text-center py-8">Loading suppliers...</div>
                  ) : suppliers.length === 0 ? (
                    <div className="text-gray-400 text-center py-8">No suppliers found.</div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {suppliers.map((supplier) => (
                        <li
                          key={supplier.id}
                          className="flex items-center px-6 py-6 bg-white hover:bg-gray-100 cursor-pointer transition-colors rounded-lg"
                          style={{ marginBottom: '2px' }}
                        >
                          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center mr-6">
                            <span className="text-white font-bold text-2xl">{supplier.country}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-lg font-semibold text-gray-900 mb-1">{supplier.name}</div>
                            <div className="text-gray-400 text-sm mb-1">
                              Product: {supplier.products?.product_name || 'N/A'}
                            </div>
                            <div className="text-indigo-600 text-sm hover:text-indigo-800">
                              <a href={supplier.store_link} target="_blank" rel="noopener noreferrer">
                                Visit Store →
                              </a>
                            </div>
                          </div>
                          <IoIosArrowForward className="text-gray-300 text-2xl ml-4" />
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Dialog */}
      <Dialog
        isOpen={isProductDialogOpen}
        onClose={() => setIsProductDialogOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleProductSubmit}
          onCancel={() => setIsProductDialogOpen(false)}
        />
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingProduct(null);
        }}
        title="Edit Product"
      >
        <ProductForm
          initialData={editingProduct ? {
            name: editingProduct.product_name,
            description: editingProduct.description || '',
            category: editingProduct.category || '',
            couponCode: editingProduct.coupon_code || '',
            buyLink: editingProduct.buy_link || ''
          } : null}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setIsEditDialogOpen(false);
            setEditingProduct(null);
          }}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setProductToDelete(null);
        }}
        title="Delete Product"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{productToDelete?.product_name}"? This action cannot be undone.
          </p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setProductToDelete(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Deleting...
                </>
              ) : (
                'Delete Product'
              )}
            </button>
          </div>
        </div>
      </Dialog>

      {/* Supplier Dialog */}
      <Dialog
        isOpen={isSupplierDialogOpen}
        onClose={() => setIsSupplierDialogOpen(false)}
        title="Add New Supplier"
      >
        <SupplierForm
          onSubmit={handleSupplierSubmit}
          onCancel={() => setIsSupplierDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
} 