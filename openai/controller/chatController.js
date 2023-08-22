
const Chat = require('../model/chatModel');
const User = require('../model/userModel');
const axios = require('axios')
const apiKey = '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';




const sendMessageToChatGPT = async (req, res) => {
    try {
        const { userId, message } = req.body;
        console.log(userId, message)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant.',
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        console.log("this is the responce result", response.data.choices[0].message.content)
        const newChat = new Chat({ user: userId, question: message, answer: response.data.choices[0].message.content });
        await newChat.save();
        return res.json({question :message,response:response.data.choices[0].message.content});
    }
    catch (error) {
        res.status(error.response.status).json(
            { error_code :error.code,
              error_status_code: error.response.status,
             error_status_texte: error.response.statusText });
    }

};

module.exports = {
    sendMessageToChatGPT
};


