import decodeHtml from "../../utils/decodeHtml";
import getImageSrc from "../../utils/getImagePreview";
import formatDate from "../../utils/dateFormatter";
import styled from "styled-components";

const Title = styled.h1`
  margin: 0;
  margin-bottom: 35px;
  font-family: "Cabin";
  font-size: 36px;
  color: ${(props) => props.theme.TEXT_COLOR};
`;

const Figure = styled.figure`
  margin: 0;
  width: 100%;

  img {
    width: 100%;
  }
  figcaption {
    display: block;
    text-align: end;
    margin-right: 0;

    font-family: "HK Grotesk";
    font-size: 12px;
    color: ${(props) => props.theme.SUBTITLE_COLOR};
  }
`;

const PostMeta = styled.div`
  font-family: "HK Grotesk";
  font-size: 14px;
  color: ${(props) => props.theme.SUBTITLE_COLOR};
`;

const ButtonRow = styled.div`
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

function PostTitleArea({ title, authorName, date, imageData, id, slug }) {
  return (
    <>
      <PostMeta />
      <Title>{decodeHtml(title)}</Title>
      <Figure>
        <img
          alt={imageData.title.rendered}
          src={getImageSrc(imageData, "medium_large")}
        />
        <figcaption>
          {`zdroj: ${imageData.caption.rendered.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          )}`}
        </figcaption>
      </Figure>
      <span>{authorName}</span>
      <br />
      <span>{formatDate(date)}</span>
      <ButtonRow>
        <iframe
          src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(
            `https://f1online.sk/clanky/${id}/${slug}`
          )}&width=128&layout=button_count&action=like&size=small&share=true&height=46&appId=2583504588587008`}
          width="183"
          height="25"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
        />
      </ButtonRow>
    </>
  );
}

export default PostTitleArea;
