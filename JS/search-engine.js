// Quran Search Engine
const quranSearch = {
    // Search index (simplified for demo)
    searchIndex: {
        // Theme-based index
        themes: {
            'mercy': [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 15, 17, 19, 23, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 39, 40, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 67, 73, 76, 89, 93, 94, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'patience': [2, 3, 8, 10, 11, 12, 13, 14, 16, 18, 20, 21, 22, 23, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'prayer': [2, 4, 5, 6, 7, 8, 9, 10, 11, 14, 17, 19, 20, 22, 23, 24, 29, 33, 42, 70, 73, 74, 76, 87, 98, 107, 110],
            'paradise': [2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 18, 19, 20, 22, 25, 29, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'charity': [2, 3, 5, 9, 10, 14, 17, 19, 21, 22, 24, 30, 33, 47, 57, 59, 63, 64, 73, 76, 90, 92, 98, 104, 107],
            'justice': [2, 4, 5, 6, 7, 10, 16, 17, 21, 38, 42, 49, 55, 57, 60, 65, 95, 98, 99, 104, 105],
            'faith': [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'guidance': [2, 3, 5, 6, 7, 10, 14, 16, 17, 18, 19, 20, 27, 28, 32, 34, 35, 39, 43, 44, 45, 46, 47, 51, 53, 54, 55, 56, 57, 61, 62, 64, 65, 67, 71, 72, 73, 74, 76, 79, 80, 81, 82, 83, 84, 85, 87, 89, 90, 92, 93, 94, 96, 97, 98, 99, 100, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]
        },
        
        // Word-based index (simplified)
        words: {
            'الله': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'رحمن': [1, 2, 13, 17, 19, 20, 21, 25, 26, 27, 36, 43, 50, 55, 59, 67, 78, 96, 114],
            'رحيم': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 18, 22, 24, 27, 28, 29, 30, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'كتاب': [2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'إيمان': [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
            'صلاة': [2, 4, 5, 6, 7, 8, 9, 11, 14, 17, 19, 20, 22, 23, 24, 29, 33, 42, 70, 73, 74, 87, 98, 107, 110],
            'زكاة': [2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]
        }
    },
    
    // Search by theme
    searchByTheme: function(theme) {
        return new Promise((resolve) => {
            // Simulate processing time
            setTimeout(() => {
                const surahs = this.searchIndex.themes[theme.toLowerCase()] || [];
                const results = surahs.map(surahId => {
                    const surah = quranData.surahs.find(s => s.id === surahId);
                    return {
                        surah: surah,
                        relevance: Math.random(), // Would be calculated based on relevance
                        verses: this.getSampleVerses(surahId, theme)
                    };
                });
                
                resolve(results);
            }, 500);
        });
    },
    
    // Search by word
    searchByWord: function(word) {
        return new Promise((resolve) => {
            // Simulate processing time
            setTimeout(() => {
                const surahs = this.searchIndex.words[word.toLowerCase()] || [];
                const results = surahs.map(surahId => {
                    const surah = quranData.surahs.find(s => s.id === surahId);
                    return {
                        surah: surah,
                        relevance: Math.random(), // Would be calculated based on frequency
                        verses: this.getVersesWithWord(surahId, word)
                    };
                });
                
                resolve(results);
            }, 500);
        });
    },
    
    // Advanced search with filters
    advancedSearch: function(query, filters = {}) {
        return new Promise((resolve) => {
            // Simulate processing time
            setTimeout(() => {
                let results = [];
                
                // Search by theme if query matches a theme
                if (this.searchIndex.themes[query.toLowerCase()]) {
                    results = results.concat(
                        this.searchIndex.themes[query.toLowerCase()].map(surahId => {
                            const surah = quranData.surahs.find(s => s.id === surahId);
                            return {
                                surah: surah,
                                type: 'theme',
                                relevance: Math.random(),
                                verses: this.getSampleVerses(surahId, query)
                            };
                        })
                    );
                }
                
                // Search by word if query matches a word
                if (this.searchIndex.words[query.toLowerCase()]) {
                    results = results.concat(
                        this.searchIndex.words[query.toLowerCase()].map(surahId => {
                            const surah = quranData.surahs.find(s => s.id === surahId);
                            return {
                                surah: surah,
                                type: 'word',
                                relevance: Math.random(),
                                verses: this.getVersesWithWord(surahId, query)
                            };
                        })
                    );
                }
                
                // Apply filters
                if (filters.revelation) {
                    results = results.filter(result => 
                        result.surah.revelation.toLowerCase() === filters.revelation.toLowerCase()
                    );
                }
                
                if (filters.juz) {
                    results = results.filter(result => 
                        result.surah.juz === parseInt(filters.juz)
                    );
                }
                
                // Sort by relevance
                results.sort((a, b) => b.relevance - a.relevance);
                
                // Limit results
                if (filters.limit) {
                    results = results.slice(0, parseInt(filters.limit));
                }
                
                resolve(results);
            }, 1000);
        });
    },
    
    // Get sample verses related to a theme
    getSampleVerses: function(surahId, theme) {
        // This is a simplified implementation
        // In a real app, this would return actual verses related to the theme
        
        const verses = quranData.verses[surahId] || [];
        const sampleCount = Math.min(2, verses.length);
        
        return verses.slice(0, sampleCount).map((verse, index) => ({
            number: index + 1,
            text: verse.arabic,
            translation: verse.translations.sahih,
            relevance: Math.random()
        }));
    },
    
    // Get verses containing a specific word
    getVersesWithWord: function(surahId, word) {
        // This is a simplified implementation
        // In a real app, this would search for the word in the verses
        
        const verses = quranData.verses[surahId] || [];
        const sampleCount = Math.min(2, verses.length);
        
        return verses.slice(0, sampleCount).map((verse, index) => ({
            number: index + 1,
            text: verse.arabic,
            translation: verse.translations.sahih,
            relevance: Math.random()
        }));
    },
    
    // Get search suggestions
    getSuggestions: function(query) {
        const suggestions = [];
        
        // Check for theme matches
        for (const theme in this.searchIndex.themes) {
            if (theme.includes(query.toLowerCase())) {
                suggestions.push({
                    text: theme,
                    type: 'theme'
                });
            }
        }
        
        // Check for word matches
        for (const word in this.searchIndex.words) {
            if (word.includes(query.toLowerCase())) {
                suggestions.push({
                    text: word,
                    type: 'word'
                });
            }
        }
        
        // Return top 5 suggestions
        return suggestions.slice(0, 5);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quranSearch;
} else {
    window.quranSearch = quranSearch;
}