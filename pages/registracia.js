import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import QuickNews from "../components/QuickNews/QuickNews.js";
import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import Divider from "../components/Divider.js";
import styles from "../styles/registracia.module.scss";
import LoadingSpinner from "../components/LoadingSpinner.js";

class Registracia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: {},
      name: "",
      email: "",
      pass: "",
      pass2: "",
      isLoaded: false,
      loading: false,
      registrationResultMessage: ""
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  register(event) {
    event.preventDefault();
    this.setState({
      loading: true,
      registrationResultMessage: ""
    });
    const { name, email, pass, pass2 } = this.state;

    if (pass !== pass2) {
      this.setState({
        loading: false,
        registrationResultMessage: "Heslá sa nezhodujú."
      });
      return;
    }

    const userData = { username: name, email: email, password: pass };

    axios({
      method: "post",
      url: "https://wpadmin.f1online.sk/wp-json/wp/v2/users/register",
      /*data: {
        name: name,
        email: email,
        password: pass
      },*/
      data: userData,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        //handle success
        this.setState({
          registrationResultMessage: response.data.message,
          loading: false
        });
      })
      .catch(error => {
        //handle error
        this.setState({
          registrationResultMessage: error.response.data.message,
          loading: false
        });
      });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    }

  render() {
    return (
      <>
        <Head>
          <title key="meta_title">Registrácia | F1online.sk</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`Registrácia | F1online.sk`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/registracia`}
          />
        </Head>
        <main className="contentsPage">
          <div className={styles.fullpage}>
            <SectionTitle title="Registrácia" />
            <form
              className={styles.form}
              name="regForm"
              onSubmit={this.register}
            >
              <input
                className={styles.formInput}
                type="text"
                placeholder="Užívateľské meno"
                id="name"
                onChange={this.handleChange}
                required
              />
              <input
              className={styles.formInput}
                type="email"
                placeholder="Email"
                id="email"
                onChange={this.handleChange}
                required
              />
              <input
              className={styles.formInput}
                type="password"
                placeholder="Heslo"
                id="pass"
                onChange={this.handleChange}
                required
              />
              <input
              className={styles.formInput}
                type="password"
                placeholder="Overenie hesla"
                id="pass2"
                onChange={this.handleChange}
                required
              />
              <div className={styles.checkboxContainer}>
                <label>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    placeholder="Overenie hesla"
                    id="check"
                    onChange={this.handleChange}
                    required
                  />
                  Súhlasím so spracovaním{" "}
                </label>
                <Link href="/zasady-ochrany-sukromia">
                  <a target="_blank">osobných údajov</a>
                </Link>
              </div>
              <Divider height="15px" />
              <input
                className={styles.button}
                type="submit"
                value="Registrovať"
              />
              <div className={styles.text}>
                {this.state.registrationResultMessage.length > 0 ? (
                  this.state.registrationResultMessage ===
                  "Email sa už používa. Zabudli ste heslo?" ? (
                    <>
                      <span>Email sa už používa. </span>
                      <Link href="/zabudol-som-heslo">
                        <a target="_blank">Zabudli ste heslo?</a>
                      </Link>
                    </>
                  ) : (
                    <span>{this.state.registrationResultMessage}</span>
                  )
                ) : this.state.loading ? (
                  <div className={styles.text}>
                    <LoadingSpinner title="Registrujem..." nomargin={true} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </main>
      </>
    );
  }
}
export default Registracia;
