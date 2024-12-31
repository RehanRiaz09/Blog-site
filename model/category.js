const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
name: {type: String, unique: true, required: true},
slug: {type: String, unique: true, required: true},
createdAt: {type: Date, default: Date.now},
updatedAt:{type: Date, default: Date.now}
})
module.exports = mongoose.model("Category", categorySchema)