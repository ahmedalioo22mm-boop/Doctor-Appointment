/** @format */

import express from "express";
const router = express.Router();
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password,role='user' } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        messeage: "All fildes are requierd",
      });
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({
        messeage: "user already exist ",
      });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      role,
      password: hashPassword,
    });
    let token = jwt.sign({ email, id: newUser._id, role:newUser.role }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    return res
      .status(200)
      .json({ messeage: "user registered successfully", token, user:{
        name:newUser.name,
        email:newUser.email,
        role:newUser.role,
        id:newUser._id,
      }});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      messeage: "All fildes are requierd",
    });
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      messeage: "user not found",
    });
  const match =await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({
      messeage: "password not found",
    });
  const token = jwt.sign({ id: user._id, email, role:user.role }, process.env.SECRET_KEY, {
    expiresIn: "1w",
  });
       return res.status(201).json({message:"user Logged In successfully", token,user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }})

});

export default router;
