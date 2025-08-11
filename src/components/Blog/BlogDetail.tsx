// Enhanced BlogDetail.tsx with comprehensive null safety and improved TOC
import React, { useEffect, useState, useRef } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen, Clock, Mail, Phone, MessageSquare, Send, Sparkles, Star, UserCheck, ExternalLink } from 'lucide-react';
import i18next from 'i18next';
import Header from '../Agent/Header';
import logoPath from "@/assets/OFFPLAN_MARKET.png";
import Footer from '@/components/Agent/Footer'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

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
    meta_title?: string;
    meta_description?: string;
}

interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    agreeUpdates: boolean;
}

const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogType | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
    const [activeSection, setActiveSection] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [contactForm, setContactForm] = useState<ContactFormData>({
        name: '', email: '', phone: '', message: '', agreeUpdates: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const lang = i18next.language || 'en';
    const hostUrl = import.meta.env.VITE_HOST_URL || '';
    // const [metaDesc, setMetaDesc] = useState();

    useEffect(() => {
        if (post?.meta_description) {
            console.log("metaDesc updated:", post.meta_description);
        }
    }, [post]);


    useEffect(() => {
        async function loadBlog() {
            if (!slug) {
                setError('No blog slug provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${hostUrl}/api/blogs/${slug}/`);

                if (!res.ok) {
                    throw new Error(`Failed to load blog: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();

                if (!data || !data.id) {
                    throw new Error('Blog data is empty or invalid');
                }

                setPost(data);
                // console.log("data",data);



                // Load related posts
                try {
                    const relatedRes = await fetch(`${hostUrl}/api/blogs/`);
                    if (relatedRes.ok) {
                        const relatedData = await relatedRes.json();
                        const results = relatedData.results || relatedData || [];
                        const related = Array.isArray(results)
                            ? results
                                .filter((blog: BlogType) => blog && blog.slug && blog.slug !== slug)
                                .slice(0, 3)
                            : [];
                        setRelatedPosts(related);
                        // setMetaDesc(relatedData?.results?.meta_description);

                        // post.meta_description = data.meta_description;
                        console.log("blog", data.meta_description);
                        // setMetaDesc(data.meta_description);
                        // console.log("metaDesc", metaDesc);
                    }
                } catch (relatedError) {
                    console.warn('Failed to load related posts:', relatedError);
                    // Don't fail the entire component if related posts fail
                }

            } catch (error) {
                console.error('Error loading blog:', error);
                setError(error instanceof Error ? error.message : 'Failed to load blog');
            } finally {
                setLoading(false);
            }
        }

        loadBlog();
    }, [slug, hostUrl]);

    const getTranslatedField = (en: string, ar?: string, fa?: string) => {
        if (lang === 'ar' && ar) return ar;
        if (lang === 'fa' && fa) return fa;
        return en;
    };

    // Safe content extraction with comprehensive null checks
    const getSafeContent = (): string => {
        if (!post) return '';

        let content = '';

        try {
            if (lang === 'ar' && post.content_ar) {
                content = post.content_ar;
            } else if (lang === 'fa' && post.content_fa) {
                content = post.content_fa;
            } else if (post.content) {
                content = post.content;
            }

            return content || '';
        } catch (error) {
            console.warn('Error getting safe content:', error);
            return post.content || '';
        }
    };


    const getSafeTitle = (): string => {
        if (!post) return 'Loading...';

        try {
            let title = '';

            if (lang === 'ar' && post.title_ar) {
                title = post.title_ar;
            } else if (lang === 'fa' && post.title_fa) {
                title = post.title_fa;
            } else if (post.title) {
                title = post.title;
            }

            // Fallback if empty
            if (!title) title = 'Untitled';

            // Limit length but ensure we return something
            return title.length <= 100 ? title : title.substring(0, 100) + '...';

        } catch (error) {
            console.warn('Error getting safe title:', error);
            return post?.title || 'Untitled';
        }
    };


    const decodeHtmlEntities = (str: string): string => {
        if (!str || typeof str !== 'string') return '';

        try {
            const textArea = document.createElement('textarea');
            textArea.innerHTML = str;
            return textArea.value || str;
        } catch (error) {
            console.warn('Error decoding HTML entities:', error);
            return str;
        }
    };

    const generateTOCFromContent = (content: string): TableOfContentsItem[] => {
        if (!content || typeof content !== 'string') return [];

        const toc: TableOfContentsItem[] = [];

        try {
            const decodedContent = decodeHtmlEntities(content);

            // Only look for actual HTML header tags (h1-h6)
            const headerRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
            let match;
            let index = 0;

            while ((match = headerRegex.exec(decodedContent)) !== null) {
                const level = parseInt(match[1]);
                const title = match[2]
                    .replace(/<[^>]*>/g, '') // Remove any HTML tags inside headers
                    .trim();

                if (title && title.length > 0) {
                    toc.push({
                        id: `heading-${index}-${level}`,
                        title: title,
                        level: level
                    });
                    index++;
                }
            }

            // console.log('Generated TOC with', toc.length, 'header tags:', toc);

        } catch (error) {
            console.error('Error parsing content for TOC:', error);
        }

        return toc;
    };

    // Updated useEffect for TOC generation - only header tags
    useEffect(() => {
        if (!post) return;

        const timer = setTimeout(() => {
            const content = getSafeContent();
            if (!content) return;

            try {
                // Generate TOC only from actual header tags
                let toc = generateTOCFromContent(content);

                // If no headers found in content, try DOM-based approach after render
                if (toc.length === 0 && contentRef.current) {
                    setTimeout(() => {
                        if (!contentRef.current) return;

                        const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
                        const domToc: TableOfContentsItem[] = [];

                        headings.forEach((heading, index) => {
                            const headingText = heading.textContent?.trim();
                            if (headingText && headingText.length > 0) {
                                const id = `heading-dom-${index}`;
                                heading.id = id; // Assign ID to the actual element

                                domToc.push({
                                    id,
                                    title: headingText,
                                    level: parseInt(heading.tagName.charAt(1))
                                });
                            }
                        });

                        if (domToc.length > 0) {
                            setTableOfContents(domToc);
                            console.log('Generated DOM-based TOC with', domToc.length, 'headers:', domToc);
                        }
                    }, 500);
                } else if (toc.length > 0) {
                    setTableOfContents(toc);

                    // Add IDs to actual elements after DOM is updated
                    setTimeout(() => {
                        if (!contentRef.current) return;

                        toc.forEach((item) => {
                            // Look for the exact header text in the DOM
                            const headerElements = contentRef.current!.querySelectorAll('h1, h2, h3, h4, h5, h6');
                            headerElements.forEach((element) => {
                                const elementText = element.textContent?.trim();
                                if (elementText === item.title && !element.id) {
                                    element.id = item.id;
                                }
                            });
                        });
                    }, 300);
                }

            } catch (error) {
                console.error('Error generating table of contents:', error);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [post, lang]);

    // Scroll spy for active section
    useEffect(() => {
        if (tableOfContents.length === 0) return;

        const handleScroll = () => {
            try {
                const headings = tableOfContents
                    .map(item => document.getElementById(item.id))
                    .filter((element): element is HTMLElement => element !== null);

                if (headings.length === 0) return;

                const scrollTop = window.scrollY;
                const current = headings.find((heading, index) => {
                    const nextHeading = headings[index + 1];
                    const currentTop = heading.offsetTop - 100;
                    const nextTop = nextHeading ? nextHeading.offsetTop - 100 : Infinity;

                    return scrollTop >= currentTop && scrollTop < nextTop;
                });

                if (current && current.id) {
                    setActiveSection(current.id);
                }
            } catch (error) {
                console.warn('Error in scroll handler:', error);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tableOfContents]);

    const scrollToSection = (id: string) => {
        try {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveSection(id);
            }
        } catch (error) {
            console.warn('Error scrolling to section:', error);
        }
    };

    // Enhanced content processing function
    const processContent = (text: string): string => {
        if (!text || typeof text !== 'string') return '';

        let processedText = text;

        try {
            // First, decode any HTML entities
            processedText = decodeHtmlEntities(processedText);

            // Check if content already has proper HTML structure
            const hasHtmlStructure = /<(p|div|ul|ol|li|h[1-6])\b[^>]*>/i.test(processedText);

            if (hasHtmlStructure) {
                // Content already has HTML structure, clean it up
                processedText = processedText.replace(/<li([^>]*)>(.*?)<\/li>\s*(?!<\/[uo]l>)(?=<li)/g, '<li$1>$2</li>');
                processedText = processedText.replace(/(<li\b[^>]*>.*?<\/li>)(?!\s*<\/[uo]l>)(?!\s*<li)/g, '<ul>$1</ul>');
                processedText = processedText.replace(/<\/ul>\s*<ul>/g, '');
                processedText = processedText.replace(/<\/ol>\s*<ol>/g, '');
                processedText = processedText.replace(/(<\/h[1-6]>)\s*(<p)/g, '$1\n\n$2');
                processedText = processedText.replace(/(<\/p>)\s*(<[uo]l>)/g, '$1\n\n$2');
                processedText = processedText.replace(/(<\/[uo]l>)\s*(<p)/g, '$1\n\n$2');
            } else {
                // Convert plain text to HTML structure
                processedText = processedText.replace(/\n\s*\n\s*\n/g, '</p><p>');
                processedText = processedText.replace(/\n\s*\n/g, '</p><p>');
                processedText = processedText.replace(/\n/g, '<br>');

                if (!processedText.startsWith('<p>')) {
                    processedText = '<p>' + processedText + '</p>';
                }

                processedText = processedText.replace(/^(\d+\.\s+)(.+)$/gm, '<h3>$1$2</h3>');
                processedText = processedText.replace(/<p>([^<]+:)<br>/g, '<h4>$1</h4><p>');
                processedText = processedText.replace(/<p>([–•\-]\s+)(.+?)<\/p>/g, '<ul><li>$2</li></ul>');
                processedText = processedText.replace(/<\/ul>\s*<ul>/g, '');
            }

            // Make URLs clickable
            processedText = processedText.replace(
                /(^|[^">])(https?:\/\/[^\s<]+)/g,
                (match, prefix, url) => {
                    // If this URL is already part of an <a> tag, skip
                    if (prefix.endsWith('href=')) {
                        return match;
                    }
                    return `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer" 
            class="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200 font-medium">${url}</a>`;
                }
            );

            // Handle FAQ and Step sections
            processedText = processedText.replace(/<p>(Q\d+:.*?)<br>/g, '<h4 class="faq-question">$1</h4><p>');
            processedText = processedText.replace(/<p>(Step \d+:.*?)<br>/g, '<h4 class="step-title">$1</h4><p>');

            // Clean up empty paragraphs
            processedText = processedText.replace(/<p>\s*<\/p>/g, '');
            processedText = processedText.replace(/<p><br><\/p>/g, '');

            return processedText;
        } catch (error) {
            console.error('Error processing content:', error);
            return text; // Return original text if processing fails
        }
    };


    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${hostUrl}/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: contactForm.name,
                    phone_number: contactForm.phone,
                    email: contactForm.email,
                    message: contactForm.message,
                    agree_updates: contactForm.agreeUpdates,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error response:', errorData);
                throw new Error('Submission failed');
            }

            setContactForm({
                name: '',
                email: '',
                phone: '',
                message: '',
                agreeUpdates: false
            });

            toast.success('✅ Inquiry sent successfully!');

        } catch (error) {
            console.error('Network or server error:', error);
            toast.error('❌ Failed to send inquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContactAgent = () => {
        window.open('https://offplan.market#agents', '_blank');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setContactForm(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setContactForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return 'Date not available';

        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.warn('Error formatting date:', error);
            return 'Date not available';
        }
    };

    const handleShare = async () => {
        const title = getSafeTitle();
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch (error) {
                console.log('Error sharing:', error);
                // Fallback to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url);
                    toast.success('Link copied to clipboard!');
                }
            }
        } else {
            // Fallback for browsers without native sharing
            if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(url);
                    toast.success('Link copied to clipboard!');
                } catch (error) {
                    console.warn('Could not copy to clipboard:', error);
                    // Last resort - show URL in prompt
                    prompt('Copy this link:', url);
                }
            }
        }
    };


    // Get safe values for rendering
    const title = getSafeTitle();
    const content = getSafeContent();
    const decodedContent = decodeHtmlEntities(content);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <Header logo={logoPath} />
                <div className="container mx-auto py-12 px-4">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl mb-8 shadow-xl"></div>
                        <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gradient-to-r from-pink-200 to-blue-200 rounded-lg w-1/2 mb-8"></div>
                        <div className="space-y-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <Header logo={logoPath} />
                <div className="container mx-auto py-12 px-4 text-center">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/20 max-w-md mx-auto">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                            {error || 'Article not found'}
                        </h1>
                        <button
                            onClick={() => navigate('/blogs')}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white !text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
                <Toaster position="top-right" />

                {/* Background Effects */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
                </div>

                {!location.pathname.startsWith('/blogs/') && (
                    <>
                        {console.log("SEO Description:", post?.meta_description)}
                        <SEOHead
                            title={post?.meta_title || post?.title || 'Blog'}
                            description={
                                post?.meta_description ||
                                (post?.content ? post.content.substring(0, 160).replace(/<[^>]*>/g, '') : 'Blog article')
                            }
                            image={post?.image || ''}
                            canonical={`${window.location.origin}${location.pathname}`}
                        />
                    </>
                )}


                <Header logo={logoPath} />

                {/* Back Button */}
                <div className="container mx-auto px-4 pt-8 relative z-10">
                    <button
                        onClick={() => navigate('/blogs')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md text-gray-700 hover:text-gray-900 rounded-xl shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                    >
                        <ArrowLeft size={20} />
                        Back to Articles
                    </button>
                </div>

                <div className="container mx-auto py-8 px-4 relative z-10">
                    <div className="max-w-7xl mx-auto flex gap-8">
                        {/* Main Content */}
                        <article className="flex-1 max-w-4xl">
                            {/* Hero Image */}
                            <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl group">
                                <img
                                    src={post.image || '/placeholder-image.jpg'}
                                    alt={title}
                                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/placeholder-image.jpg';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    {post.category && (
                                        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
                                            <Sparkles size={16} />
                                            {post.category}
                                        </div>
                                    )}
                                    <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                        {title}
                                    </h1>
                                </div>
                            </div>

                            {/* Meta Information */}
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-8 border border-white/20">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-6 text-gray-600">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                            <User size={18} className="text-purple-500" />
                                            <span className="font-medium">{post.author || 'Unknown Author'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl">
                                            <Calendar size={18} className="text-pink-500" />
                                            <span>{formatDate(post.created_at)}</span>
                                        </div>
                                        {post.reading_time && (
                                            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                                <Clock size={18} className="text-purple-500" />
                                                <span>{post.reading_time} min read</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Share2 size={18} />
                                        Share
                                    </button>
                                </div>

                                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                                    <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-100">
                                        <Tag size={18} className="text-gray-400" />
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm border border-gray-200 hover:shadow-sm transition-all duration-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content with enhanced formatting */}
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
                                <div
                                    ref={contentRef}
                                    className="prose prose-lg max-w-none leading-relaxed
                                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-6 prose-headings:mt-8 prose-headings:leading-tight
                                    prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-pink-600 prose-h1:bg-clip-text prose-h1:text-transparent
                                    prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-gray-800 prose-h2:border-l-4 prose-h2:border-purple-500 prose-h2:pl-4 prose-h2:py-2
                                    prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-gray-700 prose-h3:font-semibold prose-h3:bg-gradient-to-r prose-h3:from-blue-600 prose-h3:to-purple-600 prose-h3:bg-clip-text prose-h3:text-transparent
                                    prose-h4:text-lg prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-gray-600 prose-h4:font-semibold
                                    prose-p:text-gray-700 prose-p:leading-loose prose-p:mb-8 prose-p:text-lg prose-p:whitespace-pre-line
                                    prose-br:mb-4
                                    prose-ul:mb-8 prose-ul:space-y-3 prose-ul:pl-6 prose-ul:list-disc
                                    prose-ol:mb-8 prose-ol:space-y-3 prose-ol:pl-6 prose-ol:list-decimal
                                    prose-li:text-gray-700 prose-li:text-lg prose-li:leading-loose prose-li:mb-2
                                    prose-strong:text-gray-900 prose-strong:font-semibold
                                    prose-em:text-gray-800 prose-em:italic
                                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:bg-purple-50/50 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:italic
                                    prose-img:rounded-xl prose-img:shadow-lg prose-img:mb-8 prose-img:w-full prose-img:h-auto prose-img:mt-4
                                    prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800
                                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:mb-8 prose-pre:mt-4
                                    prose-table:w-full prose-table:mb-8 prose-table:border-collapse prose-table:mt-4
                                    prose-th:bg-gray-50 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900
                                    prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700
                                    prose-hr:border-gray-300 prose-hr:my-12 prose-hr:border-t-2"
                                    style={{
                                        lineHeight: '1.8',
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: processContent(decodedContent)
                                    }}
                                />

                                {/* Enhanced CSS for better content formatting */}
                                <style>{`
                                .prose a {
                                    color: #2563eb !important;
                                    text-decoration: underline !important;
                                    font-weight: 500 !important;
                                    text-underline-offset: 2px !important;
                                }
                                .prose a:hover {
                                    color: #1d4ed8 !important;
                                    text-decoration: underline !important;
                                }
                                .prose p {
                                    margin-bottom: 1.5rem !important;
                                    line-height: 1.8 !important;
                                }
                                .prose ul {
                                    margin-top: 1.5rem !important;
                                    margin-bottom: 2rem !important;
                                    padding-left: 1.5rem !important;
                                    list-style-type: disc !important;
                                }
                                .prose ol {
                                    margin-top: 1.5rem !important;
                                    margin-bottom: 2rem !important;
                                    padding-left: 1.5rem !important;
                                    list-style-type: decimal !important;
                                }
                                .prose ul li, .prose ol li {
                                    margin-bottom: 0.75rem !important;
                                    line-height: 1.7 !important;
                                    padding-left: 0.25rem !important;
                                    position: relative;
                                }
                                .prose ul li::marker {
                                    color: #7c3aed !important;
                                    font-weight: bold !important;
                                }
                                .prose ol li::marker {
                                    color: #7c3aed !important;
                                    font-weight: bold !important;
                                }
                                .prose li > p {
                                    margin-bottom: 0.5rem !important;
                                    display: inline;
                                }
                                .prose li strong {
                                    color: #374151 !important;
                                    font-weight: 600 !important;
                                }
                                .prose h2 {
                                    margin-top: 3rem !important;
                                    margin-bottom: 1.5rem !important;
                                }
                                .prose h3 {
                                    margin-top: 2.5rem !important;
                                    margin-bottom: 1rem !important;
                                    border-left: 4px solid #8b5cf6;
                                    padding-left: 1rem;
                                }
                                .prose h4 {
                                    margin-top: 2rem !important;
                                    margin-bottom: 1rem !important;
                                }
                                .prose hr {
                                    margin: 3rem 0 !important;
                                    border-top: 2px solid #e5e7eb !important;
                                }
                                .prose .faq-question {
                                    color: #7c3aed !important;
                                    font-weight: 600 !important;
                                    margin-top: 2rem !important;
                                    margin-bottom: 1rem !important;
                                    border-left: 4px solid #7c3aed;
                                    padding-left: 1rem;
                                    background: linear-gradient(to right, #f3e8ff, #fdf4ff);
                                    padding: 1rem;
                                    border-radius: 0.5rem;
                                }
                                .prose .step-title {
                                    background: linear-gradient(to right, #3b82f6, #8b5cf6);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    font-weight: 600 !important;
                                    margin-top: 1.5rem !important;
                                    margin-bottom: 0.75rem !important;
                                }
                            `}</style>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
                                {/* Background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-blue-50/50"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg">
                                            <MessageSquare size={24} className="text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                            Get in Touch
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 mb-8 text-lg">
                                        Have questions about this article or need more information? We'd love to hear from you!
                                    </p>
                                    <form onSubmit={handleContactSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={contactForm.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-xl"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={contactForm.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-xl"
                                                    placeholder="Your phone number"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={contactForm.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-xl"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={contactForm.message}
                                                onChange={handleInputChange}
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-xl resize-vertical"
                                                placeholder="Tell us about your inquiry..."
                                            />
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                id="agreeUpdates"
                                                name="agreeUpdates"
                                                checked={contactForm.agreeUpdates}
                                                onChange={handleInputChange}
                                                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-all duration-200"
                                            />
                                            <label htmlFor="agreeUpdates" className="text-sm text-gray-600 leading-relaxed">
                                                I agree to receive updates about new properties and market insights
                                            </label>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium"
                                        >
                                            <Send size={18} />
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
                                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                                            <BookOpen size={24} className="text-white" />
                                        </div>
                                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                            Related Articles
                                        </span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {relatedPosts.map((relatedPost) => {
                                            if (!relatedPost) return null;

                                            const relatedTitle = lang === 'ar' && relatedPost.title_ar ? relatedPost.title_ar :
                                                lang === 'fa' && relatedPost.title_fa ? relatedPost.title_fa :
                                                    relatedPost.title || 'Untitled';

                                            return (
                                                <div
                                                    key={relatedPost.id || Math.random()}
                                                    className="group cursor-pointer bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
                                                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                                                >
                                                    <img
                                                        src={relatedPost.image || '/placeholder-image.jpg'}
                                                        alt={relatedTitle}
                                                        className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/placeholder-image.jpg';
                                                        }}
                                                    />
                                                    <h3 className="font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 mb-2">
                                                        {relatedTitle}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(relatedPost.created_at)}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </article>

                        {/* Table of Contents Sidebar */}
                        <aside className="hidden lg:block w-80">
                            <div className="sticky top-8">
                                {tableOfContents.length > 0 && (
                                    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-6 border border-white/20">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                                                <BookOpen size={20} className="text-white" />
                                            </div>
                                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                                Table of Contents
                                            </span>
                                        </h3>
                                        <div className="text-sm text-gray-500 mb-4">
                                            {tableOfContents.length} section{tableOfContents.length !== 1 ? 's' : ''} found
                                        </div>
                                        <nav className="space-y-2 max-h-96 overflow-y-auto">
                                            {tableOfContents.map((item, index) => (
                                                <button
                                                    key={item.id || index}
                                                    onClick={() => scrollToSection(item.id)}
                                                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm ${activeSection === item.id
                                                        ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-purple-600 font-medium border-l-4 border-purple-500 shadow-lg'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 hover:shadow-md'
                                                        } ${item.level === 3 ? 'ml-4' :
                                                            item.level === 4 ? 'ml-8' :
                                                                item.level > 4 ? 'ml-12' : ''
                                                        }`}
                                                    title={item.title}
                                                >
                                                    <span className="block truncate">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        Level {item.level}
                                                    </span>
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                )}

                                {/* Show message when no TOC is available */}
                                {tableOfContents.length === 0 && (
                                    <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-6 mb-6 border border-white/20">
                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                                            <BookOpen size={18} />
                                            Table of Contents
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            No sections detected in this article. The content will load below.
                                        </p>
                                    </div>
                                )}

                                {/* Quick Contact Card */}
                                <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-500 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden">
                                    {/* Background effects */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-2 right-2 w-16 h-16 bg-white rounded-full blur-xl animate-pulse"></div>
                                        <div className="absolute bottom-2 left-2 w-12 h-12 bg-white rounded-full blur-xl animate-pulse delay-300"></div>
                                    </div>

                                    <div className="relative z-10 text-center">
                                        <div className="mb-6">
                                            <UserCheck size={36} className="mx-auto mb-2" />
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
                                            Contact Our Agents Now
                                            <ExternalLink size={28} className='animate-bounce' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default BlogDetail;