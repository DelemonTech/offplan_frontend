import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Map, ChevronDown, ChevronUp, Layout, Gift, ShieldCheck, Lock, PhoneCall, Calendar, DollarSign, Maximize2, Clock, User, MessageCircle, Bed, Waves, Dumbbell, Car, Wifi, Shield, Building, Check } from 'lucide-react';
import Header from '../Agent/Header';
import Footer from '../Agent/Footer';
import { Button } from '@/components/ui/button';
import IconWhatsapp from "@/assets/icon-whatsapp.svg";
import logoPath from "@/assets/OFFPLAN_MARKET.png"
import * as LucideIcons from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
// import CallToAction from "@/components/Agent/CallToAction"

const AgentPropDetail = () => {

  const location = useLocation();
  const { t } = useTranslation();
  const agent = location.state?.agent;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const getTimeAgo = (minutesAgo: number) => {
    const now = new Date();
    const past = new Date(now.getTime() - minutesAgo * 60000);
    const diffMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    return diffMinutes < 60 ? `${diffMinutes} minutes ago` : `${diffHours} hours ago`;
  };

  const messages = [
    `Last unit sold ${getTimeAgo(240)}`,
    `Last viewed ${getTimeAgo(20)}`,
    'Last inquiry received 10 minutes ago',
    'Last down payment confirmed 1 hour ago',
    'Last offer negotiated 2 hours ago',
  ];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  const facilityIconMap = {
    "Library": { icon: "BookOpen", color: "text-blue-500" },
    "Mall": { icon: "ShoppingBag", color: "text-pink-500" },
    "Meeting Rooms": { icon: "Users", color: "text-green-500" },
    "Mini Golf": { icon: "Flag", color: "text-lime-500" },
    "Mosque": { icon: "Home", color: "text-emerald-500" },
    "Multipurpose Hall": { icon: "LayoutGrid", color: "text-purple-500" },
    "Music Room": { icon: "Music", color: "text-orange-500" },
    "Nursery": { icon: "Baby", color: "text-pink-400" },
    "Opera house": { icon: "Mic", color: "text-indigo-500" },
    "Paddle playground": { icon: "Racket", color: "text-teal-500" },
    "Pet Shop": { icon: "Dog", color: "text-yellow-500" },
    "Pharmacy": { icon: "Cross", color: "text-red-500" },
    "Playground": { icon: "TreePine", color: "text-green-500" },
    "Private Cinema For Each Unit": { icon: "Clapperboard", color: "text-purple-500" },
    "Private Gym For Each Unit": { icon: "Dumbbell", color: "text-pink-500" },
    "Private Parking for Each unit": { icon: "ParkingCircle", color: "text-gray-500" },
    "Restaurant": { icon: "Utensils", color: "text-red-400" },
    "Retail Shops": { icon: "Store", color: "text-orange-400" },
    "Sauna": { icon: "Steam", color: "text-yellow-500" },
    "School": { icon: "School", color: "text-blue-400" },
    "Security": { icon: "Shield", color: "text-red-600" },
    "Sitting Area": { icon: "Sofa", color: "text-gray-400" },
    "Skate Park": { icon: "Skull", color: "text-emerald-400" },
    "Smart Homes": { icon: "Home", color: "text-purple-500" },
    "Snow Rooms": { icon: "Snowflake", color: "text-cyan-400" },
    "Squash Courts": { icon: "Racket", color: "text-teal-500" },
    "Steam room": { icon: "Droplets", color: "text-blue-500" },
    "Storage Rooms": { icon: "Package", color: "text-gray-400" },
    "Sunken Seating Area": { icon: "Sofa", color: "text-orange-300" },
    "Supermarket": { icon: "ShoppingCart", color: "text-green-600" },
    "Table Tennis Court": { icon: "Racket", color: "text-indigo-500" },
    "Tennis Playground": { icon: "Racket", color: "text-teal-600" },
    "Theater": { icon: "Clapperboard", color: "text-pink-600" },
    "Traverse climbing walls": { icon: "Mountain", color: "text-emerald-600" },
    "VR Game Room": { icon: "Gamepad", color: "text-violet-600" },
    "Veterinary Clinic": { icon: "Dog", color: "text-orange-500" },
    "Volleyball Playground": { icon: "Volleyball", color: "text-yellow-500" },
    "Water Fountain": { icon: "Droplet", color: "text-cyan-500" },
    "Yuga Hall": { icon: "Leaf", color: "text-green-400" },
    "Children's Play Area": { icon: "Baby", color: "text-pink-400" },
    "Covered Parking": { icon: "ParkingCircle", color: "text-gray-400" },
    "Gym": { icon: "Dumbbell", color: "text-pink-500" },
    "Jacuzzi": { icon: "Droplets", color: "text-blue-400" },
    "Swimming Pool": { icon: "Waves", color: "text-blue-500" },
    "BBQ Area": { icon: "Flame", color: "text-orange-500" },
    "Badminton Court": { icon: "Racket", color: "text-lime-500" },
    "Basketball Playground": { icon: "Basketball", color: "text-orange-400" },
    "Beach": { icon: "Waves", color: "text-cyan-500" },
    "Beauty Saloon": { icon: "Scissors", color: "text-pink-400" },
    "Bicycle parking": { icon: "Bike", color: "text-green-500" },
    "Bocce Play Area": { icon: "Circle", color: "text-purple-400" },
    "Cabana Seating": { icon: "Sofa", color: "text-yellow-400" },
    "Cafe": { icon: "Coffee", color: "text-brown-500" },
    "Children's Swimming Pool": { icon: "Waves", color: "text-cyan-400" },
    "Cinema": { icon: "Clapperboard", color: "text-indigo-400" },
    "Clinic": { icon: "Cross", color: "text-red-400" },
    "Club House": { icon: "Building", color: "text-purple-400" },
    "Co-Working Spaces": { icon: "Briefcase", color: "text-teal-400" },
    "Concierge Service": { icon: "UserCheck", color: "text-pink-400" },
    "Consult": { icon: "User", color: "text-indigo-400" },
    "Cycling Track": { icon: "Bike", color: "text-green-400" },
    "Dog Park": { icon: "Dog", color: "text-yellow-400" },
    "Electric Vehicle Charging Stations": { icon: "Zap", color: "text-green-500" },
    "Fitness Club": { icon: "Dumbbell", color: "text-pink-400" },
    "Football Playground": { icon: "Football", color: "text-green-600" },
    "Games Lounge Room": { icon: "Gamepad", color: "text-violet-500" },
    "Garden": { icon: "Flower", color: "text-green-500" },
    "Golf playground": { icon: "Flag", color: "text-lime-400" },
    "Hospital": { icon: "Cross", color: "text-red-500" },
    "Jogging Track": { icon: "Run", color: "text-orange-400" },
    "Lake": { icon: "Droplet", color: "text-blue-400" }
  };

  const formatPrice = (price: string | number) => {
    // Handle string inputs like "AED 1,200,000"
    const numericPrice =
      typeof price === "string"
        ? parseInt(price.replace(/[^\d]/g, ""), 10)
        : price;

    if (numericPrice >= 1_000_000) {
      return `${(numericPrice / 1_000_000).toFixed(1)}M`;
    } else if (numericPrice >= 1_000) {
      return `${(numericPrice / 1_000).toFixed(0)}K`;
    }
    return numericPrice.toString();
  };


  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');

  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const unitRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [showAllSubUnits, setShowAllSubUnits] = useState(false);

  const toggleUnit = (unitType: string) => {
    const clickedElement = unitRefs.current[unitType];
    const topBeforeToggle = clickedElement?.getBoundingClientRect().top ?? 0;

    setExpandedUnit(expandedUnit === unitType ? null : unitType);
    setShowAllSubUnits(false); // Reset sub-unit view toggle

    setTimeout(() => {
      const topAfterToggle = clickedElement?.getBoundingClientRect().top ?? 0;
      const scrollDiff = topAfterToggle - topBeforeToggle;
      window.scrollBy({ top: scrollDiff, behavior: "instant" }); // prevent jump
    }, 50);
  };

  // const agent = {
  //   name: "Sahar",
  //   whatsapp_number: "+971 52 952 9687",
  // };

  const handleWhatsApp = () => {
    const message = `Hi ${agent.name}! I'm interested in ${projectData.title} in ${projectData.city?.name}. Starting from AED ${parseInt(projectData.low_price).toLocaleString()}. Can you share more details?`;
    const whatsappUrl = `https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostUrl = import.meta.env.VITE_HOST_URL
        const response = await fetch(`${hostUrl}/property/${projectId}/`);
        const data = await response.json();
        if (data?.status && data?.data) {
          setProjectData(data.data);
          // console.log(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Property not found.
      </div>
    );
  }

  // Group property_units by room type
  const groupedUnits = projectData.property_units.reduce((acc, unit) => {
    const roomKey = `${unit.apartment_id} {t("Bedroom Apartment")}`; // Group by apartment_id or customize
    if (!acc[roomKey]) {
      acc[roomKey] = [];
    }
    acc[roomKey].push(unit);
    return acc;
  }, {});

  // Map groupedUnits into unitTypes array
  const unitTypes = Object.entries(groupedUnits).map(([type, units]: [string, any[]]) => {
    const subUnits = units.map((unit) => ({
      id: unit.apt_no || `Unit ${unit.id}`,
      floor: unit.floor_no,
      size: `${unit.area} sq.ft`,
      view: unit.view || "N/A",
      price: unit.price,
      floorPlan:
        unit.floor_plan_image?.length > 0
          ? JSON.parse(unit.floor_plan_image)[0]
          : null,
      status: unit.status || "Available", // Default to Available if null
    }));

    const prices = subUnits.map((u) => u.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);



    return {
      type,
      available: units.length,
      startingPrice: minPrice,
      maxPrice: maxPrice,
      icon: <Bed className="text-blue-500" />,
      color: "bg-purple-50",
      subUnits,

    };
  });







  // console.log(projectData.facilities);
  const amenities = projectData.facilities?.map((fac: any) => {
    console.log(fac.name);
    const facilityName = fac?.name || "Unknown";
    const iconInfo = facilityIconMap[facilityName] || { icon: "Sparkle", color: "text-gray-400" }; // Fallback for unknown facilities
    const IconComponent = LucideIcons[iconInfo.icon] || LucideIcons.Sparkle; // dynamically get the icon
    return {
      name: facilityName,
      IconComponent,
      color: iconInfo.color,
    };
  }) || [];

  const paymentPlans = projectData.payment_plans || [];

  const totalUnits = Object.values(groupedUnits)
    .map((units: any[]) => units.length)
    .reduce((sum, len) => sum + len, 0);
  // console.log(totalUnits,'unitttttsssss');

  const totalUnitsText = totalUnits > 9 ? "9+ units left" : `${totalUnits} units left`;

  const propertyStatusMap = {
    1: { name: "Ready", color: "text-green-600" },
    2: { name: "Off Plan", color: "text-yellow-600" },
  };

  const salesStatusMap = {
    1: { name: "Available", color: "text-green-500" },
    2: { name: "Pre Launch", color: "text-yellow-500" },
    4: { name: "Sold Out", color: "text-red-500" },
    5: { name: "Price On Demand", color: "text-blue-500" },
  };

  const propertyStatusId = projectData.property_status;
  const salesStatusId = projectData.sales_status;

  const propertyStatus = propertyStatusMap[propertyStatusId] || { name: "Unknown", color: "text-gray-500" };
  const salesStatus = salesStatusMap[salesStatusId] || { name: "Unknown", color: "text-gray-500" };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header logo={logoPath} />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-xl overflow-hidden mb-5  mx-auto shadow-lg h-[600px]"
      >
        {/* Top Left - Units Left */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-20">
          <span className="text-lg">
            <Check />
          </span>
          {totalUnitsText}
        </div>

        {/* Bottom Right - 3 Labels */}


        {/* Top Right - Property Status */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-800 text-white text-sm font-semibold px-8 py-2 rounded-full shadow-lg z-20">
          {propertyStatus.name}
        </div>

        {/* Image with overlay */}
        {projectData.property_images?.length > 0 && (
          <>
            <img
              src={projectData.cover}
              alt={projectData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/5" />
          </>
        )}

        {/* Centered Hero Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
          >
            {projectData.title}
          </motion.h1>

          <div className="flex items-center text-white font-semibold mt-3 text-sm md:text-base">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            {projectData.district?.name}, {projectData.city?.name}
          </div>



          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white/10 px-4 py-1 rounded-full mb-8 text-white text-xs md:text-sm font-medium shadow-md"
            >
              {messages[currentMessageIndex]}
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm md:text-base font-semibold mt-15 py-5">
            {[
              { text: 'Free DLD – Today Only', color: 'bg-green-100 text-emerald-700', icon: <Gift className="w-4 h-4 md:w-5 md:h-5" /> },
              { text: 'Guaranteed ROI Contract', color: 'bg-blue-100 text-blue-700', icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> },
              { text: 'Zero Risk – Escrow Protected', color: 'bg-purple-100 text-purple-700', icon: <Lock className="w-4 h-4 md:w-5 md:h-5" /> },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-2 rounded-[10px] shadow-md ${item.color}`}
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>


      {/* Thumbnails Below Hero */}


      {/* Unit Type Cards (Summary) */}

      <div className="max-w-7xl mx-auto px-4 py-4 mt-20">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-20 sm:text-left bg-white p-6 rounded-xl shadow-md">

          {/* Sales Status Badge inside the grid container */}
          <span
            className={`absolute top-4 left-4 right-auto md:left-auto md:right-4 bg-gradient-to-r from-pink-500 to-purple-600  text-sm font-bold text-white px-4 py-1.5 rounded-full shadow-md z-10`}
            style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.1)' }}
          >
            {salesStatus.name}
          </span>

          {/* Price Range */}
          <div className="flex items-center gap-3 bg-pink-50 p-4 rounded-xl">
            <div className="bg-pink-500 text-white p-2 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-700">Price Range</p>
              <p className="font-bold text-md">AED 850K – 2.65M</p>
            </div>
          </div>

          {/* Area Range */}
          <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-700">Area Range</p>
              <p className="font-bold text-md">450 – 1,400 sq.ft.</p>
            </div>
          </div>

          {/* Handover */}
          <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl">
            <div className="bg-green-500 text-white p-2 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-700">Handover</p>
              <p className="font-bold text-md">Q4 2025</p>
            </div>
          </div>

          {/* Payment Plan */}
          <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-700">Payment Plan</p>
              <p className="font-bold text-md">20% Down</p>
            </div>
          </div>
        </div>
      </div>


      {/* Expanded Unit Type Cards */}
      <div className="mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-extrabold text-center text-gray-600 mb-8">
          Available Unit Types
        </h2>

        <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
          {unitTypes.map((unit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleUnit(unit.type)}
              ref={(el) => (unitRefs.current[unit.type] = el)}
              className="group rounded-2xl bg-white shadow-lg border hover:border-purple-400 transition duration-300 cursor-pointer"
            >
              {/* Top Summary */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${unit.color} flex items-center justify-center text-xl sm:text-2xl shadow-md group-hover:scale-105 transition`}>
                    {unit.icon}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{unit.type}</h4>
                    <p className="text-sm text-gray-500">{unit.available} units available</p>
                    <div className="flex justify-between text-xs font-semibold text-blue-600 mt-1 w-full sm:w-auto">
                      <span>Min: AED {formatPrice(unit.startingPrice)}</span>
                      <span className="ml-4">Max: AED {formatPrice(unit.maxPrice)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <p className="text-xs text-gray-400">Starting from</p>
                  <p className="font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text text-base sm:text-lg">
                    AED {formatPrice(unit.startingPrice)}
                  </p>
                </div>
              </div>

              {/* Expand/Collapse */}
              <div className="flex justify-center py-2 border-t">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUnit(unit.type);
                  }}
                  className="flex items-center gap-1 text-purple-600 font-medium hover:text-purple-800 transition text-sm"
                >
                  {expandedUnit === unit.type ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Units
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      View Units
                    </>
                  )}
                </button>
              </div>

              {/* Sub-Units */}
              {expandedUnit === unit.type && unit.subUnits.length > 0 && (
                <div className="bg-gray-50 rounded-b-2xl p-4 border-t">
                  <div
                    className={`grid gap-4 ${unit.subUnits.length === 1
                        ? 'grid-cols-1'
                        : unit.subUnits.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      }`}
                  >
                    {unit.subUnits.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="rounded-xl border p-3 shadow-sm bg-white hover:shadow-md transition"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-800">
                            Apt {sub.id}
                          </span>
                          <span
                            className={`text-xs font-semibold ${sub.status === 'Available'
                                ? 'text-green-600'
                                : 'text-red-500'
                              }`}
                          >
                            {sub.status || 'N/A'}
                          </span>
                        </div>
                        <ul className="text-gray-500 text-xs mb-2">
                          <li>Floor: {sub.floor || 'N/A'}</li>
                          <li>Size: {sub.size}</li>
                          <li>View: {sub.view}</li>
                        </ul>
                        <p className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                          AED {formatPrice(sub.price)}
                        </p>
                        {sub.floorPlan && (
                          <div className="mt-2 relative rounded overflow-hidden">
                            <img
                              src={sub.floorPlan}
                              alt={`Floor plan for ${sub.id}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                              <span className="text-xs sm:text-sm md:text-base font-bold text-gray-200 rotate-0 tracking-widest">
                                OFFPLAN.MARKET
                              </span>
                            </span>
                          </div>
                        )}
                        <div className="mt-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Viewing details for Apt ${sub.id}`);
                            }}
                            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-xl shadow hover:shadow-lg hover:from-pink-600 hover:to-purple-700 transition"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {expandedUnit === unit.type && unit.subUnits.length === 0 && (
                <div className="bg-gray-50 rounded-b-2xl p-4 text-center text-gray-500 border-t text-sm">
                  No units available in this category
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-extrabold text-left text-gray-600 mb-8">
          About {projectData.title}
        </h2>
        <div
          className="text-gray-600 prose prose-p"
          dangerouslySetInnerHTML={{ __html: projectData.description }}
        ></div>
      </div>

      {/* Location Section */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow mx-auto max-w-7xl">
        <h3 className="text-2xl  flex items-center gap-2  sm:text-3xl md:text-4xl mt-5 font-extrabold text-center text-gray-600 mb-8">
          <Map className="w-5 h-5 text-pink-600" /> Location & Address
        </h3>
        <p className="flex items-center gap-1 text-gray-700 font-semibold">
          <MapPin className="w-4 h-4 text-pink-600" />
          {projectData.title}
        </p>
        <p className="text-gray-500 mb-4">{projectData.city.name}, {projectData.district.name}</p>
        <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={`https://maps.google.com/maps?q=${projectData.address}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      {amenities.length > 0 && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow mx-auto max-w-7xl">
          <h3 className="text-3xl font-extrabold text-left mb-8 text-gray-900">Amenities</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition text-center"
              >
                <amenity.IconComponent className="w-7 h-7 text-pink-500" />
                <span className="text-md font-semibold text-gray-800">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* {amenities.length > 0 && (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow mx-auto max-w-7xl">
      <h3 className="text-3xl md:text-3xl font-extrabold text-center mb-10 text-gray-600">
        Amenities
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3 bg-gray-10 p-3 rounded-xl border hover:border-purple-300">
            <amenity.IconComponent className={`w-5 h-5 ${amenity.color}`} />
            <span className="sm:text-gray-800 font-medium">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  )} */}

      {/* Payment Plans */}
      {paymentPlans.length > 0 && (
        <div className="mb-10 rounded-3xl max-w-7xl mx-auto bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl p-6">
          <h3 className="text-3xl md:text-3xl font-extrabold text-center mb-10 text-gray-600">
            Payment Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {paymentPlans.map((plan, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-5 border-b pb-3">
                  <h4 className="text-xl font-bold text-purple-600">{plan.name}</h4>
                  <p className="text-sm text-gray-500 italic">{plan.description}</p>
                </div>
                <div className="space-y-4">
                  {plan.values.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md">
                          {idx + 1}
                        </span>
                        <span className="text-gray-800 font-medium">{val.name}</span>
                      </div>
                      <span className="text-blue-700 font-bold">{val.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center items-center gap-2 text-gray-700 font-semibold text-lg">
            {/* Clock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* Handover Text */}
            <span>
              Handover:{" "}
              {new Date(projectData.delivery_date * 1000).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-3xl p-10 max-w-5xl mx-auto my-12 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          Ready to Make This Your Home?
        </h2>
        <p className="text-base md:text-lg text-white/90 mb-6">
          Contact Sahar today for exclusive access and personalized assistance
        </p>

        {/* Call Now Button */}
        <div className="mb-3">
          <a
            href="tel:+971500000000" // Replace with real number
            className="w-50 md:w-2/3 bg-white text-pink-600 font-medium py-3 px-6 rounded-md shadow-md hover:bg-gray-50 flex items-center justify-center mx-auto gap-2 transition"
          >
            <PhoneCall className="w-5 h-5" />
            Call Now
          </a>
        </div>

        {/* WhatsApp Button */}
        <div className="mb-3">
          <a
            href="https://wa.me/971500000000" // Replace with real WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-2/3 bg-green-600 text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-green-700 flex items-center justify-center mx-auto gap-2 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Placeholder Input or Button */}
        <div>
          <input
            type="text"
            placeholder="Leave your message"
            className="w-full md:w-2/3 py-3 px-6 rounded-md text-white bg-white/10 backdrop-blur-md border border-white/50 text-center placeholder-white/70 focus:outline-none mx-auto block shadow-lg"
          />
        </div>

      </div>

      <Footer />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          onClick={handleWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl animate-pulse"
          size="icon"
        >
          <img src={IconWhatsapp} alt="WhatsApp" className="w-8 h-8 object-contain" />
        </Button>
      </div>
    </div>
  );
};
export default AgentPropDetail;