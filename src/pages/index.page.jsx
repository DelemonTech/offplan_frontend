import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import HeroSection from '@/components/others/HomeHeroSection';
import TrustedDevelopers from '@/components/others/HomeTrustedDevelopers';

export { Page };

function Page() {
  return (
    <div className="min-h-screen bg-background" data-component="homepage">
      {/* Hidden but indexable H1 */}
      <h1 className="sr-only">
        OffPlan Market - Premium Off-Plan Properties in UAE and Dubai
      </h1>

      {/* SEO meta tags */}
      <SEOHead
        title="OffPlan Market - Premium Off-Plan Properties in UAE"
        description="Discover premium off-plan properties in Dubai and UAE."
        canonical="https://offplan.market/"
      />

      {/* Page content */}
      <HeroSection />
      <TrustedDevelopers />
    </div>
  );
}
