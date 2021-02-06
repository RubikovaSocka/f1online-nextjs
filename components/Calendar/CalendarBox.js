import CalendarItem from "./CalendarItem";

import onClient from "../../utils/onClient";
import { POSITION } from "../Ads/positions";
import TrackedBasicPanel from "../Ads/TrackedBasicPanel";

function CalendarBox({ data }) {
  return data.map((calendarItem, index) => (
    <>
      <CalendarItem key={index} position={index} {...calendarItem} />
      <div>
        {onClient() && (index + 1) % 12 === 0 ? (
          <TrackedBasicPanel position={POSITION.CONTENT_CALENDAR} />
        ) : null}
      </div>
    </>
  ));
}

export default CalendarBox;
