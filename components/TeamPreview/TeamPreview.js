import Link from "next/link";
import styled from "styled-components";

const DriverBox = styled.div`
  transition-delay: 0.27s;
`;

const Slider = styled.div`
  ::before {
    content: "${(props) => props.title}";
    color: ${(props) => props.theme.TEXT_COLOR};
  }

  ::after {
    background-color: ${(props) =>
      props.theme[props.teamName.replace(" ", "_")]};
  }

  @media only screen and (min-width: 1024px) {
    position: relative;
    ::after {
      content: "${(props) => props.title}";
      position: absolute;
      padding-left: 0;
      left: 0px;
      width: 0;
      top: 0;
      bottom: 0;
      right: 0;
      color: ${(props) =>
        props.theme[`${props.teamName.replace(" ", "_")}_Font`]};
      transition: width 0.28s ease-out;
      white-space: nowrap;
      overflow: hidden;

      background-color: ${(props) =>
        props.theme[props.teamName.replace(" ", "_")]};
    }

    /*:hover ${DriverLine} {
      border-left-width: 7px;
      padding-left: 0px;
      transition-delay: 0s;
    }*/

    &:hover ::after {
      width: 100%;
    }
  }
`;

const Driver = styled(Slider)`
  font-size: 13px;
  height: 20px;
  font-weight: 700;
  overflow: hidden;
  color: ${(props) => props.theme.TEXT_COLOR};
`;

const DriverLine = styled.div`
  width: 46%;
  margin: 10px 0;
  height: 20px;
  border-left: 3px solid
    ${(props) => props.theme[props.teamName.replace(" ", "_")]};
  padding-left: 4px;
  transition-delay: 0.23s;
  cursor: pointer;

  &:hover {
    border-left-width: 7px;
    padding-left: 0px;
    transition-delay: 0s;
  }
`;

const Container = styled.div`
  width: 94%;
  margin-bottom: 10px;
  margin: 20px 3%;

  font-family: "HK Grotesk";

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  font-family: "HK Grotesk";

  .portrait {
    width: 90%;
    height: auto;
    margin: 0 5%;
  }
  .teamName {
    text-transform: uppercase;
    color: var(--basic-text-color);
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }
  span,
  a {
    margin: 0px;
    padding: 0;
    display: block;
    font-size: 13px;
    color: ${(props) => props.theme.TEXT_COLOR};
  }

  @media only screen and (min-width: 1024px) {
    width: 43%;
    margin: 20px 3.5%;

    &:hover ${DriverBox} {
      border-left-width: 0px;
      padding-left: 0;
      transition-delay: 0s;
    }
  }
`;

const LogoContainer = styled.a`
  width: 100%;
  height: calc(100% / 1.45);
  overflow: hidden;
  cursor: pointer;
`;

const TeamLogo = styled.img`
  width: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const DriversRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function TeamPreview({ constructor }) {
  return (
    <Container>
      <h3 style={{ margin: 0 }}>
        <Link href="timy/[id]" as={`/timy/${constructor.slug}`}>
          <a style={{ marginBottom: "5px" }}>
            <span className="teamName">{constructor.name}</span>
          </a>
        </Link>
      </h3>
      <Link href="timy/[id]" as={`/timy/${constructor.slug}`}>
        <LogoContainer style={{ marginBottom: "5px" }}>
          <TeamLogo
            alt={`Logo tímu ${constructor.name}`}
            src={constructor.img800}
          />
        </LogoContainer>
      </Link>
      <DriversRow>
        {constructor.Drivers.map((driver, index) => {
          return (
            <Link
              key={index}
              href="piloti/[id]"
              as={`/piloti/${driver.driverId}`}
              passHref
            >
              <DriverLine teamName={constructor.name}>
                <DriverBox teamName={constructor.name}>
                  <Driver
                    teamName={constructor.name}
                    title={`${driver.givenName} ${driver.familyName}`}
                  />
                </DriverBox>
              </DriverLine>
            </Link>
          );
        })}
      </DriversRow>
    </Container>
  );
}

export default TeamPreview;
