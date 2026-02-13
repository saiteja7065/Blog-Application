const userAuthor = require("../models/userAuthorModel");
const admin = require("../models/adminModel");
const expressAsyncHandler = require("express-async-handler");

const createUserAuthor = expressAsyncHandler(async (req, res) => {
  const newUserAuthor = req.body;

  // First check if email exists in admin collection
  const adminInDB = await admin.findOne({ email: newUserAuthor.email });
  if (adminInDB) {
    // If trying to login as admin with same email
    if (newUserAuthor.role === "admin") {
      return res.status(200).send({
        message: "admin",
        payload: adminInDB,
      });
    }
    // If trying to login with different role
    return res.status(200).send({
      message: "Invalid Role",
      details:
        "This email is registered as admin. Please use a different email for other roles.",
    });
  }

  // Then check if email exists in userAuthor collection
  const userInDB = await userAuthor.findOne({ email: newUserAuthor.email });
  if (userInDB) {
    // If same role, allow login
    if (newUserAuthor.role === userInDB.role) {
      return res.status(200).send({
        message: userInDB.role,
        payload: userInDB,
      });
    }
    // If different role, prevent login
    return res.status(200).send({
      message: "Invalid Role",
      details: `This email is already registered as ${userInDB.role}. Please use a different email for other roles.`,
    });
  }

  // If email doesn't exist anywhere, create new user/author
  let newUserDoc = new userAuthor(req.body);
  let userDocSaved = await newUserDoc.save();
  return res.status(201).send({
    message: userDocSaved.role,
    payload: userDocSaved,
  });
});

module.exports = createUserAuthor;
