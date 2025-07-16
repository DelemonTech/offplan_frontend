
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// import Index from "./pages/Index";
import Login from "./pages/others/Login";
import AdminDashboard from "./pages/others/AdminDashboard";
import AgentDashboard from "./pages/others/AgentDashboard";
import AgentPage from "./pages/Agent/AgentPage";
import AgentProfile from "./components/others/AgentProfile1";
// import AgentPageVariation1 from "./pages/AgentPageVariation1";
// import AgentPageVariation2 from "./pages/AgentPageVariation2";
// import AgentPageVariation3 from "./pages/AgentPageVariation3";
// import AgentPageVariation4 from "./pages/AgentPageVariation4";
// import AgentPageVariation5 from "./pages/AgentPageVariation5";
// import AgentPageVariation6 from "./pages/AgentPageVariation6";
import PropertyDetails1 from "@/components/Agent/PropertyDetails1";
import PropertyDetails2 from "@/components/Agent/PropertyDetails2";
import PropertyDetailed from "@/components/Agent/PropertyDetailedPage"
// import ProjectDetail from "./pages/ProjectDetail";
import AgentPropDetail from "./components/Agent/AgentPropDetail"
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/others/ProtectedRoute";
// import AgentFarsi from "./pages/AgentFarsi";
import HomePage from "./pages/HomePage"
import Sample from "./pages/others/Sample";
import { LanguageProvider } from "@/contexts/LanguageContext";
import UnitDetails1 from "@/pages/Agent/UnitDetails1";
import UnitDetail from "@/pages/Agent/UnitDetailPage"
import ScrollToTop from "./components/Agent/ScrollToTop";
import GalleryPage from "@/components/Agent/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute role="agent">
                  <AgentDashboard />
                </ProtectedRoute>
              } 
            />
            {/* <Route path="/projects/:slug" element={<ProjectDetail />} /> */}
            {/* <Route path="/projects/:slug" element={<AgentDetail />} />/ */}
            <Route path="/agent/:username" element={<AgentPage />} />
            {/* <Route path="/:agentUsername/farsi" element={<AgentFarsi/> } /> */}
            <Route path="/agentProfile" element={<AgentProfile/>}/>
            {/* <Route path="/propertydetail/:slug" element={<PropDetail/>}/> */}
            <Route path="/sample/:username" element={<Sample />} />
            {/* <Route path="/:agentUsername/v1" element={<AgentPageVariation1 />} />
            <Route path="/:agentUsername/v2" element={<AgentPageVariation2 />} />
            <Route path="/:agentUsername/v3" element={<AgentPageVariation3 />} />
            <Route path="/:agentUsername/v4" element={<AgentPageVariation4 />} />
            <Route path="/:agentUsername/v5" element={<AgentPageVariation5 />} />
            <Route path="/:agentUsername/v6" element={<AgentPageVariation6 />} /> */}

            <Route path="/agent/:username/property-details" element={<PropertyDetails1/>} /> {/*Original*/}    
        
            <Route path="/agent/property-details" element={<PropertyDetails2 />} />       
            <Route path="/agent/:username/agent-detail" element={<AgentPropDetail />} />

            <Route path="/agent/:username/property-details" element={<PropertyDetails1/>} />
            <Route path="/agent/property-details" element={<PropertyDetails2 />} />


            <Route path="/agent/property-detailed" element={<PropertyDetailed />} />
            <Route path="/agent/:username/unit-details/:unitId" element={<UnitDetails1/>} />

            <Route path="/agent/:username/property-detailed/:unitId" element={<PropertyDetailed />} />

            <Route path="/unit-detail" element={<UnitDetail />} />
            <Route path="/gallery" element={<GalleryPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
