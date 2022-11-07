// Global style import
import "../styles/global.css";

// Global header import
import Head from "next/head";
import Script from "next/script";

export default function App({ Component }) {
  return (
    <>
      <Head>
        <title>Bobowa24</title>
      </Head>
      <Component />
      <Script src="https://unpkg.com/phosphor-icons" />
    </>
  );
}
