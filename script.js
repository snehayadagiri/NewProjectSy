const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes From API
let apiQuotes = []; 

function showLoadingSpinner() {
    loader.hidden = false // we dont want to hide it 
    quoteContainer.hidden = true; //when loading we don't want to see anything except loading button
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true; //loader will be hidden
}

// Show new Quote
function newQuote(){
    try {
/*the reason we are calling loading again in this function is bcoz, under
    getQuote() it loads when the page loads, but after that it will be bypassed, inorder to make sure the loading function and loading icon works we add in here aswell

    But we actually won't see loading function becuase after fetch api call the Url in getQuotes function, the array will befrom local
    */
    showLoadingSpinner();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //dynamic assignment of the values for author and text that will be displayed on UI
    //to check if author field is blank form quote array and replace it with "UnKnown"
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    throw new Error('Oops something went wrong');
    }catch(error) {
        console.log(error);
        // getQuotes(); 
    }

}
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log('apiQuotes', apiQuotes[19]);
        newQuote();
    } catch(error) {
        
    }
}

//to tweet a quote
/*By Using this
    https://developer.x.com/en/docs/x-for-websites/tweet-button/guides/web-intent
    Prepoulate a tweet using quote text and quote author
    step 1:Use this link from above URL
    https://twitter.com/intent/tweet
    step 2: pass query params of text and pass template string that features our 
    quote and author values separated by a dash
*/

function tweetQuote() {
    /*The final URL will look like this:
    https://twitter.com/intent/tweet?text=Quote - Author
    */
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    //twitter window will be opened in new tab
    window.open(twitterUrl, '_blank')
}
//On Load of the page we wanted to run getQuotes()
getQuotes();


/**
 * To make tweetquote button work we are using Event Listeners
 */
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);