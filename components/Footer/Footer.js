import Link from "next/link";
import styled from "styled-components";
import Divider from "../Divider";

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

  background-color: ${(props) => props.theme.FOOTER_COLOR};
  //color: #f0f0f0;

  font: 13px "HK Grotesk";
  font-weight: 400;

  @media only screen and (min-width: 375px) {
    height: 360px;
    padding-top: 35px;
  }

  span {
    padding: 0 10px;
    //color: #f0f0f0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

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

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.h3`
  color: white;
  font-family: HK Grotesk;
  font-weight: 600;
  margin: 5px 0;
`;

const Logo = styled.img`
  height: 40px;
`;

const Cpr = styled.span`
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  color: #707070;

  &::before {
    font-size: 10px;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin: 5px 5px;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    //color: white;
    content: "\f${(props) => props.code}";
  }
`;

const Icon = styled.a`
  font-size: 25px;
  cursor: pointer;

  &::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin: 5px 35px;
    font-family: "Font Awesome 5 Free";
    font-weight: ${(props) => (props.brands ? "100" : "900")};
    color: white;
    content: "\f${(props) => props.code}";
  }

  &:hover {
    margin-top: -5px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 5px 0;
`;

const SOCIAL = [
  {
    title: "Facebook",
    code: "39e",
    href: "https://www.facebook.com/f1online.sk",
    isBrand: true,
  },
  {
    title: "Youtube",
    code: "167",
    href: "https://www.youtube.com/channel/UCE54uS8jp-tlGC7wjUhnt4A",
    isBrand: true,
  },
  {
    title: "Twitter",
    code: "099",
    href: "https://twitter.com/F1onlinesk",
    isBrand: true,
  },
  {
    title: "RSS",
    code: "09e",
    href: "https://wpadmin.f1online.sk/rss",
    isBrand: false,
  },
];

const COPYRIGHT = "1f9";

const LINKS = [
  {
    title: "Spravodajstvo",
    links: [
      { link_name: "Archív", link_href: "/archiv" },
      { link_name: "Rýchle správy", link_href: "/rychle-spravy" },
      { link_name: "Piloti", link_href: "/piloti" },
      { link_name: "Tímy", link_href: "/timy" },
      { link_name: "Kalendár", link_href: "/kalendar" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { link_name: "O nás", link_href: "#" },
      { link_name: "Reklama", link_href: "#" },
    ],
  },
];

function Footer() {
  return (
    <Container>
      <Row>
        <Link href="/">
          <a>
            <Logo src="/images/logo-dark.png" />
          </a>
        </Link>
      </Row>
      <Divider height="25px" />
      <Row>
        {SOCIAL.map((item, index) => (
          <Icon
            key={index}
            code={item.code}
            brands={item.isBrand}
            href={item.href}
          />
        ))}
      </Row>
      <Divider height="25px" />
      <Row>
        {LINKS.map((item, index) => (
          <Col key={index}>
            <Title>{item.title}</Title>
            <List>
              {item.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.link_href}>
                    <a>{link.link_name}</a>
                  </Link>
                </li>
              ))}
            </List>
          </Col>
        ))}
      </Row>
      <div style={{ height: "20px" }}></div>
      <Cpr code={COPYRIGHT}>2020-2021 F1online.sk</Cpr>
    </Container>
  );
}

export default Footer;
