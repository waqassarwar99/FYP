const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController");
const adminMiddleware = require('../Middleware/adminMiddleware');

//User
router.get(
  "/userDetails",
  adminMiddleware,
  adminController.getUsersAllinfo
);
router.delete("/deleteUser/:id", adminMiddleware, adminController.deleteUser);

//COmplaints and Feedback
router.get("/viewComplaint", adminMiddleware, adminController.viewAllComplaint);
router.post('/addResponse', adminMiddleware, adminController.addResponse);
router.post('/viewResponse', adminMiddleware, adminController.viewResponse);

//Accept and Reject Requests of Seller
router.get('/viewRequests', adminMiddleware, adminController.viewRequests);
router.post('/acceptSeller', adminMiddleware, adminController.acceptSeller);
router.delete('/rejectSeller', adminMiddleware, adminController.rejectSeller);

module.exports = router;
