const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const userMiddleware = require("../Middleware/userMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/resetpassword", userMiddleware, userController.resetPassword);
router.get("/logout", userController.logout);
router.get("/detail", userMiddleware, userController.getUserInfo);
router.get("/update", userMiddleware, userController.updateUser);
router.post("/refreshtoken", userController.getAccessToken);

module.exports = router;
