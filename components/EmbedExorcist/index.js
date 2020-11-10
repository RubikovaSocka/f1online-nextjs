import styled from "styled-components";

const Exorcist = styled.div`
  figure {
    width: 100%;
    //width: calc(100vw - 20px);

    @media only screen and (min-width: 350px) {
      //width: calc(100vw - 40px);
    }

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
`;

export default Exorcist;
