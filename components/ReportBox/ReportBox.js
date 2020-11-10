import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import styles from "./ReportBox.module.scss";
import LoadingSpinner from "../LoadingSpinner";
import styled from "styled-components";

const Container = styled.div`
  .triggerContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 12px;
    button {
      font-size: 14px;
      font-family: "HK Grotesk";
      color: ${props => props.theme.TEXT_COLOR_MILD};
      text-align: right;

      background: none;
      border: none;
      padding: 0;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .formContainer {
    /*position: fixed;
  margin: auto;
  top: 120px;
  left: 0;
  right: 0;
*/
    border: ${props => props.theme.QUICKNEWS_BORDER};
    position: fixed;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    font-family: "HK Grotesk";
    font-size: 14px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    background-color: ${props => props.theme.PAGE_BACK_COLOR};

    width: calc(100% - 60px);
    padding: 10px;

    span {
      margin: 4px 0;
      color: ${props => props.theme.TEXT_COLOR_MILD};
    }
    box-shadow: ${props => props.theme.POPUP_SHADOW};
  }

  .form {
    width: 100%;
    margin-top: 15px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    input,
    textarea {
      font-family: "HK Grotesk";
      font-size: 14px;
      padding: 5px 7px;
      color: ${props => props.theme.TEXT_COLOR_MILD};
    }

    .formInput {
      margin-bottom: 5px;
      width: 100%;
      background: none;
      border: ${props => props.theme.QUICKNEWS_BORDER};
    }
    .textArea {
      width: calc(100% - 17px);
      min-width: calc(100% - 17px);
      max-width: calc(100% - 17px);
      min-height: 50px;
      margin-top: 2px;
      background: none;
      border: ${props => props.theme.QUICKNEWS_BORDER};
    }
  }
  .title {
    font-weight: 600;
    font-size: 16px;
    margin: 0;
    margin-bottom: 12px;
  }
  .buttonRow {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    button,
    .button {
      margin-left: 7px;
      margin-top: 7px;
      border: 1px solid ${props => props.theme.TEXT_COLOR_MILD};
      border-radius: 0px;
      font-family: "HK Grotesk", "Source Sans Pro";
      text-transform: uppercase;
      text-decoration: none;
      text-align: center;
      font-weight: 700;
      font-size: 14px;
      padding: 8px 12px;
      color: ${props => props.theme.TEXT_COLOR_MILD};
      background-color: ${props => props.theme.PAGE_BACK_COLOR};

      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      transition: ease-in-out 0.2s;
    }

    button:hover,
    .button:hover {
      background-color: ${props => props.theme.TEXT_COLOR_MILD};
      color: ${props => props.theme.PAGE_BACK_COLOR};
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 375px) {
    .form .formInput {
      width: calc(50% - 20px);
    }
    .form .inputEmail {
      margin-left: 7px;
    }
  }

  @media only screen and (min-width: 1024px) {
    .formContainer {
      width: 430px;
    }
  }
`;

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
      <Container>
        <Popup
          trigger={
            <div className="triggerContainer">
              <button>Našli ste chybu?</button>
            </div>
          }
          style={{ width: "80%" }}
          lockScroll
          modal
          closeOnDocumentClick={false}
        >
          {close => (
            <div className="formContainer">
              {this.state.success ? (
                <>
                  <span>Váš odkaz bol odoslaný. Ďakujeme!</span>
                  <div className="buttonRow">
                    <button className="button" onClick={close}>
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
                    Dajte nám vedieť tu alebo na <i>redakcia@f1online.sk</i> a
                    my sa problém pokúsime čím skôr vyriešiť.
                  </span>
                  <span>Ďakujeme!</span>
                  {this.state.sending ? (
                    <LoadingSpinner title="Odosielam" />
                  ) : (
                    <form className="form" name="reportForm">
                      <input
                        className="formInput"
                        type="text"
                        placeholder="Vaše meno (nepovinné)"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <input
                        className="formInput inputEmail"
                        type="email"
                        placeholder="Email (nepovinné)"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <textarea
                        className="textArea"
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
                      <div className="buttonRow">
                        <button onClick={close} className="cancelButton">
                          Zrušiť
                        </button>
                        <button
                          type="submit"
                          value="Odoslať"
                          className="reactButton"
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
      </Container>
    );
  }
}
