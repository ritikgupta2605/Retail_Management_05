# Retail Sales Management System

## Overview
A full-stack web application for managing and analyzing retail sales transactions. Features advanced search, multi-criteria filtering, sorting, and pagination capabilities with a responsive, modern user interface.

## Tech Stack

### Backend
- Node.js with Express.js
- csv-parser for data processing
- CORS middleware

### Frontend
- React 18 with Vite
- Axios for API communication
- CSS3 with CSS Variables

## Search Implementation Summary
Full-text, case-insensitive search across Customer Name and Phone Number fields. Backend performs string matching using includes() method. Frontend implements debounced search input (500ms) to optimize API calls and improve performance.

## Filter Implementation Summary
Multi-select filtering for Customer Region, Gender, Product Category, Tags, and Payment Method using checkbox groups. Range-based filtering for Age (min/max) and Date (from/to). All filters work independently and in combination, maintaining state through query parameters sent to the backend.

## Sorting Implementation Summary
Three sorting options: Date (Newest First), Quantity (High to Low), and Customer Name (A-Z). Backend handles sorting logic using JavaScript's native sort() method with appropriate comparators. Frontend provides dropdown selector that preserves active search and filter states.

## Pagination Implementation Summary
Server-side pagination with 10 items per page. Backend calculates page slices and returns metadata (current page, total pages, total records). Frontend renders page numbers with smart ellipsis for large page counts, provides Previous/Next navigation, and automatically resets to page 1 when filters change.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd truestate
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will start on `http://localhost:5000`

2. **Start the Frontend Application** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

### Data Setup

**Current Status**: ✅ **Real data loaded!**
- The system has loaded **100,000 records** from your actual CSV file
- Data file location: `backend/data/sales_data.csv`
- Note: Limited to 100k records for optimal performance (from 1M+ total records)

**Fallback**: If CSV is removed, the system automatically generates 100 sample records for testing

## Project Structure
```
root/
├── backend/              # Backend API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Helper functions
│   │   ├── routes/       # API routes
│   │   └── index.js      # Entry point
│   ├── data/             # CSV data files
│   ├── package.json
│   └── README.md
│
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── styles/       # CSS files
│   │   └── App.jsx       # Main component
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md   # Architecture documentation
│
└── README.md             # This file
```

## Features

### Search
- Real-time search with debouncing
- Case-insensitive matching
- Searches customer name and phone number

### Filters
- **Multi-Select**: Region, Gender, Category, Tags, Payment Method
- **Range**: Age (min/max), Date (from/to)
- Clear all filters functionality
- Collapsible filter panel

### Sorting
- Date (Newest First)
- Quantity (High to Low)
- Customer Name (A-Z)

### Pagination
- 10 items per page
- Previous/Next navigation
- Direct page access
- Smart page number display with ellipsis

### Responsive Design
- Desktop-optimized table view
- Mobile-friendly card layout
- Touch-friendly controls
- Fully responsive interface

## API Endpoints

### GET /api/sales
Retrieve sales data with optional filters

**Query Parameters**:
- `search`: Search term
- `customerRegion`: Comma-separated regions
- `gender`: Comma-separated genders
- `ageMin`, `ageMax`: Age range
- `productCategory`: Comma-separated categories
- `tags`: Comma-separated tags
- `paymentMethod`: Comma-separated payment methods
- `dateFrom`, `dateTo`: Date range (YYYY-MM-DD)
- `sortBy`: Sort field (date|quantity|customer-name)
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 10)

**Response**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalRecords": 100,
    "totalPages": 10
  }
}
```

### GET /health
Health check endpoint

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Production Build
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## Edge Cases Handled

- No search results (empty state displayed)
- Conflicting filters (no matching records)
- Invalid age ranges (validation applied)
- Invalid date ranges (validation applied)
- Large filter combinations (efficient processing)
- Missing optional fields (graceful handling)
- Empty dataset (appropriate messaging)
- Network errors (error state with retry)


