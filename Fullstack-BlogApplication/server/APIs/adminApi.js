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

    // Validate required fields
    if (!adminObj.email || !adminObj.firstName) {
      return res.status(400).send({
        message: "Invalid Request",
        details: "Email and firstName are required fields",
      });
    }

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
    const newAdmin = new admin({
      ...adminObj,
      isActive: true,
      role: "admin" // Ensure role is set to admin
    });
    
    try {
      const adminObject = await newAdmin.save();
      return res.status(201).send({
        message: "admin",
        payload: adminObject,
      });
    } catch (error) {
      console.error("Error creating admin:", error);
      return res.status(500).send({
        message: "Error",
        details: "Failed to create admin account",
      });
    }
  })
);

adminApp.get(
  "/getallusers",
  expressAsyncHandler(async (req, res) => {
    try {
      const allUsers = await userAuthor.find();
      res.status(200).send({ message: "all users", payload: allUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send({ message: "Error", details: "Failed to fetch users" });
    }
  })
);

adminApp.get(
  "/getuser/:email",
  expressAsyncHandler(async (req, res) => {
    try {
      const email = req.params.email;
      
      // First check in admin collection
      const adminUser = await admin.findOne({ email: email });
      if (adminUser) {
        return res.status(200).send({ 
          message: "user found", 
          payload: adminUser 
        });
      }

      // Then check in userAuthor collection
      const user = await userAuthor.findOne({ email: email });
      if (user) {
        return res.status(200).send({ 
          message: "user found", 
          payload: user 
        });
      }

      res.status(404).send({ message: "user not found" });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send({ message: "Error", details: "Failed to fetch user" });
    }
  })
);

adminApp.put(
  "/updateuser/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      
      // First check in admin collection
      let user = await admin.findById(id);
      let collection = admin;
      
      // If not found in admin, check userAuthor collection
      if (!user) {
        user = await userAuthor.findById(id);
        collection = userAuthor;
      }

      if (user) {
        const updatedUser = await collection.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).send({ message: "user updated", payload: updatedUser });
      } else {
        res.status(404).send({ message: "user not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send({ message: "Error", details: "Failed to update user" });
    }
  })
);

module.exports = adminApp;
