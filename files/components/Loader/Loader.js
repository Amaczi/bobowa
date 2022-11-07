// React & style imports
import React from "react";
import styles from "./loader.module.css";

export default function Loader({ loading }) {
  return (
    <div id={styles.loader_wrapper}>
      <div id={styles.loader_wheel}>
        <span></span>
      </div>
      <div id={styles.loader_desc}>
        <p>{`Loading ${loading}`}</p>
      </div>
    </div>
  );
}
