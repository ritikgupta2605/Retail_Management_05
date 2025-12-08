# Testing Guide

## Manual Testing Checklist

### Search Functionality
- [ ] Search by customer name (case-insensitive)
- [ ] Search by phone number
- [ ] Search with partial matches
- [ ] Clear search functionality
- [ ] Search with active filters
- [ ] Search preserves pagination
- [ ] Empty search results display correctly

### Filter Functionality

#### Multi-Select Filters
- [ ] Filter by single region
- [ ] Filter by multiple regions
- [ ] Filter by gender
- [ ] Filter by product category
- [ ] Filter by tags
- [ ] Filter by payment method
- [ ] Combine multiple filters
- [ ] Clear individual filter
- [ ] Clear all filters

#### Range Filters
- [ ] Age minimum only
- [ ] Age maximum only
- [ ] Age range (min and max)
- [ ] Invalid age range (min > max)
- [ ] Date from only
- [ ] Date to only
- [ ] Date range (from and to)
- [ ] Invalid date range

### Sorting Functionality
- [ ] Sort by date (newest first)
- [ ] Sort by quantity (high to low)
- [ ] Sort by customer name (A-Z)
- [ ] Sorting with active search
- [ ] Sorting with active filters
- [ ] Sorting preserves pagination

### Pagination Functionality
- [ ] Navigate to next page
- [ ] Navigate to previous page
- [ ] Click on page number
- [ ] First page (Previous disabled)
- [ ] Last page (Next disabled)
- [ ] Page numbers display correctly
- [ ] Ellipsis for large page counts
- [ ] Pagination resets on filter change
- [ ] Pagination resets on search
- [ ] Results count displays correctly

### Edge Cases

#### No Results
- [ ] Search with no matches
- [ ] Filters with no matches
- [ ] Empty state displays properly

#### Invalid Inputs
- [ ] Negative age values
- [ ] Age values > 150
- [ ] Invalid date formats
- [ ] Special characters in search
- [ ] Very long search strings

#### Large Datasets
- [ ] Multiple filters combined
- [ ] All filters applied at once
- [ ] Quick filter changes
- [ ] Rapid search typing

### Responsive Design
- [ ] Desktop view (> 1024px)
- [ ] Tablet view (768px - 1024px)
- [ ] Mobile view (< 768px)
- [ ] Portrait orientation
- [ ] Landscape orientation
- [ ] Touch interactions work
- [ ] Collapsible filters on mobile

### Performance
- [ ] Search debouncing works (500ms)
- [ ] No unnecessary re-renders
- [ ] Smooth animations
- [ ] Fast page loads
- [ ] Quick filter applications

### UI/UX
- [ ] Loading states display
- [ ] Error messages are clear
- [ ] Buttons have hover states
- [ ] Active states are visible
- [ ] Colors are accessible
- [ ] Text is readable
- [ ] Icons are clear

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## API Testing

### Using cURL

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test basic sales endpoint
curl http://localhost:5000/api/sales

# Test with pagination
curl "http://localhost:5000/api/sales?page=1&pageSize=10"

# Test search
curl "http://localhost:5000/api/sales?search=John"

# Test single filter
curl "http://localhost:5000/api/sales?customerRegion=North"

# Test multiple filters
curl "http://localhost:5000/api/sales?customerRegion=North,South&gender=Male"

# Test age range
curl "http://localhost:5000/api/sales?ageMin=25&ageMax=50"

# Test date range
curl "http://localhost:5000/api/sales?dateFrom=2024-01-01&dateTo=2024-12-31"

# Test sorting
curl "http://localhost:5000/api/sales?sortBy=date"

# Test combined (search + filter + sort + pagination)
curl "http://localhost:5000/api/sales?search=Customer&customerRegion=North&sortBy=date&page=1&pageSize=10"
```

### Using Postman

1. **Import Collection**
   - Create a new collection "Retail Sales API"
   - Add requests for each endpoint

2. **Test Scenarios**
   - Save test cases for each feature
   - Create test suites
   - Run automated tests

### Expected Response Format

```json
{
  "success": true,
  "data": [
    {
      "customerId": "CUST0001",
      "customerName": "Customer 1",
      "phoneNumber": "+919876543210",
      "gender": "Male",
      "age": 30,
      "customerRegion": "North",
      "customerType": "Regular",
      "productId": "PROD0001",
      "productName": "Product 1",
      "brand": "Brand 1",
      "productCategory": "Electronics",
      "tags": "Premium",
      "quantity": 5,
      "pricePerUnit": 500,
      "discountPercentage": 10,
      "totalAmount": 2500,
      "finalAmount": 2250,
      "date": "2024-06-15",
      "paymentMethod": "Credit Card",
      "orderStatus": "Completed",
      "deliveryType": "Home Delivery",
      "storeId": "STORE001",
      "storeLocation": "Location 1",
      "salespersonId": "EMP0001",
      "employeeName": "Employee 1"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalRecords": 100,
    "totalPages": 10
  }
}
```

## Performance Testing

### Metrics to Monitor
- API response time (< 200ms ideal)
- Frontend load time (< 2s ideal)
- Time to interactive (< 3s ideal)
- Search debounce delay (500ms)
- Filter application speed (< 100ms)

### Tools
- Chrome DevTools (Network, Performance tabs)
- Lighthouse audit
- React DevTools Profiler

## Regression Testing

After any changes, verify:
1. All existing features still work
2. No new console errors
3. No visual regressions
4. Performance hasn't degraded
5. Responsive design still works

## Bug Reporting Template

When reporting bugs, include:
- **Title**: Clear, concise description
- **Steps to Reproduce**: Numbered list
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, screen size
- **Console Errors**: Any error messages

## Test Data

The system generates 100 sample records if no CSV is provided, covering:
- All regions (North, South, East, West, Central)
- All genders (Male, Female, Other)
- Ages 18-80
- All product categories
- All payment methods
- All order statuses
- Dates throughout 2024

## Automated Testing (Future Enhancement)

Consider adding:
- Unit tests (Jest)
- Integration tests (React Testing Library)
- E2E tests (Playwright, Cypress)
- API tests (Supertest)
