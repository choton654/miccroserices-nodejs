import Axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

function PostList() {
  const [posts, setposts] = useState({});

  const fetchPost = async () => {
    const res = await Axios.get("http://posts.com/posts");
    console.log(res.data);
    setposts(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const renderPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentsList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
}

export default PostList;
