import React from "react";
import axios from "axios";

import QuickNews from "../../../components/QuickNews";
import CalResWidget from "../../../components/CalResWidget";
import Divider from "../../../components/Divider.js";
import TrackedSidePanel from "../../../components/Ads/TrackedSidePanel.js";
import PostRendered from "../../../components/PostRendered/PostRendered.js";
import PostMeta from "../../../components/PostRendered/PostMeta.js";
import { URLS } from "../../../redux/apis/urls";

export default function Post({ postData }) {
  return (
    <>
      <PostMeta {...postData} />
      <main className="contentsPage">
        <div className="page">
          <div id="cn" className="mainContent">
            <PostRendered key={postData.id} {...postData} />
          </div>
          <aside className="sideBar">
            <QuickNews />
            <Divider height="15px" />
            <CalResWidget />
            <TrackedSidePanel />
          </aside>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const response = await axios({
    method: "get",
    url: `${URLS.BASE}${URLS.ARTICLES_ENDPOINT}${params.id}?_embed`
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  axios.get(
    `${URLS.BASE}wp-content/plugins/counter/count.php?id=${params.id}`
  );

  return {
    props: {
      postData: response.data
    }
  };
}
