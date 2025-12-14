# Retail Sales Management System

## 1. Overview
A full-stack web application for managing and analyzing retail sales transactions. Features advanced search, multi-criteria filtering, sorting, and pagination capabilities with a responsive, modern user interface.

## 2. Tech Stack

### Backend
- Node.js with Express.js
- csv-parser for data processing
- CORS middleware

### Frontend
- React 18 with Vite
- Axios for API communication
- CSS3 with CSS Variables

### Database
- MongoDB (Atlas)

## 3. Search Implementation Summary
Full-text, case-insensitive search across Customer Name and Phone Number fields. Backend performs string matching using includes() method. Frontend implements debounced search input (500ms) to optimize API calls and improve performance.

## 4. Filter Implementation Summary
Multi-select filtering for Customer Region, Gender, Product Category, Tags, and Payment Method using checkbox groups. Range-based filtering for Age (min/max) and Date (from/to). All filters work independently and in combination, maintaining state through query parameters sent to the backend.

## 5. Sorting Implementation Summary
Three sorting options: Date (Newest First), Quantity (High to Low), and Customer Name (A-Z). Backend handles sorting logic using JavaScript's native sort() method with appropriate comparators. Frontend provides dropdown selector that preserves active search and filter states.

## 6. Pagination Implementation Summary
Server-side pagination with 10 items per page. Backend calculates page slices and returns metadata (current page, total pages, total records). Frontend renders page numbers with smart ellipsis for large page counts, provides Previous/Next navigation, and automatically resets to page 1 when filters change.

## 7. Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

i). **Clone or download the project**
   ```bash
   cd truestate
   ```

ii). **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

iii). **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```





