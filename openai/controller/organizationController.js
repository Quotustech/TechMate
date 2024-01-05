const Organization = require("../model/organizationModel");
const bcrypt = require("bcryptjs");

const createOrganization = async (req, res) => {
  try {
    const { phoneNumber, apiKey, name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a name, email, and password for the organization.",
      });
    }

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
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteOrganization = (req, res) => {};
module.exports = { createOrganization, deleteOrganization };
