import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
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

  const [filters, setFilters] = useState({
    search: '',
    customerRegion: [],
    gender: [],
    ageMin: null,
    ageMax: null,
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
        if (response.metrics) {
          setMetrics({
            totalUnits: response.metrics.totalUnits,
            totalAmount: response.metrics.totalAmount,
            totalDiscount: response.metrics.totalDiscount,
            totalSRs: response.pagination.totalRecords // Use total records as SRs count
          });
        }
      }
    } catch (err) {
      setError('Failed to fetch sales data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div className="app">
      <Sidebar />
      
      <div className="main-wrapper">
        <header className="app-header">
          <h1>Sales Management System</h1>
          <div className="header-search">
            <input 
              type="text" 
              placeholder="🔍 Name, Phone..." 
              value={filters.search}
              onChange={handleSearchChange}
              className="header-search-input"
            />
          </div>
        </header>

        <div className="content-container">
          <FilterPanel 
            filters={filters} 
            onChange={handleFilterChange} 
          />
          
          <StatsCards metrics={metrics} />
          
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
      </div>
    </div>
  );
}

export default App;
