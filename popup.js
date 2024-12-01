/*// popup.js

document.addEventListener('DOMContentLoaded', function() {
    var scrapeButton = document.getElementById('scrapeButton');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {action: 'scrape_reviews'}, function(response) {
                displayReviews(response.reviews);
            });
        });
    });
});

function displayReviews(reviews) {
    var reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // Clear previous reviews
    reviews.forEach(function(review) {
        var reviewElement = document.createElement('div');
        reviewElement.textContent = 'Rating: ' + review.rating + ', Review: ' + review.text;
        reviewContainer.appendChild(reviewElement);
    });
}*/
// popup.js
/*
document.addEventListener('DOMContentLoaded', function() {
    var scrapeButton = document.getElementById('scrapeButton');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {action: 'scrape_reviews'}, function(response) {
                if (response) {
                    displayReviews(response.reviews);
                } else {
                    console.error('Error scraping reviews.');
                }
            });
        });
    });
});

function displayReviews(reviews) {
    var reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // Clear previous reviews

    reviews.forEach(review => {
        var reviewElement = document.createElement('div');
        reviewElement.textContent = `Review: ${review.text}, Sentiment: ${review.sentiment}`;
        reviewContainer.appendChild(reviewElement);
    });
}
*/
document.addEventListener('DOMContentLoaded', function() {
    var scrapeButton = document.getElementById('scrapeButton');
    scrapeButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {action: 'scrape_reviews'}, function(response) {
                if (response) {
                    displayReviews(response.reviews);
                } else {
                    console.error('Error scraping reviews.');
                }
            });
        });
    });
});
/*
function displayReviews(reviews) {
    var reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // Clear previous reviews

    reviews.forEach(review => {
        review.sentiment.forEach(sentiment => {
            var aspectElement = document.createElement('div');
            aspectElement.textContent = sentiment.text;
            
            var thumbImage = document.createElement('img');
            if (sentiment.sentiment === 'positive') {
                thumbImage.src = 'green-thumb.png'; // Replace 'green_thumb_up_image.png' with the path to your green up thumb image
                thumbImage.alt = 'Positive'; // Optional: Set alt text for accessibility
            } else if (sentiment.sentiment === 'negative') {
                thumbImage.src = 'red-thumb.png'; // Replace 'red_thumb_down_image.png' with the path to your red down thumb image
                thumbImage.alt = 'Negative'; // Optional: Set alt text for accessibility
            }
            
            thumbImage.classList.add('thumb-image'); // Optional: Add a CSS class for styling
            aspectElement.appendChild(thumbImage);
            reviewContainer.appendChild(aspectElement);
        });
    });
}*/
function displayReviews(reviews) {
    var reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // Clear previous reviews

    reviews.forEach(review => {
        review.sentiment.forEach(sentiment => {
            var aspectElement = document.createElement('div');
            aspectElement.classList.add('review-item');

            var thumbImage = document.createElement('img');
            if (sentiment.sentiment === 'positive') {
                thumbImage.src = 'green-thumb.png'; // Replace 'green_thumb_up_image.png' with the path to your green up thumb image
                thumbImage.alt = 'Positive'; // Optional: Set alt text for accessibility
            } else if (sentiment.sentiment === 'negative') {
                thumbImage.src = 'red-thumb.png'; // Replace 'red_thumb_down_image.png' with the path to your red down thumb image
                thumbImage.alt = 'Negative'; // Optional: Set alt text for accessibility
            }
            thumbImage.classList.add('thumb-image');

            var aspectText = document.createElement('span');
            aspectText.textContent = sentiment.text;

            aspectElement.appendChild(thumbImage);
            aspectElement.appendChild(aspectText);

            reviewContainer.appendChild(aspectElement);
        });
    });
}
/*
function displayReviews(reviews) {
    var reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = ''; // Clear previous reviews

    reviews.forEach(review => {
        var reviewElement = document.createElement('div');
        var sentimentText = review.sentiment.map(target => `Text: ${target.text}, Sentiment: ${target.sentiment}`).join(', ');
        reviewElement.textContent = sentimentText;
        reviewContainer.appendChild(reviewElement);
    });
}
*/
