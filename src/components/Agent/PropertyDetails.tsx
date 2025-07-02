import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import IconWhatsapp from "@/assets/icon-whatsapp.svg"
import {
  MapPin,
  Calendar,
  Ruler,
  Building,
  Phone,
  MessageCircle,
  Share,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Bed,
  Car,
  Wifi,
  Dumbbell,
  Trees,
  Shield,
  Waves,
  Home,
  CreditCard,
  CheckCircle,
} from "lucide-react"

// interface PropertyDetailsModalProps {
//   property: any
//   isOpen: boolean
//   onClose: () => void
//   agent: any
// }

const PropertyDetailsModal = ({ property, isOpen, onClose , agent, setCurrentImageIndex, currentImageIndex }) => {

  if (!property) return null;
  const [isFavorite, setIsFavorite] = useState(false)

  const [isImageLoading, setIsImageLoading] = useState(false);

  if (!property) return null

  const formatAED = (amount: number) => new Intl.NumberFormat("en-AE").format(amount)

  const formatDeliveryDate = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "off plan":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      case "ready":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  const getFacilityEmoji = (name) => {
  const map = {
    "Cafe": "☕️",
    "Children's Play Area": "🧸",
    "Concierge Service": "🛎️",
    "Fitness Club": "💪",
    "Gym": "🏋️",
    "Jacuzzi": "🛁",
    "Restaurant": "🍽️",
    "Sauna": "♨️",
    "Security": "🛡️",
    "Steam room": "💨",
    "Swimming Pool": "🏊",
    "Table Tennis Court": "🏓",
    "Garden": "🌳",
    "BBQ Area": "🍖",
    "Cabana Seating": "🪑",
    "Children's Swimming Pool": "🛝",
    "Co-Working Spaces": "💼",
    "Retail Shops": "🛍️",
    "Basketball Playground": "🏀",
    "Covered Parking": "🚗",
    "Tennis Playground": "🎾",
    "Jogging Track": "🏃",
    "Squash Courts": "🎯",
    "Yuga Hall": "🧘",
    "Football Playground": "⚽",
    "Club House": "🏘️",
    "Cycling Track": "🚴",
    "Supermarket": "🛒",
    "Playground": "🛝",
    "Skate Park": "🛹",
    "Cinema": "🎬",
    "Games Lounge Room": "🎮",
    "Golf playground": "⛳",
    "Paddle playground": "🏓",
    "Electric Vehicle Charging Stations": "🔌",
    "Mini Golf": "🏌️",
    "Badminton Court": "🏸",
    "Music Room": "🎵",
    "Mall": "🏬",
    "Beauty Saloon": "💇",
    "Private Cinema For Each Unit": "🎥",
    "Beach": "🏖️",
    "Mosque": "🕌",
    "School": "🏫",
    "Clinic": "🏥",
    "Nursery": "👶",
    "Pharmacy": "💊",
    "VR Game Room": "🕹️",
    "Multipurpose Hall": "🏛️",
    "Library": "📚",
    "Bicycle parking": "🚴",
    "Smart Homes": "🏠",
    "Dog Park": "🐶",
    "Veterinary Clinic": "🐾",
    "Sunken Seating Area": "🪑",
    "Hospital": "🏥",
    "Opera house": "🎭",
    "Sitting Area": "🪑",
    "Meeting Rooms": "👥",
    "Water Fountain": "⛲",
    "Volleyball Playground": "🏐",
    "Private Parking for Each unit": "🅿️",
    "Theater": "🎭",
    "Traverse climbing walls": "🧗",
    "Private Gym For Each Unit": "🏋️",
    "Bocce Play Area": "🎱",
    "Consult": "🧑‍⚕️",
    "Storage Rooms": "📦",
    "Pet Shop": "🐕",
    "Snow Rooms": "❄️",
    "Lake": "🏞️"
  };
  return map[name] || "🏠";
};

  const getFacilityIcon = (name: string) => {
    return <span className="text-lg">{getFacilityEmoji(name)}</span>;
  }

  const nextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev === property.property_images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => (prev === 0 ? property.property_images.length - 1 : prev - 1))
  }

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${property.title} in ${property.district?.name}, ${property.city?.name}. Can you provide more details?`
    window.open(`https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`, "_blank")
    console.log(agent.whatsapp_number);
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/property/${property.id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch (err) {
      console.error("Copy failed", err)
    }
  }

  

  const availableTabs = [
    property.description && "overview",
    property.property_facilities?.length > 0 && "amenities",
    property.payment_plans?.length > 0 && "payment",
    property.property_images?.length > 0 && "gallery",
  ].filter(Boolean);

  const defaultTab = availableTabs[0] || "overview";

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

 useEffect(() => {
  if (property) {
    setCurrentImageIndex(0);
  }
}, [property?.id]);

  return (
    <Dialog key={isOpen ? 'property-details-open' : 'property-details-closed'}
  open={isOpen}
  onOpenChange={(open) => {
    if (!open) {onClose(); setCurrentImageIndex(0)};
  }}
>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        <DialogHeader className="sticky top-0 z-50 bg-white/95 backdrop-md border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{property.title}</DialogTitle>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2 text-pink-500" />
                <span className="font-medium">
                  {property.city?.name}, {property.district?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 rounded-xl border-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleWhatsApp();
                }}
              >
                <img
                  src={IconWhatsapp}
                  alt="WhatsApp"
                  className="w-8 h-8 object-contain" // ✅ consistent sizing
                />
              </Button>
              {/* <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </Button> */}
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Image Section */}
        <div className="relative h-96 bg-gray-100">
          {property.property_images?.length > 0 && (
            <>
              <img
                src={property.property_images[currentImageIndex]?.image || "/placeholder.svg"}
                alt={property.title}
                onLoad={() => setIsImageLoading(false)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <Badge className={`${getStatusBadgeStyle(property.property_status?.name || "")} absolute top-4 left-4`}>
                {property.property_status?.name}
              </Badge>
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.property_images.length}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price and Key Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-pink-100">
              <CardContent className="p-6">
                <div className="text-sm text-gray-600 mb-2">Starting from</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">AED {formatAED(property.low_price)}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-pink-500" />
                    <span>From {property.min_area} ft²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>{formatDeliveryDate(property.delivery_date)}</span>
                  </div>
                  {property.grouped_apartments?.[0] && (
                    <>
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-purple-500" />
                        <span>{property.grouped_apartments[0].Rooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-green-500" />
                        <span>{property.grouped_apartments[0].Unit_Type}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{property.developer_company?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-green-500" />
                    <span>{property.residential_units} Residential Units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-500" />
                    <span>{property.payment_minimum_down_payment}% Down Payment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="payment">Payment Plan</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: property.description }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium">{property.property_type?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">{property.property_status?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sales Status:</span>
                        <span className="font-medium text-green-600">{property.sales_status?.name}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Date:</span>
                        <span className="font-medium">{formatDeliveryDate(property.delivery_date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Units:</span>
                        <span className="font-medium">{property.residential_units}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Down Payment:</span>
                        <span className="font-medium">{property.payment_minimum_down_payment}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {property.property_facilities?.map((facility: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getFacilityIcon(facility.facility.name)}
                        <span className="text-sm font-medium">{facility.facility.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              {property.payment_plans?.map((plan: any, planIndex: number) => (
                <Card key={planIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      {plan.name}
                    </CardTitle>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {plan.values?.map((value: any, valueIndex: number) => (
                        <div key={valueIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{value.name}</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600">{value.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {property.property_images?.map((image: any, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Actions */}
          {/* <div className="sticky bottom-0 bg-white border-t p-6 mt-8 -mx-6 -mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Inquiry
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2 hover:bg-gray-50 py-3 rounded-xl font-semibold transition-all duration-300 bg-transparent"
                >
                  Schedule Visit
                </Button>
              </div>
            </div> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PropertyDetailsModal;
