const User = require("../Models/userModel");

exports.getUsersAllinfo = async (req, res) => {
  try {
    console.log(req.user.id);
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
    console.log(userId, complaintId);
    const response = await Response.findOne({
      $and: [{ userId: userId }, { complaintId: complaintId }],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
