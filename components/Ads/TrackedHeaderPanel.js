import onClient from "../../utils/onClient";
import dynamic from "next/dynamic";
const TrackVisibility = dynamic(() => import("react-on-screen"));
const HeaderRePanel = dynamic(() => import("./HeaderRePanel/HeaderRePanel"));

function TrackedHeaderPanel() {
  if (onClient()) {
    return (
      <TrackVisibility partialVisibility style={{ width: "100%" }}>
        <HeaderRePanel />
      </TrackVisibility>
    );
  }
  return null;
}

export default TrackedHeaderPanel;
