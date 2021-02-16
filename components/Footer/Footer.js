import Link from "next/link";
import styled from "styled-components";
import Divider from "../Divider";

const Container = styled.footer`
  width: calc(100% - 20px);
  height: 300px;

  position: absolute;
  bottom: 0;
  margin-top: 30px;
  padding: 17px 10px 13px 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: ${(props) => props.theme.FOOTER_COLOR};

  font: 13px "HK Grotesk";
  font-weight: 400;

  @media only screen and (min-width: 400px) {
    height: 290px;
    padding-top: 35px;
  }

  span {
    //padding: 0 10px;
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
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Col = styled.div`
  margin: 0 30px;
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

const CprRowItem = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #707070;
  margin: 0 0px;
  padding: 0 5px;
`;

const Cpr = styled(CprRowItem)`
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

const CprLink = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: #707070;
  margin: 0 0px;
  padding: 0 5px;
`;

const Icon = styled.a`
  font-size: 18px;
  cursor: pointer;

  &::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin: 5px 15px;
    font-family: "Font Awesome 5 Free";
    font-weight: ${(props) => (props.brands ? "100" : "900")};
    color: white;
    content: "\f${(props) => props.code}";

    @media only screen and (min-width: 1024px) {
      margin: 5px 25px;
    }
  }

  &:hover {
    margin-top: -5px;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 20px;
  }
`;

const List = styled.ul`
  list-style-type: none;

  padding: 0;
  margin: 5px 0;
  a {
    color: #f0f0f0;
  }
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
    title: "Instagram",
    code: "16d",
    href: "https://www.instagram.com/stevoeiselef1/",
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
    title: "Podporte nás",
    links: [
      { link_name: "Patreon", link_href: "https://www.patreon.com/F1online" },
      {
        link_name: "Paypal",
        link_href: "https://f1online.sk/chcem-vas-podporit",
      },
    ],
  },
  {
    title: "F1online.sk",
    links: [
      { link_name: "O nás", link_href: "/archiv/kategoria/f1online" },
      { link_name: "Autori", link_href: "/autori" },
      //{ link_name: "Reklama", link_href: "#" },
    ],
  },
];

function Footer() {
  return (
    <Container>
      {/*<Row>
        <Link href="/">
          <a>
            <Logo src="/images/logo-dark.png" />
          </a>
        </Link>
      </Row>*/}
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
      <Divider height="30px" />
      <Row>
        <>
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
          <Col>
            <Title>Napíšte nám</Title>
            <List>
              <li>
                <a href="mailto:redakcia@f1online.sk">redakcia@f1online.sk</a>
              </li>
            </List>
          </Col>
        </>
      </Row>
      <Divider height="50px" />
      <Row>
        <Cpr code={COPYRIGHT}>2020-{new Date().getFullYear()} F1online.sk</Cpr>
        <CprRowItem>|</CprRowItem>
        <CprLink>Zásady ochrany osobných údajov</CprLink>
      </Row>
    </Container>
  );
}

export default Footer;
