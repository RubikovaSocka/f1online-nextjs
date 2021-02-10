import { useEffect } from "react";
import Router from "next/router";
import { wrapper } from "../redux/store/store";
import CalResWidget from "../components/CalResWidget/CalResWidget";
import formatDate from "../utils/dateFormatter";
import LoadingSpinner from "../components/LoadingSpinner";
import Image from "next/image";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import Divider from "../components/Divider";
import PopularArticles from "../components/PopularArticles/PopularArticles";
import ReactPaginate from "react-paginate";
import EmbedContainer from "react-oembed-container";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../constants";
import { URLS } from "../redux/apis/urls";
import onMobile from "../utils/onMobile";
import onClient from "../utils/onClient";
import TrackedBasicPanel from "../components/Ads/TrackedBasicPanel";
import { POSITION } from "../components/Ads/positions";
import QuickNewsMeta from "../components/Meta/QuickNewsMeta";
import EmbedExorcist from "../components/EmbedExorcist";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > div {
    width: 100%;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  > div  {
    margin-left: 8px;
    margin-bottom: 15px;
  }
  ${(props) =>
    props.noBorder
      ? ""
      : `border-top: 1px solid ${props.theme.SUBTITLE_COLOR};`}

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > div  {
      margin-left: 0;
      margin-bottom: 0;
    }
  }
`;
const Date = styled.p`
  padding: 0 8px;
  font-family: "HK Grotesk";
  font-size: 14px;
  margin-bottom: 5px;
  margin-right: 10px;
  color: ${(props) => props.theme.SUBTITLE_COLOR};

  &::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 6px;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    color: #e10600;
    content: "\f017";
  }

  @media only screen and (min-width: 1024px) {
    margin-bottom: 12px;
  }
`;
const MessageText = styled.div`
  padding: 0 8px;
  font-family: "HK Grotesk";
  font-size: 14px;
  z-index: 0;
  width: calc(100% - 16px);
  color: ${(props) => props.theme.TEXT_COLOR_MILD};
  p {
    margin: 5px 0;

    &:last-of-type {
      margin-bottom: 20px;
    }
  }
`;

const ExorcistContainer = styled(EmbedExorcist)`
  //margin-top: 10px;
  width: 100%;
  @media only screen and (min-width: 1024px) {
    width: calc(100% - 20px);
  }
`;

const Paginate = styled.div`
  padding-left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ul {
    max-width: 100%;
    padding: 0;
    overflow-x: auto;
    white-space: nowrap;
    height: 55px;
  }
  li {
    display: inline-block;
    padding-left: 0;
    list-style: none;
    font-family: "HK Grotesk";
    cursor: pointer;
    a,
    span {
      position: relative;
      float: left;
      padding: 6px 12px;
      line-height: 20px;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;

      color: ${(props) => props.theme.TEXT_COLOR};
      background-color: ${(props) => props.theme.PAGE_BACK_COLOR};
      border: 1px solid ${(props) => props.theme.TABLE_PRIMARY_COLOR};

      margin-left: 2px;
      margin-right: 2px;
    }
    &.active a,
    a:hover {
      color: white;
      background-color: ${(props) => props.theme.TABLE_PRIMARY_COLOR};
    }
  }
`;

const BContainer = styled.div`
  margin-bottom: 40px;

  @media only screen and (min-width: 1024px) {
    margin-bottom: 0;
    position: sticky;
    top: 120px;
  }
