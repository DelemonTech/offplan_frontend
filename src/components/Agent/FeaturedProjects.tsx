import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Check, Loader2, RefreshCw, Building2, Repeat, MessageCircle, Ruler, CreditCard, Share } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectSummaryModal from './ProjectSummaryModal';
import { set } from 'date-fns';

const FeaturedProjects = ({ agent, properties, nextPageUrl, setProperties, setNextPageUrl }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('ready');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectForSummary, setSelectedProjectForSummary] = useState(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const firstNewCardRef = useRef(null);

  const formatDeliveryDate = (unixTimestamp: string | number) => {
    if (!unixTimestamp) return "N/A";
    // Convert to number and then to milliseconds
    const date = new Date(Number(unixTimestamp) * 1000);

    // Example output: "June 2028"
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatAED = (value: string | number | null | undefined): string => {
    const number = typeof value === 'string' ? parseInt(value) : value;

    if (!isNaN(number as number)) {
      const withCommas = (number as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${withCommas}`;
    }
    else if (number === null || value === null) {
      return "N/A";
    }
  };

  const totalInventory = {
    ready: 349,
    offplan: 1180,
    prelaunch: 285,
    total: 1529
  };

  const visibleProjects = properties.slice(0, visibleCount);

  const getStatusBadgeContent = (status: number) => {
    switch (status) {
      case 1:
        return <Check size={16} className="text-white" />;
      case 2:
        return <Building2 size={16} className="text-white" />;
      case 3:
        return <Repeat size={16} className="text-white" />;
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: number) => {
    switch (status) {
      case 1:
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg';
      case 2:
        return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg';
      case 3:
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg';
    }
  };

  const loadMore = async () => {
    if (!nextPageUrl || isLoading) return;

    document.body.classList.add('freeze-scroll');
    setIsLoading(true);

    try {
      const secureUrl = nextPageUrl.replace('http://', 'https://');
      const response = await fetch(secureUrl);
      const result = await response.json();

      if (result.status && result.data) {
        const newProperties = result.data.results || [];
        const newNextPageUrl = result.data.next_page_url || null;

        const startIndex = properties.length;
        setProperties(prev => [...prev, ...newProperties]);
        setNextPageUrl(newNextPageUrl);

        setTimeout(() => {
          const el = document.getElementById(`property-${startIndex}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          document.body.classList.remove('freeze-scroll');
        }, 500);
      } else {
        document.body.classList.remove('freeze-scroll');
      }
    } catch (error) {
      console.error('Failed to load more properties:', error);
      document.body.classList.remove('freeze-scroll');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleViewDetails = (projectId: number) => {
  //   navigate(`/project/${projectId}`);
  // };

  const handleProjectSummary = (project: any) => {
    console.log('FeaturedProjects - Setting project for summary:', project);
    setSelectedProjectForSummary(project);
    setIsSummaryModalOpen(true);
  };

  const handleWhatsApp = (project: any) => {
    const message = `Hi Sahar! I'm interested in ${project.title} in ${project.location}. Starting from AED ${parseInt(project.price).toLocaleString()}. Can you share more details?`;
    const whatsappUrl = `https://wa.me/${agent.data.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = (project: any) => {
    const shareText = `🏠 ${project.title} - ${project.location}\n💰 Starting from AED ${parseInt(project.price).toLocaleString()}\n📅 Handover: ${project.handover}\n💳 Payment Plan: ${project.paymentPlan}\n📐 From ${project.sizeFrom} ft²\n\nInterested? Contact Sahar: https://wa.me/971529529687`;

    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('خلاصه پروژه کپی شد!');
      });
    }
  };

  setTimeout(() => {
    const scrollOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    };

    if (firstNewCardRef.current) {
      firstNewCardRef.current.scrollIntoView(scrollOptions);
    }
    document.body.style.overflow = '';
  }, 500);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <section id="featured-projects" className="py-24 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Your Next Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Starts Here</span>
          </h2>
          <div className="relative">
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-4 font-medium">
              Curated by {agent.data.name}, crafted for your future.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            {/* Showing {visibleProjects.length} of {totalInventory[activeFilter].toLocaleString()} properties in Sahar's complete portfolio */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {properties.map((project, index) => (
            <div
              key={project.id}
              id={`property-${index}`} // ✅ Give each wrapper a unique id
            >
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm cursor-pointer relative hover:scale-[1.02] animate-fade-in"
                // onClick={() => handleProjectSummary(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-52 sm:h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusBadgeStyle(project.property_status)} font-semibold px-3 py-2 text-sm flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/20`}>
                      {getStatusBadgeContent(project.sales_status)}
                    </Badge>
                  </div>

                  {/* <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {project.badges.slice(0, 2).map((badge, index) => (
                    <Badge
                      key={index}
                      className={`${getBadgeStyle(badge)} font-medium shadow-md text-xs px-3 py-1 rounded-full border backdrop-blur-sm`}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div> */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <div className="text-white text-center p-4 space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDeliveryDate(project.delivery_date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard size={14} />
                          <span>Payment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2 text-pink-500 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base truncate">{project.city.name}, {project.district.name}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl p-4 border border-pink-100">
                      <div className="text-xs sm:text-sm text-gray-600 mb-1">Starting from</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        AED {project.low_price && formatAED((project.low_price))}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Ruler size={12} className="text-pink-500" />
                          <span>From {project.min_area} ft²</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-blue-500" />
                          <span>{formatDeliveryDate(project.delivery_date)}</span>
                        </div>
                        {/* <div className="flex items-center gap-1">
                        <CreditCard size={12} className="text-purple-500" />
                        <span>Payment</span>
                      </div> */}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   handleViewDetails(project.id);
                        // }}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm py-2.5 rounded-xl"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 rounded-xl border-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsApp(project);
                        }}
                      >
                        <MessageCircle size={18} className="text-green-600" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl border-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(project);
                        }}
                      >
                        <Share size={18} className="text-blue-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* {hasMoreProjects && ( */}
        <div className="flex justify-center">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none rounded-2xl border-2 border-white/20"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Loading more properties...
              </>
            ) : (
              <>
                <RefreshCw className="mr-3 h-5 w-5" />
                Load More Properties
              </>
            )}
          </Button>
        </div>
        {/* )} */}
      </div>

      <ProjectSummaryModal
        project={selectedProjectForSummary}
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
      />

      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          onClick={() => handleWhatsApp(visibleProjects[0] || {})}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl animate-pulse"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      </div>

      <style>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        `}
      </style>
    </section>
  );
};

export default FeaturedProjects;
