import styles from "./style.module.scss";

const LoadingSpinner = ({ title, nomargin }) => (
  <div className={`${styles.container} ${nomargin ? styles.nomargin : ""}`}>
    <div className={styles.spinningIconContainer}>
      <span>{title ? title : "Načítavam..."}</span>
    </div>
  </div>
);

export default LoadingSpinner;
