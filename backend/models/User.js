const mongoose = require("mongoose");

/*
  User Schema

  ✔ Stores user information
  ✔ Includes role (admin / user)
  ✔ Email must be unique
*/

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // prevents duplicate users
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

/*
  Export model
*/
module.exports = mongoose.model("User", userSchema);