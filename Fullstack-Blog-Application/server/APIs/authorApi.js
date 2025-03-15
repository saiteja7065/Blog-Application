const exp = require("express");
const authorApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("../APIs/createUserOrAuthor");
const Article = require("../models/articleModel");
const { requireAuth, clerkMiddleware } = require("@clerk/express");
require("dotenv").config();

authorApp.use(clerkMiddleware());

authorApp.get("/", (req, res) => {
  res.send({ message: "request sucessful" });
});

authorApp.get("/unauth", (req, res) => {
  res.send({ message: "Unauthorized Access,Login before access." });
});

authorApp.post("/author", expressAsyncHandler(createUserOrAuthor));

authorApp.post(
  "/article",
  expressAsyncHandler(async (req, res) => {
    const newArticleObj = req.body;
    const articleDB = new Article(newArticleObj);
    const ArticleObj = await articleDB.save();
    res.status(201).send({ message: "article Created", payload: ArticleObj });
  })
);

authorApp.get(
  "/articles",
  requireAuth({ signInUrl: "unauth" }),
  expressAsyncHandler(async (req, res) => {
    const articleList = await Article.find({ isArticleActive: true });
    res.status(200).send({ message: "article List", payload: articleList });
  })
);

//modify article by article id

authorApp.put(
  "/article/:articleId",
  requireAuth({ signInUrl: "unauth" }),
  expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const latestArticle = await Article.findByIdAndUpdate(
      modifiedArticle._id,
      { ...modifiedArticle },
      { returnOriginal: false }
    );
    res
      .status(200)
      .send({ message: "article deleted or restored", payload: latestArticle });
  })
);

//delete article by article id

authorApp.put(
  "/articles/:articleId",
  expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const latestArticle = await Article.findByIdAndUpdate(
      modifiedArticle._id,
      { ...modifiedArticle },
      { returnOriginal: false }
    );
    res
      .status(200)
      .send({ message: "article deleted or restored", payload: latestArticle });
  })
);

module.exports = authorApp;
