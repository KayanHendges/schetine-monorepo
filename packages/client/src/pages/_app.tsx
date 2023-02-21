import { ContainerApp } from "../components/Containers/ContainerApp";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ContainerApp>
      <Component {...pageProps} />
    </ContainerApp>
  );
}

export default MyApp;
