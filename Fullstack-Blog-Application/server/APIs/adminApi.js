const exp = require("express");
const admin = require("../models/adminModel");
const userAuthor = require("../models/userAuthorModel");
const expressAsyncHandler = require("express-async-handler");
const adminApp = exp.Router();

adminApp.use(exp.json());

adminApp.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send({ message: "request successful" });
  })
);

adminApp.post(
  "/admincreate",
  expressAsyncHandler(async (req, res) => {
    const adminObj = req.body;

    // Check if email exists in userAuthor collection
    const existingUserAuthor = await userAuthor.findOne({
      email: adminObj.email,
    });
    if (existingUserAuthor) {
      return res.status(200).send({
        message: "Invalid Role",
        details: `This email is already registered as ${existingUserAuthor.role}. Please use a different email for admin role.`,
      });
    }

    // Check if email exists in admin collection
    const adminInDB = await admin.findOne({ email: adminObj.email });
    if (adminInDB) {
      // If trying to login as admin
      if (adminObj.role === adminInDB.role) {
        return res.status(200).send({
          message: "admin",
          payload: adminInDB,
        });
      }
      return res.status(200).send({
        message: "Invalid Role",
        details: "Invalid role for this email",
      });
    }

    // If email doesn't exist in either collection, create new admin
    const newAdmin = new admin(adminObj);
    const adminObject = await newAdmin.save();
    return res.status(201).send({
      message: "admin",
      payload: adminObject,
    });
  })
);

adminApp.get(
  "/getallusers",
  expressAsyncHandler(async (req, res) => {
    const allUsers = await userAuthor.find();
    res.status(200).send({ message: "all users", payload: allUsers });
  })
);

adminApp.get(
  "/getuser/:email",
  expressAsyncHandler(async (req, res) => {
    const email = req.params.email;
    const user = await userAuthor.findOne({ email: email });

    if (user) {
      res.status(200).send({ message: "user found", payload: user });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  })
);

adminApp.put(
  "/updateuser/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await userAuthor.findById(id);

    if (user) {
      const updatedUser = await userAuthor.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send({ message: "user updated", payload: updatedUser });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  })
);

module.exports = adminApp;
