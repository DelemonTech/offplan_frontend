
import React, { useState, useEffect } from 'react';
import { Search, Home, Building, Bed, Warehouse, Store, Building2, ShoppingCart, Users, Calendar, ChevronDown, ChevronUp, MapPin, Globe, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';

const SearchFilters = () => {
  const [propertyType, setPropertyType] = useState('Residential');
  const [selectedPropertySubtype, setSelectedPropertySubtype] = useState('Apartment');
  const [bedrooms, setBedrooms] = useState('1');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [areaRange, setAreaRange] = useState([0, 50000]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // Dynamic max values (would come from API)
  const [maxPrice, setMaxPrice] = useState(100000000); // 100M AED
  const [maxArea, setMaxArea] = useState(50000); // 50K sq ft
  
  // Existing filter states
  const [projectName, setProjectName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [developer, setDeveloper] = useState('');
  const [projectStatus, setProjectStatus] = useState('');

  // New filter states for missing filters
  const [rentalGuarantee, setRentalGuarantee] = useState(false);
  const [postHandoverPayment, setPostHandoverPayment] = useState(false);
  const [deliveryYear, setDeliveryYear] = useState('');

  // Simulate API call to get max values
  useEffect(() => {
    // This would be replaced with actual API call
    const fetchMaxValues = async () => {
      // Simulated API response
      setMaxPrice(100000000); // 100M AED
      setMaxArea(50000); // 50K sq ft
      // Update initial ranges
      setPriceRange([0, 100000000]);
      setAreaRange([0, 50000]);
    };
    
    fetchMaxValues();
  }, []);

  // Reset neighborhood when city changes
  useEffect(() => {
    setSelectedNeighborhood('');
  }, [selectedCity]);

  // Format number for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toLocaleString();
  };

  // Format currency
  const formatCurrency = (num: number) => {
    if (num === 0) return '0';
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M AED`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K AED`;
    }
    return `${num.toLocaleString()} AED`;
  };

  const residentialSubtypes = [
    { name: 'Apartment', icon: Building },
    { name: 'Villa', icon: Home },
    { name: 'Townhouse', icon: Building },
    { name: 'Penthouse', icon: Building2 }
  ];

  const commercialSubtypes = [
    { name: 'Office', icon: Building },
    { name: 'Shop', icon: Store },
    { name: 'Warehouse', icon: Warehouse },
    { name: 'Retail', icon: ShoppingCart }
  ];

  const cities = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain'
  ];

  // Neighborhoods organized by city
  const neighborhoodsByCity = {
    'dubai': [
      'JVC (Jumeirah Village Circle)',
      'Dubai Hills Estate',
      'Downtown Dubai',
      'Dubai Marina',
      'Business Bay',
      'DIFC (Dubai International Financial Centre)',
      'Jumeirah Beach Residence (JBR)',
      'Palm Jumeirah',
      'Arabian Ranches',
      'Emirates Living',
      'Motor City',
      'Sports City',
      'Al Furjan',
      'Dubailand',
      'Mirdif'
    ],
    'abu dhabi': [
      'Al Reem Island',
      'Saadiyat Island',
      'Yas Island',
      'Al Raha Beach',
      'Corniche Area',
      'Al Khalidiyah',
      'Al Mushrif',
      'Al Reef',
      'Khalifa City',
      'Marina Village'
    ],
    'sharjah': [
      'Al Majaz',
      'Al Khan',
      'Al Nahda',
      'Muwailih',
      'Al Taawun',
      'Al Qasimia',
      'Al Fisht',
      'University City',
      'Al Ramla',
      'Al Buhaira'
    ],
    'ajman': [
      'Al Nuaimiya',
      'Al Rashidiya',
      'Al Jurf',
      'Al Hamidiyah',
      'Al Corniche',
      'China Mall Area',
      'Ajman Marina',
      'Al Zahra',
      'Al Rumailah',
      'Al Helio'
    ],
    'ras al khaimah': [
      'Al Hamra',
      'Mina Al Arab',
      'Al Marjan Island',
      'Corniche Al Qawasim',
      'Al Nakheel',
      'Flamingo Villas',
      'Julphar',
      'Al Rams',
      'Al Mairid',
      'Khuzam'
    ],
    'fujairah': [
      'Corniche Fujairah',
      'Al Faseel',
      'Dibba',
      'Kalba',
      'Al Bidyah',
      'Masafi',
      'Al Hayl',
      'Qidfa',
      'Al Aqah',
      'Madhab'
    ],
    'umm al quwain': [
      'Old Town',
      'Al Raas',
      'Falaj Al Mualla',
      'Al Salam City',
      'Dreams Land',
      'Al Humra',
      'UAQ Marina',
      'Al Boom',
      'Al Dur',
      'Al Rafaah'
    ]
  };

  // Get filtered neighborhoods based on selected city
  const getFilteredNeighborhoods = () => {
    if (!selectedCity) return [];
    return neighborhoodsByCity[selectedCity.toLowerCase()] || [];
  };

  const developers = [
    'Emaar Properties',
    'Dubai Properties',
    'DAMAC Properties',
    'Nakheel',
    'Meraas',
    'Sobha Realty',
    'Ellington Properties',
    'Azizi Developments'
  ];

  const projectStatuses = [
    'Off-plan',
    'Ready',
    'Handover Soon',
    'Under Construction',
    'Completed'
  ];

  const deliveryYears = [
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030+'
  ];

  const currentSubtypes = propertyType === 'Commercial' ? commercialSubtypes : residentialSubtypes;
  const bedroomOptions = ['1', '2', '3', '4', '5', '6+'];

  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(type);
    setSelectedPropertySubtype(type === 'Commercial' ? 'Office' : 'Apartment');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Filters: City & Neighborhood */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <div className="flex items-center mb-3">
            <Globe className="mr-2 text-gray-600" size={18} />
            <label className="text-sm font-semibold text-gray-700">City</label>
          </div>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg">
              {cities.map((city) => (
                <SelectItem key={city} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Neighborhood */}
        <div>
          <div className="flex items-center mb-3">
            <MapPin className="mr-2 text-gray-600" size={18} />
            <label className="text-sm font-semibold text-gray-700">Neighborhood</label>
          </div>
          <Select 
            value={selectedNeighborhood} 
            onValueChange={setSelectedNeighborhood}
            disabled={!selectedCity}
          >
            <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
              <SelectValue placeholder={selectedCity ? "Select area" : "Select city first"} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg max-h-60">
              {getFilteredNeighborhoods().map((neighborhood) => (
                <SelectItem key={neighborhood} value={neighborhood.toLowerCase()}>
                  {neighborhood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Enhanced Property Type Toggle */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
        <div className="flex rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 p-1.5 shadow-inner">
          {['Residential', 'Commercial'].map((type) => (
            <button
              key={type}
              onClick={() => handlePropertyTypeChange(type)}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                propertyType === type
                  ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Property Subtypes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          {propertyType === 'Commercial' ? 'Commercial Property Types' : 'Residential Property Types'}
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {currentSubtypes.map((subtype) => {
            const IconComponent = subtype.icon;
            return (
              <button
                key={subtype.name}
                onClick={() => setSelectedPropertySubtype(subtype.name)}
                className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedPropertySubtype === subtype.name
                    ? 'border-pink-400 bg-gradient-to-br from-pink-50 to-blue-50 text-pink-700 shadow-md'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-white/70 bg-white/50'
                }`}
              >
                <IconComponent className="mx-auto mb-2" size={20} />
                <div className="text-xs sm:text-sm font-semibold">{subtype.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bedrooms - Only show for Residential */}
      {propertyType === 'Residential' && (
        <div>
          <div className="flex items-center mb-3">
            <Bed className="mr-2 text-gray-600" size={18} />
            <label className="text-sm font-semibold text-gray-700">Bedrooms</label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {bedroomOptions.map((num) => (
              <button
                key={num}
                onClick={() => setBedrooms(num)}
                className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  bedrooms === num
                    ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow-md'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Filters Section */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 bg-white/50 border-gray-200 hover:bg-white/80 rounded-xl font-semibold text-gray-700 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              {isAdvancedOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              Advanced Filters
            </span>
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-6 mt-6 p-4 sm:p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20">
          {/* Project Name */}
          <div>
            <div className="flex items-center mb-3">
              <Building className="mr-2 text-gray-600" size={18} />
              <label className="text-sm font-semibold text-gray-700">Project Name</label>
            </div>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg"
            />
          </div>

          {/* Developer */}
          <div>
            <div className="flex items-center mb-3">
              <Users className="mr-2 text-gray-600" size={18} />
              <label className="text-sm font-semibold text-gray-700">Developer</label>
            </div>
            <Select value={developer} onValueChange={setDeveloper}>
              <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
                <SelectValue placeholder="Select developer" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                {developers.map((dev) => (
                  <SelectItem key={dev} value={dev.toLowerCase()}>
                    {dev}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Status */}
          <div>
            <div className="flex items-center mb-3">
              <Calendar className="mr-2 text-gray-600" size={18} />
              <label className="text-sm font-semibold text-gray-700">Project Status</label>
            </div>
            <Select value={projectStatus} onValueChange={setProjectStatus}>
              <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                {projectStatuses.map((status) => (
                  <SelectItem key={status} value={status.toLowerCase()}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price and Area Range */}
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="bg-white/50 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold text-gray-700">Price Range (AED)</span>
                <span className="ml-2 text-yellow-500 text-lg">💰</span>
              </div>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={maxPrice}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between items-center mt-3 text-sm text-gray-600 font-medium">
                  <div className="text-left">
                    <span className="block text-xs text-gray-500">Min</span>
                    <span className="block text-sm font-semibold">{formatCurrency(priceRange[0])}</span>
                  </div>
                  <span className="text-center text-xs text-gray-400">to</span>
                  <div className="text-right">
                    <span className="block text-xs text-gray-500">Max</span>
                    <span className="block text-sm font-semibold">{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold text-gray-700">Area Range (sq ft)</span>
                <span className="ml-2 text-orange-500 text-lg">📏</span>
              </div>
              <div className="px-2">
                <Slider
                  value={areaRange}
                  onValueChange={setAreaRange}
                  max={maxArea}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between items-center mt-3 text-sm text-gray-600 font-medium">
                  <div className="text-left">
                    <span className="block text-xs text-gray-500">Min</span>
                    <span className="block text-sm font-semibold">{areaRange[0].toLocaleString()} sq ft</span>
                  </div>
                  <span className="text-center text-xs text-gray-400">to</span>
                  <div className="text-right">
                    <span className="block text-xs text-gray-500">Max</span>
                    <span className="block text-sm font-semibold">{areaRange[1].toLocaleString()} sq ft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Filters: Rental Guarantee & Post Handover Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="mr-2 text-gray-600" size={18} />
                  <label className="text-sm font-semibold text-gray-700">Rental Guarantee</label>
                </div>
                <Switch
                  checked={rentalGuarantee}
                  onCheckedChange={setRentalGuarantee}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Guaranteed rental income</p>
            </div>

            <div className="bg-white/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="mr-2 text-gray-600" size={18} />
                  <label className="text-sm font-semibold text-gray-700">Post Handover Payment</label>
                </div>
                <Switch
                  checked={postHandoverPayment}
                  onCheckedChange={setPostHandoverPayment}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Payment plan after handover</p>
            </div>
          </div>

          {/* Delivery Year */}
          <div>
            <div className="flex items-center mb-3">
              <Calendar className="mr-2 text-gray-600" size={18} />
              <label className="text-sm font-semibold text-gray-700">Delivery Year</label>
            </div>
            <Select value={deliveryYear} onValueChange={setDeliveryYear}>
              <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
                <SelectValue placeholder="Select delivery year" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                {deliveryYears.map((year) => (
                  <SelectItem key={year} value={year.toLowerCase()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Enhanced Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        <Button 
          variant="outline" 
          className="flex-1 h-12 sm:h-14 text-gray-600 border-gray-300 hover:bg-white/80 rounded-xl font-semibold"
        >
          Reset Filters
        </Button>
        <Button className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          🔍 Show Properties
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
