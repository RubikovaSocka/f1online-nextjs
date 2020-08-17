import { useState, useEffect, Component } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

import TitleArea from "../components/TitleArea/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher.js";
import CalendarLarge from "../components/CalendarLarge/CalendarLarge.js";
import SideSectionTitle from "../components/SideSectionTitle/SideSectionTitle.js";
import ResultsLargeWrapper from "../components/ResultsLarge/ResultsLargeWrapper.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import SideRePanel from "../components/Ads/SideRePanel/SideRePanel.js";
import Divider from "../components/Divider.js";
import Media from "react-media";

import styles from "../styles/main.module.scss";
import TrackedSidePanel from "../components/Ads/TrackedSidePanel";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1280
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  render() {
    let titleSection, articlesSection;
    const { postsData } = this.props;

    if (this.state.width < 1024) {
      titleSection = <TitleArea posts={postsData.slice(0, 3)} />;
      articlesSection = <ArticlesPanel posts={postsData.slice(3, 9)} />;
    } else {
      titleSection = <TitleArea posts={postsData.slice(0, 5)} />;
      articlesSection = <ArticlesPanel posts={postsData.slice(5, 11)} />;
    }

    let otherArticlesSection = (
      <>
        <SectionTitle title="Ďalšie správy" />
        <Divider height="10px" />
        <div className="basicButtonContainer">
          {articlesSection}
          {
            <ButtonWB
              hrefProp="/archiv"
              asProp="/archiv"
              title="Pozrieť všetky"
            />
          }
        </div>
      </>
    );

    let largeWidgets = (
      <>
        <Media query={{ maxWidth: 1023 }}>
          {matches =>
            matches ? (
              ""
            ) : (
              <>
                <Divider height="30px" />
                <SectionTitle title="Boxová tabuľa" />
                <Divider height="15px" />
                <CalendarLarge />
                <ResultsLargeWrapper />
              </>
            )
          }
        </Media>
      </>
    );

    return (
      <>
        <Head>
          <meta
            name="description"
            content="Najnovšie správy zo sveta Formuly 1. Piloti, tímy, okruhy, výsledky, štatistiky..."
          />
        </Head>
        <main className="contentsPage">
          {titleSection}
          <Divider height="25px" />
          <div className="page">
            <div className="mainContent">
              {otherArticlesSection}
              {largeWidgets}
            </div>
            <aside className={`sideBar`}>
              {/*${styles.stickyWidget}*/}
              <Divider height="15px" />
              {/*<TrackedSidePanel />
              <Divider height="25px" />*/}
              {
              <div
                style={{
                  width: "100%"
                }}
              >
                <Media query={{ minWidth: 350 }}>
                  {matches =>
                    matches ? (
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ff1online.sk%2F&tabs=timeline&width=320&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=313229599518550"
                        width="320"
                        height="500"
                        style={{
                          border: "none",
                          overflow: "hidden",
                          margin: "auto",
                          display: "block"
                        }}
                        scrolling="no"
                        frameborder="0"
                        allowTransparency="true"
                        allow="encrypted-media"
                      ></iframe>
                    ) : (
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ff1online.sk%2F&tabs=timeline&width=280&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=313229599518550"
                        width="290"
                        height="500"
                        style={{
                          border: "none",
                          overflow: "hidden",
                          margin: "auto",
                          display: "block"
                        }}
                        scrolling="no"
                        frameborder="0"
                        allowTransparency="true"
                        allow="encrypted-media"
                      ></iframe>
                    )
                  }
                </Media>
                </div>}

              <Divider height="15px" />
              <QuickNews />
            </aside>

            <Media query={{ maxWidth: 1023 }}>
              {matches =>
                matches ? (
                  <div className="mainContent">
                    <CalResWidget />
                    <Divider height="110px" />
                  </div>
                ) : (
                  ""
                )
              }
            </Media>
          </div>
        </main>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const responseSticky = await axios({
    method: "get",
    url:
      "https://wpadmin.f1online.sk/wp-json/wp/v2/posts?sticky=true&per_page=3"
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  const responseNonSticky = await axios({
    method: "get",
    url:
      "https://wpadmin.f1online.sk/wp-json/wp/v2/posts?sticky=false&per_page=11"
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });

  return {
    props: {
      postsData: responseSticky.data.concat(responseNonSticky.data)
    }
  };
}
