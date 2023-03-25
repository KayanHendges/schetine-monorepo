import { ContainerApp } from "@components/Containers/desktop/ContainerApp";
import { ContainerPublicRoutes } from "@components/Containers/ContainerPublicRoutes";
import { AuthProvider } from "@contexts/authContext";
import { BusinessProvider } from "@contexts/businessContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ProfessionalProvider } from "@contexts/professionalContext";
import { useRouter } from "next/router";
import { publicRoutes } from "src/config/routes";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfessionalProvider>
          <BusinessProvider>
            {isPublicRoute ? (
              <ContainerPublicRoutes>
                <Component {...pageProps} />
              </ContainerPublicRoutes>
            ) : (
              <ContainerApp>
                <Component {...pageProps} />
              </ContainerApp>
            )}
          </BusinessProvider>
        </ProfessionalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
