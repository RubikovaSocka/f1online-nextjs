import styled from "styled-components";
import onClient from "../../utils/onClient";

const Container = styled.div`
  /*position: fixed;
  top: 100px;
  right: 0;
  height: calc(100vh - 100px);
  width: calc(50vw - 515px + 350px);
  z-index: 10;
  */

  ${(props) => (props.isOpened ? "position: fixed;" : "display: none")};
  height: calc(100vh - 69px);
  width: 100vw;
  top: 69px;
  right: 0;
  z-index: 5;

  @media only screen and (min-width: 1024px) {
    top: 0;
    right: 0;
    height: calc(100vh);
    width: calc(50vw - 515px + 340px);
    z-index: 15;
    box-shadow: 0 28px 8px rgba(0, 0, 0, 0.4);
  }
`;

function ChatContainer({ isOpened }) {
  return (
    <Container isOpened={isOpened}>
      {onClient() ? (
        <iframe
          //className={`${styles.chatFrame}`}
          width="100%"
          height="100%"
          src="https://chat.f1online.sk/channel/chatf1online?layout=embedded"
          frameBorder="0"
          style={{ position: "relative", zIndex: "15" }}
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default ChatContainer;
