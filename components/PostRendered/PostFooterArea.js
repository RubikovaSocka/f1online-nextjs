import React from "react";
import ReportBox from "../ReportBox/ReportBox";
import SectionTitle from "../SectionTitle/SectionTitle";
import Divider from "../Divider";
import RelatedArticles from "../RelatedArticles";
import DiskusnyBox from "../DiskusnyBox/DiskusnyBox";
import decodeHtml from "../../utils/decodeHtml";

import styles from "./style.module.scss";

function PostFooterArea({ title, id, slug, acf, tags}) {
  return (
    <>
      <Divider height="10px" />
      <div className={styles.shareButtonRow}>
        <iframe
          src={`https://www.facebook.com/plugins/like.php?href=${encodeURI(
            `https://f1online.sk/clanky/${id}/${slug}`
          )}&width=128&layout=button_count&action=like&size=small&share=true&height=46&appId=313229599518550`}
          width="183"
          height="25"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </div>
      <ReportBox
        artLink={`https://f1online.sk/clanky/${id}/${slug}`}
        title={decodeHtml(title.rendered)}
        articleID={id}
      />
      <Divider height="10px" />
      <SectionTitle title="Možno vás zaujme" />
      <RelatedArticles ids={acf.suvisiace_clanky} tagID={tags[0]} except={id} />
      <Divider height="10px" />
      <SectionTitle title="Komentáre" />
      <DiskusnyBox
        discourseUrl="https://forum.f1online.sk/"
        discourseEmbedUrl={`https://f1online.sk/clanky/${id}/${slug}`}
      />
    </>
  );
}

export default PostFooterArea;
