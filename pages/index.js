import React from "react";
import Head from "next/head";
import Media from "react-media";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import { useSelector } from "react-redux";


import TitleArea from "../components/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import CalendarLarge from "../components/CalendarLarge/CalendarLarge.js";
import ResultsLargeWrapper from "../components/ResultsLarge/ResultsLargeWrapper.js";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import Divider from "../components/Divider.js";
import FBPageBox from "../components/FBPageBox";

import { fetchNewArticles } from "../redux/actions/articlesActions";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";

function Home() {
  const postsData = useSelector(state => state.articles.indexArticles);

  /*
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth
    });
  };
*/
  //render() {
  let titleSection, articlesSection;
  //const { postsData } = this.props;
  //console.log(this.props)

  /*if (this.state.width < 1024) {
      titleSection = <TitleArea posts={postsData.slice(0, 3)} />;
      articlesSection = <ArticlesPanel posts={postsData.slice(3, 9)} />;
    } else {*/
  titleSection = <TitleArea posts={postsData.slice(0, 5)} />;
  articlesSection = <ArticlesPanel posts={postsData.slice(5, 11)} />;
  /*}*/

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky..."
        />
      </Head>
      <main className="contentsPage">
        {titleSection}
        <Divider height="25px" />
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Ďalšie správy" />
            <Divider height="10px" />
            <div className="basicButtonContainer">
              {articlesSection}
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

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (store.getState().articles.indexArticles.length === 0) {
    store.dispatch(fetchNewArticles());
    store.dispatch(fetchNewQuickNews());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});

export default Home;
