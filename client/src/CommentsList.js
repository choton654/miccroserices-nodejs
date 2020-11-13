import React from "react";

function CommentsList({ comments }) {
  const renderComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "this comment is in moderation state";
    }
    if (comment.status === "rejected") {
      content = "this comment is rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
}

export default CommentsList;
