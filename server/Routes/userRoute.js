const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const userMiddleware = require("../Middleware/userMiddleware");

router.post("/register", userController.register);
router.post("/registerSeller", userController.registerSeller);
router.post("/login", userController.login);
router.post("/sellerLogin", userController.sellerLogin);
router.post("/resetpassword", userMiddleware, userController.resetPassword);
router.get("/logout", userController.logout);
router.get("/detail", userMiddleware, userController.getUserInfo);
router.get("/update", userMiddleware, userController.updateUser);
router.post("/refreshToken", userController.getAccessToken);

module.exports = router;
