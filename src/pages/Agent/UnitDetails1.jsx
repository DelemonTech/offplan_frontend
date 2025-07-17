import React ,{useState} from 'react'
import Header from '../../components/others/Header'
// import Header from "@/components/HomeHeader";
import { ArrowLeft, MapPin, Ruler,Maximize, DollarSign, Building, Eye,Shield, Calendar,Flame, Bath, Bed, Phone, Mail, Download, Share2, MessageCircle, Home, CheckCircle, Image, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import unit from '../../assets/unit.jpeg';
import girl from '../../assets/girl.jpg'
import forplan from '../../assets/forplan1.webp';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Agent/Footer'
// import { jsPDF } from "jspdf";
import IconWhatsapp from "@/assets/icon-whatsapp.svg";

const UnitDetails1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const location = useLocation();
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showFloorPlanImage, setShowFloorPlanImage] = useState(false);
  const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);

  const { unit, projectData, agent } = location.state || {};

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

// Calculate handover quarter
const handover = (() => {
  const delivery = projectData?.delivery_date;
  if (!delivery) return "N/A";

  if (typeof delivery === "number") {
    const date = new Date(delivery * 1000);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const quarter = Math.ceil(month / 3);
    return `Q${quarter} ${year}`;
  }

  if (typeof delivery === "string") return delivery;

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
    value:`${formatPrice(unit.price)}`,
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


  return (
    <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button                 
              variant="outline"
              size="sm"
              className="mb-7 rounded-lg flex items-center gap-2 hover:bg-pink-50 hover:text-violet-600 border-gray-300 text-violet-600 px-4 py-3 h-8 mt-2 text-sm"
            >
              <ArrowLeft size={14} />
              Back to Project
            </Button>
        
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-8 mt-6">
                <div className="relative h-[350px] lg:h-[450px]">
                   <img
                     src={projectData.cover}
                     alt="Unit"
                     className="w-full h-full object-cover"
                   />
               
                   {/* Gradient overlay for better text visibility */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
               
                   {/* Text content over image */}
                   <div className="absolute bottom-4 left-4 z-10">
                     <h2 className="text-xl text-white  lg:text-2xl font-bold mb-1">
                        {projectData.title} - Unit ID : {unit.id}
                     </h2>
                     <p className="text-sm flex text-white  items-center gap-1 mb-1">
                       <span className="material-icons text-sm"><MapPin/></span>{projectData.city?.name}, {projectData.district?.name}
                     </p>
                     <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text py-1">AED {formatPrice(unit.price)}</p>
                    <p className="flex items-center text-sm font-medium text-white mt-1 gap-1">
  <Flame className="text-yellow-400" />
  Reserve 24/7 – <span className="text-1xl font-bold text-white text-transparent bg-clip-text py-1">No Down Payment Required!</span>
</p>


                   </div>
                   
               
                   {/* Availability badge */}
                   <div className="absolute top-4 right-4">
                     <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                       {unit.status}
                     </span>
                   </div>
                </div>
            </div>
            {/* Feature Info Boxes */}
           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 mt-4">

              {featureList.map((item, idx) => (
                <div
                key={idx}
                className={`rounded-xl p-4 shadow-md flex flex-col items-center text-center transition shadow-lg ${
                  idx % 2 === 0 ? 'bg-gradient-to-r from-pink-200 to-purple-200' : 'bg-gradient-to-r from-purple-400 to-blue-200'
                }`}
              >
                <div
                  className={`w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white text-lg`}
                >
                  {item.icon}
                </div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-semibold text-black">{item.value}</p>
              </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-violet-600 mb-4">Floor Plan</h3>
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
                              <img
                                src={unit.floorPlan}
                                alt="Floor Plan"
                                className="w-full h-72 object-cover"
                              />
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
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Unit Price & Payment Plan</h3>
              
              {/* Unit Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
  <div className="border bg-purple-100 rounded-xl p-4 hover:bg-purple-200 hover:border-purple-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
    <p className="text-sm text-gray-600 mb-1">Unit ID</p>
    <p className="text-md font-semibold text-black">{unit.id}</p>
  </div>

  <div className="border bg-purple-100 rounded-xl p-4 hover:bg-purple-200 hover:border-purple-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
    <p className="text-sm text-gray-600 mb-1">Status</p>
    <p className="text-md font-semibold text-green-600">{unit.status}</p>
  </div>

  <div className="border bg-purple-100 rounded-xl p-4 hover:bg-purple-200 hover:border-purple-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
    <p className="text-sm text-gray-600 mb-1">Size</p>
    <p className="text-md font-semibold text-black">{unit.size}</p>
  </div>

  <div className="border bg-purple-100 rounded-xl p-4 hover:bg-purple-200 hover:border-purple-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
    <p className="text-sm text-gray-600 mb-1">Unit Price</p>
    <p className="text-md font-bold text-purple-600">AED {formatPrice(unit.price)}</p>
  </div>
</div>

            
              {/* Payment Plan */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center  bg-purple-100 border rounded-xl p-4">
                  <p className="text-pink-600 text-xl font-bold mb-1">20%</p>
                  <p className="text-gray-700">Down Payment</p>
                </div>
                <div className="text-center  bg-purple-100 border rounded-xl p-4">
                  <p className="text-blue-600 text-xl font-bold mb-1">60%</p>
                  <p className="text-gray-700">During Construction</p>
                </div>
                <div className="text-center  bg-purple-100 border rounded-xl p-4">
                  <p className="text-green-600 text-xl font-bold mb-1">20%</p>
                  <p className="text-gray-700">On Completion</p>
                </div>
                <div className="text-center  bg-purple-100 border rounded-xl p-4">
                  <p className="text-purple-600 text-xl font-bold mb-1">Q4 2025</p>
                  <p className="text-gray-700">Handover</p>
                </div>
              </div> */}
              {/* Payment Plan */}
{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-6">
  {paymentPlans.length > 0 ? (
    paymentPlans[0].values.map((val, idx) => (
      <div
        key={idx}
        className="text-center bg-purple-100 border rounded-xl p-4"
      >
       
        <p className={`text-xl font-bold mb-1 ${colorClasses[idx % colorClasses.length]}`}>
          {val.value}
        </p>
        <p className="text-gray-700">{val.name}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 col-span-full">No payment plans available.</p>
  )}
</div>
 */}
<div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-6">
  {paymentPlans.length > 0 ? (
    paymentPlans.map((plan, index) => (
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
    ))
  ) : (
    <p className="text-gray-500 col-span-full">No payment plans available.</p>
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
                  icon: <Image/>,
                  bg: 'bg-pink-100',
                  textColor: 'text-violet-600',
                  buttonColor: 'text-violet-600 border border-violet-200',
                },
                {
                  title: 'Floor Plan',
                  description: 'Download detailed floor plan',
                  button: 'Download Plan',
                  icon: <FileText/>,
                  bg: 'bg-blue-50',
                  textColor: 'text-blue-600',
                  buttonColor: 'text-blue-600 border border-blue-200',
                },
                {
                  title: 'Payment Plan',
                  description: 'Flexible payment options',
                  button: 'View Details',
                  icon: <CreditCard/>,
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
    if (unit.floorPlan && unit.floorPlan !== "NO_FLOOR_PLAN") {
      window.open(unit.floorPlan, "_blank", "noopener,noreferrer");
    } else {
      alert("No floor plan available");
    }
  } else if (card.title === "Payment Plan") {
    setShowPaymentPlanModal(true);
  } else {
    setModalType(card.title.toLowerCase());
    setShowModal(true);
  }
}}


  className={`w-full py-2 rounded-xl font-medium text-sm ${card.buttonColor} hover:bg-opacity-10`}
>
  {card.button}
</button>



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
      <span className="text-white text-lg"><Shield/></span>
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

    <button className="w-full sm:w-1/2 bg-gradient-to-r from-purple-600 via-pink-500 to-pink-500 text-white font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 border border-white/30 hover:opacity-90 transition">
      <span className="text-lg"><Calendar/></span> Pay Booking Fee
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

 <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md text-center border border-gray-200">
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
            <button className="w-full mt-4 sm:mt-4 bg-purple-200 text-gray-800 border border-gray-300 hover:bg-gray-100 font-medium py-2.5 rounded-lg flex justify-center items-center gap-2 transition">
              <span className="text-lg"><Calendar /></span> Request Callback
            </button>
          </div>

        </div>


            {/* Property Advisor Card */}
            
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
  {/* {modalType === "payment plan" && <>Request <span className="text-blue-600">Payment Plan</span></>} */}
</h2>
<p className="text-gray-600 text-sm mb-4">
  {/* {modalType === "floor plan" && "Enter your details to receive the floor plan for this unit."} */}
  {modalType === "gallery" && "Enter your details to access the gallery and see all images."}
  {/* {modalType === "payment plan" && "Enter your details to get the full payment plan details."} */}
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
  {/* {modalType === "payment plan" && "Send Payment Plan"} */}
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
{showPaymentPlanModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
    <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-3xl relative shadow-xl">
      {/* Close Button */}
      <button
        onClick={() => setShowPaymentPlanModal(false)}
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Full Payment Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {paymentPlans.length > 0 ? (
          paymentPlans.map((plan, index) => (
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
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No payment plans available.</p>
        )}
      </div>
    </div>
  </div>
)}
{modalType === "gallery" && showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl w-full max-w-4xl relative shadow-2xl border border-purple-200 overflow-hidden">
      
      {/* Scrollable inner content */}
      <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center mb-8">
          Unit Image Gallery
        </h2>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {[projectData.cover, forplan].map((img, index) => (
    <div
      key={index}
      className="bg-white rounded-xl border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        {/* Image with rounded top corners */}
        <img
          src={img}
          alt={`Gallery Image ${index + 1}`}
          className="w-full h-64 object-cover rounded-t-xl"
        />

        {/* Gradient circle arrow */}
        <a
          href={img}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-lg"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 3h7m0 0v7m0-7L10 14"
            />
          </svg>
        </a>
      </div>

      {/* Optional info block below image */}
      {/* <div className="p-4 text-sm text-gray-600">Some detail here</div> */}
    </div>
  ))}
</div>


        {/* Footer Action */}
        {/* <div className="mt-10 text-center">
          <button
            onClick={() => setShowModal(false)}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full font-medium shadow hover:shadow-md hover:opacity-90 transition-all"
          >
            Close Gallery
          </button>
        </div> */}
      </div>
    </div>
  </div>
)}



    </div>
  )
}

export default UnitDetails1