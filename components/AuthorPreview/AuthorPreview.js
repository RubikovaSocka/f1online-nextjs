import Link from "next/link";
import styled from "styled-components";

const DriverBox = styled.div`
  height: 40px;
  transition-delay: 0.27s;
`;

const Slider = styled.div`
  ::before {
    content: "${(props) => props.title}";
    color: ${(props) => props.theme.TEXT_COLOR};
  }

  ::after {
    background-color: #e10600;
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
      color: white;
      transition: width 0.28s ease-out;
      white-space: nowrap;
      overflow: hidden;

      background-color: #e10600;
    }
  }
`;

const Driver = styled(Slider)`
  text-transform: uppercase;
  height: 20px;
  font-weight: 700;
  overflow: hidden;
  color: #e10600;
`;

const Team = styled(Slider)`
  height: 20px;
  color: #e10600;
`;

const DriverLine = styled.div`
  margin: 10px 0;
  height: 40px;
  border-left: 3px solid #e10600;
  padding-left: 4px;
  transition-delay: 0.27s;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 2.5%;
  width: 45%;
  cursor: pointer;
  font-family: "HK Grotesk";

  .portrait {
    width: 90%;
    height: auto;
    margin: 0 5%;
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
    margin: 0 3%;
    width: 23%;
    cursor: pointer;

    :hover ${DriverLine} {
      border-left-width: 7px;
      padding-left: 0px;
      transition-delay: 0s;
    }

    &:hover ${Slider}::after {
      width: 100%;
    }
    &:hover ${DriverBox} {
      border-left-width: 0px;
      padding-left: 0;
      transition-delay: 0s;
    }
  }
`;

export function AuthorPreview({ author, subtitle }) {
  return (
    <Container>
      <Link href={`/autor/${author.fslug}`}>
        <a>
          <img
            alt={`${author.name} portrét`}
            src={author.img}
            className="portrait"
          />
          <DriverLine>
            <DriverBox>
              <Driver title={author.name} />
              <Team title={subtitle} />
            </DriverBox>
          </DriverLine>
        </a>
      </Link>
    </Container>
  );
}

export default AuthorPreview;
