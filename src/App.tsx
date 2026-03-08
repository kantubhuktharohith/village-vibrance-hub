import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import PersonalInfoPage from "./pages/PersonalInfoPage";
import TrustBadgePage from "./pages/TrustBadgePage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import SavedVillagesPage from "./pages/SavedVillagesPage";
import SupportPage from "./pages/SupportPage";
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile-setup" element={<ProfileSetupPage />} />

            {/* App shell with bottom nav */}
            <Route element={<AppLayout />}>
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </Route>

            {/* Detail pages with back nav */}
            <Route element={<AppLayout showTopBar={false} />}>
              <Route path="/village/:id" element={<VillageProfilePage />} />
              <Route path="/experience/:id" element={<ExperienceDetailPage />} />
              <Route path="/dish/:id" element={<DishDetailPage />} />
            </Route>

            {/* Profile sub-pages */}
            <Route path="/profile/personal-info" element={<ProtectedRoute><PersonalInfoPage /></ProtectedRoute>} />
            <Route path="/profile/trust-badge" element={<ProtectedRoute><TrustBadgePage /></ProtectedRoute>} />
            <Route path="/profile/payment-methods" element={<ProtectedRoute><PaymentMethodsPage /></ProtectedRoute>} />
            <Route path="/profile/saved-villages" element={<ProtectedRoute><SavedVillagesPage /></ProtectedRoute>} />
            <Route path="/profile/support" element={<SupportPage />} />

            {/* Standalone pages */}
            <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/confirmation/:id" element={<ConfirmationPage />} />
            <Route path="/impact/:villageId" element={<ImpactPage />} />
            <Route path="/review" element={<ReviewPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
