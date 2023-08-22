

const axios = require('axios');

const apiKey = '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';
const { Configuration, OpenAIApi } = require("openai");


async function sendMessageToChatGPT(message) {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": message}],
      prompt: message,
      max_tokens: 7,
      temperature: 0,
    });
    
    console.log("response.data",response.data)
    return response.data.choices[0].message.content;
    }
    


module.exports = {
    sendMessageToChatGPT,
  };