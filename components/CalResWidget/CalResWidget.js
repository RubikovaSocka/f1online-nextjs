import React, { useState } from "react";
import { useSelector } from "react-redux";

//import ResultsWidget from "./ResultsWidget";
import CalendarWidget from "./CalendarWidget";
import SideSectionTitle from "../SideSectionTitle";
import SideWidgetButton from "./SideWidgetButton";

import dynamic from "next/dynamic";
const ResultsWidget = dynamic(() => import("./ResultsWidget"));

import styles from "./style.module.scss";

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
    return <div className={styles.outerContainer}>LOADING</div>;
  }
  const { venueName, race, driverChamp } = venue;
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
        </div>
      </div>
    </div>
  );
}

export default CalResWidget;
