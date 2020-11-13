const { default: PostCreate } = require("./PostCreate");
const { default: PostList } = require("./PostList");

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
