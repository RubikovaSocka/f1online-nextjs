import { Fragment, useEffect, Component } from "react";
import axios from "axios";
import EmbedContainer from "react-oembed-container";
import ReactGA from "react-ga";
import Head from "next/head";
import formatDate from "../../../utils/dateFormatter.js";

import QuickNews from "../../../components/QuickNews/QuickNews";
import RPanel from "../../../components/RPanel";
import CalResWidget from "../../../components/CalResWidget/CalResWidget";
import styles from "./Post.module.scss";
import SideRePanel from "../../../components/Ads/SideRePanel/SideRePanel.js";
import Divider from "../../../components/Divider.js";
import getImagePreview from "../../../utils/getImagePreview";
import ArtRePanel from "../../../components/Ads/ArtRePanel/ArtRePanel.js";
import Media from "react-media";
import CommentsSection from "../../../components/CommentsSection/CommentsSection.js";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { FacebookShareCount } from "react-share";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleFullHtml: {}
    };
  }

  componentDidMount() {
    let article = this.props.postData.content.rendered;
    let upperPart, lowerPart, articleContentFull;
    let paraNum = (article.match(/<p>/g) || []).length;

    if (paraNum > 6) {
      let delimiter = "<p>";
      let start = paraNum > 10 ? 7 : 5;

      let tokens2 = article.split(delimiter).slice(0, start);
      let tokens = article.split(delimiter).slice(start);

      upperPart = tokens2.join(delimiter);
      lowerPart = "<p>" + tokens.join(delimiter);

      articleContentFull = (
        <>
          <div
            className={styles.articleContentUpper}
            dangerouslySetInnerHTML={{ __html: upperPart }}
          />
          <ArtRePanel />
          <div
            className={styles.articleContentLower}
            dangerouslySetInnerHTML={{ __html: lowerPart }}
          />
        </>
      );
    } else {
      articleContentFull = (
        <div
          className={styles.articleContentUpper}
          dangerouslySetInnerHTML={{ __html: article }}
        />
      );
    }

    const { postData } = this.props;

    let post = (
      <>
        <div className={styles.title}>
          {/*<h1>{postData.title.rendered}</h1>*/}
          <h1 dangerouslySetInnerHTML={{ __html: postData.title.rendered }} />
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
      </>
    );

    let pageFull = (
      <main className="contentsPage">
        <div className="page">
          <div className="mainContent">
            {post}
            <Divider height="10px" />
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
            <CommentsSection
              articleID={postData.id}
              articleUrl={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
            />
          </div>
          <aside className="sideBar">
            <QuickNews />
            <Divider height="15px" />
            <CalResWidget />
            <div className={`${styles.stickyWidget}`}>
              <SideRePanel />
            </div>
          </aside>
        </div>
      </main>
    );

    this.setState({
      pageFull: pageFull
    });
  }
  render() {
    const { postData } = this.props;
    const regex = /(<([^>]+)>)/gi;
    return (
      <>
        <Head>
          <title key="meta_title">
            {postData.title.rendered} | F1online.sk
          </title>
          <meta key="meta_type" property="og:type" content="article" />
          <meta
            key="meta_ogtitle"
            property="og:title"
            content={`${postData.title.rendered} | F1online.sk`}
          />
          <meta
            key="meta_description"
            property="og:description"
            content={`${postData.excerpt.rendered.replace(regex, "")}`}
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
        </Head>
        {this.state.pageFull}
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
