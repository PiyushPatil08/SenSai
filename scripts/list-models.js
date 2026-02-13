
const fs = require('fs');
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("GEMINI_API_KEY not found or undefined");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    console.log(`Fetching models to file...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        const data = await response.json();

        if (data.models) {
            const names = data.models.map(m => m.name).join('\n');
            fs.writeFileSync('scripts/models.txt', names);
            console.log("Wrote " + data.models.length + " models to scripts/models.txt");
        } else {
            console.log("No models found.");
        }
    } catch (error) {
        console.error("Error fetching models:", error.message);
    }
}

listModels();
