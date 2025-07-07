import React, { useState, useRef } from 'react';
import { MapPin, Phone, MessageCircle, Wifi, Car, Dumbbell, Waves, Shield, Building, Calendar, CreditCard, Ruler, ChevronDown, ChevronUp, Home, Bed, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './Header';
import logoPath from '@/assets/OFFPLAN_MARKET_female.png';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import IconWhatsapp from "@/assets/icon-whatsapp.svg"

const PropertyDetails2 = () => {

  const unitRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [expandedUnit, setExpandedUnit] = useState(null);
  const [showAllSubUnits, setShowAllSubUnits] = useState(false);

  const toggleUnit = (unitType) => {

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
  const agent = [
    {
    name:"Sahar",
    whatsapp_number:"+971 52 952 9687"
    }
  ]

  const project = {
    title:"Azure Marina Residences",
    location:"Dubai",
    price:"123456789"
  }

  const handleWhatsApp = (project: any) => {
    const message = `Hi ${agent[0].name}! I'm interested in ${project.title} in ${project.location}. Starting from AED ${parseInt(project.price).toLocaleString()}. Can you share more details?`;
    const whatsappUrl = `https://wa.me/${agent[0].whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };


  const unitTypes = [
    {
      type: 'Studio',
      available: 12,
      startingPrice: 'AED 850K',
      icon: <Layout className="text-purple-500" />,
      color: 'bg-purple-50',
      subUnits: [
        { id: 'S-001', floor: 4, size: '450 sq.ft', view: 'Marina View', price: 'AED 850K', status: 'Available' },
        { id: 'S-002', floor: 5, size: '460 sq.ft', view: 'Sea View', price: 'AED 870K', status: 'Available' },
        { id: 'S-003', floor: 6, size: '470 sq.ft', view: 'Palm View', price: 'AED 900K', status: 'Available' },
        { id: 'S-004', floor: 7, size: '480 sq.ft', view: 'City View', price: 'AED 910K', status: 'Available' },
        { id: 'S-005', floor: 8, size: '490 sq.ft', view: 'Marina View', price: 'AED 930K', status: 'Available' },
        { id: 'S-006', floor: 9, size: '500 sq.ft', view: 'Sea View', price: 'AED 950K', status: 'Available' },
        { id: 'S-007', floor: 10, size: '510 sq.ft', view: 'Palm View', price: 'AED 970K', status: 'Available' },
        { id: 'S-008', floor: 11, size: '520 sq.ft', view: 'City View', price: 'AED 990K', status: 'Available' }
      ]
    },
    {
      type: '1 Bedroom',
      available: 8,
      startingPrice: 'AED 1.2M',
      icon: <Bed className="text-pink-500" />,
      color: 'bg-pink-50',
      subUnits: [
        { id: '1B-201', floor: 2, size: '750 sq.ft', view: 'Garden View', price: 'AED 1.2M', status: 'Available' },
        { id: '1B-202', floor: 3, size: '780 sq.ft', view: 'Sea View', price: 'AED 1.25M', status: 'Available' },
        { id: '1B-203', floor: 4, size: '800 sq.ft', view: 'Palm View', price: 'AED 1.3M', status: 'Few Left' }
      ]
    },
    {
      type: '2 Bedroom',
      available: 5,
      startingPrice: 'AED 1.8M',
      icon: <Bed className="text-blue-500" />,
      color: 'bg-blue-50',
      subUnits: [
        { id: '2B-301', floor: 4, size: '1,200 sq.ft', view: 'Marina View', price: 'AED 1.8M', status: 'Available' },
        { id: '2B-302', floor: 5, size: '1,250 sq.ft', view: 'Palm View', price: 'AED 1.9M', status: 'Sold Out' }
      ]
    }
  ];

  const amenities = [
    { name: 'Swimming Pool', icon: Waves, color: 'text-blue-400' },
    { name: 'Gym & Fitness', icon: Dumbbell, color: 'text-pink-400' },
    { name: 'Parking', icon: Car, color: 'text-green-400' },
    { name: 'High Speed WiFi', icon: Wifi, color: 'text-orange-400' },
    { name: '24/7 Security', icon: Shield, color: 'text-red-400' },
    { name: 'Concierge', icon: Building, color: 'text-purple-400' },
  ];

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
        <img
          src="https://panel.estaty.app/images/UYg2XEsJ6pPNQ9fZ-1747329506.webp"
          alt="Property Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
          >
            Azure Marina Residences
          </motion.h1>
          <div className="flex items-center text-white mt-3">
            <MapPin className="w-5 h-5 mr-2" />
            Dubai Marina, Dubai
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col gap-6">
        {/* Top Line: Title + Pre-Launch Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
          <div className="text-gray-800 text-2xl font-bold py-1">
            Luxury Apartments in Dubai Marina
          </div>
          <span className="bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow">
            Pre-Launch
          </span>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Price Range",
              value: "AED 850K – 2.6M",
              icon: "💲",
              bg: "bg-purple-100",
              text: "text-purple-700",
              circle: "bg-purple-300",
            },
            {
              title: "Area Range",
              value: "450 – 1,400 sq.ft.",
              icon: "📏",
              bg: "bg-blue-100",
              text: "text-blue-700",
              circle: "bg-blue-500",
            },
            {
              title: "Handover",
              value: "Q4 2025",
              icon: "📅",
              bg: "bg-green-100",
              text: "text-green-700",
              circle: "bg-green-500",
            },
            {
              title: "Payment Plan",
              value: "20% Down",
              icon: "💳",
              bg: "bg-yellow-100",
              text: "text-yellow-700",
              circle: "bg-yellow-300",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={`flex items-start gap-3 px-4 py-4 rounded-2xl ${item.bg} shadow-sm`}
            >
              <div
                className={`w-10 h-10 rounded-full ${item.circle} text-white flex items-center justify-center font-bold text-sm`}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-md font-bold text-gray-600">{item.title}</div>
                <div className={`text-lg font-extrabold ${item.text}`}>
                  {item.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-4 pt-8">
        {/* Unit Types with nested grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Unit Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {unitTypes.map((unit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleUnit(unit.type)}
                ref={(el) => (unitRefs.current[unit.type] = el)}
                className="rounded-xl bg-white shadow p-5 border hover:border-purple-300 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-full ${unit.color} flex items-center justify-center text-2xl`}>{unit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{unit.type}</h4>
                      <p className="text-gray-500 text-sm">{unit.available} units available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">{unit.startingPrice}</p>
                    </div>
                    <button
                      onClick={() => toggleUnit(unit.type)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      {expandedUnit === unit.type ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>

                {expandedUnit === unit.type && (
                  <div className="mt-5">
                    <div
                      className={`grid gap-5 ${(showAllSubUnits ? unit.subUnits.length : unit.subUnits.slice(0, 6).length) === 1
                          ? 'grid-cols-2 justify-center'
                          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}
                    >
                      {(showAllSubUnits ? unit.subUnits : unit.subUnits.slice(0, 6)).map((sub, subIndex, arr) => {
                        const isOnlyOne = arr.length === 1;
                        return (
                          <div
                            key={subIndex}
                            className={`rounded-2xl border p-4 shadow hover:shadow-md transition-all duration-300 ${arr.length === 1 ? 'sm:col-span-2 md:col-span-1 md:mx-auto' : ''}`}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-gray-700">{sub.id}</span>
                              <span
                                className={`text-sm font-medium ${sub.status === 'Available'
                                    ? 'text-green-600'
                                    : sub.status === 'Few Left'
                                      ? 'text-orange-500'
                                      : 'text-red-500'
                                  }`}
                              >
                                {sub.status}
                              </span>
                            </div>
                            <ul className="text-gray-500 text-sm mb-3">
                              <li>Floor: {sub.floor}</li>
                              <li>Size: {sub.size}</li>
                              <li>View: {sub.view}</li>
                            </ul>
                            <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text">
                              {sub.price}
                            </p>
                            <button className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:opacity-90 transition">
                              View Details
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {unit.subUnits.length > 6 && (
                      <div className="text-center mt-4">
                        <button
                          onClick={() => setShowAllSubUnits(!showAllSubUnits)}
                          className="text-blue-600 hover:underline"
                        >
                          {showAllSubUnits ? 'See Less' : 'See More'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </motion.div>
            ))}
          </div>
        </div>

        {/* About Section */}
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">About This Project</h2> */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold mb-3 text">About This Project</h2>
          <p className="text-gray-600">Luxury waterfront living in the heart of Dubai Marina with stunning views and world-class amenities. This extraordinary development offers residents an unparalleled lifestyle experience with direct marina access, premium finishes, and breathtaking panoramic views of the Arabian Gulf. Each residence is thoughtfully designed with spacious layouts, floor-to-ceiling windows, and high-end specifications that reflect the epitome of modern luxury living.</p>
        </div>

        {/* Location Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-pink-600"><MapPin className="w-5 h-5" /> Location & Address</h3>
          <p className="text-gray-700 font-semibold">Azure Marina Residences</p>
          <p className="text-gray-500 mb-4">Sheikh Zayed Road, Dubai Marina, Dubai, UAE</p>
          <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">Interactive map coming soon</div>
        </div>

        {/* Amenities Section */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-bold mb-3">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border hover:border-purple-300">
                <amenity.icon className={`w-5 h-5 ${amenity.color}`} />
                <span className="text-gray-700 text-sm font-bold">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Plan */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-bold mb-5">Payment Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center border rounded-2xl p-4">
              <p className="text-pink-600 font-extrabold text-xl">20%</p>
              <p className="text-gray-600 font-semibold">Down Payment</p>
            </div>
            <div className="text-center border rounded-2xl p-4">
              <p className="text-blue-600 font-bold text-xl">60%</p>
              <p className="text-gray-600 font-semibold">During Construction</p>
            </div>
            <div className="text-center border rounded-2xl p-4">
              <p className="text-green-600 font-bold text-xl">20%</p>
              <p className="text-gray-600 font-semibold">On Completion</p>
            </div>
            <div className="text-center border rounded-2xl p-4">
              <p className="text-purple-600 font-bold text-xl">Q4 2025</p>
              <p className="text-gray-600 font-semibold">Handover</p>
            </div>
          </div>
          {/* <p className="mt-4 text-gray-500 text-sm"> </p> */}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-450 to-blue-500 rounded-t-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to Make This Your Home?</h3>
          <p className="mb-4 text-white/90">Contact Sahar today for exclusive access and personalized assistance</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600">📞 Call Now</button>
            <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700">💬 Chat on WhatsApp</button>
          </div>
        </div>

        {/* Footer */}
        {/* <footer className="bg-gray-900 text-gray-300 py-8 mt-12 rounded-t-2xl">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-white mb-4">About Us</h4>
              <p className="text-sm opacity-80">Get the latest updates on off-plan properties and insights from Dubai’s real estate market.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>Properties</li>
                <li>Developers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Popular Areas</h4>
              <ul className="space-y-2 text-sm">
                <li>Downtown Dubai</li>
                <li>Palm Jumeirah</li>
                <li>Dubai Marina</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-sm">📧 info@offplan.market</p>
              <p className="text-sm">📞 +971 4 123 4567</p>
              <p className="text-sm">📍 Dubai, UAE</p>
            </div>
          </div>
        </footer> */}
        <Footer/>
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
                <Button
                  onClick={() => handleWhatsApp(project || {})}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl animate-pulse"
                  size="icon"
                >
                  <img
                    src={IconWhatsapp}
                    alt="WhatsApp"
                    className="w-8 h-8 object-contain" // ✅ consistent sizing
                  />
                </Button>
              </div>
      </div>
    </div>
  );
};

export default PropertyDetails2;