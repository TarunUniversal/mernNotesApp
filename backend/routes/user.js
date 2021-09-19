const express = require("express");
const { registerUser, authUser, updateuserProfile, activateUser, forgotPassword, resetPassword } = require("../controllers/user.js");
const { protect } = require("../middlewares/auth.js");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/activate/:id").get(activateUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateuserProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id").put(resetPassword);

module.exports = router;