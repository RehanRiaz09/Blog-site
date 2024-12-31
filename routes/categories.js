const express = require("express")
const routes = express.Router();
const mongoose = require("mongoose")
const Category = require ("../model/category")
const path = require("path");

routes.post("/", async (req, res, next) => {
    try {
        const { name, slug } = req.body;

        const existingCategory = await Category.findOne({ name, slug });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category and slug must be unique. This slug already exists.' });
        }

        const category = new Category({
            name,
            slug,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        });

        const result = await category.save();
        console.log(result);

        res.status(200).json({
            message: "Created the category successfully",
            category: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    }
});

routes.get("/", async (req, res, next)=>{
    try{
        const docs = await Category.find().select()
        res.status(200).json({
            count: docs.length,
            Category: docs
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

routes.get("/:categoryId", async (req, res, next)=>{
    try{
        const id = req.params.categoryId;
        const doc = await Category.findById(id).select()
        console.log(doc);
        if(doc){
            res.status(200).json({
                category: doc,
            });
        }else{
            res.status(404).json({
                message: "No valid entry found for this provide ID",
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

routes.patch("/:categoryId", async(req, res, next)=>{
    try{
const id  = req.params.categoryId;
const { name, slug } = req.body;
const existingCategory = await Category.findOne({ name, slug });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category and slug must be unique. This slug already exists.' });
        } 
await Category.findByIdAndUpdate({_id: id},{
    $set:{
        name: req.body.name,
        slug: req.body.slug,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    }
})
res.status(201).json({
    message: "Update category"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

routes.delete("/:categoryId", async (req, res, next)=>{
    try{
const id = req.params.categoryId;
await Category.deleteOne({id: id})
res.status(200).json({
    message: "Category deleted"
})
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})
module.exports = routes;