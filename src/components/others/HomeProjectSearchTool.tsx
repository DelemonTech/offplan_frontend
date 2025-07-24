
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Building } from "lucide-react";
import '@/i18n';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

const ProjectSearchTool = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'fa' ? 'rtl' : 'ltr';
    setIsOpen(false);
  };

  useEffect(() => {
    document.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <section className="pt-12 bg-white">
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("Find Your Perfect Off-Plan Project")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("Use our smart search tool to discover projects that match your exact needs.")}
          </p>
        </div> */}
    
        {/* <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-offplan-purple" />
                  {t("Choose Location")}
                </label>
                <Select>
                  <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-offplan-purple/50 transition-colors">
                    <SelectValue placeholder={t("Select location")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">{t("Dubai")}</SelectItem>
                    <SelectItem value="abu-dhabi">{t("Abu Dhabi")}</SelectItem>
                    <SelectItem value="sharjah">{t("Sharjah")}</SelectItem>
                    <SelectItem value="ajman">{t("Ajman")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Building className="w-4 h-4 mr-2 text-offplan-purple" />
                  {t("Property Type")}
                </label>
                <Select>
                  <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-offplan-purple/50 transition-colors">
                    <SelectValue placeholder={t("Select property type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">{t("Apartment")}</SelectItem>
                    <SelectItem value="villa">{t("Villa")}</SelectItem>
                    <SelectItem value="townhouse">{t("Townhouse")}</SelectItem>
                    <SelectItem value="penthouse">{t("Penthouse")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Budget Range</label>
                <Select>
                  <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-offplan-purple/50 transition-colors">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500k-1m">AED 500K - 1M</SelectItem>
                    <SelectItem value="1m-2m">AED 1M - 2M</SelectItem>
                    <SelectItem value="2m-5m">AED 2M - 5M</SelectItem>
                    <SelectItem value="5m+">AED 5M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-sm font-semibold text-gray-700">{t("Quick Filters")}:</span>
              <Button variant="outline" size="sm" className="rounded-full border-green-500 text-green-600 hover:bg-green-50 shadow-sm">
                🟢 {t("Updated Today")}
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50 shadow-sm">
                🔵 {t("Coming Soon")}
              </Button>
              <Button variant="outline" size="sm" className="rounded-full border-orange-500 text-orange-600 hover:bg-orange-50 shadow-sm">
                🟠 {t("Launching Soon")}
              </Button>
            </div>

            
            <Button className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-offplan-purple to-offplan-pink hover:from-offplan-purple/90 hover:to-offplan-pink/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <Search className="w-6 h-6 mr-3" />
              {t("Search Projects")}
              <Filter className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ProjectSearchTool;
