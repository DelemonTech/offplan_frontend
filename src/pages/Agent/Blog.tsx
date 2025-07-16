
import React from 'react';
import Header from '@/components/others/Header';
import Footer from '@/components/others/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const { t } = useLanguage();

  const blogPosts = [
    {
      title: "Dubai Off-Plan Market Trends 2025",
      excerpt: "Discover the latest trends and opportunities in Dubai's off-plan real estate market for the upcoming year.",
      author: "Ahmed Al-Rashid",
      date: "Dec 15, 2024",
      category: "Market Analysis",
      readTime: "5 min read"
    },
    {
      title: "Investment Guide: Business Bay Projects",
      excerpt: "A comprehensive guide to the best off-plan investment opportunities in Dubai's Business Bay district.",
      author: "Sarah Johnson",
      date: "Dec 12, 2024",
      category: "Investment Tips",
      readTime: "8 min read"
    },
    {
      title: "New Developer Partnerships Announced",
      excerpt: "OFFPLAN.MARKET announces exclusive partnerships with three major Dubai developers for 2025 projects.",
      author: "Mohamed Hassan",
      date: "Dec 10, 2024",
      category: "Company News",
      readTime: "3 min read"
    },
    {
      title: "ROI Analysis: Off-Plan vs Ready Properties",
      excerpt: "Detailed comparison of returns on investment between off-plan and ready properties in Dubai.",
      author: "Sarah Johnson",
      date: "Dec 8, 2024",
      category: "Investment Tips",
      readTime: "6 min read"
    },
    {
      title: "Sustainability in Dubai's New Developments",
      excerpt: "How green building initiatives are shaping the future of Dubai's off-plan developments.",
      author: "Ahmed Al-Rashid",
      date: "Dec 5, 2024",
      category: "Sustainability",
      readTime: "4 min read"
    },
    {
      title: "Payment Plan Strategies for Investors",
      excerpt: "Smart payment plan strategies to maximize your investment potential in off-plan properties.",
      author: "Mohamed Hassan",
      date: "Dec 3, 2024",
      category: "Investment Tips",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              OFFPLAN.MARKET Blog
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Expert insights, market analysis, and investment tips for Dubai's off-plan market
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="grid lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-200 to-purple-200"></div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm">Market Analysis</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Dubai Off-Plan Market Trends 2025
                </h2>
                <p className="text-gray-600 mb-6">
                  Discover the latest trends and opportunities in Dubai's off-plan real estate market for the upcoming year. 
                  Our expert analysis covers price predictions, hottest locations, and investment strategies.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      Ahmed Al-Rashid
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      Dec 15, 2024
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-gray-600">Stay updated with the latest insights from our experts</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-pink-200 to-blue-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <button className="w-full text-center py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Read Full Article
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
