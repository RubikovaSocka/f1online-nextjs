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
  //width: 100%;
  height: 100%;
  margin: 0;
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

  if (isLoading) {
    return <div>LOADING</div>;
  }
  const { venueName, race, driverChamp } = venue;
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
        <Content>
          {selectedWidget === WIDGETS.CAL ? (
            <CalendarWidget data={calendarData} />
          ) : selectedWidget === WIDGETS.RACE ? (
            <ResultsWidget
              title={`Výsledky VC ${venueName}`}
              dataTitle="Čas/strata"
              data={race}
            />
          ) : selectedWidget === WIDGETS.CHAMP ? (
            <ResultsWidget
              title={`Šampionát po VC ${venueName}`}
              dataTitle="Body"
              data={driverChamp}
            />
          ) : (
            ""
          )}
        </Content>
      </WidgetContent>
    </WidgetContainer>
  );
}

export default CalResWidget;
