
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
    console.log(`\nTesting model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, just checking connectivity.");
        console.log(`SUCCESS: ${modelName} responded:`, result.response.text());
        return true;
    } catch (error) {
        console.log(`FAILURE: ${modelName} - ${error.message}`);
        if (error.response) {
            // console.log(JSON.stringify(error.response, null, 2));
        }
        return false;
    }
}

async function runTests() {
    // Candidates based on models.txt and common knowledge
    const candidates = [
        "gemini-2.0-flash-lite-preview-02-05", // Often experimental/preview models have separate quotas?
        "gemini-2.0-flash-lite",
        "gemini-1.5-pro",
        "gemini-1.5-flash-8b", // Sometimes available
        "gemini-2.0-pro-exp-02-05", // If available
        "gemini-2.5-flash",
    ];

    for (const m of candidates) {
        await testModel(m);
    }
}

runTests();
