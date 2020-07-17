import React from "react";
import Head from "next/head";

export default function HeaderMeta() {
  return (
    <Head>
      <title key="meta_title">F1online.sk</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
      />
      <link key="meta_style" rel="stylesheet" href="/light-theme.css" />
      <meta key="meta_ogtitle" property="og:title" content={`F1online.sk`} />
      <meta key="meta_type" property="og:type" content="website" />
      <meta key="meta_url" property="og:url" content={`https://f1online.sk/`} />
      <meta
        key="meta_description"
        property="og:description"
        content={`Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky...`}
      />
      
      <meta
        key="meta_image"
        property="og:image"
        content={`https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png`}
      />{/*
      <script
        data-ad-client="ca-pub-2681240380511410"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>*/}
    </Head>
  );
}
