const express = require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Tag = require("../model/tag");

routes.post("/", async (req, res, next)=>{
try{
    const { name, slug } = req.body;
    
            const existingTag = await Tag.findOne({ name, slug });
            if (existingTag) {
                return res.status(400).json({ message: 'Tag and slug must be unique. This slug already exists.' });
            }
const tag = new Tag({
    name: req.body.name,
    slug: req.body.slug,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
})
await tag.save();
res.status(200).json({
message: "Create tag Sucessful"
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
const docs = await Tag.find().select()
res.status(200).json({
    count : docs.length,
    Tag: docs,
})
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})

routes.get("/:tagId",async (req, res, next)=>{
    try{
const id = req.params.tagId;
const doc = await Tag.findById(id)
if(doc){
res.status(200).json({
    tag: doc,
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
routes.patch("/:tagId", async(req, res, next)=>{
    try{
const id = req.params.tagId;
await Tag.updateOne({_id: id},{
    $set:{
        name: req.body.name,
    slug: req.body.slug,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    }
})
res.status(201).json({
    message: "Tag update"
});
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})

routes.delete("/:tagId", async(req, res, next)=>{
    try{
const id = req.params.tagId;
await Tag.deleteOne({id: id})
res.status(200).json({
    message: "Tag delete"
})
    }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
})

module.exports = routes