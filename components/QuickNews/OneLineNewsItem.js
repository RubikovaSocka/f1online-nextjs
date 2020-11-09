import styled from "styled-components";

const ItemContainer = styled.div`
  z-index: 5;
  color: ${props => props.theme.SUBTITLE_COLOR};
  padding: 0 10px;
`;

const Date = styled.p`
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 0 6px;

  position: relative;
  margin-bottom: -7px;
  margin-left: 15px;
  margin-right: auto;

  z-index: 3;
  font-family: "HK Grotesk";
  font-size: 12px;
  background-color: ${props => props.theme.PAGE_BACK_COLOR};
`;

const MessageContainer = styled.div`
  border: ${props => props.theme.QUICKNEWS_BORDER};
  padding-bottom: 5px;
  padding-right: 5px;
  text-decoration: none;
  color: ${props => props.theme.TEXT_COLOR_MILD}; 
`;

const BasicMessage = styled.div`
  padding: 0 8px;

  font: 13px "HK Grotesk";
  z-index: 0;

  p {
    margin-bottom: 3px;
  }
  &:hover,
  &:hover p {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const VideoMessage = styled(BasicMessage)`
  p::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: #e10600;
    content: "\f144";
  }
`;

const PostMessage = styled(BasicMessage)`
  p:first-of-type::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 4px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: #e10600;
    content: "\f0c6";
  }
`;

function OneLineNewsItem({ hasvideo, content, date, embed, callback }) {
  return (
    <ItemContainer>
      <Date>{date}</Date>
      <MessageContainer>
        {hasvideo && hasvideo === "Áno" ? (
          <VideoMessage
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={callback}
          />
        ) : embed.length > 0 ? (
          <PostMessage
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={callback}
          />
        ) : (
          <BasicMessage
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={callback}
          />
        )}
      </MessageContainer>
    </ItemContainer>
  );
}

export default OneLineNewsItem;
