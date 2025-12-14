import React from 'react';
import '../styles/StatsCards.css';

const StatsCards = ({ metrics }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Total units sold</span>
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="stat-value">{metrics.totalUnits.toLocaleString()}</div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Total Amount</span>
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="stat-value-group">
          <span className="stat-value">{formatCurrency(metrics.totalAmount)}</span>
          <span className="stat-subtext">({metrics.totalSRs?.toLocaleString() || 0} SRs)</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-title">Total Discount</span>
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="stat-value-group">
          <span className="stat-value">{formatCurrency(metrics.totalDiscount)}</span>
          <span className="stat-subtext">({metrics.totalUnits?.toLocaleString() || 0} SRs)</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
