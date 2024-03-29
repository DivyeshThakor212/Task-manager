const express = require("express")
const{ createTask,getTask,updateTask,deletetask,updateTaskStatus } = require("../controllers/task.contoller")
const { isAuthenticUser } = require("../middleware/authenticate.User");

const router = express.Router()

router.route("/create-task").post(isAuthenticUser,createTask)
router.route("/update-taskstatus/:id").put(isAuthenticUser,updateTaskStatus)
router.route("/get-task").get(getTask)
router.route("/update-task/:id").put(isAuthenticUser,updateTask)
router.route("/delete-task/:id").delete(isAuthenticUser,deletetask)
module.exports = router

