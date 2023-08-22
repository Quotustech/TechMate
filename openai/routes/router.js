const express = require('express')
const router = express.Router();

const userController = require('../controller/userController')
const chatController = require('../controller/chatController')
// Create user
router.post('/createuser',userController.createUser)


// Create chat
router.post('/chat',chatController.sendMessageToChatGPT)




router.use((req, res) => {
    res.status(404).json({ error: 'URL not found' });
  });


module.exports = router;