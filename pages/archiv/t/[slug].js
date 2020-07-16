import React, {Component} from "react";
import RPanel from "../../../components/RPanel.js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.js";
import ArchivArticles from "../../../components/ArchivArticles/ArchivArticles.js";
import QuickNews from "../../../components/QuickNews/QuickNews.js";
import CalResWidget from "../../../components/CalResWidget/CalResWidget.js";
import Head from "next/head";

import Divider from "../../../components/Divider.js";
import PopularBox from "../../../components/PopularBox/PopularBox.js";

export default class Archiv extends Component {
  static getInitialProps ({ query: { slug } }) {
    return { tag: slug }
  }

  render() {
    //console.log(`?x=${encodeURIComponent('hovorí Sebastian vettel')}`);
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
              <SectionTitle title="Všetky správy" />
              <ArchivArticles key={this.props.tag} tagSlug={this.props.tag} asArchive={true} perpage="12" />
            </div>
            <aside className="sideBar">
              <Divider height="40px" />
              <PopularBox pickedSlug={this.props.tag ? this.props.tag : ""}/>
              <Divider height="25px" />
              <QuickNews />
              {/*<RPanel />*/}
              <CalResWidget />
            </aside>
          </div>
        </main>
      </>
    );
  }
}
