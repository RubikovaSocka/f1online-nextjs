import PostTitleArea from "./PostTitleArea";
import PostContentArea from "./PostContentArea";
import PostExtrasArea from "./PostExtrasArea";
import PostFooterArea from "./PostFooterArea";

function PostRendered(props) {
  const { title, date, id, slug, content, tags, acf, _embedded } = props;

  return (
    <article>
      <PostTitleArea
        key={id}
        title={title.rendered}
        authorName={_embedded.author[0].name}
        date={date}
        imageData={_embedded["wp:featuredmedia"][0]}
        id={id}
        slug={slug}
      />
      <PostContentArea
        article={content.rendered}
        adsDisallowed={acf.a_disallow}
        tags={tags}
      />
      <PostExtrasArea acf={acf} id={id} slug={slug} />
      <PostFooterArea {...props} />
    </article>
  );
}

export default PostRendered;
