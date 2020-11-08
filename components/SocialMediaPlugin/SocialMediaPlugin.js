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

function SocialMediaBasicPlugin() {
  return (
    <Container>
      <div className="item">
        <a
          className="noOutline"
          href="https://www.facebook.com/f1online.sk/"
          rel="noreferrer"
          target="_blank"
        >
          <img alt="FB icon" className="fbImg" />
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.instagram.com/stevoeiselef1/"
          rel="noreferrer"
          target="_blank"
          className="noOutline"
        >
          <img alt="Instagram Icon" className="instaImg" />
        </a>
      </div>
      <div className="item">
        <a
          href="https://www.youtube.com/channel/UCE54uS8jp-tlGC7wjUhnt4A"
          rel="noreferrer"
          target="_blank"
          className="noOutline"
        >
          <img alt="Youtube Icon" className="youtubeImg" />
        </a>
      </div>
    </Container>
  );
}

export default SocialMediaBasicPlugin;
