function makeThreads(posts) {
  const commentMap = {};

  // move all the comments into a map of id => comment
  posts.forEach((comment, index) => {
    //console.log(comment.id);
    commentMap[index] = comment;
    commentMap[index].children = [];
  });

  // iterate over the comments again and correctly nest the children
  posts.forEach((comment) => {
    const parentId = comment.reply_to_post_number
      ? comment.reply_to_post_number - 1
      : null;

    if (parentId) {
      const parentComment = commentMap[parentId];
      if (commentMap[parentId] !== undefined) {
        parentComment.children.push(comment);
      } else {
        parentId = 0;
      }
    }
  });
  // filter the list to return a list of correctly nested comments
  return posts.filter((comment) => {
    return !comment.reply_to_post_number;
  });
}

export default makeThreads;
