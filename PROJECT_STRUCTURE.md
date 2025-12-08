# Project Structure

## Complete Folder Hierarchy

```
retail-sales-management-system/
│
├── 📁 backend/                           Backend API (Node.js + Express)
│   ├── 📁 src/                          Source code
│   │   ├── 📁 controllers/              Request handlers
│   │   │   └── salesController.js       Sales data controller
│   │   ├── 📁 services/                 Business logic
│   │   │   ├── dataService.js           Data loading service
│   │   │   └── salesService.js          Search, filter, sort, pagination
│   │   ├── 📁 utils/                    Helper utilities
│   │   │   └── validators.js            Input validation
│   │   ├── 📁 routes/                   API routes
│   │   │   └── salesRoutes.js           Sales endpoints
│   │   └── index.js                     Server entry point
│   ├── 📁 data/                         Data storage
│   │   └── sales_data.csv               (Optional) CSV data file
│   ├── 📁 node_modules/                 Dependencies
│   ├── .env.example                     Environment variables template
│   ├── package.json                     Backend dependencies
│   ├── package-lock.json                Dependency lock file
│   └── README.md                        Backend documentation
│
├── 📁 frontend/                          Frontend Application (React + Vite)
│   ├── 📁 src/                          Source code
│   │   ├── 📁 components/               React components
│   │   │   ├── SearchBar.jsx            Search input component
│   │   │   ├── FilterPanel.jsx          Filter controls
│   │   │   ├── SalesTable.jsx           Data table display
│   │   │   └── Pagination.jsx           Pagination controls
│   │   ├── 📁 services/                 API services
│   │   │   └── api.js                   HTTP client (Axios)
│   │   ├── 📁 styles/                   CSS stylesheets
│   │   │   ├── index.css                Global styles
│   │   │   ├── App.css                  App component styles
│   │   │   ├── SearchBar.css            Search bar styles
│   │   │   ├── FilterPanel.css          Filter panel styles
│   │   │   ├── SalesTable.css           Table styles
│   │   │   └── Pagination.css           Pagination styles
│   │   ├── App.jsx                      Main app component
│   │   └── main.jsx                     Application entry point
│   ├── 📁 public/                       Static assets
│   ├── 📁 node_modules/                 Dependencies
│   ├── .env.example                     Environment variables template
│   ├── index.html                       HTML template
│   ├── vite.config.js                   Vite configuration
│   ├── package.json                     Frontend dependencies
│   ├── package-lock.json                Dependency lock file
│   └── README.md                        Frontend documentation
│
├── 📁 docs/                             Documentation
│   ├── architecture.md                  System architecture
│   ├── QUICKSTART.md                    Quick start guide
│   ├── FEATURES.md                      Features overview
│   ├── TESTING.md                       Testing guide
│   ├── DEPLOYMENT.md                    Deployment guide
│   ├── CONTRIBUTING.md                  Contribution guidelines
│   └── SUBMISSION.md                    Assignment submission summary
│
├── 📁 node_modules/                     Root dependencies
├── .gitignore                           Git ignore rules
├── CHANGELOG.md                         Version history
├── LICENSE                              MIT License
├── package.json                         Monorepo configuration
├── package-lock.json                    Root dependency lock
├── README.md                            Main documentation
└── truestate_assignment.txt             Assignment requirements

```

## File Count Summary

### Backend
- **JavaScript Files**: 5
- **Configuration Files**: 2
- **Documentation**: 1
- **Total**: 8 files

### Frontend
- **JSX Files**: 5
- **CSS Files**: 6
- **Configuration Files**: 3
- **Documentation**: 1
- **Total**: 15 files

### Documentation
- **Markdown Files**: 7
- **Total**: 7 files

### Root Level
- **Configuration Files**: 4
- **Documentation**: 3
- **Total**: 7 files

### Grand Total
- **Source Files**: 10 (5 backend + 5 frontend)
- **Style Files**: 6 (CSS)
- **Config Files**: 9
- **Documentation**: 12 (README + docs)
- **Total Project Files**: 37+ files

