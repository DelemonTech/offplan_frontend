import React, { useState } from 'react'
import Header from '../../components/Agent/Header'
// import Header from "@/components/HomeHeader";
import { ArrowLeft, MapPin, Ruler, Maximize, DollarSign, Building, Eye, Shield, Calendar, Flame, Bath, Bed, Phone, Mail, Download, Share2, MessageCircle, Home, CheckCircle, Image, FileText, CreditCard, BarChart2, Handshake, Maximize2, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import unit from '../../assets/unit.jpeg';
import girl from '../../assets/girl.jpg'
import forplan from '../../assets/forplan1.webp';
import { useLocation } from 'react-router-dom';
import logoPath from "@/assets/OFFPLAN_MARKET.png"
import Footer from '../../components/Agent/Footer';
import { useNavigate } from "react-router-dom";
import IconWhatsapp from "@/assets/icon-whatsapp.svg";
import * as LucideIcons from 'lucide-react'
import RequestCallBackModal from './RequestCallBackModal';
import GalleryPage from './Gallery';

// import { jsPDF } from "jspdf";


const PropertyDetailedPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const location = useLocation();
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showFloorPlanImage, setShowFloorPlanImage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(true);

  const [agent, setAgent] = useState<any>(location.state?.agent || null);
  const [projectData, setProjectData] = useState<any>(location.state?.projectData || null);
  const [unit, setUnit] = useState<any>(location.state?.unit || null);

  // const hostUrl = import.meta.env.VITE_HOST_URL;

  // // 👇 Extract from URL
  // const pathname = window.location.pathname;
  // const segments = pathname.split("/");

  // const username = segments[1]; // e.g., sahar
  // const propertyId = segments[3]; // e.g., 1782
  // const unitTitle = decodeURIComponent(segments[5]); // e.g., G2-M2 (Villa)

  // // 🔥 Fetch agent if missing
  // if (!agent && username) {
  //   fetch(`${hostUrl}/agent/${username}`)
  //     .then((res) => res.json())
  //     .then((agentData) => {
  //       if (agentData?.status && agentData?.data) {
  //         setAgent(agentData.data);
  //       } else {
  //         console.error("Agent not found");
  //       }
  //     })
  //     .catch((err) => console.error("Failed to fetch agent:", err));
  // }

  // // 🔥 Fetch property & subunit if missing
  // if ((!projectData || !unit) && propertyId && unitTitle) {
  //   fetch(`https://panel.estaty.app/api/v1/getProperty?id=${propertyId}`, {
  //     method: "POST",
  //     headers: {
  //       "App-key": import.meta.env.VITE_ESTATY_API_KEY,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.property) {
  //   setProjectData(data.property);

  //   // ✅ Only try to find subunit if property_units exists
  //   if (Array.isArray(data.property.property_units)) {
  //     const foundUnit = data.property.property_units.find(
  //       (u: any) => u.title === unitTitle
  //     );

  //     if (foundUnit) {
  //       setUnit(foundUnit);
  //     } else {
  //       console.error("Subunit not found for:", unitTitle);
  //     }
  //   } else {
  //     console.error("property_units is missing for property:", propertyId);
  //   }
  // } else {
  //   console.error("Property not found in API response");
  // }

  //     })
  //     .catch((err) => console.error("Failed to fetch property:", err));
  // }

  // if (!agent || !projectData || !unit) {
  //   return <div>Loading unit details...</div>;
  // }



  const navigate = useNavigate();

  // const { unit, projectData } = location.state || {};

  const unitData = location.state;
  // console.log(unitData);
  const paymentPlans = projectData?.payment_plans || [];
  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500">No unit data provided.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }
  // Format price like 1.2M, 950K etc.
  const formatPrice = (price) => {
    const numericPrice =
      typeof price === "string"
        ? parseInt(price.replace(/[^\d]/g, ""), 10)
        : price;

    if (numericPrice >= 1_000_000) return `${(numericPrice / 1_000_000).toFixed(1)}M`;
    if (numericPrice >= 1_000) return `${(numericPrice / 1_000).toFixed(0)}K`;
    return numericPrice.toString();
  };

  // const units = projectData?.property_units || [];
  // const prices = units.map((unit) => unit.price).filter(Boolean);
  // const areas = units.map((unit) => unit.area).filter(Boolean);
  // const minPrice = prices.length ? Math.min(...prices) : 0;
  // const maxPrice = prices.length ? Math.max(...prices) : 0;

  // const minArea = areas.length ? Math.min(...areas) : 0;
  // const maxArea = areas.length ? Math.max(...areas) : 0;

  // const priceRange =
  //   minPrice && maxPrice
  //     ? `AED ${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
  //     : "Price Not Available";

  // const areaRange =
  //   minArea && maxArea
  //     ? `${minArea} – ${maxArea} sq.ft.`
  // : "Area Not Available";

  const downPayment = (() => {
    const dpPercent = projectData?.payment_minimum_down_payment;

    if (dpPercent && dpPercent > 0 && dpPercent <= 100) {
      return `${dpPercent}%`;
    }

    return "N/A"; // fallback
  })();
  // Calculate handover quarter
  const handover = (() => {
    const delivery = projectData?.delivery_date;

    if (!delivery) return "N/A";

    // If it's a number in YYYYMM format (e.g., 202502)
    if (typeof delivery === "number" && delivery > 100000) {
      const year = Math.floor(delivery / 100);
      const month = delivery % 100;

      if (month < 1 || month > 12) return "Invalid Date";

      const quarter = Math.ceil(month / 3);
      return `Q${quarter} ${year}`;
    }

    // If it's already a string like "Q4 2024"
    if (typeof delivery === "string") {
      return delivery;
    }

    return "N/A";
  })();

  //   const featureList = [
  //   { label: 'Type', value: unitData.apartmentType, icon:  <Home />, gradient: 'from-pink-500 to-purple-500' },
  //   { label: 'Size', value:unitData?.size || 'N/A', icon: <Ruler/>, gradient: 'from-blue-500 to-indigo-500' },
  //   { label: 'Handover', value: 'Q4 2025', icon: <Calendar  />, gradient: 'from-pink-500 to-purple-500' },
  //   { label: 'Payment', value: '60/40', icon: <DollarSign  />, gradient: 'from-green-400 to-blue-400' },
  // ];
  const featureList = [
    {
      label: 'Type',
      value: unit.apartmentType || 'N/A',
      icon: <Home />,
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      label: 'Size',
      value: unit?.size || 'N/A',
      icon: <Ruler />,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      label: 'Handover',
      value: handover,
      icon: <Calendar />,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Payment',
      value: `${formatPrice(unit.price)}`,
      icon: <DollarSign />,
      gradient: 'from-green-400 to-blue-400',
    },
  ];
  const colorClasses = [
    "text-pink-600",
    "text-green-600",
    "text-purple-600",
    "text-blue-600",
    "text-yellow-600",
    "text-red-600",
  ];
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
  const amenities = projectData.facilities?.map((fac: any) => {
    // console.log(fac.name);
    const facilityName = fac?.name || "Unknown";
    const iconInfo = facilityIconMap[facilityName] || { icon: "Sparkle", color: "text-gray-400" }; // Fallback for unknown facilities
    const IconComponent = LucideIcons[iconInfo.icon] || LucideIcons.Sparkle; // dynamically get the icon
    return {
      name: facilityName,
      IconComponent,
      color: iconInfo.color,
    };
  }) || [];

  const handleWhatsApp = () => {
    const currentUrl = window.location.href;
    const pathname = window.location.pathname; // e.g., /sahar/property-details/1782/unit-details/G2-M2 (Villa)
    const segments = pathname.split("/");

    const username = segments[1]; // sahar
    const propertyId = segments[3]; // 1782

    const cleanUrl = `${window.location.origin}/${username}/property-details/?id=${propertyId}`;
    const message = `Hi ${agent.name}! I'm interested in ${projectData.title} in ${projectData.city?.name}. Starting from AED ${parseInt(projectData.low_price).toLocaleString()}. Can you share more details?\n\nHere’s the link: ${cleanUrl}`;
    const whatsappUrl = `https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const [fullscreenImage, setFullscreenImage] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header logo={logoPath} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* <Button
          variant="outline"
          size="sm"
          className="mb-7 rounded-lg flex items-center gap-2 hover:bg-pink-50 hover:text-violet-600 border-gray-300 text-violet-600 px-4 py-3 h-8 mt-2 text-sm"
        >
          <ArrowLeft size={14} />
          Back to Project
        </Button> */}

        <div className="relative rounded-xl overflow-hidden shadow-lg mb-8 mt-6">
          <div className="relative h-[350px] lg:h-[450px]">
            <img
              src={projectData.cover}
              alt="Unit"
              className="w-full h-full object-cover"
            />

            {/* Price Tag Clipped to Top Right */}
            <div className="absolute top-0 left-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-rl-2xl rounded-br-2xl shadow-md">
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-100 to-purple-200 text-transparent bg-clip-text">
                AED {formatPrice(unit.price)}
              </p>
            </div>

            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>



            {/* Text content over image */}
            <div className="absolute bottom-4 left-4 z-10">

              <h2 className="text-3xl text-white  lg:text-xl font-bold mb-1">
                <div>{projectData.title}<br /><span className='text-2xl'> Unit ID : {unit.id}</span></div>
              </h2>
              <p className="text-sm flex text-white  items-center gap-1 mb-8">
                <span className="material-icons text-sm"><MapPin /></span>{projectData.city?.name}, {projectData.district?.name}
              </p>
              {/* <div className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold'>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text py-1">AED {formatPrice(unit.price)}</p>
              </div> */}
              <p className="flex items-center text-sm font-medium text-white mt-1 gap-1 bg-red-400 rounded-2xl px-3">
                <Flame className="text-white animate-burn" />
                Reserve 24/7 –
                <span className="text-1xl font-bold text-white text-transparent bg-clip-text py-1">
                  No Down Payment Required !
                </span>
              </p>



            </div>



            {/* Availability badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-green-500 text-white text-sm font-semibold px-3 py-2 rounded-full shadow">
                {unit.status}
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Heading */}
          <h2 className="flex items-center text-lg sm:text-xl font-medium text-gray-600 italic mb-2 py-2 gap-2">
            <Compass className="w-5 h-5 text-primary-500" />
            <span className="text-gray-800 font-semibold">
              Explore This Exclusive Property in{" "}
              {projectData?.title || "N/A"}
            </span>
          </h2>

          {/* Property Info Cards */}
          <div
            className={`grid gap-4 py-4 ${amenities.length >= 2
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
              }`}
          >
            {/* Overview */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-full p-2">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Overview</p>
                <p className="text-sm font-semibold text-gray-800">{unit.apartmentType ? unit.apartmentType : unit.id ? `${unit.id}` : 'No Info'}</p>
              </div>
            </div>

            {/* Area */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-2">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Area</p>
                <p className="text-sm font-semibold text-gray-800">{unit.size}</p>
              </div>
            </div>

            {/* Handover */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-2">
                <Handshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Handover</p>
                <p className="text-sm font-semibold text-gray-800">{handover}</p>
              </div>
            </div>

            {/* Payment Plan */}
            <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-4 shadow-sm w-full">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-2">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Payment Plan</p>
                <p className="text-sm font-semibold text-gray-800">{downPayment}</p>
              </div>
            </div>

            {/* Amenities (if available) */}
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
                    <p className="text-xs text-gray-600">{amenity.name}</p>
                    <p className="text-sm font-semibold text-gray-800">Available</p>
                  </div>
                </div>
              );
            })}
          </div>



        </div>
        {/* Feature Info Boxes */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 mt-4">

          {featureList.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 shadow-md flex flex-col items-center text-center transition shadow-lg ${idx % 2 === 0 ? 'bg-gradient-to-r from-pink-400 to-purple-300' : 'bg-gradient-to-r from-purple-200 to-blue-300'
                }`}
            >
              <div
                className={`w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white text-lg`}
              >
                {item.icon}
              </div>
              <p className="text-sm text-white-500">{item.label}</p>
              <p className="font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div> */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-violet-600 mb-4">Floor Plan</h3>

            {unit.floorPlan && unit.floorPlan !== "NO_FLOOR_PLAN" ? (
              <div className="flex space-x-2">
                {/* Download Button */}
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = unit.floorPlan;
                    link.download = "floor-plan.jpg"; // you can set a filename here
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>

                {/* Preview Button */}
                <a
                  href={unit.floorPlan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No Floor Plan Available</span>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden">
            {unit.floorPlan && unit.floorPlan !== "NO_FLOOR_PLAN" ? (
              <>
                <img
                  src={unit.floorPlan}
                  alt="Floor Plan"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <span className="text-white text-md font-bold opacity-60">
                    OFFPLAN.MARKET
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-72 bg-gray-100 text-gray-500 rounded-xl">
                No Floor Plan Image
              </div>
            )}

          </div>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
              <h3 className="text-lg font-bold text-violet-600 mb-4">Floor Plan</h3>
              <div className="bg-gray-50 rounded-xl shadow-inner p-4">
                <img
                  src={unitData.floorPlan || forplan}
                  alt="Floor Plan"
                 className="rounded-xl mx-auto max-h-[300px] object-contain"
                />
              </div>
            </div> */}
        {/* Unit Description Section */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Unit Description</h3>
              <p className="text-gray-700 mb-6">
                Modern studio unit with smart design, floor-to-ceiling windows and stunning marina views – perfect for investors or end users.
              </p>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Floor-to-ceiling windows',
                  'Built-in wardrobe',
                  'Modern kitchen',
                  'Marina views',
                  'Balcony access',
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-sm px-4 py-3 rounded-xl shadow-sm"
                  >
                    <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div> */}
        {/* Unit Price & Payment Plan Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
          <h3 className="text-xl font-bold text-blue-600 mb-5">
            Unit Price & Payment Plan
          </h3>

          {/* Parent Grid: Unit Info & Payment Plan side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Unit Info */}
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-500">
              <h4 className="text-xl font-bold text-purple-600 mb-4">Unit Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border bg-purple-50 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold mb-1">Unit ID</p>
                  <p className="text-base font-medium bg-gradient-to-r from-pink-500 to-blue-400 text-transparent bg-clip-text">{unit.id}</p>

                </div>
                <div className="border bg-purple-50 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold mb-1">Status</p>
                  <p className="text-base font-semibold text-green-600">{unit.status}</p>
                </div>
                <div className="border bg-purple-50 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold mb-1">Size</p>
                  <p className="text-base font-medium text-blue-400">{unit.size}</p>
                </div>
                <div className="border bg-purple-50 rounded-xl p-4 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold mb-1">Unit Price</p>
                  <p className="text-base font-bold text-purple-600">
                    AED {formatPrice(unit.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Plan */}
            {paymentPlans.length > 0 && (
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                <h4 className="text-xl font-bold text-purple-600 mb-4">
                  Payment Plan
                </h4>
                <div className="space-y-4">
                  {paymentPlans[0].values.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition duration-300"
                    >
                      {/* Left: Step Badge & Name */}
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md">
                          {idx + 1}
                        </span>
                        <span className="text-gray-800 font-medium">{val.name}</span>
                      </div>

                      {/* Right: Value */}
                      <span className="text-blue-700 font-bold">{val.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>



        {/* Action Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            {
              title: 'Gallery',
              description: 'View all unit images and renders',
              button: 'View Gallery',
              icon: <Image />,
              bg: 'bg-pink-100',
              textColor: 'text-violet-600',
              buttonColor: 'text-violet-600 border border-violet-200',
            },
            {
              title: 'Floor Plan',
              description: 'Download detailed floor plan',
              button: 'Download Plan',
              icon: <FileText />,
              bg: 'bg-blue-50',
              textColor: 'text-blue-600',
              buttonColor: 'text-blue-600 border border-blue-200',
            },
            {
              title: 'Payment Plan',
              description: 'Flexible payment options',
              button: 'View Details',
              icon: <CreditCard />,
              bg: 'bg-green-50',
              textColor: 'text-green-600',
              buttonColor: 'text-green-600 border border-green-200',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`${card.bg} rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-4 shadow">
                {card.icon}
              </div>

              {/* Title and Description */}
              <h4 className="text-lg font-semibold text-gray-800">{card.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{card.description}</p>

              {/* Button */}
              <button
                onClick={() => {
                  if (card.title === "Floor Plan") {
                    // Programmatically open the floor plan image in new tab
                    if (unit.floorPlan && unit.floorPlan !== "NO_FLOOR_PLAN") {
                      window.open(unit.floorPlan, "_blank", "noopener,noreferrer");
                    } else {
                      alert("No floor plan available");
                    }
                  }
                  else if (card.title === "Gallery") {
                    const imageUrls = projectData?.property_images?.map(img => img.image) || [];
                    if (imageUrls.length > 0) {
                      setShowGalleryModal(true);
                    } else {
                      alert("No gallery images available");
                    }
                  }
                  else {
                    setModalType(card.title.toLowerCase()); // e.g., 'payment plan'
                    setShowModal(true);
                  }

                }}
                className={`w-full py-2 rounded-xl font-medium text-sm ${card.buttonColor} hover:bg-opacity-10`}
              >
                {card.button}
              </button>
              {/* Gallery Modal */}
              {/* Gallery Modal */}
              {showGalleryModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-start overflow-y-auto p-2">
                  <div
                    className="bg-white rounded-3xl shadow-lg max-w-6xl w-full relative p-6"
                    style={{ marginBottom: "80px" }} // Leave space for WhatsApp CTA
                  >
                    {/* Close Modal Button */}
                    <button
                      onClick={() => setShowGalleryModal(false)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-500 text-3xl font-bold"
                    >
                      &times;
                    </button>

                    <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                      Project Gallery
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto">
                      {projectData?.property_images?.map((img, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden shadow cursor-pointer"
                          onClick={() => setFullscreenImage(img.image)} // ✅ Open fullscreen
                        >
                          <img
                            src={img.image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 🆕 Render fullscreen image outside modal */}
              {fullscreenImage && (
                <div
                  className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex justify-center items-center"
                  onClick={() => setFullscreenImage(null)} // Close on background click
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent closing if button is clicked
                      setFullscreenImage(null);
                    }}
                    className="absolute top-6 right-6 text-white text-4xl font-bold"
                  >
                    &times;
                  </button>
                  <img
                    src={fullscreenImage}
                    alt="Fullscreen View"
                    className="max-w-screen max-h-screen object-contain"
                  />
                </div>
              )}





            </div>
          ))}
        </div>
        {/* Section 1: Ready to Reserve */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-pink-600 text-white rounded-2xl mt-12 p-6 sm:p-8 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Ready to Reserve? </h2>
              <p className="text-sm sm:text-base text-white/90 mt-1">
                Secure this unit online now with a small deposit.
              </p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <span className="text-white text-lg"><Shield /></span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => setShowReserveModal(true)}
              className="w-full sm:w-1/2 bg-white text-purple-700 font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100 transition"
            >
              <span className="text-lg"><Shield /></span> Reserve Now
            </button>

            <button className="w-full sm:w-1/2 bg-gradient-to-r from-purple-300 via-pink-400 to-pink-300 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 border border-white/30 hover:opacity-90 transition">
              <span className="text-lg"><Calendar /></span> <p className='font-semibold'>Pay Booking Fee</p>
            </button>
          </div>
        </div>

        {/* OR Divider */}
        <div className="my-6 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
          <div className="h-px bg-gray-300 w-10" />
          or
          <div className="h-px bg-gray-300 w-10" />
        </div>

        {/* Section 2: Need Help or More Info */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-10 shadow-md text-center border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Need Help or More Info?</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1 mb-6">
            Talk to our property advisor for pricing, viewing, and guidance.
          </p>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-white shadow-md overflow-hidden">
            <img
              src={agent.profile_image_url}// Replace with actual image path or import
              alt="Sahar Kalhor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Title */}
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-1">
            {agent.name}
          </h3>
          <p className="text-gray-600 mb-4 text-sm">Your Property Advisor</p>
          <div className="text-sm text-gray-700 font-medium mb-4">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full shadow">
              Trusted Advisor – ⭐ 4.9 (38 reviews)
            </span>
          </div>
          {/* Description */}
          {/* <p className="text-gray-800 text-sm mb-6">
            Speak directly with {agent.name} for pricing, viewings, and exclusive offers.
          </p> */}

          <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
            {/* Call Now */}
            <a
              href={`tel:${agent?.phone_number || ""}`}
              className="w-full sm:w-[calc(50%-0.5rem)] bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 transition rounded-lg"
            >
              <span className="text-lg"><Phone /></span> Call Now
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${agent?.whatsapp_number?.replace(/\s+/g, '') || ''}?text=Hi, I'm interested in your off-plan properties`}
              target="_blank"
              className="w-full sm:w-[calc(50%-0.5rem)] bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 transition"
            >
              <span className="text-lg"><img src={IconWhatsapp} alt="WhatsApp" className="w-6 h-6" /></span> WhatsApp
            </a>

            {/* Request Callback */}
            {/* <button
              className="w-full mt-4 sm:mt-4 bg-purple-200 text-gray-800 border border-gray-300 hover:bg-gray-100 font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition"

              onClick={() => setShowCallbackModal(true)}
            >
              <span className="text-lg"><Calendar /></span> Request Callback
            </button> */}

            {showCallbackModal && (
              <RequestCallBackModal onClose={() => setShowCallbackModal(false)} />
            )}
          </div>

        </div>


        {/* Property Advisor Card */}
        {/* <div className="max-w-xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-white/90 to-purple-50 rounded-2xl shadow-lg text-center">
          {/* Avatar /}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-white shadow-md overflow-hidden">
            <img
              src={agent.profile_image_url}// Replace with actual image path or import
              alt="Sahar Kalhor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Title /}
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-1">
            {agent.name}
          </h3>
          <p className="text-gray-600 mb-4 text-sm">Your Property Advisor</p>
          <div className="text-sm text-gray-700 font-medium mb-4">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full shadow">
              Trusted Advisor – ⭐ 4.9 (38 reviews)
            </span>
          </div>
          {/* Description /}
          <p className="text-gray-800 text-sm mb-6">
            Speak directly with {agent.name} for pricing, viewings, and exclusive offers.
          </p>

          {/* Chat Button /}
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
            {/* WhatsApp Button /}
            <a
              href={`https://wa.me/${agent?.whatsapp_number?.replace(/\s+/g, '') || ''}?text=Hi, I'm interested in your off-plan properties`}
              target="_blank"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-full flex items-center justify-center gap-1 sm:gap-2 shadow text-sm sm:text-base whitespace-nowrap"
            >
              <span className="text-base sm:text-lg"><MessageCircle /></span> Chat with {agent.name}
            </a>

            {/* Call Now Button /}
            <a
              href={`tel:${agent?.phone_number || ""}`}
              className="flex-1 bg-purple-400 hover:bg-purple-500 text-white px-4 sm:px-6 py-2 rounded-full flex items-center justify-center gap-1 sm:gap-2 shadow text-sm sm:text-base whitespace-nowrap"
            >
              <span className="text-base sm:text-lg"><Phone /></span> Call Now
            </a>
          </div>


        </div> */}
      </div>
      <Footer />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-purple-700 mb-2">
              {/* {modalType === "floor plan" && <>Request <span className="text-pink-600">Floor Plan</span></>} */}
              {modalType === "gallery" && <>Request <span className="text-green-600">Gallery Access</span></>}
              {modalType === "payment plan" && <>Request <span className="text-blue-600">Payment Plan</span></>}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {/* {modalType === "floor plan" && "Enter your details to receive the floor plan for this unit."} */}
              {modalType === "gallery" && "Enter your details to access the gallery and see all images."}
              {modalType === "payment plan" && "Enter your details to get the full payment plan details."}
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700">Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">WhatsApp Number *</label>
                <input
                  type="tel"
                  placeholder="+971 50 123 4567"
                  className="w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg px-4 py-2 outline-none"
                />
              </div>

              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 border border-purple-300 text-purple-700 py-2 rounded-lg hover:bg-purple-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
                >
                  {/* {modalType === "floor plan" && "Send Floor Plan"} */}
                  {modalType === "gallery" && "Send Gallery Access"}
                  {modalType === "payment plan" && "Send Payment Plan"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-md relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setShowReserveModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              Reserve <span className="text-pink-600">This Unit</span>
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              Fill in your details and upload your ID to reserve this unit now.
            </p>

            {/* Reserve Form */}
            <form className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm font-bold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg px-4 py-2 outline-none"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="text-sm font-bold text-gray-700">WhatsApp Number *</label>
                <input
                  type="tel"
                  placeholder="+971 50 123 4567"
                  className="w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg px-4 py-2 outline-none"
                />
              </div>

              {/* ID Upload */}
              <div>
                <label className="text-sm font-bold text-gray-700">Upload ID (Passport/Emirates ID) *</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg px-4 py-2 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowReserveModal(false)}
                  className="w-1/2 border border-purple-300 text-purple-700 py-2 rounded-lg hover:bg-purple-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg shadow hover:opacity-90 transition"
                >
                  Submit Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
            onClick={handleWhatsApp} // Use the first property for WhatsApp
            className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300"
          >
            <img src={IconWhatsapp} alt="WhatsApp" className="w-10 h-10" />
          </button>
        </div>
      )}

    </div>
  )
}

export default PropertyDetailedPage