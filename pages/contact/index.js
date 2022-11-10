// Style imports
import styles from "./contact.module.css";

// Other imports
import Navbar from "../../files/components/Navbar/Navbar";

export default function contact() {
  return (
    <>
      <Navbar />
      <div id={styles.contact_wrapper}>
        <h1>Kontakt</h1>
      </div>
    </>
  );
}
