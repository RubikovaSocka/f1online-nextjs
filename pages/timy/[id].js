import React, { Fragment, Component } from "react";
import axios from "axios";
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

import dynamic from "next/dynamic";
const ImageGallery = dynamic(() => import('../../components/react-image-gallery/src/ImageGallery'))

function getCName(team) {
  switch (team) {
    case "Mercedes":
      return styles.slider00D2BE;
    case "Ferrari":
      return styles.sliderDC0000;
    case "Red Bull":
      return styles.slider0600EF;
    case "Renault":
      return styles.sliderFFF500;
    case "McLaren":
      return styles.sliderFF8700;
    case "Racing Point":
      return styles.sliderF596C8;
    case "Alfa Romeo":
      return styles.slider960000;
    case "Alpha Tauri":
      return styles.sliderE0E0E0;
    case "Haas":
      return styles.slider787878;
    case "Williams":
      return styles.slider0082FA;
  }
}

export default class TeamPage extends Component {
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
        `https://wpadmin.f1online.sk/wp-json/wp/v2/media?search=${this.props.teamData.name}&per_page=14`
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
    const { teamData } = this.props;
    let teamDataBlock = (
      <Fragment>
        <SectionTitle title={`${teamData.name}`} />
        <Divider height="20px" />
        <div className={styles.briefInfoContainer}>
          <div className={styles.imageData}>
            {
              <img
                className={styles.logo}
                alt={`Logo tímu ${teamData.name}`}
                src={`https://wpadmin.f1online.sk/wp-content/uploads/logo-${teamData.slug}.jpg`}
              />
            }
          </div>

          <div className={styles.tableContainer}>
            {/*<div className={styles.numberContainer}>
                            <img alt={`Číslo ${team.permanentNumber}`} src={`https://wpadmin.f1online.sk/wp-content/uploads/${team.permanentNumber}.jpg`}/> 
                        </div>*/}
            <div
              className={
                styles.table
              } /*style={{borderTop: `2px solid ${team.teamColor}`}}*/
            >
              <div className={styles.halfCircle} />
              <div className={styles.row}>
                <span>Sídlo</span>
                <span>{`${teamData.base}, ${teamData.country}`}</span>
              </div>
              <div className={styles.row}>
                <span>Šéf tímu</span>
                <span>{`${teamData["team-boss"]}`}</span>
              </div>
              <div className={styles.row}>
                <span>Technický riaditeľ</span>
                <span>{`${teamData["technical-chief"]}`}</span>
              </div>
              <div className={styles.row}>
                <span>Šasi</span>
                <span>{`${teamData.chassis}`}</span>
              </div>
              <div className={styles.row}>
                <span>Pohonná jednotka</span>
                <span>{`${teamData.engine}`}</span>
              </div>
              <div className={styles.row}>
                <span>Tituly</span>
                <span>{`${teamData.championships}`}</span>
              </div>
              <div className={styles.row}>
                <span>Víťazstvá</span>
                <span>{`${teamData.wins}`}</span>
              </div>
            </div>
          </div>
          <div className={styles.portraitsContainer}>
            <div className={styles.portraitContainer}>
              <Link
                href="/piloti/[id]"
                as={`/piloti/${teamData.Drivers[0].driverId}`}
              >
                <a onClick={() => NProgress.start()}>
                  <img
                    alt={`${teamData.Drivers[0].givenName} ${teamData.Drivers[0].familyName} portrét`}
                    src={teamData.Drivers[0].img300}
                    className={styles.portrait}
                  ></img>
                  <span>{`${teamData.Drivers[0].givenName} ${teamData.Drivers[0].familyName}`}</span>
                </a>
              </Link>
            </div>

            <div className={styles.portraitContainer}>
              <Link
                href="/piloti/[id]"
                as={`/piloti/${teamData.Drivers[1].driverId}`}
              >
                <a onClick={() => NProgress.start()}>
                  <img
                    alt={`${teamData.Drivers[1].givenName} ${teamData.Drivers[1].familyName} portrét`}
                    src={teamData.Drivers[1].img300}
                    className={styles.portrait}
                  ></img>
                  <span>{`${teamData.Drivers[1].givenName} ${teamData.Drivers[1].familyName}`}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );

    let teamPosts = (
      <ArchivArticles tagSlug={teamData.slug} asArchive={false} perpage="6" />
    );

    return (
      <>
        <Head>
          <title key="meta_title">{`${teamData.name} | F1online.sk`}</title>
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`${teamData.name} | F1online.sk`}
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
        <main className="contentsPage">
          <div className="page">
            <div className="mainContent">
              {/*<img className={styles.image} src='' />*/}
              <div className={styles.container}>
                {teamDataBlock}

                <Divider height="30px" />
                <div className={styles.titleContainer}>
                  <h2 className={styles.title}>Najnovšie články</h2>
                </div>
                {teamPosts}

                <div className={styles.titleContainer}>
                  <Divider height="15px" />
                  <h2 className={styles.title}>Najnovšie z media zóny</h2>
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
              <Divider height="15px" />
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

    const responseTeamData = await axios({
      method: "get",
      url: `https://wpadmin.f1online.sk/wp-content/uploads/${params.id}.json`
      //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    });

    await store.sagaTask.toPromise();

    return {
      props: {
        teamData: responseTeamData.data,
      }
    };
  }
);