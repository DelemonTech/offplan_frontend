// SEO Verification Script
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173'; // Your Vite dev server

async function checkSEO(url, pageName) {
  console.log(`\n🔍 Checking SEO for ${pageName} (${url})`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for React to hydrate
    await page.waitForTimeout(2000);
    
    // Check title
    const title = await page.title();
    console.log(`✅ Title: ${title}`);
    
    // Check meta description
    const metaDescription = await page.$eval('meta[name="description"]', el => el?.getAttribute('content') || 'Not found');
    console.log(`✅ Meta Description: ${metaDescription}`);
    
    // Check H1
    const h1Text = await page.$eval('h1', el => el?.textContent?.trim() || 'Not found');
    console.log(`✅ H1: ${h1Text}`);
    
    // Check canonical URL
    const canonical = await page.$eval('link[rel="canonical"]', el => el?.getAttribute('href') || 'Not found');
    console.log(`✅ Canonical: ${canonical}`);
    
    // Check Open Graph tags
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el?.getAttribute('content') || 'Not found');
    console.log(`✅ OG Title: ${ogTitle}`);
    
    const ogDescription = await page.$eval('meta[property="og:description"]', el => el?.getAttribute('content') || 'Not found');
    console.log(`✅ OG Description: ${ogDescription}`);
    
    // Check structured data
    const structuredData = await page.$eval('script[type="application/ld+json"]', el => {
      try {
        return JSON.parse(el.textContent);
      } catch {
        return 'Invalid JSON';
      }
    });
    console.log(`✅ Structured Data: ${structuredData['@type'] || 'Not found'}`);
    
    // Generate report
    const report = {
      url,
      pageName,
      title,
      metaDescription,
      h1Text,
      canonical,
      ogTitle,
      ogDescription,
      structuredData: structuredData['@type'] || 'Not found',
      timestamp: new Date().toISOString()
    };
    
    return report;
    
  } catch (error) {
    console.error(`❌ Error checking ${pageName}:`, error.message);
    return { url, pageName, error: error.message, timestamp: new Date().toISOString() };
  } finally {
    await browser.close();
  }
}

async function runSEOVerification() {
  console.log('🚀 Starting SEO Verification...');
  
  const pages = [
    { url: `${BASE_URL}/`, name: 'Homepage' },
    { url: `${BASE_URL}/blogs`, name: 'Blog Listing' },
    { url: `${BASE_URL}/about`, name: 'About Page' },
    { url: `${BASE_URL}/contact`, name: 'Contact Page' }
  ];
  
  const results = [];
  
  for (const page of pages) {
    const result = await checkSEO(page.url, page.name);
    results.push(result);
  }
  
  // Save results to file
  const reportPath = path.join(process.cwd(), 'seo-verification-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  
  console.log(`\n📊 SEO Verification Complete!`);
  console.log(`📄 Report saved to: ${reportPath}`);
  
  // Summary
  const successfulChecks = results.filter(r => !r.error).length;
  const totalChecks = results.length;
  
  console.log(`\n📈 Summary:`);
  console.log(`✅ Successful: ${successfulChecks}/${totalChecks}`);
  console.log(`❌ Failed: ${totalChecks - successfulChecks}/${totalChecks}`);
  
  if (successfulChecks === totalChecks) {
    console.log(`\n🎉 All SEO checks passed! Your site is ready for search engines.`);
  } else {
    console.log(`\n⚠️  Some SEO checks failed. Please review the report.`);
  }
}

// Run the verification
runSEOVerification().catch(console.error);
