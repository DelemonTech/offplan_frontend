// Enhanced BlogDetail.tsx
import React, { useEffect, useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen, Clock } from 'lucide-react';
import i18next from 'i18next';
import Header from '../Agent/Header';
import logoPath from "@/assets/OFFPLAN_MARKET.png";

interface BlogType {
    id: number;
    title: string;
    title_ar?: string;
    title_fa?: string;
    content: string;
    content_ar?: string;
    content_fa?: string;
    image: string;
    author: string;
    slug: string;
    created_at: string;
    category?: string;
    tags?: string[];
    reading_time?: number;
}

const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogType | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const lang = i18next.language;

    useEffect(() => {
        async function loadBlog() {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/api/blogs/${slug}/`);
                const data = await res.json();
                setPost(data);
                
                // Load related posts
                const relatedRes = await fetch('http://127.0.0.1:8000/api/api/blogs/');
                const relatedData = await relatedRes.json();
                const related = (relatedData.results || relatedData)
                  .filter((blog: BlogType) => blog.slug !== slug)
                  .slice(0, 3);
                setRelatedPosts(related);
            } catch (error) {
                console.error('Error loading blog:', error);
            } finally {
                setLoading(false);
            }
        }
        loadBlog();
    }, [slug]);

    if (loading) {
        return (
            <div>
                <Header logo={logoPath} />
                <div className="container mx-auto py-12 px-4">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="space-y-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-4 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div>
                <Header logo={logoPath} />
                <div className="container mx-auto py-12 px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-600">Article not found</h1>
                    <button
                        onClick={() => navigate('/blog')}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    const title = lang === 'ar' ? post.title_ar : lang === 'fa' ? post.title_fa : post.title;
    const content = lang === 'ar' ? post.content_ar : lang === 'fa' ? post.content_fa : post.content;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SEOHead 
                title={title}
                description={post.content.substring(0, 160).replace(/<[^>]*>/g, '')}
                image={post.image}
            />
            <Header logo={logoPath} />
            
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-8">
                <button
                    onClick={() => navigate('/blog')}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Articles
                </button>
            </div>

            <article className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Image */}
                    <div className="relative rounded-2xl overflow-hidden mb-8">
                        <img 
                            src={post.image} 
                            alt={title} 
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            {post.category && (
                                <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                                    {post.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User size={18} />
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{formatDate(post.created_at)}</span>
                                </div>
                                {post.reading_time && (
                                    <div className="flex items-center gap-2">
                                        <Clock size={18} />
                                        <span>{post.reading_time} min read</span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Share2 size={18} />
                                Share
                            </button>
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                <Tag size={18} className="text-gray-400" />
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div 
                            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: content }} 
                        />
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <BookOpen size={24} />
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => {
                                    const relatedTitle = lang === 'ar' ? relatedPost.title_ar : 
                                                        lang === 'fa' ? relatedPost.title_fa : 
                                                        relatedPost.title;
                                    return (
                                        <div
                                            key={relatedPost.id}
                                            className="group cursor-pointer"
                                            onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                                        >
                                            <img
                                                src={relatedPost.image}
                                                alt={relatedTitle}
                                                className="w-full h-40 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {relatedTitle}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatDate(relatedPost.created_at)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;