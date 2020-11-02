import React from "react";
import axios from "axios";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import Head from "next/head";
import QuickNews from "../components/QuickNews";
import RPanel from "../components/RPanel.js";
import CalResWidget from "../components/CalResWidget";

import DriverPreview from "../components/DriverPreview/DriverPreview.js";
import SectionTitle from "../components/SectionTitle";
import Divider from "../components/Divider.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

import styles from "../styles/piloti.module.scss";

export default function Drivers({ teamsData }) {
  let dataBlock = teamsData.ConstructorTable.Constructors.map(
    (constructor, index) => {
      return constructor.Drivers.map((driver, index2) => {
        return (
          <DriverPreview
            key={`${index}-${index2}`}
            driver={driver}
            team={constructor.name}
            teamColor={constructor.teamColor}
          />
        );
      });
    }
  );

  return (
    <>
      <Head>
        <title key="meta_title">Piloti | F1online.sk</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Piloti | F1online.sk`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/piloti`}
        />
      </Head>
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Piloti" />
            <Divider height="20px" />
            <div className={styles.driversContainer}>{dataBlock}</div>
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