const mongoose = require("mongoose");
const User = require("./userModel");

const organizationSchema = new mongoose.Schema(
  {
    orgId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

organizationSchema.pre("save", async function (next) {
  if (!this.orgId) {
    const firstThreeLetters = this.name.substring(0, 3).toUpperCase();
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    this.orgId = `${firstThreeLetters}${randomNumber}`;
  }
  const user = new User({
    name: this.name,
    email: this.email,
    password: this.password,
    role: "admin",
    orgId: this.orgId,
  });

  await user.save();

  next();
});

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
