import HeaderRePanel from "./HeaderRePanel";
import TrackVisibility from "react-on-screen";

function TrackedHeaderPanel({ changeable }) {
  return (
    <TrackVisibility partialVisibility style={{ width: "100%" }}>
      <HeaderRePanel changeable={changeable} />
    </TrackVisibility>
  );
}

export default TrackedHeaderPanel;
