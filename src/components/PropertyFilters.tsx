import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Filter, Building, Home, Warehouse, Store } from 'lucide-react';
import '@/i18n';
import { useTranslation } from 'react-i18next';

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
  };
  const [activeTab, setActiveTab] = useState(t('Properties'));
  const [propertyType, setPropertyType] = useState(t('Residential'));
  const [selectedPropertySubType, setSelectedPropertySubType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');

  const propertySubTypes = [
    { id: 'apartment', name: t('Apartment'), icon: Building },
    { id: 'villa', name: t('Villa'), icon: Home },
    { id: 'townhouse', name: t('Townhouse'), icon: Building },
    { id: 'penthouse', name: t('Penthouse'), icon: Building }
  ];

  const commercialTypes = [
    { id: 'office', name: t('Office'), icon: Building },
    { id: 'shop', name: t('Shop'), icon: Store },
    { id: 'warehouse', name: t('Warehouse'), icon: Warehouse }
  ];

  const currentTypes = propertyType === t('Residential') ? propertySubTypes : commercialTypes;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 overflow-hidden box-border">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{t("🔍 Still searching? Use the filters below to find your dream home — Sahar is here to help")}</h3>
      <p className="text-gray text-sm md:text-lg">{t("Search with more precision below — and remember, I’m Sahar and I’m here to help you every step of the way.")}</p>

      {/* Main Tabs */}
      {/* <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'Properties' ? 'default' : 'outline'}
          onClick={() => setActiveTab('Properties')}
          className={`px-6 py-2 rounded-full ${
            activeTab === 'Properties'
              ? 'bg-[#1DB584] hover:bg-[#1DB584]/90 text-white'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Properties
        </Button>
        <Button
          variant={activeTab === 'New Projects' ? 'default' : 'outline'}
          onClick={() => setActiveTab('New Projects')}
          className={`px-6 py-2 rounded-full ${
            activeTab === 'New Projects'
              ? 'bg-[#1DB584] hover:bg-[#1DB584]/90 text-white'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          New Projects
        </Button>
      </div>

      {/* Buy/Rent Toggle }
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          className="px-6 py-2 rounded-full border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          Buy
        </Button>
        <Button
          variant="default"
          className="px-6 py-2 rounded-full bg-[#1DB584] hover:bg-[#1DB584]/90 text-white"
        >
          Rent
        </Button>
      </div> */}

      {/* Location */}
      <div className="mb-0 py-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("Location")}</label>
        <Input placeholder={t("Search for a locality, area or city")} className="h-12 bg-gray-50 border-gray-200" />
      </div>

      {/* Property Type */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("Property Type")}</label>

        {/* Residential/Commercial Toggle */}
        <div className="flex gap-2 mb-4 overflow-x-auto whitespace-nowrap">
          {[t('Residential'), t('Commercial')].map((type) => (
            <Button
              key={type}
              onClick={() => setPropertyType(type as 'Residential' | 'Commercial')}
              variant={propertyType === type ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-full flex-shrink-0 ${propertyType === type
                  ? 'bg-[#6084ee] hover:bg-[#6084ee]/90 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Property Sub-types */}
        <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
          {currentTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedPropertySubType(type.id)}
                className={`p-2 min-w-[100px] rounded-lg border-2 transition-all duration-200 flex-shrink-0 ${selectedPropertySubType === type.id
                    ? 'border-[#6084ee] bg-[#6084ee]/10'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="flex flex-col items-center">
                  <IconComponent className="h-5 w-5 mb-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 text-center">{type.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bedrooms & Bathrooms (only for Residential) */}
      {propertyType === t('Residential') && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t("Bedrooms")} 🛏️</label>
              <div className="flex gap-1 overflow-x-auto">
                {['1', '2', '3', '4', '5', '6+'].map((bed) => (
                  <Button
                    key={bed}
                    variant={bedrooms === bed ? 'default' : 'outline'}
                    onClick={() => setBedrooms(bed)}
                    className={`px-4 py-2 rounded-lg flex-shrink-0 ${bedrooms === bed
                        ? 'bg-[#6084ee] hover:bg-[#6084ee]/90 text-white'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {bed}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t("Bathrooms")} 🚿</label>
              <div className="flex gap-1 overflow-x-auto">
                {['1', '2', '3', '4', '5', '6+'].map((bath) => (
                  <Button
                    key={bath}
                    variant={bathrooms === bath ? 'default' : 'outline'}
                    onClick={() => setBathrooms(bath)}
                    className={`px-4 py-2 rounded-lg flex-shrink-0 ${bathrooms === bath
                        ? 'bg-[#6084ee] hover:bg-[#6084ee]/90 text-white'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {bath}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Price Range */}
      {/* Price Range and Area Range - Side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{t("Price Range(AED)")} 💰</label>
          <div className="px-3">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000000}
              min={0}
              step={50000}
              className="w-full mb-4"
              defaultValue={[0, 10000000]}
            />
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="h-10"
                />
                <span className="text-xs text-gray-500">{t("Min")}</span>
              </div>
              <span className="text-gray-400">{t("to")}</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Any"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000000])}
                  className="h-10"
                />
                <span className="text-xs text-gray-500">{t("Max")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">{t("Area Range(Square feet)")} 📏</label>
          <div className="px-3">
            <Slider
              value={areaRange}
              onValueChange={setAreaRange}
              max={5000}
              min={0}
              step={100}
              className="w-full mb-4"
              defaultValue={[0, 5000]}
            />
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0"
                  value={areaRange[0]}
                  onChange={(e) => setAreaRange([parseInt(e.target.value) || 0, areaRange[1]])}
                  className="h-10"
                />
                <span className="text-xs text-gray-500">{t("Min")}</span>
              </div>
              <span className="text-gray-400">{t("to")}</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Any"
                  value={areaRange[1]}
                  onChange={(e) => setAreaRange([areaRange[0], parseInt(e.target.value) || 5000])}
                  className="h-10"
                />
                <span className="text-xs text-gray-500">{t("Max")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select>
          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
            <SelectValue placeholder="Furnishing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="furnished">Furnished</SelectItem>
            <SelectItem value="unfurnished">Unfurnished</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
            <SelectValue placeholder="Handover By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2027">2027+</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {/* Keywords */}
      {/* <div className="mb-6">
        <Input placeholder="Enter relevant keywords" className="h-12 bg-gray-50 border-gray-200" />
      </div> */}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 h-12 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-2xl">
          {t("Reset")}
        </Button>
        <Button className="flex-1 bg-[#6084ee] hover:bg-[#6084ee]/90 text-white h-12 rounded-2xl">
          <Filter className="h-4 w-4 mr-2" />
          {t("Show Properties")}
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
