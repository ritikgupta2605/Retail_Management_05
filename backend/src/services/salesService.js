/**
 * Search sales data by customer name or phone number
 * Case-insensitive full-text search
 */
export const searchSalesData = (data, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return data;
  }

  const term = searchTerm.toLowerCase().trim();
  
  return data.filter(record => {
    const customerName = (record.customerName || '').toLowerCase();
    const phoneNumber = (record.phoneNumber || '').toLowerCase();
    
    return customerName.includes(term) || phoneNumber.includes(term);
  });
};

/**
 * Filter sales data based on multiple criteria
 * Supports multi-select and range-based filtering
 */
export const filterSalesData = (data, filters) => {
  let filtered = [...data];

  // Filter by customer region (multi-select)
  if (filters.customerRegion && filters.customerRegion.length > 0) {
    filtered = filtered.filter(record => 
      filters.customerRegion.includes(record.customerRegion)
    );
  }

  // Filter by gender (multi-select)
  if (filters.gender && filters.gender.length > 0) {
    filtered = filtered.filter(record => 
      filters.gender.includes(record.gender)
    );
  }

  // Filter by age range
  if (filters.ageMin !== null || filters.ageMax !== null) {
    filtered = filtered.filter(record => {
      const age = record.age;
      const meetsMin = filters.ageMin === null || age >= filters.ageMin;
      const meetsMax = filters.ageMax === null || age <= filters.ageMax;
      return meetsMin && meetsMax;
    });
  }

  // Filter by product category (multi-select)
  if (filters.productCategory && filters.productCategory.length > 0) {
    filtered = filtered.filter(record => 
      filters.productCategory.includes(record.productCategory)
    );
  }

  // Filter by tags (multi-select)
  // Tags in CSV are comma-separated (e.g., "organic,skincare")
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(record => {
      // Split the comma-separated tags from the record
      const recordTags = (record.tags || '').toLowerCase().split(',').map(tag => tag.trim());
      // Check if any of the filter tags match any of the record tags
      return filters.tags.some(filterTag => 
        recordTags.includes(filterTag.toLowerCase())
      );
    });
  }

  // Filter by payment method (multi-select)
  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    filtered = filtered.filter(record => 
      filters.paymentMethod.includes(record.paymentMethod)
    );
  }

  // Filter by date range
  if (filters.dateFrom || filters.dateTo) {
    filtered = filtered.filter(record => {
      const recordDate = new Date(record.date);
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

      const meetsFrom = !fromDate || recordDate >= fromDate;
      const meetsTo = !toDate || recordDate <= toDate;
      
      return meetsFrom && meetsTo;
    });
  }

  return filtered;
};

/**
 * Sort sales data by specified criteria
 * Supports: date (newest first), quantity, customer name (A-Z)
 */
export const sortSalesData = (data, sortBy) => {
  const sorted = [...data];

  switch (sortBy.toLowerCase()) {
    case 'date-desc':
    case 'date':
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    case 'quantity-desc':
    case 'quantity':
      return sorted.sort((a, b) => b.quantity - a.quantity);
    
    case 'quantity-asc':
      return sorted.sort((a, b) => a.quantity - b.quantity);
    
    case 'customer-name':
    case 'name':
    case 'customer-asc':
      return sorted.sort((a, b) => {
        const nameA = (a.customerName || '').toLowerCase();
        const nameB = (b.customerName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
    
    case 'customer-desc':
      return sorted.sort((a, b) => {
        const nameA = (a.customerName || '').toLowerCase();
        const nameB = (b.customerName || '').toLowerCase();
        return nameB.localeCompare(nameA);
      });
    
    default:
      return sorted;
  }
};

/**
 * Paginate sales data
 * Returns specified page of data with pagination metadata
 */
export const paginateSalesData = (data, page = 1, pageSize = 10) => {
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  
  // Validate page number
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalPages,
    totalRecords,
    currentPage
  };
};
