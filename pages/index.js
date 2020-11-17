import Head from "next/head";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import { useSelector } from "react-redux";

import TitleArea from "../components/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel";
import SectionTitle from "../components/SectionTitle";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import Divider from "../components/Divider.js";

import TrackedSidePanel from "../components/Ads/TrackedSidePanel";
import CalResWidget from "../components/CalResWidget";
import QuickNews from "../components/QuickNews";
import CalendarLarge from "../components/CalendarLarge";
import ResultsLarge from "../components/ResultsLarge";

import { fetchNewArticles } from "../redux/actions/articlesActions";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";

import isMobile from "../utils/onMobile";
import onClient from "../utils/onClient";

//import fontawesomeSubset from "fontawesome-subset";

function Home() {
  const state = useSelector((state) => state.articles);
  const postsData = state.indexArticles;
  const isLoading = state.isLoading;
  const isScreenMobile = isMobile();

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky..."
        />
      </Head>
      <MAIN>
        <TitleArea isLoading={isLoading} posts={postsData.slice(0, 5)} />
        <Divider height="25px" />
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle title="Ďalšie správy" />
            <Divider height="10px" />
            <ArticlesPanel
              isLoading={isLoading}
              posts={postsData.slice(5, 11)}
            />
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
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="15px" />
            <div
              style={{
                width: "100%",
              }}
            >
              {/*<FBPageBox />*/}
            </div>
            <Divider height="15px" />
            <TrackedSidePanel />
            <Divider height="15px" />
            <QuickNews />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    /*fontawesomeSubset(
      [
        "circle-notch",
        "chevron-up",
        "chevron-down",
        "spin",
        "fa-spin",
        "paperclip",
        "play-circle",
        "circle"
      ],
      "public/fonts/FontAwesome"
    );*/
    store.dispatch(fetchNewArticles());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Home;
