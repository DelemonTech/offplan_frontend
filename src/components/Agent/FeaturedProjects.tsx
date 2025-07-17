import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Check, Loader2, RefreshCw, Lock, Building2, Globe2, Repeat, MessageCircle, Ruler, CreditCard, Share, BookLock, EarthLock, LucideEarthLock, Globe, Star, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProjectSummaryModal from './ProjectSummaryModal';
import { set } from 'date-fns';
import { useInView } from 'react-intersection-observer';
import { useCountSequenceOnView } from '@/hooks/useCountSequenceOnView';
import CountUp from 'react-countup';
import PropertyDetailsModal from "@/components/Agent/PropertyDetails"
import IconWhatsapp from "@/assets/icon-whatsapp.svg"
import IconGuarantee from "@/assets/guarantee.png"
import IconShield from "@/assets/shield.png"
// import PropertyDetails1 from '../Agent/PropertyDetails1';



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
  propertyStatus,
  selectedPropertySubtype,
  setPropertyStatus,
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
  setIsSearchLoading,
  subunit_count,
  setSubUnitCount,
  isCitiesLoading
}) => {

  // const navigate = useNavigate();

  const hostUrl = import.meta.env.VITE_HOST_URL;

  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchFilters, setSearchFilters] = useState(null);

  // const [activeFilter, setActiveFilter] = useState('ready');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectForSummary, setSelectedProjectForSummary] = useState(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const firstNewCardRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { showFilters } = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleOpenModal = () => {
    setCurrentImageIndex(0); // call before opening
    setIsModalOpen(true);
  };


  const [copiedProjectId, setCopiedProjectId] = useState<number | null>(null);

  const filters = [
    { id: 3, key: "total", label: 'All', icon: Globe2 },
    { id: 1, key: 'ready', label: 'Ready', icon: Check },
    { id: 2, key: 'offplan', label: 'Off Plan', icon: Building2 }
  ];
  const [totalInventory, setTotalInventory] = useState({
    total: 0,
    ready: 0,
    offplan: 0
  });
  const counts = filters.map(f => totalInventory[f.key] || 0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const animatedCounts = useCountSequenceOnView(counts, inView);


  // const formatDeliveryDate = (unixTimestamp: string | number) => {
  //   if (!unixTimestamp) return "N/A";
  //   // Convert to number and then to milliseconds
  //   const date = new Date(Number(unixTimestamp) * 1000);

  //   // Example output: "June 2028"
  //   const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  //   return date.toLocaleDateString("en-US", options);
  // };
  const formatDeliveryDate = (yyyymm: string | number) => {
    if (!yyyymm) return "N/A";

    const str = yyyymm.toString();
    if (str.length !== 6) return "Invalid Date";

    const year = str.slice(0, 4);
    const monthIndex = parseInt(str.slice(4, 6), 10) - 1; // 0-indexed for JS Date

    const date = new Date(Number(year), monthIndex);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };

    return date.toLocaleDateString("en-US", options); // e.g., "September 2023"
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


  const visibleProjects = properties.slice(0, visibleCount);

  const getStatusBadgeContent = (status: number, property?: any) => {
    const actualStatus = property?.property_status;

    const resolveByStatus = (statusValue: number) => {
      switch (statusValue) {
        case 1:
          return (
            <>
              <Building2 size={16} className="text-white" />
              <span className="ml-1">Off Plan</span>
            </>
          );
        case 2:
          return (
            <>
              <Check size={16} className="text-white" />
              <span className="ml-1">Ready</span>
            </>
          );
        default:
          return (
            <>
              <span className="ml-1">{property?.property_status || 'General'}</span>
            </>
          );
      }
    };

    if (status === 3) {
      return resolveByStatus(actualStatus);
    }

    return resolveByStatus(status);
  };



  const getStatusBadgeStyle = (status: number, property?: any) => {
    const effectiveStatus = status === 3 ? property?.property_status : status;

    switch (effectiveStatus) {
      case 1: // Off Plan
        return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg';
      case 2: // Ready
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg';
    }
  };




  const loadMore = async () => {
    if (!nextPageUrl || isLoading) return;

    document.body.classList.add('freeze-scroll');
    setIsLoading(true);
    await Promise.resolve();

    // Construct full filters
    const filters = {
      city: selectedCity || '',
      district: selectedNeighborhood || '',
      property_type: propertyType || '',
      unit_type: selectedPropertySubtype || '',
      rooms: propertyType === 'Residential' ? bedrooms?.toString() : '',
      delivery_year: deliveryYear ? parseInt(deliveryYear) : 0,
      low_price: priceRange[0],
      max_price: priceRange[1],
      min_area: areaRange[0],
      max_area: areaRange[1],
      ...(statusName !== 'All' && { property_status: statusName }),
      // sales_status: '',
    };

    if (statusName === "All") {
      setSelectedCity('');
      setSelectedNeighborhood('');
      setDeveloper('');
    }
    // Apply the status filter
    // if (statusName.toLowerCase() === 'sold out') {
    //   filters.sales_status = 'Sold Out';
    // } else 
    if (['ready', 'off plan'].includes(statusName.toLowerCase())) {
      filters.property_status = statusName;
    }

    try {
      const secureUrl = nextPageUrl.replace('http://', 'https://');

      const response = await fetch(secureUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchFilters || filters), // ✅ pass complete filter object
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

  const [loadingProjectId, setLoadingProjectId] = useState(null);

  const handleViewDetails = async (projectId) => {
    try {
      setLoadingProjectId(projectId); // show loader for this button

      const res = await fetch(`https://panel.estaty.app/api/v1/getProperty?id=${projectId}`, {
        method: 'POST',
        headers: {
          'App-key': import.meta.env.VITE_ESTATY_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      console.log("project ID : ", projectId);

      const data = await res.json();
      console.log("data : ", data);

      setSelectedProperty(data.property);

      navigate(`/agent/${agent.username}/property-details/?id=${projectId}`, {
        state: { agent }
      });
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoadingProjectId(null); // remove loader
    }
  };

  const handleProjectSummary = (project: any) => {
    // console.log('FeaturedProjects - Setting project for summary:', project);
    setSelectedProjectForSummary(project);
    setIsSummaryModalOpen(true);
  };

  const handleWhatsApp = (project: any) => {
    const message = `Hi ${agent.name}! I'm interested in ${project.title} in ${project.location}. Starting from AED ${parseInt(project.price).toLocaleString()}. Can you share more details?`;
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
    const fetchCityCounts = async () => {
      try {
        let status;

        if (statusName?.toLowerCase() === 'sold out') {
          status = 'Sold Out';
        } else if (statusName?.toLowerCase() === 'ready') {
          status = 'Ready';
        } else if (statusName?.toLowerCase() === 'off plan') {
          status = 'Off Plan';
        } else if (statusName?.toLowerCase() === 'all') {
          status = 'Total'; // ✅ NEW: Handle Total status
        } else {
          console.warn("Unknown statusName:", statusName);
          return; // Exit early for invalid status
        }

        const response = await fetch(
          `${hostUrl}/properties/city/count/?status=${encodeURIComponent(status)}`
        );
        const data = await response.json();

        if (data?.status && data?.data) {
          setCities(data.data); // API returns [{ city_id, city_name, property_count, ... }]
          console.log("CITIES:", cities);
        }

        if (data?.data?.length > 0) {
          const firstCity = data.data[0];
          setSelectedCity(firstCity);

          const updatedFilters = {
            city: firstCity.city_name,
            property_status: statusName,
          };

          setSearchFilters(updatedFilters);

          navigate(location.pathname, {
            state: { filters: updatedFilters },
          });
        }
      } catch (error) {
        console.error("❌ Failed to fetch city counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (statusName) {
      fetchCityCounts();
    }
  }, [statusName]);


  useEffect(() => {
    const fetchFilteredProperties = async () => {
      try {
        setIsLoading(true);
        document.body.style.overflow = 'hidden';

        const response = await fetch(`${hostUrl}/properties/filter/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            // statusName === 'Sold Out'
            //   ? { sales_status: 'Sold Out' }
            //   : 
            statusName === 'All' || statusName === 'Total'
              ? {}
              : { property_status: statusName }
          ),
        });

        const result = await response.json();

        if (result?.status && result?.data) {
          setProperties(result.data.results || []);
          setNextPageUrl(result.data.next_page_url || null);
        }

        const section = document.getElementById('featured-projects');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (error) {
        console.error('Error fetching filtered properties:', error);
      } finally {
        document.body.style.overflow = 'auto';
        setIsLoading(false);
      }
    };

    if (statusName) {
      console.log('Fetching properties for statusName:', statusName);
      fetchFilteredProperties();
    }
  }, [statusName]);

  const [cities, setCities] = useState([]);


  // const cities1 = [
  //   { city_id: 1, city_name: 'Dubai', property_count: 120 },
  //   { city_id: 2, city_name: 'Abu Dhabi', property_count: 85 },
  //   { city_id: 3, city_name: 'Sharjah', property_count: 45 },
  //   { city_id: 4, city_name: 'Ajman', property_count: 30 },
  //   { city_id: 5, city_name: 'Al Ain', property_count: 20 },
  //   { city_id: 6, city_name: 'Fujairah', property_count: 15 },
  //   { city_id: 7, city_name: 'Umm Al Quwain', property_count: 10 },
  //   { city_id: 8, city_name: 'Ras Al Khaimah', property_count: 5 },
  //   { city_id: 9, city_name: 'Kalba', property_count: 3 },
  //   { city_id: 10, city_name: 'Dibba', property_count: 2 },
  //   // { city_id: 11, city_name: 'Khor Fakkan', property_count: 1 },
  //   { city_id: 12, city_name: 'Hatta', property_count: 0 },
  // ];

  // const totalCities = cities.length;

  // const firstRow =
  //   totalCities <= 7 ? cities : cities.slice(0, 7);
  // const secondRow =
  //   totalCities > 7 ? cities.slice(7, 12) : [];

  // const getColsClass = (length: number) => {
  //   switch (length) {
  //     case 1: return 'xl:grid-cols-1';
  //     case 2: return 'xl:grid-cols-2';
  //     case 3: return 'xl:grid-cols-3';
  //     case 4: return 'xl:grid-cols-4';
  //     case 5: return 'xl:grid-cols-5';
  //     case 6: return 'xl:grid-cols-6';
  //     case 7: return 'xl:grid-cols-7';
  //     default: return 'xl:grid-cols-7';
  //   }
  // };


  useEffect(() => {
    const filters = location.state?.filters;
    if (!filters) return;

    const fetchFilteredProperties = async () => {
      setIsSearchLoading(true);
      // document.body.style.overflow = 'hidden';
      try {
        const response = await fetch(`${hostUrl}/properties/filter/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters),
        });
        const result = await response.json();
        if (result.status && result.data) {
          setProperties(result.data.results || []);
          setNextPageUrl(result.data.next_page_url || null);

          // setTimeout(() => {
          //   window.scrollTo({ top: 930, behavior: 'smooth' });
          // }, 100);
        }
        const section = document.getElementById('featured-projects');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        document.body.style.overflow = 'auto';
        setIsSearchLoading(false);
      }
    };

    fetchFilteredProperties();
  }, [location.state?.filters]);

  // useEffect(() => {
  //   window.scrollTo({ top: 930, behavior: 'smooth' });
  // })

  //   useEffect(() => {
  //   setActiveFilter(statusName);
  // }, [statusName]);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const res = await fetch(`${hostUrl}/properties/status-counts/`);
        const json = await res.json();

        if (json.status && json.data) {
          const { ready, offplan } = json.data;

          setTotalInventory({
            ready,
            offplan,
            total: ready + offplan,
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

  const [showFloatingBar, setShowFloatingBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 300; // adjust this value as needed

      if (scrollY > triggerPoint) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const maxPerRow = 6;
  const rows = chunkArray(cities, maxPerRow);

  const handleCityClick = (city) => {
    const currentFilters = { ...(location.state?.filters || {}) };

    // Remove unwanted keys
    delete currentFilters.property_type;
    delete currentFilters.propertyType;
    delete currentFilters.property_status;
    // delete currentFilters.sales_status;

    // Decide which status key to use
    const propertyStatusLabels = ['Ready', 'Off Plan'];
    const statusKey = propertyStatusLabels.includes(statusName) ? 'property_status' : '';

    const updatedFilters = {
      ...currentFilters,
      city: city.city_name, // or use city.city_id if needed
      [statusKey]: statusName,
    };

    console.log("Updated filters:", updatedFilters);

    setSelectedCity(city);

    setSearchFilters(updatedFilters);

    navigate(location.pathname, {
      state: { filters: updatedFilters },
    });
  };

  //   useEffect(() => {
  //   if (rows.length > 0) {
  //     setSelectedCity(rows[0]);
  //   }
  // }, [rows]);

  const [citiesReady, setCitiesReady] = useState(false);

  useEffect(() => {
    if (cities.length > 0) {
      setCitiesReady(true); // API gave cities
    }
  }, [cities]);

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

        <div className="flex justify-center mb-5">
          {/* Desktop */}
          <div className="hidden sm:flex gap-6">
            {filters.map((filter, index) => {
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
                      <div className="text-base font-semibold mb-1">{filter.label}</div>
                      <div
                        className={`text-2xl font-bold ${statusName === filter.label ? 'text-white' : 'text-gray-800'
                          }`}
                      >
                        <CountUp end={filterCount} duration={1.75} delay={index} separator="," />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex gap-3 px-4">
            {filters.map((filter, index) => {
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
                  <span
                    className={`text-lg font-bold ${statusName === filter.label ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    <CountUp end={filterCount} duration={1.5} delay={index} separator="," />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center px-4 py-6 w-full">
          {rows.length > 0 &&
            rows.map((row, rowIndex) => {
              const filteredRow = row.filter(city => city.property_count >= 2);

              // Skip row if all cities were filtered out
              if (filteredRow.length === 0) return null;

              return (
                <div
                  key={rowIndex}
                  className={`grid 
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-${Math.min(filteredRow.length, 7)}
            gap-4 
            w-full 
            max-w-screen-xl 
            mb-6`}
                >
                  {filteredRow.map((city, index) => {
                    const isSelected = selectedCity?.city_id === city.city_id;

                    return (
                      <button
                        key={city.city_id}
                        onClick={() => handleCityClick(city)}
                        className={`border rounded-lg p-4 text-center shadow-md transition-all duration-300 hover:shadow-xl focus:outline-none
                  ${isSelected ? "ring-2 ring-pink-300 bg-gradient-to-r from-pink-300 via-purple-200 to-purple-300" : "bg-white"}
                `}
                      >
                        <h3
                          className={`font-semibold text-md mb-1 
                    ${isSelected
                              ? "font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
                              : "text-gray-700"}
                  `}
                        >
                          {city.city_name}
                        </h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                          <CountUp
                            end={city.property_count}
                            duration={1.5}
                            delay={index}
                            separator=","
                          />
                        </p>
                      </button>
                    );
                  })}
                </div>
              );
            })}
        </div>


        <div
          className={`relative ${isSearchLoading ? "h-screen overflow-y-auto" : ""
            }`}
        >

          {isSearchLoading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-pink-500 border-opacity-50 mb-4" />
              <div className="flex flex-col items-center">
                <span className="text-[#f24ca0] font-semibold text-lg">Loading properties ...</span>
              </div>
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
                  // return project.property_status;
                })();
                console.log("Project Status:", project.property_status, "Display Status:", displayStatus);
                // console.log("Subunit count: ",project.subunit_count);
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
                          {/* Top Left - Units Left */}
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-700 text-white text-sm font-semibold px-2 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-20">
                            <div className="bg rounded-full pl-1">
                              <Star className="w-3 h-3 text-white-600 font-bold" strokeWidth={4} fill='white' />
                            </div>
                            {project.subunit_count} <span className='pr-1'>left</span>
                          </div>
                          <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-52 sm:h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <div className="absolute top-4 right-4">
                            <Badge className={`
                            ${getStatusBadgeStyle(displayStatus)}
                            inline-flex items-center gap-1 px-3 py-1.5
                            rounded-full text-sm font-medium
                            border-2 border-white/20 shadow-lg
                          `}>
                              {getStatusBadgeContent(displayStatus, project)}
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
                              {/* <div className="pt-3 flex flex-row gap-1">
                              <img src={IconGuarantee}
                                className='h-5 w-5' />
                              <span className='text-xs text-blue-500'>Guaranteed ROI Contract</span>
                            </div> */}
                              {project.guarantee_rental_guarantee && (
                                <div className="pt-3 flex flex-row gap-1">
                                  <img src={IconGuarantee} className="h-5 w-5" />
                                  <span className="text-xs text-blue-500">Guaranteed ROI Contract</span>
                                </div>
                              )}
                              {(displayStatus === 3 ? project?.property_status : displayStatus) !== 2 && (
                                <div className='flex flex-row items-center gap-1 bg-white rounded-full px-3 py-1.5 shadow border border-green-100'>
                                  <img src={IconShield} className='h-4 w-5' />
                                  <span className='text-xs text-green-500 font-medium'>Zero Risk – Escrow Protected</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 pt-2">
                              <button
                                onClick={() => handleViewDetails(project.id)}
                                disabled={loadingProjectId === project.id} // disable button while loading
                                className={`inline-flex items-center justify-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl shadow 
                                ${loadingProjectId === project.id
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                  } transition`}
                              >
                                {loadingProjectId === project.id ? (
                                  <>
                                    <svg
                                      className="animate-spin h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-11v4a5 4 0 00-6 4H4z"
                                      ></path>
                                    </svg>
                                    Loading...
                                  </>
                                ) : (
                                  "See Availability"
                                )}
                              </button>

                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 rounded-xl border-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWhatsApp(project);
                                }}
                              >
                                <img
                                  src={IconWhatsapp}
                                  alt="WhatsApp"
                                  className="w-8 h-8 object-contain" // ✅ consistent sizing
                                />
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
              }
              )}
            </div>)}
        </div>

        {/* {hasMoreProjects && ( */}
        {nextPageUrl && <div className="flex justify-center pt-8">
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

      {showFloatingBar && (<div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex rounded-t-2xl overflow-hidden shadow-xl">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center w-1/2 bg-green-500 hover:bg-green-600 text-white py-4 font-semibold text-lg transition-all duration-300"
        >
          <img src={IconWhatsapp} alt="WhatsApp" className="w-6 h-6 mr-2" />
          WhatsApp
        </button>

        {/* Call Now Button */}

        <button
          onClick={() => { window.location.href = `tel:${agent.phone_number}`; }}
          className="flex items-center justify-center w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-4 font-semibold text-lg transition-all duration-300"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </button>
      </div>)}

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
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)
        }
        agent={agent}
        setCurrentImageIndex={setCurrentImageIndex}
        currentImageIndex={currentImageIndex}
      />
    </section>
  );
};

export default FeaturedProjects;
