const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: Axios } = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPost = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPost[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPost[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPost[req.params.id] = comments;

  await Axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("recived events", req.body.type);

  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, status, id, content } = data;
    const comments = commentsByPost[postId];

    const comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    await Axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});
app.listen(4001, () => console.log("CommentService listen on port 4001"));
