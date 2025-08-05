
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
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="OffPlan Market - Premium Real Estate Properties"
        description="Discover premium off-plan properties and connect with top real estate agents. Find your dream home with OffPlan Market's comprehensive property listings."
        keywords="real estate, off-plan properties, property investment, real estate agents, luxury homes, property listings"
        canonical="https://offplan.market/"
        type="website"
      />
      <h1 className="sr-only">Off-Plan Properties in UAE</h1>
      <Header />
      <HeroSection />
      <TrustedDevelopers />
      <WhyTrustUs />
      <TopRatedAgents />
      <HowItWorks />
      <AgentRecruitment />
      <Footer />
    </div>
  );
};

export default HomePage;
