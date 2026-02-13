const exp = require("express");
const userAuthor=require("../models/userAuthorModel")
const expressAsyncHandler=require("express-async-handler");
const createUserAuthor = require("./createUserOrAuthor");
const userApp = exp.Router();
const Article=require("../models/articleModel")


userApp.get("/users",expressAsyncHandler( async(req, res) => {
  const user=await userAuthor.find();
  res.send({ message: "request sucessful",payLoad: user});
}));

userApp.post("/user", createUserAuthor)

userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
  //get comment obj
  const commentObj=req.body;
  console.log(commentObj,req.params.articleId)
  //add commnetObj to comments array of article
 const articleWithComments= await Article.findOneAndUpdate(
      { articleId:req.params.articleId},
      { $push:{ comments:commentObj}},
      {returnOriginal:false})

      console.log(articleWithComments)
  //send res
  res.status(200).send({message:"comment added",payload:articleWithComments})

}))




module.exports=userApp
