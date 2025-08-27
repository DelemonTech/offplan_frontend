
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
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Off-Plan Properties in UAE
      </h1>
      <Header />
      <HeroSection />
      <TrustedDevelopers />
      <WhyTrustUs />
      <TopRatedAgents />
      <HowItWorks />
      <AgentRecruitment />
      
      {/* Internal Links Section - Visible and SEO-friendly */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Explore OffPlan Market
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover more about UAE's leading off-plan property platform and stay updated with the latest real estate insights.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* About Us Link */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About Us</h3>
              <p className="text-gray-600 mb-6">
                Learn more about OffPlan Market's mission to revolutionize UAE's off-plan property market with transparency and innovation.
              </p>
              <a
                href="/about"
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold transition-colors duration-200"
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Contact Link */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-6">
                Get in touch with our expert team for personalized assistance with your off-plan property needs.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                Get in Touch
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Blog Link */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Estate Blog</h3>
              <p className="text-gray-600 mb-6">
                Stay informed with the latest market trends, investment insights, and Dubai real estate news.
              </p>
              <a
                href="/blogs"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
              >
                Read Blog
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
