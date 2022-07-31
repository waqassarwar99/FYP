require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const userRouter = require("./Routes/userRoute");
const adminRouter = require("./Routes/adminRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/user", userRouter);
app.use("/admin", adminRouter);

// connecting mongo db
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true }, (error) => {
  if (error) throw error;
  console.log("MongoDb connected!");
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
