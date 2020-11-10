import React, { Component } from "react";
import axios from "axios";
import PostItem from "../PostItem/PostItem";
import LoadingSpinner from "../LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .headerToolbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    font-family: "HK Grotesk";
    font-size: 14px;
    margin: 0 15px;
    margin-top: 5px;
  }

  .autoloadBox {
    label {
      display: flex;
      align-items: center;
      cursor: pointer;
      input {
        cursor: pointer;
      }
    }
    &:hover {
      color: black;
      cursor: pointer;
    }
  }
  .refreshButton {
    margin-right: 10px;
    color: black;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      font-size: 12px;
    }
    &:hover {
      &.refreshButtonEnabled span {
        text-decoration: underline;
      }
    }
    .buttonText {
      margin-left: 5px;
    }
    &.refreshButtonDisabled {
      color: #878787;
      cursor: default;
    }
  }
  .scrollButton {
    display: none;
    position: fixed;
    bottom: 20px;
    left: 755px;
    height: 50px;
    width: 50px;
    background-color: white;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    cursor: pointer;
    border: 1px solid #b2b2b2;
    color: #b2b2b2;
    padding: 0;

    &:hover {
      border-color: black;
      color: black;
      background-color: rgba(255, 255, 255, 0.8);
    }
    i {
      font-size: 20px;
    }
  }
  .hideButton {
    display: none;
  }
  .loadingSpinnerContainer {
    padding-bottom: 25px;
  }

  @media only screen and (min-width: 1024px) {
    .scrollButton {
      display: initial;
      left: 625px;
    }
  }

  @media only screen and (min-width: 1120px) {
    .scrollButton {
      left: 710px;
    }
  }

  @media only screen and (min-width: 1280px) {
    .scrollButton {
      left: 705px;
    }
  }

  @media only screen and (min-width: 1360px) {
    .scrollButton {
      left: 770px;
    }
  }

  @media only screen and (min-width: 1440px) {
    .scrollButton {
      left: 860px;
    }
  }

  @media only screen and (min-width: 1600px) {
    .scrollButton {
      left: 1020px;
    }
  }
`;

export default class PostsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasMoreOldPosts: true,
      scrolledToTop: true,
      windowHeight: 600
    };
  }

  fetchMoreOldPosts = () => {
    const { posts } = this.state;
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/online_spravy?per_page=15${
          posts.length > 0
            ? `&after=${posts[posts.length - 1].date}&filter[orderby]=date&order=asc`
            : `&after=${this.props.start}&before=${this.props.end}&filter[orderby]=date&order=asc`
        }`
      )
      .then(res =>
        this.setState(previousState => {
          return {
            hasMoreOldPosts: res.data.length === 15,
            posts: previousState.posts.concat(res.data)
          };
        })
      );
  };

  componentDidMount() {
    this.setState({
      windowHeight: window.innerHeight
    });
    this.fetchMoreOldPosts();
  }

  render() {
    const { posts } = this.state;
    return (
      <Container>
        <InfiniteScroll
          dataLength={posts.length}
          next={this.fetchMoreOldPosts}
          hasMore={this.state.hasMoreOldPosts}
          height={this.state.windowHeight - 150}
          loader={
            <div className="loadingSpinnerContainer">
              <LoadingSpinner />
            </div>
          }
          endMessage={
            <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
              <b>Toto bola posledná správa onlinu.</b>
            </p>
          }
        >
          {posts.map(item => (
            <PostItem key={item.id} post={item} />
          ))}
        </InfiniteScroll>
      </Container>
    );
  }
}
