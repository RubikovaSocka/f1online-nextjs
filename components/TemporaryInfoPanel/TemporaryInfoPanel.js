import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";

const Container = styled.div`
  background-color: ${props => props.theme.PAGE_BACK_COLOR};
  height: ${props => props.height};
  width: ${props => props.width};
  margin: ${props => props.margin};

  border: 1px solid #2a2a2a;
  font-family: "HK Grotesk";
  font-size: 13px;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: ${props => props.theme.TEXT_COLOR_MILD};
  }
`;

const Logo = styled.img.attrs(props => ({
  src: props.theme.LOGO_URL
}))`
  height: 42px;
  display: inline-block;
`;

export default function TemporaryPanel(props) {
  //PROPS: height, width, margin, loader
  const { loader, title } = props;
  return (
    <Container {...props}>
      <Logo />
      {loader ? (
        <LoadingSpinner nomargin title={title} />
      ) : (
        <div>
          <span>{title}</span>
        </div>
      )}
    </Container>
  );
}
