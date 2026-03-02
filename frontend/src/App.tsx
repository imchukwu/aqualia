import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Verify from "./pages/Verify";
import Auth from "./pages/Auth";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";
import DistributorRegister from "./pages/DistributorRegister";
import DistributorDashboard from "./pages/DistributorDashboard";
import Wallet from "./pages/Wallet";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";
import Promotions from "./pages/Promotions";
import HealthImpact from "./pages/HealthImpact";
import Distributors from "./pages/Distributors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/distributor/register" element={<DistributorRegister />} />
          <Route path="/distributor/dashboard" element={<DistributorDashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/health-impact" element={<HealthImpact />} />
          <Route path="/distributors" element={<Distributors />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
