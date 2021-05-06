import ReactPlayer from "react-player/youtube";
import onClient from "../../utils/onClient";
import * as S from "./styles";
import Router from "next/router";
import ReactGA from "react-ga";

export default function Gate() {
  const pickedSrc = !onClient()
    ? null
    : window.innerWidth > 720
    ? "/images/AMC/top.jpg"
    : Math.random() > 0.5
    ? "/images/AMC/top-mobileA.jpg"
    : "/images/AMC/top-mobileB.jpg";

  const handleBClick = ({ link }) => {
    // console.log("BANNER", "CLICKED");
    // console.log({
    //   category: "GATE-click",
    //   action: "AMC",
    //   label: `${link}`,
    //   nonInteraction: false,
    //   dimension1: Router.asPath,
    //   dimension2: `${window.innerWidth < 1024 ? "m" : "pc"}`,
    // });
    try {
      ReactGA.event({
        category: "GATE-click",
        action: "AMC",
        label: `${link}`,
        nonInteraction: false,
        dimension1: Router.asPath,
        dimension2: `${window.innerWidth < 1024 ? "m" : "pc"}`,
      });
    } catch (e) {}
  };

  return (
    <div style={{ width: "100%" }}>
      {onClient() && (
        <>
          <S.VideoContainer videoPicked={true}>
            {true ? (
              <ReactPlayer
                url="https://youtu.be/KUlAI3LAuVM"
                playing={true}
                controls={true}
                //width="560px"
                //height="320px"
                muted={true}
                //volume={0.05}
                allowfullscreen
                allow="autoplay"
                //height="100%"
              />
            ) : null}
            {/* <a
              target="_blank"
              rel="nofollow"
              href="https://amcn-czsk.com/sport1tv-klub/"
              onClick={() =>
                handleBClick({
                  link: pickedSrc,
                })
              }
            > 
              <S.Top src={pickedSrc} />
            </a>*/}
          </S.VideoContainer>
          <a
            target="_blank"
            rel="nofollow"
            href="https://amcn-czsk.com/sport1tv-klub/"
            onClick={() => handleBClick({ link: "/images/AMC/left.jpg" })}
          >
            <S.Left src="/images/AMC/left.jpg" />
          </a>
          <a
            target="_blank"
            rel="nofollow"
            href="https://amcn-czsk.com/sport1tv-klub/"
            onClick={() => handleBClick({ link: "/images/AMC/right.jpg" })}
          >
            <S.Right src="/images/AMC/right.jpg" />
          </a>
        </>
      )}
    </div>
  );
}
