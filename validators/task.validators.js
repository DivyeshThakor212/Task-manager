const Joi = require("joi")

const taskValidator = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    description: Joi.string().required(),
    Comments: Joi.string(),
    assignedto: Joi.string(),
    createdBy: Joi.string().required(),
    status: Joi.string(),
    priority:Joi.string().required(),
    startDate:Joi.date().required(),
    endDate:Joi.date().required()
})

module.exports = {taskValidator}