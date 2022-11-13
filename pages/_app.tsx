// Global style import
import "../styles/global.css";

// Next.js & Typescript imports
import Head from "next/head";
import Script from "next/script";

// Components & Other imports
import { AppContext } from "../files/context/basic";

// Interfaces
interface AppProps {
  Component: React.FunctionComponent;
}

export default function App({ Component }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Bobowa24</title>
        <Script src="https://unpkg.com/phosphor-icons" />
      </Head>
      <AppContext>
        <Component />
      </AppContext>
    </>
  );
}
