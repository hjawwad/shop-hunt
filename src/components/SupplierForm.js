'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupplierForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    storeLink: '',
    countryFlag: '',
    productId: ''
  });
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('id, product_name');
    setProducts(data || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProducts = products.filter(p =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Supplier Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="storeLink" className="block text-sm font-medium text-gray-700">
          Store Link
        </label>
        <input
          type="url"
          name="storeLink"
          id="storeLink"
          required
          value={formData.storeLink}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="countryFlag" className="block text-sm font-medium text-gray-700">
          Country Flag (Emoji)
        </label>
        <input
          type="text"
          name="countryFlag"
          id="countryFlag"
          required
          value={formData.countryFlag}
          onChange={handleChange}
          placeholder="🇺🇸"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-3 py-2"
        />
        <div className="max-h-40 overflow-y-auto border rounded-md bg-white">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 p-2 text-sm">No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <label key={product.id} className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  name="productId"
                  value={product.id}
                  checked={formData.productId === product.id}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>{product.product_name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Supplier
        </button>
      </div>
    </form>
  );
} 