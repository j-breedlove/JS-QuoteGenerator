const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Fisher Yates Shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
function displayQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  complete();
}

// Get Quotes from API
let apiQuotes = [];
async function getQuotes() {
  loading();
  const apiUrl =
    "https://jacintodesign.github.io/quotes-api/data/quotes.json\n";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    shuffleArray(apiQuotes);
    displayQuote();
  } catch (error) {
    // Catch Error Here
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", displayQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();
