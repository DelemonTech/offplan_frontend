import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Agent/Header';
import HeroSection from '@/components/Agent/HeroSection';
import SearchFilters from '@/components/Agent/SearchFilters';
import Footer from '@/components/Agent/Footer';
import FeaturedProjects from '@/components/Agent/FeaturedProjects';
import CallToAction from '@/components/Agent/CallToAction';
import AgentProfile from '@/components/Agent/AgentProfile';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Search, Sparkles } from 'lucide-react';
import NotFound from '../NotFound';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import maleLogo from '@/assets/OFFPLAN_MARKET_male.png';
import femaleLogo from '@/assets/OFFPLAN_MARKET_female.png';
import defaultLogo from '@/assets/OFFPLAN_MARKET.png';

const AgentPageContent = () => {

  function setFavicon(gender: string) {
  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.type = "image/x-icon";
  link.href =
    gender === "male"
      ? "/favicon_male.ico"
      : gender === "female"
      ? "/favicon_female.ico"
      : "/favicon.ico";
}


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
    const [citiesData, setCitiesData] = useState([]); // full data with districts
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  
    const [developer, setDeveloper] = useState('');
    const [propertyStatus, setPropertyStatus] = useState('');

    const [projectStatus, setProjectStatus] = useState('');
    const [subunit_count, setSubUnitCount] = useState('');

    const [isCitiesLoading, setIsCitiesLoading] = useState(true);
  
    // New filter states for missing filters
    // const [rentalGuarantee, setRentalGuarantee] = useState(false);
    // const [postHandoverPayment, setPostHandoverPayment] = useState(false);
    const [deliveryYear, setDeliveryYear] = useState('');
    const [developers, setDevelopers] = useState([]);

    const [isSearchLoading, setIsSearchLoading] = useState(false);


    const [gender, setGender] = useState(null);
    const [logoPath, setLogoPath] = useState("@/assets/OFFPLAN_MARKET.png");

useEffect(() => {
  if (gender) {
    setFavicon(gender);
    if (gender === 'male') {
      setLogoPath(maleLogo);
    } else if (gender === 'female') {
      setLogoPath(femaleLogo);
    } else {
      setLogoPath(defaultLogo);
    }
  }
  console.log("gender : ",logoPath)
}, [gender]);


  const { username } = useParams();
  const [agentData, setAgentData] = useState(null);
  const [properties, setPropertiesData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const [statusName, setStatusName] = useState("Ready");

useEffect(() => {
  const fetchAll = async () => {
    setLoading(true);
    try {
      const agentRes = await fetch(`https://offplan-backend.onrender.com/agent/${username}`);
      const agentJson = await agentRes.json();

      if (agentRes.ok && agentJson.status) {
        const agent = agentJson.data;
        setAgentData(agent);

        if (agent.gender) {
          setFavicon(agent.gender);
          setGender(agent.gender.toLowerCase());
        }

        // Now fetch properties with agent_id + status_id
        const propertiesRes = await fetch(`https://offplan-backend.onrender.com/properties/filter/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            property_status: statusName,
          })
        });

        const propertiesJson = await propertiesRes.json();

        if (propertiesRes.ok && propertiesJson.status) {
          const props = propertiesJson.data;
          setPropertiesData(props.results || []);
          const safeUrl = (props.next_page_url || "").replace('http://', 'https://');
          setNextPageUrl(safeUrl);
        } else {
          setPropertiesData([]);
          setNextPageUrl(null);
        }
      } else {
        setAgentData(null);
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
      setAgentData(null);
      setPropertiesData([]);
      setNextPageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, [username, statusName]);

  const fetchCitiesFromAPI = async () => {
  try {
    setIsCitiesLoading(true);
    const response = await fetch('https://offplan-backend.onrender.com/cities');
    const result = await response.json();
    if (result.status && result.data) {
      setCitiesData(result.data);
    } else {
      console.warn("No cities found");
    }
  } catch (err) {
    console.error("Failed to fetch cities:", err);
  } finally {
    setIsCitiesLoading(false);
  }
};

// useEffect(() => {
//   fetchCitiesFromAPI();
// }, []);

// Only fetch cities if empty
useEffect(() => {
  if (citiesData.length > 0) return;
  fetchCitiesFromAPI();
}, []);


// useEffect(() => {
//   console.log('👀 statusName changed in parent:', statusName);
// }, [statusName]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        <LoadingOverlay message={t("Loading Projects...")} />
      </div>
    );
  }

  if (!agentData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        <NotFound />
      </div>
    );
  }

//   useEffect(() => {
//   if (agentData?.gender) {
//     console.log("gender: ",agentData.gender)
//     setFavicon(agentData.gender);
//   }
// }, [agentData?.gender]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header logo={logoPath}/>
      <HeroSection agent={agentData} />
      <FeaturedProjects
        agent={agentData}
        properties={properties}
        nextPageUrl={nextPageUrl}
        setProperties={setPropertiesData}
        setNextPageUrl={setNextPageUrl}
        statusName={statusName}
        setStatusName={setStatusName}
        setPropertyType={setPropertyType}
        setSelectedPropertySubtype={setSelectedPropertySubtype}
        setBedrooms={setBedrooms}
        setPriceRange={setPriceRange}
        setAreaRange={setAreaRange}
        setIsAdvancedOpen={setIsAdvancedOpen}
        setMaxPrice={setMaxPrice}
        setMaxArea={setMaxArea}
        setProjectName={setProjectName}
        setCitiesData={setCitiesData}
        setSelectedCity={setSelectedCity}
        setSelectedNeighborhood={setSelectedNeighborhood}
        setDeveloper={setDeveloper}
        setPropertyStatus={setPropertyStatus}
        setDeliveryYear={setDeliveryYear}
        citiesData = {citiesData}
        selectedCity = {selectedCity}
        propertyType={propertyType}
        selectedPropertySubtype={selectedPropertySubtype}
        bedrooms={bedrooms}
        priceRange={priceRange}
        areaRange={areaRange}
        isAdvancedOpen={isAdvancedOpen}
        maxPrice={maxPrice}
        maxArea={maxArea}
        projectName={projectName}
        selectedNeighborhood={selectedNeighborhood}
        developer={developer}
        propertyStatus={propertyStatus}
        deliveryYear={deliveryYear}
        developers={developers}
        setDevelopers={setDevelopers}
        setIsSearchLoading={setIsSearchLoading}
        isSearchLoading={isSearchLoading}
        projectStatus={projectStatus}
        setProjectStatus={setProjectStatus}
        setSubUnitCount={setSubUnitCount}
        subunit_count={subunit_count}
        isCitiesLoading={isCitiesLoading}
      />
      <AgentProfile agent={agentData} />

      {/* Still Searching Section */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1 mb-4">
              <div className="relative">
                <Search className="w-8 h-8 md:w-12 md:h-12 text-pink-500 animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-bounce" />
              </div>
              <h2 className="text-4xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                Haven’t found the right Offplan or Ready property yet?
              </h2>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Don’t worry — Just use the search bar to explore top investment opportunities in Dubai, Abu Dhabi, and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden py-12 sm:py-10">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/20">
              <SearchFilters statusName={statusName} setStatusName={setStatusName} setNextPageUrl={setNextPageUrl} setProperties={setPropertiesData} 
              setPropertyType={setPropertyType}
        setSelectedPropertySubtype={setSelectedPropertySubtype}
        setBedrooms={setBedrooms}
        setPriceRange={setPriceRange}
        setAreaRange={setAreaRange}
        setIsAdvancedOpen={setIsAdvancedOpen}
        setMaxPrice={setMaxPrice}
        setMaxArea={setMaxArea}
        setProjectName={setProjectName}
        setCitiesData={setCitiesData}
        setSelectedCity={setSelectedCity}
        setSelectedNeighborhood={setSelectedNeighborhood}
        setDeveloper={setDeveloper}
        setPropertyStatus={setPropertyStatus}
        setDeliveryYear={setDeliveryYear}
        citiesData = {citiesData}
        selectedCity = {selectedCity}
        propertyType={propertyType}
        selectedPropertySubtype={selectedPropertySubtype}
        bedrooms={bedrooms}
        priceRange={priceRange}
        areaRange={areaRange}
        isAdvancedOpen={isAdvancedOpen}
        maxPrice={maxPrice}
        maxArea={maxArea}
        projectName={projectName}
        selectedNeighborhood={selectedNeighborhood}
        developer={developer}
        propertyStatus={propertyStatus}
        deliveryYear={deliveryYear}
        developers={developers}
        setDevelopers={setDevelopers}
        setIsSearchLoading={setIsSearchLoading}
        isSearchLoading={isSearchLoading}
        projectStatus={projectStatus}
        setProjectStatus={setProjectStatus}
        />
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-12 gap-8 items-stretch">
              <div className="col-span-8">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/20 h-full">
                  <SearchFilters statusName={statusName} setStatusName={setStatusName} setNextPageUrl={setNextPageUrl} setProperties={setPropertiesData} 
              setPropertyType={setPropertyType}
        setSelectedPropertySubtype={setSelectedPropertySubtype}
        setBedrooms={setBedrooms}
        setPriceRange={setPriceRange}
        setAreaRange={setAreaRange}
        setIsAdvancedOpen={setIsAdvancedOpen}
        setMaxPrice={setMaxPrice}
        setMaxArea={setMaxArea}
        setProjectName={setProjectName}
        setCitiesData={setCitiesData}
        setSelectedCity={setSelectedCity}
        setSelectedNeighborhood={setSelectedNeighborhood}
        setDeveloper={setDeveloper}
        setPropertyStatus={setPropertyStatus}
        setDeliveryYear={setDeliveryYear}
        citiesData = {citiesData}
        selectedCity = {selectedCity}
        propertyType={propertyType}
        selectedPropertySubtype={selectedPropertySubtype}
        bedrooms={bedrooms}
        priceRange={priceRange}
        areaRange={areaRange}
        isAdvancedOpen={isAdvancedOpen}
        maxPrice={maxPrice}
        maxArea={maxArea}
        projectName={projectName}
        selectedNeighborhood={selectedNeighborhood}
        developer={developer}
        propertyStatus={propertyStatus}
        deliveryYear={deliveryYear}
        developers={developers}
        setDevelopers={setDevelopers}
        setIsSearchLoading={setIsSearchLoading}
        isSearchLoading={isSearchLoading}
        projectStatus={projectStatus}
        setProjectStatus={setProjectStatus}/>
                </div>
              </div>
              <div className="col-span-4 h-full">
                <div className="grid grid-rows-4 gap-6 h-full">
                  {[
                    { emoji: '🧭', title: 'Smart Navigation', desc: 'AI-powered search' },
                    { emoji: '📍', title: 'Prime Locations', desc: 'Best areas in Dubai' },
                    { emoji: '🏙️', title: 'Urban Excellence', desc: 'Premium developments' },
                    { emoji: '💰', title: 'Best ROI', desc: 'Find instant returns' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xl:p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col justify-center">
                      <div className="text-2xl xl:text-3xl 2xl:text-4xl mb-2 xl:mb-3">{item.emoji}</div>
                      <p className="text-sm xl:text-base font-semibold text-gray-700 mb-1">{item.title}</p>
                      <p className="text-xs xl:text-sm text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CallToAction agent={agentData} />
      <Footer />
    </div>
  );
};

const Index = () => (
  <LanguageProvider>
    <AgentPageContent />
  </LanguageProvider>
);

export default Index;
