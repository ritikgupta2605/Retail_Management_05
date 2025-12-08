# Retail Sales Management System - Architecture Documentation

## System Overview
The Retail Sales Management System is a full-stack web application designed to manage and analyze retail sales transactions. It provides comprehensive search, filtering, sorting, and pagination capabilities for efficient data management.

## Technology Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Data Processing**: csv-parser
- **Middleware**: CORS

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3 with CSS Variables

## Architecture Pattern

### Backend Architecture

#### Layered Architecture
The backend follows a three-layer architecture pattern:

1. **Routes Layer** (`/routes`)
   - Defines API endpoints
   - Maps HTTP requests to controllers
   - Handles routing logic

2. **Controller Layer** (`/controllers`)
   - Receives requests from routes
   - Orchestrates business logic
   - Formats and sends responses
   - Handles error scenarios

3. **Service Layer** (`/services`)
   - Contains core business logic
   - Implements search, filter, sort, pagination algorithms
   - Data processing and transformation
   - No direct HTTP concerns

4. **Utility Layer** (`/utils`)
   - Helper functions
   - Validation utilities
   - Common operations

#### Data Flow (Backend)
```
CSV File → Data Service (Load & Parse)
                ↓
          In-Memory Storage
                ↓
    HTTP Request → Route → Controller
                ↓
          Service Layer
       (Search/Filter/Sort)
                ↓
          Pagination Service
                ↓
    JSON Response → Client
```

### Frontend Architecture

#### Component-Based Architecture
The frontend uses React's component-based architecture with unidirectional data flow:

1. **Container Component** (`App.jsx`)
   - Manages global state
   - Coordinates child components
   - Handles API communication
   - State management for filters, pagination, and data

2. **Presentation Components**
   - `SearchBar`: Search input with debouncing
   - `FilterPanel`: Multi-select and range filters
   - `SalesTable`: Data display with responsive design
   - `Pagination`: Page navigation controls

3. **Service Layer** (`/services`)
   - API communication
   - Request/response handling
   - Error management

#### Data Flow (Frontend)
```
User Input → Component State Update
      ↓
State Change in App.jsx
      ↓
API Request (with filters/search/sort/page)
      ↓
Backend Processing
      ↓
Response → State Update
      ↓
Re-render Components
```

## Module Responsibilities

### Backend Modules

#### `index.js`
- Application entry point
- Express server initialization
- Middleware configuration
- Route registration

#### `routes/salesRoutes.js`
- Define `/api/sales` endpoint
- Map GET request to controller

#### `controllers/salesController.js`
- Parse query parameters
- Call service layer functions
- Aggregate results
- Format API response
- Error handling

#### `services/dataService.js`
- Load CSV file
- Parse sales data
- Generate sample data (fallback)
- Data initialization

#### `services/salesService.js`
- **searchSalesData**: Full-text search implementation
- **filterSalesData**: Multi-criteria filtering
- **sortSalesData**: Sorting logic
- **paginateSalesData**: Pagination calculation

#### `utils/validators.js`
- Input validation
- Parameter sanitization
- Type checking

### Frontend Modules

#### `App.jsx`
- Root component
- State management (filters, pagination, data)
- API integration
- Component orchestration
- Effect handling for data fetching

#### `components/SearchBar.jsx`
- Search input UI
- Debounced input (500ms)
- Clear functionality
- Icon integration

#### `components/FilterPanel.jsx`
- Multi-select filters (checkboxes)
- Range inputs (age, date)
- Collapsible panel
- Clear all filters
- Active filter tracking

#### `components/SalesTable.jsx`
- Responsive table display
- Loading state
- Empty state
- Data formatting (currency, dates)
- Badge components for status

#### `components/Pagination.jsx`
- Page number display
- Previous/Next navigation
- Smart ellipsis rendering
- Disabled state handling

#### `services/api.js`
- Axios instance configuration
- API endpoint abstraction
- Query parameter construction
- Error handling

## Key Features Implementation

### 1. Search Implementation
**Backend (`salesService.js`)**:
```javascript
- Case-insensitive string matching
- Search across customerName and phoneNumber
- Filter function with includes() method
```

**Frontend (`SearchBar.jsx`)**:
```javascript
- Debounced input (useEffect with setTimeout)
- Real-time search state management
- Auto-submit after 500ms pause
```

