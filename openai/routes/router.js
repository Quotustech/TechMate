const express = require('express')
const router = express.Router();

const userController = require('../controller/userController')
// Create user
router.post('/createuser',userController.createUser)



router.use((req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });


module.exports = router;