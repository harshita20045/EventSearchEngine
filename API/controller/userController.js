// 3rd
//date 12-3-25 REGISTRATION API
import '../config/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userSchemaModel from '../models/userModel.js';

const JWT_SECRET = "your_secret_key";

//  User Registration
export const save = async (req, res) => {
  try {
      var userExist = await userSchemaModel.findOne({ email: req.body.email });
      if (userExist) {
          return res.status(400).json({ "status": false, "error": "⚠ Email already registered!" });
      }

      var userList = await userSchemaModel.find();
      var len = userList.length;
      var _id = (len == 0) ? 1 : userList[len - 1]._id + 1;

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userDetail = { ...req.body, _id: _id, password: hashedPassword, status: 0, info: Date() };
      await userSchemaModel.create(userDetail);
      res.status(201).json({ "status": true, "message": "✅ Registration successful!" });
  } catch (err) {
      res.status(500).json({ "status": false, "error": err.message });
  }
};



// get user details
export const getUser = async (req, res) => {
    try {
      const user = await userSchemaModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ "error": "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ "error": "Failed to fetch user details" });
    }
  };

  // Update User
  export const updateUser = async (req, res) => {
    try {
      const updatedUser = await userSchemaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ "error": "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ "error": "Failed to update user" });
    }
  };

// for deleting user
export const deleteUser = async (req, res) => {
    try {
      const deletedUser = await userSchemaModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ "error": "User not found" });
      }
      res.status(200).json({ "message": "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ "error": "Failed to delete user" });
    }
  };

//  User & Admin Login
export const login = async (req, res) => {
    try {
      const user = await userSchemaModel.findOne({ email: req.body.email });
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ "error": "Invalid credentials" });
      }
      
      const token = jwt.sign(
        { email: user.email, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: "1h" }
      );
      
      res.status(200).json({ "token": token, "user": user });
    } catch (error) {
      res.status(500).json({ "error": "Login failed" });
    }
  };
  // Get user profile
const getUserProfile = async (req, res) => {
  const user = await userSchemaModel.findById(req.user.id);
  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Update profile
const updateUserProfile = async (req, res) => {
  const user = await userSchemaModel.findById(req.user.id);
  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
   

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
