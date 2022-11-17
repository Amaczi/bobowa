// React & Styles imports
import styles from "./loader.module.css";

export default function Loader({ loading }: { loading: string }): JSX.Element {
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
