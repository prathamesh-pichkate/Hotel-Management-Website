import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Route: api/users/register 
router.post("/register",[
    check("firstName","First Name is required").isString(),
    check("lastName","Last Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 6 or more character is required").isLength({
        min:6,
    }),
], async (req: Request, res: Response) => {

    // Used the validationResult to get the error while registering.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ message: errors.array() });
    }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User(req.body);
    await user.save();

    // Generate token with user ID in the payload
    const token = jwt.sign(
      { user_id: user._id }, // Use user._id instead of the whole user object
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    // Set the token as a cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 day
    });

    // Respond with success
    return res.status(200).json({ message: "User registered successfully", token });

  } catch (error) {
    console.error("Error in register route:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


export default router;
