const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient("https://bitt.cognitiveservices.azure.com/", new AzureKeyCredential("61935b881c694317ae3159b815c30725"));

const documents = [
  "I did not like the restaurant. The food was too spicy.",
  "The restaurant was decorated beautifully. The atmosphere was unlike any other restaurant I've been to.",
  "The food was yummy. :)"
];

async function main() {
  const results = await client.analyzeSentiment(documents);

  for (const result of results) {
    if (result.error === undefined) {
      console.log("Overall sentiment:", result.sentiment);
      console.log("Scores:", result.confidenceScores);
    } else {
      console.error("Encountered an error:", result.error);
    }
  }
}

main();