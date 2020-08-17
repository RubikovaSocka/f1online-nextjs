import React from "react";
import PostTitleArea from "./PostTitleArea.js";
import PostContentArea from "./PostContentArea.js";
import PostExtrasArea from "./PostExtrasArea.js";
import PostFooterArea from "./PostFooterArea.js";

function PostRendered({ postData }) {
  return (
    <article>
      <PostTitleArea
        title={postData.title.rendered}
        authorName={postData._embedded.author[0].name}
        date={postData.date}
        imageData={postData.better_featured_image}
      />
      <PostContentArea article={postData.content.rendered} />
      <PostExtrasArea acf={postData.acf} />
      <PostFooterArea postData={postData} />
    </article>
  );
}

export default PostRendered;
