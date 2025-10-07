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

function saveQuotesToCache(quotes) {
    try {
        localStorage.setItem('allQuotes', JSON.stringify(quotes));
    } catch (error) {
        console.log('Could not save to cache:', error);
    }
}

function getCachedQuotes() {
    try {
        const cached = localStorage.getItem('allQuotes');
        return cached ? JSON.parse(cached) : [];
    } catch (error) {
        return [];
    }
}

function saveShownQuotes() {
    try {
        localStorage.setItem('shownQuotes_' + currentCategory, JSON.stringify(shownQuoteIds));
    } catch (error) {
        console.log('Could not save shown quotes:', error);
    }
}

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

async function fetchAllQuotes() {
    try {
        quoteText.textContent = 'Loading quotes...';
        quoteAuthor.textContent = '';
        statusMessage.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        
        const apiUrl = 'https://dummyjson.com/quotes?limit=0';
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        
        const data = await response.json();
        allQuotes = data.quotes;
        
        saveQuotesToCache(allQuotes);
        showQuoteFromCategory();
        
    } catch (error) {
        console.log('Fetch error:', error);
        loadCachedQuotes();
    }
}

function loadCachedQuotes() {
    const cached = getCachedQuotes();
    
    if (cached.length > 0) {
        allQuotes = cached;
        showQuoteFromCategory();
        statusMessage.innerHTML = '<i class="fas fa-wifi-slash mr-2"></i>Offline mode';
    } else {
        quoteText.textContent = 'Unable to load quotes. Please check your internet connection.';
        quoteAuthor.textContent = '';
        statusMessage.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>No cached quotes';
    }
}

function quoteMatchesCategory(quote, category) {
    if (category === 'all') return true;
    
    const keywords = categoryKeywords[category] || [category];
    const quoteText = quote.quote.toLowerCase();
    
    return keywords.some(keyword => quoteText.includes(keyword.toLowerCase()));
}

function showQuoteFromCategory() {
    let filteredQuotes;
    
    if (currentCategory === 'all') {
        filteredQuotes = allQuotes;
    } else {
        filteredQuotes = allQuotes.filter(q => quoteMatchesCategory(q, currentCategory));
        
        if (filteredQuotes.length < 10) {
            filteredQuotes = allQuotes;
            statusMessage.innerHTML = '<i class="fas fa-sparkles mr-2"></i>Showing all quotes for variety';
        }
    }
    
    const availableQuotes = filteredQuotes.filter(q => !shownQuoteIds.includes(q.id));
    
    if (availableQuotes.length === 0) {
        shownQuoteIds = [];
        saveShownQuotes();
        return showQuoteFromCategory();
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    
    shownQuoteIds.push(selectedQuote.id);
    saveShownQuotes();
    
    displayQuote(selectedQuote);
}

function displayQuote(quote) {
    quoteContainer.classList.remove('quote-reveal');
    void quoteContainer.offsetWidth;
    quoteContainer.classList.add('quote-reveal');
    
    quoteText.textContent = quote.quote;
    quoteAuthor.textContent = `— ${quote.author}`;
    
    statusMessage.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${shownQuoteIds.length} quotes viewed`;
}

// ============================================
// USER INTERFACE FUNCTIONS
// ============================================

function showQuoteSection() {
    categoriesSection.classList.add('hidden');
    quoteSection.classList.remove('hidden');
    quoteSection.classList.add('fade-enter');
}

function showCategoriesSection() {
    quoteSection.classList.add('hidden');
    categoriesSection.classList.remove('hidden');
}

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
            const tempStatus = statusMessage.innerHTML;
            statusMessage.innerHTML = '<i class="fas fa-check mr-2"></i>Copied to clipboard!';
            setTimeout(() => {
                statusMessage.innerHTML = tempStatus;
            }, 2000);
        }).catch(() => {
            statusMessage.innerHTML = '<i class="fas fa-times mr-2"></i>Could not copy';
        });
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCategory = button.getAttribute('data-category');
        loadShownQuotes();
        showQuoteSection();
        
        if (allQuotes.length > 0) {
            showQuoteFromCategory();
        } else {
            fetchAllQuotes();
        }
    });
});

backBtn.addEventListener('click', () => {
    showCategoriesSection();
});

newQuoteBtn.addEventListener('click', () => {
    if (allQuotes.length > 0) {
        showQuoteFromCategory();
    } else {
        fetchAllQuotes();
    }
});

shareBtn.addEventListener('click', () => {
    shareQuote();
});

// ============================================
// INITIALIZATION
// ============================================
console.log('✨ Quote Galaxy initialized!');

const cached = getCachedQuotes();
if (cached.length > 0) {
    allQuotes = cached;
    console.log('📦 Loaded', allQuotes.length, 'quotes from cache');
}
