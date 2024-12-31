const mongoose = require ("mongoose")
const user = require("./user")
const postSchema = mongoose.Schema({
    title:{type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    featureImage: {type: String},
    tags: [{type: String}],
    categories: [{type: String}],
    slug: {type: String, unique: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    published: {type: Boolean, default: false},
    publishedAt: {type: Date}
})
module.exports = mongoose.model("Post", postSchema)