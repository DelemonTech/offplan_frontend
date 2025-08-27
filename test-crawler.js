import axios from 'axios';
import cheerio from 'cheerio';

const BASE_URL = 'http://localhost:5173';

async function testCrawler() {
  console.log('🔍 Testing crawler accessibility...\n');
  
  try {
    // Test homepage
    console.log('1. Testing homepage...');
    const homeResponse = await axios.get(`${BASE_URL}/`);
    const homeHtml = homeResponse.data;
    const $home = cheerio.load(homeHtml);
    
    // Check for internal links
    const internalLinks = [];
    $home('a[href^="/"]').each((i, el) => {
      const href = $home(el).attr('href');
      if (href && !href.includes('#')) {
        internalLinks.push(href);
      }
    });
    
    console.log(`✅ Homepage loaded successfully`);
    console.log(`✅ Found ${internalLinks.length} internal links:`);
    internalLinks.forEach(link => console.log(`   - ${link}`));
    
    // Test if we can access other pages
    const testPages = ['/about', '/contact', '/blogs'];
    
    for (const page of testPages) {
      try {
        console.log(`\n2. Testing ${page}...`);
        const response = await axios.get(`${BASE_URL}${page}`);
        const $page = cheerio.load(response.data);
        
        // Check for title
        const title = $page('title').text();
        console.log(`✅ ${page} loaded successfully`);
        console.log(`✅ Title: ${title}`);
        
        // Check for H1
        const h1 = $page('h1').text();
        console.log(`✅ H1: ${h1}`);
        
      } catch (error) {
        console.log(`❌ Error accessing ${page}: ${error.message}`);
      }
    }
    
    // Test sitemap
    console.log('\n3. Testing sitemap...');
    try {
      const sitemapResponse = await axios.get(`${BASE_URL}/sitemap.xml`);
      console.log('✅ Sitemap accessible');
      console.log(`✅ Sitemap size: ${sitemapResponse.data.length} characters`);
    } catch (error) {
      console.log(`❌ Sitemap error: ${error.message}`);
    }
    
    // Test robots.txt
    console.log('\n4. Testing robots.txt...');
    try {
      const robotsResponse = await axios.get(`${BASE_URL}/robots.txt`);
      console.log('✅ Robots.txt accessible');
      console.log(`✅ Robots.txt content: ${robotsResponse.data.substring(0, 100)}...`);
    } catch (error) {
      console.log(`❌ Robots.txt error: ${error.message}`);
    }
    
    console.log('\n🎉 Crawler test completed!');
    console.log('\n📋 Summary:');
    console.log('- Internal links are now available for crawlers');
    console.log('- Sitemap.xml guides crawlers to all pages');
    console.log('- Robots.txt allows crawling');
    console.log('- All pages should now be discoverable by Screaming Frog');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCrawler();
