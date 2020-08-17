import React from "react";
import styles from "./PostRendered.module.scss";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import ReportBox from "../ReportBox/ReportBox";
import SectionTitle from "../SectionTitle/SectionTitle";
import Divider from "../Divider";
import RelatedArticles from "../RelatedArticles";
import DiskusnyBox from "../DiskusnyBox/DiskusnyBox";
import decodeHtml from "../../utils/decodeHtml";

function PostFooterArea({ postData }) {
  return (
    <>
      <Divider height="10px" />
      <ReportBox
        artLink={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
        title={decodeHtml(postData.title.rendered)}
        articleID={postData.id}
      />
      <Divider height="8px" />
      <div className={styles.shareButtonRow}>
        <iframe
          src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(
            `https://f1online.sk/clanky/${postData.id}/${postData.slug}`
          )}&width=128&layout=button_count&action=like&size=small&share=true&height=46&appId=313229599518550`}
          width="170"
          height="25"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
      <Divider height="10px" />
      <SectionTitle title="Možno vás zaujme" />
      <RelatedArticles
        ids={postData.acf.suvisiace_clanky}
        tagID={postData.tags[0]}
        except={postData.id}
      />
      <Divider height="10px" />
      <SectionTitle title="Komentáre" />
      <DiskusnyBox
        discourseUrl="https://forum.f1online.sk/"
        discourseEmbedUrl={`https://f1online.sk/clanky/${postData.id}/${postData.slug}`}
      />
    </>
  );
}

export default PostFooterArea;
