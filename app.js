import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const port = 3000;

let posts = [];
app.use(express.urlencoded({ extended: true })); // body-parser 대체
app.use(express.static("public")); // public 폴더에 있는 정적파일 적용
app.use(expressEjsLayouts); // ejs 레이아웃 적용

app.set("view engine", "ejs");
app.set("layout", "layout");

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/post/:id", (req, res) => { // 엔드포인트에 동적파라미터 활용
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  res.render("post", { post });
});

app.get("/create", (req, res) => {
  res.render("create");
});

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

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 실행중`);
});
