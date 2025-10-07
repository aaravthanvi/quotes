// ============================================
// TRANSLATIONS
// ============================================

const translations = {
    en: {
        title: 'Quote Galaxy',
        subtitle: 'Explore wisdom from around the world',
        'cat-all': 'All Quotes',
        'cat-life': 'Life',
        'cat-love': 'Love',
        'cat-success': 'Success',
        'cat-inspire': 'Inspiration',
        'cat-wisdom': 'Wisdom',
        'cat-time': 'Time',
        'cat-change': 'Change',
        'cat-mind': 'Mind',
        'cat-dream': 'Dreams',
        back: 'Back to categories',
        'new-quote': 'New Quote',
        share: 'Share',
        loading: 'Loading...',
        offline: 'Offline mode',
        copied: 'Copied to clipboard!',
        viewed: 'quotes viewed'
    },
    hi: {
        title: 'कोट गैलेक्सी',
        subtitle: 'दुनिया भर से ज्ञान की खोज करें',
        'cat-all': 'सभी उद्धरण',
        'cat-life': 'जीवन',
        'cat-love': 'प्रेम',
        'cat-success': 'सफलता',
        'cat-inspire': 'प्रेरणा',
        'cat-wisdom': 'ज्ञान',
        'cat-time': 'समय',
        'cat-change': 'परिवर्तन',
        'cat-mind': 'मन',
        'cat-dream': 'सपने',
        back: 'श्रेणियों पर वापस जाएं',
        'new-quote': 'नया उद्धरण',
        share: 'साझा करें',
        loading: 'लोड हो रहा है...',
        offline: 'ऑफ़लाइन मोड',
        copied: 'क्लिपबोर्ड पर कॉपी किया गया!',
        viewed: 'उद्धरण देखे गए'
    },
    es: {
        title: 'Quote Galaxy',
        subtitle: 'Explora la sabiduría de todo el mundo',
        'cat-all': 'Todas las citas',
        'cat-life': 'Vida',
        'cat-love': 'Amor',
        'cat-success': 'Éxito',
        'cat-inspire': 'Inspiración',
        'cat-wisdom': 'Sabiduría',
        'cat-time': 'Tiempo',
        'cat-change': 'Cambio',
        'cat-mind': 'Mente',
        'cat-dream': 'Sueños',
        back: 'Volver a categorías',
        'new-quote': 'Nueva cita',
        share: 'Compartir',
        loading: 'Cargando...',
        offline: 'Modo sin conexión',
        copied: '¡Copiado al portapapeles!',
        viewed: 'citas vistas'
    },
    fr: {
        title: 'Quote Galaxy',
        subtitle: 'Explorez la sagesse du monde entier',
        'cat-all': 'Toutes les citations',
        'cat-life': 'Vie',
        'cat-love': 'Amour',
        'cat-success': 'Succès',
        'cat-inspire': 'Inspiration',
        'cat-wisdom': 'Sagesse',
        'cat-time': 'Temps',
        'cat-change': 'Changement',
        'cat-mind': 'Esprit',
        'cat-dream': 'Rêves',
        back: 'Retour aux catégories',
        'new-quote': 'Nouvelle citation',
        share: 'Partager',
        loading: 'Chargement...',
        offline: 'Mode hors ligne',
        copied: 'Copié dans le presse-papiers!',
        viewed: 'citations consultées'
    },
    de: {
        title: 'Quote Galaxy',
        subtitle: 'Entdecke Weisheit aus aller Welt',
        'cat-all': 'Alle Zitate',
        'cat-life': 'Leben',
        'cat-love': 'Liebe',
        'cat-success': 'Erfolg',
        'cat-inspire': 'Inspiration',
        'cat-wisdom': 'Weisheit',
        'cat-time': 'Zeit',
        'cat-change': 'Veränderung',
        'cat-mind': 'Geist',
        'cat-dream': 'Träume',
        back: 'Zurück zu Kategorien',
        'new-quote': 'Neues Zitat',
        share: 'Teilen',
        loading: 'Laden...',
        offline: 'Offline-Modus',
        copied: 'In Zwischenablage kopiert!',
        viewed: 'Zitate angesehen'
    },
    ja: {
        title: 'Quote Galaxy',
        subtitle: '世界中の知恵を探求する',
        'cat-all': 'すべての引用',
        'cat-life': '人生',
        'cat-love': '愛',
        'cat-success': '成功',
        'cat-inspire': 'インスピレーション',
        'cat-wisdom': '知恵',
        'cat-time': '時間',
        'cat-change': '変化',
        'cat-mind': '心',
        'cat-dream': '夢',
        back: 'カテゴリーに戻る',
        'new-quote': '新しい引用',
        share: '共有',
        loading: '読み込み中...',
        offline: 'オフラインモード',
        copied: 'クリップボードにコピーしました！',
        viewed: '引用を見た'
    },
    zh: {
        title: 'Quote Galaxy',
        subtitle: '探索来自世界各地的智慧',
        'cat-all': '所有引语',
        'cat-life': '生活',
        'cat-love': '爱',
        'cat-success': '成功',
        'cat-inspire': '灵感',
        'cat-wisdom': '智慧',
        'cat-time': '时间',
        'cat-change': '变化',
        'cat-mind': '思维',
        'cat-dream': '梦想',
        back: '返回类别',
        'new-quote': '新引语',
        share: '分享',
        loading: '加载中...',
        offline: '离线模式',
        copied: '已复制到剪贴板！',
        viewed: '已查看引语'
    }
};

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
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings');
const themeButtons = document.querySelectorAll('.theme-btn');
const languageSelect = document.getElementById('language-select');

