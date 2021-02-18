import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { wrapper } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import QuickNews from "../../components/QuickNews/QuickNews.js";
import CalResWidget from "../../components/CalResWidget";
import Divider from "../../components/Divider.js";
import PopularBox from "../../components/PopularBox";
import ArchiveArticlesRenderer from "../../components/ArchivArticles/ArchiveArticlesRenderer.js";
import fetchArchiveArticlesApi from "../../redux/apis/fetchArchiveArticlesApi";
import getTagIdFromTagSlug from "../../redux/apis/getTagIdFromTagSlug";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../../constants";

import onMobile from "../../utils/onMobile";
import onClient from "../../utils/onClient";
import { POSITION } from "../../components/Ads/positions";
import TrackedPanel, { TYPES } from "../../components/Ads/TrackedPanel";
import BContainer from "../../components/BContainer";
import { fetchNewAuthorArticles } from "../../redux/actions/authorArchiveActions";

const PER_PAGE = 12;

export default function Archiv() {
  const state = useSelector((state) => state.authorArticles);
  const {
    articles,
    author,
    error,
    isLoading,
    pageNumber,
    totalArticlesCount,
  } = state;

  const onPageClicked = (pageNumber) => {
    window.scrollTo(0, 0);

    Router.push({
      pathname: `/autor/${author.fslug}`,
      query: {
        strana: pageNumber,
      },
    });
  };
  if (isLoading) return <span>LOADING</span>;
  if (error) {
    return (
      <div key={pageNumber}>
        <Head>
          <title key="meta_title">{`Správy
           | ${PAGE_MAIN_TITLE}`}</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`Archív správ | ${PAGE_MAIN_TITLE}`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/archiv`}
          />
        </Head>

        <MAIN>
          <COLUMNED_PAGE>
            <PAGE_MAIN_COL>
              <SectionTitle topLevel={true} title="Archív správ" />
              <Divider height="20px" />
              <span>{error}</span>
              <Link href="/">
                <a>Späť na domovskú stránku</a>
              </Link>
              <Divider height="20px" />
            </PAGE_MAIN_COL>
            <SIDEBAR>
              <BContainer>
                {onClient && onMobile() ? (
                  <TrackedPanel
                    type={TYPES.BASIC}
                    key={50522}
                    position={POSITION.SIDEBAR_ARCHIVE_TOP}
                  />
                ) : null}
              </BContainer>
              <Divider height="15px" />
              <PopularBox />
              <Divider height="25px" />
              <QuickNews />
              {/*<RPanel />*/}
              <CalResWidget />
            </SIDEBAR>
          </COLUMNED_PAGE>
        </MAIN>
      </div>
    );
  }

  return (
    <div key={pageNumber}>
      <Head>
        <title key="meta_title">{`Články autora: ${author.name}
             | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`Archív správ | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/archiv`}
        />
      </Head>

      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle
              topLevel={true}
              title={`Články autora: ${author.name}`}
            />
            <ArchiveArticlesRenderer
              key={pageNumber}
              articles={articles}
              totalPosts={totalArticlesCount}
              isLoading={false}
              showPagination={true}
              currentPage={pageNumber}
              perPage={PER_PAGE}
              pageClickCallback={(pageNumber) => onPageClicked(pageNumber)}
              getPaginateHref={(pageNumber) =>
                `/archiv/autor/${author.fslug}?strana=${pageNumber}`
              }
            />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <BContainer>
              {onClient && onMobile() ? (
                <TrackedPanel
                  type={TYPES.BASIC}
                  key={50522}
                  position={POSITION.SIDEBAR_ARCHIVE_TOP}
                />
              ) : null}
            </BContainer>
            <Divider height="15px" />
            <PopularBox />
            <Divider height="25px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </div>
  );
}
/*
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    store.dispatch(
      fetchArchiveArticles({
        pageNumber: 1,
        perPage: 12,
        searchPhrase: query.hladat,
        isServer: true,
      })
    );
    //store.dispatch(fetchNewQuickNews());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  }
);*/

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    store.dispatch(
      fetchNewAuthorArticles({
        authorSlug: query.autor,
        pageNumber: query.strana ? query.strana : 1,
        perPage: 12,
      })
    );
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);
