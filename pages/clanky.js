import React from "react";
import Head from "next/head";
import { END } from "redux-saga";

import { useSelector } from "react-redux";
import { wrapper } from "../redux/store/store";

import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import Divider from "../components/Divider.js";
import { fetchNewQuickNews } from "../redux/actions/quickNewsActions";
import { fetchArchiveArticles } from "../redux/actions/archiveActions";
import ArchiveArticlesRenderer from "../components/ArchivArticles/ArchiveArticlesRenderer";

function Clanky() {
  const { pageNumber } = useSelector(
    ({ archiveArticles }) => archiveArticles.client
  );
  const { totalArticlesCount } = useSelector(
    ({ archiveArticles }) => archiveArticles.server
  );
  const { articles, isLoading } = useSelector(
    ({ archiveArticles }) => {
      return pageNumber === 1 ? archiveArticles.server : archiveArticles.client;
    }
  );

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
            <SectionTitle title="Všetky správy" />
            <ArchiveArticlesRenderer
              articles={articles}
              totalPosts={totalArticlesCount}
              isLoading={isLoading}
              showPagination={true}
              currentPage={pageNumber}
              perPage={12}
            />
          </div>
          <aside className="sideBar">
            <Divider height="50px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </aside>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(
    fetchArchiveArticles({ pageNumber: 1, perPage: 12, isServer: true })
  );
  store.dispatch(fetchNewQuickNews());
  store.dispatch(END);

  await store.sagaTask.toPromise();
});

export default Clanky;
