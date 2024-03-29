const mongoose = require("mongoose")

const commentsSchema = new mongoose.Schema({
    message:[{
        type:String,
        require:true
    }],
    task:{
        ref:"task",
        type:mongoose.Schema.Types.ObjectId,
        require: true
    },
    commentedBy:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
})

module.exports = mongoose.model("comments",commentsSchema)