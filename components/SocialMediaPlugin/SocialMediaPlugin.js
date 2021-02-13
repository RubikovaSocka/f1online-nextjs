import styled from "styled-components";

const Container = styled.div`
  display: none;

  @media only screen and (min-width: 1024px) {
    height: 20px;
    width: 170px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Icon = styled.a`
  font-size: 15px;
  cursor: pointer;
  margin: 0;
  margin-right: 7px;

  &::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    
    font-family: "Font Awesome 5 Free";
    font-weight: ${(props) => (props.brands ? "100" : "900")};
    color: ${(props) => props.theme.TEXT_COLOR};
    content: "\f${(props) => props.code}";
  }

  &:hover {
    margin-top: -3px;
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
];

function SocialMediaBasicPlugin() {
  return (
    <Container>
      {SOCIAL.map((item, index) => (
        <Icon
          key={index}
          code={item.code}
          brands={item.isBrand}
          href={item.href}
        />
      ))}
    </Container>
  );
}

export default SocialMediaBasicPlugin;
