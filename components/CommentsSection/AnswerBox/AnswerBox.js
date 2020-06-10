import React, { Component, useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./AnswerBox.module.scss";
import { Button } from "react-bootstrap";
import EditorBox, { getRenderedContent, getPlainContent } from "./EditorBox.js";
import LoadingSpinner from "../../LoadingSpinner";

export default class AnswerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_email: "",
      author_ip: "",
      content: [
        {
          type: "paragraph",
          children: [{ text: "" }]
        }
      ],
      errorMessage: "",
      showErrorMessage: false,
      sending: false,
      editorBox: <EditorBox />
    };
  }

  sendAnswer = () => {
    event.preventDefault();
    this.setState({
      sending: true
    });
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("f1online-user-token")}`
      }
    };

    const postPlainContent = getPlainContent();
    if (postPlainContent === undefined || postPlainContent.trim() === "") {
      this.setState({
        errorMessage: "Nie je možné odoslať prázdny komentár.",
        showErrorMessage: true,
        sending: false
      });
      return;
    }

    const commentData = {
      post: this.props.articleID,
      author_name: localStorage.getItem("f1online-username"),
      author_email: localStorage.getItem("f1online-userEmail"),
      parent: this.props.comment ? this.props.comment.id : "0",
      content: getRenderedContent()
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
        this.props.callback({loggedIn: true, reported: false});
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message,
          showErrorMessage: true,
          sending: false
        });
      });
/*
    const publicIp = require("public-ip");
    (async () => {
      await publicIp.v4().then(ip => {
        
      });
    })();*/
  };

  update = newValue => {
    this.setState({
      content: newValue
    });
  };

  hideErrorMessage = () => {
    this.setState({
      showErrorMessage: false
    });
  };

  render() {
    const { comment, level, articleID } = this.props;
    //const editor = useMemo(() => withReact(createEditor()), [])

    return (
      <>
        <div className={styles.editorBoxContainer}>
          {this.state.editorBox}
          <div className={styles.answerBoxFooter}>
            {this.state.sending ? (
              <div className={styles.loadingSpinnerContainer}>
                <LoadingSpinner title="none" nomargin={true} />
              </div>
            ) : (
              ""
            )}

            <Button
              className={styles.reactButton}
              onClick={() => this.sendAnswer()}
            >
              <span>Odoslať</span>
            </Button>
          </div>
        </div>
        {this.state.showErrorMessage ? (
          <div className={styles.errorMessageContainer}>
            <span>{this.state.errorMessage}</span>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
