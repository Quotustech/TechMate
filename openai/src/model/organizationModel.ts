import mongoose, { Document, Schema } from "mongoose";
import User, { IUser } from "./userModel";

interface IOrganization extends Document {
  orgCode: string;
  name: string;
  phoneNumber: number;
  email: string;
  password: string;
  apiKey?: string;
}

const organizationSchema: Schema<IOrganization> = new Schema(
  {
    orgCode: {
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

organizationSchema.pre<IOrganization>("save", async function (next) {
  try {
    if (!this.orgCode) {
      const firstThreeLetters = this.name.substring(0, 3).toUpperCase();
      const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      this.orgCode = `${firstThreeLetters}${randomNumber}`;
    }

    const user: IUser = new User({
      name: this.name,
      email: this.email,
      password: this.password,
      role: "admin",
      orgCode: this.orgCode,
    });
    await user.save();

    next();
  } catch (error: any) {
    console.error("User save error:", error);
    next(error);
  }
});

const Organization = mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);
export default Organization;
