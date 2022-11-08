// Style imports
import styles from "./navbar.module.css";

// Next.js imports
import Link from "next/link";

export default function Navbar() {
  return (
    <div id={styles.navbar}>
      <img src="/logo.webp" id={styles.navbar_logo}></img>
      <ul id={styles.navbar_menu}>
        <li className={styles.navbar_menu_element}>
          <Link href="/">Strona Główna</Link>
        </li>
        <li className={styles.navbar_menu_element}>
          <Link href="/contact">Kontakt</Link>
        </li>
      </ul>
    </div>
  );
}
