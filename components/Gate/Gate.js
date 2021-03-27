import React from "react";
import ReactPlayer from "react-player/streamable";
import onClient from "../../utils/onClient";
import * as S from "./styles";

export default function Gate() {
  const pickedSrc = !onClient()
    ? null
    : window.innerWidth > 720
    ? "/images/AMC/top.jpg"
    : Math.random() > 0.5
    ? "/images/AMC/top-mobileA.jpg"
    : "/images/AMC/top-mobileB.jpg";

  return (
    <div style={{ width: "100%" }}>
      {onClient() && (
        <S.VideoContainer>
          {/*<ReactPlayer
          url="https://streamable.com/va4hrs"
          playing={false}
          controls={false}
          //width="560px"
          //height="320px"
          //muted={true}
          volume={0.05}
          allowfullscreen
          allow="autoplay"
          //height="100%"
        />*/}

          <a
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
          </a>
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
          {/* <iframe
          width="560"
          height="315"
          src="https://streamable.com/o/va4hrs?autoplay=0"
          frameborder="0"
          width="100%"
          height="100%"
          allowfullscreen
          //allow="autoplay"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
        </S.VideoContainer>
      )}
    </div>
  );
}
