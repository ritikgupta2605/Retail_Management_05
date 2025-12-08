# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Issue: npm install fails
**Symptoms**: Error messages during npm install

**Solutions**:
```bash
# Solution 1: Clear npm cache
npm cache clean --force
npm install

# Solution 2: Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Solution 3: Check Node.js version
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

#### Issue: Permission denied during install
**Windows**:
```powershell
# Run PowerShell as Administrator
npm install
```

**Linux/Mac**:
```bash
# Don't use sudo - use nvm instead
# Or fix permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
```

---

### Backend Issues

#### Issue: Port 5000 already in use
**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Solution 1: Change port in backend/src/index.js
const PORT = process.env.PORT || 5001;

# Solution 2: Kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Solution 3: Kill process (Mac/Linux)
lsof -i :5000
kill -9 <PID>
```

#### Issue: CSV file not found
**Symptoms**: "CSV file not found. Using sample data."

**Solutions**:
1. This is expected behavior if no CSV file is provided
2. The system automatically generates 100 sample records
3. To use your own data:
   ```bash
   # Create data directory if it doesn't exist
   mkdir backend/data
   
   # Place your CSV file
   cp /path/to/sales_data.csv backend/data/
   
   # Restart backend
   npm start
   ```

#### Issue: Cannot connect to backend
**Symptoms**: Frontend shows connection errors

**Solutions**:
```bash
# Solution 1: Check backend is running
# Should see "Server is running on port 5000"
curl http://localhost:5000/health

# Solution 2: Check firewall
# Temporarily disable firewall and test

# Solution 3: Check CORS configuration
# Verify backend/src/index.js has cors() middleware
```

---

### Frontend Issues

#### Issue: Port 3000 already in use
**Error**: Port 3000 is already in use

**Solutions**:
```bash
# Solution 1: Vite will automatically use next available port
# Check terminal output for actual port

# Solution 2: Change port in vite.config.js
server: {
  port: 3001
}

# Solution 3: Kill process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Issue: API calls failing
**Symptoms**: Network errors, no data loading

**Solutions**:
```bash
# Solution 1: Check proxy in vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}

# Solution 2: Check backend is running
# Verify http://localhost:5000/health works

# Solution 3: Check environment variables
# Create frontend/.env with:
VITE_API_URL=http://localhost:5000/api

# Solution 4: Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

#### Issue: White screen / blank page
**Symptoms**: Frontend loads but shows nothing

**Solutions**:
```bash
# Solution 1: Check browser console for errors
# Open DevTools (F12) and check Console tab

# Solution 2: Check network requests
# Open DevTools → Network tab
# Look for failed requests (red)

# Solution 3: Rebuild
npm run build
npm run preview

# Solution 4: Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

### Search Issues

#### Issue: Search not working
**Symptoms**: Typing in search doesn't filter results

**Solutions**:
1. **Check debounce delay**: Wait 500ms after typing
2. **Check API call**: Open DevTools → Network → Look for /api/sales?search=...
3. **Check backend logs**: Should show incoming requests
4. **Clear search**: Click X button to reset
5. **Check case sensitivity**: Should be case-insensitive

#### Issue: Search too slow
**Symptoms**: Delay before seeing results

**Solutions**:
```javascript
// Adjust debounce delay in SearchBar.jsx
useEffect(() => {
  const timer = setTimeout(() => {
    onChange(searchTerm);
  }, 300); // Reduce from 500ms to 300ms
  
  return () => clearTimeout(timer);
}, [searchTerm]);
```

---

### Filter Issues

#### Issue: Filters not applying
**Symptoms**: Selecting filters doesn't change results

**Solutions**:
1. **Check network request**: DevTools → Network → Check query parameters
2. **Check backend logs**: Should show filter values
3. **Clear all filters**: Click "Clear All" button
4. **Check data types**: Age should be numbers, dates should be YYYY-MM-DD
5. **Refresh page**: F5 to reload

#### Issue: Age filter validation
**Symptoms**: Can't enter age values

**Solutions**:
```javascript
// Age should accept 0-150
// Min should be <= Max
// Check input type="number" attributes
```

#### Issue: Date filter not working
**Symptoms**: Date range doesn't filter correctly

**Solutions**:
```javascript
// Ensure date format is YYYY-MM-DD
// Example: 2024-01-01
// From date should be <= To date
```

---

### Pagination Issues

#### Issue: Pagination not working
**Symptoms**: Can't navigate pages

**Solutions**:
1. **Check total records**: Must have > 10 records
2. **Check page numbers**: Should show 1, 2, 3, etc.
3. **Check buttons**: Previous/Next should enable/disable correctly
4. **Check state**: Look in React DevTools for pagination state
5. **Check API response**: Should include pagination metadata

#### Issue: Page numbers wrong
**Symptoms**: Incorrect page count or numbers

**Solutions**:
```javascript
// Check totalPages calculation in backend
const totalPages = Math.ceil(totalRecords / pageSize);

// Verify in API response
{
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalRecords": 100,
    "totalPages": 10
  }
}
```

---

### Sorting Issues

#### Issue: Sort not working
**Symptoms**: Selecting sort doesn't change order

**Solutions**:
1. **Check dropdown value**: Should update on select
2. **Check API call**: DevTools → Network → Check sortBy parameter
3. **Check backend**: Verify sort logic in salesService.js
4. **Try different sorts**: Test all three options
5. **Clear and retry**: Set sort to "Default" then try again

---

### Responsive Design Issues

#### Issue: Mobile view broken
**Symptoms**: Layout doesn't work on mobile

**Solutions**:
```bash
# Solution 1: Check viewport meta tag in index.html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

