# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js (v16+) installed
- Terminal/Command Prompt access

### Step 1: Install Dependencies (2 minutes)

Open terminal and run:

```bash
cd "assignment ritikритik"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### Step 2: Start Backend (30 seconds)

In a new terminal:

```bash
cd backend
npm start
```

You should see:
```
CSV file not found. Using sample data.
Loaded 100 sales records
Server is running on port 5000
```

### Step 3: Start Frontend (30 seconds)

In another new terminal:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in XXXms
➜ Local: http://localhost:3000/
```

### Step 4: Open Application

Open your browser and go to: **http://localhost:3000**

## 🎯 Quick Feature Test

### Test Search
1. Type "Customer 5" in the search bar
2. See filtered results

### Test Filters
1. Click on "North" under Customer Region
2. Select "Male" under Gender
3. See combined results

### Test Sorting
1. Click the "Sort by" dropdown
2. Select "Date (Newest First)"
3. See sorted results

### Test Pagination
1. Click "Next" button
2. Click on page numbers
3. Navigate through pages

## 📊 Data Status

✅ **Your actual sales data is already loaded!**
- **100,000 real records** from your CSV file
- Located at: `backend/data/sales_data.csv`
- Limited from 1M+ records for performance
- All features work with your actual data

## 🛠️ Common Issues

### Port Already in Use
```bash
# Change port in backend/src/index.js
const PORT = 5001; // Use different port

# Update frontend proxy in vite.config.js
target: 'http://localhost:5001'
```

### Cannot Connect to Backend
- Check backend is running on port 5000
- Check no firewall blocking
- Verify `http://localhost:5000/health` works

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- Read full [README.md](../README.md)
- Check [Architecture Documentation](./architecture.md)
- Review [API Documentation](../backend/README.md)
- See [Deployment Guide](./DEPLOYMENT.md)

## 🎓 Learning Resources

### Frontend (React + Vite)
- Components: `frontend/src/components/`
- Styling: `frontend/src/styles/`
- API calls: `frontend/src/services/api.js`

### Backend (Node.js + Express)
- Routes: `backend/src/routes/`
- Controllers: `backend/src/controllers/`
- Business logic: `backend/src/services/`

## 💡 Tips

1. **Development Mode**: Use `npm run dev` for auto-reload
2. **Production Build**: Use `npm run build` for frontend
3. **Sample Data**: 100 records auto-generated if no CSV
4. **API Testing**: Use `http://localhost:5000/api/sales`
5. **Browser DevTools**: Check Network tab for API calls

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Application opens in browser
- [ ] Search works
- [ ] Filters work
- [ ] Sorting works
- [ ] Pagination works
- [ ] Responsive on mobile

## 🆘 Need Help?

- Check [TESTING.md](./TESTING.md) for test cases
- Review console for errors
- Check terminal output for messages
- Verify Node.js version: `node --version`

---

**Congratulations! 🎉**

Your Retail Sales Management System is now running!
