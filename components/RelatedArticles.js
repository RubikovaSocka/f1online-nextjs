import React, { Component } from "react";
import axios from "axios";
import ArchivArticles from "./ArchivArticles/ArchivArticles";
import ArticlesPanel from "./ArticlesPanel/ArticlesPanel";
import LoadingSpinner from "./LoadingSpinner";

export default class RelatedArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      articles: [],
      tag: 0,
      loadByTag: false
    };
  }

  componentDidMount() {
    if (this.props.ids && this.props.ids.length > 0) {
      axios
        .all(
          this.props.ids.map(item => {
            return axios.get(
              `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/${item}`
            );
          })
        )
        .then(
          axios.spread((...responses) => {
            this.setState({
              loaded: true,
              articles: responses.map(item => {
                return item.data;
              })
            });
          })
        )
        .catch(errors => {
          // react on errors.
        });
    } else {
      this.setState({
        loadByTag: true,
        tag: this.props.tagID
      });
    }
  }

  render() {
    if (this.state.loadByTag) {
      return (
        <ArchivArticles
          key={this.props.tag}
          tagID={this.state.tag}
          perpage="3"
        />
      );
    } else if (this.state.loaded) {
      return <ArticlesPanel posts={this.state.articles} />;
    }
    return <LoadingSpinner />;
  }
}
