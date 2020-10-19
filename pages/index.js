import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Media from "react-media";

import TitleArea from "../components/TitleArea";
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel";
import SectionTitle from "../components/SectionTitle/SectionTitle.js";
import QuickNews from "../components/QuickNews/QuickNews.js";
import CalResWidget from "../components/CalResWidget/CalResWidget.js";
import CalendarLarge from "../components/CalendarLarge/CalendarLarge.js";
import ResultsLargeWrapper from "../components/ResultsLarge/ResultsLargeWrapper.js";
import ButtonWB from "../components/ButtonWB/ButtonWB.js";
import Divider from "../components/Divider.js";

import FBPageBox from "../components/FBPageBox";

import { fetchNewArticles } from "../redux/actions/articlesActions";

export default class Home extends Component {
  static async getInitialProps({ isServer, store }) {
    await store.dispatch(fetchNewArticles());
    return {};
  }

  state = {
    width: 1280
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth
    });
  };

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
                  <FBPageBox />
                </div>
              }

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

/*
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
*/