const mongoose = require("mongoose");

const vacationSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      max: 10000,
    },

    image: {
      type: String,
      default: "paris.jpg",
    },

    likes: {
      type: Number,
      default: 0,
    },

    // ✅ FIXED
    likedUsers: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vacation", vacationSchema);