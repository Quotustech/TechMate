
const Chat = require('../model/chatModel');
const User = require('../model/userModel');
const apiKey = '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';




const sendMessageToChatGPT = async (req, res) =>{
    try{
        const { userId, message } = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        try{
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
              console.log("this is the responce result",response.data)
              const newChat = new Chat({ user: userId, question: message, answer:response.data.choices[0].message.content });
              await newChat.save();
              return res.json({ question: message, answer:response.data.choices[0].message.content });
              

        }
        catch (error) {
            console.log(error)
            const customError = new Error(' occurred while processing the request',error);
            customError.statusCode = 500; // Set the desired status code here
            throw customError;

        }

    }
    catch (error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


