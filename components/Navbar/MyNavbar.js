import React from "react";
import { Nav, Navbar, NavLink, Button } from "react-bootstrap";
import { Component } from "react";
import Link from "../../utils/ActiveLink";
import styles from "./MyNavbar.module.scss";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

class MyNavbar extends Component {
  targetElement = null;

  constructor() {
    super();
    this.state = {
      bMenuOpened: false
    };
    this.openClose = this.openClose.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.targetElement = document.querySelector("#__next");
  }

  openClose() {
    this.setState(prevState => {
      return {
        bMenuOpened: !prevState.bMenuOpened
      };
    });
  }
  close() {
    this.setState(() => {
      return {
        bMenuOpened: false
      };
    });
  }

  render() {
    {
      this.state.bMenuOpened
        ? disableBodyScroll(this.targetElement)
        : enableBodyScroll(this.targetElement);
    }
    return (
      <>
        <Navbar
          bg="light"
          expand="lg"
          className={`${styles.container} ${
            this.state.bMenuOpened ? styles.full : styles.none
          } ${this.state.bMenuOpened ? styles.opened : ""}`}
        >
          <Nav className={`mr-auto ${styles.navbar}`}>
            <Link activeClassName={styles.selected} href="/">
              <a onClick={this.close}>
                <span>Domov</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/archiv">
              <a onClick={this.close}>
                <span>Správy</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/vysledky">
              <a onClick={this.close}>
                <span>Výsledky</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/piloti">
              <a onClick={this.close}>
                <span>Piloti</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/timy">
              <a onClick={this.close}>
                <span>Tímy</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/kalendar">
              <a onClick={this.close}>
                <span>Kalendár</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/partneri">
              <a onClick={this.close}>
                <span>Partneri</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
            <Link activeClassName={styles.selected} href="/archiv/t/eisking">
              <a onClick={this.close} /*target="_blank"*/>
                <span>EisKing</span>
                <div className={styles.bottomLine} />
              </a>
            </Link>
          </Nav>
        </Navbar>
        <Button
          onClick={this.openClose}
          className={`${styles.button} ${
            this.state.bMenuOpened ? styles.xBut : styles.bBut
          }`}
        ></Button>
      </>
    );
  }
}
export default MyNavbar;
