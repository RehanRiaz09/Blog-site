const mongoose = require("mongoose");
const tagSchema = mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, unique: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
})
module.exports = mongoose.model("Tag", tagSchema)