import React from 'react';
import '../styles/SalesTable.css';

const SalesTable = ({ data, loading }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="sales-table-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading sales data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="sales-table-container">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3>No results found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sales-table-container">
      <div className="table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Customer name</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Product Category</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Customer region</th>
              <th>Product ID</th>
              <th>Employee name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={`${record.customerId}-${record.productId}-${index}`}>
                <td data-label="Transaction ID">{record.transactionId || '1234567'}</td>
                <td data-label="Date">{formatDate(record.date)}</td>
                <td data-label="Customer ID">{record.customerId}</td>
                <td data-label="Customer name">{record.customerName}</td>
                <td data-label="Phone Number">
                  {record.phoneNumber}
                </td>
                <td data-label="Gender">{record.gender}</td>
                <td data-label="Age">{record.age}</td>
                <td data-label="Product Category">{record.productCategory}</td>
                <td data-label="Quantity">{String(record.quantity).padStart(2, '0')}</td>
                <td data-label="Total Amount">{formatCurrency(record.finalAmount)}</td>
                <td data-label="Customer region">{record.customerRegion}</td>
                <td data-label="Product ID">{record.productId}</td>
                <td data-label="Employee name">{record.employeeName || 'Harsh Agrawal'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
