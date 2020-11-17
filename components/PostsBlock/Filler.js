import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 250px;

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
    height: 250px;
    position: absolute;
    z-index: 1;
    animation: slide 1s infinite;
    animation-delay: ${(props) => props.delay};
    background: ${(props) => props.theme.FILLER_SHINE_GRADIENT};s
`;

function Filler() {
  return <Container />;
}

export default Filler;
