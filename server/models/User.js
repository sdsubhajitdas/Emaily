const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  displayPictureLink: String,
});

mongoose.model("users", userSchema);
