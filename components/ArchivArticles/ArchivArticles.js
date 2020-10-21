import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ArticlesPanel from "../ArticlesPanel/ArticlesPanel";

import styles from "./style.module.scss";
import LoadingSpinner from "../LoadingSpinner";
import MySection from "../TestComponent";

export class ArchivArticles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      offset: 1,
      isLoaded: false,
      errorMessage: "Žiaľ, nič sme nenašli",
      showErrorMessage: false
    };
    this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
  }

  loadPostsFromServer() {
    if (this.props.tagSlug) {
      axios
        .get(
          `https://wpadmin.f1online.sk/wp-json/wp/v2/tags?slug=${this.props.tagSlug}&per_page=1`
        )
        .then(res => {
          if (res.data[0]) {
            axios
              .get(
                `https://wpadmin.f1online.sk/wp-json/wp/v2/posts?tags=${
                  res.data[0].id
                }&per_page=${this.props.perpage}&offset=${this.props.perpage *
                  (this.state.offset - 1)}`
              )
              .then(res => {
                this.setState({
                  posts: res.data,
                  isLoaded: true,
                  pageCount: Math.ceil(
                    res.headers["x-wp-total"] / this.props.perpage
                  )
                });
              });
            //.catch(err => console.log(err))
          } else {
            this.setState({
              showErrorMessage: true
            });
          }
        });
      //.catch(err => console.log(err))
    } else if (this.props.tagID) {
      axios
        .get(
          `https://wpadmin.f1online.sk/wp-json/wp/v2/posts?tags=${this.props.tagID}&per_page=${this.props.perpage}`
        )
        .then(res => {
          this.setState({
            posts: res.data
              .filter(post =>
                this.props.except ? post.id !== this.props.except : true
              )
              .slice(0, this.props.perpage === "4" ? 3 : 6),
            isLoaded: true
          });
        });
    } else {
      axios
        .get(
          `https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=${
            this.props.perpage
          }&offset=${this.props.perpage * (this.state.offset - 1)}`
        )
        .then(res =>
          this.setState({
            posts: res.data,
            pageCount: Math.ceil(
              res.headers["x-wp-total"] / this.props.perpage
            ),
            isLoaded: true
          })
        );
      //.catch(err => console.log(err))
    }
  }

  componentDidMount() {
    this.loadPostsFromServer();
  }

  handlePageClick = data => {
    window.scrollTo(0, 0);
    let selected = data.selected;
    let offset = selected + 1;
    this.setState({ offset: offset }, () => {
      this.loadPostsFromServer();
    });
  };

  render() {
    let articles, paginateSection;

    if (this.state.isLoaded) {
      if (this.state.posts.length === 0) {
        articles = (
          <div className={styles.noneFoundPanel}>
            <img alt="logo"></img>
            <span>Nenašli sme žiadne články</span>
          </div>
        );
      } else {
        articles = (
          <ArticlesPanel counter={this.state.offset} posts={this.state.posts} />
        );
        if (this.props.asArchive && this.state.pageCount > 1) {
          paginateSection = (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              containerClassName={styles.paginateContainer}
              /*subContainerClassName={styles.paginateSubcontainer}*/
              activeClassName={styles.active}
              previousClassName={"enabled"}
            />
          );
        }
      }
    } else if (this.state.showErrorMessage) {
      articles = <p>{this.state.errorMessage}</p>;
    } else {
      articles = <LoadingSpinner />;
    }
    return (
      <div className={styles.container}>
        {articles}
        <div className={styles.paginateContainer}>{paginateSection}</div>
      </div>
    );
  }
}

export default ArchivArticles;
