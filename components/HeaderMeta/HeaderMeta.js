import React from "react";
import { PAGE_MAIN_TITLE } from "../../constants";
import Head from "next/head";

export default function HeaderMeta({ theme }) {
  return (
    <Head>
      <title key="meta_title">
        Všetky novinky zo sveta Formuly 1 | {PAGE_MAIN_TITLE}
      </title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="preload"
        href="/fonts/FontAwesome/fa-solid-900.ttf"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/HKGrotesk/hkgrotesk-regular-webfont.ttf"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/HKGrotesk/hkgrotesk-semibold-webfont.ttf"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/HKGrotesk/hkgrotesk-bold-webfont.ttf"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Cabin/cabin-bold.ttf"
        as="font"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/FontAwesome/fa-solid-900.ttf"
        as="font"
        crossOrigin="anonymous"
      />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />
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
      />
      <script
        data-ad-client="ca-pub-2681240380511410"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
    </Head>
  );
}
