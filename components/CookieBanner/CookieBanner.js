import { useState, useEffect } from "react";
import styles from "./style.module.scss";

function CookieBanner() {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    console.log(
      localStorage.getItem("f1online-cookie-ok"),
      localStorage.getItem("f1online-cookie-ok") === "suhlasOK"
    );  
    if (!(localStorage.getItem("f1online-cookie-ok") === "suhlasOK")) {
      setTimeout(() => {
        setIsAllowed(false);
      }, 4000);
    }
  }, []);

  const allowedPressed = () => {
    console.log("allowed pressed");
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
