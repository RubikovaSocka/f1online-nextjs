import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../redux/actions/themeActions";
import { THEMES } from "../../constants";

import styled from "styled-components";

const Container = styled.div`
  margin: 20px 20px;
  height: 30px;
  width: calc(100% - 40px);

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (min-width: 1024px) {
    width: 973px;
    margin: 20px 0;
  }

  @media only screen and (min-width: 1280px) {
    width: 1032px;
  }
`;

const ThemeSWButton = styled.button`
  height: 25px;
  width: 58px;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  padding: 0;
  border: none;

  img {
    padding: 5px 7px;
    height: calc(100% - 12px);
    width: 13px;
  }
`;

const DonateLink = styled.a`
  margin-right: 15px;
  font-family: "HK Grotesk";
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.TEXT_COLOR};

  &:hover {
    text-decoration: underline;
  }
`;

const LIGHT_PICK = styled.img`
  display: inline-block;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.12);
  background-color: #f5f5f5;

  content: url(${props => props.theme.SUN});
`;

const DARK_PICK = styled.img`
  display: inline-block;
  border: 1px solid #7a7a7a;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.35);
  background-color: #a0a0a0;

  content: url(${props => props.theme.MOON});
`;

const getOtherTheme = theme => {
  switch (theme) {
    case THEMES.LIGHT:
      return THEMES.DARK;
    case THEMES.DARK:
      return THEMES.LIGHT;

    default:
      THEMES.LIGHT;
  }
};

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme.theme);

  return (
    <Container>
      <Link href="/chcem-vas-podporit">
        <DonateLink>Chcem podporiť F1online.sk</DonateLink>
      </Link>
      <ThemeSWButton onClick={() => dispatch(setTheme(getOtherTheme(theme)))}>
        <LIGHT_PICK alt="Light theme icon" />
        <DARK_PICK alt="Dark theme icon" />
      </ThemeSWButton>
    </Container>
  );
}

export default ThemeSwitcher;
