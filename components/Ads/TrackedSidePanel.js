import SideRePanel from "./SideRePanel";
import TrackVisibility from "react-on-screen";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

const showGASPercentage = 70; //X% chance to show GAS

function TrackedSidePanel() {
  if (typeof window !== "undefined") {
    let randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber < showGASPercentage) {
      return (
        //google ad if user does not have adblock
        <>
          <AdBlockDetect>
            <TrackVisibility partialVisibility>
              <SideRePanel />
            </TrackVisibility>
          </AdBlockDetect>
          <div
            style={{
              height: "60vh",
              maxHeight: "60vh",
              width: "100%",
              minWidth: "290px",
              overflow: "hidden",
              position: "sticky",
              top: "calc(20vh + 50px)",
            }}
          >
            <AdSense.Google
              client="ca-pub-2681240380511410"
              slot="9306692655"
              style={{
                display: "inline-block",
                width: "100%",
                height: "100%",
              }}
              layout="in-article"
              format=""
            />
          </div>
        </>
      );
    }
    return (
      <TrackVisibility partialVisibility style={{ width: "100%" }}>
        <SideRePanel />
      </TrackVisibility>
    );
  }
  return null;
}

export default TrackedSidePanel;
