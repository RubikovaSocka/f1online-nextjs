import React, { Component } from "react";
import axios from "axios";

import styles from "./CommentsSection.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";
import Comment from "./Comment";
import ReactGA from "react-ga";
import LoginBox from "./LoginBox/LoginBox";
import Divider from "../Divider";

function nestComments(commentList) {
  const commentMap = {};

  // move all the comments into a map of id => comment
  commentList.forEach(comment => {
    //console.log(comment.id);
    commentMap[comment.id] = comment;
    commentMap[comment.id].children = [];
  });

  // iterate over the comments again and correctly nest the children
  commentList.forEach(comment => {
    if (comment.parent !== 0) {
      const parent = commentMap[comment.parent];
      if (commentMap[comment.parent] !== undefined) {
        comment.parentName = parent.author_name;
        parent.children.push(comment);
      } else {
        comment.parent = 0;
        comment.parentName = "Zmazané";
      }
    }
  });
  // filter the list to return a list of correctly nested comments
  return commentList.filter(comment => {
    return comment.parent === 0;
  });
}

export default class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentsLoaded: false,
      commentsLoadingStarted: false,
      loggedIn: false,
      reported: false,
      nrComments: 0
    };
    this.openSectionClicked = this.openSectionClicked.bind(this);
    this.reloadComments = this.reloadComments.bind(this);
    this.selectedRef = React.createRef();
  }

  componentDidMount() {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/comments?post=${this.props.articleID}&per_page=1`
      )
      .then(res => {
        this.setState({
          loggedIn: localStorage.getItem("f1online-user-token") !== null,
          nrComments: res.headers["x-wp-total"]
        });
      });
  }

  openSectionClicked() {
    ReactGA.event({
      category: "comment",
      action: "comment-section-opened",
      label: this.props.articleUrl
    });

    if (!this.state.commentsLoadingStarted) {
      this.reloadComments({
        loggedIn: localStorage.getItem("f1online-user-token") !== null
      });
    }
  }

  reloadComments = props => {
    this.setState({
      commentsLoaded: false,
      commentsLoadingStarted: true,
      comments: [],
      loggedIn: props.loggedIn,
      reported: props.reported ? props.reported : false
    });

    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/comments?post=${this.props.articleID}&per_page=100`
      )
      .then(res => {
        console.log(res);
        this.setState({
          comments: nestComments(res.data.reverse()),
          commentsLoaded: true
        });
        if (Object.keys(this.selectedRef).length != 0) {
          this.selectedRef.current
            ? window.scrollTo({
                top: this.selectedRef.current.offsetTop - 120,
                behavior: "smooth"
              })
            : "";
        }
      });
  };

  render() {
    return this.state.commentsLoaded ? (
      //Komentare
      <div className={styles.container}>
        <div
          className={`${styles.discussionHeaderRow} ${
            this.state.loggedIn ? styles.flexCol : styles.flexRow
          }`}
        >
          <div className={styles.ref} ref={this.selectedRef} />
          <SectionTitle title="Diskusia" />
        </div>
        <LoginBox
          articleID={this.props.articleID}
          callback={this.reloadComments}
        />
        {this.state.reported ? (
          <div className={styles.reportedCommentsBox}>
            <span className={styles.reportedCommentSpan}>
              Ďakujeme, komentár bol nahlásený.
            </span>
          </div>
        ) : (
          ""
        )}
        <Divider height="15px" />
        {this.state.comments.length ? (
          this.state.comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                articleID={this.props.articleID}
                level={0}
                callback={this.reloadComments}
                comment={comment}
              />
            );
          })
        ) : (
          <div className={styles.reportedCommentsBox}>
            <span className={styles.reportedCommentSpan}>
              Tento článok ešte nikto nekomentoval.
            </span>
          </div>
        )}
      </div>
    ) : (
      //Tlacidlo na otvorenie komentarov
      <div className={styles.container}>
        <div
          className={styles.button}
          onClick={() => {
            this.openSectionClicked();
          }}
        >
          <span>Komentáre ({this.state.nrComments})</span>
        </div>
      </div>
    );
  }
}
