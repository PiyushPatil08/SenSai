
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY not found or undefined");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    console.log(`Fetching models...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        const data = await response.json();

        if (data.models) {
            const flashModels = data.models.filter(m => m.name.includes("flash"));
            console.log("Found " + flashModels.length + " Flash models:");
            flashModels.forEach(m => console.log(m.name));

            const proModels = data.models.filter(m => m.name.includes("pro") && !m.name.includes("vision"));
            console.log("Found " + proModels.length + " Pro models (snippet):");
            proModels.slice(0, 5).forEach(m => console.log(m.name));

        } else {
            console.log("No models found.");
        }
    } catch (error) {
        console.error("Error fetching models:", error.message);
    }
}

listModels();
