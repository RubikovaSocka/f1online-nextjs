import { useState, useEffect } from "react";
import styles from "./style.module.scss";

function CookieBanner() {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (!(localStorage.getItem("f1online-cookie-ok") === "suhlasOK")) {
      setIsAllowed(false);
    }
  }, []);

  const allowedPressed = () => {
    localStorage.setItem("f1online-cookie-ok", "suhlasOK");
    setIsAllowed(true);
  };

  if (isAllowed) return null;
  return (
    <div className={styles.container}>
      <span className={styles.message}>
        Na zlepšenie našich služieb používame súbory cookies. Viac v časti
        Zásady ochrany údajov.
      </span>
      <button className={styles.closeButton} onClick={() => allowedPressed()}>
        Súhlasím
      </button>
    </div>
  );
}

export default CookieBanner;
