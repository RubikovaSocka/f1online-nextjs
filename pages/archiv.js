import Head from "next/head";
import Router from "next/router";
import { wrapper } from "../redux/store/store";

import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget";
import Divider from "../components/Divider.js";
import PopularBox from "../components/PopularBox";
import ArchiveArticlesRenderer from "../components/ArchivArticles/ArchiveArticlesRenderer.js";
import fetchArchiveArticlesApi from "../redux/apis/fetchArchiveArticlesApi";
import getTagIdFromTagSlug from "../redux/apis/getTagIdFromTagSlug";

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
import BContainer from "../components/BContainer";

const PER_PAGE = 12;

export default function Archiv({ query, news, error }) {
  const pageNumber = query.strana;
  const onPageClicked = (pageNumber) => {
    window.scrollTo(0, 0);
    if (query.kategoria) {
      Router.push({
        pathname: `/archiv/kategoria/${query.kategoria}`,
        query: {
          strana: pageNumber,
        },
      });
    } else if (query.hladat) {
      Router.push({
        pathname: "/archiv/vyhladavanie",
        query: {
          hladat: query.hladat,
          strana: pageNumber,
        },
      });
    } else {
      Router.push({
        pathname: "/archiv",
        query: {
          strana: pageNumber,
        },
      });
    }
  };

  return (
    <div key={pageNumber}>
      <Head>
        <title key="meta_title">{`${
          query.hladat ? `Vyhľadávanie: \"${query.hladat}\"` : "Správy"
        } | ${PAGE_MAIN_TITLE}`}</title>
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
              title={`${
                query.hladat
                  ? `Vyhľadávanie: \"${query.hladat}\"`
                  : "Archív správ"
              }`}
            />
            <ArchiveArticlesRenderer
              key={pageNumber}
              articles={news.articles}
              totalPosts={news.totalArticlesCount}
              isLoading={false}
              showPagination={true}
              currentPage={pageNumber}
              perPage={PER_PAGE}
              pageClickCallback={(pageNumber) => onPageClicked(pageNumber)}
              getPaginateHref={(pageNumber) => {
                if (query.kategoria) {
                  return `/archiv/kategoria/${query.kategoria}?strana=${pageNumber}`;
                } else if (query.hladat) {
                  return `/archiv?hladat=${query.hladat}&strana=${pageNumber}`;
                } else {
                  return `/archiv?strana=${pageNumber}`;
                }
              }}
            />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <BContainer>
              {onClient && onMobile() ? (
                <TrackedBasicPanel
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
  async ({ query }) => {
    const pageNumber = query.strana && query.strana >= 1 ? query.strana : 1;
    let news = null,
      error = null,
      tagID = null;
    if (query.kategoria) {
      try {
        tagID = await getTagIdFromTagSlug(query.kategoria);
        news = await fetchArchiveArticlesApi({
          perPage: PER_PAGE,
          pageNumber: pageNumber,
          tagID: tagID,
        });
      } catch (error) {
        error = "Nepodarilo sa načítať správy.";
      }
    } else if (query.hladat) {
      try {
        news = await fetchArchiveArticlesApi({
          perPage: PER_PAGE,
          pageNumber: pageNumber,
          searchPhrase: query.hladat,
        });
      } catch (error) {
        error = "Nepodarilo sa načítať správy.";
      }
    } else {
      try {
        news = await fetchArchiveArticlesApi({
          perPage: PER_PAGE,
          pageNumber: pageNumber,
        });
      } catch (error) {
        error = "Nepodarilo sa načítať správy.";
      }
    }

    return {
      props: {
        news: news,
        error: error,
        query: {
          strana: pageNumber,
          kategoria: query.kategoria ? query.kategoria : null,
          hladat: query.hladat ? query.hladat : null,
          tagID: tagID,
        },
      },
    };
  }
);
