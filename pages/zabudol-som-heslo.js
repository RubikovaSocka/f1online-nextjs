import React, { Component } from "react";
import Head from "next/head";
import axios from "axios";

import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import Divider from "../components/Divider.js";
import styles from "../styles/zabudol-som-heslo.module.scss";
import LoadingSpinner from "../components/LoadingSpinner";

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: 0,
      password: "",
      password2: "",
      isLoaded: false,
      resetLinkAnswer: "",
      settingNewPassword: false,
      newPassSetAnswer: ""
    };
    this.resetPass = this.resetPass.bind(this);
    this.update = this.update.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
  }

  resetPass(event) {
    event.preventDefault();
    const sendData = {
      email: this.state.email
    };

    axios
      .post(
        "https://wpadmin.f1online.sk/wp-json/bdpwr/v1/reset-password",
        sendData
      )
      .then(res => {
        this.setState({
          resetLinkAnswer: res.data.message
        });
      })
      .catch(err => {
        this.setState({
          resetLinkAnswer: err.response.data.message
        });
      });
  }

  setNewPassword(event) {
    event.preventDefault();
    this.setState({
      newPassSetAnswer: "",
      settingNewPassword: true
    });

    if (this.state.password !== this.state.password2) {
      this.setState({
        newPassSetAnswer: "Heslá sa nezhodujú.",
        settingNewPassword: false
      });
      return;
    }

    const sendData = {
      email: this.state.email,
      code: this.state.code,
      password: this.state.password
    };

    axios
      .post(
        "https://wpadmin.f1online.sk/wp-json/bdpwr/v1/set-password",
        sendData
      )
      .then(res => {
        this.setState({
          newPassSetAnswer: res.data.message,
          settingNewPassword: false
        });
      })
      .catch(err => {
        this.setState({
          newPassSetAnswer: err.response.data.message,
          settingNewPassword: false
        });
      });
  }

  update(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <>
        <Head>
          <title key="meta_title">Zabudol som heslo | F1online.sk</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`Zabudol som heslo | F1online.sk`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/zabudol-som-heslo`}
          />
        </Head>
        <main className="contentsPage">
          <div className={styles.fullpage}>
            <SectionTitle title="Obnova hesla" />
            <div className={styles.text}>
              <span>
                Zadajte svoj email, pošleme vám naň kód, pomocou ktorého si
                nastavíte nové heslo.
              </span>
            </div>
            <form
              className={styles.resetForm}
              name="resetForm"
              onSubmit={this.resetPass}
            >
              <input
                className={styles.formInput}
                type="email"
                placeholder="Email"
                id="email"
                onChange={this.update}
                required
              />
              <input className={styles.button} type="submit" value="Odoslať" />
            </form>
            {this.state.resetLinkAnswer.length > 0 ? (
              <div className={`${styles.text} ${styles.resetMessage}`}>
                <span>{this.state.resetLinkAnswer}</span>
              </div>
            ) : (
              ""
            )}
            <div className={styles.text}>
              <span>Už ste dostali kód? Tu si môžete nastaviť nové heslo:</span>
            </div>
            <form
              className={styles.form}
              name="resetForm"
              onSubmit={this.setNewPassword}
            >
              <input
                className={styles.formInput}
                type="email"
                placeholder="Email"
                id="email"
                onChange={this.update}
                required
              />
              <input
                className={styles.formInput}
                type="number"
                placeholder="Číslený kód z emailu"
                id="code"
                onChange={this.update}
                required
              />
              <input
                className={styles.formInput}
                type="password"
                placeholder="Nové heslo"
                id="password"
                onChange={this.update}
                required
              />
              <input
                className={styles.formInput}
                type="password"
                placeholder="Overenie hesla"
                id="password2"
                onChange={this.update}
                required
              />
              <Divider height="15px" />
              <input className={styles.button} type="submit" value="Potvrdiť" />
            </form>
            {this.state.newPassSetAnswer.length > 0 ? (
              <div className={`${styles.text} ${styles.resetMessage}`}>
                <span>{this.state.newPassSetAnswer}</span>
              </div>
            ) : this.state.settingNewPassword ? (
              <div className={styles.text}>
                <LoadingSpinner title="Načítavam..." nomargin={true} />
              </div>
            ) : (
              ""
            )}
          </div>
        </main>
      </>
    );
  }
}