`;
const Cc = styled.div`
  .embed {
    width: 100%;
    margin: 10px 0;
    iframe {
      width: calc(100% - 42px) !important;
      min-width: 0 !important;
    }
    > div > div {
      margin: auto;
    }

    .isStreamable {
      margin: auto;
      position: relative !important;
      padding-bottom: 56.25% !important;
      height: 0 !important;
      > iframe {
        position: absolute !important;
        //position: relative !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
    }

    .wp-block-embed-youtube div {
      position: relative !important;
      padding-bottom: 56.25% !important;
      height: 0 !important;
    }
    .wp-block-embed-youtube div iframe {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

function NewsItemRendered({ newsItem, noBorder }) {
  return (
    <>
      <Header noBorder={noBorder}>
        <Date>{formatDate(newsItem.date)}</Date>
        <div>
          <iframe
            src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(
              `https://f1online.sk/rychle-spravy/${newsItem.id}`
            )}&width=128&layout=button_count&action=like&size=small&share=true&height=46&appId=2583504588587008`}
            width="183"
            height="25"
            style={{ border: "none", overflow: "hidden", paddingTop: "4px" }}
            scrolling="no"
            frameBorder="0"
            allow="encrypted-media"
          />
        </div>
      </Header>
      <MessageText
        dangerouslySetInnerHTML={{
          __html: newsItem.acf.obsah_rychlej_spravy,
        }}
      />
      {newsItem.acf.embed_zo_socialnych_sieti ? (
        <Cc>
          <EmbedContainer
            markup={newsItem.acf.embed_zo_socialnych_sieti}
            className="embed"
          >
            <div
              className={
                newsItem.acf.embed_zo_socialnych_sieti.includes(
                  "//streamable.com"
                ) || newsItem.acf.embed_zo_socialnych_sieti.includes("youtu")
                  ? "isStreamable"
                  : ""
              }
              dangerouslySetInnerHTML={{
                __html: newsItem.acf.embed_zo_socialnych_sieti,
              }}
            />
          </EmbedContainer>
        </Cc>
      ) : newsItem.acf.image ? (
        <Image
          src={newsItem.acf.image.url}
          width={newsItem.acf.image.width}
          height={newsItem.acf.image.height}
        />
      ) : null}
      <Divider height="10px" />
    </>
  );
}

export default function QuickNewsPage({ newsItem, news, query }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <>
      <QuickNewsMeta newsItem={newsItem} />
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <SectionTitle topLevel={true} title="Rýchle správy" />
            <Divider height="20px" />
            <div>
              {newsItem ? (
                <>
                  <NewsItemRendered noBorder={true} newsItem={newsItem} />
                  <div>
                    {onClient() ? (
                      <TrackedBasicPanel
                        position={POSITION.CONTENT_QUICKNEWS_PAGE_TOP}
                      />
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
            <div>
              {newsItem ? (
                <>
                  <Divider height="20px" />
                  <SectionTitle title="Ďalšie rýchle správy" />
                  <Divider height="20px" />
                </>
              ) : null}
              {news.items
                .slice(0, 5)
                .map((item, index) =>
                  !newsItem || (newsItem && item.id != newsItem.id) ? (
                    <NewsItemRendered
                      noBorder={index === 0 || (index === 1 && newsItem)}
                      key={index}
                      newsItem={item}
                    />
                  ) : null
                )}
              <div>
                {onClient() ? (
                  <>
                    <TrackedBasicPanel
                      position={POSITION.CONTENT_QUICKNEWS_PAGE}
                    />
                    <Divider height="30px" />
                  </>
                ) : null}
              </div>
              {news.items
                .slice(5)
                .map((item, index) =>
                  !newsItem || (newsItem && item.id != newsItem.id) ? (
                    <NewsItemRendered key={index} newsItem={item} />
                  ) : null
                )}
            </div>
            <Paginate>
              <ReactPaginate
                forcePage={query.page && query.page >= 1 ? query.page - 1 : 0}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"…"}
                breakClassName={"break-me"}
                pageCount={Math.ceil(news.total / 10)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                //selected \in {0, 1, 2,...}, therefore pageNumber is selected + 1
                onPageChange={({ selected }) =>
                  Router.push(`/rychle-spravy?page=${selected + 1}`)
                }
                hrefBuilder={(pageNumber) => `rychle-spravy?page=${pageNumber}`}
                activeClassName="active"
                previousClassName={"enabled"}
              />
            </Paginate>
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <div>
              {onClient() && onMobile() ? (
                <TrackedBasicPanel position={POSITION.SIDEBAR_QUICKNEWS_PAGE} />
              ) : null}
            </div>
            <PopularArticles />
            <Divider height="25px" />
            <CalResWidget />
            <BContainer>
              {onClient() && !onMobile() ? (
                <TrackedBasicPanel position={POSITION.SIDEBAR_QUICKNEWS_PAGE} />
              ) : null}
            </BContainer>
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }) => {
    const pageNumber = query.page && query.page >= 1 ? query.page : 1;
    const perPage = 11;
    const news = await fetch(
      `${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}?page=${pageNumber}&per_page=10&_fields=id,type,acf,date`
    )
      .then((res) =>
        res.json().then((json) => ({
          headers: res.headers,
          json,
        }))
      )
      .then(({ headers, json }) => ({
        items: json,
        total: headers.get("x-wp-total"),
      }));

    let selectedItem = null;
    if (query.id) {
      selectedItem = await fetch(
        `${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}${query.id}?_fields=id,type,acf,date`
      )
        .then((res) => res.json())
        .then((res) => res);
    }
    return {
      props: {
        newsItem: selectedItem,
        news: news,
        query: query,
      },
    };
  }
);
