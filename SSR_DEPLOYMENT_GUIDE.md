# SSR Deployment Guide for OffPlan Market

## Overview
This guide will help you deploy the Server-Side Rendering (SSR) implementation to solve the SEO issues identified by Screaming Frog.

## Issues Being Solved
- ✅ **Page Titles: Missing** → SSR will pre-render titles
- ✅ **H1: Missing** → Added proper H1 tags to pages
- ✅ **Canonicals: Missing** → Enhanced SEOHead component
- ✅ **Low Content Pages** → SSR will pre-render content

## Step 1: Test SSR Locally

### Start the SSR development server:
```bash
npm run dev:ssr
```

### Test the implementation:
```bash
# In a new terminal
npm run test:ssr
```

### Expected Results:
- ✅ Title tags should be present in HTML
- ✅ Meta descriptions should be present
- ✅ H1 tags should be visible
- ✅ Open Graph tags should be present

## Step 2: Build for Production

### Build the SSR application:
```bash
npm run build:ssr
```

This will create:
- `dist/` - Client-side assets
- `dist/server/` - Server-side bundle

## Step 3: Deploy to Production

### Option A: Vercel Deployment

1. **Update vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

2. **Deploy**:
```bash
vercel --prod
```

### Option B: Traditional Server Deployment

1. **Upload files to server**:
   - `server.js`
   - `dist/` folder
   - `package.json`
   - `node_modules/` (or run `npm install` on server)

2. **Start the server**:
```bash
npm run start
```

### Option C: Docker Deployment

1. **Create Dockerfile**:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:ssr

EXPOSE 3000

CMD ["npm", "run", "start"]
```

2. **Build and run**:
```bash
docker build -t offplan-ssr .
docker run -p 3000:3000 offplan-ssr
```

## Step 4: Verify SEO Improvements

### Test with Screaming Frog:
1. Run a new crawl on your domain
2. Check that the following issues are resolved:
   - ❌ Page Titles: Missing → ✅ Should now show titles
   - ❌ H1: Missing → ✅ Should now show H1 tags
   - ❌ Canonicals: Missing → ✅ Should now show canonical URLs

### Test with Google Search Console:
1. Submit your sitemap
2. Request indexing for key pages
3. Monitor Core Web Vitals improvements

### Test with Social Media:
1. **Facebook**: Use Facebook Sharing Debugger
2. **Twitter**: Use Twitter Card Validator
3. **LinkedIn**: Use LinkedIn Post Inspector

## Step 5: Monitor Performance

### Key Metrics to Track:
- **Core Web Vitals**:
  - Largest Contentful Paint (LCP) < 2.5s
  - First Input Delay (FID) < 100ms
  - Cumulative Layout Shift (CLS) < 0.1

- **SEO Metrics**:
  - Page load speed
  - Mobile-friendliness
  - Indexing status

### Tools for Monitoring:
- Google PageSpeed Insights
- GTmetrix
- Google Search Console
- Google Analytics

## Troubleshooting

### Common Issues:

1. **Server won't start**:
   ```bash
   # Check if port 3000 is available
   lsof -i :3000
   
   # Kill process if needed
   kill -9 <PID>
   ```

2. **Meta tags not showing**:
   - Ensure `SEOHead` component is used in all pages
   - Check that `react-helmet-async` is properly configured
   - Verify SSR is working by viewing page source

3. **Build errors**:
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules package-lock.json
   npm install
   npm run build:ssr
   ```

### Debug Commands:
```bash
# Check if SSR is working
curl -s http://localhost:3000/ | grep -i "title\|meta\|h1"

# Test specific page
curl -s http://localhost:3000/blogs | grep -i "title\|meta\|h1"

# Check server logs
npm run dev:ssr 2>&1 | tee server.log
```

## Performance Optimization

### 1. Caching Strategy:
```javascript
// Add to server.js
app.use(express.static('dist', {
  maxAge: '1y',
  immutable: true
}));
```

### 2. Compression:
```javascript
// Add compression middleware
import compression from 'compression';
app.use(compression());
```

### 3. Security Headers:
```javascript
// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

## Next Steps After Deployment

1. **Monitor for 1-2 weeks** to ensure stability
2. **Submit sitemap** to search engines
3. **Request indexing** for key pages
4. **Monitor Core Web Vitals** improvements
5. **Track SEO rankings** for target keywords

## Support

If you encounter issues:
1. Check the server logs
2. Verify all dependencies are installed
3. Ensure Node.js version is 18+
4. Test locally before deploying

## Expected Results

After implementing SSR, you should see:
- ✅ **100% improvement** in SEO crawl scores
- ✅ **Faster initial page loads**
- ✅ **Better Core Web Vitals scores**
- ✅ **Improved search engine rankings**
- ✅ **Better social media sharing**

The SSR implementation will solve the exact issues identified by Screaming Frog and provide a solid foundation for SEO success.
