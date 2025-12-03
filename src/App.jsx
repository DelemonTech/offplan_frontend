import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AdminDashboard from "./pages/others/AdminDashboard";
import AgentDashboard from "./pages/others/AgentDashboard";
import AllAgentsPage from "@/components/others/AllAgentsPage";
import AgentPage from "./pages/Agent/AgentPage";
import AgentProfile from "./components/others/AgentProfile1";
import PropertyDetails1 from "@/components/Agent/PropertyDetails1";
import PropertyDetails2 from "@/components/Agent/PropertyDetails2";
import PropertyDetailed from "@/components/Agent/PropertyDetailedPage";
import AgentPropDetail from "./components/Agent/AgentPropDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/others/ProtectedRoute";
import HomePage from "./pages/HomePage";
import UnitDetails1 from "@/pages/Agent/UnitDetails1";
import UnitDetail from "@/pages/Agent/UnitDetailPage";
import ScrollToTop from "./components/Agent/ScrollToTop";
import GalleryPage from "@/components/Agent/Gallery";
import AgentEdit from "@/components/Agent/AgentEdit";
import { SEOHead } from "@/components/SEOHead";
import BlogDetail from "@/components/Blog/BlogDetail";
import BlogListing from "@/components/Blog/BlogListing";
import About from "@/pages/Agent/About";
import Contact from "@/pages/Agent/Contact";
import AboutPage from "@/pages/About";
import PrivacyPolicyPage from "@/components/others/PrivacyPolicy";
import ContactPage from "@/pages/Contact";
import EmaarDeveloperProfile from "@/pages/Emaar";
import DamacDeveloperProfile from "@/pages/Damac";
import AziziDeveloperProfile from "@/pages/Azizi";
import Object1DeveloperProfile from "@/pages/Object1";

// Direction handler component for RTL support
function DirectionHandler() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'fa' || i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
}

const App = () => (
  <AuthProvider>
    <LanguageProvider>
      <TooltipProvider>
        <DirectionHandler />
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agents" element={<AllAgentsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:username" element={<AgentPage />} />
          <Route path="/:username/property-details" element={<PropertyDetails1 />} />
          <Route path="/:username/unit-details/:unitId" element={<UnitDetails1 />} />
          <Route 
            path="/:username/property-details/:propertyId/unit-details/:unitId" 
            element={<PropertyDetailed />} 
          />
          <Route path="/emaar" element={<EmaarDeveloperProfile />} />
          <Route path="/damac" element={<DamacDeveloperProfile />} />
          <Route path="/azizi" element={<AziziDeveloperProfile />} />
          <Route path="/object1" element={<Object1DeveloperProfile />} />
          <Route path="/blogs" element={<BlogListing/>}/>
          <Route path="/blog/:slug" element={<BlogDetail/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </LanguageProvider>
  </AuthProvider>
);

export default App;