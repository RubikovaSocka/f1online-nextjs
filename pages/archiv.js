import React, { useEffect } from "react";
import Head from "next/head";
import { END } from "redux-saga";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store/store";

import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget";
import Divider from "../components/Divider.js";
import PopularBox from "../components/PopularBox/PopularBox.js";
import ArchiveArticlesRenderer from "../components/ArchivArticles/ArchiveArticlesRenderer.js";
import { fetchArchiveArticles } from "../redux/actions/archiveActions";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";
import { fetchF1Results } from "../redux/actions/f1ResultsActions";
import { fetchProgramme } from "../redux/actions/programmeActions";

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

  useEffect(() => {
    dispatch(fetchF1Results({ perPage: 1 }));
    dispatch(fetchProgramme());
    dispatch(fetchNewQuickNews());
  }, []);

  const onPageClicked = pageNumber => {
    window.scrollTo(0, 0);
    dispatch(
      fetchArchiveArticles({
        pageNumber: pageNumber,
        perPage: PER_PAGE,
        isServer: false,
        searchPhrase: router.query.search
      })
    );
  };

  //console.log(router);

  return (
    <>
      <Head>
        <title key="meta_title">Správy | F1online.sk</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Kalendár | F1online.sk`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/clanky`}
        />
      </Head>
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">
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
              pageClickCallback={selectedPage => onPageClicked(selectedPage)}
            />
          </div>
          <aside className="sideBar">
            <Divider height="40px" />
            <PopularBox />
            <Divider height="25px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </aside>
        </div>
      </main>
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
        isServer: true
      })
    );
    //store.dispatch(fetchNewQuickNews());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Archiv;
