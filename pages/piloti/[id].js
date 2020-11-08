import React, { Component } from "react";
import axios from "axios";
import { END } from "redux-saga";
import { wrapper } from "../../redux/store/store";

import QuickNews from "../../components/QuickNews/QuickNews.js";
import CalResWidget from "../../components/CalResWidget/CalResWidget.js";
import SectionTitle from "../../components/SectionTitle/SectionTitle.js";
import Divider from "../../components/Divider.js";
import LoadingSpinner from "../../components/LoadingSpinner";
import Head from "next/head";
import styles from "./DriverPage.module.scss";
import ArchivArticles from "../../components/ArchivArticles/ArchivArticles.js";

//import ImageGallery from "../../components/react-image-gallery/src/ImageGallery";
import SideRePanel from "../../components/Ads/SideRePanel/SideRePanel.js";

import dynamic from "next/dynamic";
const ImageGallery = dynamic(() => import('../../components/react-image-gallery/src/ImageGallery'))

class DriverPage extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imagesLoaded: false
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/media?search=${this.props.driverData.givenName}+${this.props.driverData.familyName}&per_page=15`
      )
      .then(res => {
        let imagesLoaded = res.data.map(item => {
          if (Object.keys(item.media_details).length > 0) {
            return {
              original: item.media_details.sizes.large
                ? item.media_details.sizes.large.source_url
                : item.source_url,
              thumbnail: item.media_details.sizes.medium
                ? item.media_details.sizes.medium.source_url
                : item.source_url
            };
          }
          return null;
        });
        var filtered = imagesLoaded.filter(function(el) {
          return el != null;
        });
        this.setState({
          images: filtered
        });
      });
    //.catch(err => console.log(err))
  }

  render() {
    const { driverData } = this.props;
    let driverBioData = (
      <>
        <SectionTitle
          title={`${driverData.givenName} ${driverData.familyName}`}
        />
        <Divider height="20px" />
        <div className={styles.briefInfoContainer}>
          <img
            className={styles.driverPortrait}
            alt={`Portrét pilota ${driverData.givenName} ${driverData.familyName}`}
            src={driverData.img800}
          />
          <div className={styles.tableContainer}>
            {
              <div className={styles.numberContainer}>
                <img
                  alt={`Číslo ${driverData.permanentNumber}`}
                  src={`https://wpadmin.f1online.sk/wp-content/uploads/${driverData.permanentNumber}.png`}
                />
              </div>
            }
            <div className={styles.table}>
              <div className={styles.halfCircle} />
              <div className={styles.row}>
                <span>Tím</span>
                <span>{`${driverData.team}`}</span>
              </div>
              <div className={styles.row}>
                <span>Štátna príslušnosť</span>
                <span>{`${driverData.nationality}`}</span>
              </div>
              <div className={styles.row}>
                <span>Víťazstvá</span>
                <span>{`${driverData.stats.wins}`}</span>
              </div>
              <div className={styles.row}>
                <span>Pódiá</span>
                <span>{`${driverData.stats.podiums}`}</span>
              </div>
              <div className={styles.row}>
                <span>Pole Positions</span>
                <span>{`${driverData.stats.poles}`}</span>
              </div>
              <div className={styles.row}>
                <span>Body</span>
                <span>{`${driverData.stats.points}`}</span>
              </div>
              <div className={styles.row}>
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
          <title key="meta_title">{`${driverData.givenName} ${driverData.familyName} | F1online.sk`}</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`${driverData.givenName} ${driverData.familyName} | F1online.sk`}
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
        <main className="contentsPage">
          <div className="page">
            <div className="mainContent">
              {/*<img className={styles.image} src='' />*/}

              <div className={styles.container}>
                {driverBioData}

                <Divider height="30px" />
                <div className={styles.titleContainer}>
                  <h2 className={styles.title}>Najnovšie články</h2>
                </div>
                {driverPosts}

                {driverData.about ? (
                  <>
                    <Divider height="15px" />
                    <div className={styles.titleContainer}>
                      <h2 className={styles.title}>Profil</h2>
                    </div>
                    <article className={styles.biography}>
                      <div
                        dangerouslySetInnerHTML={{ __html: driverData.about }}
                      />
                    </article>
                  </>
                ) : (
                  ""
                )}

                <div className={styles.titleContainer}>
                  <Divider height="25px" />
                  <h2 className={styles.title}>Najnovšie v galérii</h2>
                  <Divider height="15px" />
                  <div style={{ width: "100%" }}>
                    <ImageGallery
                      showPlayButton={false}
                      lazyLoad={true}
                      showFullscreenButton={false}
                      items={this.state.images}
                      className={styles.galleryEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
            <aside className="sideBar">
              <Divider height="50px" />
              <QuickNews />
              {/*<Divider height="15px" />
              <SideRePanel />*/}
              <Divider height="15px" />
              <CalResWidget />
            </aside>
          </div>
        </main>
      </>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    store.dispatch(END);

    const responseDriverData = await axios({
      method: "get",
      url: `https://wpadmin.f1online.sk/wp-content/uploads/${params.id}.json`
      //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    });

    //TODO: zmen na jazdcov tag
    const responseDriverPosts = await axios({
      method: "get",
      url: "https://wpadmin.f1online.sk/wp-json/wp/v2/posts?per_page=3"
      //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    });

    await store.sagaTask.toPromise();

    return {
      props: {
        driverData: responseDriverData.data,
        postsData: responseDriverPosts.data
      }
    };
  }
);

export default DriverPage;
