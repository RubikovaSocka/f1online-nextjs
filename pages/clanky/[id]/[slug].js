import { Fragment, useEffect } from "react";
import axios from "axios";
import EmbedContainer from "react-oembed-container";
import ReactGA from "react-ga";
import Head from "next/head";
import formatDate from "../../../utils/dateFormatter.js";

import QuickNews from "../../../components/QuickNews/QuickNews";
import RPanel from "../../../components/RPanel";
import CalResWidget from "../../../components/CalResWidget/CalResWidget";
import styles from "./Post.module.scss";
import SideRePanel from "../../../components/Ads/SideRePanel/SideRePanel.js";
import Divider from "../../../components/Divider.js";
import getImagePreview from "../../../utils/getImagePreview";

export default function Post({ postData }) {
  let post = (
    <>
      <div className={styles.title}>
        <h1>{postData.title.rendered}</h1>
      </div>
      <div className={styles.imageContainer}>
        {getImagePreview({
          imgData: postData.better_featured_image,
          imgSize: "medium_large"
        })}
        <span>
          zdroj:{" "}
          {postData.better_featured_image
            ? postData.better_featured_image.caption
            : "F1online.sk"}
        </span>
      </div>
      <div className={styles.authorContainer}>
        <span>{postData._embedded.author[0].name}</span>
        <br />
        <span>{formatDate(postData.date)}</span>
      </div>
      <EmbedContainer markup={postData.content.rendered}>
        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
        />
      </EmbedContainer>
    </>
  );

  const regex = /(<([^>]+)>)/gi;

  return (
    <>
      <Head>
        <title key="meta_title">{postData.title.rendered} | F1online.sk</title>
        <meta key="meta_type" property="og:type" content="article" />
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`${postData.title.rendered} | F1online.sk`}
        />
        <meta
          key="meta_description"
          property="og:description"
          content={`${postData.excerpt.rendered.replace(regex, "")}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
        />
        <meta
          key="meta_image"
          property="og:image"
          content={
            postData.better_featured_image
              ? `${postData.better_featured_image.source_url}`
              : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
          }
        />
      </Head>
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">{post}</div>
          <aside className="sideBar">
            <QuickNews />
            <Divider height="15px" />
            {/*<SideRePanel />
            <Divider height="15px" />*/}
            <CalResWidget />
          </aside>
        </div>
      </main>
    </>
  );
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
