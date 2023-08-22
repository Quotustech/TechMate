const express = require('express');
const router = express.Router();
const chatController = require('../chat/chatController');

router.post('/chat', async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await chatController.sendMessageToChatGPT(message);
      res.json({ response });
    } catch (error) {
      // console.log(error)
      const statusCode = error.statusCode || 500; // Default to 500 if no statusCode is provided
      res.status(statusCode).json({ error: 'An error occurred while processing the request.the router' });
  }
  });
  
  module.exports = router;
