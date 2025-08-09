// BlogCard.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import i18next from 'i18next';

interface BlogCardProps {
  title: string;
  title_ar?: string;
  title_fa?: string;
  excerpt: string;
  excerpt_ar?: string;
  excerpt_fa?: string;
  image: string;
  author: string;
  created_at: string;
  slug: string;
  lang: string;
  onReadMore: (slug: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  title_ar,
  title_fa,
  excerpt,
  excerpt_ar,
  excerpt_fa,
  image,
  author,
  created_at,
  slug,
  lang,
  onReadMore
}) => {
  const [currentLang, setCurrentLang] = useState(lang);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Update when lang prop changes
  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  const getLocalizedContent = () => {
    switch (currentLang) {
      case 'ar':
        return {
          title: title_ar || title,
          excerpt: excerpt_ar || excerpt
        };
      case 'fa':
        return {
          title: title_fa || title,
          excerpt: excerpt_fa || excerpt
        };
      default:
        return {
          title: title,
          excerpt: excerpt
        };
    }
  };

  const { title: displayTitle, excerpt: displayExcerpt } = getLocalizedContent();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className="cursor-pointer"
      onClick={() => onReadMore(slug)}
    >
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={displayTitle}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(created_at)}</span>
            </div>
          </div>

          <h3
            className="text-xl font-bold bg-gradient-to-br from-pink-600 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-3 line-clamp-2 transition-all duration-200 group-hover:brightness-110"
          >
            {displayTitle}
          </h3>


          {/* <p className="text-gray-600 mb-4 line-clamp-3"> */}
            <div
              dangerouslySetInnerHTML={{ __html: displayExcerpt }}
            />
          {/* </p> */}

          <button
            onClick={() => onReadMore(slug)}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
          >
            Read more
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;