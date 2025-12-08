# Deployment Guide

## Backend Deployment

### Option 1: Render / Railway / Heroku

1. **Prepare for deployment**
   - Ensure `package.json` has correct start script
   - Add environment variable support

2. **Deploy to Render**
   - Connect GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables if needed

3. **Deploy to Railway**
   - Install Railway CLI: `npm i -g @railway/cli`
   - Login: `railway login`
   - Initialize: `railway init`
   - Deploy: `railway up`

### Option 2: VPS (DigitalOcean, AWS EC2, etc.)

```bash
# SSH into server
ssh user@your-server-ip

# Clone repository
git clone <your-repo-url>
cd assignment

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install dependencies
cd backend
npm install

# Start with PM2
pm2 start src/index.js --name retail-sales-backend
pm2 save
pm2 startup
```

### Option 3: Docker Deployment

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t retail-sales-backend ./backend
docker run -p 5000:5000 retail-sales-backend
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure environment**
   - Add `VITE_API_URL` environment variable with backend URL

### Option 2: Netlify

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Configure redirects**
   Create `frontend/public/_redirects`:
   ```
   /api/* https://your-backend-url.com/api/:splat 200
   /* /index.html 200
   ```

### Option 3: GitHub Pages

1. **Update `vite.config.js`**
   ```javascript
   export default defineConfig({
     base: '/repo-name/',
     // ... rest of config
   })
   ```

2. **Build and deploy**
   ```bash
   cd frontend
   npm run build
   npx gh-pages -d dist
   ```

### Option 4: Static Hosting (Any CDN)

```bash
cd frontend
npm run build
# Upload dist/ folder to your hosting provider
```

## Environment Variables

### Backend `.env`
```env
PORT=5000
NODE_ENV=production
```

### Frontend `.env.production`
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Post-Deployment Checklist

- [ ] Backend is accessible and returns data
- [ ] Frontend can connect to backend API
- [ ] CORS is configured correctly
- [ ] All features work (search, filter, sort, pagination)
- [ ] Responsive design works on mobile
- [ ] Error handling works properly
- [ ] Performance is acceptable
- [ ] SSL certificate is installed (HTTPS)

## Testing Deployment

### Test Backend
```bash
curl https://your-backend-url.com/health
curl https://your-backend-url.com/api/sales?page=1&pageSize=10
```

### Test Frontend
1. Open frontend URL in browser
2. Test search functionality
3. Test all filters
4. Test sorting options
5. Test pagination
6. Check responsive design on mobile

## Troubleshooting

### CORS Issues
- Update backend CORS configuration to allow frontend domain
- Add specific origin in production

### API Connection Issues
- Verify `VITE_API_URL` is set correctly
- Check network requests in browser DevTools
- Ensure backend is accessible from frontend

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version compatibility

## Monitoring

### Backend Monitoring
- Use PM2 for process management: `pm2 monit`
- Set up logging: `pm2 logs retail-sales-backend`
- Monitor errors and performance

### Frontend Monitoring
- Use browser console for errors
- Monitor API response times
- Track user interactions

## Cost Optimization

### Free Tier Options
- **Backend**: Render (Free tier), Railway (Free tier), Fly.io
- **Frontend**: Vercel (Free tier), Netlify (Free tier), GitHub Pages
- **Database** (if needed): MongoDB Atlas (Free tier)

### Estimated Costs
- Free tier: $0/month (with limitations)
- Basic hosting: $5-10/month
- Production-ready: $20-50/month
