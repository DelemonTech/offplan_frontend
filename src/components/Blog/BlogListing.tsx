// BlogListing.tsx with Agent Page Theme
import React, { useEffect, useState } from 'react';
import { Search, Filter, Grid, List, Sparkles, Star, UserCheck, ExternalLink } from 'lucide-react';
import BlogCard from './BlogCard';
import { SEOHead } from '@/components/SEOHead';
import Header from '../Agent/Header';
import logoPath from "@/assets/OFFPLAN_MARKET.png";
import i18next from 'i18next';
import Footer from '@/components/Agent/Footer'

interface BlogType {
  id: number;
  title: string;
  title_ar?: string;
  title_fa?: string;
  content: string;
  content_ar?: string;
  content_fa?: string;
  excerpt: string;
  excerpt_ar?: string;
  excerpt_fa?: string;
  image: string;
  author: string;
  slug: string;
  created_at: string;
  category?: string;
  tags?: string[];
}

const BlogListing: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const lang = i18next.language;
  const hostUrl = import.meta.env.VITE_HOST_URL

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch(`${hostUrl}/api/blogs/`);
        const data = await res.json();
        setBlogs(data.results || data);
        setFilteredBlogs(data.results || data);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog => {
        const title = lang === 'ar' ? blog.title_ar : lang === 'fa' ? blog.title_fa : blog.title;
        const excerpt = lang === 'ar' ? blog.excerpt_ar : lang === 'fa' ? blog.excerpt_fa : blog.excerpt;
        return title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, blogs, lang]);

  const categories = ['all', ...Array.from(new Set(blogs.map(blog => blog.category).filter(Boolean)))];

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleReadMore = (slug: string) => {
    // Navigate to blog detail - implement your navigation logic here
    window.location.href = `/blog/${slug}`;
  };

  const handleContactAgent = () => {
    window.open('https://offplan.market#agents', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
        </div>
        
        <Header logo={logoPath} />
        <div className="container mx-auto py-12 px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden animate-pulse border border-white/20">
                <div className="h-64 bg-gradient-to-r from-purple-200 to-pink-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-pink-200 to-blue-200 rounded-lg w-1/2"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <SEOHead 
        title="Latest Real Estate Insights | Blog"
        description="Stay updated with the latest trends, tips, and insights in Dubai real estate market."
      />
      <Header logo={logoPath} />
      
      {/* Hero Section */}
      <section className="relative py-2 lg:py-12 overflow-hidden">
        {/* Additional background effects for hero */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl animate-pulse delay-150"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-pink-500 animate-pulse" />
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
            Latest Insights
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Discover expert insights, market trends, and valuable tips for UAE's dynamic real estate landscape
          </p>
          
          {/* CTA Button */}
          <div className="mt-10">
            <button
              onClick={handleContactAgent}
              className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              <UserCheck size={24} />
              Connect with Our Experts
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-3 px-4 relative z-10">
        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-4 mb-12 border border-white/20 relative overflow-hidden">
          {/* Background gradient for filter section */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-blue-50/50"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-xl text-gray-700 placeholder-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg">
                  <Filter size={20} className="text-white" />
                </div>
                <select
                  className="px-6 py-4 border-0 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-xl text-gray-700 font-medium min-w-[200px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                <button
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={20} />
                </button>
                <button
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 inline-block">
            <p className="text-gray-700 font-medium">
              Showing <span className="text-purple-600 font-bold">{indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, filteredBlogs.length)}</span> of <span className="text-pink-600 font-bold">{filteredBlogs.length}</span> articles
            </p>
          </div>
        </div>

        {/* Blog Grid/List */}
        {filteredBlogs.length > 0 ? (
          <>
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                : "space-y-8 mb-12"
            }>
              {currentBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  {...blog}
                  lang={lang}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mb-16">
                <button
                  className="px-6 py-3 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-gray-700 font-medium"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={`px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 font-medium ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-xl'
                          : 'bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 hover:bg-white/90 hover:shadow-lg'
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  className="px-6 py-3 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 text-gray-700 font-medium"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-white/20">
              <div className="text-gray-400 mb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Search size={40} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                No articles found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search terms or filters to discover more content
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Contact Agent Section */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden mb-16">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-2xl animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full blur-3xl animate-pulse delay-150"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <UserCheck size={36} className="mx-auto mb-2 animate-bounce" />
              <h2 className="text-4xl md:text-4xl font-bold mb-4">
                Ready to Invest?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Connect with our expert agents for personalized guidance and exclusive property opportunities in Dubai's thriving real estate market.
              </p>
            </div>
            
            <button
              onClick={handleContactAgent}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 font-semibold text-xl border border-white/30"
            >
              <UserCheck size={24} />
              Contact Our Agents Now
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default BlogListing;