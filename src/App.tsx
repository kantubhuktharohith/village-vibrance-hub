import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import ExplorePage from "./pages/ExplorePage";
import VillageProfilePage from "./pages/VillageProfilePage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ImpactPage from "./pages/ImpactPage";
import FoodPage from "./pages/FoodPage";
import DishDetailPage from "./pages/DishDetailPage";
import BookingsPage from "./pages/BookingsPage";
import ReviewPage from "./pages/ReviewPage";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />

          {/* App shell with bottom nav */}
          <Route element={<AppLayout />}>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Detail pages with back nav */}
          <Route element={<AppLayout showTopBar={false} />}>
            <Route path="/village/:id" element={<VillageProfilePage />} />
            <Route path="/experience/:id" element={<ExperienceDetailPage />} />
            <Route path="/dish/:id" element={<DishDetailPage />} />
          </Route>

          {/* Standalone pages */}
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          <Route path="/impact/:villageId" element={<ImpactPage />} />
          <Route path="/review" element={<ReviewPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
