import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 25px;
`;

const Item = styled.div`
  background-color: ${props => props.theme.FILLER_COLOR};
  overflow: hidden;
  position: relative;
  margin: 10px 0;
  height: 82px;
  width: 100%;

  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  :after {
    content: "";
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: slide 1s infinite;
    animation-delay: ${props => props.delay};
    background: ${props => props.theme.FILLER_SHINE_GRADIENT};
  }
`;

const LoaderPanel = styled.div`
  width: 93%;
  margin: auto;
`;

export { Item, Container, LoaderPanel };