# Solution 2: Test in browser DevTools
# Press F12 → Toggle device toolbar (Ctrl+Shift+M)

# Solution 3: Check CSS media queries
# Should have @media (max-width: 768px)

# Solution 4: Clear browser cache
# Hard refresh: Ctrl+Shift+R
```

---

### Performance Issues

#### Issue: Slow loading
**Symptoms**: Application takes long to load

**Solutions**:
```bash
# Solution 1: Check network speed
# Open DevTools → Network → Check download times

# Solution 2: Enable production build
cd frontend
npm run build
npm run preview

# Solution 3: Check data size
# Limit records in backend if testing with large dataset

# Solution 4: Check browser extensions
# Disable extensions and test again
```

#### Issue: High memory usage
**Symptoms**: Browser becomes slow

**Solutions**:
1. **Reduce page size**: Change from 10 to 5 items per page
2. **Clear browser cache**: Settings → Clear browsing data
3. **Close unused tabs**: Free up memory
4. **Restart browser**: Fresh start

---

### Development Issues

#### Issue: Hot reload not working
**Symptoms**: Changes don't reflect automatically

**Solutions**:
```bash
# Frontend (Vite)
# Solution 1: Check vite.config.js
# Solution 2: Restart dev server
npm run dev

# Backend (Nodemon)
# Solution 1: Check package.json has nodemon
# Solution 2: Use npm run dev instead of npm start
# Solution 3: Restart manually after changes
```

#### Issue: ESLint/Prettier errors
**Symptoms**: Linting errors shown

**Solutions**:
```bash
# These are warnings, not errors
# Can be safely ignored for this assignment
# Or install ESLint extension for auto-fix
```

---

### Deployment Issues

#### Issue: Build fails
**Symptoms**: npm run build shows errors

**Solutions**:
```bash
# Solution 1: Fix any TypeScript/JavaScript errors first
# Solution 2: Check dependencies are installed
npm install

# Solution 3: Clear cache and rebuild
rm -rf dist node_modules/.vite
npm install
npm run build

# Solution 4: Check Node.js version
node --version  # Should be v16+
```

#### Issue: Deployed app shows 404
**Symptoms**: Deployed URL shows "Not Found"

**Solutions**:
```bash
# Frontend (SPA)
# Solution 1: Add _redirects file (Netlify)
/* /index.html 200

# Solution 2: Configure vercel.json (Vercel)
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}

# Solution 3: Check build output directory
# Should be "dist" for Vite
```

#### Issue: API calls fail in production
**Symptoms**: Deployed frontend can't connect to backend

**Solutions**:
```bash
# Solution 1: Update API URL in frontend
# Create .env.production
VITE_API_URL=https://your-backend-url.com/api

# Solution 2: Check CORS in backend
# Add production frontend URL to CORS whitelist
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.com']
}));

# Solution 3: Verify backend is accessible
curl https://your-backend-url.com/health
```

---

### Data Issues

#### Issue: No data showing
**Symptoms**: Empty table, no records

**Solutions**:
1. **Check backend logs**: Should show "Loaded X records"
2. **Check sample data**: Should auto-generate 100 records
3. **Check API response**: DevTools → Network → Check response data
4. **Check filters**: Clear all filters
5. **Check search**: Clear search input

#### Issue: Wrong data format
**Symptoms**: Data looks incorrect or garbled

**Solutions**:
```bash
# Check CSV file format
# Should match expected columns:
# Customer ID, Customer Name, Phone Number, etc.

# Check CSV encoding
# Should be UTF-8

# Check for extra commas or quotes in CSV
```

---

### Browser-Specific Issues

#### Chrome
- Clear cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+Shift+R
- Check extensions: Disable and test

#### Firefox
- Clear cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+F5
- Check tracking protection: May block some requests

#### Safari
- Clear cache: Safari → Clear History
- Hard refresh: Cmd+Option+R
- Check cross-site tracking: May affect cookies

#### Edge
- Clear cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+F5
- Check compatibility mode: Disable if enabled

---

### Still Having Issues?

1. **Check logs**: Look at terminal output for both servers
2. **Check DevTools**: Browser console and network tabs
3. **Restart everything**: Stop both servers and restart
4. **Fresh install**: Delete node_modules in both folders and reinstall
5. **Check documentation**: Review README files
6. **Test API directly**: Use curl or Postman
7. **Verify file structure**: Compare with PROJECT_STRUCTURE.md
8. **Check Node.js version**: Must be v16 or higher

---

### Emergency Reset

If nothing works, try this complete reset:

```bash
# Stop all servers (Ctrl+C)

# Delete all dependencies
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf node_modules package-lock.json

# Reinstall everything
cd backend && npm install
cd ../frontend && npm install

# Restart servers
cd backend && npm start    # Terminal 1
cd frontend && npm run dev  # Terminal 2
```

---

## Getting Help

### Debug Checklist
- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API calls
- [ ] Data is loading in API response
- [ ] Node.js version is v16+
- [ ] All dependencies are installed
- [ ] No firewall blocking ports

### Useful Commands

```bash
# Check what's using a port (Windows)
netstat -ano | findstr :5000

# Check Node.js version
node --version

# Check npm version
npm --version

# Test backend directly
curl http://localhost:5000/health
curl http://localhost:5000/api/sales

# View backend logs
# Check terminal where backend is running

# Clear all npm caches
npm cache clean --force
```

### Contact Information

If you've tried everything and still have issues:
1. Check the assignment requirements again
2. Review all documentation in /docs
3. Compare your setup with the working version
4. Check GitHub issues (if available)

---

**Most issues can be solved by restarting the servers or clearing the cache!**
