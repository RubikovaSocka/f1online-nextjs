import ArtRePanel from "./ArtRePanel";
import TrackVisibility from "react-on-screen";
import AdBlockDetect from "react-ad-block-detect";
import AdSense from "react-adsense";

//const GASdefault = 65; //X% chance to show GAS
const GASdefault = 5;

export default function TrackedArtRePanel({
  GASpercentage,
  report,
  changeable,
}) {
  if (typeof window !== "undefined") {
    let randomNumber = Math.floor(Math.random() * 100);
    console.log(randomNumber);
    console.log(GASpercentage);
    if (
      randomNumber <
      (GASpercentage || GASpercentage === 0 || GASpercentage === 1
        ? GASpercentage
        : GASdefault)
    ) {
      return (
        //google ad if user does not have adblock
        <>
          <AdBlockDetect>
            <TrackVisibility partialVisibility>
              <ArtRePanel report={report} changeable={changeable} />
            </TrackVisibility>
          </AdBlockDetect>
          <AdSense.Google
            client="ca-pub-2681240380511410"
            slot="7293745168"
            style={{
              display: "block",
              width: "100%",
              height: "170px",
            }}
            layout="in-article"
            format=""
          />
        </>
      );
    }
    return (
      <TrackVisibility partialVisibility>
        <ArtRePanel report={report} changeable={changeable} />
      </TrackVisibility>
    );
  }
  return null;
}