let currentCategory = '';
let allQuotes = [];
let shownQuoteIds = [];
let currentLanguage = 'en';
let easterEggInput = '';

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
// DEVICE DETECTION
// ============================================

function detectDevice() {
    const ua = navigator.userAgent;
    let deviceType = 'Desktop';
    let os = 'Unknown';
    let browser = 'Unknown';
    
    // Detect device type
    if (/mobile/i.test(ua)) {
        deviceType = 'Mobile';
    } else if (/tablet|ipad/i.test(ua)) {
        deviceType = 'Tablet';
    }
    
    // Detect OS
    if (/windows/i.test(ua)) os = 'Windows';
    else if (/mac/i.test(ua)) os = 'macOS';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
    
    // Detect browser
    if (/firefox/i.test(ua)) browser = 'Firefox';
    else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Chrome';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
    else if (/edg/i.test(ua)) browser = 'Edge';
    else if (/opera|opr/i.test(ua)) browser = 'Opera';
    
    document.getElementById('device-type').textContent = `Type: ${deviceType}`;
    document.getElementById('device-os').textContent = `OS: ${os}`;
    document.getElementById('device-browser').textContent = `Browser: ${browser}`;
    
    // Apply device-specific adjustments
    if (deviceType === 'Mobile') {
        document.body.classList.add('mobile-layout');
    }
    
    return { deviceType, os, browser };
}

// ============================================
// THEME SYSTEM
// ============================================

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'vscode-dark';
    setTheme(savedTheme);
}