### 2. Filter Implementation
**Backend (`salesService.js`)**:
```javascript
- Multi-select: Array inclusion check
- Range filters: Min/Max comparison
- Date range: Date object comparison
- Combined filter logic with AND operation
```

**Frontend (`FilterPanel.jsx`)**:
```javascript
- Checkbox groups for multi-select
- Number inputs for age range
- Date inputs for date range
- Array state management for selections
```

### 3. Sort Implementation
**Backend (`salesService.js`)**:
```javascript
- Date: Date object comparison (desc)
- Quantity: Numeric comparison (desc)
- Name: String localeCompare (asc)
- Switch statement for sort types
```

**Frontend (App.jsx)**:
```javascript
- Dropdown select
- Single sort option at a time
- Resets pagination on sort change
```

### 4. Pagination Implementation
**Backend (`salesService.js`)**:
```javascript
- Calculate total pages
- Slice array based on page and pageSize
- Return metadata (currentPage, totalPages, totalRecords)
```

**Frontend (`Pagination.jsx`)**:
```javascript
- Dynamic page number generation
- Ellipsis for large page counts
- Previous/Next button logic
- Disabled state for boundary pages
```

## API Specification

### GET /api/sales

**Query Parameters**:
- `search`: string (optional) - Search term
- `customerRegion`: string (optional) - Comma-separated regions
- `gender`: string (optional) - Comma-separated genders
- `ageMin`: number (optional) - Minimum age
- `ageMax`: number (optional) - Maximum age
- `productCategory`: string (optional) - Comma-separated categories
- `tags`: string (optional) - Comma-separated tags
- `paymentMethod`: string (optional) - Comma-separated payment methods
- `dateFrom`: string (optional) - Start date (YYYY-MM-DD)
- `dateTo`: string (optional) - End date (YYYY-MM-DD)
- `sortBy`: string (optional) - Sort field (date|quantity|customer-name)
- `page`: number (optional) - Page number (default: 1)
- `pageSize`: number (optional) - Items per page (default: 10)

**Response Format**:
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

## State Management

### Frontend State Structure
```javascript
{
  salesData: [],           // Current page data
  loading: false,          // Loading indicator
  error: null,             // Error message
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0
  },
  filters: {
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
  }
}
```

## Performance Optimizations

### Backend
- In-memory data storage for fast access
- Single-pass filtering algorithm
- Efficient array operations
- Early return on empty datasets

### Frontend
- Debounced search input (500ms)
- Conditional rendering
- CSS-based animations
- Minimal re-renders
- Lazy loading approach

## Error Handling

### Backend
- Try-catch blocks in controllers
- Graceful fallback to sample data
- HTTP status codes (500 for errors)
- Structured error responses

### Frontend
- Error state management
- User-friendly error messages
- Axios error handling
- Fallback UI for errors

## Responsive Design Strategy

### Mobile-First Approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly controls
- Collapsible sections

### Breakpoints
- Desktop: > 1024px (full table)
- Tablet: 768px - 1024px (adjusted table)
- Mobile: < 768px (card layout)

## Security Considerations

### Input Validation
- Query parameter validation
- Type checking
- Range validation (age, page numbers)
- String sanitization

### CORS Configuration
- Configured for cross-origin requests
- Can be restricted to specific domains

## Deployment Considerations

### Backend
- Environment variables for configuration
- Port configuration (default: 5000)
- CSV file path handling
- Error logging

### Frontend
- Environment-based API URL
- Production build optimization
- Static file serving
- Proxy configuration for development

## Future Enhancements

### Potential Improvements
1. Database integration (MongoDB/PostgreSQL)
2. User authentication and authorization
3. Export functionality (CSV, PDF)
4. Advanced analytics and charts
5. Real-time data updates
6. Caching layer (Redis)
7. API rate limiting
8. Unit and integration tests
9. Docker containerization
10. CI/CD pipeline

## Folder Structure

### Complete Project Structure
```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js
│   │   ├── services/
│   │   │   ├── dataService.js
│   │   │   └── salesService.js
│   │   ├── utils/
│   │   │   └── validators.js
│   │   ├── routes/
│   │   │   └── salesRoutes.js
│   │   └── index.js
│   ├── data/
│   │   └── sales_data.csv (optional)
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── SalesTable.jsx
│   │   │   └── Pagination.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── SearchBar.css
│   │   │   ├── FilterPanel.css
│   │   │   ├── SalesTable.css
│   │   │   └── Pagination.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```
