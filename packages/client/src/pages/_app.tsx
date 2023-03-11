import { ContainerApp } from "@components/Containers/ContainerApp";
import { ContainerPublicRoutes } from "@components/Containers/ContainerPublicRoutes";
import { AuthProvider } from "@contexts/authContext";
import { ProfessionalProvider } from "@contexts/professionalContext";
import { createBrowserHistory } from "history";
import { useRouter } from "next/router";
import { publicRoutes } from "src/config/routes";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <ProfessionalProvider>
        {isPublicRoute ? (
          <ContainerPublicRoutes>
            <Component {...pageProps} />
          </ContainerPublicRoutes>
        ) : (
          <ContainerApp>
            <Component {...pageProps} />
          </ContainerApp>
        )}
      </ProfessionalProvider>
    </AuthProvider>
  );
}

export default MyApp;
