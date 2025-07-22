
import Header from "@/components/others/HomeHeader";
import HeroSection from "@/components/others/HomeHeroSection";
import TrustedDevelopers from "@/components/others/HomeTrustedDevelopers";
import WhyTrustUs from "@/components/others/HomeWhyTrustUs";
import ProjectSearchTool from "@/components/others/HomeProjectSearchTool";
import TopRatedAgents from "@/components/others/HomeTopRatedAgents";
import HowItWorks from "@/components/others/HomeHowItWorks";
import AgentRecruitment from "@/components/others/HomeAgentRecruitment";
import Footer from "@/components/Agent/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
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
