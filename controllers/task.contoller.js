const  taskModel= require("../models/task.model")
const {taskValidator} = require("../validators/task.validators")

//Create task
exports.createTask = async(req,res) => {
    try {
        const payload = req.body;
        payload.createdBy = req.user.user._id; // jo id pass na karavavi hoy to 
        
        const { error } = taskValidator.validate(payload)

        if(error){
            return res.status(500).json({
                message: "wrong validations",
                errors: error
            })
        }

        const task = await taskModel.create(payload)
      
        return res.status(200).send({
            succes: true,
            task
         })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            succes:false,
            message: "internal server error"
        })
    }
}

//Read tasks
exports.getTask = async(req,res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page-1) * limit
    const status = req.query.status
    const priority = req.query.priority
    const sortBy = req.query.sortBy
    const sortOrder = req.query.sortOrder
    
    try {

        const filter = {}
        const sort ={[sortBy]:sortOrder}
        if(status,priority){
            filter.status = status
            filter.priority = priority
        }

        const task = await taskModel.find(filter).skip(skip).limit(limit)/*.sort(sort)*/.populate({
            path: "assignedto",
            select: "name"
        }).populate({
            path: "createdBy",
            select: "name"
        })
        const totaTask = await taskModel.countDocuments()
        return res.status(200).send({
        succes: true,
        task,totaTask
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            succes:false,
            message: "internal server error"
        })
    }
}

//update task
exports.updateTask = async(req,res) => {

        let taskUpdate = await taskModel.findById(req.params.id);

        if(!taskUpdate){
            return res.status(200).json({status:false, message:"please provide correct id"})
        }

        taskUpdate = await taskModel.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        })

        res.status(200).json({
            succes:true,
            taskUpdate
        })
}
//update task status

exports.updateTaskStatus = async (req, res) => {
    try {
        
        const taskId = req.params.id;
        const { status, ...otherFields } = req.body;

        // Check if there are other fields in the request body
        if (Object.keys(otherFields).length > 0) {
            return res.status(400).json({ success: false, message: "You can only update the status field" });
        }

        // Find the task by ID
        let task = await taskModel.findById(taskId);

        // If task not found, return an error response
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Update only the status field
        task.status = status;

        // Save the updated task
        await task.save();

        // Return success response
        return res.status(200).json({ success: true, message: "Task status updated successfully", task });
    } catch (error) {
        // Handle errors
        console.error("Error updating task status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

  // Delete

  exports.deletetask = async (req, res) => {   
    let dlttask = await taskModel.findById(req.params.id);
  
    if(! dlttask){
        return res.status(200).json({status: false, message:"Please provide correct id"})
    }
  
    dlttask = await taskModel.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    });
  };