import Head from "next/head";
import { END } from "redux-saga";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store/store";

import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget";
import Divider from "../components/Divider.js";
import PopularBox from "../components/PopularBox";
import ArchiveArticlesRenderer from "../components/ArchivArticles/ArchiveArticlesRenderer.js";
import { fetchArchiveArticles } from "../redux/actions/archiveActions";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";

import onMobile from "../utils/onMobile";
import onClient from "../utils/onClient";
import { POSITION } from "../components/Ads/positions";
import TrackedBasicPanel from "../components/Ads/TrackedBasicPanel";

const PER_PAGE = 12;

function Archiv() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageNumber } = useSelector(
    ({ archiveArticles }) => archiveArticles.client
  );
  const { totalArticlesCount } = useSelector(
    ({ archiveArticles }) => archiveArticles.server
  );
  const { articles, isLoading } = useSelector(({ archiveArticles }) => {
    return pageNumber === 1 ? archiveArticles.server : archiveArticles.client;
  });

  const onPageClicked = (pageNumber) => {
    window.scrollTo(0, 0);
    dispatch(
      fetchArchiveArticles({
        pageNumber: pageNumber,
        perPage: PER_PAGE,
        isServer: false,
        searchPhrase: router.query.search,
      })
    );
  };

  return (
    <>
      <Head>
        <title key="meta_title">{`${
          router.query.search
            ? `Vyhľadávanie: \"${router.query.search}\"`
            : "Správy"
        } | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Kalendár | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/clanky`}
        />
      </Head>

      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle
              title={`${
                router.query.search
                  ? `Vyhľadávanie: \"${router.query.search}\"`
                  : "Všetky články"
              }`}
            />
            <ArchiveArticlesRenderer
              articles={articles}
              totalPosts={totalArticlesCount}
              isLoading={isLoading}
              showPagination={true}
              currentPage={pageNumber}
              perPage={PER_PAGE}
              pageClickCallback={(selectedPage) => onPageClicked(selectedPage)}
            />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <div>
              {onClient() && onMobile() ? (
                <TrackedBasicPanel position={POSITION.SIDEBAR_ARCHIVE_TOP} />
              ) : null}
            </div>
            <Divider height="15px" />
            <PopularBox />
            <Divider height="25px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    store.dispatch(
      fetchArchiveArticles({
        pageNumber: 1,
        perPage: 12,
        searchPhrase: query.search,
        isServer: true,
      })
    );
    //store.dispatch(fetchNewQuickNews());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Archiv;
