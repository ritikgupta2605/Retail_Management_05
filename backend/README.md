# Retail Sales Management System - Backend

## Overview
Backend API for the Retail Sales Management System with comprehensive search, filtering, sorting, and pagination capabilities for sales data management.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Processing**: csv-parser
- **CORS**: cors middleware

## Search Implementation Summary
Full-text case-insensitive search across Customer Name and Phone Number fields. The search function filters data by checking if the search term is contained within either field, maintaining performance while working alongside other filters.

## Filter Implementation Summary
Multi-select filtering implemented for Customer Region, Gender, Product Category, Tags, and Payment Method. Range-based filtering for Age (min/max) and Date (from/to). All filters work independently and in combination, maintaining state through query parameters.

## Sorting Implementation Summary
Three sorting options implemented: Date (newest first), Quantity (high to low), and Customer Name (A-Z). Sorting preserves active search and filter states by applying sort operations after filtering the dataset.

## Pagination Implementation Summary
Server-side pagination with 10 items per page. Maintains all active filters, search, and sort states across page navigation. Returns metadata including current page, total pages, and total records.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Data Setup
**Status**: ✅ CSV data file is loaded with **100,000 real records**

The `sales_data.csv` file is located in `backend/data/` directory. The system:
- Loads up to 100,000 records for optimal performance
- Your file contains 1,000,000+ records (limited for memory efficiency)
- Falls back to sample data if CSV is not found

### Running the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### API Endpoints

#### GET /api/sales
Retrieve sales data with optional filters

**Query Parameters:**
- `search`: Search term for customer name or phone
- `customerRegion`: Comma-separated regions
- `gender`: Comma-separated genders
- `ageMin`: Minimum age
- `ageMax`: Maximum age
- `productCategory`: Comma-separated categories
- `tags`: Comma-separated tags
- `paymentMethod`: Comma-separated payment methods
- `dateFrom`: Start date (YYYY-MM-DD)
- `dateTo`: End date (YYYY-MM-DD)
- `sortBy`: Sort field (date, quantity, customer-name)
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 10)

**Example:**
```
GET /api/sales?search=John&customerRegion=North,South&sortBy=date&page=1&pageSize=10
```

#### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```
