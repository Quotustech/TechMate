const organizationController = require("../controller/organizationController");
const express = require("express");
const router = express.Router();

router.post("/organizations", organizationController.createOrganization);

router.use((req, res) => {
  res.status(404).json({ error: "URL not found" });
});

module.exports = router;
