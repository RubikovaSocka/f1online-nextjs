import React from "react";
import { CONST } from "../constants";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
  margin: 10px 0;
  margin-left: calc(
    50px * ${(props) => (props.level > 0 && props.level < 4 ? 1 : 0)}
  );
`;
const Content = styled.div`
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  font-family: HK Grotesk;
  font-size: 14px;

  .emoji {
    height: 20px;
  }
  p {
    margin: 5px 0;
  }
`;
const Image = styled.img`
  height: 40px;
  width: 40px;
`;
const Comment = styled.div`
  display: flex;
  flex-direcion: row;
  align-items: flex-start;
  margin: 0 8px;
`;

const ContentPanel = styled.div`
  width: calc(100% - 10px);
  margin-left: 10px;
`;

function Item(props) {
  return (
    <Container level={props.level}>
      <Comment>
        <Image
          src={`${CONST.base_url}${props.avatar_template.replace(
            "{size}",
            "40"
          )}`}
        />
        <ContentPanel>
          <Header username={props.username} time={props.updated_at} />
          <Content dangerouslySetInnerHTML={{ __html: props.cooked }} />
          <Footer />
        </ContentPanel>
      </Comment>
      {props.children.map((item, index) => (
        <Item key={index} level={props.level + 1} {...item} />
      ))}
    </Container>
  );
}

export default Item;
