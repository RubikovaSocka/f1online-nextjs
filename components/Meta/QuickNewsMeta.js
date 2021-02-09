import React from "react";
import Head from "next/head";
import decodeHtml from "../../utils/decodeHtml";
import { PAGE_MAIN_TITLE } from "../../constants";

export default function QuickNewsMeta({
  title,
  id,
  date,
  obsah_rychlej_spravy,
}) {
  const regex = /(<([^>]+)>)/gi;
  const obsah = decodeHtml(obsah_rychlej_spravy).replace(regex, "");
  const title_final = `${
    title ? title : obsah.length < 80 ? obsah : obsah.substr(0, 80) + `\u2026`
  } | ${PAGE_MAIN_TITLE}`;
  
  return (
    <Head>
      <title key="meta_title">{title_final}</title>
      <meta key="meta_ogtitle" property="og:title" content={title_final} />
      <meta
        key="meta_url"
        property="og:url"
        content={`https://f1online.sk/rychle-spravy/${id}`}
      />
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
      <meta
        key="meta_url"
        property="og:url"
        content={`https://f1online.sk/rychle-spravy/${id}`}
      />
      <meta
        key="meta_image"
        property="og:image"
        content="https://wpadmin.f1online.sk/wp-content/uploads/rychle-spravy-img.jpeg"
      />
      <meta key="meta_image_height" property="og:image:height" content="625" />
      <meta key="meta_image_width" property="og:image:width" content="1000" />
    </Head>
  );
}
