
import Header from "@/components/HomeHeader";
import HeroSection from "@/components/HomeHeroSection";
import TrustedDevelopers from "@/components/HomeTrustedDevelopers";
import WhyTrustUs from "@/components/HomeWhyTrustUs";
import ProjectSearchTool from "@/components/HomeProjectSearchTool";
import TopRatedAgents from "@/components/HomeTopRatedAgents";
import HowItWorks from "@/components/HomeHowItWorks";
import AgentRecruitment from "@/components/HomeAgentRecruitment";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrustedDevelopers />
      <WhyTrustUs />
      <ProjectSearchTool />
      <TopRatedAgents />
      <HowItWorks />
      <AgentRecruitment />
      <Footer />
    </div>
  );
};

export default HomePage;
