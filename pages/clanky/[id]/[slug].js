import { Component } from "react";
import axios from "axios";

import QuickNews from "../../../components/QuickNews/QuickNews";
import CalResWidget from "../../../components/CalResWidget/CalResWidget";
import Divider from "../../../components/Divider.js";
import TrackedSidePanel from "../../../components/Ads/TrackedSidePanel.js";
import PostRendered from "../../../components/PostRendered/PostRendered.js";
import PostMeta from "../../../components/PostRendered/PostMeta.js";

export default class Post extends Component {
  render() {
    const { postData } = this.props;
    return (
      <>
        <PostMeta postData={postData} />
        <main className="contentsPage">
          <div className="page">
            <div id="cn" className="mainContent">
              {/*

                SSR vs. CSR ?

                typeof window !== "undefined" ? (
                <PostRendered postData={postData} />
              ) : (
                ""
              )*/}
              <PostRendered postData={postData} />
            </div>
            <aside className="sideBar">
              <QuickNews />
              <Divider height="15px" />
              <CalResWidget />

              {/*<div className={`${styles.stickyWidget}`}>*/}
              {/*<SideRePanel />*/}
              <TrackedSidePanel />
              {/*</div>*/}
            </aside>
          </div>
        </main>
      </>
    );
  }
}

export async function getServerSideProps({ params }) {
  const response = await axios({
    method: "get",
    url: `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/${params.id}?_embed`
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  axios.get(
    `https://wpadmin.f1online.sk/wp-content/plugins/counter/count.php?id=${params.id}`
  );

  return {
    props: {
      postData: response.data
    }
  };
}
