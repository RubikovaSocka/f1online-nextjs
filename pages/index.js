import React, { useEffect } from "react";
import Head from "next/head";
import Media from "react-media";
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
import useWindowSize from "../utils/useWindowSize";

function Home() {
  const postsData = useSelector(state => state.articles.indexArticles);
  const resultsData = useSelector(state => state.f1Results.results);
  console.log("state");
  console.log(useSelector(state => state));
  console.log("posts Data");
  console.log(postsData.length);
  console.log(postsData);

  const windowSize = useWindowSize();
console.log(windowSize)
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky..."
        />
      </Head>
      <main className="contentsPage">
      
        {windowSize && windowSize.width < 1023 ? (
          <TitleArea posts={postsData.slice(0, 3)} />
        ) : (
          <TitleArea posts={postsData.slice(0, 5)} />
        ) /*
        <Media query={{ maxWidth: 1023 }}>
          {matches =>
            matches ? (
              <TitleArea posts={postsData.slice(0, 3)} />
            ) : (
              
            )
            
            </Media>*/}
        <Divider height="25px" />
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Ďalšie správy" />
            <Divider height="10px" />
            {
              <Media query={{ maxWidth: 1023 }}>
                {matches =>
                  matches ? (
                    <ArticlesPanel posts={postsData.slice(3, 9)} />
                  ) : (
                    <ArticlesPanel posts={postsData.slice(5, 11)} />
                  )
                }
              </Media>
            }
            <div className="basicButtonContainer">
              {
                <ButtonWB
                  hrefProp="/archiv"
                  asProp="/archiv"
                  title="Pozrieť všetky"
                />
              }
            </div>
            <Media query={{ maxWidth: 1023 }}>
              {matches =>
                matches ? (
                  ""
                ) : (
                  <>
                    <Divider height="30px" />
                    <SectionTitle title="Boxová tabuľa" />
                    <Divider height="15px" />
                    <CalendarLarge />
                    <ResultsLargeWrapper />
                  </>
                )
              }
            </Media>
          </div>
          <aside className={`sideBar`}>
            {/*${styles.stickyWidget}*/}
            <Divider height="15px" />
            {/*<TrackedSidePanel />
              <Divider height="25px" />*/}
            {
              <div
                style={{
                  width: "100%"
                }}
              >
                <FBPageBox />
              </div>
            }

            <Divider height="15px" />
            <QuickNews />
          </aside>

          <Media query={{ maxWidth: 1023 }}>
            {matches =>
              matches ? (
                <div className="mainContent">
                  <CalResWidget />
                  <Divider height="110px" />
                </div>
              ) : (
                ""
              )
            }
          </Media>
        </div>
      </main>
    </>
  );
  //}
}
/*
Home.getInitialProps = async ({ store }) => {
  console.log("\n\n HOME INITIAL PROPS")
  //if (store.getState().articles.indexArticles.length === 0) {
    store.dispatch(fetchNewArticles());
    store.dispatch(END);
  //}

  await store.sagaTask.toPromise();
};*/

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    //if (store.getState().articles.indexArticles.length === 0) {
    store.dispatch(fetchNewArticles());
    store.dispatch(END);
    //}

    await store.sagaTask.toPromise();
  }
);

/*
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (store.getState().articles.indexArticles.length === 0) {
    store.dispatch(fetchNewArticles());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});
*/
export default Home;
