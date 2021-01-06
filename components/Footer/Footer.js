import Link from "next/link";
import styled from "styled-components";

const Container = styled.footer`
  width: calc(100% - 20px);
  height: 90px;

  position: absolute;
  bottom: 0;
  margin-top: 30px;
  padding: 17px 10px 13px 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: ${props => props.theme.FOOTER_COLOR};
  color: #f0f0f0;

  font: 13px "HK Grotesk";
  font-weight: 400;

  @media only screen and (min-width: 375px) {
    height: 65px;
  }

  span {
    padding: 0 10px;
    color: #f0f0f0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (min-width: 375px) {
    flex-direction: row;
  }

  a {
    color: #f0f0f0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <Container>
      <Row>
        <span>redakcia@f1online.sk</span>
        <a href="https://wpadmin.f1online.sk/feed/" target="_blank">
          <span>RSS</span>
        </a>
        <Link href="/zasady-ochrany-sukromia">
          <a>
            <span>Zásady ochrany údajov</span>
          </a>
        </Link>
      </Row>
      <div style={{ height: "20px" }}></div>
      <span>&copy; 2020-2021 F1online.sk</span>
    </Container>
  );
}

export default Footer;
