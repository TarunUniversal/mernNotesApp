const express = require("express");
const { registerUser, authUser, updateuserProfile } = require("../controllers/user.js");
const { protect } = require("../middlewares/auth.js");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateuserProfile)

module.exports = router;