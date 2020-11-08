import React, { useState, useEffect } from "react";
import Link from "../../utils/ActiveLink";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import styled from "styled-components";

const NAVBAR = styled.nav`
  width: 100%;
  height: 100%;

  background-color: #e10600;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (min-width: 1024px) {
    height: 38px;
    margin-top: 0;
    position: initial;
    opacity: 1;

    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    background: none;
    background-color: rgb(225, 6, 0);
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.4);
  }

  a {
    height: 30px;
    margin: 8px 25px;
    display: initial;
    outline: none;

    @media only screen and (min-width: 1024px) {
      height: 38px;
      margin: 0 11px;
      display: inline-block;

      text-align: center;
      text-decoration: none;
      text-transform: uppercase;

      color: white;

      outline: none;
      position: relative;
      overflow: hidden;

      .bottomLine {
        height: 4px;
        width: 100%;
        right: 100%;

        position: absolute;
        bottom: 0px;
        background-color: white;
        transition: ease-in-out 0.25s;
      }
      &:hover .bottomLine {
        right: 0;
      }

      &.selected .bottomLine {
        height: 4px;
        width: 100%;
        right: 0;

        position: absolute;
        background-color: white;
      }
    }

    span {
      opacity: 1;
      padding: 0 9px;
      height: 35px;
      display: block;
      text-align: center;
      text-transform: uppercase;
      font: 16px "HK Grotesk", "Source Sans Pro";
      font-weight: 600;
      color: white;

      @media only screen and (min-width: 1024px) {
        height: 30px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        transition: ease-in-out 0.4s;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  ${props =>
    props.isMenuOpened
      ? `opacity: 1;
          z-index: 30;
          @media only screen and (max-width: 1023px) {
            padding-top: 85px;
        }`
      : `@media only screen and (max-width: 1023px) {
            width: 0;
            height: 0;
            display: none;
          }`}
`;

const BUTTON = styled.div`
  top: 20px;
  right: 20px;

  width: 30px;
  height: 30px;
  border: none;
  background: none;
  padding: 0;
  position: fixed;
  z-index: 40;

  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;

  @media only screen and (min-width: 1024px) {
    display: none;
  }

  ${props =>
    props.isMenuOpened
      ? `background-image: url("./x-button.png");`
      : `background-image: var(--mobile-b-button);`}
`;

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
      <NAVBAR isMenuOpened>
        {links.map((item, index) => (
          <Link key={index} activeClassName="selected" href={item.href}>
            <a onClick={() => setIsMenuOpened(false)}>
              <span>{item.title}</span>
              <div className="bottomLine" />
            </a>
          </Link>
        ))}
      </NAVBAR>
      <BUTTON onClick={() => setIsMenuOpened(prev => !prev)} isMenuOpened />
    </>
  );
}
export default MyNavbar;
