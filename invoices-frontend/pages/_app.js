import "../styles/globals.css";
import Layout from "../components/layout"; 
import { GlobalContextProvider } from "../utils/globalContext";

export default function MyApp({ Component, pageProps }) {
    return (
        <GlobalContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </GlobalContextProvider>
    );
}
