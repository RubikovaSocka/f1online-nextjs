import Link from "next/link";
import styled from "styled-components";

const Button = styled.a`
  margin: auto;
  height: 40px;
  width: 140px;
  border: 1px solid ${props => props.theme.TEXT_COLOR};
  border-radius: 0px;
  font-family: "HK Grotesk", "Source Sans Pro";
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.TEXT_COLOR};
  background-color: ${props => props.theme.PAGE_BACK_COLOR};

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  transition: ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.TEXT_COLOR};
    color: ${props => props.theme.PAGE_BACK_COLOR};
  }
`;

function ButtonWB({ hrefProp, asProp, title }) {
  return (
    <Link href={hrefProp} as={asProp} passHref>
      <Button>{title ? title : "Pozrieť všetky"}</Button>
    </Link>
  );
}

export default ButtonWB;
