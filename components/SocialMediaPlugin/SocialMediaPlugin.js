import styled from "styled-components";

const Container = styled.div`
  display: none;

  @media only screen and (min-width: 1024px) {
    height: 20px;
    width: 170px;

    display: flex;
    flex-direction: row;

    .item {
      height: 18px;
      margin: 0 2px;
      transition: ease 0.2s;

      img {
        position: relative;
        height: 15px;
        margin: 0 2px;
        margin-top: 3px;
        display: inline-block;

        &:hover {
          cursor: pointer;
          margin-top: -3px;
        }

        &.fbImg {
          content: var(--fb-img-url);
        }
        &.instaImg {
          content: var(--insta-img-url);
        }
        &.youtubeImg {
          content: var(--youtube-img-url);
        }
      }
    }
  }
`;

const FB_LOGO = styled.img.attrs(props => ({
  src: props.theme.FB_LOGO,
  alt: "Facebook logo"
}))``;

const YT_LOGO = styled.img.attrs(props => ({
  src: props.theme.YT_LOGO,
  alt: "Youtube logo"
}))``;

const IG_LOGO = styled.img.attrs(props => ({
  src: props.theme.IG_LOGO,
  alt: "Instagram logo"
}))``;

function SocialMediaBasicPlugin() {
  return (
    <Container>
      <div className="item">
        <a
          href="https://www.facebook.com/f1online.sk/"
          rel="noreferrer"
          target="_blank"
        >
          <FB_LOGO />
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.instagram.com/stevoeiselef1/"
          rel="noreferrer"
          target="_blank"
        >
          <IG_LOGO />
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.youtube.com/channel/UCE54uS8jp-tlGC7wjUhnt4A"
          rel="noreferrer"
          target="_blank"
        >
          <YT_LOGO />
        </a>
      </div>
    </Container>
  );
}

export default SocialMediaBasicPlugin;
