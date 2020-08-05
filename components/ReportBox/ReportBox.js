import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import styles from "./ReportBox.module.scss";
import LoadingSpinner from "../LoadingSpinner";

export default class ReportBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      showErrorMessage: false,
      errorMessage: "",
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  report = event => {
    event.preventDefault();
    //return;
    this.setState({
      sending: true
    });

    if (this.state.text === undefined || this.state.text.trim() === "") {
      this.setState({
        errorMessage: "Nie je možné odoslať prázdny odkaz.",
        showErrorMessage: true,
        sending: false
      });
      return;
    }

    const commentData = {
      post: this.props.articleID,
      author_name: this.state.name,
      author_email: this.state.email,
      content: this.state.text.trim()
    };

    axios
      .post("https://wpadmin.f1online.sk/wp-json/wp/v2/comments", commentData)
      .then(res => {
        this.setState({
          errorMessage: "",
          showErrorMessage: false,
          sending: false,
          success: true
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message,
          showErrorMessage: true,
          sending: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { title } = this.props;
    return (
      <Popup
        trigger={
          <div className={styles.triggerContainer}>
            <button>Našli ste chybu?</button>
          </div>
        }
        style={{ width: "80%" }}
        lockScroll
        modal
        closeOnDocumentClick={false}
      >
        {close => (
          <div className={styles.formContainer}>
            {this.state.success ? (
              <>
                <span>Váš odkaz bol odoslaný. Ďakujeme!</span>
                <div className={styles.buttonRow}>
                  <button className={styles.button} onClick={close}>
                    OK
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>
                  Našli ste chybu v článku{" "}
                  <b>
                    <i>{title}</i>
                  </b>{" "}
                  alebo na webe? Niečo sa vám nezobrazuje správne?
                </span>
                <span>
                  Dajte nám vedieť tu alebo na <i>redakcia@f1online.sk</i> a my
                  sa problém pokúsime čím skôr vyriešiť.
                </span>
                <span>Ďakujeme!</span>
                {this.state.sending ? (
                  <LoadingSpinner title="Odosielam" />
                ) : (
                  <form className={styles.form} name="reportForm">
                    <input
                      className={styles.formInput}
                      type="text"
                      placeholder="Vaše meno"
                      id="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    <input
                      className={`${styles.formInput} ${styles.inputEmail}`}
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <textarea
                      className={styles.textArea}
                      name="inputtext"
                      type="textarea"
                      id="text"
                      rows="3"
                      value={this.state.inputText}
                      placeholder="Váš odkaz"
                      value={this.state.text}
                      onChange={this.handleChange}
                      required
                    ></textarea>
                    <div className={styles.buttonRow}>
                      <button onClick={close} className={styles.cancelButton}>
                        Zrušiť
                      </button>
                      <button
                        type="submit"
                        value="Odoslať"
                        className={styles.reactButton}
                        //onClick={() => this.sendAnswer()}
                        onClick={this.report}
                      >
                        Odoslať
                      </button>
                    </div>
                  </form>
                )}
                {this.state.showErrorMessage ? (
                  <span>{this.state.errorMessage}</span>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        )}
      </Popup>
    );
  }
}
