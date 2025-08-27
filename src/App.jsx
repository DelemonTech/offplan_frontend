import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
// import Login from "./pages/others/Login";
import AdminDashboard from "./pages/others/AdminDashboard";
import AgentDashboard from "./pages/others/AgentDashboard";
import AgentPage from "./pages/Agent/AgentPage";
import AgentProfile from "./components/others/AgentProfile1";
import PropertyDetails1 from "@/components/Agent/PropertyDetails1";
import PropertyDetails2 from "@/components/Agent/PropertyDetails2";
import PropertyDetailed from "@/components/Agent/PropertyDetailedPage";
import AgentPropDetail from "./components/Agent/AgentPropDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/others/ProtectedRoute";
import HomePage from "./pages/HomePage";
// import Sample from "./pages/others/Sample";
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
import ContactPage from "@/pages/Contact";

const App = () => (
  <AuthProvider>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:username" element={<AgentPage />} />
          <Route path="/:username/property-details" element={<PropertyDetails1 />} />
          <Route path="/:username/unit-details/:unitId" element={<UnitDetails1 />} />
          <Route 
            path="/:username/property-details/:propertyId/unit-details/:unitId" 
            element={<PropertyDetailed />} 
          />
          {/* <Route path="/:username/about" element={<About />} />
          <Route path="/:username/contact" element={<Contact />} /> */}
          <Route path="/blogs" element={<BlogListing/>}/>
          <Route path="/blog/:slug" element={<BlogDetail/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </LanguageProvider>
  </AuthProvider>
);

export default App;