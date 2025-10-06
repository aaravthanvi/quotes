// ============================================
// VARIABLE DECLARATIONS
// ============================================

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

let currentCategory = '';
let allQuotes = [];
let shownQuoteIds = [];

// Category keywords mapping - multiple keywords for better matching
const categoryKeywords = {
    'all': [],
    'life': ['life', 'live', 'living', 'exist', 'journey', 'experience'],
    'love': ['love', 'heart', 'compassion', 'kindness', 'care', 'affection'],
    'success': ['success', 'achieve', 'goal', 'accomplish', 'win', 'victory'],
    'inspire': ['inspire', 'inspiration', 'motivate', 'encourage', 'empower', 'aspire', 'dream', 'possibility', 'potential', 'greatness'],
    'wisdom': ['wisdom', 'wise', 'knowledge', 'learn', 'understand', 'truth'],
    'time': ['time', 'moment', 'past', 'future', 'present', 'today', 'tomorrow'],
    'change': ['change', 'transform', 'grow', 'evolve', 'adapt', 'different'],
    'mind': ['mind', 'think', 'thought', 'mental', 'consciousness', 'imagination'],
    'dream': ['dream', 'vision', 'hope', 'aspiration', 'wish', 'desire']
};

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================

/**
 * Save quotes to localStorage for offline access
 */
function saveQuotesToCache(quotes) {
    try {
        localStorage.setItem('allQuotes', JSON.stringify(quotes));
    } catch (error) {
        console.log('Could not save to cache:', error);
    }
}

/**
 * Get cached quotes from localStorage
 */
function getCachedQuotes() {
    try {
        const cached = localStorage.getItem('allQuotes');
        return cached ? JSON.parse(cached) : [];
    } catch (error) {
        return [];
    }
}

/**
 * Save shown quote IDs to prevent repeats
 */
function saveShownQuotes() {
    try {
        localStorage.setItem('shownQuotes_' + currentCategory, JSON.stringify(shownQuoteIds));
    } catch (error) {
        console.log('Could not save shown quotes:', error);
    }
}

/**
 * Load shown quote IDs for current category
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
 * Fetch all quotes from DummyJSON API
 * DummyJSON provides 1454 quotes completely free!
 */
async function fetchAllQuotes() {
    try {
        quoteText.textContent = 'Loading quotes...';
        quoteAuthor.textContent = '';
        statusMessage.textContent = '';
        
        // DummyJSON endpoint - get all quotes at once
        // limit=0 returns ALL available quotes (1454 quotes!)
        const apiUrl = 'https://dummyjson.com/quotes?limit=0';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        
        const data = await response.json();
        allQuotes = data.quotes;
        
        // Save to cache for offline use
        saveQuotesToCache(allQuotes);
        
        // Show a quote from selected category
        showQuoteFromCategory();
        
    } catch (error) {
        console.log('Fetch error:', error);
        // Try to load from cache
        loadCachedQuotes();
    }
}

/**
 * Load quotes from cache when offline
 */
function loadCachedQuotes() {
    const cached = getCachedQuotes();
    
    if (cached.length > 0) {
        allQuotes = cached;
        showQuoteFromCategory();
        statusMessage.textContent = '📱 Showing cached quotes (offline mode)';
    } else {
        quoteText.textContent = 'Unable to load quotes. Please check your internet connection.';
        quoteAuthor.textContent = '';
        statusMessage.textContent = '❌ No cached quotes available';
    }
}

/**
 * Check if quote matches any keyword in category
 */
function quoteMatchesCategory(quote, category) {
    if (category === 'all') return true;
    
    const keywords = categoryKeywords[category] || [category];
    const quoteText = quote.quote.toLowerCase();
    
    // Check if any keyword is in the quote
    return keywords.some(keyword => quoteText.includes(keyword.toLowerCase()));
}

/**
 * Filter and show a quote based on selected category
 */
function showQuoteFromCategory() {
    let filteredQuotes;
    
    // Filter quotes by category keyword
    if (currentCategory === 'all') {
        filteredQuotes = allQuotes;
    } else {
        // Search for category keywords in quote text
        filteredQuotes = allQuotes.filter(q => quoteMatchesCategory(q, currentCategory));
        
        // If less than 10 matches, show all quotes to ensure variety
        if (filteredQuotes.length < 10) {
            filteredQuotes = allQuotes;
            statusMessage.textContent = '💫 Showing all quotes for better variety';
        }
    }
    
    // Filter out quotes we've already shown
    const availableQuotes = filteredQuotes.filter(q => !shownQuoteIds.includes(q.id));
    
    // If we've shown all quotes, reset
    if (availableQuotes.length === 0) {
        shownQuoteIds = [];
        saveShownQuotes();
        return showQuoteFromCategory();
    }
    
    // Pick a random quote
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    
    // Mark as shown
    shownQuoteIds.push(selectedQuote.id);
    saveShownQuotes();
    
    // Display the quote
    displayQuote(selectedQuote);
}

/**
 * Display quote with fade-in animation
 */
function displayQuote(quote) {
    // Remove animation
    quoteContainer.classList.remove('fade-in');
    
    // Trigger reflow
    void quoteContainer.offsetWidth;
    
    // Add animation
    quoteContainer.classList.add('fade-in');
    
    // Update text
    quoteText.textContent = `"${quote.quote}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    
    // Update status
    const totalInCategory = currentCategory === 'all' ? allQuotes.length : 
        allQuotes.filter(q => quoteMatchesCategory(q, currentCategory)).length;
    
    statusMessage.textContent = `✨ ${shownQuoteIds.length} quotes viewed`;
}

// ============================================
// USER INTERFACE FUNCTIONS
// ============================================

/**
 * Show quote section, hide categories
 */
function showQuoteSection() {
    categoriesSection.classList.add('hidden');
    quoteSection.classList.remove('hidden');
}

/**
 * Show categories, hide quotes
 */
function showCategoriesSection() {
    quoteSection.classList.add('hidden');
    categoriesSection.classList.remove('hidden');
}

/**
 * Share quote via Web Share API or clipboard
 */
function shareQuote() {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const shareText = `${quote}\n${author}\n\n✨ From Quote Galaxy`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: shareText
        }).catch(err => console.log('Share cancelled'));
    } else {
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
// EVENT LISTENERS
// ============================================

/**
 * Category button clicks
 */
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.getAttribute('data-category');
        loadShownQuotes();
        showQuoteSection();
        
        // If quotes already loaded, show one
        // Otherwise fetch from API
        if (allQuotes.length > 0) {
            showQuoteFromCategory();
        } else {
            fetchAllQuotes();
        }
    });
});

/**
 * Back button
 */
backBtn.addEventListener('click', () => {
    showCategoriesSection();
});

/**
 * New quote button
 */
newQuoteBtn.addEventListener('click', () => {
    if (allQuotes.length > 0) {
        showQuoteFromCategory();
    } else {
        fetchAllQuotes();
    }
});

/**
 * Share button
 */
shareBtn.addEventListener('click', () => {
    shareQuote();
});

// ============================================
// INITIALIZATION
// ============================================
console.log('✨ Quote Galaxy initialized with DummyJSON API!');

// Pre-load quotes from cache on page load for faster experience
const cached = getCachedQuotes();
if (cached.length > 0) {
    allQuotes = cached;
    console.log('📦 Loaded', allQuotes.length, 'quotes from cache');
}
