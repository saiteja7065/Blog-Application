const mongoose = require('mongoose');

const authorDataSchema=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String
    }
})

const commentSchema=new mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    }
})


const articleSchema=new mongoose.Schema({
    authorData:{
        type:authorDataSchema,
        required:true
    },
    articleId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dateOfCreation:{
        type:String,
        required:true
    },
    dateOfModification:{
        type:String,
        required:true
    },
    isArticleActive:{
        type:Boolean,
        required:true
    },
    comments:[commentSchema]

},{"strict":"throw"})


const Article=mongoose.model("article",articleSchema)

module.exports=Article;