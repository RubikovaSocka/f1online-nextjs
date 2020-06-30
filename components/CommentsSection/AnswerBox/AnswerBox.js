import React, { Component, useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./AnswerBox.module.scss";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../LoadingSpinner";

export default class AnswerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_email: "",
      author_ip: "",
      errorMessage: "",
      showErrorMessage: false,
      sending: false,
      inputText: ""
      //editorBox: <EditorBox key={1564853155} />
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

    if (this.state.inputText === undefined || this.state.inputText.trim() === "") {
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
      content: this.state.inputText.trim()
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
        this.props.callback({ loggedIn: true, reported: false });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message,
          showErrorMessage: true,
          sending: false
        });
      });
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

  handleChange = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  render() {
    const { comment, level, articleID } = this.props;
    //const editor = useMemo(() => withReact(createEditor()), [])
    console.log("rendering answerbox");
    return (
      <>
        <form className={styles.editorBoxContainer}>
          {/*{this.state.editorBox}*/}
          {/*<EditorBox />*/}
          <textarea className={styles.textArea} 
          name="inputtext" type="textarea" rows="4" value={this.state.inputText} 
          placeholder="Tvoj názor..."
          onChange={this.handleChange}></textarea>
          <div className={styles.answerBoxFooter}>
            {this.state.sending ? (
              <div className={styles.loadingSpinnerContainer}>
                <LoadingSpinner title="none" nomargin={true} />
              </div>
            ) : (
              ""
            )}

            <input type="submit" value="Odoslať"
              className={styles.reactButton}
              onClick={() => this.sendAnswer()}
            >
            </input>
          </div>
        </form>
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
