
import Header from "@/components/others/HomeHeader";
import HeroSection from "@/components/others/HomeHeroSection";
import TrustedDevelopers from "@/components/others/HomeTrustedDevelopers";
import WhyTrustUs from "@/components/others/HomeWhyTrustUs";
import ProjectSearchTool from "@/components/others/HomeProjectSearchTool";
import TopRatedAgents from "@/components/others/HomeTopRatedAgents";
import HowItWorks from "@/components/others/HomeHowItWorks";
import AgentRecruitment from "@/components/others/HomeAgentRecruitment";
import Footer from "@/components/Agent/Footer";
import { SEOHead } from "@/SEOHead";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="UAE Off‑Plan Properties | Offplan.Market"
        description="Browse top UAE off‑plan property listings. Find verified projects, investor leads, and tools to grow your real estate business—only on Offplan.Market."
      />
      <h1 className="sr-only">Welcome to Offplan.Market</h1>
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
