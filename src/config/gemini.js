import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

async function main(prompt) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default main;