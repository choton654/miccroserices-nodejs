import React, { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, settitle] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios.post("http://posts.com/posts/create", {
          title,
        });
        settitle("");
      }}
    >
      <div className="mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default PostCreate;
