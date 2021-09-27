const express = require("express");
const { registerUser, authUser, updateuserProfile, activateUser, forgotPassword, resetPassword, googleController } = require("../controllers/user.js");
const { protect } = require("../middlewares/auth.js");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/activate/:id").get(activateUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateuserProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id").put(resetPassword);
router.route("/googlelogin").post(googleController)

module.exports = router;