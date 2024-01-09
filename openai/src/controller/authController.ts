import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import Organization from "../model/organizationModel";

const secretKey = "TechMateSecret";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, orgId } = req.body;

    const existingOrg = await Organization.findOne({ orgId });
    if (!existingOrg) {
      return res.status(400).json({ message: "Invalid organization id" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      orgId,
    });

    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ savedUser, message: "User registered successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.errors, message: error._message });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });

    // check the user
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token, message: "User login successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
