const { string, date } = require("joi")
const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true,
        trim: true
    },
    description:{
        type:String,
        require:true,
        trim:true
    },
    Comments:{
        type:String
    },
    assignedto:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    createdBy:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    status:{
        type:String,
        enum:["complete","pending"]
    },
    priority:{
        type:String,
        enum:["higher","low","medium"],
        require:true
    },
    startDate:{
        type:Date,
        require:true
    },
    endDate:{
        type:Date,
        require:true
    }
})

module.exports = mongoose.model("task",taskSchema)