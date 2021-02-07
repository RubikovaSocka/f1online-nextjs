import fetch from "isomorphic-fetch";
import { END } from "redux-saga";
import { wrapper } from "../../../redux/store/store";

import QuickNews from "../../../components/QuickNews";
import CalResWidget from "../../../components/CalResWidget";
import Divider from "../../../components/Divider.js";
import TrackedSidePanel from "../../../components/Ads/TrackedSidePanel.js";
import PostRendered from "../../../components/PostRendered";
import PostMeta from "../../../components/PostRendered/PostMeta.js";
import { URLS } from "../../../redux/apis/urls";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../../components/PageLayout";
import { PAGE_MAIN_TITLE } from "../../../constants";
import onClient from "../../../utils/onClient";
import { POSITION } from "../../../components/Ads/positions";
import TrackedBasicPanel from "../../../components/Ads/TrackedBasicPanel";

import styled from "styled-components";

const BContainer = styled.div`
  margin-bottom: 40px;

  @media only screen and (min-width: 1024px) {
    margin-bottom: 0;
    position: sticky;
    top: 120px;
  }
`;

function Post({ postData }) {
  return (
    <>
      <PostMeta {...postData} />
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL id="cn">
            <PostRendered
              key={postData.id} //Why? To prevent component reuse from previous render
              {...postData}
            />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <QuickNews />
            <Divider height="15px" />
            <CalResWidget />
            <BContainer>
              {onClient() ? (
                <TrackedBasicPanel position={POSITION.SIDEBAR_ARTICLE} />
              ) : null}
            </BContainer>
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    store.dispatch(END);

    const response = await fetch(
      `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?_embed=wp:featuredmedia,author&_fields=id,type,date,excerpt,slug,title,content,tags,acf`
    )
      .then((res) => res.json())
      .then((res) => res);

    fetch(
      "https://wpadmin.f1online.sk/wp-json/wordpress-popular-posts/v1/popular-posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wpp_id: params.id }),
      }
    );
    await store.sagaTask.toPromise();

    return {
      props: {
        postData: response,
      },
    };
  }
);

export default Post;
