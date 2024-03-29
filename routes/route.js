const express = require("express")
const { createUser,getUser, loginUser,updateUser,deleteUser } = require("../controllers/user.controller")
const{ isAuthenticUser } = require("../middleware/authenticate.User")


const router = express.Router()

router.route("/register-users").post(createUser)
// router.route("/").post(createUser)
router.route("/get-users").get(isAuthenticUser,getUser)
router.route("/login-user").get(loginUser)
router.route("/update-user/:id").put(isAuthenticUser,updateUser)
router.route("/delete-user/:id").delete(isAuthenticUser,deleteUser)
module.exports = router