const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: Axios } = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await Axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(200).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("recived events", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("v20");
  console.log("PostService listen on port 4000");
});
