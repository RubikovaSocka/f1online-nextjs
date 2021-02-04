import React, { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import { END } from "redux-saga";
import { wrapper } from "../../redux/store/store";
import Link from "next/link";
//import ImageGallery from "../../components/react-image-gallery/src/ImageGallery";
import Head from "next/head";

import QuickNews from "../../components/QuickNews/QuickNews.js";
import CalResWidget from "../../components/CalResWidget/CalResWidget.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import Divider from "../../components/Divider.js";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./TeamPage.module.scss";
import ArchivArticles from "../../components/ArchivArticles/ArchivArticles.js";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../components/PageLayout";

import dynamic from "next/dynamic";
const ImageGallery = dynamic(() =>
  import("../../components/react-image-gallery/src/ImageGallery")
);
import { PAGE_MAIN_TITLE } from "../../constants";
import styled from "styled-components";

const Container = styled.div`
  .briefInfoContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .logo {
    width: 100%;
  }

  .tableContainer {
    width: 100%;

    margin-left: 0;
    margin-top: 15px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    font-family: "HK Grotesk";

    .table {
      background-color: ${(props) => props.theme.TABLE_PRIMARY_COLOR};
      padding: 25px;
      color: white;
      box-shadow: ${(props) => props.theme.POPUP_SHADOW};
      position: relative;
      overflow: hidden;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin: 3px 0;

      span {
        width: 55%;
        font-size: 14px;
        z-index: 2;

        &:first-of-type {
          width: 45%;
          font-weight: 700;
        }
      }
    }
  }

  .numberContainer {
    display: none;
  }

  .titleContainer {
    font-family: "Cabin", "Source Sans Pro";
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    .title {
      margin: 0px;
      padding: 5px;
      font-size: 18px;
      color: ${(props) => props.theme.TEXT_COLOR};
    }
  }
  .halfCircle {
    position: absolute;
    left: 45%;
    top: 5%;

    width: 300px;
    height: 300px;
    border-top-left-radius: 300px;
    border-top-right-radius: 300px;
    border-bottom-left-radius: 300px;
    border-bottom-right-radius: 300px;
    border: 45px solid ${(props) => props.theme.TABLE_SECONDARY_COLOR};
    z-index: 1;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .history {
    font-family: "HK Grotesk";
    font-size: 14px;
    line-height: 24px;
    color: ${(props) => props.theme.TEXT_COLOR_MILD};
  }
  .imageData {
    display: flex;
    flex-direction: column;
  }
  .portraitsContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 0 15px;
  }

  .portraitContainer {
    width: 40%;
    margin: 0 5%;
    font-family: "HK Grotesk";
    cursor: pointer;

    span,
    a {
      margin: 0px;
      padding: 0;
      display: block;
      font-size: 14px;
      text-align: center;
      color: ${(props) => props.theme.TEXT_COLOR_MILD};
      font-weight: 600;
    }
  }
  .portrait {
    width: 100%;
    height: auto;
    margin: auto;
  }

  @media only screen and (min-width: 1366px) {
    .logo {
      width: 44%;
      width: 260px;
      height: 130px;
    }
    .tableContainer {
      margin-top: 0;
      margin-left: 6%;
      justify-content: flex-end;
      width: calc(94% - 260px);

      .table {
        background-color: ${(props) => props.theme.TABLE_PRIMARY_COLOR};
        padding: 25px;
        color: white;
        box-shadow: ${(props) => props.theme.POPUP_SHADOW};
        position: relative;
        overflow: hidden;
      }
    }

    .numberContainer {
      width: 100%;
      height: calc(216 / 115 * 100);
      margin-bottom: 20px;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      img {
        width: 100px;
        height: auto;
        justify-self: flex-end;
      }
    }

    .halfCircle {
      position: absolute;
      left: 38%;
      top: 11%;

      width: 380px;
      height: 380px;
      border-top-left-radius: 380px;
      border-top-right-radius: 380px;
      border-bottom-left-radius: 380px;
      border-bottom-right-radius: 380px;
      border: 45px solid ${(props) => props.theme.TABLE_SECONDARY_COLOR};
      z-index: 1;

      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    .portraitContainer {
      width: 28%;
      margin: 0 5%;
      font-family: "HK Grotesk";
      cursor: pointer;

      span,
      a {
        margin: 0px;
        padding: 0;
        display: block;
        font-size: 14px;
        text-align: center;
        color: ${(props) => props.theme.TEXT_COLOR_MILD};
        font-weight: 600;
      }
    }
    .portrait {
      width: 100%;
      height: auto;
      margin: auto;
    }
  }
`;

function TeamPage({ teamData }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://wpadmin.f1online.sk/wp-json/wp/v2/media?search=${teamData.name}&per_page=15`
    )
      .then((res) => res.json())
      .then((res) => {
        let imagesLoaded = res.map((item) => {
          if (Object.keys(item.media_details).length > 0) {
            return {
              original: item.media_details.sizes.large
                ? item.media_details.sizes.large.source_url
                : item.source_url,
              thumbnail: item.media_details.sizes.medium
                ? item.media_details.sizes.medium.source_url
                : item.source_url,
            };
          }
          return null;
        });
        var filtered = imagesLoaded.filter((el) => {
          return el != null;
        });
        setImages(filtered);
      });
  }, []);

  let teamDataBlock = (
    <>
      <SectionTitle title={`${teamData.name}`} />
      <Divider height="20px" />
      <div className="briefInfoContainer">
        <div className="imageData">
          {
            <img
              className="logo"
              alt={`Logo tímu ${teamData.name}`}
              src={`https://wpadmin.f1online.sk/wp-content/uploads/logo-${teamData.slug}.jpg`}
            />
          }
        </div>

        <div className="tableContainer">
          {/*<div className="numberContainer">
                            <img alt={`Číslo ${team.permanentNumber}`} src={`https://wpadmin.f1online.sk/wp-content/uploads/${team.permanentNumber}.jpg`}/> 
                        </div>*/}
          <div
            className="table" /*style={{borderTop: `2px solid ${team.teamColor}`}}*/
          >
            <div className="halfCircle" />
            <div className="row">
              <span>Sídlo</span>
              <span>{`${teamData.base}, ${teamData.country}`}</span>
            </div>
            <div className="row">
              <span>Šéf tímu</span>
              <span>{`${teamData["team-boss"]}`}</span>
            </div>
            <div className="row">
              <span>Technický riaditeľ</span>
              <span>{`${teamData["technical-chief"]}`}</span>
            </div>
            <div className="row">
              <span>Šasi</span>
              <span>{`${teamData.chassis}`}</span>
            </div>
            <div className="row">
              <span>Pohonná jednotka</span>
              <span>{`${teamData.engine}`}</span>
            </div>
            <div className="row">
              <span>Tituly</span>
              <span>{`${teamData.championships}`}</span>
            </div>
            <div className="row">
              <span>Víťazstvá</span>
              <span>{`${teamData.wins}`}</span>
            </div>
          </div>
        </div>
        <div className="portraitsContainer">
          <div className="portraitContainer">
            <Link
              href="/piloti/[id]"
              as={`/piloti/${teamData.Drivers[0].driverId}`}
            >
              <a onClick={() => NProgress.start()}>
                <img
                  alt={`${teamData.Drivers[0].givenName} ${teamData.Drivers[0].familyName} portrét`}
                  src={teamData.Drivers[0].img300}
                  className="portrait"
                ></img>
                <span>{`${teamData.Drivers[0].givenName} ${teamData.Drivers[0].familyName}`}</span>
              </a>
            </Link>
          </div>

          <div className="portraitContainer">
            <Link
              href="/piloti/[id]"
              as={`/piloti/${teamData.Drivers[1].driverId}`}
            >
              <a onClick={() => NProgress.start()}>
                <img
                  alt={`${teamData.Drivers[1].givenName} ${teamData.Drivers[1].familyName} portrét`}
                  src={teamData.Drivers[1].img300}
                  className="portrait"
                ></img>
                <span>{`${teamData.Drivers[1].givenName} ${teamData.Drivers[1].familyName}`}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  let teamPosts = (
    <ArchivArticles tagSlug={teamData.slug} asArchive={false} perpage="6" />
  );

  return (
    <>
      <Head>
        <title key="meta_title">
          {`${teamData.name} | ${PAGE_MAIN_TITLE}`}
        </title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`${teamData.name} | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://wpadmin.f1online.sk/wp-content/uploads/logo-${teamData.slug}.jpg`}
        />
        <meta
          key="meta_image"
          property="og:image"
          content={`${teamData.img800}`}
        />
      </Head>

      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            <Container>
              {teamDataBlock}

              <Divider height="30px" />
              <div className="titleContainer">
                <h2 className="title">Najnovšie články</h2>
              </div>
              {teamPosts}

              <div className="titleContainer">
                <Divider height="15px" />
                <h2 className="title">Najnovšie z media zóny</h2>
                <Divider height="15px" />
                <div style={{ width: "100%" }}>
                  <ImageGallery
                    showPlayButton={false}
                    lazyLoad={true}
                    showFullscreenButton={false}
                    items={images}
                    className="galleryEdit"
                  />
                </div>
              </div>
            </Container>
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="50px" />
            <QuickNews />
            <Divider height="15px" />
            <Divider height="15px" />
            <CalResWidget />
          </SIDEBAR>
        </COLUMNED_PAGE>
      </MAIN>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    store.dispatch(END);

    const responseTeamData = await fetch(
      `https://wpadmin.f1online.sk/wp-content/uploads/${params.id}.json`
    )
      .then((res) => res.json())
      .then((res) => res);

    await store.sagaTask.toPromise();

    return {
      props: {
        teamData: responseTeamData,
      },
    };
  }
);

export default TeamPage;
