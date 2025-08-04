document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initApp();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
});

// Global variables
let currentSurah = 1;
let currentAyah = 1;
let currentScript = 'uthmani';
let currentTranslation = 'sahih';
let currentReciter = 'mishari';
let showTajweed = false;
let showTranslation = true;
let showTransliteration = false;
let isRecording = false;
let audioContext;
let mediaRecorder;
let audioChunks = [];

// Initialize the app
function initApp() {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Initialize audio context for recitation analysis
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    } catch (e) {
        console.error('Web Audio API is not supported in this browser');
    }
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
    
    // Quran controls
    document.getElementById('script-select').addEventListener('change', function(e) {
        currentScript = e.target.value;
        loadSurah(currentSurah);
    });
    
    document.getElementById('translation-select').addEventListener('change', function(e) {
        currentTranslation = e.target.value;
        loadSurah(currentSurah);
    });
    
    document.getElementById('reciter-select').addEventListener('change', function(e) {
        currentReciter = e.target.value;
    });
    
    document.getElementById('toggle-tajweed').addEventListener('click', function() {
        showTajweed = !showTajweed;
        this.classList.toggle('active');
        loadSurah(currentSurah);
    });
    
    document.getElementById('toggle-translation').addEventListener('click', function() {
        showTranslation = !showTranslation;
        this.classList.toggle('active');
        loadSurah(currentSurah);
    });
    
    document.getElementById('toggle-transliteration').addEventListener('click', function() {
        showTransliteration = !showTransliteration;
        this.classList.toggle('active');
        loadSurah(currentSurah);
    });
    
    // Navigation
    document.getElementById('surah-select').addEventListener('change', function(e) {
        currentSurah = parseInt(e.target.value);
        currentAyah = 1;
        loadSurah(currentSurah);
    });
    
    document.getElementById('juz-select').addEventListener('change', function(e) {
        const juz = parseInt(e.target.value);
        navigateToJuz(juz);
    });
    
    document.getElementById('prev-page').addEventListener('click', function() {
        navigatePage(-1);
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        navigatePage(1);
    });
    
    document.getElementById('jump-ayah').addEventListener('click', function() {
        const ayahInput = document.getElementById('ayah-input');
        const ayahNumber = parseInt(ayahInput.value);
        if (ayahNumber && ayahNumber > 0) {
            currentAyah = ayahNumber;
            loadSurah(currentSurah);
            ayahInput.value = '';
        }
    });
    
    // AI Recitation
    document.getElementById('start-recording').addEventListener('click', startRecording);
    document.getElementById('stop-recording').addEventListener('click', stopRecording);
    document.getElementById('play-verse').addEventListener('click', playCurrentVerse);
    
    // Demo recording
    document.getElementById('demo-record').addEventListener('click', function() {
        const feedbackPlaceholder = document.querySelector('.feedback-placeholder');
        feedbackPlaceholder.textContent = 'Listening...';
        
        // Simulate processing
        setTimeout(() => {
            feedbackPlaceholder.innerHTML = `
                <div class="demo-result">
                    <div class="demo-score">Accuracy: 92%</div>
                    <div class="demo-feedback-item">Good pronunciation, improve your madd</div>
                </div>
            `;
        }, 2000);
    });
    
    // Tafsir
    document.getElementById('load-tafsir').addEventListener('click', loadTafsir);
    
    // Tafsir tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab pane
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-tab`) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Arabic tools
    document.getElementById('analyze-word').addEventListener('click', analyzeArabicWord);
    
    // Vocabulary flashcards
    document.getElementById('prev-card').addEventListener('click', prevFlashcard);
    document.getElementById('next-card').addEventListener('click', nextFlashcard);
    document.getElementById('flip-card').addEventListener('click', flipFlashcard);
    
    // Reading plans
    document.querySelectorAll('.plan-card button').forEach(btn => {
        btn.addEventListener('click', function() {
            const planName = this.closest('.plan-card').querySelector('h3').textContent;
            startReadingPlan(planName);
        });
    });
    
    // Form submission
    document.querySelector('.subscribe-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            // In a real app, this would send the email to a backend
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        }
    });
}

// Load initial data
function loadInitialData() {
    // Populate surah dropdown
    const surahSelect = document.getElementById('surah-select');
    quranData.surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.id;
        option.textContent = `${surah.id}. ${surah.name} (${surah.arabicName})`;
        surahSelect.appendChild(option);
    });
    
    // Populate juz dropdown
    const juzSelect = document.getElementById('juz-select');
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Juz' ${i}`;
        juzSelect.appendChild(option);
    }
    
    // Populate tafsir surah dropdown
    const tafsirSurahSelect = document.getElementById('tafsir-surah-select');
    quranData.surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.id;
        option.textContent = `${surah.id}. ${surah.name}`;
        tafsirSurahSelect.appendChild(option);
    });
    
    // Load initial surah
    loadSurah(currentSurah);
    
    // Initialize vocabulary flashcards
    initFlashcards();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update icon
    document.getElementById('theme-toggle').innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
}

