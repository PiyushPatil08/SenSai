
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
    console.log("Testing with API Key:", apiKey.substring(0, 10) + "...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        console.log("Attempting to generate content with gemini-2.5-flash...");
        const result = await model.generateContent("Hello, are you working?");
        console.log("Success! Response:", result.response.text());
    } catch (error) {
        console.error("Error details:", error.message);
        if (error.response) {
            console.error("Full error response:", JSON.stringify(error.response, null, 2));
        } else {
            console.error("Error cause:", JSON.stringify(error, null, 2));
        }
    }
}

test();
