import { AuthProvider } from "@contexts/authContext";
import { ProfessionalProvider } from "@contexts/professionalContext";
import { ContainerApp } from "../components/Containers/ContainerApp";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProfessionalProvider>
        <ContainerApp>
          <Component {...pageProps} />
        </ContainerApp>
      </ProfessionalProvider>
    </AuthProvider>
  );
}

export default MyApp;
