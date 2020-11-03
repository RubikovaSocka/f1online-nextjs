import React from "react";
import Head from "next/head";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import { useSelector } from "react-redux";

import TitleArea from "../components/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget";
import CalendarLarge from "../components/CalendarLarge";
import ResultsLargeWrapper from "../components/ResultsLarge";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import Divider from "../components/Divider.js";
import FBPageBox from "../components/FBPageBox";

import { fetchNewArticles } from "../redux/actions/articlesActions";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import isMobile from "../utils/isMobile";

import styled, { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
 h1 {
   font-size: 50px;
   color: green;
 }
`;
const Container = styled.div`
  text-align: center;
`;

function Home() {
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
        <GlobalStyle />
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
            {isScreenMobile ? (
              ""
            ) : (
              <>
                <Divider height="30px" />
                <SectionTitle title="Boxová tabuľa" />
                <Divider height="15px" />
                <CalendarLarge />
                <ResultsLargeWrapper />
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
              <FBPageBox />
            </div>
            <Divider height="15px" />
            <QuickNews />
          </aside>

          {isScreenMobile ? (
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
