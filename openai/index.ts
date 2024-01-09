import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import organizationRoute from "./src/routes/organization.routes";
import chatRoutes from "./src/routes/chat.routes";
import userRoute from "./src/routes/user.routes";
import authRoute from "./src/routes/auth.routes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const DB = process.env.DATABASE_URL as string;

mongoose
  .connect(DB)
  .then(() => {
    // seedData()
    console.log("Database connected");
  })
  .catch((error: any) => console.log("no connection", error));

app.use(bodyParser.json());

app.use(cors());
app.use(authRoute);
app.use(organizationRoute);
app.use(chatRoutes);
app.use(userRoute);
app.use((req, res) => {
  console.log(`Received a request: ${req.method} ${req.url}`);
  res.status(404).json({ error: "URL not found ++++++" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
