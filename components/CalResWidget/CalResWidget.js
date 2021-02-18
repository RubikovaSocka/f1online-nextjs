import { useState } from "react";
import { useSelector } from "react-redux";

import CalendarWidget from "./CalendarWidget";
import SideSectionTitle from "../SideSectionTitle";
import SideWidgetButton from "./SideWidgetButton";
import ResultsWidget from "./ResultsWidget";

import {
  WidgetContainer,
  WidgetContent,
  Content,
  Buttons,
} from "./StyledComponents";

const WIDGETS = {
  CAL: "CALENDAR",
  RACE: "RACE",
  CHAMP: "CHAMP",
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
          <Content isLoading={true} />
        ) : (
          <Content isLoading={false}>
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
