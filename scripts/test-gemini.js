
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There isn't a direct listModels on genAI instance in some versions, 
    // it's often on the ModelManager or root.
    // Let's try to get a model and run a simple prompt first, catching the specific error struct.
    // Actually, to list models, we might need to use the REST API or check SDK docs.
    // version 0.21.0 might have a specific way.
    
    // Let's try to just run a generation with the current setup and see the full error object.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Attempting to generate content with gemini-1.5-flash...");
    const result = await model.generateContent("Hello, are you working?");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
    if (error.response) {
        console.error("Response:", JSON.stringify(error.response, null, 2));
    }
  }
}

listModels();
