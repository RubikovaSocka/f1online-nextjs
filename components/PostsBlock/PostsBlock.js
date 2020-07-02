import React, { Component } from "react";
import axios from "axios";
import PostItem from "../PostItem/PostItem";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./PostsBlock.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactGA from "react-ga";

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
      <div className={styles.container}>
        <InfiniteScroll
          dataLength={posts.length}
          next={this.fetchMoreOldPosts}
          hasMore={this.state.hasMoreOldPosts}
          height={this.state.windowHeight - 150}
          loader={
            <div className={styles.loadingSpinnerContainer}>
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
      </div>
    );
  }
}
