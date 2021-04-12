import styled from "styled-components";

export const VideoContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  /*
  margin-top: 15px;

  > div {
    margin: auto;
    position: relative !important;
    padding-bottom: 56.25% !important;
    height: 0 !important;

    > iframe {
      position: absolute !important;
      //position: relative !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }

  @media only screen and (min-width: 1024px) {
    > div > iframe {
      height: 320px !important;
    }
    > div {
      padding-bottom: 320px !important;
    }
    width: 973px;
    background-color: black;
    margin: auto;
    margin-top: 15px;
  }
  @media only screen and (min-width: 1280px) {
    width: 1032px;
  }*/
`;

export const Top = styled.img`
  width: 100%;
  @media only screen and (min-width: 1024px) {
    width: 1021px;
  }
  @media only screen and (min-width: 1280px) {
    width: 1072px;
  }
`;

export const Left = styled.img`
  display: none;
  z-index: 200;
  @media only screen and (max-width: 1280px) {
    width: 360px;
  }
  @media only screen and (min-width: 1024px) {
    display: initial;
    position: fixed;
    top: 100px;
    right: calc(50vw + 505px);
  }

  @media only screen and (min-width: 1280px) {
    right: calc(50vw + 526px);
  }
`;

export const Right = styled.img`
  display: none;
  z-index: 200;
  @media only screen and (max-width: 1280px) {
    width: 360px;
  }
  @media only screen and (min-width: 1024px) {
    display: initial;
    position: fixed;
    top: 100px;
    left: calc(50vw + 505px);
  }
  @media only screen and (min-width: 1280px) {
    left: calc(50vw + 526px);
  }
`;
