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
import Live from "../../../components/Live";

import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../../components/PageLayout";

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
            <Live />
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <QuickNews />
            <Divider height="15px" />
            <CalResWidget />
            <TrackedSidePanel />
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
      `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?_embed=wp:featuredmedia,author&_fields=id,date,excerpt,slug,title,content,tags,acf`
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
