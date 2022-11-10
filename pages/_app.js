// Global style import
import "../styles/global.css";

// Global header imports
import Head from "next/head";
import Script from "next/script";

// Global context import
import { AppContext } from "../files/context/basic";

export default function App({ Component }) {
  return (
    <>
      <Head>
        <title>Bobowa24</title>
      </Head>
      <AppContext>
        <Component />
      </AppContext>
      <Script src="https://unpkg.com/phosphor-icons" />
    </>
  );
}
