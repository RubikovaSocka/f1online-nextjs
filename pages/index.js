import React, { useEffect } from "react";
import Head from "next/head";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";

import TitleArea from "../components/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
//import CalResWidget from "../components/CalResWidget";
//import CalendarLarge from "../components/CalendarLarge";
//import ResultsLarge from "../components/ResultsLarge";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import Divider from "../components/Divider.js";
//import FBPageBox from "../components/FBPageBox";

//import { fetchF1Results } from "../redux/actions/f1ResultsActions";

//import dynamic from "next/dynamic";
import loadable from '@loadable/component'
//const CalendarLarge = dynamic(() => import("../components/CalendarLarge"));
//const ResultsLarge = dynamic(() => import("../components/ResultsLarge"));
//const CalResWidget = dynamic(() => import("../components/CalResWidget"));

const CalendarLarge = loadable(() => import("../components/CalendarLarge"), { ssr: false });
const ResultsLarge = loadable(() => import("../components/ResultsLarge"), { ssr: false });
const CalResWidget = loadable(() => import("../components/CalResWidget"), { ssr: false });

import { fetchNewArticles } from "../redux/actions/articlesActions";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import { fetchProgramme } from "../redux/actions/programmeActions";

import isMobile from "../utils/isMobile";
import onClient from "../utils/onClient";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchF1Results({ perPage: 1 }));
    dispatch(fetchProgramme());
    dispatch(fetchNewQuickNews());
  }, []);

  const postsData = useSelector(state => state.articles.indexArticles);
  const isScreenMobile = isMobile();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky..."
        />
      </Head>
      <main className="contentsPage">
        {isScreenMobile ? (
          <TitleArea posts={postsData.slice(0, 3)} />
        ) : (
          <TitleArea posts={postsData.slice(0, 5)} />
        )}
        <Divider height="25px" />
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Ďalšie správy" />

            <Divider height="10px" />
            {isScreenMobile ? (
              <ArticlesPanel posts={postsData.slice(3, 9)} />
            ) : (
              <ArticlesPanel posts={postsData.slice(5, 11)} />
            )}

            <div className="basicButtonContainer">
              <ButtonWB
                hrefProp="/archiv"
                asProp="/archiv"
                title="Pozrieť všetky"
              />
            </div>
            {onClient() && isScreenMobile ? (
              ""
            ) : (
              <>
                <Divider height="30px" />
                <SectionTitle title="Boxová tabuľa" />
                <Divider height="15px" />
                <CalendarLarge />
                <ResultsLarge />
              </>
            )}
          </div>
          <aside className={`sideBar`}>
            <Divider height="15px" />
            <div
              style={{
                width: "100%"
              }}
            >
              {/*<FBPageBox />*/}
            </div>
            <Divider height="15px" />
            <QuickNews />
          </aside>

          {onClient() && isScreenMobile ? (
            <div className="mainContent">
              <CalResWidget />
              <Divider height="110px" />
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(fetchNewArticles());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Home;
