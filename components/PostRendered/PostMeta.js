import Head from "next/head";
import decodeHtml from "../../utils/decodeHtml";

function PostMeta({ title, excerpt, id, date, slug, _embedded }) {
  const regex = /(<([^>]+)>)/gi;
  return (
    <Head>
      <title key="meta_title">{decodeHtml(title.rendered)} | F1online.sk</title>
      <meta key="meta_oglocale" property="og:locale" content="sk_SK" />
      <meta name="robots" content="index, follow" />
      <meta
        key="meta_publishtime"
        property="article:published_time"
        content={date}
      />
      <meta
        name="description"
        content={`${decodeHtml(excerpt.rendered).replace(regex, "")}`}
      />
      <meta key="meta_type" property="og:type" content="article" />
      <meta
        key="meta_ogtitle"
        property="og:title"
        content={`${decodeHtml(title.rendered)} | F1online.sk`}
      />
      <meta
        key="meta_description"
        property="og:description"
        content={`${decodeHtml(excerpt.rendered).replace(regex, "")}`}
      />
      <meta
        key="meta_url"
        property="og:url"
        content={`https://f1online.sk/clanky/${id}/${slug}`}
      />
      <meta
        key="meta_image"
        property="og:image"
        content={
          _embedded["wp:featuredmedia"][0].source_url
            ? _embedded["wp:featuredmedia"][0].source_url
            : "https://wpadmin.f1online.sk/wp-content/uploads/title-logo-wb.png"
        }
      />
      <meta
        key="meta_image_height"
        property="og:image:height"
        content={_embedded["wp:featuredmedia"][0].media_details.height}
      />
      <meta
        key="meta_image_width"
        property="og:image:width"
        content={_embedded["wp:featuredmedia"][0].media_details.width}
      />
    </Head>
  );
}

export default PostMeta;
