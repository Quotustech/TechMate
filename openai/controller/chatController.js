
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
        return res.json({ question: message, response: response.data.choices[0].message.content });
    }
    catch (error) {
        res.status(error.response.status).json(
            {
                error_code: error.code,
                error_status_code: error.response.status,
                error_status_texte: error.response.statusText
            });
    }

};

const getChatByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const chat = await Chat.find({ user: userId }).exec();
        if (!chat) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(chat);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });

    }
};




module.exports = {
    sendMessageToChatGPT,
    getChatByUser
};


