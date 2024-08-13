import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public")); // public 폴더에 있는 정적파일 적용
app.use(express.urlencoded({ extended: true })); // body-parser 대체
app.use(expressEjsLayouts); // ejs 레이아웃 적용

app.set("view engine", "ejs");
app.set("layout", "layout");

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/post/:id", (req, res) => {
  // 엔드포인트에 동적파라미터 활용

  const postID = req.params.id;

  console.log("Handling GET /post/:id request : " + postID);
  const post = posts.find((p) => p.id === parseInt(postID));

  if (isNaN(parseInt(postID)))
    // css파일이 GET 요청하는 경우 예외처리
    return res.status(400).send("Invalid post ID");

  if (!post) {
    // post 없을 경우 예외처리
    console.log("Post not found for id:", postID);
    return res.status(404).send("Post not found");
  }

  res.render("post", { post });

  console.log(`post object: ` + post);
  console.log(`post title: ` + post.title);
  console.log(`post content: ` + post.content);
  console.log(`post id : ` + post.id);
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get(`/edit/:id`, (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) return res.status(404).send("Post not found");

  res.render("edit", { post });
});

app.get("/remove/:id", (req, res) => {});

app.post("/create_post", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);

  console.log(newPost);

  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) return res.status(404).send("Post not found");

  res.redirect("/");
});

app.post("remove/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 실행중`);
});
