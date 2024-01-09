import express, { Router } from "express";
import { createOrganization } from "../controller/organizationController";

const router: Router = express.Router();

router.route("/organizations").post(createOrganization);

export default router;
