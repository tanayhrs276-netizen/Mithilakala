import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signup user
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const userexist = await user.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // create user
    await user.create({
      name,
      email,
      password: hashpassword,
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const userexist = await user.findOne({ email });
    if (!userexist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // compare password
    const match = await bcrypt.compare(password, userexist.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: userexist._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: userexist._id,
        name: userexist.name,
        email: userexist.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};