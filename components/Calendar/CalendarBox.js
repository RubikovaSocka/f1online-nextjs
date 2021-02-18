import CalendarItem from "./CalendarItem";

import onClient from "../../utils/onClient";
import BContainer from "../../components/BContainer";
import { POSITION } from "../Ads/positions";
import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
import Divider from "../Divider";

function CalendarBox({ data }) {
  return data.map((calendarItem, index) => (
    <div key={index}>
      <CalendarItem position={index} {...calendarItem} />
      <div>
        {onClient() && (index + 1) % 12 === 0 ? (
          <>
            <BContainer>
              <TrackedPanel
                type={TYPES.BASIC}
                position={POSITION.CONTENT_CALENDAR}
              />
            </BContainer>
            <Divider height="10px" />
          </>
        ) : null}
      </div>
    </div>
  ));
}

export default CalendarBox;
