import CalendarItem from "./CalendarItem";

import onClient from "../../utils/onClient";
import onMobile from "../../utils/onMobile";
import BContainer from "../../components/BContainer";
import { POSITION } from "../Ads/positions";
import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
import Divider from "../Divider";

function CalendarBox({ data }) {
  return data.map((calendarItem, index) => (
    <div key={index}>
      <CalendarItem position={index} {...calendarItem} />

      <div>
        {onClient() && index === 8 ? (
          <>
            <a
              href={
                onMobile()
                  ? "https://track.adform.net/C/?bn=44853234;C=0"
                  : "https://track.adform.net/C/?bn=44853232;C=0"
              }
              target="_blank"
            >
              <img
                src={
                  onMobile()
                    ? "https://track.adform.net/adfserve/?bn=44853234;srctype=4;ord=[timestamp]"
                    : "https://track.adform.net/adfserve/?bn=44853232;srctype=4;ord=[timestamp]"
                }
                border="0"
                width="100%"
                alt=""
              />
            </a>
            <Divider height="10px" />
          </>
        ) : null}
      </div>
      {/* <div>
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
      </div> */}
    </div>
  ));
}

export default CalendarBox;
