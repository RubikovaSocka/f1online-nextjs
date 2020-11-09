import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  font-family: "HK Grotesk";
  font-size: 13px;
  border-spacing: 0;
  color: ${props => props.theme.TEXT_COLOR_MILD};
  font-weight: 600;

  td {
    border-top: 1px solid ${props => props.theme.WIDGET_DIVIDER_COLOR};
  }

  tr {
    margin: 0;
    padding: 6px 5px;
    height: 31px;

    &.noBorder td {
      border: none;
    }
  }

  th {
    height: 32px;
    text-align: start;
    background-color: ${props => props.theme.WIDGET_UNSELECT_BACK};

    &.position {
      text-align: center;
    }
    &.time {
      font-weight: 600;
    }
  }

  td span,
  th span {
    line-height: 30px;
  }
`;

const Caption = styled.caption`
  margin-left: 10px;
  padding: 7px 5px;
  font-size: 16px;
  text-align: start;
`;

const TBody = styled.tbody`
  .position {
    text-align: center;
    padding-left: 5px;
    width: 35px;
  }
  .time {
    width: 100px;
    font-weight: 400;

    @media only screen and (min-width: 370px) {
      width: 120px;
    }
    @media only screen and (min-width: 1024px) {
      width: 100px;
    }
    @media only screen and (min-width: 1366px) {
      width: 115px;
    }
  }
`;

const getBodyText = pts => {
  if (pts == 1) {
    return "1 bod";
  }
  if (pts > 1 && pts < 5) {
    return `${pts} body`;
  }
  return `${pts} bodov`;
};

function ResultsWidget({ data, title, dataTitle }) {
  return (
    <Table>
      <Caption>{title}</Caption>
      <TBody>
        <tr>
          <th className="position">
            <span>Poz.</span>
          </th>
          <th>
            <span>Pilot</span>
          </th>
          <th className="time">
            <span>{dataTitle}</span>
          </th>
        </tr>
        {data.slice(1, 11).map(({ position, driverName, split, points }) => (
          <tr className={`${position === "1" ? "noBorder" : ""}`}>
            <td className="position">
              <span>{position}.</span>
            </td>
            <td>
              <span>{driverName}</span>
            </td>
            <td className="time">
              <span>{split ? split : points ? getBodyText(points) : ""}</span>
            </td>
          </tr>
        ))}
      </TBody>
    </Table>
  );
}
export default ResultsWidget;
