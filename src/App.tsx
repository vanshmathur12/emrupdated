import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookAppointment from "./pages/BookAppointment";
import CheckRisk from "./pages/CheckRisk";
import Analytics from "./pages/Analytics";
import PatientSearch from "./pages/PatientSearch";
import UploadDocuments from "./pages/UploadDocuments";
import ViewRecords from "./pages/ViewRecords";
import DoctorProfile from "./pages/DoctorProfile";
import Prescriptions from "./pages/Prescriptions";
import QRScanner from "./pages/QRScanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/check-risk" element={<CheckRisk />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/patient-search" element={<PatientSearch />} />
              <Route path="/upload-documents" element={<UploadDocuments />} />
              <Route path="/view-records" element={<ViewRecords />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/qr-scanner" element={<QRScanner />} />
              <Route path="/appointments" element={<Index />} />
              <Route path="/my-records" element={<Index />} />
              <Route path="/documents" element={<Index />} />
              <Route path="/risk-assessment" element={<Index />} />
              <Route path="/settings" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;