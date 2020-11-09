import Link from "next/link";
import { useSelector } from "react-redux";

import MyNavbar from "../Navbar";
import SocialMediaBasicPlugin from "../SocialMediaPlugin";
import SearchBar from "../SearchBar";

import styled from "styled-components";

const shadowMobile = "0 0px 8px rgba(0, 0, 0, 0.25);";

const Container = styled.div`
  width: 100%;
  padding-top: 0px;
  z-index: 14;
  background-color: ${props => props.theme.PAGE_BACK_COLOR};

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 13;
  border-bottom: ${props => props.theme.HEADER_BOTTOM_BORDER_MOBILE};

  position: sticky;
  top: 0;
  margin-top: -2px;

  @media only screen and (min-width: 1024px) {
    padding: 0;
    height: 100px;
    justify-content: space-between;
    border-bottom: none;
    z-index: 12;
    box-shadow: none;
  }
`;

const ShadowOverlap = styled.div`
  width: 100%;
  height: 10px;
  margin-top: -2px;
  background-color: white;
  background-color: ${props => props.theme.PAGE_BACK_COLOR};
  z-index: 11;

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

const TopStripe = styled.div`
  height: 61px;
  width: calc(100% - 40px);
  background-color: ${props => props.theme.PAGE_BACK_COLOR};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  box-shadow: ${shadowMobile};

  @media only screen and (min-width: 1024px) {
    display: initial;
    width: 100%;
    padding: 0;
    box-shadow: none;
  }
`;

const HeaderContents = styled.div`
  margin-top: -3px;
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: flex-end;
  z-index: 13;

  a {
    align-self: center;
    margin: auto;
    height: 42px;
    z-index: 15;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 0;
    padding-top: 2px;
    width: 973px;
    height: 60px;

    flex-direction: row;
    justify-content: space-between;
  }
  @media only screen and (min-width: 1280px) {
    width: 1030px;
  }
`;

const WhiteBack = styled.div`
  width: calc(100% - 30px);

  background-color: ${props => props.theme.PAGE_BACK_COLOR};
  z-index: 13;

  display: flex;
  flex-direction: row;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    width: 100%;
    position: relative;
    z-index: 16;
    justify-content: center;
  }
`;

const Logo = styled.img.attrs(props => ({
  src: props.theme.LOGO_URL
}))`
  height: 42px;
  display: inline-block;
`;

const Shadow = styled.div`
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

function Header() {
  const logoShown = useSelector(({ logoTrigger }) => logoTrigger.logoShown);

  return (
    <Container>
      <ShadowOverlap />
      <TopStripe>
        <WhiteBack>
          <HeaderContents>
            <SocialMediaBasicPlugin />
            <Link href="/">
              <a style={{ display: `${logoShown ? "inline-block" : "none"}` }}>
                <Logo alt="-" />
              </a>
            </Link>
            <SearchBar />
          </HeaderContents>
        </WhiteBack>
        <MyNavbar />
      </TopStripe>
      <Shadow />
    </Container>
  );
}

export default Header;
