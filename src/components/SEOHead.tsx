import { Helmet } from 'react-helmet-async';
import { useLayoutEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  robots?: string;
  keywords?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  articleTags?: string[];
}

export const SEOHead = ({
  title,
  description,
  image = '/favicon.ico',
  canonical,
  robots = 'index, follow',
  keywords,
  type = 'website',
  siteName = 'OffPlan Market',
  locale = 'en_US',
  author,
  publishedTime,
  modifiedTime,
  articleSection,
  articleTags,
}: SEOProps) => {
  const fullTitle = title.includes(siteName) ? title : `${title}`;
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
  const currentUrl = canonical || window.location.href;
  // No need for fullDescription since we're not modifying the description

  // Enhanced structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "name": fullTitle,
    "description": description,
    "url": currentUrl,
    "image": fullImageUrl,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": window.location.origin,
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/favicon.ico`
      }
    },
    ...(type === 'article' && {
      "author": {
        "@type": "Person",
        "name": author || siteName
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "articleSection": articleSection,
      "keywords": keywords,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      }
    }),
    ...(type === 'website' && {
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })
  };

  // Update document title immediately when component mounts
  // useLayoutEffect(() => {
  //   document.title = fullTitle;
  // }, [fullTitle]);

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    // console.log('SEOHead: Meta tags updated for', fullTitle);
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}
      {articleTags && articleTags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@offplanmarket" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="googlebot" content={robots} />
      <meta name="bingbot" content={robots} />
      <meta name="slurp" content={robots} />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
    </Helmet>
  );
};