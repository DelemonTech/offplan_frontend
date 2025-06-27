import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Check, Loader2, RefreshCw, Lock, Building2, Repeat, MessageCircle, Ruler, CreditCard, Share, BookLock, EarthLock, LucideEarthLock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectSummaryModal from './ProjectSummaryModal';
import { set } from 'date-fns';
import { useLocation } from 'react-router-dom';


const FeaturedProjects = ({ agent, properties, nextPageUrl, setProperties, setNextPageUrl, statusName, setStatusName, setPropertyType,
  setSelectedPropertySubtype,
  setBedrooms,
  setPriceRange,
  setAreaRange,
  setIsAdvancedOpen,
  setMaxPrice,
  setMaxArea,
  setProjectName,
  setCitiesData,
  setSelectedCity,
  setSelectedNeighborhood,
  setDeveloper,
  setProjectStatus,
  setDeliveryYear,
  citiesData,
  selectedCity,
  propertyType,
  selectedPropertySubtype,
  bedrooms,
  priceRange,
  areaRange,
  isAdvancedOpen,
  maxPrice,
  maxArea,
  projectName,
  selectedNeighborhood,
  developer,
  projectStatus,
  deliveryYear,
  developers,
  setDevelopers,
  isSearchLoading,
  setIsSearchLoading }) => {
  const navigate = useNavigate();

  // const [activeFilter, setActiveFilter] = useState('ready');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectForSummary, setSelectedProjectForSummary] = useState(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const firstNewCardRef = useRef(null);

  const location = useLocation();
  const { showFilters } = location.state || {};


  const [copiedProjectId, setCopiedProjectId] = useState<number | null>(null);

  const filters = [
    { id: 2, key: 'ready', label: 'Ready', icon: Check },
    { id: 1, key: 'offplan', label: 'Off Plan', icon: Building2 },
    { id: 3, key: "soldout", label: 'Sold Out', icon: LucideEarthLock },
  ];

  const formatDeliveryDate = (unixTimestamp: string | number) => {
    if (!unixTimestamp) return "N/A";
    // Convert to number and then to milliseconds
    const date = new Date(Number(unixTimestamp) * 1000);

    // Example output: "June 2028"
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  // const filters = [
  //   { id: 'ready', label: 'Ready', icon: Check },
  //   { id: 'offplan', label: 'Offplan', icon: Building2 },
  //   { id: 'soldout', label: 'Sold Out', icon: LucideEarthLock }
  // ];


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

  const [totalInventory, setTotalInventory] = useState({
    ready: 0,
    offplan: 0,
    soldout: 0,
    total: 0
  });


  const visibleProjects = properties.slice(0, visibleCount);

  const getStatusBadgeContent = (status: number) => {
    switch (status) {
      case 1:
        return <Building2 size={16} className="text-white" />;
      case 2:
        return <Check size={16} className="text-white" />;
      case 3:
        return <Lock size={16} className="text-white" />;
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: number) => {
    switch (status) {
      case 2:
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg';
      case 1:
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

    // Construct full filters
    const filters = {
      city: selectedCity || '',
      district: selectedNeighborhood || '',
      property_type: propertyType || '',
      unit_type: selectedPropertySubtype || '',
      rooms: propertyType === 'Residential' ? bedrooms?.toString() : '',
      delivery_year: deliveryYear ? parseInt(deliveryYear) : 0,
      min_price: priceRange[0],
      max_price: priceRange[1],
      min_area: areaRange[0],
      max_area: areaRange[1],
      property_status: '',
      sales_status: '',
    };

    // Apply the status filter
    if (statusName.toLowerCase() === 'sold out') {
      filters.sales_status = 'Sold Out';
    } else if (['ready', 'off plan'].includes(statusName.toLowerCase())) {
      filters.property_status = statusName;
    }

    try {
      const secureUrl = nextPageUrl.replace('http://', 'https://');

      const response = await fetch(secureUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters), // ✅ pass complete filter object
      });

      const result = await response.json();
      console.log("Load More Response:", result);

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
    // console.log('FeaturedProjects - Setting project for summary:', project);
    setSelectedProjectForSummary(project);
    setIsSummaryModalOpen(true);
  };

  const handleWhatsApp = (project: any) => {
    const message = `Hi Sahar! I'm interested in ${project.title} in ${project.location}. Starting from AED ${parseInt(project.price).toLocaleString()}. Can you share more details?`;
    const whatsappUrl = `https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
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
        setCopiedProjectId(project.id); // 👈 track which icon to show check for
        setTimeout(() => setCopiedProjectId(null), 2000); // ⏱ reset after 2s
      });
    }
  };

  useEffect(() => {
    console.log('📦 [FeaturedProjects] statusName changed to:', statusName);
    setNextPageUrl(null);
  }, [statusName]);

  useEffect(() => {
    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, [properties]);

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('https://offplan-backend.onrender.com/properties/filter/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            statusName === 'Sold Out'
              ? { sales_status: 'Sold Out' }
              : { property_status: statusName === 'Ready' ? 'Ready' : 'Off Plan' }
          ),
        });

        const result = await response.json();

        if (result?.status && result?.data) {
          setProperties(result.data.results || []);
          setNextPageUrl(result.data.next_page_url || null);
        }
      } catch (error) {
        console.error('Error fetching filtered properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (statusName) {
      console.log('Fetching properties for statusName:', statusName);
      fetchFilteredProperties();
    }
  }, [statusName]);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCityCounts = async () => {
      try {
        const status = statusName?.toLowerCase() === 'sold out' ? 'Sold Out'
          : statusName?.toLowerCase() === 'ready' ? 'Ready'
            : 'Off Plan';

        const response = await fetch(
          `https://offplan-backend.onrender.com/properties/city/count/?status=${encodeURIComponent(status)}`
        );
        const data = await response.json();

        if (data?.status && data?.data) {
          setCities(data.data); // assumes API returns [{ name, count }]
        }
      } catch (error) {
        console.error("Failed to fetch city counts:", error);
      }
    };

    if (statusName) {
      fetchCityCounts();
    }
  }, [statusName]);


  useEffect(() => {
    const filters = location.state?.filters;
    if (!filters) return;

    const fetchFilteredProperties = async () => {
      setIsSearchLoading(true);
      try {
        const response = await fetch('https://offplan-backend.onrender.com/properties/filter/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters),
        });
        const result = await response.json();
        if (result.status && result.data) {
          setProperties(result.data.results || []);
          setNextPageUrl(result.data.next_page_url || null);

          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSearchLoading(false);
      }
    };

    fetchFilteredProperties();
  }, [location.state?.filters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   useEffect(() => {
  //   setActiveFilter(statusName);
  // }, [statusName]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const res = await fetch('https://offplan-backend.onrender.com/properties/status-counts/');
        const json = await res.json();

        if (json.status && json.data) {
          const { ready, offplan, sold } = json.data;

          setTotalInventory({
            ready,
            offplan,
            soldout: sold,
            total: ready + offplan + sold
          });
        }
      } catch (error) {
        console.error('Failed to fetch property status counts:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchStatusCounts();
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
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight" id="featured-projects">
            Your Next Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Starts Here</span>
          </h2>
          <div className="relative">
            <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-4 font-medium">
              Buy Ready & Offplan Properties
              in Dubai, Abu Dhabi, and Across the UAE
              Curated for Smart Investors.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            {/* Showing {visibleProjects.length} of {totalInventory[activeFilter].toLocaleString()} properties in Sahar's complete portfolio */}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="hidden sm:flex gap-6">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              const filterCount = totalInventory[filter.key];
              return (
                <button
                  key={filter.label}
                  onClick={() => setStatusName(filter.label)}
                  className={`flex items-center justify-center w-48 h-24 rounded-2xl font-semibold transition-all duration-300 text-sm border-2 ${statusName === filter.label
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl border-pink-300 transform scale-105'
                    : 'bg-white/90 text-gray-700 border-gray-200 hover:border-pink-200 hover:bg-pink-50 shadow-md'
                    }`}
                >
                  <div className="flex items-center gap-5">
                    <IconComponent
                      size={28}
                      className={`${statusName === filter.label ? 'text-white' : 'text-gray-600'
                        }`}
                    />
                    <div className="text-left">
                      <div className="text-base font-semibold mb-1">
                        {filter.label}
                      </div>
                      <div className={`text-2xl font-bold ${statusName === filter.label
                        ? 'text-white'
                        : 'text-gray-800'
                        }`}>
                        {filterCount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="sm:hidden flex gap-3 px-4">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              const filterCount = totalInventory[filter.key];
              return (
                <button
                  key={filter.label}
                  onClick={() => setStatusName(filter.label)}
                  className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl font-semibold transition-all duration-300 text-xs border-2 ${statusName === filter.label
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl border-pink-300 transform scale-105'
                    : 'bg-white/90 text-gray-700 border-gray-200 hover:border-pink-200 hover:bg-pink-50 shadow-md'
                    }`}
                >
                  <IconComponent
                    size={18}
                    className={`mb-1 ${statusName === filter.label ? 'text-white' : 'text-gray-600'
                      }`}
                  />
                  <span className="text-xs font-semibold mb-1 text-center leading-tight">
                    {filter.label}
                  </span>
                  <span className={`text-lg font-bold ${statusName === filter.label
                    ? 'text-white'
                    : 'text-gray-800'
                    }`}>
                    {filterCount > 999 ? `${Math.floor(filterCount / 1000)}k` : filterCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 justify-center">
          {cities
            .filter(city => city && city.city_name && typeof city.property_count === 'number')
            .map((city) => (
              <div
                key={city.city_id}
                className={`border rounded-lg p-4 text-center shadow-md transition-all duration-300 ${city.property_count === 0 ? 'text-gray-400' : 'text-black'
                  }`}
              >
                <h3 className="font-semibold text-md mb-1">{city.city_name}</h3>
                <p
                  className={`text-2xl font-bold ${city.property_count === 0
                      ? 'text-gray-300'
                      : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text'
                    }`}
                >
                  {city.property_count}
                </p>
              </div>
            ))}
        </div>


        {isSearchLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-500 border-opacity-50" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">Oh-Uh! 😕</h3>
            <p className="text-gray-500 text-lg">No properties match your current search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8">
            {properties.map((project, index) => {
              const displayStatus = (() => {
                const normalizedStatus = statusName.toLowerCase();
                if (normalizedStatus === 'ready') return 2;
                if (normalizedStatus === 'off plan') return 1;
                else return 3;
                return project.property_status;
              })();
              console.log("Project Status:", project.sales_status, "Display Status:", displayStatus);
              return (
                (
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
                          <Badge className={`${getStatusBadgeStyle(displayStatus)} font-semibold px-3 py-2 text-sm flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/20`}>
                            {getStatusBadgeContent(displayStatus)}
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
                              <span className="font-medium text-sm sm:text-base truncate">
                                {project.city?.name || 'Unknown City'}, {project.district?.name || 'Unknown District'}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl p-4 border border-pink-100">
                            <div className="text-xs sm:text-sm text-gray-600 mb-1">Starting from</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                              {project.low_price ? `AED ${formatAED(project.low_price)}` : 'AED N/A'}
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
                            <div className="relative">
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl border-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShare(project);
                                }}
                              >
                                {copiedProjectId === project.id ? (
                                  <Check size={18} className="text-green-500 transition" />
                                ) : (
                                  <Share size={18} className="text-blue-500 transition" />
                                )}
                              </Button>

                              {copiedProjectId === project.id && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#7d8bff] text-white text-xs px-2 py-1 rounded shadow">
                                  Link Copied!
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
            })}
          </div>)}

        {/* {hasMoreProjects && ( */}
        {nextPageUrl && <div className="flex justify-center">
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
        </div>}
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
