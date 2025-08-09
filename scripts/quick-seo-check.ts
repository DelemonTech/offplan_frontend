// scripts/quick-seo-check.ts - Quick SEO verification
import fs from "fs";
import path from "path";

const quickSEOCheck = () => {
  console.log("🔍 Quick SEO Check for OffPlan Market\n");
  
  const srcDir = path.join(process.cwd(), 'src');
  const componentsToCheck = [
    'pages/HomePage.tsx',
    'components/Blog/BlogDetail.tsx', 
    'components/Blog/BlogListing.tsx',
    'pages/Agent/AgentPage.tsx',
    'components/Agent/PropertyDetails1.tsx',
    'components/Agent/PropertyDetails2.tsx',
    'components/Agent/PropertyDetailedPage.tsx',
    'components/Agent/UnitDetails1.tsx',
    'pages/Agent/UnitDetailPage.tsx'
  ];
  
  const results: Array<{file: string, hasTitle: boolean, hasDescription: boolean, hasSEOHead: boolean, issues: string[]}> = [];
  
  componentsToCheck.forEach(componentPath => {
    const fullPath = path.join(srcDir, componentPath);
    const issues: string[] = [];
    
    if (!fs.existsSync(fullPath)) {
      results.push({
        file: componentPath,
        hasTitle: false,
        hasDescription: false, 
        hasSEOHead: false,
        issues: ['❌ File not found']
      });
      return;
    }
    
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check for SEOHead usage
    const hasSEOHeadImport = content.includes('import { SEOHead }') || content.includes('import SEOHead');
    const hasSEOHeadUsage = content.includes('<SEOHead');
    const hasHelmet = content.includes('<Helmet') || content.includes('react-helmet');
    
    // Check for title and description
    const hasTitle = content.includes('title=') || content.includes('<title>') || hasHelmet;
    const hasDescription = content.includes('description=') || content.includes('name="description"') || hasHelmet;
    
    // Find specific SEO implementations
    const seoHeadMatch = content.match(/<SEOHead([^>]*)>/);
    const titleMatch = content.match(/title=["']([^"']+)["']/);
    const descriptionMatch = content.match(/description=["']([^"']+)["']/);
    
    if (!hasSEOHeadImport && !hasHelmet) {
      issues.push('❌ No SEOHead or Helmet import found');
    }
    
    if (!hasSEOHeadUsage && !hasHelmet) {
      issues.push('❌ No SEO component usage found');
    }
    
    if (!hasTitle) {
      issues.push('❌ No title prop found');
    }
    
    if (!hasDescription) {
      issues.push('❌ No description prop found');
    }
    
    if (titleMatch && titleMatch[1].length < 30) {
      issues.push('⚠️ Title may be too short');
    }
    
    if (titleMatch && titleMatch[1].length > 60) {
      issues.push('⚠️ Title may be too long');
    }
    
    if (descriptionMatch && descriptionMatch[1].length < 120) {
      issues.push('⚠️ Description may be too short');
    }
    
    if (descriptionMatch && descriptionMatch[1].length > 160) {
      issues.push('⚠️ Description may be too long');
    }
    
    if (issues.length === 0) {
      issues.push('✅ Looks good!');
    }
    
    results.push({
      file: componentPath,
      hasTitle,
      hasDescription,
      hasSEOHead: hasSEOHeadUsage || hasHelmet,
      issues
    });
  });
  
  // Display results
  console.log('📋 SEO Implementation Check Results:');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    const status = result.issues.some(i => i.includes('❌')) ? '❌' : 
                   result.issues.some(i => i.includes('⚠️')) ? '⚠️' : '✅';
    
    console.log(`\n${status} ${result.file}`);
    console.log(`   SEO Component: ${result.hasSEOHead ? '✅' : '❌'}`);
    console.log(`   Title: ${result.hasTitle ? '✅' : '❌'}`);
    console.log(`   Description: ${result.hasDescription ? '✅' : '❌'}`);
    
    result.issues.forEach(issue => {
      console.log(`   ${issue}`);
    });
  });
  
  // Summary
  const goodCount = results.filter(r => r.issues.every(i => i.includes('✅'))).length;
  const issueCount = results.length - goodCount;
  
  console.log('\n📊 Summary:');
  console.log('='.repeat(30));
  console.log(`✅ Files with good SEO: ${goodCount}/${results.length}`);
  console.log(`⚠️ Files with issues: ${issueCount}/${results.length}`);
  
  // Recommendations
  console.log('\n💡 Quick Fixes:');
  console.log('='.repeat(30));
  console.log('1. Import SEOHead: import { SEOHead } from "@/components/SEOHead";');
  console.log('2. Add to JSX: <SEOHead title="Page Title" description="Page description" />');
  console.log('3. Make titles 30-60 characters');
  console.log('4. Make descriptions 120-160 characters');
  console.log('5. Use unique, descriptive content for each page');
  
  // Generate quick fix template
  console.log('\n🔧 Template for adding SEO:');
  console.log('='.repeat(40));
  console.log(`
// Add to imports:
import { SEOHead } from '@/components/SEOHead';

// Add at top of component return:
<SEOHead 
  title="Your Page Title (30-60 chars)"
  description="Your page description that encourages clicks and includes keywords (120-160 chars)"
  image="/path/to/image.jpg" // optional
/>
  `);
};

quickSEOCheck();