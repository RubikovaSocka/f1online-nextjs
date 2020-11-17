import ReportBox from "../../ReportBox";
import SectionTitle from "../../SectionTitle";
import Divider from "../../Divider";
import RelatedArticles from "../../RelatedArticles";
import DiskusnyBox from "../../DiskusnyBox";
import decodeHtml from "../../../utils/decodeHtml";

import styled from "styled-components";

const ButtonRow = styled.div`
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

function PostFooterArea({ title, id, slug, acf, tags }) {
  return (
    <div style={{ minHeight: "350px" }}>
      <Divider height="10px" />
      <ButtonRow>
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
        />
      </ButtonRow>
      <ReportBox
        artLink={`https://f1online.sk/clanky/${id}/${slug}`}
        title={decodeHtml(title.rendered)}
        articleID={id}
      />
      <Divider height="10px" />
      <RelatedArticles ids={acf.suvisiace_clanky} tagID={tags[0]} except={id} />
      <Divider height="10px" />
      <SectionTitle title="Komentáre" />
      <DiskusnyBox
        discourseUrl="https://forum.f1online.sk/"
        discourseEmbedUrl={`https://f1online.sk/clanky/${id}/${slug}`}
      />
    </div>
  );
}

export default PostFooterArea;
