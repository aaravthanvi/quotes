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

// Array to store quotes we've already shown (prevents repeats)
let shownQuotes = [];

// Store all fetched quotes for the current category
let categoryQuotes = [];

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
        
        // Save quotes for this category
        cached[category] = quotes;
        
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
 * Save the list of shown quotes so we don't repeat them
 */
function saveShownQuotes() {
    try {
        localStorage.setItem('shownQuotes_' + currentCategory, JSON.stringify(shownQuotes));
    } catch (error) {
        console.log('Could not save shown quotes:', error);
    }
}

/**
 * Load the list of previously shown quotes
 */
function loadShownQuotes() {
    try {
        const shown = localStorage.getItem('shownQuotes_' + currentCategory);
        shownQuotes = shown ? JSON.parse(shown) : [];
    } catch (error) {
        shownQuotes = [];
    }
}

// ============================================
// QUOTE FETCHING FUNCTIONS
// ============================================

/**
 * Fetch random quotes from ZenQuotes API
 * ZenQuotes provides 50 quotes per request and is completely free
 */
async function fetchQuotes(category) {
    try {
        // Show loading message
        quoteText.textContent = 'Loading inspiring quotes...';
        quoteAuthor.textContent = '';
        statusMessage.textContent = '';
        
        // ZenQuotes API endpoint - returns 50 quotes at once
        // No API key needed! Completely free
        const apiUrl = 'https://zenquotes.io/api/quotes';
        
        // Make the API request
        const response = await fetch(apiUrl);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        
        // Convert response to JSON format
        const data = await response.json();
        
        // Filter quotes by category if not "all"
        if (category !== 'all') {
            // Simple keyword matching for categories
            categoryQuotes = data.filter(quote => {
                const text = (quote.q + ' ' + quote.a).toLowerCase();
                return text.includes(category.toLowerCase()) || 
                       matchesCategory(quote.q, category);
            });
            
            // If no matches found, use all quotes
            if (categoryQuotes.length === 0) {
                categoryQuotes = data;
                statusMessage.textContent = '💫 Showing all quotes (no exact category match)';
            }
        } else {
            categoryQuotes = data;
        }
        
        // Cache the quotes for offline use
        saveQuotesToCache(category, categoryQuotes);
        
        // Display a random quote
        showRandomQuote();
        
    } catch (error) {
        // If fetching fails, try to use cached quotes
        console.log('Fetch error:', error);
        loadCachedQuote(category);
    }
}

/**
 * Helper function to match quotes with categories
 * Returns true if the quote relates to the category
 */
function matchesCategory(quoteText, category) {
    const keywords = {
        'inspirational': ['inspire', 'dream', 'believe', 'achieve', 'hope', 'faith'],
        'life': ['life', 'live', 'living', 'existence', 'journey'],
        'success': ['success', 'win', 'achieve', 'accomplish', 'goal', 'victory'],
        'happiness': ['happy', 'joy', 'smile', 'cheerful', 'delight', 'pleasure'],
        'love': ['love', 'heart', 'care', 'affection', 'compassion'],
        'wisdom': ['wise', 'wisdom', 'knowledge', 'learn', 'understand', 'think'],
        'motivation': ['motivate', 'action', 'move', 'start', 'begin', 'do'],
        'courage': ['courage', 'brave', 'fear', 'strong', 'bold', 'dare'],
        'change': ['change', 'transform', 'growth', 'evolve', 'become']
    };
    
    const categoryKeywords = keywords[category] || [];
    const text = quoteText.toLowerCase();
    
    return categoryKeywords.some(keyword => text.includes(keyword));
}

/**
 * Show a random quote from the fetched quotes
 * Ensures no repeats until all quotes are shown
 */
function showRandomQuote() {
    // Check if we've shown all quotes
    if (shownQuotes.length >= categoryQuotes.length) {
        // Reset shown quotes to start over
        shownQuotes = [];
        statusMessage.textContent = '🔄 All quotes viewed! Starting fresh...';
    }
    
    // Filter out already shown quotes
    const availableQuotes = categoryQuotes.filter(quote => 
        !shownQuotes.some(shown => shown.q === quote.q && shown.a === quote.a)
    );
    
    if (availableQuotes.length === 0) {
        // No quotes available
        quoteText.textContent = 'No more quotes available in this category.';
        quoteAuthor.textContent = '';
        return;
    }
    
    // Pick a random quote from available quotes
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    
    // Add to shown quotes
    shownQuotes.push(selectedQuote);
    saveShownQuotes();
    
    // Display the quote
    displayQuote(selectedQuote);
}

/**
 * Load a quote from cached data (for offline use)
 */
function loadCachedQuote(category) {
    const cachedQuotes = getCachedQuotes(category);
    
    if (cachedQuotes.length > 0) {
        categoryQuotes = cachedQuotes;
        showRandomQuote();
        statusMessage.textContent = '📱 Showing cached quotes (offline mode)';
    } else {
        // No quotes available
        quoteText.textContent = 'Unable to load quotes. Please check your internet connection.';
        quoteAuthor.textContent = '';
        statusMessage.textContent = '❌ No cached quotes available. Please connect to the internet.';
    }
}

/**
 * Display a quote on the screen with animation
 */
function displayQuote(quote) {
    // Remove existing animation class
    quoteContainer.classList.remove('fade-in');
    
    // Trigger reflow to restart animation (browser trick)
    void quoteContainer.offsetWidth;
    
    // Add animation class back
    quoteContainer.classList.add('fade-in');
    
    // Update the text content
    // ZenQuotes uses 'q' for quote text and 'a' for author
    quoteText.textContent = `"${quote.q}"`;
    quoteAuthor.textContent = `— ${quote.a}`;
    
    // Show how many unique quotes have been viewed
    statusMessage.textContent = `✨ ${shownQuotes.length} of ${categoryQuotes.length} quotes viewed`;
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
    const shareText = `${quote}\n${author}\n\n✨ From Quote Galaxy`;
    
    // Check if browser supports native sharing (mostly mobile)
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: shareText
        }).catch(err => console.log('Share cancelled'));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            const tempStatus = statusMessage.textContent;
            statusMessage.textContent = '📋 Quote copied to clipboard!';
            setTimeout(() => {
                statusMessage.textContent = tempStatus;
            }, 2000);
        }).catch(() => {
            statusMessage.textContent = '❌ Could not copy quote';
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
        // Get the category from the button's data attribute
        currentCategory = button.getAttribute('data-category');
        
        // Load previously shown quotes for this category
        loadShownQuotes();
        
        // Switch to quote display view
        showQuoteSection();
        
        // Fetch and display quotes
        fetchQuotes(currentCategory);
    });
});

/**
 * Back button - return to categories
 */
backBtn.addEventListener('click', () => {
    showCategoriesSection();
});

/**
 * New Quote button - show another random quote
 */
newQuoteBtn.addEventListener('click', () => {
    if (categoryQuotes.length > 0) {
        showRandomQuote();
    } else {
        // If no quotes loaded, fetch them again
        fetchQuotes(currentCategory);
    }
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
console.log('✨ Quote Galaxy initialized with ZenQuotes API!');