## Key Directories

### `/backend/src/`
Contains all backend source code organized by responsibility:
- **controllers/**: Handle HTTP requests/responses
- **services/**: Business logic and data processing
- **utils/**: Helper functions and utilities
- **routes/**: API endpoint definitions

### `/frontend/src/`
Contains all frontend source code:
- **components/**: Reusable React components
- **services/**: API communication layer
- **styles/**: Component-specific CSS files

### `/docs/`
Comprehensive documentation:
- Architecture and design decisions
- Setup and deployment guides
- Feature descriptions
- Testing procedures
- Contribution guidelines

## Technology Mapping

```
Backend (Node.js)
├── Express.js      → Web framework
├── csv-parser      → Data loading
└── cors            → Cross-origin support

Frontend (React)
├── React 18        → UI framework
├── Vite            → Build tool
├── Axios           → HTTP client
└── CSS3            → Styling

Documentation
└── Markdown        → All documentation
```

## Data Flow

```
CSV File → Data Service → In-Memory Storage
                                ↓
User Input → React Component → API Request
                                ↓
                          Express Route
                                ↓
                          Controller
                                ↓
            Service Layer (Search/Filter/Sort/Paginate)
                                ↓
                          JSON Response
                                ↓
                      React Component Update
                                ↓
                          UI Re-render
```

## Module Dependencies

### Backend Dependencies
```
index.js
  └── routes/salesRoutes.js
        └── controllers/salesController.js
              ├── services/dataService.js
              ├── services/salesService.js
              └── utils/validators.js
```

### Frontend Dependencies
```
main.jsx
  └── App.jsx
        ├── components/SearchBar.jsx
        ├── components/FilterPanel.jsx
        ├── components/SalesTable.jsx
        ├── components/Pagination.jsx
        └── services/api.js
```

## Naming Conventions

### Files
- **React Components**: PascalCase (SearchBar.jsx)
- **Services**: camelCase (dataService.js)
- **Styles**: kebab-case matching component (SearchBar.css)
- **Documentation**: UPPERCASE.md or descriptive.md

### Code
- **Variables**: camelCase (salesData, currentPage)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL)
- **Functions**: camelCase (fetchSalesData, handleSearch)
- **Components**: PascalCase (SearchBar, FilterPanel)
- **CSS Classes**: kebab-case (search-bar, filter-panel)

## Lines of Code (Approximate)

### Backend
- Controllers: ~100 lines
- Services: ~250 lines
- Routes: ~10 lines
- Utils: ~50 lines
- **Total Backend**: ~410 lines

### Frontend
- Components: ~400 lines
- Services: ~50 lines
- Styles: ~800 lines
- **Total Frontend**: ~1,250 lines

### Documentation
- All docs: ~2,500 lines

### Grand Total
- **Total Project**: ~4,160+ lines

## Architecture Layers

```
Presentation Layer (Frontend)
  ├── React Components
  ├── CSS Styles
  └── User Interactions

API Layer
  ├── Express Routes
  ├── Controllers
  └── Request/Response Handling

Business Logic Layer
  ├── Search Service
  ├── Filter Service
  ├── Sort Service
  └── Pagination Service

Data Layer
  ├── Data Loading
  ├── In-Memory Storage
  └── CSV Parsing
```

## Deployment Structure

```
Production Deployment
├── Backend → Cloud Platform (Render/Railway/Heroku)
│   └── API Server (Port 5000)
├── Frontend → Static Hosting (Vercel/Netlify)
│   └── React App (Served as static files)
└── Connection → CORS + Environment Variables
```

## Development Workflow

```
Development
├── Terminal 1: npm run dev (Backend - Port 5000)
├── Terminal 2: npm run dev (Frontend - Port 3000)
└── Browser: http://localhost:3000

Production
├── Backend: npm start (Production server)
├── Frontend: npm run build → Deploy dist/
└── Environment: Configure API_URL
```
