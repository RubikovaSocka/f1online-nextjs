import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  font-family: "HK Grotesk";
  font-weight: 600;
  color: ${props => props.theme.TEXT_COLOR_MILD};
  margin-top: ${props => (props.nomargin ? "0" : "15px")};
`;

const SpinningIconContainer = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  span::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f1ce";
    animation: spin 1.2s linear infinite;
    line-height: 14px;
    height: 14px;
    font-size: 14px;
    margin-right: 5px;
  }
`;

const LoadingSpinner = ({ title, nomargin }) => (
  <Container nomargin={nomargin}>
    <SpinningIconContainer>
      <span>{title ? title : "Načítavam..."}</span>
    </SpinningIconContainer>
  </Container>
);

export default LoadingSpinner;
