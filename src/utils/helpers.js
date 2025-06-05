// Format price to currency
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

// Generate slug from title
export const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Validate email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

// Format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Calculate discount price
export const calculateDiscountPrice = (originalPrice, discountPercent) => {
    const discount = (originalPrice * discountPercent) / 100;
    return originalPrice - discount;
};

// Get company by name
export const getCompanyByName = (companies, name) => {
    return companies.find(company =>
        company.name.toLowerCase() === name.toLowerCase()
    );
}; 