import { Request, Response } from "express";
import Chat from "../model/chatModel";
import User from "../model/userModel";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.CHAT_GPT_API_KEY as string;
const apiUrl = process.env.CHAT_GPT_URL as string;
console.log("api key", apiKey);
console.log("api url", apiUrl);

export const sendMessageToChatGPT = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await axios.post(
      apiUrl,
      {
        model: "ft:gpt-3.5-turbo-0613:quotus::8cpyWwHb",
        messages: [
          {
            role: "system",
            content:
              "Techmate is a friendly chatbot that specializes in computer science topics and kindly declines non-technical questions",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const newChat = new Chat({
      user: userId,
      question: message,
      answer: response.data.choices[0].message.content,
    });

    await newChat.save();
    return res.json({
      question: message,
      response: response.data.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("++++");
    res.status(error.response.status).json({
      error_code: error.code,
      error_status_code: error.response.status,
      error_status_text: error.response.statusText,
    });
  }
};

export const getChatByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const chat = await Chat.find({ user: userId }).exec();
    if (!chat || chat.length === 0) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(chat);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};
