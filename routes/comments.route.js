const express = require("express")
const { createComment,getComment,updateComment,deleteComment } = require("../controllers/comments.controller")
const { isAuthenticUser } = require("../middleware/authenticate.User")

const router = express.Router()

router.route("/create-comment").post(isAuthenticUser,createComment)
router.route("/get-comments").get(isAuthenticUser,getComment)
router.route("/update-comment/:id").put(isAuthenticUser,updateComment)
router.route("/delete-comment/:id").delete(isAuthenticUser,deleteComment)

module.exports = router;