import React, { useState, useEffect } from "react";
import { END } from "redux-saga";
import { wrapper } from "../../redux/store/store";
import fetch from "isomorphic-fetch";
import QuickNews from "../../components/QuickNews";
import CalResWidget from "../../components/CalResWidget";
import SectionTitle from "../../components/SectionTitle";
import Divider from "../../components/Divider.js";
import Head from "next/head";
import ArchivArticles from "../../components/ArchivArticles";
import {
  MAIN,
  COLUMNED_PAGE,
  PAGE_MAIN_COL,
  SIDEBAR,
} from "../../components/PageLayout";
import styled from "styled-components";
import dynamic from "next/dynamic";
const ImageGallery = dynamic(() =>
  import("../../components/react-image-gallery/src/ImageGallery")
);
import { PAGE_MAIN_TITLE } from "../../constants";
import onClient from "../../utils/onClient";
import onMobile from "../../utils/onMobile";
import BContainer from "../../components/BContainer";
import { POSITION } from "../../components/Ads/positions";
import TrackedPanel, { TYPES } from "../../components/Ads/TrackedPanel";

const Container = styled.div`
  .briefInfoContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .driverPortrait {
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

  .biography {
    font-family: "HK Grotesk";
    font-size: 14px;
    line-height: 24px;
    color: ${(props) => props.theme.TEXT_COLOR_MILD};
  }

  @media only screen and (min-width: 1024px) {
    .driverPortrait {
      width: 240px;
      height: 240px;
    }
    .tableContainer {
      margin-top: 0;
      margin-left: 6%;
      justify-content: flex-end;
      width: calc(94% - 240px);
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
      left: 38%;
      top: 11%;

      width: 380px;
      height: 380px;
      border-top-left-radius: 380px;
      border-top-right-radius: 380px;
      border-bottom-left-radius: 380px;
      border-bottom-right-radius: 380px;
    }
  }

  @media only screen and (min-width: 1366px) {
    .driverPortrait {
      width: 260px;
      height: 260px;
    }
    .tableContainer {
      width: calc(94% - 260px);
    }
  }
`;

function DriverPage({ driverData }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://wpadmin.f1online.sk/wp-json/wp/v2/media?search=${driverData.givenName}+${driverData.familyName}&per_page=15`
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

  let driverBioData = (
    <>
      <SectionTitle
        topLevel={true}
        title={`${driverData.givenName} ${driverData.familyName}`}
      />
      <Divider height="20px" />
      <div className="briefInfoContainer">
        <img
          className="driverPortrait"
          alt={`Portrét pilota ${driverData.givenName} ${driverData.familyName}`}
          src={driverData.img800}
        />
        <div className="tableContainer">
          {
            <div className="numberContainer">
              <img
                alt={`Číslo ${driverData.permanentNumber}`}
                src={`https://wpadmin.f1online.sk/wp-content/uploads/${driverData.permanentNumber}.png`}
              />
            </div>
          }
          <div className="table">
            <div className="halfCircle" />
            <div className="row">
              <span>Tím</span>
              <span>{`${driverData.team}`}</span>
            </div>
            <div className="row">
              <span>Štátna príslušnosť</span>
              <span>{`${driverData.nationality}`}</span>
            </div>
            <div className="row">
              <span>Víťazstvá</span>
              <span>{`${driverData.stats.wins}`}</span>
            </div>
            <div className="row">
              <span>Pódiá</span>
              <span>{`${driverData.stats.podiums}`}</span>
            </div>
            <div className="row">
              <span>Pole Positions</span>
              <span>{`${driverData.stats.poles}`}</span>
            </div>
            <div className="row">
              <span>Body</span>
              <span>{`${driverData.stats.points}`}</span>
            </div>
            <div className="row">
              <span>Narodený</span>
              <span>{`${driverData.dateOfBirth.split("-")[2]}. ${
                driverData.dateOfBirth.split("-")[1]
              }. ${driverData.dateOfBirth.split("-")[0]}, ${
                driverData.town
              }`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  let driverPosts = (
    <ArchivArticles tagSlug={driverData.slug} asArchive={false} perpage="6" />
  );

  return (
    <>
      <Head>
        <title key="meta_title">{`${driverData.givenName} ${driverData.familyName} | ${PAGE_MAIN_TITLE}`}</title>
        <meta
          key="meta_ogtitle"
          property="og:title"
          content={`${driverData.givenName} ${driverData.familyName} | ${PAGE_MAIN_TITLE}`}
        />
        <meta
          key="meta_url"
          property="og:url"
          content={`https://f1online.sk/piloti/${driverData.slug}`}
        />
        <meta
          key="meta_image"
          property="og:image"
          content={`${driverData.img800}`}
        />
      </Head>
      <MAIN>
        <COLUMNED_PAGE>
          <PAGE_MAIN_COL>
            {/*<img className="image} src='' />*/}

            <Container>
              {driverBioData}
              <Divider height="30px" />
              <div className="titleContainer">
                <h2 className="title">Najnovšie články</h2>
              </div>
              {driverPosts}
              <BContainer>
                {onClient() ? (
                  <TrackedPanel
                    type={TYPES.BASIC}
                    position={POSITION.CONTENT_DRIVER_DETAIL}
                  />
                ) : null}
              </BContainer>
              {driverData.about ? (
                <>
                  <Divider height="15px" />
                  <div className="titleContainer">
                    <h2 className="title">Profil</h2>
                  </div>
                  <article className="biography">
                    <div
                      dangerouslySetInnerHTML={{ __html: driverData.about }}
                    />
                  </article>
                </>
              ) : (
                ""
              )}

              <div className="titleContainer">
                <Divider height="25px" />
                <h2 className="title">Najnovšie v galérii</h2>
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
            <Divider height="10px" />
            <BContainer>
              {onClient() && onMobile() ? (
                <TrackedPanel
                  type={TYPES.BASIC}
                  position={POSITION.CONTENT_DRIVER_DETAIL}
                />
              ) : null}
            </BContainer>
          </PAGE_MAIN_COL>
          <SIDEBAR>
            <Divider height="50px" />
            <QuickNews />
            {/*<Divider height="15px" />
              <SideRePanel />*/}
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

    const responseDriverData = await fetch(
      `https://wpadmin.f1online.sk/wp-content/uploads/${params.id}.json`
    )
      .then((res) => res.json())
      .then((res) => res);

    //TODO: zmen na jazdcov tag
    const responseDriverPosts = await fetch(
      "https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=3"
    )
      .then((res) => res.json())
      .then((res) => res);

    await store.sagaTask.toPromise();

    return {
      props: {
        driverData: responseDriverData,
        postsData: responseDriverPosts,
      },
    };
  }
);

export default DriverPage;
