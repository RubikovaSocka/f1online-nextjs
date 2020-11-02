import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { fetchTagArchiveArticles } from "../redux/actions/tagArchiveActions";

import RPanel from "../components/RPanel.js";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import Divider from "../components/Divider.js";
import PopularBox from "../components/PopularBox/PopularBox.js";
import ArchiveArticlesRenderer from "../components/ArchivArticles/ArchiveArticlesRenderer.js";

const PER_PAGE = 12;

function Vyhladavanie() {
  const router = useRouter()
  const dispatch = useDispatch();
  const { pageNumber } = useSelector(
    ({ tagArchiveArticles }) => tagArchiveArticles.client
  );
  const { totalArticlesCount } = useSelector(
    ({ tagArchiveArticles }) => tagArchiveArticles.server
  );
  const { articles, isLoading } = useSelector(({ tagArchiveArticles }) => {
    return pageNumber === 1
      ? tagArchiveArticles.server
      : tagArchiveArticles.client;
  });

  const onPageClicked = pageNumber => {
    window.scrollTo(0, 0);
    dispatch(
      fetchTagArchiveArticles({
        pageNumber: pageNumber,
        perPage: PER_PAGE,
        tagSlug: router.query.slug,
        isServer: false
      })
    );
  };

  console.log(router);

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
              perPage={PER_PAGE}
              pageClickCallback={selectedPage => onPageClicked(selectedPage)}
            />
          </div>
          <aside className="sideBar">
            <Divider height="40px" />
            <PopularBox pickedSlug={router.query.slug ? router.query.slug : ""}/>
            <Divider height="25px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </aside>
        </div>
      </main>
    </>
  );
  //}
}

Vyhladavanie.getInitialProps = async ({ store, query }) => {
  store.dispatch(
    fetchTagArchiveArticles({
      pageNumber: 1,
      perPage: PER_PAGE,
      tagSlug: query.slug,
      isServer: true
    })
  );
  store.dispatch(END);

  await store.sagaTask.toPromise();
};

export default Vyhladavanie;
