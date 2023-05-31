"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@contexts/authContext";
import { ProfessionalProvider } from "@contexts/professionalContext";
import { BusinessProvider } from "@contexts/businessContext";
import { ToastProvider } from "@contexts/ToastContext";

export default function ContainerRoot({ children }) {
  const queryClient = new QueryClient();

  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProfessionalProvider>
            <BusinessProvider>
              <div>{children}</div>
            </BusinessProvider>
          </ProfessionalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}
