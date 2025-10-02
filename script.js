// ============================================
// VARIABLE DECLARATIONS
// ============================================

// Get references to HTML elements we'll interact with
const categoriesSection = document.getElementById('categories');
const quoteSection = document.getElementById('quote-section');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const statusMessage = document.getElementById('status-message');
const quoteContainer = document.getElementById('quote-container');
const backBtn = document.getElementById('back-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');
const shareBtn = document.getElementById('share-btn');
const categoryButtons = document.querySelectorAll('.category-btn');

// Store the currently selected category
let currentCategory = '';

// Array to store IDs of quotes we've already shown (prevents repeats)
let shownQuoteIds = [];

// ============================================
// LOCAL STORAGE FUNCTIONS (For offline caching)
// ============================================

/**
 * Save quotes to browser's localStorage for offline access
 * This allows users to see previously fetched quotes even without internet
 */
function saveQuotesToCache(category, quotes) {
    try {
        // Get existing cached quotes or create empty object
        const cached = JSON.parse(localStorage.getItem('cachedQuotes') || '{}');
        
        // Add new quotes to the cache for this category
        if (!cached[category]) {
            cached[category] = [];
        }
        cached[category] = [...cached[category], ...quotes];
        
        // Save back to localStorage as a JSON string
        localStorage.setItem('cachedQuotes', JSON.stringify(cached));
    } catch (error) {
        // If storage is full or disabled, silently fail
        console.log('Could not save to cache:', error);
    }
}

/**
 * Retrieve cached quotes from localStorage
 */
function getCachedQuotes(category) {
    try {
        const cached = JSON.parse(localStorage.getItem('cachedQuotes') || '{}');
        return cached[category] || [];
    } catch (error) {
        return [];
    }
}

/**
 * Save the list of shown quote IDs so we don't repeat them
 */
function saveShownQuotes() {
    try {
        localStorage.setItem('shownQuotes_' + currentCategory, JSON.stringify(shownQuoteIds));
    } catch (error) {
        console.log('Could not save shown quotes:', error);
    }
}

/**
 * Load the list of previously shown quote IDs
 */
function loadShownQuotes() {
    try {
        const shown = localStorage.getItem('shownQuotes_' + currentCategory);
        shownQuoteIds = shown ? JSON.parse(shown) : [];
    } catch (error) {
        shownQuoteIds = [];
    }
}

// ============================================
// QUOTE FETCHING FUNCTIONS
// ============================================

/**
 * Fetch a random quote from the quotable.io API
 * The API provides free access to thousands of quotes
 */
async function fetchQuote(category) {
    try {
        // Show loading message
        quoteText.textContent = 'Loading inspiring quote...';
        quoteAuthor.textContent = '';
        statusMessage.textContent = '';
        
        // Build the API URL with optional tag parameter
        // Tags help filter quotes by category
        let apiUrl = 'https://api.quotable.io/random';
        if (category) {
            apiUrl += `?tags=${category}`;
        }
        
        // Make the API request
        const response = await fetch(apiUrl);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        // Convert response to JSON format
        const data = await response.json();
        
        // Check if we've already shown this quote
        if (shownQuoteIds.includes(data._id)) {
            // If yes, try to fetch another one
            // Recursive call - calls itself to get a new quote
            return fetchQuote(category);
        }
        
        // Add this quote ID to our "shown" list
        shownQuoteIds.push(data._id);
        saveShownQuotes();
        
        // Cache this quote for offline use
        saveQuotesToCache(category, [data]);
        
        // Display the quote
        displayQuote(data);
        
    } catch (error) {
        // If fetching fails, try to use cached quotes
        console.log('Fetch error:', error);
        loadCachedQuote(category);
    }
}

/**
 * Load a quote from cached data (for offline use)
 */
function loadCachedQuote(category) {
    const cachedQuotes = getCachedQuotes(category);
    
    // Filter out quotes we've already shown
    const availableQuotes = cachedQuotes.filter(q => !shownQuoteIds.includes(q._id));
    
    if (availableQuotes.length > 0) {
        // Pick a random quote from available cached quotes
        const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
        shownQuoteIds.push(randomQuote._id);
        saveShownQuotes();
        displayQuote(randomQuote);
        statusMessage.textContent = '📱 Showing cached quote (offline mode)';
    } else {
        // No quotes available
        quoteText.textContent = 'Unable to load quotes. Please check your internet connection.';
        quoteAuthor.textContent = '';
        statusMessage.textContent = '❌ No cached quotes available';
    }
}

/**
 * Display a quote on the screen with animation
 */
function displayQuote(data) {
    // Remove existing animation class
    quoteContainer.classList.remove('fade-in');
    
    // Trigger reflow to restart animation (browser trick)
    void quoteContainer.offsetWidth;
    
    // Add animation class back
    quoteContainer.classList.add('fade-in');
    
    // Update the text content
    quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
    
    // Show how many unique quotes have been viewed
    statusMessage.textContent = `✨ ${shownQuoteIds.length} unique quotes viewed in this category`;
}

// ============================================
// USER INTERFACE FUNCTIONS
// ============================================

/**
 * Show the quote display section and hide categories
 */
function showQuoteSection() {
    categoriesSection.classList.add('hidden');
    quoteSection.classList.remove('hidden');
}

/**
 * Show categories section and hide quote display
 */
function showCategoriesSection() {
    quoteSection.classList.add('hidden');
    categoriesSection.classList.remove('hidden');
}

/**
 * Share the current quote using the Web Share API
 * Falls back to clipboard copy if sharing is not supported
 */
function shareQuote() {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const shareText = `${quote}\n${author}\n\nShared from Quote Galaxy`;
    
    // Check if browser supports native sharing (mostly mobile)
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: shareText
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            statusMessage.textContent = '📋 Quote copied to clipboard!';
            setTimeout(() => {
                statusMessage.textContent = `✨ ${shownQuoteIds.length} unique quotes viewed`;
            }, 2000);
        });
    }
}

// ============================================
// EVENT LISTENERS (User interactions)
// ============================================

/**
 * Add click event to each category button
 */
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the category tag from the button's data attribute
        currentCategory = button.getAttribute('data-tag');
        
        // Load previously shown quotes for this category
        loadShownQuotes();
        
        // Switch to quote display view
        showQuoteSection();
        
        // Fetch and display a quote
        fetchQuote(currentCategory);
    });
});

/**
 * Back button - return to categories
 */
backBtn.addEventListener('click', () => {
    showCategoriesSection();
});

/**
 * New Quote button - fetch another quote
 */
newQuoteBtn.addEventListener('click', () => {
    fetchQuote(currentCategory);
});

/**
 * Share button - share the current quote
 */
shareBtn.addEventListener('click', () => {
    shareQuote();
});

// ============================================
// INITIALIZATION
// ============================================
console.log('Quote Galaxy initialized! ✨');
