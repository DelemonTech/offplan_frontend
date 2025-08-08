// BlogListing.tsx
import React, { useEffect, useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import BlogCard from './BlogCard';
import { SEOHead } from '@/components/SEOHead';
import Header from '../Agent/Header';
import logoPath from "@/assets/OFFPLAN_MARKET.png";
import i18next from 'i18next';

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

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/api/blogs/');
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

  if (loading) {
    return (
      <div>
        <Header logo={logoPath} />
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Latest Real Estate Insights | Blog"
        description="Stay updated with the latest trends, tips, and insights in Dubai real estate market."
      />
      <Header logo={logoPath} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Latest Articles</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover expert insights, market trends, and valuable tips for Dubai's dynamic real estate landscape
          </p>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter size={20} className="text-gray-500" />
              <select
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {indexOfFirstBlog + 1}-{Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} articles
          </p>
        </div>

        {/* Blog Grid/List */}
        {filteredBlogs.length > 0 ? (
          <>
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                : "space-y-6 mb-12"
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
              <div className="flex justify-center items-center gap-2">
                <button
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;