import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import { fetchSalesData } from './services/api';
import './styles/App.css';

function App() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0
  });
  const [metrics, setMetrics] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
    totalSRs: 0
  });
  const [servicesOpen, setServicesOpen] = useState(false);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    customerRegion: [],
    gender: [],
    ageMin: '',
    ageMax: '',
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateFrom: '',
    dateTo: '',
    sortBy: ''
  });

  // Fetch data whenever filters or page changes
  useEffect(() => {
    loadData();
  }, [filters, pagination.currentPage]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchSalesData({
        ...filters,
        page: pagination.currentPage,
        pageSize: pagination.pageSize
      });

      if (response.success) {
        setSalesData(response.data);
        setPagination(prev => ({
          ...prev,
          totalRecords: response.pagination.totalRecords,
          totalPages: response.pagination.totalPages
        }));
        
        // Calculate metrics from current page data
        const totalUnits = response.data.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = response.data.reduce((sum, item) => sum + item.finalAmount, 0);
        const totalDiscount = response.data.reduce((sum, item) => sum + (item.originalAmount - item.finalAmount), 0);
        const totalSRs = response.pagination.totalRecords;
        
        setMetrics({ totalUnits, totalAmount, totalDiscount, totalSRs });
      }
    } catch (err) {
      setError('Failed to fetch sales data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      customerRegion: [],
      gender: [],
      ageMin: '',
      ageMax: '',
      productCategory: [],
      tags: [],
      paymentMethod: [],
      dateFrom: '',
      dateTo: '',
      sortBy: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">V</div>
            <span className="logo-text">Vault</span>
          </div>
          <div className="user-info">Anurag Yadav</div>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <span>Nexus</span>
          </a>
          <a href="#" className="nav-item">
            <span>Intake</span>
          </a>
          <div>
            <button 
              className="nav-item nav-item-dropdown" 
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Services</span>
              <span className={`nav-arrow ${servicesOpen ? 'open' : ''}`}>›</span>
            </button>
            {servicesOpen && (
              <div className="nav-submenu">
                <a href="#" className="nav-subitem">Service 1</a>
                <a href="#" className="nav-subitem">Service 2</a>
                <a href="#" className="nav-subitem">Service 3</a>
              </div>
            )}
          </div>
          <div>
            <button 
              className="nav-item nav-item-dropdown" 
              onClick={() => setInvoicesOpen(!invoicesOpen)}
            >
              <span>Invoices</span>
              <span className={`nav-arrow ${invoicesOpen ? 'open' : ''}`}>›</span>
            </button>
            {invoicesOpen && (
              <div className="nav-submenu">
                <a href="#" className="nav-subitem">Pre-active</a>
                <a href="#" className="nav-subitem">Active</a>
                <a href="#" className="nav-subitem">Blocked</a>
                <a href="#" className="nav-subitem">Closed</a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="app-header">
          <h1>Sales Management System</h1>
        </header>

        <main className="app-main">
          <div className="controls-section">
            <SearchBar 
              value={filters.search}
              onChange={handleSearchChange}
            />
            
            <FilterPanel 
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          {/* Metrics Cards */}
          <div className="metrics-cards">
            <div className="metric-card">
              <div className="metric-label">
                <span>Total units sold</span>
              </div>
              <div className="metric-value">{metrics.totalUnits}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">
                <span>Total Amount</span>
              </div>
              <div className="metric-value">₹{metrics.totalAmount.toLocaleString('en-IN')} ({metrics.totalSRs} SRs)</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">
                <span>Total Discount</span>
              </div>
              <div className="metric-value">₹{metrics.totalDiscount.toLocaleString('en-IN')} ({metrics.totalSRs} SRs)</div>
            </div>
          </div>

          <div className="content-section">
            <div className="content-header">
              <div className="sort-control">
                <label htmlFor="sort-select">Sort by: Customer Name (A-Z)</label>
                <select 
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="date">Date (Newest First)</option>
                  <option value="quantity">Quantity (High to Low)</option>
                  <option value="customer-name">Customer Name (A-Z)</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <SalesTable 
              data={salesData}
              loading={loading}
            />

            <Pagination 
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
