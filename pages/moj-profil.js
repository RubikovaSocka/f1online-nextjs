import React, { Component } from "react";
import Head from "next/head";
import QuickNews from "../components/QuickNews/QuickNews.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import Divider from "../components/Divider.js";
import styles from "../styles/moj-profil.module.scss";

export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isLoaded: false
    };
    this.resetPass = this.resetPass.bind(this);
  }

  resetPass() {}

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
          <div className="page">
            <div className="mainContent">
              <SectionTitle title="Obnova hesla" />
              <form
                className={styles.resetForm}
                name="resetForm"
                onSubmit={() => {
                  this.resetPass();
                }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={this.handleChange}
                  required
                />

                <input
                  className={styles.button}
                  type="submit"
                  value="Nové heslo"
                />
              </form>
            </div>
            <aside className="sideBar">
              <Divider height="50px" />
              <QuickNews />
            </aside>
          </div>
        </main>
      </>
    );
  }
}
