import React, { Component } from "react";
import axios from "axios";
import styles from "./LoginBox.module.scss";
import { Button } from "react-bootstrap";
import AnswerBox from "../AnswerBox/AnswerBox.js";
import Link from "next/link";
import LoadingSpinner from "../../LoadingSpinner";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Popup from "reactjs-popup";
import ImageUploading from "react-images-uploading";
import Divider from "../../Divider";

export default class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userNicename: "",
      email: "",
      password: "",
      loggedIn: false,
      loading: false,
      loginAnswer: "",
      error: "",
      hideGuidelines: false,
      loadingGuidelines: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.confirmGuidelines = this.confirmGuidelines.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.callback.bind(this);
  }

  login(event) {
    event.preventDefault();

    const loginData = {
      username: this.state.username,
      password: this.state.password
    };

    this.setState({ loading: true, loginAnswer: "" }, () => {
      axios
        .post(
          "https://wpadmin.f1online.sk/wp-json/jwt-auth/v1/token",
          loginData
        )
        .then(res => {
          if (res.data.token === undefined) {
            this.setState({ error: res.data.message, loading: false });
            return;
          }

          axios
            .get("https://wpadmin.f1online.sk/wp-json/wp/v2/pages/2100")
            .then(res => {
              localStorage.setItem(
                "f1online-discussion-guidelines",
                res.data.content.rendered
              );
            });

          localStorage.setItem("f1online-user-token", res.data.token);
          localStorage.setItem("f1online-username", res.data.user_display_name);
          localStorage.setItem("f1online-userNicename", res.data.user_nicename);
          localStorage.setItem("f1online-userEmail", res.data.user_email);
          localStorage.setItem("f1online-userImage", res.data.user_image_url);

          this.props.callback({ loggedIn: true });

          this.setState({
            token: res.data.token,
            loading: false,
            userNicename: res.data.userNiceName,
            email: res.data.email,
            loggedIn: true
          });
        })
        .catch(error => {
          let answerCode = error.response.data.code;
          let loginAnswer;
          if (answerCode === "[jwt_auth] incorrect_password") {
            loginAnswer =
              '<strong>Chyba</strong>: Heslo zadané pre používateľské meno <strong>tester</strong> je nesprávne. <a target="_blank" href="/zabudol-som-heslo">Zabudli ste heslo?</a>';
          } else {
            loginAnswer = error.response.data.message;
          }
          this.setState({
            error: error.response.data.message,
            loading: false,
            loginAnswer: loginAnswer
          });
        });
    });
  }

  logout() {
    this.setState({
      loggedIn: false,
      loading: true
    });
    this.props.callback({ loggedIn: false });
    localStorage.removeItem("f1online-user-token");
    localStorage.removeItem("f1online-username");
    localStorage.removeItem("f1online-userNicename");
    localStorage.removeItem("f1online-userEmail");
    localStorage.removeItem("f1online-userImage");
    this.setState({
      loading: false
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  confirmGuidelines() {
    localStorage.setItem("f1online-discussion-guidelines-ok", "ok");
    this.setState({
      hideGuidelines: true
    });
  }

  openGuidelines() {
    localStorage.removeItem("f1online-discussion-guidelines-ok");
    this.setState({
      loadingGuidelines: true
    });
    axios
      .get("https://wpadmin.f1online.sk/wp-json/wp/v2/pages/2100")
      .then(res => {
        localStorage.setItem(
          "f1online-discussion-guidelines",
          res.data.content.rendered
        );
        this.setState({
          hideGuidelines: false,
          loadingGuidelines: false
        });
      });
  }

  render() {
    const { username, password } = this.state;

    if (this.state.loggedIn || localStorage.getItem("f1online-user-token")) {
      return (
        <div className={styles.topLevelAnswerBoxContainer}>
          {this.state.loadingGuidelines ? (
            <>
              <Divider height="25px" />
              <LoadingSpinner title="none" nomargin={true} />
              <Divider height="25px" />
            </>
          ) : localStorage.getItem("f1online-discussion-guidelines") &&
            localStorage.getItem("f1online-user-token") &&
            !localStorage.getItem("f1online-discussion-guidelines-ok") ? (
            <div className={styles.guidelinesContainer}>
              {" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: localStorage.getItem("f1online-discussion-guidelines")
                }}
              />
              <Button
                className={`${styles.confirmGuidelinesButton} ${styles.logoutButton}`}
                onClick={() => {
                  this.confirmGuidelines();
                }}
              >
                Súhlasím
              </Button>
            </div>
          ) : (
            ""
          )}
          <div className={styles.profileContainer}>
            {localStorage.getItem("f1online-username") ? (
              <div className={styles.textBlock}>
                {/*<span>Si prihlásený ako </span>*/}
                <span className={styles.username}>
                  {localStorage.getItem("f1online-username")}
                </span>
              </div>
            ) : (
              "Nie si prihlásený"
            )}
            <div className={styles.buttonsBlock}>
              <Button
                className={styles.logoutButton}
                onClick={() => {
                  this.openGuidelines();
                }}
              >
                Pravidlá
              </Button>
              <Button
                className={styles.logoutButton}
                onClick={() => {
                  this.logout();
                }}
              >
                Odhlásiť sa
              </Button>
            </div>
          </div>
          <div className={styles.answerBoxRow}>
            <Popup
              trigger={
                <div className={styles.userImageContainer}>
                  <img
                    className={styles.userImage}
                    src={
                      localStorage.getItem("f1online-userImage")
                        ? localStorage.getItem("f1online-userImage")
                        : "https://secure.gravatar.com/avatar/19c0ef076fd220904c3f08e544995f02?s=52&d=mm&r=g"
                    }
                  />
                  <div className={styles.userImageOverlay}>
                    <div className={styles.userImageOverlayText}>
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
              }
              modal
              closeOnDocumentClick
            >
              {close => (
                <div className={styles.popupContainer}>
                  <a className={styles.popupCloseButton} onClick={close}>
                    &times;
                  </a>
                  <SectionTitle title="Ako si nahrať fotku" />
                  <Divider height="20px" />

                  <>
                    <img
                      className={styles.userImage}
                      src={
                        localStorage.getItem("f1online-userImage")
                          ? localStorage.getItem("f1online-userImage")
                          : "https://secure.gravatar.com/avatar/19c0ef076fd220904c3f08e544995f02?s=52&d=mm&r=g"
                      }
                    />
                    <div className={`${styles.answerMessageContainer}`}>
                      <span>
                        Užívatelia si môžu nahrať profilovú fotku
                        prostredníctvom služby Gravatar.
                      </span>
                      <span>
                        Aby sme fotku rozpoznali, pri registrácii na Gravatare
                        použite rovnaký email, akým ste sa registrovali na našej
                        stránke.
                      </span>
                      <span>
                        Po zaregistrovaní sa na Gravatare si nastavte profilovú
                        fotku, do pár minút sa objaví na našej stránke. Ak nie,
                        skúste sa odhlásiť a zas prihlásiť.
                      </span>
                    </div>

                    <Divider height="20px" />
                    <Link href="https://en.gravatar.com/connect/?source=_signup">
                      <a target="_blank" className={styles.loginButton}>
                        <span>Prejsť na Gravatar</span>
                        <i
                          style={{ marginLeft: "5px" }}
                          class="fas fa-external-link-alt"
                        ></i>
                      </a>
                    </Link>
                  </>
                </div>
              )}
            </Popup>
            {localStorage.getItem("f1online-user-token") ? (
              <div className={styles.editorBoxContainer}>
                <AnswerBox
                  articleID={this.props.articleID}
                  callback={this.props.callback}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.loginBox}>
          <Popup
            trigger={<button className={styles.bbutton}> Prihlásiť sa </button>}
            modal
            closeOnDocumentClick
          >
            {close => (
              <div className={styles.popupContainer}>
                {this.state.loading ? (
                  <LoadingSpinner title="Prihlasujem" nomargin={true} />
                ) : (
                  <>
                    <a className={styles.popupCloseButton} onClick={close}>
                      &times;
                    </a>
                    <SectionTitle title="Prihlásenie" />
                    <form
                      className={styles.form}
                      name="regForm"
                      onSubmit={this.login}
                    >
                      <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Prihlasovacie meno"
                        id="username"
                        value={username}
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        className={styles.formInput}
                        type="password"
                        placeholder="Heslo"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        className={`${styles.bbutton}`}
                        type="submit"
                        value="Prihlásiť sa"
                      />
                    </form>
                    <Divider height="10px" />
                    <Link href="/zabudol-som-heslo">
                      <a target="_blank" className={`${styles.forgotButton}`}>
                        <span>Obnovenie hesla</span>
                      </a>
                    </Link>
                    {this.state.loginAnswer.length > 0 ? (
                      <div
                        className={`${styles.answerMessageContainer}`}
                        dangerouslySetInnerHTML={{
                          __html: this.state.loginAnswer
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            )}
          </Popup>
          <Link href="/registracia" as="/registracia">
            <a target="_blank" className={`${styles.bbutton}`}>
              <span>Registrovať sa</span>
            </a>
          </Link>
        </div>
      );
    }
  }
}
