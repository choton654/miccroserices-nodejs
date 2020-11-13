import React, { useState } from "react";
import axios from "axios";
function CommentCreate({ postId }) {
  const [content, setcontent] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios.post(`http://posts.com/posts/${postId}/comments`, {
            content,
          });
          setcontent("");
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            create comment
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentCreate;
