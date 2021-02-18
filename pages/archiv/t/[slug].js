import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "../../../redux/store/store";
import { fetchTagArchiveArticles } from "../../../redux/actions/tagArchiveActions";

import SectionTitle from "../../../components/SectionTitle/SectionTitle.js";
import QuickNews from "../../../components/QuickNews/QuickNews.js";
import CalResWidget from "../../../components/CalResWidget/CalResWidget.js";
import Divider from "../../../components/Divider.js";
import PopularBox from "../../../components/PopularBox/PopularBox.js";
import ArchiveArticlesRenderer from "../../../components/ArchivArticles/ArchiveArticlesRenderer.js";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../../../constants";
import onMobile from "../../../utils/onMobile";
import onClient from "../../../utils/onClient";
import TrackedPanel, { TYPES } from "../../../components/Ads/TrackedPanel";
import { POSITION } from "../../../components/Ads/positions";

const PER_PAGE = 12;

function Archiv() {
  const router = useRouter();
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

  const onPageClicked = (pageNumber) => {
    window.scrollTo(0, 0);
    dispatch(
      fetchTagArchiveArticles({
        pageNumber: pageNumber,
        perPage: PER_PAGE,
        tagSlug: router.query.slug,
        isServer: false,
      })
    );
  };

  return (
    <>
      <Head>
        <title key="meta_title">{`Archív | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Archív | ${PAGE_MAIN_TITLE}`}
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
            <SectionTitle title="Všetky správy" />
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
                <TrackedPanel
                  type={TYPES.BASIC}
                  position={POSITION.SIDEBAR_ARCHIVE_TOP}
                />
              ) : null}
            </div>
            <Divider height="40px" />
            <PopularBox
              pickedSlug={router.query.slug ? router.query.slug : ""}
            />
            <Divider height="25px" />
            <QuickNews />
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
  //}
}
/*
Archiv.getInitialProps = async ({ store, query }) => {
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
};*/

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    store.dispatch(
      fetchTagArchiveArticles({
        pageNumber: 1,
        perPage: PER_PAGE,
        tagSlug: query.slug,
        isServer: true,
      })
    );
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);

export default Archiv;
