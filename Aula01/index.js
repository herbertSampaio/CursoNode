const express = require("express");
const nunjucks = require("nunjucks");
var app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");
const CheckMiddleware = (req, res, next) => {
  if (req.query.age) return next();
  else return res.redirect("/");
};

app.get("/", (req, res) => {
  return res.render("index");
});

app.post("/check", (req, res) => {
  if (req.body.age < 18) res.redirect(`/minor?age=${req.body.age}`);
  else res.redirect(`/major?age=${req.body.age}`);
});

app.get("/major", CheckMiddleware, (req, res) => {
  return res.render("major", { age: req.query.age });
});

app.get("/minor", CheckMiddleware, (req, res) => {
  return res.render("minor", { age: req.query.age });
});

app.listen(3000);
