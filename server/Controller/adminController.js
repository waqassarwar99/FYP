const User = require("../Models/userModel");
const Seller = require('../Models/Seller');
const TempSeller = require('../Models/TempSeller');

exports.getUsersAllinfo = async (req, res) => {
  try {
    const user = await User.find().select("-password");

    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.viewAllComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.find({});

    res.json(complaint);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.addResponse = async (req, res) => {
  try {
    const { userId, complaintId, response } = req.body;
    const newResponse = new Response({
      userId,
      complaintId,
      response,
    });
    await newResponse.save();
    res.json({ msg: "Response has been Send" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.viewResponse = async (req, res) => {
  try {
    const { userId, complaintId } = req.body;
    const response = await Response.findOne({
      $and: [{ userId: userId }, { complaintId: complaintId }],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//Accept and Reject Seller
exports.viewRequests = async(req, res) => {
  try {
    const requests = await TempSeller.find();
    res.json(requests);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

exports.acceptSeller = async(req, res) => {
  try {
    const { id, name, email, password, cnic, phone, serviceType } = req.body;
    console.log(id)
    const seller = new Seller({
      name, email, password, cnic, phone, serviceType
    });
    await seller.save();
    await TempSeller.findByIdAndDelete(id);
    res.json("Your request has been accept");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

exports.rejectSeller = async(req, res) => {
  try {
    const id = req.params.id;
    await TempSeller.findByIdAndDelete(id);
    res.json("Your request is Rejected");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}