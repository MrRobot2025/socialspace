const express = require("express");
const {
        getFeedPosts,
        getUserPosts,
        likePost
    } = require("../controllers/posts.js");
const {verifyToken} =require("../controllers/auth.js");

const router = express.Router();

//Read
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);

//Update

router.patch("/:id/like",verifyToken,likePost);

module.exports = router;