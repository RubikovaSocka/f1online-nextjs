import React from "react";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import ArchivArticles from "../components/ArchivArticles/ArchivArticles.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import Head from "next/head";

import Divider from "../components/Divider.js";

export default function Partneri() {
  return (
    <>
      <Head>
        <title key="meta_title">Správy | F1online.sk</title>
        <meta key="meta_ogtitle" property="og:title" content={`Kalendár | F1online.sk`} />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/clanky`}
        />
      </Head>
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">
            <SectionTitle title="Ďakujeme našim partnerom" />
            <ArchivArticles tagSlug="partneri" asArchive={false} perpage="12" />
          </div>
          <aside className="sideBar">
            <Divider height="50px" />
            <QuickNews />
            {/*<RPanel />*/}
            <CalResWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
