// React & Styles imports
import styles from "./contact.module.css";

// Components & Other imports
import Navbar from "../../files/components/Navbar/Navbar";

export default function contact(): JSX.Element {
  return (
    <>
      <Navbar />
      <div id={styles.contact_wrapper}>
        <h1>Kontakt</h1>
      </div>
    </>
  );
}
