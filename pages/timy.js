import React from "react";
import axios from "axios";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import Head from "next/head";

import QuickNews from "../components/QuickNews";
import RPanel from "../components/RPanel.js";
import CalResWidget from "../components/CalResWidget";
import TeamPreview from "../components/TeamPreview/TeamPreview.js";
import Divider from "../components/Divider.js";
import SectionTitle from "../components/SectionTitle";

import styles from "../styles/timy.module.scss";

export default function Teams({ teamsData }) {
  return (
    <>
      <Head>
        <title key="meta_title">Tímy | F1online.sk</title>
        <meta
          key="meta_og_title"
          property="og:title"
          content={`Tímy | F1online.sk`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/timy`}
        />
      </Head>
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Tímy" />
            <Divider height="20px" />
            {/*<img className={styles.image} src='' />*/}

            <div className={styles.container}>
              {teamsData.ConstructorTable.Constructors.map(constructor => (
                <TeamPreview constructor={constructor} />
              ))}
            </div>
          </div>
          <aside className="sideBar">
            <Divider height="50px" />
            <QuickNews />
            <Divider height="15px" />
            <RPanel />
            <Divider height="15px" />
            <CalResWidget />
          </aside>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(END);
    const response = await axios({
      method: "get",
      url: "https://wpadmin.f1online.sk/wp-content/uploads/teams.json"
      //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    });
    await store.sagaTask.toPromise();

    return {
      props: {
        teamsData: response.data
      }
    };
  }
);
