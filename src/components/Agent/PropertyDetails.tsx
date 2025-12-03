  import { useState, useEffect } from "react"
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import IconWhatsapp from "@/assets/icon-whatsapp.svg"
  import {
    MapPin, Calendar, Ruler, Building, Phone, MessageCircle, Share, Heart, X,
    ChevronLeft, ChevronRight, Bed, Home, CreditCard, CheckCircle
  } from "lucide-react"

  const PropertyDetailsModal = ({ property, isOpen, onClose, agent, setCurrentImageIndex, currentImageIndex }) => {
    if (!property) return null;
    const [isFavorite, setIsFavorite] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    const formatAED = (amount) => new Intl.NumberFormat("en-AE").format(amount);
    const formatDeliveryDate = (timestamp) => new Date(Number(timestamp) * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long" });

    const getStatusBadgeStyle = (status) => {
      switch (status.toLowerCase()) {
        case "off plan": return "bg-gradient-to-r from-blue-500 to-purple-600 text-white";
        case "ready": return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
        default: return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
      }
    };

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

    const getFacilityIcon = (name) => <span className="text-lg">{getFacilityEmoji(name)}</span>;

    const nextImage = () => {
      setIsImageLoading(true);
      setCurrentImageIndex(prev => (prev === property.property_images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
      setIsImageLoading(true);
      setCurrentImageIndex(prev => (prev === 0 ? property.property_images.length - 1 : prev - 1));
    };

    const handleWhatsApp = () => {
      const message = `Hi! I'm interested in ${property.title} in ${property.district?.name}, ${property.city?.name}. Can you provide more details?`;
      window.open(`https://wa.me/${agent.whatsapp_number.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`, "_blank");
    };

    const handleShare = async () => {
      const url = `${window.location.origin}/property/${property.id}`;
      try {
        await navigator.clipboard.writeText(url);
      } catch (err) {
        console.error("Copy failed", err);
      }
    };

    useEffect(() => {
      if (property) setCurrentImageIndex(0);
    }, [property?.id]);

    return (
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); setCurrentImageIndex(0); } }}>
        <DialogContent className="w-full max-w-6xl max-h-[95vh] overflow-y-auto p-0 bg-white rounded-xl sr-only">
          <DialogHeader className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b p-4">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug sr-only">
                  {property.title}
                </DialogTitle>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin size={14} className="mr-1 text-pink-500" />
                  {property.city?.name}, {property.district?.name}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={handleWhatsApp} className="hover:border-green-400">
                  <img src={IconWhatsapp} alt="WhatsApp" className="w-6 h-6" />
                </Button>
                <Button size="icon" variant="outline" onClick={handleShare}>
                  <Share className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
            {property.property_images?.length > 0 && (
              <>
                <img
                  src={property.property_images[currentImageIndex]?.image || "/placeholder.svg"}
                  onLoad={() => setIsImageLoading(false)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                />
                <Button onClick={prevImage} size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button onClick={nextImage} size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80">
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Badge className={`${getStatusBadgeStyle(property.property_status?.name || "")} absolute top-4 left-4`}>{property.property_status?.name}</Badge>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.property_images.length}
                </div>
              </>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {/* Pricing & Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-pink-100">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">AED {formatAED(property.low_price)}</div>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                    <div className="flex items-center gap-1"><Ruler className="h-4 w-4 text-pink-500" />{property.min_area} ft²</div>
                    <div className="flex items-center gap-1"><Calendar className="h-4 w-4 text-blue-500" />{formatDeliveryDate(property.delivery_date)}</div>
                    {property.grouped_apartments?.[0] && (
                      <>
                        <div className="flex items-center gap-1"><Bed className="h-4 w-4 text-purple-500" />{property.grouped_apartments[0].Rooms} Bed</div>
                        <div className="flex items-center gap-1"><Building className="h-4 w-4 text-green-500" />{property.grouped_apartments[0].Unit_Type}</div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="text-lg font-semibold mb-2">Developer Info</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Building className="w-4 h-4 text-blue-500" />{property.developer_company?.name}</div>
                    <div className="flex items-center gap-2"><Home className="w-4 h-4 text-green-500" />{property.residential_units} Units</div>
                    <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-purple-500" />{property.payment_minimum_down_payment}% Down</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4 flex flex-wrap gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card><CardHeader><CardTitle>Description</CardTitle></CardHeader>
                <CardContent><div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: property.description }} /></CardContent></Card>
              </TabsContent>

              <TabsContent value="amenities">
                <Card><CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {property.property_facilities?.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                        {getFacilityIcon(f.facility.name)}
                        <span className="text-sm">{f.facility.name}</span>
                      </div>
                    ))}
                  </div></CardContent></Card>
              </TabsContent>

              <TabsContent value="payment">
                {property.payment_plans?.map((plan, i) => (
                  <Card key={i}><CardHeader><CardTitle>{plan.name}</CardTitle><p>{plan.description}</p></CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {plan.values?.map((v, j) => (
                        <div key={j} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="flex items-center gap-1 text-sm"><CheckCircle className="h-4 w-4 text-green-500" />{v.name}</span>
                          <span className="text-sm font-semibold text-blue-600">{v.value}</span>
                        </div>
                      ))}
                    </div></CardContent></Card>
                ))}
              </TabsContent>

              <TabsContent value="gallery">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {property.property_images?.map((img, i) => (
                    <div key={i} onClick={() => setCurrentImageIndex(i)} className="cursor-pointer group relative overflow-hidden rounded-md aspect-square">
                      <img src={img.image || "/placeholder.svg"} className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  export default PropertyDetailsModal;
