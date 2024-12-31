const express = require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Comment = require("../model/comment");


routes.post("/", async (req, res, next)=>{
try{
const comment = new Comment({
    post: req.body.post,
    author: req.body.author,
    content: req.body.content,
    createdAt: req.body.createdAt,
})
await comment.save();
res.status(200).json({
message: "Create comment Sucessful"
})
}catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})

routes.get("/", async(req, res, next)=>{
    try{
const docs = await Comment.find().populate("post author").select()
res.status(200).json({
    count : docs.length,
    Comment: docs,
})
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})

routes.get("/:commentId",async (req, res, next)=>{
    try{
const id = req.params.commentId;
const doc = await Comment.findById(id).populate("post author")
if(doc){
res.status(200).json({
    comment: doc,
});
}else{
    res.status(404).json({
        message: "No valid entry found for this provide ID",
    })
}
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})
routes.patch("/:commentId", async(req, res, next)=>{
    try{
const id = req.params.commentId;
await Comment.updateOne({_id: id},{
    $set:{
        post: req.body.post,
    author: req.body.author,
    content: req.body.content,
    createdAt: req.body.createdAt,
    }
})
res.status(201).json({
    message: "Comment update"
});
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})

routes.delete("/:commentId", async(req, res, next)=>{
    try{
const id = req.params.commentId;
await Comment.deleteOne({id: id})
res.status(200).json({
    message: "Comment delete"
})
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})
module.exports = routes