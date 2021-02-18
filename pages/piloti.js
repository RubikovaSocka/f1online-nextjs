import axios from "axios";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import Head from "next/head";
import QuickNews from "../components/QuickNews";
import CalResWidget from "../components/CalResWidget";

import DriverPreview from "../components/DriverPreview/DriverPreview.js";
import SectionTitle from "../components/SectionTitle";
import Divider from "../components/Divider.js";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";

import onClient from "../utils/onClient";
import { POSITION } from "../components/Ads/positions";
import TrackedPanel, { TYPES } from "../components/Ads/TrackedPanel";
import onMobile from "../utils/onMobile";
import BContainer from "../components/BContainer";
import styles from "../styles/piloti.module.scss";

function Drivers({ teamsData }) {
  return (
    <>
      <Head>
        <title key="meta_title">{`Piloti | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Piloti | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/piloti`}
        />
      </Head>
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle topLevel={true} title="Piloti" />
            <Divider height="20px" />
            <div className={styles.driversContainer}>
              {teamsData.ConstructorTable.Constructors.slice(0, 4).map(
                (constructor, index) => {
                  return constructor.Drivers.map((driver, index2) => (
                    <DriverPreview
                      key={`${index}-${index2}`}
                      driver={driver}
                      team={constructor.name}
                      teamColor={constructor.teamColor}
                    />
                  ));
                }
              )}
            </div>
            <BContainer>
              {onClient() ? (
                <TrackedPanel
                  type={TYPES.BASIC}
                  position={POSITION.CONTENT_DRIVERS_PAGE}
                />
              ) : null}
            </BContainer>
            <div className={styles.driversContainer}>
              {teamsData.ConstructorTable.Constructors.slice(4).map(
                (constructor, index) => {
                  return constructor.Drivers.map((driver, index2) => (
                    <DriverPreview
                      key={`${index}-${index2}`}
                      driver={driver}
                      team={constructor.name}
                      teamColor={constructor.teamColor}
                    />
                  ));
                }
              )}
            </div>
            <BContainer>
              {onClient() && onMobile() ? (
                <TrackedPanel
                  type={TYPES.BASIC}
                  position={POSITION.CONTENT_DRIVERS_PAGE}
                />
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

    const response = await fetch(
      "https://wpadmin.f1online.sk/wp-content/uploads/teams2021.json"
    )
      .then((res) => res.json())
      .then((res) => res);
    await store.sagaTask.toPromise();

    return {
      props: {
        teamsData: response,
      },
    };
  }
);

export default Drivers;
