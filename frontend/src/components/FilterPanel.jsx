import React, { useState, useRef, useEffect } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, onChange, onClear }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const filterOptions = {
    customerRegion: ['North', 'South', 'East', 'West', 'Central'],
    gender: ['Male', 'Female', 'Other'],
    ageRange: ['0-18', '19-30', '31-50', '51+'],
    productCategory: ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'],
    tags: ['accessories', 'beauty', 'casual', 'cotton', 'fashion', 'formal', 'fragrance-free', 'gadgets', 'makeup', 'organic', 'portable', 'skincare', 'smart', 'unisex', 'wireless'],
    paymentMethod: ['Credit Card', 'Debit Card', 'Cash', 'UPI', 'Net Banking', 'Wallet'],
    date: ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom Range']
  };

  const handleMultiSelectChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onChange({ [filterName]: newValues });
  };

  const handleAgeRangeChange = (range) => {
    let min = null;
    let max = null;

    if (range === '0-18') { min = 0; max = 18; }
    else if (range === '19-30') { min = 19; max = 30; }
    else if (range === '31-50') { min = 31; max = 50; }
    else if (range === '51+') { min = 51; max = 100; }

    // If clicking the same range, clear it (toggle behavior)
    if (filters.ageMin === min && filters.ageMax === max) {
        onChange({ ageMin: null, ageMax: null });
    } else {
        onChange({ ageMin: min, ageMax: max });
    }
  };

  const isAgeRangeSelected = (range) => {
      let min = null;
      let max = null;
      if (range === '0-18') { min = 0; max = 18; }
      else if (range === '19-30') { min = 19; max = 30; }
      else if (range === '31-50') { min = 31; max = 50; }
      else if (range === '51+') { min = 51; max = 100; }
      
      return filters.ageMin === min && filters.ageMax === max;
  }

  const sortOptions = [
    { label: 'Date (Newest)', value: 'date_desc' },
    { label: 'Date (Oldest)', value: 'date_asc' },
    { label: 'Amount (High-Low)', value: 'amount_desc' },
    { label: 'Amount (Low-High)', value: 'amount_asc' },
    { label: 'Customer Name (A-Z)', value: 'name_asc' },
    { label: 'Customer Name (Z-A)', value: 'name_desc' },
  ];

  return (
    <div className="filter-panel" ref={dropdownRef}>
      <div className="filter-row">
        {/* Customer Region */}
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'customerRegion' ? 'active' : ''} ${filters.customerRegion.length > 0 ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('customerRegion')}
          >
            Customer Region <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'customerRegion' && (
            <div className="dropdown-menu">
              {filterOptions.customerRegion.map(region => (
                <label key={region} className="dropdown-item">
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
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'gender' ? 'active' : ''} ${filters.gender.length > 0 ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('gender')}
          >
            Gender <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'gender' && (
            <div className="dropdown-menu">
              {filterOptions.gender.map(gender => (
                <label key={gender} className="dropdown-item">
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
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'ageRange' ? 'active' : ''} ${(filters.ageMin !== null || filters.ageMax !== null) ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('ageRange')}
          >
            Age Range <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'ageRange' && (
            <div className="dropdown-menu">
              {filterOptions.ageRange.map(range => (
                <label key={range} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={isAgeRangeSelected(range)}
                    onChange={() => handleAgeRangeChange(range)}
                  />
                  <span>{range}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Product Category */}
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'productCategory' ? 'active' : ''} ${filters.productCategory.length > 0 ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('productCategory')}
          >
            Product Category <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'productCategory' && (
            <div className="dropdown-menu">
              {filterOptions.productCategory.map(category => (
                <label key={category} className="dropdown-item">
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
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'tags' ? 'active' : ''} ${filters.tags.length > 0 ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('tags')}
          >
            Tags <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'tags' && (
            <div className="dropdown-menu">
              {filterOptions.tags.map(tag => (
                <label key={tag} className="dropdown-item">
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
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'paymentMethod' ? 'active' : ''} ${filters.paymentMethod.length > 0 ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('paymentMethod')}
          >
            Payment Method <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'paymentMethod' && (
            <div className="dropdown-menu">
              {filterOptions.paymentMethod.map(method => (
                <label key={method} className="dropdown-item">
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

        {/* Date */}
        <div className="filter-dropdown-container">
          <button 
            className={`filter-button ${activeDropdown === 'date' ? 'active' : ''} ${(filters.dateFrom || filters.dateTo) ? 'has-value' : ''}`}
            onClick={() => toggleDropdown('date')}
          >
            Date <span className="arrow">▼</span>
          </button>
          {activeDropdown === 'date' && (
            <div className="dropdown-menu date-picker-menu">
              <div className="date-input-group">
                <label>From</label>
                <input 
                  type="date" 
                  value={filters.dateFrom} 
                  onChange={(e) => onChange({ dateFrom: e.target.value })}
                />
              </div>
              <div className="date-input-group">
                <label>To</label>
                <input 
                  type="date" 
                  value={filters.dateTo} 
                  onChange={(e) => onChange({ dateTo: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sort-container">
        <span className="sort-label">Sort by</span>
        <select 
          className="sort-select"
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value })}
        >
          <option value="">Select</option>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
