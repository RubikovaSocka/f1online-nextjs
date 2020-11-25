import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 10px;
`;

const Article = styled.div`
  font-family: HK Grotesk;
  font-size: 14px;
  font-weight: 600;

  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  cursor: pointer;

  .title {
    padding: 0 5px;
    color: ${(props) => props.theme.TEXT_COLOR_MILD};

    &:hover {
      text-decoration: underline;
    }

    &:before {
      display: inline-block;
      font-style: regular;
      font-variant: normal;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      font-size: 14px;
      margin-right: 5px;
      content: "\f46a";
      color: #e10600;
      color: ${(props) => props.color};
    }
  }

  img {
    width: 72px;
    flex-shrink: 0;
    height: 48px;
  }
`;

const RED = ["#e10600", "#e52c00", "#e33c15", "#df5e3f", "#dc806a"];

function ArticlesBox({ articles }) {
  return (
    <Container>
      {articles.map((item, i) => (
        <Link key={i} href={`/clanky/${item.id}/${item.slug}/`}>
          <a>
            <Article color={RED[i]} red={i < 6}>
              {/*<span>{i + 1}.</span>*/}
              <span className="title">{item.title.rendered}</span>
            </Article>
          </a>
        </Link>
      ))}
    </Container>
  );
}

export default ArticlesBox;
