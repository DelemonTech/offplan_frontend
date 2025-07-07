import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, ChevronDown, ChevronUp, Layout, Bed, Waves, Dumbbell, Car, Wifi, Shield, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Agent/Header';
import Footer from '../Agent/Footer';
import { Button } from '@/components/ui/button';
import IconWhatsapp from "@/assets/icon-whatsapp.svg";
import logoPath from "@/assets/OFFPLAN_MARKET.png"
import * as LucideIcons from 'lucide-react';
import { useLocation } from "react-router-dom";
// import CallToAction from "@/components/Agent/CallToAction"

const PropertyDetails1 = () => {

  const location = useLocation();
  const agent = location.state?.agent;

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
        const response = await fetch(`https://offplan-backend.onrender.com/property/${projectId}/`);
        const data = await response.json();
        if (data?.status && data?.data) {
          setProjectData(data.data);
          console.log(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);
  console.log('projectttt',projectData);
  
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
    const roomKey = `${unit.apartment_id} Bedroom Apartment`; // Group by apartment_id or customize
    if (!acc[roomKey]) {
      acc[roomKey] = [];
    }
    acc[roomKey].push(unit);
    return acc;
  }, {});

  // Map groupedUnits into unitTypes array
  const unitTypes = Object.entries(groupedUnits).map(([type, units]: [string, any[]]) => ({
    type,
    available: units.length,
    startingPrice: Math.min(...units.map((u) => u.price)), // Find min price in this group
    icon: <Bed className="text-blue-500" />,
    color: "bg-purple-50",
    subUnits: units.map((unit) => ({
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
    })),
  }));




  console.log(projectData.facilities);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header logo={logoPath} />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden mb-10 shadow-lg h-[500px]"
      >
        {/* Background image */}
        <img
          src={projectData.cover}
          alt={projectData.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/5"></div>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
          >
            {projectData.title}
          </motion.h1>
          <div className="flex items-center text-white font-semibold mt-3">
            <MapPin className="w-5 h-5 mr-2" />
            {projectData.district?.name}, {projectData.city?.name}
          </div>
        </div>
      </motion.div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Unit Types */}
        {/*  */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-600 mb-8">
            Available Unit Types
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitTypes.map((unit, index) => (
  <motion.div
    key={index}
    whileHover={{ scale: 1.02 }}
    onClick={() => toggleUnit(unit.type)}
    ref={(el) => (unitRefs.current[unit.type] = el)}
    className="group rounded-2xl bg-white shadow-lg border hover:border-purple-400 transition duration-300 cursor-pointer">
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
          <h4 className="text-lg font-semibold text-gray-900">{unit.type}</h4>
          <p className="text-sm text-gray-500">{unit.available} units available</p>
        </div>
      </div>

      {/* Right: Price */}
      <div className="flex flex-col items-end">
        <p className="text-xs text-gray-400">Starting from</p>
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

    {/* Expanded Sub-Units */}
    {expandedUnit === unit.type && unit.subUnits.length > 0 && (
      <div className="bg-gray-50 rounded-b-2xl p-4 border-t">
        <div
          className={`grid gap-4 ${
            unit.subUnits.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {unit.subUnits.map((sub, subIndex) => (
            <div
              key={subIndex}
              className="rounded-xl border p-3 shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">
                  Apt {sub.id}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    sub.status === "Available"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {sub.status || "N/A"}
                </span>
              </div>

              {/* Details */}
              <ul className="text-gray-500 text-xs mb-2">
                <li>Floor: {sub.floor || "N/A"}</li>
                <li>Size: {sub.size}</li>
                <li>View: {sub.view}</li>
              </ul>

              {/* Price */}
              <p className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                AED {formatPrice(sub.price)}
              </p>

              {/* Optional: Floor Plan Image */}
              {sub.floorPlan && (
                <div className="mt-2 rounded overflow-hidden">
                  <img
                    src={sub.floorPlan}
                    alt={`Floor plan for ${sub.id}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* View Details Button */}
              <div className="mt-3 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent card click
                    alert(`Viewing details for Apt ${sub.id}`);
                    // Or navigate to details page
                    // navigate(`/unit-details/${sub.id}`);
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

    {/* Fallback if no sub-units */}
    {expandedUnit === unit.type && unit.subUnits.length === 0 && (
      <div className="bg-gray-50 rounded-b-2xl p-4 text-center text-gray-500 border-t">
        No units available in this category
      </div>
    )}
  </motion.div>
))}


          </div>
        </div>

        {/*  */}

        {/* About Section */}
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">About This Project</h2> */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-3xl md:text-3xl font-extrabold text-center mb-10 text-gray-600">About {projectData.title}</h2>
          <div
            className="text-gray-600 prose prose-p"
            dangerouslySetInnerHTML={{ __html: projectData.description }}
          ></div>
        </div>

        {/* Location Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-pink-600"><MapPin className="w-5 h-5" /> Location & Address</h3>
          <p className="text-gray-700 font-semibold">{projectData.title}</p>
          <p className="text-gray-500 mb-4">{projectData.city.name}, {projectData.district.name}</p>
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
            <h3 className="text-3xl md:text-3xl font-extrabold text-center mb-10 text-gray-600">Amenities</h3>
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

        {/* Payment Plan */}
        {paymentPlans.length > 0 && (
          <div className="mb-10 rounded-3xl bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl p-6">
            <h3 className="text-3xl md:text-3xl font-extrabold text-center mb-10 text-gray-600">
              Payment Plans
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paymentPlans.map((plan, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  {/* Plan Header */}
                  <div className="mb-5 border-b pb-3">
                    <h4 className="text-xl font-bold text-purple-600">{plan.name}</h4>
                    <p className="text-sm text-gray-500 italic">{plan.description}</p>
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
                          <span className="text-gray-800 font-medium">{val.name}</span>
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
      <div className="bg-gradient-to-r from-pink-500 via-purple-450 to-blue-500 rounded-t-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">Ready to Make This Your Home?</h3>
        <p className="mb-4 text-white/90">Contact {agent.name} today for exclusive access and personalized assistance</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <a href={`tel:${agent.phone_number}`}>
            <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600">📞 Call Now</button></a>
          <a
            href={`https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=Hi, I'm interested in your off-plan properties`}
            target="_blank">
            <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700">💬 Chat on WhatsApp</button></a>
        </div>
      </div>

      {/* <CallToAction agent={agent} /> */}

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

export default PropertyDetails1;
