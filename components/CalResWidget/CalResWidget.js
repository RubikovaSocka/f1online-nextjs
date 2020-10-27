import React, { useState } from "react";
import { useSelector } from "react-redux";

import ResultsWidget from "./ResultsWidget";
import CalendarWidget from "./CalendarWidget";
import SideSectionTitle from "../SideSectionTitle";
import SideWidgetButton from "./SideWidgetButton";

import styles from "./style.module.scss";

const WIDGETS = {
  CAL: "CALENDAR",
  RACE: "RACE",
  CHAMP: "CHAMP"
};

function CalResWidget() {
  const [selectedWidget, setSelectedWidget] = useState(WIDGETS.CAL);
  const lastVenueName = useSelector(
    ({ f1Results }) => f1Results.results[0].venueName
  );
  const raceData = useSelector(({ f1Results }) => f1Results.results[0].race);
  const champData = useSelector(
    ({ f1Results }) => f1Results.results[0].driverChamp
  );
  const calendarData = useSelector(({ programme }) => programme.event);

  return (
    <div className={styles.widget}>
      <SideSectionTitle title="Boxová tabuľa" />
      <div className={styles.widgetContent}>
        <div className={styles.widgetButtonsContainer}>
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
        </div>
        <div className={styles.content}>
          {selectedWidget === WIDGETS.CAL ? (
            <CalendarWidget data={calendarData} />
          ) : selectedWidget === WIDGETS.RACE ? (
            <ResultsWidget
              title={`Výsledky VC ${lastVenueName}`}
              dataTitle="Čas/strata"
              data={raceData}
            />
          ) : selectedWidget === WIDGETS.CHAMP ? (
            <ResultsWidget
              title={`Šampionát po VC ${lastVenueName}`}
              dataTitle="Body"
              data={champData}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CalResWidget;
