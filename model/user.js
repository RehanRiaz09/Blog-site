const mongoose =  require ("mongoose")
const userSchema  = mongoose.Schema({
    userName:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String,enumm: ['Admin', 'Author', 'Reader'], default: 'reader',},
    profileImage:{type: String},
    bio:{type: String, maxlength: 500},
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now},
})
module.exports = mongoose.model("User", userSchema)