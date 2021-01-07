import Head from "next/head";
import { END } from "redux-saga";
import { wrapper } from "../redux/store/store";
import { useSelector } from "react-redux";

import TitleArea from "../components/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel";
import SectionTitle from "../components/SectionTitle";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import Divider from "../components/Divider.js";

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
import PopularArticles from "../components/PopularArticles/PopularArticles";
import Product, {
  POSITIONS as PRODUCT_POSITIONS,
} from "../components/Ads/Products";
import RelatedArticles from "../components/RelatedArticles";
import TrackedArtRePanel from "../components/Ads/TrackedArtRePanel";
//import Comments from "../components/Comments";

const PODCAST_TAG = 180;

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
            {/*<Comments />*/}
            <SectionTitle title="Ďalšie správy" />
            <Divider height="10px" />
            <ArticlesPanel
              isLoading={isLoading}
              posts={postsData.slice(5, 11)}
            />
            <Divider height="10px" />
            <ButtonWB
              hrefProp="/archiv"
              asProp="/archiv"
              title="Pozrieť všetky"
            />
            {onClient() && isScreenMobile ? (
              <>
                <Divider height="20px" />
                <RelatedArticles
                  title="Najnovšie podcasty"
                  tagID={PODCAST_TAG}
                />
              </>
            ) : (
              <>
                <Divider height="10px" />
                <div>
                  <TrackedArtRePanel
                    GASpercentage={65}
                    report={true}
                    changeable={true}
                  />
                </div>
                <RelatedArticles
                  title="Najnovšie podcasty"
                  tagID={PODCAST_TAG}
                />
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
            <Product position={PRODUCT_POSITIONS.SIDEBAR} />
            <Divider height="30px" />
            <PopularArticles />
            <QuickNews />
            <Divider height="20px" />
            {/*<TrackedSidePanel />*/}
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    /*fontawesomeSubset(
      {
        solid: [
          "circle-notch",
          "chevron-up",
          "chevron-down",
          "spin",
          "fa-spin",
          "paperclip",
          "play-circle",
          "circle",
          "comment-slash",
          "burn",
          "external-link-alt",
          "euro-sign",
          "heart",
          "flag"
        ],
        regular: ["comments", "comment", "heart", "flag"],
      },
      "public/fonts/FontAwesome"
    );*/
    store.dispatch(fetchNewArticles());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Home;
