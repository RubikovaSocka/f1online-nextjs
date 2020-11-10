import React from "react";
import PostTitleArea from "./PostTitleArea.js";
import PostContentArea from "./PostContentArea.js";
import PostExtrasArea from "./PostExtrasArea.js";
import PostFooterArea from "./PostFooterArea.js";

function PostRendered(props) {
  const { title, date, id, slug, content, acf, _embedded } = props;

  return (
    <article>
      <PostTitleArea
        title={title.rendered}
        authorName={_embedded.author[0].name}
        date={date}
        imageData={_embedded["wp:featuredmedia"][0]}
        id={id}
        slug={slug}
      />
      <PostContentArea article={content.rendered} />
      <PostExtrasArea {...acf} />
      <PostFooterArea {...props} />
    </article>
  );
}

export default PostRendered;
