import styled from "styled-components";

const WidgetContainer = styled.div`
  width: 100%;
  height: 530px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const WidgetContent = styled.div`
  padding: 5px;
`;

const Buttons = styled.div`
  width: 100%;
  margin: 0;
  margin-top: 10px;

  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  height: 100%;
  margin: 0;

  ${(props) =>
    props.isLoading
      ? `
    margin: 15px 10px;
    width: 95%;
    height: 330px;
    background-color: ${props.theme.FILLER_COLOR};
    overflow: hidden;
    position: relative;
    @keyframes slide {
      0% {transform:translateX(-100%);}
      100% {transform:translateX(100%);}
    }
    :after {
      content:'';
      top:0;
      transform:translateX(100%);
      width:100%;
      height:100%;
      position: absolute;
      z-index:1;
      animation: slide 1s infinite;

      background: ${props.theme.FILLER_SHINE_GRADIENT};
    }
    `
      : `@media only screen and (min-width: 1280px) {
          width: 320px;
        }
    `};
`;

export { WidgetContainer, Content, WidgetContent, Buttons };
