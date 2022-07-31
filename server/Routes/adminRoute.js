const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");
const adminMiddleware = require("../Middleware/adminMiddleware");
const userMiddleware = require("../Middleware/userMiddleware");

router.get(
  "/userDetails",
  adminMiddleware,
  userMiddleware,
  adminController.getUsersAllinfo
);
router.delete("/deleteUser/:id", adminController.deleteUser);
router.post("/addComplaint", complaintController.addComplaint);
router.get("/viewComplaint", complaintController.viewComplaint);
router.post('/addResponse', responseController.addResponse);
router.post('/viewResponse', responseController.viewSpecificResponse);


module.exports = router;
