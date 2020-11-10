import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  font-size: 14px;
  background-color: ${props => props.theme.WIDGET_UNSELECT_BACK};
  margin-bottom: 2px;
  margin: 2px 8px;
  cursor: pointer;
`;

const Header = styled.div`
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  font-weight: 600;
  text-transform: uppercase;

  color: ${props => props.theme.TEXT_COLOR};

  span {
    padding: 6px 10px;
  }
  a {
    color: ${props => props.theme.TEXT_COLOR};
    width: 100%;
    height: 100%;
    padding: 6px 10px;
  }
  i {
    color: ${props => props.theme.TEXT_COLOR};
    padding: 0 10px;
  }
  &:hover,
  &:hover a,
  &.selected,
  &.selected a {
    background-color: ${props => props.theme.TABLE_SECONDARY_COLOR};
    color: white;
  }
`;

const Body = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 5px 0;
  padding-right: 8px;
  list-style: none;

  display: ${props => (props.isOpened ? "flex" : "none")};
`;

const NestedHeader = styled.li`
  height: 100%;
  padding: 1px 20px;
  color: ${props => props.theme.TEXT_COLOR};

  i {
    padding: 0;
    font-size: 6px;
    margin-top: 3px;
    color: ${props => props.theme.SUBTITLE_COLOR};
  }
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    color: ${props => props.theme.TEXT_COLOR};
    color: ${props => props.theme.SUBTITLE_COLOR};
  }
  &:hover a,
  &:hover i,
  &.selected a,
  &.selected i {
    text-decoration: underline;
    color: ${props => props.theme.TEXT_COLOR};
  }
`;

const Chevron = styled.span`
  ::after {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;

    line-height: 16px;
    height: 16px;
    margin-right: 5px;

    ${props => (props.isOpened ? `content: "\f077";` : `content: "\f078";`)}
  }
`;

const Bullet = styled.i`
  &::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 6px;
    margin-right: 7px;
    content: "\f111";
  }
`;

function BoxItem({ title, subs, slug, pickedSlug }) {
  const [isOpened, setIsOpened] = useState(false);
  const hasChildren = slug.length === 0;

  useEffect(() => {
    if (slug.length === 0) {
      subs.forEach(item => {
        item.slug === pickedSlug && setIsOpened(true);
      });
    }
  }, []);

  const changeOpened = () => {
    setIsOpened(prev => !prev);
  };

  return (
    <Container>
      <Header
        isOpened={isOpened}
        className={slug === pickedSlug ? "selected" : ""}
        onClick={() => changeOpened()}
      >
        {hasChildren ? (
          <>
            <span>{title}</span>
            <Chevron isOpened={isOpened} />
          </>
        ) : (
          <Link href={`/archiv/t/${slug}`} as={`/archiv/t/${slug}`}>
            <a>{title}</a>
          </Link>
        )}
      </Header>
      {hasChildren ? (
        <Body isOpened={isOpened}>
          {subs.map((item, index) => {
            return (
              <NestedHeader
                key={index}
                className={item.slug === pickedSlug ? "selected" : ""}
              >
                <Link
                  href={`/archiv/t/${item.slug}`}
                  as={`/archiv/t/${item.slug}`}
                >
                  <a>
                    <Bullet />
                    <span>{item.title}</span>
                  </a>
                </Link>
              </NestedHeader>
            );
          })}
        </Body>
      ) : (
        ""
      )}
    </Container>
  );
}

export default BoxItem;
