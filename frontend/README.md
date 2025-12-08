# Retail Sales Management System - Frontend

## Overview
React-based frontend application for the Retail Sales Management System with advanced search, filtering, sorting, and pagination capabilities. Built with Vite for optimal performance.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3 with CSS Variables

## Search Implementation Summary
Debounced search input (500ms delay) for optimal performance. Sends search query to backend API which performs case-insensitive matching on Customer Name and Phone Number fields. Search state is maintained across all filter and sort operations.

## Filter Implementation Summary
Multi-select checkbox groups for categorical filters (Region, Gender, Category, Tags, Payment Method) and range inputs for Age and Date filters. Filter state is managed in the parent component and synchronized with backend via query parameters. All filters work independently and in combination.

## Sorting Implementation Summary
Dropdown select component with three sorting options: Date (Newest First), Quantity (High to Low), and Customer Name (A-Z). Sort preference is maintained across pagination and filtering. Backend handles actual sorting logic.

## Pagination Implementation Summary
Client-side pagination controls with server-side data fetching. Displays page numbers with ellipsis for large page counts. Previous/Next navigation buttons with proper disabled states. Automatically resets to page 1 when filters change.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Environment Configuration
Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application
```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will start on `http://localhost:3000`

## Project Structure
```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SalesTable.jsx
│   │   └── Pagination.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── styles/          # CSS stylesheets
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── SearchBar.css
│   │   ├── FilterPanel.css
│   │   ├── SalesTable.css
│   │   └── Pagination.css
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Features

### Search
- Real-time search with debouncing
- Case-insensitive matching
- Searches across customer name and phone number

### Filters
- Multi-select filters for:
  - Customer Region
  - Gender
  - Product Category
  - Tags
  - Payment Method
- Range filters for:
  - Age (Min/Max)
  - Date (From/To)
- Clear all filters functionality
- Collapsible filter panel

### Sorting
- Date (Newest First)
- Quantity (High to Low)
- Customer Name (A-Z)

### Pagination
- 10 items per page
- Previous/Next navigation
- Direct page number access
- Smart ellipsis for large page counts

### Responsive Design
- Mobile-friendly interface
- Responsive table with card layout on small screens
- Touch-friendly controls
