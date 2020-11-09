import styled from "styled-components";

const Container = styled.div`
  font-family: "HK Grotesk", "Source Sans Pro";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  font-size: 14px;
  margin: 0;
  margin-top: 10px;
  padding-left: 10px;
  width: 100%;

  display: flex;
  flex-direction: row;
  color: ${props => props.theme.TEXT_COLOR_MILD};
  
  span  {
    margin: 0px;
    padding: 0px 5px;
    display: block;
  }
  .position {
    font-weight: 600;
  }
`;

const Driver = styled.div`
  margin: 0px;
  margin-right: 10px;
  height: 36px;
  border-left: 3px solid #d4d4d4;
  ${props => (props.red ? "border-left: 3px solid #e10600;" : "")}
  ${props =>
    props.renderGP
      ? ` width: 160px;
          @media only screen and (min-width: 1280px) {
            width: 170px;
          }`
      : ` width: 200px;
          @media only screen and (min-width: 1280px) {
            width: 220px;
          }`}
          
  .name {
    height: 18px;
    font-weight: 600;
  }
  .team {
    height: 18px;
  }
`;

function DriverDataItem({ pos, renderID, name, team, time }) {
  return (
    <Container>
      <span>{pos}.</span>
      <Driver red={pos < 4} renderGP={renderID === "gp"}>
        <span className="name">{name}</span>
        <span className="team">{team}</span>
      </Driver>
      <span className="time">{time}</span>
    </Container>
  );
}

export default DriverDataItem;
