import styled from "styled-components";

const TitleContainer = styled.div`
  font-family: "Cabin", "Source Sans Pro";
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: ${props => props.theme.TEXT_COLOR};
`;

const Title = styled.h2`
  margin: 0px;
  padding-left: 0;
  font-size: 24px;

  @media only screen and (min-width: 1366px) {
    font-size: 26px;
  }
`;

function SectionTitle({ title }) {
  return (
    <TitleContainer>
      <Title>{title}</Title>
    </TitleContainer>
  );
}

export default SectionTitle;
