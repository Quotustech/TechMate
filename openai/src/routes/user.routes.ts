import express, { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controller/userController";

const router: Router = express.Router();

router.post("/createuser", createUser);

// Update user
router.put("/updateuser/:id", updateUser);

// Delete user
router.delete("/deleteuser/:id", deleteUser);

// Get all users
router.get("/users", getAllUsers);

// Get a specific user
router.get("/users/:id", getUserById);

export default router;
