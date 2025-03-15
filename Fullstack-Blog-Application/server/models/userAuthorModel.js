const mongoose = require("mongoose");

const userAuthorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { strict: "throw" }
);

const userAuthor = mongoose.model("userauthor", userAuthorSchema);

module.exports = userAuthor;
