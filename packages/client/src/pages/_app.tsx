import { AuthProvider } from "@contexts/authContext";
import { ContainerApp } from "../components/Containers/ContainerApp";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContainerApp>
        <Component {...pageProps} />
      </ContainerApp>
    </AuthProvider>
  );
}

export default MyApp;
