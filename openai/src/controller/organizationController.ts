import { Request, Response } from "express";
import Organization from "../model/organizationModel";
import bcrypt from "bcryptjs";

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, apiKey, name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a name, email, and password for the organization.",
      });
    }

    // Check for an existing organization with the same email
    const existingOrganization = await Organization.findOne({ email });

    if (existingOrganization) {
      return res.status(400).json({
        success: false,
        message: "An organization with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organization = new Organization({
      apiKey,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await organization.save();

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      organization,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      // Duplicate key error
      return res.status(400).json({
        success: false,
        message: "An organization with this email already exists.",
      });
    }
    // Generic server error
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
