const express = require("express");
const {
    getUser,
    getUserFriends,
    addRemoveFriend
} = require("../controllers/user.js");

const {verifyToken} = require("../middleware/auth.js");
const router = express.Router();

/** Read **/
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

//Update
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);
module.exports=router;