// ============================================
// LANGUAGE SYSTEM
// ============================================

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function detectLanguage() {
    const browserLang = navigator.language.split('-')[0];
    const savedLang = localStorage.getItem('language');
    return savedLang || (translations[browserLang] ? browserLang : 'en');
}

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
        quoteText.textContent = translations[currentLanguage].loading;
        quoteAuthor.textContent = '';
        statusMessage.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + translations[currentLanguage].loading;
        
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
        statusMessage.innerHTML = '<i class="fas fa-wifi-slash mr-2"></i>' + translations[currentLanguage].offline;
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
    
    statusMessage.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${shownQuoteIds.length} ${translations[currentLanguage].viewed}`;
}

// ============================================
// USER INTERFACE FUNCTIONS
// ============================================

function showQuoteSection() {
    categoriesSection.classList.add('hidden');
    quoteSection.classList.remove('hidden');
    quoteSection.classList.add('fade-enter');
    backBtn.focus();
}

function showCategoriesSection() {
    quoteSection.classList.add('hidden');
    categoriesSection.classList.remove('hidden');
    categoryButtons[0].focus();
}

function toggleSettings() {
    settingsPanel.classList.toggle('open');
    if (settingsPanel.classList.contains('open')) {
        closeSettingsBtn.focus();
    }
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
            statusMessage.innerHTML = '<i class="fas fa-check mr-2"></i>' + translations[currentLanguage].copied;
            setTimeout(() => {
                statusMessage.innerHTML = tempStatus;
            }, 2000);
        }).catch(() => {
            statusMessage.innerHTML = '<i class="fas fa-times mr-2"></i>Could not copy';
        });
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Easter egg detection
    easterEggInput += e.key.toLowerCase();
    if (easterEggInput.length > 10) {
        easterEggInput = easterEggInput.slice(-10);
    }
    
    if (easterEggInput.includes('rainbow')) {
        setTheme('rainbow');
        easterEggInput = '';
    } else if (easterEggInput.includes('matrix')) {
        setTheme('matrix');
        easterEggInput = '';
    } else if (easterEggInput.includes('retro')) {
        setTheme('retro');
        easterEggInput = '';
    }
    
    // Prevent shortcuts when typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        return;
    }
    
    // Settings toggle (S key)
    if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        toggleSettings();
    }
    
    // Escape key - Close settings or go back
    if (e.key === 'Escape') {
        e.preventDefault();
        if (settingsPanel.classList.contains('open')) {
            toggleSettings();
        } else if (!quoteSection.classList.contains('hidden')) {
            showCategoriesSection();
        }
    }
    
    // Back (B key)
    if ((e.key === 'b' || e.key === 'B') && !quoteSection.classList.contains('hidden')) {
        e.preventDefault();
        showCategoriesSection();
    }
    
    // New quote (Space or N key)
    if ((e.key === ' ' || e.key === 'n' || e.key === 'N') && !quoteSection.classList.contains('hidden')) {
        e.preventDefault();
        if (allQuotes.length > 0) {
            showQuoteFromCategory();
        } else {
            fetchAllQuotes();
        }
    }
    
    // Share (C key for Copy)
    if ((e.key === 'c' || e.key === 'C') && !quoteSection.classList.contains('hidden')) {
        e.preventDefault();
        shareQuote();
    }
    
    // Category shortcuts (1-9 keys)
    if (!quoteSection.classList.contains('hidden')) return;
    
    const numKey = parseInt(e.key);
    if (numKey >= 1 && numKey <= 9) {
        e.preventDefault();
        const buttons = Array.from(categoryButtons);
        if (buttons[numKey - 1]) {
            buttons[numKey - 1].click();
        }
    }
});

// ============================================
// EVENT LISTENERS
// ============================================

categoryButtons.forEach((button, index) => {
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

settingsBtn.addEventListener('click', () => {
    toggleSettings();
});

closeSettingsBtn.addEventListener('click', () => {
    toggleSettings();
});

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        setTheme(theme);
    });
});

languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// ============================================
// INITIALIZATION
// ============================================

console.log('✨ Quote Galaxy initialized!');

// Load theme
loadTheme();

// Detect and set language
const detectedLang = detectLanguage();
languageSelect.value = detectedLang;
setLanguage(detectedLang);

// Detect device
detectDevice();

// Load cached quotes
const cached = getCachedQuotes();
if (cached.length > 0) {
    allQuotes = cached;
    console.log('📦 Loaded', allQuotes.length, 'quotes from cache');
}

// Auto-detect seasonal theme on first visit
if (!localStorage.getItem('theme')) {
    const month = new Date().getMonth();
    let seasonalTheme = 'vscode-dark';
    
    if (month >= 2 && month <= 4) seasonalTheme = 'spring';
    else if (month >= 5 && month <= 7) seasonalTheme = 'summer';
    else if (month >= 8 && month <= 10) seasonalTheme = 'autumn';
    else seasonalTheme = 'winter';
    
    setTheme(seasonalTheme);
}
