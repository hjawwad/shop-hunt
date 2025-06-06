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
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products on mount or when dialog closes
  useEffect(() => {
    if (!isProductDialogOpen) fetchProducts();
  }, [isProductDialogOpen]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase.from('products').select('*').order('product_name', { ascending: true });
    if (!error) setProducts(data || []);
    setLoadingProducts(false);
  };

  const handleLogout = () => {
    // Clear admin cookie
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  const handleProductSubmit = async (formData) => {
    try {
      // Save product to database
      const { name, description, category, couponCode } = formData;
      const { error } = await supabase.from('products').insert([
        {
          product_name: name,
          description,
          category,
          coupon_code: couponCode,
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

  const handleSupplierSubmit = async (formData) => {
    try {
      // Save supplier to database
      const { name, storeLink, countryFlag, productId } = formData;
      const { error } = await supabase.from('suppliers').insert([
        {
          name,
          store_link: storeLink,
          country_flag: countryFlag,
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
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
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
              className={`$${
                activeTab === 'products'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`$${
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
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Add New Product
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                {loadingProducts ? (
                  <div className="text-gray-400 text-center py-8">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No products found.</div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {products.map((product, idx) => (
                      <li
                        key={product.id}
                        className={`flex items-center px-6 py-6 cursor-pointer transition-colors rounded-lg ${selectedProduct === product.id ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
                        onClick={() => setSelectedProduct(product.id)}
                        style={{ marginBottom: '2px' }}
                      >
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-black flex items-center justify-center mr-6">
                          <span className="text-white font-bold text-lg">{(product.category || 'SARM').toUpperCase().slice(0, 4)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-lg font-semibold text-gray-900 mb-1">{product.product_name}</div>
                          <div className="text-gray-400 text-sm">{product.category || 'SARM'}</div>
                        </div>
                        <IoIosArrowForward className="text-gray-300 text-2xl ml-4" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Suppliers</h2>
                <button
                  onClick={() => setIsSupplierDialogOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add New Supplier
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-500">Supplier list will be displayed here</p>
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