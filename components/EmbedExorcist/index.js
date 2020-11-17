import styled from "styled-components";

const Exorcist = styled.div`
  figure {
    width: 100%;

    margin: 25px 0;

    img {
      width: 100%;
      height: auto;
      margin: 0;
    }
    figcaption {
      font-family: "HK Grotesk";
      font-size: 12px;
      line-height: 18px;
      color: ${props => props.theme.SUBTITLE_COLOR};
      text-align: right;
    }
  }

  div {
    margin: 10px auto !important;
  }

  iframe {
    background-color: white;
    width: 100%;
    margin: 10px auto !important;
  }
  .twitter-tweet {
    margin: 10px auto !important;
  }
  position: relative !important;
  ${props =>
    props.embedOnlyContainer
      ? ` margin: auto;
          position: relative !important;
          padding-bottom: 56.25% !important;
          height: 0 !important;
          
          > iframe {
            position: absolute !important;
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }

          `
      : ""}

  > iframe {
    position: absolute !important;
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    //height: 100% !important;
  }
`;

export default Exorcist;
