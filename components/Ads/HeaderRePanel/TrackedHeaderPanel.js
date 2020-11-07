import dynamic from "next/dynamic";
import HeaderRePanel from "./HeaderRePanel";
const TrackVisibility = dynamic(() => import("react-on-screen"));

function TrackedHeaderPanel() {
  return (
    <TrackVisibility partialVisibility style={{ width: "100%" }}>
      <HeaderRePanel />
    </TrackVisibility>
  );
}

export default TrackedHeaderPanel;
