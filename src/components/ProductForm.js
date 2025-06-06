'use client';

import { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    couponCode: '',
    buyLink: '',
    suppliers: []
  });
  const [categories, setCategories] = useState([
    'SARMs',
    'Peptides',
    'Supplements',
    'Accessories'
  ]);
  const [customCategory, setCustomCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || '',
        couponCode: initialData.couponCode || '',
        buyLink: initialData.buyLink || '',
        suppliers: []
      });

      // If category is not in the predefined list, it's a custom category
      if (initialData.category && !categories.includes(initialData.category)) {
        setCategories(prev => [...prev, initialData.category]);
      }
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.category === 'Other' && !customCategory.trim()) {
      newErrors.customCategory = 'Category name cannot be empty';
    }

    // Validate buy link if provided (optional field but should be valid URL if provided)
    if (formData.buyLink.trim() && !isValidUrl(formData.buyLink.trim())) {
      newErrors.buyLink = 'Please enter a valid URL (e.g., https://example.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let finalCategory = formData.category;
    if (finalCategory === 'Other') {
      const trimmed = customCategory.trim();
      if (!categories.includes(trimmed)) {
        setCategories(prev => [...prev, trimmed]);
      }
      finalCategory = trimmed;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ ...formData, category: finalCategory });
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

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);

    // Clear error when user starts typing
    if (errors.customCategory) {
      setErrors(prev => ({
        ...prev,
        customCategory: ''
      }));
    }
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
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500 ${errors.name
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-300 focus:border-indigo-500'
            }`}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
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
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500 ${errors.description
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-300 focus:border-indigo-500'
            }`}
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500"
          placeholder="Enter coupon code (optional)"
        />
      </div>

      <div>
        <label htmlFor="buyLink" className="block text-sm font-medium text-gray-700">
          Buy Link
        </label>
        <input
          type="url"
          name="buyLink"
          id="buyLink"
          value={formData.buyLink}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 placeholder-gray-500 ${errors.buyLink
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-300 focus:border-indigo-500'
            }`}
          placeholder="https://yourstore.com/product-link (optional)"
        />
        {errors.buyLink && (
          <p className="mt-1 text-sm text-red-600">{errors.buyLink}</p>
        )}
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
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-4 py-3 text-gray-900 ${errors.category
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-300 focus:border-indigo-500'
            }`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
        {formData.category === 'Other' && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter new category"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 sm:text-base px-3 py-2 text-gray-900 placeholder-gray-500 ${errors.customCategory
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-300 focus:border-indigo-500'
                }`}
            />
            {errors.customCategory && (
              <p className="mt-1 text-sm text-red-600">{errors.customCategory}</p>
            )}
          </div>
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
          {isSubmitting ? 'Saving...' : (initialData ? 'Update Product' : 'Add Product')}
        </button>
      </div>
    </form>
  );
} 