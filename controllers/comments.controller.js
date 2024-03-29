const commentModel = require("../models/comments.model")

//Create
exports.createComment = async(req,res) => {
    try {
        const comment = await commentModel.create(req.body)
        return res.status(200).send({
            succes:true,
            comment
        })
    } catch (error) {
     console.log(error)   
     return res.status(500).send({
        succes:false,
        message:"internal server error"})
    }
}

//read
exports.getComment = async(req,res) => {
    try {
        const allComment = await commentModel.find(req.body).populate({
            path: "task",
            select: ["title","description","status"]
        }).populate({
            path: "commentedBy",
            select: ["name","dob"]
        })
        return res.status(200).send({
            succes:true,
            allComment
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            succes:false,
            message: "internal server error"
        })
    }
}

//update Comment

exports.updateComment = async(req,res) => {

    let comntUpdate = await commentModel.findById(req.params.id);

    if(!comntUpdate){
        return res.status(200).json({status:false, message:"please provide correct id"})
    }

    newUpdate = await commentModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })

    res.status(200).json({
        succes:true,
        newUpdate
    })
}

//Delete comment 

exports.deleteComment = async (req, res) => {   
    let comment = await commentModel.findById(req.params.id);
  
    if(!comment){
        return res.status(200).json({status: false, message:"Please provide correct id"})
    }
  
    comment = await commentModel.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    });
  };
