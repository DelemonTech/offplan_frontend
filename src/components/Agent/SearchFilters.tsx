
import React, { useState, useEffect } from 'react';
import { Search, Home, Building, Bed, Warehouse, Store, Building2, ShoppingCart, Users, Calendar, ChevronDown, ChevronUp, MapPin, Globe, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';

const SearchFilters = ({ statusName, setStatusName, setProperties, setNextPageUrl, setPropertyType,
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
  setDeliveryYear,
  citiesData,
  selectedCity,
  propertyType,
  selectedPropertySubtype,
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
  setProjectStatus,
  propertyStatus,
  setPropertyStatus,
  deliveryYear,
  developers,
  setDevelopers,
  isSearchLoading,
  setIsSearchLoading

}) => {

  const cityOptions = citiesData.map((city) => city.name);

  // get the selected city object
  const selectedCityData = citiesData.find((city) => city.name === selectedCity);

  const hostUrl = import.meta.env.VITE_HOST_URL;

  // get districts of selected city
  const getFilteredNeighborhoods = () => {
    if (!selectedCity || citiesData.length === 0) {
      return []; // ✅ Return an empty array, not undefined
    }
    const city = citiesData.find((c) => c.name === selectedCity);
    return city?.districts || [];
  };


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

  const [userSelectedCity, setUserSelectedCity] = useState("");

  const [salesStatus, setSalesStatus] = useState('');
  // const [propertyStatus, setPropertyStatus] = useState('');

  const resetFilters = () => {
    setSelectedCity('');
    setUserSelectedCity('');
    setSelectedNeighborhood('');
    setPropertyType('');
    setSelectedPropertySubtype('');
    setBedrooms('');
    setDeliveryYear('');
    setPriceRange([0, maxPrice]); // or default range
    setAreaRange([0, maxArea]);   // or default range
    setDeveloper('');
    setProjectName('');
    setPropertyStatus('');
    setStatusName('');
    setDeliveryYear('');
  };

  const handleSearch = async () => {
    // window.scrollTo({ top: 930, behavior: 'smooth' });
    setIsSearchLoading(true);

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
      sales_status: '',
      title: projectName || '',           // ✅ Include project name
      developer: developer || '',                // ✅ Include developer
      ...(statusName !== 'Total' && { property_status: statusName }),
      // project_status: projectStatus || '',       // ✅ Include project status
    };


    // Decide status based on `statusName`
    // if (statusName.toLowerCase() === 'sold out') {
    //   filters.sales_status = 'Sold Out';
    // } 
    if (propertyStatus) {
      setStatusName(propertyStatus);
      filters.property_status = propertyStatus;
    } else {
      setStatusName('');
    }

    // 👉 Optional: log the final request body
    // console.log("🔍 Sending search filters:", filters);

    try {
      const response = await fetch(`${hostUrl}/properties/filter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      const result = await response.json();

      if (result?.status && result?.data) {
        setProperties(result.data.results || []);
        setNextPageUrl(result.data.next_page_url || null);
      }
      // setTimeout(() => {
      //   window.scrollTo({ top: 930, behavior: 'smooth' });
      // }, 100);
    } catch (error) {
      console.error('❌ Search error:', error);
    }
    finally {
      setIsSearchLoading(false); // ✅ Stop loading
    }
  };

  const projectStatuses = [
    'Ready',
    'Off Plan'
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

  // useEffect(() => {
  //   // Replace this with actual API fetch if needed
  //   fetchCitiesFromAPI();
  // }, []);

  // const fetchCitiesFromAPI = async () => {
  //   const response = await fetch('https://offplan-backend.onrender.com/cities'); // or use your endpoint
  //   const result = await response.json();
  //   if (result.status) {
  //     setCitiesData(result.data);
  //   }
  // };

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch(`${hostUrl}/developers/`);
        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          setDevelopers(result.data.map(dev => dev.name)); // if you only want developer names
        } else {
          console.warn("Developer list empty or invalid");
        }
      } catch (error) {
        console.error("Failed to fetch developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  // console.log("City : ", selectedNeighborhood, "!");

  useEffect(() => {
    if (selectedCity) {
      const neighborhoods = getFilteredNeighborhoods();

      if (neighborhoods.length > 0) {
        // Optional: auto-select the first neighborhood
        setSelectedNeighborhood("");
      } else {
        setSelectedNeighborhood(""); // Clear if no neighborhoods
      }
    } else {
      setSelectedNeighborhood(""); // Clear if no city
    }
  }, [selectedCity, citiesData]);


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
          {citiesData.length > 0 && (
            <Select value={userSelectedCity || ""} onValueChange={(value) => { setSelectedCity(value); setUserSelectedCity(value) }}>
              <SelectTrigger className="h-11 bg-white/70 border-gray-200 rounded-lg">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {citiesData.map(city => (
                  <SelectItem key={city.id} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>)}
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
            disabled={!selectedCity} // disable until city is selected
          >
            <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
              <SelectValue placeholder={selectedCity ? "Select area" : "Select city first"} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg max-h-60 overflow-y-auto">
              {selectedCity ? (
                getFilteredNeighborhoods().length > 0 ? (
                  getFilteredNeighborhoods().map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-gray-500 text-center text-xs">No neighborhoods found</div>
                )
              ) : (
                <div className="p-2 text-gray-500 text-center">Select a city first</div>
              )}
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
              className={`flex-1 py-3 px-4 sm:px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${propertyType === type
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
                className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 ${selectedPropertySubtype === subtype.name
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
                className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${bedrooms === num
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
              <label className="text-sm font-semibold text-gray-700">Property Status</label>
            </div>
            <Select
              onValueChange={(value) => {
                setPropertyStatus(value);
                // console.log("property status: ", value);
              }}
            >
              <SelectTrigger className="h-11 bg-white/70 border-gray-200 focus:border-pink-400 focus:ring-pink-300 rounded-lg">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                {projectStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
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
          type="button"
          variant="outline"
          className="flex-1 h-12 sm:h-14 text-gray-600 border-gray-300 hover:bg-white/80 rounded-xl font-semibold"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
        <Button
          className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          onClick={() => {

            // if (propertyStatus?.toLowerCase() === 'ready') {
            //   setStatusName('Ready');
            // } else if (propertyStatus?.toLowerCase() === 'off plan') {
            //   setStatusName('Off Plan');
            // } else {
            //   setStatusName('');
            // }

            const scrollTarget = document.getElementById('featured-projects');
            if (scrollTarget) {
              scrollTarget.scrollIntoView({ behavior: 'smooth' });
            }
            handleSearch();
          }
          }
        >
          🔍 Show Properties
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
