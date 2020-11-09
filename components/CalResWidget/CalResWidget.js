import React, { useState } from "react";
import { useSelector } from "react-redux";

//import ResultsWidget from "./ResultsWidget";
import CalendarWidget from "./CalendarWidget";
import SideSectionTitle from "../SideSectionTitle";
import SideWidgetButton from "./SideWidgetButton";
import ResultsWidget from "./ResultsWidget";

import styled from "styled-components";

const WidgetContainer = styled.div`
  width: 100%;
  height: 480px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const WidgetContent = styled.div`
  padding: 5px;
`;

const Buttons = styled.div`
  width: 100%;
  margin: 0;
  margin-top: 10px;

  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  height: 100%;
  margin: 0;

  ${props =>
    props.loading
      ? `
    margin: 15px 10px;
    width: 95%;
    height: 330px;
    background-color: ${props.theme.FILLER_COLOR};
    overflow: hidden;
    position: relative;
    @keyframes slide {
      0% {transform:translateX(-100%);}
      100% {transform:translateX(100%);}
    }
    :after {
      content:'';
      top:0;
      transform:translateX(100%);
      width:100%;
      height:100%;
      position: absolute;
      z-index:1;
      animation: slide 1s infinite;

      background: ${props.theme.FILLER_SHINE_GRADIENT};
    }
    `
      : `@media only screen and (min-width: 1280px) {
          width: 320px;
        }
    `};
`;

const WIDGETS = {
  CAL: "CALENDAR",
  RACE: "RACE",
  CHAMP: "CHAMP"
};

function CalResWidget() {
  const [selectedWidget, setSelectedWidget] = useState(WIDGETS.CAL);
  const isLoading = useSelector(({ f1Results }) => f1Results.isLoading);

  const venue = useSelector(({ f1Results }) => f1Results.results[0]);

  const calendarData = useSelector(({ programme }) => programme.event);

  return (
    <WidgetContainer>
      <SideSectionTitle title="Boxová tabuľa" />
      <WidgetContent>
        <Buttons>
          <SideWidgetButton
            title="Budúca VC"
            onClick={() => setSelectedWidget(WIDGETS.CAL)}
            selected={selectedWidget === WIDGETS.CAL ? true : false}
          />
          <SideWidgetButton
            title="Posledná VC"
            onClick={() => setSelectedWidget(WIDGETS.RACE)}
            selected={selectedWidget === WIDGETS.RACE ? true : false}
          />
          <SideWidgetButton
            title="Šampionát"
            onClick={() => setSelectedWidget(WIDGETS.CHAMP)}
            selected={selectedWidget === WIDGETS.CHAMP ? true : false}
          />
        </Buttons>
        {isLoading ? (
          <Content loading />
        ) : (
          <Content loading={isLoading}>
            {selectedWidget === WIDGETS.CAL ? (
              <CalendarWidget data={calendarData} />
            ) : selectedWidget === WIDGETS.RACE ? (
              <ResultsWidget
                title={`Výsledky VC ${venue.venueName}`}
                dataTitle="Čas/strata"
                data={venue.race}
              />
            ) : selectedWidget === WIDGETS.CHAMP ? (
              <ResultsWidget
                title={`Šampionát po VC ${venue.venueName}`}
                dataTitle="Body"
                data={venue.driverChamp}
              />
            ) : (
              ""
            )}
          </Content>
        )}
      </WidgetContent>
    </WidgetContainer>
  );
}

export default CalResWidget;
