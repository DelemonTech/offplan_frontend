#!/usr/bin/env node

/**
 * Immediate Meta Tags Verification Script
 * Checks that meta tags are present in static HTML (before React loads)
 */

const fs = require('fs');
const path = require('path');

function checkStaticMetaTags() {
  console.log('🔍 Checking static meta tags in index.html...\n');

  const indexPath = path.join(__dirname, '..', 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found!');
    return false;
  }

  const html = fs.readFileSync(indexPath, 'utf8');

  const checks = [
    {
      name: 'Page Title',
      pattern: /<title[^>]*>([^<]+)<\/title>/,
      required: true,
      description: 'Visible in browser tab and search results'
    },
    {
      name: 'Meta Description',
      pattern: /<meta[^>]*name="description"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Snippet shown in search results'
    },
    {
      name: 'Canonical URL',
      pattern: /<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/,
      required: true,
      description: 'Prevents duplicate content issues'
    },
    {
      name: 'Open Graph Title',
      pattern: /<meta[^>]*property="og:title"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Used when sharing on Facebook, LinkedIn'
    },
    {
      name: 'Open Graph Description',
      pattern: /<meta[^>]*property="og:description"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Description for social media sharing'
    },
    {
      name: 'Open Graph Image',
      pattern: /<meta[^>]*property="og:image"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Preview image for social media sharing'
    },
    {
      name: 'Twitter Title',
      pattern: /<meta[^>]*name="twitter:title"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Used when sharing on Twitter'
    },
    {
      name: 'Twitter Description',
      pattern: /<meta[^>]*name="twitter:description"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Description for Twitter sharing'
    },
    {
      name: 'Twitter Image',
      pattern: /<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"[^>]*>/,
      required: true,
      description: 'Preview image for Twitter sharing'
    },
    {
      name: 'JSON-LD Structured Data',
      pattern: /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
      required: true,
      description: 'Rich snippets and enhanced search results'
    },
    {
      name: 'Geo Tags',
      pattern: /<meta[^>]*name="geo\.(region|placename|position)"[^>]*content="([^"]+)"[^>]*>/,
      required: false,
      description: 'Geographic targeting for local SEO'
    }
  ];

  let passedChecks = 0;
  let requiredPassed = 0;
  let requiredTotal = 0;

  console.log('📋 Meta Tags Verification Results:');
  console.log('==================================\n');

  checks.forEach(check => {
    const match = html.match(check.pattern);
    const passed = !!match;
    const status = passed ? '✅' : (check.required ? '❌' : '⚠️');
    const value = match ? (match[1] || match[2] || 'Present').substring(0, 60) + (match[1] && match[1].length > 60 ? '...' : '') : 'Not found';

    console.log(`${status} ${check.name}: ${value}`);
    console.log(`   ${check.description}\n`);

    if (passed) {
      passedChecks++;
      if (check.required) requiredPassed++;
    }
    if (check.required) requiredTotal++;
  });

  const overallScore = Math.round((passedChecks / checks.length) * 100);
  const requiredScore = Math.round((requiredPassed / requiredTotal) * 100);

  console.log('📊 Summary:');
  console.log(`   Overall: ${passedChecks}/${checks.length} (${overallScore}%)`);
  console.log(`   Required: ${requiredPassed}/${requiredTotal} (${requiredScore}%)`);

  if (requiredPassed === requiredTotal) {
    console.log('\n🎉 SUCCESS: All required meta tags are present!');
    console.log('   ✅ Search engines will see proper meta tags immediately');
    console.log('   ✅ Social media crawlers will get correct preview data');
    console.log('   ✅ Your Screaming Frog crawl should show no missing meta tags');
    return true;
  } else {
    console.log('\n⚠️  WARNING: Some required meta tags are missing!');
    console.log('   ❌ Search engines may not see proper meta tags immediately');
    console.log('   ❌ Social sharing may not work correctly');
    return false;
  }
}

function showTestingInstructions() {
  console.log('\n🧪 How to Test Manually:');
  console.log('========================');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Open your homepage in a browser');
  console.log('3. Right-click → View Page Source');
  console.log('4. Verify these tags are present in <head>:');
  console.log('   - <title> tag');
  console.log('   - <meta name="description">');
  console.log('   - <link rel="canonical">');
  console.log('   - <meta property="og:title">');
  console.log('   - <meta name="twitter:title">');
  console.log('   - <script type="application/ld+json">');
  console.log('');
  console.log('5. Test with curl (immediate HTML):');
  console.log('   curl -s http://localhost:5173 | head -30');
  console.log('');
  console.log('6. Use Screaming Frog SEO Spider on your live site');
  console.log('7. Test social sharing:');
  console.log('   - Facebook: https://developers.facebook.com/tools/debug/');
  console.log('   - Twitter: https://cards-dev.twitter.com/validator');
}

// Run the check
if (require.main === module) {
  console.log('🚀 Immediate Meta Tags Verification\n');
  console.log('===================================\n');

  const success = checkStaticMetaTags();
  showTestingInstructions();

  if (success) {
    console.log('\n🎯 Next Steps:');
    console.log('   1. Deploy to production');
    console.log('   2. Run Screaming Frog SEO Spider');
    console.log('   3. Test social media sharing');
    console.log('   4. Submit sitemap to Google Search Console');
  } else {
    console.log('\n🔧 Fix Required:');
    console.log('   - Add missing meta tags to index.html');
    console.log('   - Verify canonical URLs are correct');
    console.log('   - Test structured data with Google Rich Results Tool');
  }
}

module.exports = { checkStaticMetaTags, showTestingInstructions };
