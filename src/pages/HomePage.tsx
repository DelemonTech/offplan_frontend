import React, { useEffect } from "react";
import Header from "@/components/others/HomeHeader";
import HeroSection from "@/components/others/HomeHeroSection";
import TrustedDevelopers from "@/components/others/HomeTrustedDevelopers";
import WhyTrustUs from "@/components/others/HomeWhyTrustUs";
import ProjectSearchTool from "@/components/others/HomeProjectSearchTool";
import TopRatedAgents from "@/components/others/HomeTopRatedAgents";
import HowItWorks from "@/components/others/HomeHowItWorks";
import AgentRecruitment from "@/components/others/HomeAgentRecruitment";
import Footer from "@/components/Agent/Footer";
import { SEOHead } from "@/components/SEOHead";

const HomePage = () => {
  useEffect(() => {
    // Signal to prerender that the page is ready
    const markPageReady = () => {
      // Add multiple markers for prerender detection
      document.body.setAttribute('data-react-ready', 'true');
      document.body.setAttribute('data-homepage-loaded', 'true');
      
      // Create a custom event for prerender detection
      const event = new CustomEvent('pageReady', {
        detail: { component: 'HomePage', timestamp: Date.now() }
      });
      window.dispatchEvent(event);

      // Log for debugging
      console.log('HomePage: Component mounted and ready for prerender');
    };

    // Mark ready immediately and after a short delay
    markPageReady();
    const timer = setTimeout(markPageReady, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background" data-component="homepage">
      {/* Enhanced SEO Head with comprehensive meta tags */}
      <SEOHead
        title="OffPlan Market - Premium Off-Plan Properties in UAE"
        description="Discover premium off-plan properties in Dubai and UAE. Connect with top real estate agents and find your dream home with OffPlan Market's property listings."
        keywords="off-plan properties UAE, Dubai real estate, property investment, luxury homes Dubai, real estate agents UAE, new developments Dubai, off-plan apartments, Dubai properties for sale, UAE property market, real estate investment Dubai"
        canonical="https://offplan.market/"
        type="website"
        image="https://offplan.market/lovable-uploads/93c61de1-b334-4926-a59a-2934c6cb5135.png"
      />

      {/* SEO-friendly H1 tag - moved to top for better SEO */}
      <div className="sr-only">
        <h1>OffPlan Market - Premium Off-Plan Properties in UAE and Dubai</h1>
        <p>
          Discover the best off-plan properties in Dubai and across the UAE. 
          Our platform connects you with trusted real estate agents and premier 
          developments, making your property investment journey seamless and successful.
        </p>
      </div>

      {/* Visible H1 for users */}
      {/* <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Off-Plan Properties in UAE
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto px-4">
          Your gateway to premium real estate investments and luxury living
        </p>
      </div> */}

      {/* Main content sections */}
      <Header />
      <main role="main">
        <HeroSection />
        <TrustedDevelopers />
        <WhyTrustUs />
        <ProjectSearchTool />
        <TopRatedAgents />
        <HowItWorks />
        <AgentRecruitment />
      </main>
      <Footer />

      {/* Additional structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://offplan.market/#website",
                "url": "https://offplan.market/",
                "name": "OffPlan Market",
                "description": "Premium off-plan properties in UAE and Dubai",
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://offplan.market/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ],
                "inLanguage": "en-US"
              },
              {
                "@type": "Organization",
                "@id": "https://offplan.market/#organization",
                "name": "OffPlan Market",
                "url": "https://offplan.market/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://offplan.market/lovable-uploads/93c61de1-b334-4926-a59a-2934c6cb5135.png"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "Customer Service",
                  "availableLanguage": ["en", "ar"]
                },
                "sameAs": [
                  "https://www.linkedin.com/company/offplan-market",
                  "https://www.facebook.com/offplanmarket"
                ]
              },
              {
                "@type": "WebPage",
                "@id": "https://offplan.market/#webpage",
                "url": "https://offplan.market/",
                "name": "OffPlan Market - Premium Off-Plan Properties in UAE",
                "isPartOf": {
                  "@id": "https://offplan.market/#website"
                },
                "about": {
                  "@id": "https://offplan.market/#organization"
                },
                "description": "Discover premium off-plan properties in Dubai and UAE. Connect with top real estate agents and explore luxury developments.",
                "inLanguage": "en-US"
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://offplan.market/"
                  }
                ]
              }
            ]
          })
        }}
      />

      {/* Prerender detection script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced prerender detection
            (function() {
              // Mark page as fully loaded
              if (typeof window !== 'undefined') {
                window.prerenderReady = true;
                document.body.setAttribute('data-prerender-ready', 'true');
                
                // Dispatch ready event
                if (document.createEvent) {
                  var event = document.createEvent('Event');
                  event.initEvent('prerenderReady', true, true);
                  document.dispatchEvent(event);
                }
                
                console.log('HomePage: Prerender ready signal sent');
              }
            })();
          `
        }}
      />
    </div>
  );
};

export default HomePage;