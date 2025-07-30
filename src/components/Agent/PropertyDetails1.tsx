import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, ChevronDown, Building2, Check, Lock, ChevronUp, Maximize2, Layout, Bed, Waves, Dumbbell, Car, Wifi, Shield, Building, DollarSign, Ruler, Handshake, BarChart2, Compass, Gift, ShieldCheck, Star, Phone } from 'lucide-react';
import { AnimatePresence, motion, propEffect } from 'framer-motion';
import Header from '../Agent/Header';
import Footer from '../Agent/Footer';
import { Button } from '@/components/ui/button';
import IconWhatsapp from "@/assets/icon-whatsapp.svg";
import logoPath from "@/assets/OFFPLAN_MARKET.png"
import * as LucideIcons from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconGuarantee from "@/assets/guarantee.png";
import IconShield from "@/assets/shield.png";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { formatAED } from '@/utils/FormatAED';
import { handleWhatsApp } from '@/utils/WhatsAppShare';

// import CallToAction from "@/components/Agent/CallToAction"

const PropertyDetails1 = () => {

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log('lng', lng);

    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };
  const lang = i18n.language || 'en';

  const location = useLocation();
  const [agent, setAgent] = useState<any>(location.state?.agent || null);
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const username = segments[1]; // ✅ directly get username from URL
  const hostUrl = import.meta.env.VITE_HOST_URL;

  // If agent is null, fetch agent immediately
  if (!agent && username) {
    fetch(`${hostUrl}/agent/${username}`)
      .then((res) => res.json())
      .then((agentData) => {
        if (agentData?.status && agentData?.data) {
          setAgent(agentData.data); // ✅ Set agent in state
        } else {
          console.error("Agent not found");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch agent:", err);
      });
  }

  // console.log("Agent:", agent);

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

  // const hostUrl = import.meta.env.VITE_HOST_URL;

  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const unitRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [showAllSubUnits, setShowAllSubUnits] = useState(false);

  // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const toggleUnit = (unitKey: string) => {
    const clickedElement = unitRefs.current[unitKey];
    const topBeforeToggle = clickedElement?.getBoundingClientRect().top ?? 0;

    setExpandedUnit(prev => (prev === unitKey ? null : unitKey));
    setShowAllSubUnits(false);

    setTimeout(() => {
      const topAfterToggle = clickedElement?.getBoundingClientRect().top ?? 0;
      const scrollDiff = topAfterToggle - topBeforeToggle;
      window.scrollBy({ top: scrollDiff, behavior: "instant" });
    }, 50);
  };

  // const groupedUnits = projectData.property_units.reduce((acc, unit) => {
  //   const roomKey = `${unit.apartment_id} Bedroom Apartment`; // Group by apartment_id or customize
  //   if (!acc[roomKey]) {
  //     acc[roomKey] = [];
  //   }
  //   acc[roomKey].push(unit);
  //   return acc;
  // }, {});


  // const agent = {
  //   name: "Sahar",
  //   whatsapp_number: "+971 52 952 9687",
  // };

//    const handleWhatsApp = (project: any) => {
//   // Debug logging to see the actual data structure
//   console.log('Agent object:', agent);
//   console.log('Project object:', project);
//   console.log('Agent name structure:', agent?.name);
//   console.log('Project title structure:', project?.title);

//   // Safe extraction with fallbacks
//   const localizedAgentName = (() => {
//     if (!agent?.name) return 'Agent';
    
//     // If agent.name is a string, use it directly
//     if (typeof agent.name === 'string') return agent.name;
    
//     // If it's an object with language keys
//     return agent.name[i18n.language] || agent.name.en || agent.name.ar || 'Agent';
//   })();

//   const projectTitle = (() => {
//     if (!project?.title) return 'a property';
    
//     // If project.title is a string, use it directly
//     if (typeof project.title === 'string') return project.title;
    
//     // If it's an object with language keys
//     return project.title[i18n.language] || project.title.en || project.title.ar || 'a property';
//   })();

//   const cityName = (() => {
//     if (!project?.city) return 'Dubai';
    
//     // Handle different city name structures
//     if (typeof project.city === 'string') return project.city;
//     if (typeof project.city.name === 'string') return project.city.name;
//     if (typeof project.city.name === 'object') {
//       return project.city.name[i18n.language] || project.city.name.en || project.city.name.ar || 'Dubai';
//     }
    
//     return 'Dubai';
//   })();

//   const projectPrice = project?.low_price ? formatAED(project.low_price) : 'competitive prices';
//   const projectId = project?.id || '';

//   const translations = {
//     en: `Hi ${localizedAgentName}! I'm interested in ${projectTitle} in ${cityName}. Starting from AED ${projectPrice}. Can you share more details?${projectId ? `\n\nProperty Link: https://offplan.market/sahar/property-details/?id=${projectId}` : ''}`,