// Load surah content
function loadSurah(surahId) {
    const surah = quranData.surahs.find(s => s.id === surahId);
    if (!surah) return;
    
    const quranDisplay = document.getElementById('quran-display');
    quranDisplay.innerHTML = '';
    
    // Get verses for this surah
    const verses = quranData.verses[surahId] || [];
    
    // Create container for verses
    const surahContainer = document.createElement('div');
    surahContainer.className = 'surah-container';
    
    // Add surah header
    const surahHeader = document.createElement('div');
    surahHeader.className = 'surah-header';
    surahHeader.innerHTML = `
        <h2 class="arabic-text">${surah.arabicName}</h2>
        <h3>${surah.name}</h3>
        <p>${surah.verses} verses</p>
    `;
    surahContainer.appendChild(surahHeader);
    
    // Add verses
    verses.forEach((verse, index) => {
        const verseNumber = index + 1;
        const verseContainer = document.createElement('div');
        verseContainer.className = 'verse-container';
        
        // Apply tajweed coloring if enabled
        let arabicText = verse.arabic;
        if (showTajweed) {
            arabicText = applyTajweedColoring(arabicText);
        }
        
        verseContainer.innerHTML = `
            <div class="verse-header">
                <div class="verse-number">${verseNumber}</div>
                <div class="verse-actions">
                    <button onclick="playAyah(${surahId}, ${verseNumber})" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button onclick="bookmarkAyah(${surahId}, ${verseNumber})" title="Bookmark">
                        <i class="far fa-bookmark"></i>
                    </button>
                    <button onclick="shareAyah(${surahId}, ${verseNumber})" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            <div class="verse-text arabic-text">${arabicText}</div>
            ${showTranslation ? `<div class="verse-translation">${verse.translations[currentTranslation] || verse.translations.sahih}</div>` : ''}
            ${showTransliteration ? `<div class="verse-transliteration">${verse.transliteration || ''}</div>` : ''}
        `;
        
        surahContainer.appendChild(verseContainer);
    });
    
    quranDisplay.appendChild(surahContainer);
    
    // Update page info
    updatePageInfo();
}

// Apply tajweed coloring to Arabic text
function applyTajweedColoring(text) {
    // This is a simplified implementation
    // In a real app, this would use a comprehensive tajweed rule engine
    
    // Replace specific tajweed patterns with colored spans
    text = text.replace(/(بِسْمِ)/g, '<span class="tajweed-ghunnah">$1</span>');
    text = text.replace(/(الرَّحْمَٰنِ)/g, '<span class="tajweed-ikhfa">$1</span>');
    text = text.replace(/(الرَّحِيمِ)/g, '<span class="tajweed-idgham">$1</span>');
    
    return text;
}

// Update page info
function updatePageInfo() {
    // In a real app, this would calculate based on current position
    document.getElementById('page-info').textContent = `Page ${Math.floor(Math.random() * 604) + 1}`;
}

// Navigate to juz
function navigateToJuz(juz) {
    // In a real app, this would find the starting surah and ayah for the juz
    currentSurah = Math.ceil(juz * 2.5); // Simplified calculation
    currentAyah = 1;
    loadSurah(currentSurah);
}

// Navigate pages
function navigatePage(direction) {
    // In a real app, this would navigate to next/previous page
    // For now, just move to next/previous surah
    currentSurah += direction;
    if (currentSurah < 1) currentSurah = 1;
    if (currentSurah > 114) currentSurah = 114;
    
    currentAyah = 1;
    loadSurah(currentSurah);
}

