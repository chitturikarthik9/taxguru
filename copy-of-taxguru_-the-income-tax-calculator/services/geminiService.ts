
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure API_KEY is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are TaxGPT, a friendly and expert AI assistant specializing in Indian income tax rules. Your primary goal is to help users understand their tax obligations.
- Answer questions about Indian tax regimes (Old and New).
- Explain various tax deductions (like 80C, 80D, etc.).
- Guide users on how to use the provided tax calculator.
- Provide clear, concise, and easy-to-understand information.
- Do NOT provide financial advice, investment recommendations, or legal opinions. Stick strictly to explaining tax rules and calculations.
- If a question is outside the scope of Indian income tax, politely decline to answer.`,
  },
});


export const sendMessageToAI = async (message: string): Promise<string> => {
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini API:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
};