//     ar: `مرحبًا ${localizedAgentName}، أنا مهتم بـ ${projectTitle} في ${cityName}. تبدأ الأسعار من AED ${projectPrice}. هل يمكنك مشاركة المزيد من التفاصيل؟${projectId ? `\n\nرابط العقار: https://offplan.market/sahar/property-details/?id=${projectId}` : ''}`,

//     fa: `${localizedAgentName} عزیز، من به ${projectTitle} در ${cityName} علاقه‌مندم. قیمت‌ها از AED ${projectPrice} شروع می‌شود. می‌تونی اطلاعات بیشتری ارسال کنی؟${projectId ? `\n\nلینک ملک: https://offplan.market/sahar/property-details/?id=${projectId}` : ''}`
//   };

//   const message = translations[i18n.language] || translations.en;
//   const whatsappUrl = `https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
  
//   console.log('Final message:', message); // Debug the final message
//   window.open(whatsappUrl, '_blank');
// };

  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (!projectId) return;
    let intervalRef: NodeJS.Timeout;
    const fetchData = async () => {
      try {
        const response = await fetch(`${hostUrl}/property/${projectId}/`);
        const data = await response.json();
        if (data?.status && data?.data) {
          setProjectData(data.data);
          // console.log(data.data);

          if (!agent && data.data.agent_id) {
            const agentResponse = await fetch(`${hostUrl}/agent/${data.data.agent_id}/`);
            const agentData = await agentResponse.json();
            if (agentData?.status && agentData?.data) {
              setAgent(agentData.data);
            }
          }
          // if (data.data.id) {
          //   try {
          //     const messageResponse = await fetch(`https://offplan-backend.onrender.com/property/${data.data.id}/messages/`);
          //     const messageData = await messageResponse.json();

          //     if (messageData?.status && Array.isArray(messageData.data)) {
          //       setMessages(messageData.data); // Set fetched messages
          //     } else {
          //       setMessages([
          //         "Last unit sold 2 hours ago",
          //         "Last viewed 5 minutes ago",
          //         "Last inquiry received 10 minutes ago",
          //       ]); // fallback messages
          //     }
          //   } catch (msgErr) {
          //     console.error("Failed to fetch messages:", msgErr);
          //     setMessages([
          //       "Last unit sold 2 hours ago",
          //       "Last viewed 5 minutes ago",
          //       "Last inquiry received 10 minutes ago",
          //     ]); // fallback messages
          //   }
          // }

          // Generate dynamic messages with random times
          const randomMessages = [
            `${t("Last unit sold")} ${getRandomNumber(1, 5)} ${t("hours ago")}`,
            `${t("Last viewed")} ${getRandomNumber(1, 30)} ${t("minutes ago")}`,
            `${t("Last inquiry received")} ${getRandomNumber(1, 60)} ${t("minutes ago")}`,
            `${t("Last offer negotiated")} ${getRandomNumber(1, 3)} ${t("hours ago")}`,
            `${t("Last down payment confirmed")} ${getRandomNumber(10, 50)} ${t("minutes ago")}`,
          ];

          setMessages(randomMessages);

          // Start interval for rotating messages
          intervalRef = setInterval(() => {
            setCurrentMessageIndex((prevIndex) =>
              randomMessages.length > 0 ? (prevIndex + 1) % randomMessages.length : 0
            );
          }, 10000);


          // Start interval for rotating messages
          // intervalRef = setInterval(() => {
          //   setCurrentMessageIndex((prevIndex) =>
          //     messages.length > 0 ? (prevIndex + 1) % messages.length : 0
          //   );
          // }, 10000);
        }
      } catch (err) {
        console.error('Failed to fetch project/agent:', err);
      } finally {
        setLoading(false);
      }
    };


    const getRandomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    fetchData();
    return () => {
      if (intervalRef) clearInterval(intervalRef);
    };
  }, [projectId]);

  // console.log('projectttt', projectData);



  const units = projectData?.property_units || [];
  const prices = units.map((unit) => unit.price).filter(Boolean);
  const areas = units.map((unit) => unit.area).filter(Boolean);

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const minArea = areas.length ? Math.min(...areas) : 0;
  const maxArea = areas.length ? Math.max(...areas) : 0;

  const priceRange =
    minPrice && maxPrice
      ? `AED ${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
      : t("price_not_available");

  const areaRange =
    minArea && maxArea
      ? `${minArea} – ${maxArea} sq.ft.`
      : t("area_not_available");

  // const handover = (() => {
  //   const delivery = projectData?.delivery_date;

  //   if (!delivery) return "N/A";

  //   // Convert to string in case it's a number
  //   const str = delivery.toString();

  //   // Check if it's 6-digit format like "202708"
  //   if (/^\d{6}$/.test(str)) {
  //     const year = parseInt(str.slice(0, 4), 10);
  //     const month = parseInt(str.slice(4, 6), 10);

  //     if (isNaN(year) || isNaN(month) || month < 1 || month > 12) return "Invalid Date";

  //     // Option 1: Return as Quarter format
  //     const quarter = Math.ceil(month / 3);
  //     return `Q${quarter} ${year}`; // ➜ e.g., Q3 2027

  //     // Option 2: Return as MM/YYYY format
  //     // return `${String(month).padStart(2, '0')}/${year}`; // ➜ e.g., 08/2027
  //   }

  //   // If already in MM/YYYY format, return as-is
  //   if (/^\d{2}\/\d{4}$/.test(str)) return str;

  //   // If UNIX timestamp
  //   if (!isNaN(str) && Number(str) > 1000000000) {
  //     const date = new Date(Number(str) * 1000);
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const year = date.getFullYear();
  //     return `${month}/${year}`;
  //   }

  //   return "Invalid Date";
  // })();

  // const handover = (() => {
  //   const delivery = projectData?.delivery_date;

  //   if (!delivery) return "N/A";

  //   // If it's a number (UNIX timestamp)
  //   if (typeof delivery === "number") {
  //     const date = new Date(delivery * 1000);
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();

  //     // Compute quarter
  //     const quarter = Math.ceil(month / 3);
  //     return `Q${quarter} ${year}`;
  //   }

  //   // If it's already a string (like "Q4 2024")
  //   if (typeof delivery === "string") {
  //     return delivery;
  //   }

  //   return "N/A";
  // })();
  const handover = (() => {
    const delivery = projectData?.delivery_date;

    if (!delivery) return "N/A";

    // If it's a number in YYYYMM format (e.g., 202502)
    if (typeof delivery === "number" && delivery > 100000) {
      const year = Math.floor(delivery / 100);
      const month = delivery % 100;

      if (month < 1 || month > 12) return t("Invalid Date");

      const quarter = Math.ceil(month / 3);
      return `Q${quarter} ${year}`;
    }

    // If it's already a string like "Q4 2024"
    if (typeof delivery === "string") {
      return delivery;
    }

    return "N/A";
  })();

  const downPayment = (() => {
    const dpPercent = projectData?.payment_minimum_down_payment;

    if (dpPercent && dpPercent > 0 && dpPercent <= 100) {
      return `${dpPercent}%`;
    }

    return "N/A"; // fallback
  })();


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        {t("Loading property details...")}
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {t("Property not found.")}
      </div>
    );
  }

  // console.log(
  //   "grouped_apartment : ",
  //   projectData.grouped_apartments.map((item) => item.unit_type)
  // );
  // Build a map of property_id to unit_type
  // const apartmentTypeMap = projectData.grouped_apartments.reduce(
  //   (acc, item) => {
  //     if (!acc[item.id]) {
  //       // Store unit type description by grouped_apartments.id
  //       acc[item.id] = `${item.rooms} Bedroom ${item.unit_type}`;
  //     }
  //     return acc;
  //   },
  //   {} as Record<number, string>
  // );

  // const getUnitTypeName = (apartment) => {
  //   if (!apartment) return ""; // ⬅ Prevents error if apartment is undefined

  //   const rooms = apartment.rooms?.toString().trim();

  //   if (!isNaN(Number(rooms))) {
  //     return `${rooms} ${t("Bedroom ")} ${t(apartment.unit_type)}`;
  //   }
  //   if (rooms?.toLowerCase() === "studio") {
  //     return `${t("Studio")} ${apartment.unit_type}`;
  //   }
  //   return apartment.unit_type || ""; // fallback to unit_type or empty
  // };

  const getUnitTypeName = (apartment) => {
    if (!apartment) return "";

    const lang = i18n.language || "en";

    const roomText = apartment.rooms?.[lang] || apartment.rooms?.en;
    const unitTypeText = apartment.unit_type?.[lang] || apartment.unit_type?.en;

    if (roomText?.toLowerCase() === "studio") {
      return `${t("Studio")} ${unitTypeText || t("Apartment")}`;
    }

    if (!isNaN(Number(roomText))) {
      return `${roomText} ${t("Bedroom")} ${unitTypeText || t("Apartment")}`;
    }

    return unitTypeText || t("Apartment");
  };
  // Group property_units by apartment_id
  const groupedUnits = projectData.property_units.reduce((acc, unit) => {
    const roomKey = `${unit.apartment_id}`; // Group by apartment_id
    if (!acc[roomKey]) {
      acc[roomKey] = [];
    }
    acc[roomKey].push(unit);
    return acc;
  }, {});

  const totalUnits = Object.values(groupedUnits)
    .map((units: any[]) => units.length)
    .reduce((sum, len) => sum + len, 0);

  // Map groupedUnits into unitTypes array
  // Map grouped_apartments by apartment_id (property_units.apartment_id)
  const apartmentNameMap = projectData.grouped_apartments.reduce(
    (acc, item) => {
      acc[item.id] = `${item.rooms} ${t("Bedroom")} ${item.unit_type}`;
      return acc;
    },
    {} as Record<number, string>
  );

  // const unitTypes = Object.entries(groupedUnits).map(([apartmentId, units]: [string, any[]], index) => {
  //   // const unitTypeName = apartmentNameMap[Number(apartmentId)] || `Apartment ID ${apartmentId}`;
  //   const groupedApartment = projectData.grouped_apartments[index];
  //   return {
  //     type: getUnitTypeName(groupedApartment),
  //     available: units.length,
  //     startingPrice: Math.min(...units.map((u) => u.price)),
  //     icon: <Bed className="text-blue-500" />,
  //     color: "bg-purple-50",
  //     subUnits: units.map((unit) => ({
  //       id: unit.apt_no || `Unit ${unit.id}`,
  //       floor: unit.floor_no,
  //       size: `${unit.area} sq.ft`,
  //       price: unit.price,
  //       floorPlan:
  //         Array.isArray(unit.floor_plan_image) && unit.floor_plan_image.length > 0
  //           ? unit.floor_plan_image[0]
  //           : typeof unit.floor_plan_image === "string" && unit.floor_plan_image.trim().startsWith("[")
  //             ? JSON.parse(unit.floor_plan_image)[0]
  //             : "NO_FLOOR_PLAN",
  //       status: projectData.status || t("available"),
  //       apartmentType: getUnitTypeName(groupedApartment),
  //     })),
  //   };
  // });

  const unitTypes = Object.entries(groupedUnits).map(([apartmentId, units]: [string, any[]], index) => {
    const groupedApartment = projectData.grouped_apartments[index];

    return {
      type: getUnitTypeName(groupedApartment), // ✅ Already localized
      available: units.length,
      startingPrice: Math.min(...units.map((u) => u.price)),
      icon: <Bed className="text-blue-500" />,
      color: "bg-purple-50",
      subUnits: units.map((unit) => ({
        id: unit.apt_no || `Unit ${unit.id}`,
        floor: unit.floor_no,
        size: `${unit.area} ${t("sqft")}`,
        price: unit.price,
        floorPlan:
          Array.isArray(unit.floor_plan_image) && unit.floor_plan_image.length > 0
            ? unit.floor_plan_image[0]
            : typeof unit.floor_plan_image === "string" && unit.floor_plan_image.trim().startsWith("[")
              ? JSON.parse(unit.floor_plan_image)[0]
              : "NO_FLOOR_PLAN",
        status: projectData?.status?.[i18n.language] || t("Available"),
        // status: projectData.status?.[i18n.language] || t("Available"), // ✅ Translated fallback
        apartmentType: getUnitTypeName(groupedApartment), // ✅ Localized again
      })),
    };
  });
  const getTimeAgo = (minutesAgo: number) => {
    const now = new Date();
    const past = new Date(now.getTime() - minutesAgo * 60000);
    const diffMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    return diffMinutes < 60 ? `${diffMinutes} minutes ago` : `${diffHours} hours ago`;
  };

  const advanceMessage = () => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };





  // console.log(projectData.facilities);
  // const amenities = projectData.facilities?.facilities?.map((fac: any) => {
  //   // console.log(fac.name);
  //   const facilityName = fac?.name || "Unknown";
  //   const iconInfo = facilityIconMap[facilityName] || { icon: "Sparkle", color: "text-gray-400" }; // Fallback for unknown facilities
  //   const IconComponent = LucideIcons[iconInfo.icon] || LucideIcons.Sparkle; // dynamically get the icon
  //   return {
  //     name: facilityName,
  //     IconComponent,
  //     color: iconInfo.color,
  //   };
  // }) || [];

  //   const amenities = projectData.facilities?.map((fac: any) => {
  //   const currentLang = i18n.language; // e.g., 'en', 'ar', 'fa'

  //   const facilityName = fac.name?.[currentLang] || fac.name?.en || "Unknown";

  //   const iconInfo = facilityIconMap[facilityName] || {
  //     icon: "Sparkle",
  //     color: "text-gray-400",
  //   };
  //   const IconComponent = LucideIcons[iconInfo.icon] || LucideIcons.Sparkle;

  //   return {
  //     name: facilityName,
  //     IconComponent,
  //     color: iconInfo.color,
  //   };
  // }) || [];
  const amenities = projectData.facilities?.map((fac: any) => {
    const currentLang = i18n.language; // e.g., 'en', 'ar', 'fa'

    // Always use English name (or fallback) for icon mapping
    const defaultFacilityName = fac.name?.en || "Unknown";

    // Display name in current language
    const facilityDisplayName = fac.name?.[currentLang] || defaultFacilityName;

    const iconInfo = facilityIconMap[defaultFacilityName] || {
      icon: "Sparkle",
      color: "text-gray-400",
    };

    const IconComponent = LucideIcons[iconInfo.icon] || LucideIcons.Sparkle;

    return {
      name: facilityDisplayName,
      IconComponent,
      color: iconInfo.color,
    };
  }) || [];

  const paymentPlans = projectData.payment_plans || [];

  const totalUnitsText =
    totalUnits > 9
      ? t("units_left_9plus")
      : t("units_left", { count: totalUnits });

  const propertyStatusMap = {
    1: { name: t("Ready"), color: "text-green-600" },
    2: { name: t("Off Plan"), color: "text-blue-600" },
  };

  const salesStatusMap = {
    1: { name: t("Available"), color: "text-green-500" },
    2: { name: t("Pre Launch"), color: "text-yellow-500" },
    4: { name: t("Sold Out"), color: "text-red-500" },
    5: { name: t("Price On Demand"), color: "text-blue-500" },
  };

  const propertyStatusId = projectData.property_status;
  const salesStatusId = projectData.sales_status;

  const propertyStatus = propertyStatusMap[propertyStatusId] || { name: "Unknown", color: "text-gray-500" };
  const salesStatus = salesStatusMap[salesStatusId] || { name: "Unknown", color: "text-gray-500" };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header logo={logoPath} />
      <Button
        variant="outline"
        className="relative m-4 border border-gradient-to-r from-pink-700 via-purple-700 to-blue-500 rounded-full px-4 py-2 hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 hover:text-white transition-colors duration-300"
        onClick={() => navigate(-1)}
      >
        <div className="flex items-center gap-2">
          <LucideIcons.ArrowLeft className="w-4 h-2 bg-gradient-to-r from-pink-700 via-purple-700 to-blue-500 bg-clip-text" />
          <span className="text-transparent bg-gradient-to-r from-pink-700 via-purple-700 to-blue-500 bg-clip-text">
            {t('Back')}
          </span>
        </div>
      </Button>



      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden mb-5 shadow-lg h-[500px]"
      >
        {/* Top Left - Units Left */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-20">
          <div className="rounded-full">
            <Star className="w-4 h-4 text-white-600 font-bold" strokeWidth={3} fill='white' />
          </div>
          {t(totalUnitsText)}
        </div>


        {/* Bottom Right - 3 Labels */}


        {/* Top Right - Property Status */}
        <div
          className={`absolute top-4 right-4 text-white text-sm font-semibold rounded-full flex items-center px-3 py-1.5 rounded-full shadow-lg z-20
              ${propertyStatus.name === t("Ready")
              ? "bg-gradient-to-r from-green-500 to-emerald-800"
              : "bg-gradient-to-r from-blue-500 to-indigo-700"
            }`}
        >
          <div className="flex items-center gap-2">
            {/* Icon bubble */}
            <div
              className={`bg-white rounded-full p-1 ${propertyStatus.name === t("Ready") ? "text-green-600" : "text-blue-600"
                }`}
            >
              {propertyStatus.name === t("Ready") ? (
                <Check className="w-4 h-4 font-bold" strokeWidth={3} />
              ) : (
                <Building2 className="w-4 h-4 font-bold" strokeWidth={3} />
              )}
            </div>
            {t(propertyStatus.name)}
          </div>
        </div>


        {/* Background image */}
        <img
          src={projectData.cover}
          alt={t(projectData.title)}

          className="w-full h-full object-cover"
          loading="lazy"
        />
        {t(projectData.title?.[i18n.language])}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 flex items-center justify-center"></div>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
          >
            {/* {t(projectData.title)} */}
            {t(projectData.title?.[i18n.language])}
          </motion.h1>
          <div className="flex items-center text-white font-semibold mt-3">
            <MapPin className="w-5 h-5 mr-2" />
            {t(projectData.district?.name?.[i18n.language] || "Unknown District")}, {t(projectData.city?.name?.[i18n.language] || "Unknown City")}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={advanceMessage}
              className="mt-8 bg-white/40 px-4 py-1 rounded-full mb-8 text-white text-sm md:text-sm font-medium shadow-md"
            >
              {messages[currentMessageIndex]}
            </motion.div>
          </AnimatePresence>
          {projectData.guarantee_rental_guarantee ? (
            <div className="flex flex-wrap gap-5 justify-center text-sm md:text-base font-semibold mt-15 py-5">
              {[
                { text: t('Guaranteed ROI Contract'), color: 'bg-blue-50 text-blue-600', icon: IconGuarantee },
                // { text: t('Zero Risk – Escrow Protected'), color: 'bg-green-50 text-green-600', icon: IconShield }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[10px] shadow-md ${item.color}`}
                >
                  <div className="bg-white rounded-full p-1">
                    <img src={item.icon} alt="icon" className="w-5 h-5" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-5">
              {propertyStatus.name !== "Ready" && (

                <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] shadow-md bg-green-50 text-green-600 text-sm md:text-base font-semibold">
                  <div className="bg-white rounded-full p-1">
                    <img src={IconShield} alt="icon" className="w-5 h-5" />
                  </div>
                  <span>{t("Zero Risk – Escrow Protected")}</span>
                </div>
              )}

            </div>
          )}

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm md:text-base font-semibold mt-15 py-5">
            {[
              { text: 'Guaranteed ROI Contract', color: 'bg-blue-50 text-blue-600', icon: IconGuarantee },
              { text: 'Zero Risk – Escrow Protected', color: 'bg-green-50 text-green-600', icon: IconShield }
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-2 rounded-[10px] shadow-md ${item.color}`}
              >
                <div className="bg-white rounded-full p-1">
                  <img src={item.icon} alt="icon" className="w-5 h-5" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div> */}

          {/* Bottom Right - Free DLD Label */}
          {/* <div className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-tl-2xl flex items-center gap-2 shadow-lg z-20">
            <div className="bg-white rounded-full p-1">
              <Gift className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
            </div>
            Free DLD – Today Only
          </div> */}



        </div>
      </motion.div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/*  */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Heading */}
          <h2 className="flex items-center font-sans text-lg sm:text-xl font-medium text-gray-600 italic mb-2 py-2 gap-2">
            <Compass className="w-5 h-5 text-primary-500" />
            <span className="text-gray-800 font-semibold">
              {t("Explore This Exclusive Property in {{city-name}}", { "city-name": t(projectData.city?.city?.[i18n.language] || "N/A") })}
            </span>
          </h2>

          {/* Property Info Cards */}
          <div
            className={`grid gap-4 py-4 ${amenities.length >= 2
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
              }`}
          >
            {/* Price Range */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-full p-2">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">{t("Price Range")}</p>
                <p className="text-sm font-semibold text-gray-800">{priceRange}</p>
              </div>
            </div>

            {/* Area Range */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-2">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">{t("Area Range")}</p>
                <p className="text-sm font-semibold text-gray-800">{areaRange}</p>
              </div>
            </div>

            {/* Handover */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-2">
                <Handshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">{t("Handover")}</p>
                <p className="text-sm font-semibold text-gray-800">{handover}</p>
              </div>
            </div>

            {/* Payment Plan */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-2">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">{t("Payment Plan")}</p>
                <p className="text-sm font-semibold text-gray-800">{downPayment}</p>
              </div>
            </div>

            {/* Amenities (only if available) */}
            {amenities.slice(0, 2).map((amenity, index) => {
              const cardBg =
                index === 0
                  ? "bg-gradient-to-br from-yellow-100 to-yellow-200"
                  : "bg-gradient-to-br from-purple-100 to-purple-200";

              const iconBg =
                index === 0
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                  : "bg-gradient-to-br from-purple-500 to-purple-700";

              return (
                <div
                  key={index}
                  className={`flex flex-row items-center gap-3 ${cardBg} rounded-2xl p-4 shadow-sm w-full`}
                >
                  <div className={`${iconBg} rounded-full p-2`}>
                    <amenity.IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{t(amenity.name)}</p>
                    <p className="text-sm font-semibold text-gray-800">{t("Available")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>




        {/*  */}


        {/* Unit Types */}
        {/*  */}

        <div className="mb-10">
          {/* {units.available > 0 && unitTypes.length > 0 && ( */}
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-center text-gray-600 mb-6">
              {t('Available Unit Types')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {unitTypes.length === 0 ? (
                <div className="text-center text-gray-500 col-span-full py-6">
                  {t("No units available")}
                </div>
              ) : 
                (unitTypes.map((unit, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1 }}
                    onClick={() => toggleUnit(unit.type)}
                    ref={(el) => (unitRefs.current[unit.type] = el)}
                    className="group rounded-2xl bg-white shadow-lg border hover:border-purple-400 transition duration-300 cursor-pointer"
                  >
                    {/* Top: Unit Summary */}
                    <div className="flex justify-between items-center p-5">
                      {/* Left: Icon & Details */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-full ${unit.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition`}
                        >
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {/* {unit.type ? unit.type : unit.subUnits?.[0]?.id ? `ID: ${unit.subUnits[0].id}` : t('No Info')} */}
                            {unit.type ? unit.type : unit.subUnits?.[0]?.id ? `${t("ID")}: ${unit.subUnits[0].id}` : t('No Info')}
                          </h4>
                          <p className="text-sm text-gray-500">{unit.available} {t("units_available")}</p>
                        </div>
                      </div>

                      {/* Right: Price */}
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-400">{t("Starting from")}</p>
                        <p className="font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text text-base">
                          AED {formatPrice(unit.startingPrice)}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Button Row */}
                    <div className="flex justify-center py-2 border-t">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent parent onClick
                          toggleUnit(unit.type);
                        }}
                        className="flex items-center gap-1 text-purple-600 font-medium hover:text-purple-800 transition"
                      >
                        {expandedUnit === unit.type ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            {t("Hide Units")}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            {t("View Units")}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Expanded Sub-Units */}
                    {expandedUnit === unit.type && unit.subUnits.length > 0 && (
                      <div className="bg-gray-50 rounded-b-2xl p-4 border-t">
                        <div>
                          <div
                            className={`grid gap-4 ${unit.subUnits.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
                              }`}
                          >
                            {unit.subUnits.map((sub, subIndex) => (
                              <div
                                key={subIndex}
                                className="rounded-xl border p-3 shadow-sm bg-white hover:shadow-md "
                              >
                                {/* Top Row */}
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-sm font-semibold text-gray-800">
                                    ID: {sub.id}
                                  </span>
                                  <div className='float-right'>
                                    <span
                                      className={`text-xs font-semibold px-2 py-1 rounded-full ${sub.status === t("Available")
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                      {sub.status || t("Coming Soon")}
                                    </span>
                                  </div>
                                </div>

                                {/* Details */}
                                <ul className="text-gray-500 text-xs mb-2">
                                  <li>{t("Floor")}: {sub.floor || "N/A"}</li>
                                  <li>{t("Size")}: {sub.size}</li>
                                </ul>

                                {/* Price */}
                                <p className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text py-1">
                                  AED {formatPrice(sub.price)}
                                </p>

                                {/* Optional: Floor Plan Image */}
                                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                  <img
                                    src={sub.floorPlan}
                                    // alt={`Floor plan for ${sub.id}`}
                                    className="w-full h-full object-cover"
                                    // loading="lazy"
                                    onError={(e) => {
                                      e.currentTarget.onerror = null; // ✅ prevent infinite loop
                                      e.currentTarget.src = "/no-floor-plan.png";
                                    }}
                                  />
                                  {/* Watermark Overlay */}
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                                    <span className="text-white text-md font-bold opacity-60">
                                      OFFPLAN.MARKET
                                    </span>
                                  </div>
                                </div>

                                {/* View Details Button */}
                                <div className="mt-3 text-center">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      //  navigate(`/agent/${agent.username}/unit-details/${sub.id}`, k{agent.username}/property-detailed/${sub.id}`,
                                      navigate(`/${agent.username}/property-details/${projectId}/unit-details/${encodeURIComponent(sub.id)}`,
                                        {
                                          state: {
                                            unit: sub,
                                            projectData,
                                            agent,
                                          },
                                        });

                                    }}
                                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-xl shadow hover:shadow-lg hover:from-pink-600 hover:to-purple-700 transition"
                                  >
                                    {t("View Details")}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fallback if no sub-units */}
                    {expandedUnit === unit.type && unit.subUnits.length === 0 && (
                      <div className="bg-gray-50 rounded-b-2xl p-4 text-center text-gray-500 border-t">
                        {t("No units available in this category")}
                      </div>
                    )}
                  </motion.div>
                )))}
            </div>
          </div>
          {/* )} */}

          {/*  */}

          {/* About Section */}
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">About This Project</h2> */}
          <div className="mb-8 mt-8 rounded-2xl bg-white p-6 shadow">
            <h2 className="text-3xl md:text-3xl font-extrabold text-center mb-10 font-sans text-gray-600 pt-4">{t("About {{project-title}}", { "project-title": t(projectData.title?.[i18n.language]) })}</h2>
            <div
              className="text-gray-600 prose prose-p"
              dangerouslySetInnerHTML={{ __html: projectData.description?.[i18n.language] }}
            ></div>
            {/* <div
              className="text-gray-600 prose prose-p text-right"
              // dir="rtl"
              dangerouslySetInnerHTML={{
                __html: projectData.arabic_desc
                  ?.replace(/& nbsp;?/g, ' ')         // Remove `&nbsp;` and `&nbsp؛`
                  .replace(/nbsp ;?/g, ' ')   
                  .replace(/؛/g, '')      // Remove `&nbsp;` and `&nbsp؛`
                  .replace(/\s{2,}/g, ' ')           // Replace multiple spaces with single space
                  .replace(/\r?\n|\r/g, '<br />')    // Optional: Convert newlines to <br> if needed
              }}
            ></div> */}
          </div>

          {/* Location Section */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-pink-600"><MapPin className="w-5 h-5" /> {t("Location & Address")}</h3>
            <p className="text-gray-700 font-semibold">{t(projectData.title?.[i18n.language])}</p>
            <p className="text-gray-500 mb-4">{projectData.district?.district?.[i18n.language] || "Unknown District"}, {projectData.city?.city?.[i18n.language] || "Unknown City"}</p>
            <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-full h-60 rounded-lg overflow-hidden border border-gray-200">
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

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="mb-8 rounded-2xl bg-white p-6 shadow">
              <h3 className="text-3xl md:text-3xl font-extrabold font-sans text-center mb-10 text-gray-600">{t("Amenities")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-10 p-3 rounded-xl border hover:border-purple-300"
                  >
                    <amenity.IconComponent className={`w-5 h-5 ${amenity.color}`} />
                    <span className="sm:text-gray-800 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <section className="mb-10 rounded-2xl bg-gradient-to-tr from-green-100 to-green-100 p-6 shadow">
            <h3 className="text-2xl md:text-3xl font-sans font-extrabold text-center mb-6 bg-gradient-to-br from-green-700 to-emerald-500 bg-clip-text text-transparent ">
              {t("Why Invest in {{project-title}}", { "project-title": t(projectData.title?.[i18n.language || projectData.title?.en]) })}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-700 list-disc list-inside font-medium">
              <li>
                {t("Located in prime community of {{district}}, {{city}}", {
                  district: projectData.district?.district?.[i18n.language] || "Unknown District",
                  city: projectData.city?.city?.[i18n.language] || "Unknown City"
                })}
              </li>
              {/* <li>{t("Located in prime community of {{district-name}}, {{city-name}}", { "district-name": t(projectData.district?.dist_names?.[i18n.language] || "Unknown District"), "city-name": t(projectData.city?.city_names?.[i18n.language] || "Unknown City") })}</li> */}
              <li>{t("Expected handover by {{handover}}", { "handover": t(handover) })}</li>
              {/* <li>Free DLD + Escrow Protected (Zero Risk)</li> */}
              <li>{t("Flexible payment plan with only")} <span className="font-semibold">{projectData.payment_minimum_down_payment}%</span> {t("down payment")}</li>
              {amenities.length >= 4 && (
                <li>
                  {t("Unique")} {amenities.slice(2, 4).map((a) => a.name.toLowerCase()).join(' and ')} {t("onsite")}
                </li>
              )}
            </ul>
          </section>

          {/* Payment Plan */}
          {paymentPlans.length > 0 && (
            <div className="mb-10 rounded-3xl bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl p-6">
              <h3 className="text-3xl md:text-3xl font-extrabold text-center mb-10 font-poppins text-gray-600">
                {t("Payment Plans")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paymentPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    {/* Plan Header */}
                    <div className="mb-5 border-b pb-3">
                      <h4 className="text-xl font-bold text-purple-600">
                        {plan.name?.[i18n.language] || t(plan.name?.en || "Payment Plan")}
                      </h4>
                      <p className="text-sm text-gray-500 italic">
                        {plan.description?.[i18n.language] || t(plan.description?.en || "")}
                      </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                      {plan.values.map((val, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition duration-300"
                        >
                          {/* Left: Step Badge & Name */}
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md">
                              {idx + 1}
                            </span>
                            <span className="text-gray-800 font-medium">
                              {val.values?.[i18n.language] || t(val.values?.en || val.name)}
                            </span>
                          </div>

                          {/* Right: Value */}
                          <span className="text-blue-700 font-bold">{val.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
        {/* CTA */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-450 to-blue-500 rounded-2xl p-8 mb-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-2 ">{t("Ready to Make This Your Home?")}</h3>
          <p className="mb-4 text-white/90">
            {/* Contact {agent?.name || "our team"} today for exclusive access and personalized assistance */}
            {t("Contact {{name}} today for exclusive access and personalized assistance", {
              name: agent?.name?.[i18n.language] || "our team"
            })}

          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${agent?.phone_number || ""}`}
              className="flex-1"
            >
              <button className="w-full bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600">
                <div className='flex flex-row gap-2 justify-center'><Phone className='w-5 h-5' /> {t("Call Now")}</div>
              </button>
            </a>
            <a
              // href={`https://wa.me/${agent?.whatsapp_number?.replace(/\s+/g, '') || ''}?text=Hi, I'm interested in your off-plan properties`}
              // target="_blank"
              className="flex-1"
            >
              <button className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700"
              onClick={()=>handleWhatsApp(projectData,agent,t,i18n)}>
                <div className='flex flex-row gap-2 justify-center'><img src={IconWhatsapp} className='w-6 h-6' /> {t("Chat on WhatsApp")}</div>
              </button>
            </a>
          </div>
        </div>
      </div>


      {/* <CallToAction agent={agent} /> */}

      <Footer />

      {/* <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex rounded-t-2xl overflow-hidden shadow-xl"> */}
      {/* WhatsApp Button */}
      {/* <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center w-1/2 bg-green-500 hover:bg-green-600 text-white py-4 font-semibold text-lg transition-all duration-300"
        >
          <img src={IconWhatsapp} alt="WhatsApp" className="w-6 h-6 mr-2" />
          WhatsApp
        </button> */}

      {/* Call Now Button */}

      {/* <button
          onClick={() => { window.location.href = `tel:${agent.phone_number}`; }}
          className="flex items-center justify-center w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-4 font-semibold text-lg transition-all duration-300"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </button>
      </div> */}
      {(
        <div className="fixed bottom-8 right-5 z-50">
          <button
            onClick={()=>handleWhatsApp(projectData,agent,t,i18n)} // Use the first property for WhatsApp
            className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300"
          >
            <img src={IconWhatsapp} alt="WhatsApp" className="w-10 h-10" />
          </button>
        </div>
      )}

    </div>
  );
};

export default PropertyDetails1;


