import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import Link from "../../utils/ActiveLink";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

import styles from "./style.module.scss";

const links = [
  { href: "/", title: "Domov" },
  { href: "/archiv", title: "Správy" },
  { href: "/vysledky", title: "Výsledky" },
  { href: "/piloti", title: "Piloti" },
  { href: "/timy", title: "Tímy" },
  { href: "/kalendar", title: "Kalendár" },
  { href: "/partneri", title: "Partneri" },
  { href: "/archiv/t/eisking", title: "EisKing" }
];

let targetElement = null;

function MyNavbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    targetElement = document.querySelector("#__next");
  }, []);

  if (isMenuOpened) {
    disableBodyScroll(targetElement);
  } else {
    enableBodyScroll(targetElement);
  }

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className={`${styles.container} ${
          isMenuOpened ? styles.full : styles.none
        } ${isMenuOpened ? styles.opened : ""}`}
      >
        <Nav className={`mr-auto ${styles.navbar}`}>
          {links.map((item, index) => (
            <Link
              key={index}
              activeClassName={styles.selected}
              href={item.href}
            >
              <a onClick={() => setIsMenuOpened(false)}>
                <span>{item.title}</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
          ))}
        </Nav>
      </Navbar>
      <Button
        onClick={() => setIsMenuOpened(prev => !prev)}
        className={`${styles.button} ${
          isMenuOpened ? styles.xBut : styles.bBut
        }`}
      ></Button>
    </>
  );
}
export default MyNavbar;
