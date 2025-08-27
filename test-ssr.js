import axios from 'axios';

async function testSSR() {
  try {
    console.log('Testing SSR implementation...');
    
    // Test the homepage
    const response = await axios.get('http://localhost:3000/');
    const html = response.data;
    
    // Check for title tag
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/);
    if (titleMatch) {
      console.log('✅ Title found:', titleMatch[1]);
    } else {
      console.log('❌ No title tag found');
    }
    
    // Check for meta description
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/);
    if (descMatch) {
      console.log('✅ Meta description found:', descMatch[1]);
    } else {
      console.log('❌ No meta description found');
    }
    
    // Check for H1 tag
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      console.log('✅ H1 tag found:', h1Match[1]);
    } else {
      console.log('❌ No H1 tag found');
    }
    
    // Check for Open Graph tags
    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/);
    if (ogTitleMatch) {
      console.log('✅ Open Graph title found:', ogTitleMatch[1]);
    } else {
      console.log('❌ No Open Graph title found');
    }
    
    console.log('\nSSR Test completed!');
    
  } catch (error) {
    console.error('Error testing SSR:', error.message);
  }
}

testSSR();
