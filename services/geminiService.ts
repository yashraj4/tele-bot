
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const simulateBotResponse = async (userInput: string, chatHistory: { role: 'user' | 'bot', text: string }[]) => {
  const systemInstruction = `
    You are simulating a Telegram Bot that uses a specific logic and template set.
    The logic is:
    1. If the user hasn't started or registered, ask them to /register.
    2. If the user says /start, greet them. If registered, use 'welcome_back' style. If not, use 'greeting'.
    3. If the user says /register, ask for a password.
    4. If the user asks for 'help', 'contact', or 'hours', use the following templates:
       - help: 'You can use this bot to check our services. Available keywords: help, contact, hours.'
       - contact: 'You can reach us at support@example.com or call +123456789.'
       - hours: 'We are open Monday to Friday, 9:00 AM - 6:00 PM.'
    5. Otherwise, use: 'I am sorry, I did not understand that. Try typing "help".'

    Current State Simulator:
    - User is considered registered if they have completed the /register flow in this chat history.
    - Always respond as the bot would (concise, Telegram-style).
  `;

  const contents = chatHistory.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Bot is offline.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with simulated backend.";
  }
};
