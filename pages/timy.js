import { useEffect } from "react";
import axios from "axios";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import Head from "next/head";
import { useDispatch } from "react-redux";
import QuickNews from "../components/QuickNews";
import CalResWidget from "../components/CalResWidget";
import TeamPreview from "../components/TeamPreview/TeamPreview.js";
import Divider from "../components/Divider.js";
import SectionTitle from "../components/SectionTitle";

import styles from "../styles/timy.module.scss";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";
import onClient from "../utils/onClient";
import onMobile from "../utils/onMobile";
import BContainer from "../components/BContainer";
import { POSITION } from "../components/Ads/positions";
import TrackedBasicPanel from "../components/Ads/TrackedBasicPanel";

export default function Teams({ teamsData }) {
  return (
    <>
      <Head>
        <title key="meta_title">{`Tímy | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_og_title"
          property="og:title"
          content={`Tímy | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/timy`}
        />
      </Head>
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle topLevel={true} title="Tímy" />
            <Divider height="20px" />
            {/*<img className={styles.image} src='' />*/}

            <div className={styles.container}>
              {teamsData.ConstructorTable.Constructors.slice(0, 4).map(
                (constructor) => (
                  <TeamPreview constructor={constructor} />
                )
              )}
            </div>
            <BContainer>
              {onClient() ? (
                <TrackedBasicPanel position={POSITION.CONTENT_TEAMS_PAGE} />
              ) : null}
            </BContainer>
            <div className={styles.container}>
              {teamsData.ConstructorTable.Constructors.slice(4).map(
                (constructor) => (
                  <TeamPreview constructor={constructor} />
                )
              )}
            </div>
            <Divider height="10px" />
            <BContainer>
              {onClient() ? (
                <TrackedBasicPanel position={POSITION.CONTENT_TEAMS_PAGE} />
              ) : null}
            </BContainer>
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="50px" />
            <QuickNews />
            <Divider height="15px" />
            <Divider height="15px" />
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(END);
    const response = await axios({
      method: "get",
      url: "https://wpadmin.f1online.sk/wp-content/uploads/teams2021.json",
      //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    });
    await store.sagaTask.toPromise();

    return {
      props: {
        teamsData: response.data,
      },
    };
  }
);
