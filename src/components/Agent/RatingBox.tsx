
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const RatingBox = ({ agent }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoveredRating(starValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      // console.log('Rating submitted:', { rating, comment });
      setIsSubmitted(true);
      // Here you would typically send the data to your backend
    }
  };

  const displayRating = hoveredRating || rating;

  const localizedName =
  i18n.language === 'fa' ? agent.fa_name : agent.name;

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 shadow-lg">
        <div className="text-center">
          <div className="text-4xl mb-3">🙏</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            {t('Thank you for your feedback!')}
          </h3>
          <p className="text-green-700">
            {t('Your opinion is very valuable to us and helps improve our services.')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          ⭐ {t("How would you rate {{name}}'s consultation?", { name: localizedName })}
        </h3>
        <p className="text-gray-600 text-sm">
          {t("Share your experience with others")}
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
            >
              <Star
                size={32}
                className={`transition-colors duration-200 ${star <= displayRating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300'
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Rating Text */}
        {rating > 0 && (
          <div className="text-center">
            <span className="text-lg font-semibold text-purple-700">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </span>
          </div>
        )}

        {/* Comment Field */}
        <div className="relative">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your short comment... (optional)"
            className="min-h-[100px] bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400/30 resize-none rounded-xl"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={rating === 0}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed"
        >
          <Send size={18} className="mr-2" />
          {t('Submit Review')}
        </Button>
      </form>
    </div>
  );
};

export default RatingBox;
