import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DevelopersLanding from "./pages/developers/DevelopersLanding";
import GettingStarted from "./pages/developers/GettingStarted";
import ApiReference from "./pages/developers/ApiReference";
import PostmanPage from "./pages/developers/PostmanPage";
import PartnerDashboard from "./pages/developers/PartnerDashboard";
import WebhooksPage from "./pages/developers/WebhooksPage";
import GoingToProduction from "./pages/developers/GoingToProduction";
import EnvironmentsPage from "./pages/developers/EnvironmentsPage";
import ErrorReference from "./pages/developers/ErrorReference";
import RateLimits from "./pages/developers/RateLimits";
import GlossaryPage from "./pages/developers/GlossaryPage";
import FAQsPage from "./pages/developers/FAQsPage";
import ChangelogPage from "./pages/developers/ChangelogPage";
import SecurityPage from "./pages/developers/SecurityPage";
import SupportPage from "./pages/developers/SupportPage";
import StatusPage from "./pages/developers/StatusPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/developers" replace />} />
          <Route path="/developers" element={<DevelopersLanding />} />
          <Route path="/developers/getting-started" element={<GettingStarted />} />
          <Route path="/developers/api-reference" element={<ApiReference />} />
          <Route path="/developers/postman" element={<PostmanPage />} />
          <Route path="/developers/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/developers/webhooks" element={<WebhooksPage />} />
          <Route path="/developers/going-to-production" element={<GoingToProduction />} />
          <Route path="/developers/environments" element={<EnvironmentsPage />} />
          <Route path="/developers/error-reference" element={<ErrorReference />} />
          <Route path="/developers/rate-limits" element={<RateLimits />} />
          <Route path="/developers/glossary" element={<GlossaryPage />} />
          <Route path="/developers/faqs" element={<FAQsPage />} />
          <Route path="/developers/changelog" element={<ChangelogPage />} />
          <Route path="/developers/security" element={<SecurityPage />} />
          <Route path="/developers/support" element={<SupportPage />} />
          <Route path="/developers/status" element={<StatusPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
