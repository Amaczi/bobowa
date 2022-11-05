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
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component />
      <Script src="https://unpkg.com/phosphor-icons" />
    </>
  );
}
