
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
    console.log(`\nTesting model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, just checking connectivity.");
        console.log(`SUCCESS: ${modelName} responded:`, result.response.text());
        return true;
    } catch (error) {
        console.log(`FAILURE: ${modelName} - ${error.message}`);
        // console.log(JSOn.stringify(error, null, 2));
        return false;
    }
}

async function runTests() {
    // Candidates based on models.txt and common knowledge
    const candidates = [
        "gemini-2.0-flash-lite-preview-02-05",
        "gemini-2.0-flash-lite",
        "gemini-1.5-pro",
        "gemini-1.5-flash-8b",
        "gemini-2.5-flash",
        "gemini-pro"
    ];

    for (const m of candidates) {
        await testModel(m);
    }
}

runTests();
