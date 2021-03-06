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
import CalResWidget from "../components/CalResWidget";

import { fetchNewArticles } from "../redux/actions/articlesActions";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";

import onMobile from "../utils/onMobile";
import onClient from "../utils/onClient";
import TrackedPanel, { TYPES } from "../components/Ads/TrackedPanel";
import { POSITION } from "../components/Ads/positions";

//import fontawesomeSubset from "fontawesome-subset";
//import PopularArticles from "../components/PopularArticles";
/*import Product, {
  POSITIONS as PRODUCT_POSITIONS,
} from "../components/Ads/Products";*/
import RelatedArticles from "../components/RelatedArticles";
import BContainer from "../components/BContainer";
//import Comments from "../components/Comments";

const PODCAST_TAG = 180;

function Home() {
  const state = useSelector((state) => state.articles);
  const postsData = state.indexArticles;
  const isLoading = state.isLoading;

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Najnovšie správy zo sveta F1. Piloti, tímy, okruhy, výsledky, štatistiky..."
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
            <Divider height="20px" />
            <div>
              {onClient() ? (
                <>
                  <BContainer>
                    <TrackedPanel
                      type={TYPES.BASIC}
                      position={POSITION.CONTENT_HP}
                    />
                  </BContainer>
                  <Divider height="15px" />
                  <RelatedArticles
                    title="Najnovšie podcasty"
                    tagID={PODCAST_TAG}
                  />
                  <div>
                    {!onMobile() ? (
                      <>
                        <Divider height="30px" />
                        <SectionTitle title="Boxová tabuľa" />
                        <Divider height="15px" />
                        <CalendarLarge />
                        <ResultsLarge />
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="15px" />
            <div>
              {onClient() && !onMobile() ? (
                <>
                  <TrackedPanel
                    type={TYPES.BASIC}
                    position={POSITION.SIDEBAR_HP_TOP}
                    sidebar={true}
                  />
                  <Divider height="30px" />
                </>
              ) : null}
            </div>
            {/* <div>{onClient() && <PopularArticles />}</div> */}
            <div>
              {onClient() && onMobile() ? (
                <>
                  <BContainer>
                    <TrackedPanel
                      type={TYPES.BASIC}
                      position={POSITION.SIDEBAR_HP_TOP}
                      sidebar={true}
                    />
                  </BContainer>
                  <Divider height="20px" />
                </>
              ) : null}
            </div>
            <QuickNews />
            <div>
              {onClient() && onMobile() ? (
                <>
                  <CalResWidget />
                  <BContainer>
                    <TrackedPanel
                      type={TYPES.BASIC}
                      position={POSITION.FOOTER_HP}
                      sidebar={true}
                    />
                  </BContainer>
                  <Divider height="50px" />
                </>
              ) : null}
            </div>

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
          "flag",
          "rss",
          "arrows-alt-h",
        ],
        regular: ["comments", "comment", "heart", "flag", "clock", "copyright"],
        brands: ["facebook-f", "youtube", "twitter", "instagram"],
      },
      "public/fonts/FontAwesome"
    );*/
    store.dispatch(fetchNewArticles());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Home;
