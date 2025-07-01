
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MedicineRecommendation from "./pages/MedicineRecommendation";
import FoodAnalysis from "./pages/FoodAnalysis";
import Chatbot from "./pages/Chatbot";
import MedicineDelivery from "./pages/MedicineDelivery";
import DoctorConsultation from "./pages/DoctorConsultation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medicine-recommendation" element={<MedicineRecommendation />} />
          <Route path="/food-analysis" element={<FoodAnalysis />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/medicine-delivery" element={<MedicineDelivery />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