// Play ayah audio
function playAyah(surahId, ayahNumber) {
    // In a real app, this would play the audio file for the specific ayah
    alert(`Playing Surah ${surahId}, Ayah ${ayahNumber} by ${currentReciter}`);
}

// Bookmark ayah
function bookmarkAyah(surahId, ayahNumber) {
    // In a real app, this would save to local storage or backend
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    // Check if already bookmarked
    const existingIndex = bookmarks.findIndex(b => b.surah === surahId && b.ayah === ayahNumber);
    
    if (existingIndex !== -1) {
        // Remove bookmark
        bookmarks.splice(existingIndex, 1);
        showNotification('Bookmark removed');
    } else {
        // Add bookmark
        bookmarks.push({ surah: surahId, ayah: ayahNumber });
        showNotification('Ayah bookmarked');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Share ayah
function shareAyah(surahId, ayahNumber) {
    // In a real app, this would open a share dialog
    const surah = quranData.surahs.find(s => s.id === surahId);
    const verse = quranData.verses[surahId]?.[ayahNumber - 1];
    
    if (surah && verse) {
        const shareText = `${surah.name} (${surahId}:${ayahNumber}) - ${verse.arabic}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quran Verse',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Verse copied to clipboard');
        }
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = 'var(--shadow-lg)';
    notification.style.zIndex = '1000';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// AI Recitation functions
function startRecording() {
    if (!audioContext) {
        alert('Audio recording is not supported in your browser');
        return;
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                analyzeRecitation(audioBlob);
            };
            
            mediaRecorder.start();
            isRecording = true;
            
            // Update UI
            document.getElementById('start-recording').classList.add('hidden');
            document.getElementById('stop-recording').classList.remove('hidden');
            
            // Show recording indicator
            showNotification('Recording started... Recite the verse');
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone. Please check permissions.');
        });
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        // Update UI
        document.getElementById('start-recording').classList.remove('hidden');
        document.getElementById('stop-recording').classList.add('hidden');
        
        // Stop all tracks
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
}

function analyzeRecitation(audioBlob) {
    // In a real app, this would send the audio to a backend for analysis
    // For now, we'll simulate the analysis
    
    showNotification('Analyzing your recitation...');
    
    // Simulate processing time
    setTimeout(() => {
        // Generate random scores for demo
        const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
        const fluency = Math.floor(Math.random() * 25) + 75; // 75-100%
        const tajweed = Math.floor(Math.random() * 35) + 65; // 65-100%
        
        // Update UI with results
        document.querySelector('.score-value:nth-child(1)').textContent = `${accuracy}%`;
        document.querySelector('.score-value:nth-child(2)').textContent = `${fluency}%`;
        document.querySelector('.score-value:nth-child(3)').textContent = `${tajweed}%`;
        
        // Generate feedback
        const feedbackList = document.querySelector('.feedback-list');
        feedbackList.innerHTML = '';
        
        // Add feedback items based on scores
        if (accuracy < 85) {
            addFeedbackItem('Some words were mispronounced. Focus on clear articulation.', 'fas fa-exclamation-circle');
        } else {
            addFeedbackItem('Good pronunciation of words!', 'fas fa-check-circle');
        }
        
        if (fluency < 85) {
            addFeedbackItem('Work on your flow and rhythm. Try to recite more smoothly.', 'fas fa-exclamation-circle');
        } else {
            addFeedbackItem('Good fluency and rhythm!', 'fas fa-check-circle');
        }
        
        if (tajweed < 80) {
            addFeedbackItem('Review tajweed rules, especially for madd and ghunnah.', 'fas fa-exclamation-circle');
        } else {
            addFeedbackItem('Good application of tajweed rules!', 'fas fa-check-circle');
        }
        
        // Add to history
        addToHistory(accuracy, fluency, tajweed);
        
        showNotification('Analysis complete!');
    }, 2000);
}

function addFeedbackItem(text, iconClass) {
    const feedbackList = document.querySelector('.feedback-list');
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'feedback-item';
    feedbackItem.innerHTML = `
        <i class="${iconClass} feedback-icon"></i>
        <span>${text}</span>
    `;
    feedbackList.appendChild(feedbackItem);
}

function addToHistory(accuracy, fluency, tajweed) {
    const historyList = document.querySelector('.history-list');
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const overallScore = Math.round((accuracy + fluency + tajweed) / 3);
    
    historyItem.innerHTML = `
        <div>
            <div>Recitation Practice</div>
            <div class="history-date">${dateStr}</div>
        </div>
        <div class="history-score">${overallScore}%</div>
    `;
    
    // Add to beginning of list
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    // Keep only last 5 items
    while (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

function playCurrentVerse() {
    // In a real app, this would play the current verse
    alert('Playing current verse for practice');
}

// Tafsir functions
function loadTafsir() {
    const surahId = parseInt(document.getElementById('tafsir-surah-select').value);
    const ayahNumber = parseInt(document.getElementById('tafsir-ayah-input').value);
    
    if (!ayahNumber || ayahNumber < 1) {
        showNotification('Please enter a valid ayah number');
        return;
    }
    
    const surah = quranData.surahs.find(s => s.id === surahId);
    const verse = quranData.verses[surahId]?.[ayahNumber - 1];
    
    if (!surah || !verse) {
        showNotification('Verse not found');
        return;
    }
    
    // Display the verse
    const verseDisplay = document.querySelector('.tafsir-verse');
    verseDisplay.innerHTML = `
        <div class="verse-header">
            <div class="verse-number">${ayahNumber}</div>
        </div>
        <div class="verse-text arabic-text">${verse.arabic}</div>
        <div class="verse-translation">${verse.translations[currentTranslation] || verse.translations.sahih}</div>
    `;
    
    // Load tafsir data
    loadTafsirData(surahId, ayahNumber);
}

function loadTafsirData(surahId, ayahNumber) {
    // Get selected sources
    const selectedSources = Array.from(document.querySelectorAll('.tafsir-sources input:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedSources.length === 0) {
        showNotification('Please select at least one tafsir source');
        return;
    }
    
    // Load AI summary
    loadTafsirSummary(surahId, ayahNumber);
    
    // Load classical sources
    loadClassicalTafsir(surahId, ayahNumber, selectedSources);
    
    // Load thematic analysis
    loadThematicAnalysis(surahId, ayahNumber);
    
    // Load cross references
    loadCrossReferences(surahId, ayahNumber);
}

function loadTafsirSummary(surahId, ayahNumber) {
    const summaryTab = document.getElementById('summary-tab');
    
    // In a real app, this would fetch from an AI service
    // For now, we'll use placeholder text
    summaryTab.innerHTML = `
        <h4>AI-Generated Summary</h4>
        <p>This verse discusses the importance of patience and trust in Allah's plan. It emphasizes that believers should remain steadfast during difficult times, as Allah's wisdom is beyond human comprehension.</p>
        <p>The verse uses powerful imagery to convey the transient nature of worldly hardships compared to the eternal reward that awaits those who persevere. It serves as a reminder that trials are a test of faith and an opportunity for spiritual growth.</p>
        <div class="scholar-verification">
            <i class="fas fa-certificate"></i>
            <span>Scholar-Verified Summary</span>
        </div>
    `;
}

function loadClassicalTafsir(surahId, ayahNumber, sources) {
    const sourcesTab = document.getElementById('sources-tab');
    sourcesTab.innerHTML = '';
    
    sources.forEach(source => {
        const sourceData = tafsirData[source]?.[surahId]?.[ayahNumber];
        
        if (sourceData) {
            const sourceDiv = document.createElement('div');
            sourceDiv.className = 'tafsir-source';
            sourceDiv.innerHTML = `
                <h4>${getSourceName(source)}</h4>
                <p>${sourceData}</p>
            `;
            sourcesTab.appendChild(sourceDiv);
        }
    });
    
    if (sourcesTab.children.length === 0) {
        sourcesTab.innerHTML = '<p>No tafsir available for the selected sources.</p>';
    }
}

function loadThematicAnalysis(surahId, ayahNumber) {
    const themesTab = document.getElementById('themes-tab');
    
    // In a real app, this would analyze themes related to the verse
    themesTab.innerHTML = `
        <h4>Thematic Analysis</h4>
        <div class="theme-cloud">
            <span class="theme-tag">Patience</span>
            <span class="theme-tag">Trust in Allah</span>
            <span class="theme-tag">Trials</span>
            <span class="theme-tag">Faith</span>
            <span class="theme-tag">Divine Wisdom</span>
            <span class="theme-tag">Reward</span>
        </div>
        <div class="theme-explanation">
            <p>This verse is primarily concerned with the theme of patience (Sabr) in the face of adversity. It connects to broader Quranic themes of divine wisdom and the purpose of trials in strengthening faith.</p>
            <p>The theme of patience appears over 90 times in the Quran, emphasizing its importance as a core virtue for believers. This verse specifically highlights patience as a means of drawing closer to Allah.</p>
        </div>
        <div class="related-verses">
            <h5>Related Verses on Patience:</h5>
            <ul>
                <li>Surah Al-Baqarah: 153 - "O you who have believed, seek help through patience and prayer..."</li>
                <li>Surah Az-Zumar: 10 - "Indeed, the patient will be given their reward without account."</li>
                <li>Surah Al-Imran: 200 - "O you who have believed, persevere and endure and remain stationed..."</li>
            </ul>
        </div>
    `;
}

function loadCrossReferences(surahId, ayahNumber) {
    const crossRefTab = document.getElementById('cross-ref-tab');
    
    // In a real app, this would find related verses and hadith
    crossRefTab.innerHTML = `
        <h4>Cross References</h4>
        <div class="cross-ref-section">
            <h5>Related Quranic Verses</h5>
            <ul>
                <li>
                    <strong>Surah Al-Ankabut: 2-3</strong>
                    <p>Do people think that they will be left alone because they say, "We believe" and will not be tested? But We have certainly tested those before them...</p>
                </li>
                <li>
                    <strong>Surah Ar-Rum: 60</strong>
                    <p>So be patient. Indeed, the promise of Allah is truth...</p>
                </li>
                <li>
                    <strong>Surah Yusuf: 90</strong>
                    <p>...And Allah is predominant over His affair, but most of the people do not know.</p>
                </li>
            </ul>
        </div>
        <div class="cross-ref-section">
            <h5>Related Hadith</h5>
            <ul>
                <li>
                    <strong>Sahih Bukhari 5645</strong>
                    <p>"Amazing is the affair of the believer, verily all of his affair is good and this is not for no one except the believer..."</p>
                </li>
                <li>
                    <strong>Sahih Muslim 2999</strong>
                    <p>"No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that."</p>
                </li>
            </ul>
        </div>
        <div class="cross-ref-section">
            <h5>Scholarly Commentary</h5>
            <p>Ibn Kathir relates that this verse was revealed during a period of severe persecution in Mecca, to comfort the believers and remind them of Allah's ultimate plan.</p>
        </div>
    `;
}

function getSourceName(source) {
    const sourceNames = {
        'ibn-kathir': 'Tafsir Ibn Kathir',
        'tabari': 'Tafsir Al-Tabari',
        'qurtubi': 'Al-Qurtubi',
        'jalalayn': 'Tafsir Al-Jalalayn'
    };
    
    return sourceNames[source] || source;
}

// Arabic tools functions
function analyzeArabicWord() {
    const wordInput = document.getElementById('arabic-word-input');
    const word = wordInput.value.trim();
    
    if (!word) {
        showNotification('Please enter an Arabic word');
        return;
    }
    
    const resultDiv = document.querySelector('.word-result');
    resultDiv.innerHTML = '<p>Analyzing...</p>';
    
    // Simulate processing
    setTimeout(() => {
        // In a real app, this would perform actual Arabic analysis
        const analysis = analyzeWordStructure(word);
        
        resultDiv.innerHTML = `
            <h4>Analysis for: ${word}</h4>
            <div class="word-breakdown">
                <h5>Root Word</h5>
                <div class="root-letters">
                    ${analysis.root.split('').map(letter => `<span class="root-letter">${letter}</span>`).join('')}
                </div>
                <p>Root: ${analysis.rootMeaning}</p>
            </div>
            <div class="word-morphology">
                <h5>Morphology</h5>
                <p>Pattern: ${analysis.pattern}</p>
                <p>Form: ${analysis.form}</p>
                <p>Part of Speech: ${analysis.pos}</p>
            </div>
            <div class="word-usage">
                <h5>Usage in Quran</h5>
                <p>Frequency: ${analysis.frequency} times</p>
                <div class="usage-examples">
                    ${analysis.examples.map(example => `
                        <div class="usage-example">
                            <p class="arabic-text">${example.verse}</p>
                            <p>${example.translation}</p>
                            <p><strong>${example.surah}:${example.ayah}</strong></p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }, 1000);
}

function analyzeWordStructure(word) {
    // This is a simplified analysis for demo purposes
    // In a real app, this would use proper Arabic morphology
    
    // Sample analysis for common words
    const analyses = {
        'كتاب': {
            root: 'ك-ت-ب',
            rootMeaning: 'to write',
            pattern: 'فِعَال',
            form: 'Form I verbal noun',
            pos: 'Noun',
            frequency: 230,
            examples: [
                {
                    verse: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ',
                    translation: 'This is the Book about which there is no doubt',
                    surah: 2,
                    ayah: 2
                },
                {
                    verse: 'كِتَابٌ أُنزِلَ إِلَيْكَ',
                    translation: 'A Book revealed to you',
                    surah: 7,
                    ayah: 2
                }
            ]
        },
        'رحمة': {
            root: 'ر-ح-م',
            rootMeaning: 'mercy, compassion',
            pattern: 'فِعْلَة',
            form: 'Form I verbal noun',
            pos: 'Noun',
            frequency: 114,
            examples: [
                {
                    verse: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
                    surah: 1,
                    ayah: 1
                },
                {
                    verse: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
                    translation: 'And My mercy encompasses all things',
                    surah: 7,
                    ayah: 156
                }
            ]
        }
    };
    
    // Return analysis for known words, or a default analysis
    return analyses[word] || {
        root: word.substring(0, 3).split('').join('-'),
        rootMeaning: 'Unknown root',
        pattern: 'Unknown pattern',
        form: 'Unknown form',
        pos: 'Unknown',
        frequency: 0,
        examples: []
    };
}

// Vocabulary flashcards
let currentFlashcard = 0;
let flashcardFlipped = false;
let flashcards = [];

function initFlashcards() {
    // In a real app, this would load from a database
    flashcards = [
        {
            arabic: 'كِتَابٌ',
            translation: 'Book',
            root: 'ك-ت-ب',
            example: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ'
        },
        {
            arabic: 'رَحْمَةٌ',
            translation: 'Mercy',
            root: 'ر-ح-م',
            example: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
        },
        {
            arabic: 'إِيمَانٌ',
            translation: 'Faith',
            root: 'أ-م-ن',
            example: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ'
        },
        {
            arabic: 'صَلَاةٌ',
            translation: 'Prayer',
            root: 'ص-ل-و',
            example: 'وَأَقِيمُوا الصَّلَاةَ'
        },
        {
            arabic: 'زَكَاةٌ',
            translation: 'Charity',
            root: 'ز-ك-و',
            example: 'وَآتُوا الزَّكَاةَ'
        }
    ];
    
    displayFlashcard();
}

function displayFlashcard() {
    if (flashcards.length === 0) return;
    
    const flashcard = document.querySelector('.flashcard');
    const card = flashcards[currentFlashcard];
    
    if (flashcardFlipped) {
        flashcard.innerHTML = `
            <div class="flashcard-back">
                <h3>${card.translation}</h3>
                <p>Root: ${card.root}</p>
                <p class="arabic-text">${card.example}</p>
            </div>
        `;
    } else {
        flashcard.innerHTML = `
            <div class="flashcard-front">
                <h2 class="arabic-text">${card.arabic}</h2>
                <p>Click to flip</p>
            </div>
        `;
    }
}

function prevFlashcard() {
    currentFlashcard = (currentFlashcard - 1 + flashcards.length) % flashcards.length;
    flashcardFlipped = false;
    displayFlashcard();
}

function nextFlashcard() {
    currentFlashcard = (currentFlashcard + 1) % flashcards.length;
    flashcardFlipped = false;
    displayFlashcard();
}

function flipFlashcard() {
    flashcardFlipped = !flashcardFlipped;
    displayFlashcard();
}

// Reading plans
function startReadingPlan(planName) {
    // In a real app, this would set up a personalized reading plan
    showNotification(`Started ${planName} plan!`);
    
    // Update progress dashboard
    updateProgressDashboard(planName);
}

function updateProgressDashboard(planName) {
    // In a real app, this would load actual progress data
    const statValues = document.querySelectorAll('.stat-value');
    
    // Update with sample data
    statValues[0].textContent = '7 days';
    statValues[1].textContent = '142';
    statValues[2].textContent = '87%';
    
    // Show notification
    showNotification(`Your progress for ${planName} has been updated`);
}

// Service Worker for offline mode
// This would be in a separate sw.js file
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}