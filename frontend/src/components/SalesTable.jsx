import React from 'react';
import '../styles/SalesTable.css';

const SalesTable = ({ data, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format as in screenshot
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
              <tr key={`${record.transactionId}-${index}`}>
                <td>{record.transactionId || '1234567'}</td>
                <td>{formatDate(record.date)}</td>
                <td>{record.customerId}</td>
                <td>{record.customerName}</td>
                <td>
                  <div className="phone-cell">
                    {record.phoneNumber}
                    <span className="copy-icon" title="Copy">❐</span>
                  </div>
                </td>
                <td>{record.gender}</td>
                <td>{record.age}</td>
                <td>{record.productCategory}</td>
                <td>{String(record.quantity).padStart(2, '0')}</td>
                <td>₹ {record.totalAmount ? record.totalAmount.toLocaleString() : '0'}</td>
                <td>{record.customerRegion}</td>
                <td>{record.productId}</td>
                <td>{record.employeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
