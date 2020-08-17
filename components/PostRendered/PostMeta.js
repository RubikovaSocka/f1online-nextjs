import React from "react";
import Head from "next/head";
import decodeHtml from "../../utils/decodeHtml";

function PostMeta({ postData }) {
  const regex = /(<([^>]+)>)/gi;
  return (
    <Head>
      <title key="meta_title">
        {decodeHtml(postData.title.rendered)} | F1online.sk
      </title>
      <meta
        name="description"
        content={`${decodeHtml(postData.excerpt.rendered).replace(regex, "")}`}
      />
      <meta key="meta_type" property="og:type" content="article" />
      <meta
        key="meta_ogtitle"
        property="og:title"
        content={`${decodeHtml(postData.title.rendered)} | F1online.sk`}
      />
      <meta
        key="meta_description"
        property="og:description"
        content={`${decodeHtml(postData.excerpt.rendered).replace(regex, "")}`}
      />
      <meta
        key="meta_url"
        property="og:url"
        content={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <meta
        key="meta_image"
        property="og:image"
        content={
          postData.better_featured_image
            ? `${postData.better_featured_image.source_url}`
            : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
        }
      />
      <meta
        key="meta_image_height"
        property="og:image:height"
        content={
          postData.better_featured_image
            ? `${postData.better_featured_image.media_details.height}`
            : "630"
        }
      />
      <meta
        key="meta_image_width"
        property="og:image:width"
        content={
          postData.better_featured_image
            ? `${postData.better_featured_image.media_details.width}`
            : "1200"
        }
      />
    </Head>
  );
}

export default PostMeta;
