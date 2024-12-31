const express = require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const multer = require("multer")
const Post = require("../model/post")
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads');
    },
    filename: (req, file,cb)=>{
        cb(null, Date.now()+ path.extname(file.originalname)); 
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});
// create the blog post
routes.post("/",upload.single('featureImage'), async(req, res, next)=>{
    try{
        const {title, content, author,featureImage, tags, categories, slug, published,} = req.body;
          const existingPost = await Post.findOne({ slug });
          if (existingPost) {
            return res.status(400).json({ message: 'Slug must be unique. This slug already exists.' });
          }
const post =  new Post({
    title:req.body.title,
        content:req.body.content ,
        author: req.body.author,
        featureImage: req.file ? req.file.path : null,
        tags: req.body.tags,
        categories: req.body.categories,
        slug: req.body.slug,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        published: req.body.published,
        publishedAt: req.body.publishedAt
})
await post.save();
res.status(200).json({
    message:"Craete the post sucessfully"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})
 
// get all the post

routes.get('/', async (req, res) => {
    try {
      const docs = await Post.find().populate('author', 'userName email')
      res.status(200).json({
        count: docs.length,
        Post: docs,
      });
    } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });

  // Get post by id
  routes.get("/:postId",async (req, res, next)=>{
    try{
const id = req.params.postId;
const doc = await Post.findById(id).populate('author', "userName email")
console.log(doc)
if(doc){
    res.status(200).json({
    post:doc,
    })
}else{
    res.status(404).json({
        message: "No valid entry found for this provide ID"
    })
}

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
  })
// Update the post

routes.patch("/:postId",async (req, res, next)=>{
    const id = req.params.postId;
    try{
const post = await Post.findById(id)
if(!post){
    return res.status(404).json({
        message: "Post not found"
    })
}
const result= await Post.findByIdAndUpdate({_id: id},{
    $set: {
        title:req.body.title,
        content:req.body.content ,
        author: req.body.author,
        featureImage: req.file ? req.file.path : null,
        tags: req.body.tags,
        categories: req.body.categories,
        slug: req.body.slug,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        published: req.body.published,
        publishedAt: req.body.publishedAt
    }
})
res.status(201).json({
    message: "Post update successfully"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
})
  // Delete the post
  routes.delete("/:postId", async (req, res, next)=>{
    try{
const result = await Post.deleteOne({id: id});
res.status(200).json({
    message: "Post Deleted"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
  })
module.exports = routes;