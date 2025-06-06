'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupplierForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    storeLink: '',
    country: '',
    productId: ''
  });
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('id, product_name');
    setProducts(data || []);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Supplier name is required';
    }

    if (!formData.storeLink.trim()) {
      newErrors.storeLink = 'Store link is required';
    } else {
      try {
        new URL(formData.storeLink);
      } catch {
        newErrors.storeLink = 'Please enter a valid URL';
      }
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country flag is required';
    }

    if (!formData.productId) {
      newErrors.productId = 'Please select a product';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500 ${errors.name
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-300 focus:border-indigo-500'
            }`}
          placeholder="Enter supplier name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
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
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500 ${errors.storeLink
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-300 focus:border-indigo-500'
            }`}
          placeholder="https://example.com"
        />
        {errors.storeLink && (
          <p className="mt-1 text-sm text-red-600">{errors.storeLink}</p>
        )}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country Flag (Emoji)
        </label>
        <input
          type="text"
          name="country"
          id="country"
          required
          value={formData.country}
          onChange={handleChange}
          placeholder="🇺🇸"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500 ${errors.country
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-300 focus:border-indigo-500'
            }`}
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-3 py-2 text-gray-900 placeholder-gray-500"
        />
        <div className={`max-h-40 overflow-y-auto border rounded-md bg-white ${errors.productId ? 'border-red-300' : 'border-gray-300'
          }`}>
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
                  className="mr-2 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-900">{product.product_name}</span>
              </label>
            ))
          )}
        </div>
        {errors.productId && (
          <p className="mt-1 text-sm text-red-600">{errors.productId}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Supplier'}
        </button>
      </div>
    </form>
  );
} 