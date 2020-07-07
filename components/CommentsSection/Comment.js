import React, { Component } from "react";
import axios from "axios";
import formatDate from "../../utils/dateFormatter.js";
import { Button } from "react-bootstrap";
import styles from "./CommentsSection.module.scss";
import AnswerBox from "./AnswerBox/AnswerBox.js";
import NotLoggedAlertBox from "./NotLoggedAlertBox/NotLoggedAlertBox.js";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxOpened: false,
      answerBoxActive: false,
      loginBoxActive: true,
      maxLevel: 6
    };
    this.openAnswerBox = this.openAnswerBox.bind(this);
    this.reportComment = this.reportComment.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth < 420) {
      this.setState({ maxLevel: 3 });
    }
  }

  openAnswerBox() {
    if (localStorage.getItem("f1online-user-token")) {
      this.setState(prev => {
        return {
          boxOpened: !prev.boxOpened,
          answerBoxActive: true,
          loginBoxActive: false
        };
      });
    } else {
      this.setState(prev => {
        return {
          boxOpened: !prev.boxOpened,
          answerBoxActive: false,
          loginBoxActive: true
        };
      });
    }
  }

  reportComment = () => {
    event.preventDefault();
    this.setState({
      reporting: true
    });
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("f1online-user-token")}`
      }
    };

    let message, messageSubmitTime, author;
    if (this.props.comment) {
      message = this.props.comment.content.rendered;
      messageSubmitTime = formatDate(this.props.comment.date);
      author = this.props.comment.author_name;
    }

    const commentData = {
      post: this.props.articleID,
      author_name: localStorage.getItem("f1online-username"),
      author_email: localStorage.getItem("f1online-userEmail"),
      parent: this.props.comment ? this.props.comment.id : "0",
      content: `[s5dD1?0BdE85QsX_6]\n-----\nObsah nahláseného komentára: \n${message}\n-----\nPridal užívateľ: ${author}\nČas pridania: ${messageSubmitTime}`
    };

    axios
      .post(
        "https://wpadmin.f1online.sk/wp-json/wp/v2/comments",
        commentData,
        options
      )
      .then(res => {
        this.setState({
          errorMessage: "",
          showErrorMessage: false,
          sending: false
        });
        this.props.callback({ loggedIn: true, reported: true });
      })
      .catch(error => {
        this.setState({
          errorMessage: "Komentár sa nepodarilo nahlásiť.",
          showErrorMessage: true,
          sending: false
        });
      });
    //s5dD1?0BdE85QsX_6
  };

  render() {
    const { comment, level, articleID } = this.props;
    const nestedComments = (comment.children || []).map((comment, index) => {
      return (
        <Comment
          key={index}
          level={level + 1}
          articleID={articleID}
          comment={comment}
          callback={this.props.callback}
        />
      );
    });

    let answerBox;
    if (this.state.boxOpened) {
      if (this.state.loginBoxActive) {
        answerBox = <NotLoggedAlertBox />;
      }
      if (this.state.answerBoxActive) {
        answerBox = (
          <div className={styles.answerBoxContainer}>
            <AnswerBox
              comment={comment}
              articleID={articleID}
              callback={this.props.callback}
            />
          </div>
        );
      }
    }
    return (
      <div
        className={`${styles.threadContainer} ${
          level > 0 && level < this.state.maxLevel ? styles.leftMargin : ""
        }`}
        key={comment.id}
      >
        <div className={styles.commentContainer}>
          <img
            className={styles.userImage}
            src={comment.author_avatar_urls[96]}
          />
          <div className={styles.commentMainBody}>
            <div className={styles.commentHeader}>
              <div className={styles.authorsHeaderBlock}>
                <span className={styles.authorName}>{comment.author_name}</span>
                {comment.parentName ? (
                  <>
                    <i className={`fas fa-share ${styles.arrowIcon}`}></i>
                    <span className={styles.parentAuthorName}>
                      {comment.parentName}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.timeBlock}>
                <i class="far fa-clock"></i>
                <span className={styles.date}>{formatDate(comment.date)}</span>
              </div>
            </div>
            <div className={styles.mainCommentSection}>
              <div
                className={styles.commentBody}
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </div>
            {localStorage.getItem("f1online-user-token") ? (
              <div className={styles.buttonsRow}>
                <div className={styles.buttonsTopRow}>
                  <Button
                    className={styles.openReactBoxButton}
                    onClick={() => {
                      this.openAnswerBox();
                    }}
                  >
                    <span>{this.state.boxOpened ? "Zrušiť" : "Reagovať"}</span>
                  </Button>

                  {/*<i className={`fas fa-circle ${styles.dot}`}></i>*/}
                  {/*<Button
                    className={styles.openReactBoxButton}
                    onClick={() => {
                      this.reportComment();
                    }}
                  >
                    <span>Nahlásiť</span>
                  </Button>*/}
                </div>
                {comment && this.state.boxOpened ? (
                  <div className={styles.editorBoxHeader}>
                    <i className="far fa-comment-dots"></i>
                    <span>{`Reaguješ na užívateľa ${comment.author_name}:`}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {answerBox}
          </div>
        </div>
        {nestedComments}
      </div>
    );
  }
}
