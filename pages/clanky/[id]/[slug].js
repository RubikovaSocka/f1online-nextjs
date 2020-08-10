import { Component } from "react";
import axios from "axios";
import EmbedContainer from "react-oembed-container";
import Head from "next/head";
import formatDate from "../../../utils/dateFormatter.js";

import QuickNews from "../../../components/QuickNews/QuickNews";
import CalResWidget from "../../../components/CalResWidget/CalResWidget";
import styles from "./Post.module.scss";
import SideRePanel from "../../../components/Ads/SideRePanel/SideRePanel.js";
import Divider from "../../../components/Divider.js";
import getImagePreview from "../../../utils/getImagePreview";
import ArtRePanel from "../../../components/Ads/ArtRePanel/ArtRePanel.js";
import PostsBlock from "../../../components/PostsBlock/PostsBlock";
import DiskusnyBox from "../../../components/DiskusnyBox/DiskusnyBox";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.js";
import TrackedSidePanel from "../../../components/Ads/TrackedSidePanel.js";
import TrackedArtRePanel from "../../../components/Ads/TrackedArtRePanel.js";
import ReportBox from "../../../components/ReportBox/ReportBox.js";
import RelatedArticles from "../../../components/RelatedArticles.js";
import decodeHtml from "../../../utils/decodeHtml.js";
import ImageGallery from "../../../components/react-image-gallery/src/ImageGallery";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleFullHtml: {},
      images: [],
      imagesLoaded: false
    };
  }

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth
    });

    if (this.props.postData.acf.gallery) {
      axios.get(this.props.postData.acf.gallery).then(res => {
        console.log(res);
        let imagesLoaded = res.data.map(item => {
          return {
            original: item.full,
            thumbnail: item.thumbnail,
            originalTitle: "zdroj: " + item.source,
            thumbnailTitle: "zdroj: " + item.source
          };
        });
        this.setState({
          images: imagesLoaded,
          imagesLoaded: true
        });
      });
    }

    let article = this.props.postData.content.rendered;
    let articleContentFull, onlineNews;
    let nrOfParagraphs = (article.match(/<p>/g) || []).length;

    let delimiter = "<p>";
    const nrPsBetween = 4;

    //Don't show ads
    if (nrOfParagraphs < 6) {
      articleContentFull = (
        <div
          className={`${styles.articleContent} ${styles.setFirst}`}
          dangerouslySetInnerHTML={{ __html: article }}
        />
      );
      //Show ads
    } else if (nrOfParagraphs === 6) {
      articleContentFull = (
        <>
          {article.split(delimiter).map((paragraph, index) => {
            return index > 0 ? (
              <>
                <div
                  className={`${styles.articleContent} ${
                    index === 1 ? styles.firstPar : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: "<p>".concat(paragraph)
                  }}
                />
                {index === 3 ? (
                  <TrackedArtRePanel report={true} changeable={false} />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            );
          })}
        </>
      );
    } else {
      articleContentFull = (
        <>
          {article.split(delimiter).map((paragraph, index) => {
            return index > 0 ? (
              <>
                <div
                  className={`${styles.articleContent} ${
                    index === 1 ? styles.firstPar : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: "<p>".concat(paragraph)
                  }}
                />
                {(index - 1) % nrPsBetween === 3 &&
                nrOfParagraphs - (index - 1) > 2 ? (
                  <TrackedArtRePanel
                    GASpercentage={index > 4 ? 100 : 65}
                    report={index === 4}
                    changeable={index === 4}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            );
          })}
        </>
      );
    }

    const { postData } = this.props;

    if (postData.acf.start_time && postData.acf.end_time) {
      onlineNews = (
        <PostsBlock
          start={postData.acf.start_time.replace(" ", "T")}
          end={postData.acf.end_time.replace(" ", "T")}
        />
      );
    }

    let post = (
      <>
        <div className={styles.title}>
          {/*<h1>{postData.title.rendered}</h1>*/}
          <h1>{decodeHtml(postData.title.rendered)}</h1>
        </div>
        <div className={styles.imageContainer}>
          {getImagePreview({
            imgData: postData.better_featured_image,
            imgSize: "medium_large"
          })}
          <span>
            zdroj:{" "}
            {postData.better_featured_image
              ? postData.better_featured_image.caption
              : "F1online.sk"}
          </span>
        </div>
        <div className={styles.authorContainer}>
          <span>{postData._embedded.author[0].name}</span>
          <br />
          <span>{formatDate(postData.date)}</span>
        </div>

        <EmbedContainer markup={this.props.postData.content.rendered}>
          {articleContentFull}
        </EmbedContainer>
        {onlineNews ? (
          <>
            <Divider height="100px" />
            <SectionTitle title="Príspevky z onlinu:" />{" "}
            <Divider height="30px" />
            {onlineNews}
          </>
        ) : (
          ""
        )}
      </>
    );

    let pagePostBottom = (
      <>
        <Divider height="10px" />
        <ReportBox
          artLink={`https://f1online.sk/clanky/${this.props.postData.id}/${this.props.postData.slug}`}
          title={decodeHtml(this.props.postData.title.rendered)}
          articleID={this.props.postData.id}
        />
        <Divider height="8px" />
        <div className={styles.shareButtonRow}>
          <span>Zdieľať</span>
          <FacebookShareButton
            url={`https://f1online.sk/clanky/${this.props.postData.id}/${this.props.postData.slug}`}
          >
            <FacebookIcon size={25} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://f1online.sk/clanky/${this.props.postData.id}/${this.props.postData.slug}`}
          >
            {" "}
            <TwitterIcon size={25} />
          </TwitterShareButton>
        </div>
        <Divider height="10px" />
        <SectionTitle title="Možno vás zaujme" />

        <RelatedArticles
          ids={this.props.postData.acf.suvisiace_clanky}
          tagID={this.props.postData.tags[0]}
        />
        <Divider height="10px" />
        <SectionTitle title="Komentáre" />
        <DiskusnyBox
          discourseUrl="https://forum.f1online.sk/"
          discourseEmbedUrl={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
        />
      </>
    );

    let pageFullAside = (
      <aside className="sideBar">
        <QuickNews />
        <Divider height="15px" />
        <CalResWidget />

        {/*<div className={`${styles.stickyWidget}`}>*/}
        {/*<SideRePanel />*/}
        <TrackedSidePanel />
        {/*</div>*/}
      </aside>
    );

    this.setState({
      pagePost: post,
      pagePostBottom: pagePostBottom,
      pageFullB: pageFullAside
    });
  }
  render() {
    const { postData } = this.props;
    const regex = /(<([^>]+)>)/gi;
    return (
      <>
        <Head>
          <title key="meta_title">
            {decodeHtml(postData.title.rendered)} | F1online.sk
          </title>
          <meta
            name="description"
            content={`${decodeHtml(postData.excerpt.rendered).replace(
              regex,
              ""
            )}`}
          />
          <meta key="meta_type" property="og:type" content="article" />
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`${decodeHtml(postData.title.rendered)} | F1online.sk`}
          />
          <meta
            key="meta_description"
            property="og:description"
            content={`${decodeHtml(postData.excerpt.rendered).replace(
              regex,
              ""
            )}`}
          />
          <meta
            key="meta_url"
            property="og:url"
            content={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          ></link>
          <meta
            key="meta_image"
            property="og:image"
            content={
              postData.better_featured_image
                ? `${postData.better_featured_image.source_url}`
                : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
            }
          />
          <meta
            key="meta_image_height"
            property="og:image:height"
            content={
              postData.better_featured_image
                ? `${postData.better_featured_image.media_details.height}`
                : "630"
            }
          />
          <meta
            key="meta_image_width"
            property="og:image:width"
            content={
              postData.better_featured_image
                ? `${postData.better_featured_image.media_details.width}`
                : "1200"
            }
          />
        </Head>
        {/*<div id="dsa">*/}
          <main className="contentsPage">
            <div className="page">
              <div id="cn" className="mainContent">
                {this.state.pagePost}
                {this.state.imagesLoaded ? (
                  <div style={{ width: "100%", marginTop: "20px" }}>
                    <ImageGallery
                      showPlayButton={false}
                      lazyLoad={true}
                      showFullscreenButton={true}
                      items={this.state.images}
                      className={styles.galleryEdit}
                      showIndex
                    />
                  </div>
                ) : (
                  ""
                )}

                {this.state.pagePostBottom}
              </div>
              {this.state.pageFullB}
            </div>
          </main>
        {/*</div>*/}
      </>
    );
  }
}

export async function getServerSideProps({ params }) {
  const response = await axios({
    method: "get",
    url: `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/${params.id}?_embed`
    //headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  });
  axios.get(
    `https://wpadmin.f1online.sk/wp-content/plugins/counter/count.php?id=${params.id}`
  );

  return {
    props: {
      postData: response.data
    }
  };
}
