import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, onChange, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({
    customerRegion: false,
    gender: false,
    ageRange: false,
    productCategory: false,
    tags: false,
    paymentMethod: false,
    dateRange: false
  });

  const toggleDropdown = (filterName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const filterOptions = {
    customerRegion: ['North', 'South', 'East', 'West', 'Central'],
    gender: ['Male', 'Female', 'Other'],
    productCategory: ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'],
    tags: ['accessories', 'beauty', 'casual', 'cotton', 'fashion', 'formal', 'fragrance-free', 'gadgets', 'makeup', 'organic', 'portable', 'skincare', 'smart', 'unisex', 'wireless'],
    paymentMethod: ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking', 'Wallet']
  };

  const handleMultiSelectChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onChange({ [filterName]: newValues });
  };

  const handleInputChange = (filterName, value) => {
    onChange({ [filterName]: value });
  };

  const hasActiveFilters = () => {
    return filters.customerRegion.length > 0 ||
           filters.gender.length > 0 ||
           filters.productCategory.length > 0 ||
           filters.tags.length > 0 ||
           filters.paymentMethod.length > 0 ||
           filters.ageMin !== '' ||
           filters.ageMax !== '' ||
           filters.dateFrom !== '' ||
           filters.dateTo !== '';
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <div className="filter-header-actions">
          {hasActiveFilters() && (
            <button className="clear-filters-btn" onClick={onClear}>
              Clear All
            </button>
          )}
          <button 
            className="toggle-filters-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="filter-content">
          {/* Customer Region */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('customerRegion')}
            >
              <span>Customer Region</span>
              <span className={`dropdown-arrow ${openDropdowns.customerRegion ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.customerRegion && (
              <div className="filter-options">
                {filterOptions.customerRegion.map(region => (
                  <label key={region} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.customerRegion.includes(region)}
                      onChange={() => handleMultiSelectChange('customerRegion', region)}
                    />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('gender')}
            >
              <span>Gender</span>
              <span className={`dropdown-arrow ${openDropdowns.gender ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.gender && (
              <div className="filter-options">
                {filterOptions.gender.map(gender => (
                  <label key={gender} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(gender)}
                      onChange={() => handleMultiSelectChange('gender', gender)}
                    />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Age Range */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('ageRange')}
            >
              <span>Age Range</span>
              <span className={`dropdown-arrow ${openDropdowns.ageRange ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.ageRange && (
              <div className="range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.ageMin}
                  onChange={(e) => handleInputChange('ageMin', e.target.value)}
                  min="0"
                  max="150"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.ageMax}
                  onChange={(e) => handleInputChange('ageMax', e.target.value)}
                  min="0"
                  max="150"
                />
              </div>
            )}
          </div>

          {/* Product Category */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('productCategory')}
            >
              <span>Product Category</span>
              <span className={`dropdown-arrow ${openDropdowns.productCategory ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.productCategory && (
              <div className="filter-options">
                {filterOptions.productCategory.map(category => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.productCategory.includes(category)}
                      onChange={() => handleMultiSelectChange('productCategory', category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('tags')}
            >
              <span>Tags</span>
              <span className={`dropdown-arrow ${openDropdowns.tags ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.tags && (
              <div className="filter-options">
                {filterOptions.tags.map(tag => (
                  <label key={tag} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => handleMultiSelectChange('tags', tag)}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('paymentMethod')}
            >
              <span>Payment Method</span>
              <span className={`dropdown-arrow ${openDropdowns.paymentMethod ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.paymentMethod && (
              <div className="filter-options">
                {filterOptions.paymentMethod.map(method => (
                  <label key={method} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.paymentMethod.includes(method)}
                      onChange={() => handleMultiSelectChange('paymentMethod', method)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="filter-group">
            <button 
              className="filter-label-dropdown" 
              onClick={() => toggleDropdown('dateRange')}
            >
              <span>Date Range</span>
              <span className={`dropdown-arrow ${openDropdowns.dateRange ? 'open' : ''}`}>▼</span>
            </button>
            {openDropdowns.dateRange && (
              <div className="date-inputs">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                  placeholder="From"
                />
                <span>to</span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleInputChange('dateTo', e.target.value)}
                  placeholder="To"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
