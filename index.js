import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/posting", (req, res) => {
  res.render("index.ejs");
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 실행중`);
});
