// content.js
// Function to extract reviews from the DOM
function scrapeReviews() {
    const reviews = [];
    // Example code to scrape reviews
    const reviewElements = document.querySelectorAll('.review');
    reviewElements.forEach(reviewElement => {
        const reviewText = reviewElement.querySelector('.review-text').textContent.trim();
        reviews.push({
            text: reviewText
        });
    });
    return reviews;
}

// Function to analyze sentiment using Azure Text Analytics
// Function to analyze sentiment using Azure Text Analytics
function analyzeSentiment(text) {
    const azureKey = '61935b881c694317ae3159b815c30725';
    const apiUrl = `https://eastus.api.cognitive.microsoft.com/text/analytics/v3.1/sentiment?opinionMining=true`;

    const requestBody = {
        documents: [
            { id: '1', language: 'en', text: text }
        ]
    };

    return fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': azureKey
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.documents) {
            const reviewsWithSentiment = data.documents.map(document => {
                const sentencesWithSentiment = document.sentences.map(sentence => {
                    const targetsWithSentiment = sentence.targets.map(target => ({
                        text: target.text,
                        sentiment: target.sentiment
                    }));
                    return targetsWithSentiment;
                }).flat();
                return sentencesWithSentiment;
            }).flat();
            return reviewsWithSentiment;
        } else {
            console.error('Error analyzing sentiment: Invalid response format', data);
            return null;
        }
    })
    .catch(error => {
        console.error('Error analyzing sentiment:', error);
        return null;
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'scrape_reviews') {
        const reviews = scrapeReviews();
        const promises = reviews.map(review => analyzeSentiment(review.text).then(sentiment => ({ ...review, sentiment })));
        Promise.all(promises).then(reviewsWithSentiment => {
            sendResponse({ reviews: reviewsWithSentiment });
        });
        return true; // Required for asynchronous response
    }
});







