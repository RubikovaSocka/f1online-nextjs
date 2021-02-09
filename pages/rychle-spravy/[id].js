import React, { Component, Fragment } from "react";
import { wrapper } from "../../redux/store/store";
import Link from "next/link";
import styled from "styled-components";
import CalResWidget from "../../components/CalResWidget/CalResWidget";
import formatDate from "../../utils/dateFormatter";
import LoadingSpinner from "../../components/LoadingSpinner";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Divider from "../../components/Divider";
import PopularArticles from "../../components/PopularArticles/PopularArticles";

import EmbedContainer from "react-oembed-container";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../components/PageLayout";
import { URLS } from "../../redux/apis/urls";
import { PAGE_MAIN_TITLE } from "../../constants";
import onMobile from "../../utils/onMobile";
import onClient from "../../utils/onClient";
import TrackedBasicPanel from "../../components/Ads/TrackedBasicPanel";
import { POSITION } from "../../components/Ads/positions";
import QuickNewsMeta from "../../components/Meta/QuickNewsMeta";
import EmbedExorcist from "../../components/EmbedExorcist";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > div {
    width: 100%;
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
    &:first-of-type {
      margin-bottom: 12px;
      color: ${(props) => props.theme.SUBTITLE_COLOR};
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

function QuickNewsItemDetailPage({ newsItem }) {
  const { date } = newsItem;
  const {
    obsah_rychlej_spravy,
    image,
    embed_zo_socialnych_sieti,
  } = newsItem.acf;
  return (
    <>
      <QuickNewsMeta {...newsItem.acf} date={newsItem.date} id={newsItem.id} />
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <MessageText
              dangerouslySetInnerHTML={{
                __html: `<p>${formatDate(date)}</p>${obsah_rychlej_spravy}`,
              }}
            />
            {embed_zo_socialnych_sieti ? (
              <EmbedContainer markup={embed_zo_socialnych_sieti}>
                <ExorcistContainer
                  dangerouslySetInnerHTML={{
                    __html: embed_zo_socialnych_sieti,
                  }}
                />
              </EmbedContainer>
            ) : image ? (
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
              />
            ) : (
              ""
            )}
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <PopularArticles />
            <div>
              {onClient() && onMobile() ? (
                <TrackedBasicPanel position={POSITION.SIDEBAR_ARCHIVE_TOP} />
              ) : null}
            </div>
            <Divider height="25px" />
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params }) => {
    const response = await fetch(
      `${URLS.BASE}${URLS.QUICK_NEWS_ENDPOINT}${params.id}?_fields=id,type,acf,date`
    )
      .then((res) => res.json())
      .then((res) => res);

    return {
      props: {
        newsItem: response,
      },
    };
  }
);

export default QuickNewsItemDetailPage;
