import React from "react";
import Head from "next/head";
import decodeHtml from "../../utils/decodeHtml";
import { PAGE_MAIN_TITLE } from "../../constants";
import { URLS } from "../../redux/apis/urls";

export default function QuickNewsMeta({ newsItem }) {
  const regex = /(<([^>]+)>)/gi;
  const obsah =
    newsItem && newsItem.id
      ? decodeHtml(newsItem.acf.obsah_rychlej_spravy)
          .replace(regex, "")
          .replace("\n", " ")
      : null;

  const title_final = `${
    newsItem && newsItem.acf.title
      ? `${
          newsItem.acf.title
            ? newsItem.acf.title
            : obsah.length < 60
            ? obsah
            : obsah.substr(0, 60) + "\u2026"
        }`
      : `Rýchle správy zo sveta Formuly 1`
  } | ${PAGE_MAIN_TITLE}`;
  const metaUrl =
    newsItem && newsItem.id
      ? `${URLS.FRONTEND_BASE}rychle-spravy/${newsItem.id}`
      : `${URLS.FRONTEND_BASE}rychle-spravy`;
  const metaImage =
    newsItem && newsItem.id
      ? `${URLS.FRONTEND_API_BASE}?id=${newsItem.id}`
      : "https://wpadmin.f1online.sk/wp-content/uploads/rychle-spravy-img.jpeg";
  const date =
    newsItem && newsItem.date ? newsItem.date : `2020-05-13T09:15:00`;
  return (
    <Head>
      <title key="meta_title">{title_final}</title>
      <meta key="meta_ogtitle" property="og:title" content={title_final} />
      <meta key="meta_url" property="og:url" content={metaUrl} />
      <meta key="meta_oglocale" property="og:locale" content="sk_SK" />
      <meta name="robots" content="index, follow" />
      <meta
        key="meta_publishtime"
        property="article:published_time"
        content={date}
      />
      <meta name="description" content={obsah} />
      <meta key="meta_type" property="og:type" content="article" />
      <meta key="meta_ogtitle" property="og:title" content={title_final} />
      <meta key="meta_description" property="og:description" content={obsah} />
      <meta key="meta_image" property="og:image" content={metaImage} />
      <meta key="meta_image_height" property="og:image:height" content="520" />
      <meta key="meta_image_width" property="og:image:width" content="1000" />
    </Head>
  );
}
