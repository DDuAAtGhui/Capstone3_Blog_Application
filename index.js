import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let posts = [];
app.post("/posting", (req, res) => {
  const post = req.body;
  posts.push(post);
  res.render("index.ejs", post);
  console.log(`You pushed ${posts[posts.length - 1]["title"]}`);
});

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 실행중`);
});
