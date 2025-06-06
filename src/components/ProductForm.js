'use client';

import { useState } from 'react';

export default function ProductForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    couponCode: '',
    suppliers: []
  });
  const [categories, setCategories] = useState([
    'SARMs',
    'Peptides',
    'Supplements',
    'Accessories'
  ]);
  const [customCategory, setCustomCategory] = useState('');
  const [catError, setCatError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCategory = formData.category;
    if (finalCategory === 'Other') {
      const trimmed = customCategory.trim();
      if (!trimmed) {
        setCatError('Category name cannot be empty');
        return;
      }
      if (!categories.includes(trimmed)) {
        setCategories(prev => [...prev, trimmed]);
      }
      finalCategory = trimmed;
    }
    setCatError('');
    onSubmit({ ...formData, category: finalCategory });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows="3"
          required
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700">
          Coupon Code
        </label>
        <input
          type="text"
          name="couponCode"
          id="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          id="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {formData.category === 'Other' && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter new category"
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-3 py-2"
            />
            {catError && <div className="text-red-500 text-xs mt-1">{catError}</div>}
          </div>
        )}
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
          Add Product
        </button>
      </div>
    </form>
  );
} 