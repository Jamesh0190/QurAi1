// Arabic morphology and analysis tools
const arabicTools = {
    // Arabic root database (simplified for demo)
    roots: {
        'كتب': {
            meaning: 'to write',
            forms: {
                'كِتَابٌ': { pos: 'noun', meaning: 'book', pattern: 'فِعَالٌ' },
                'مَكْتُوبٌ': { pos: 'adjective', meaning: 'written', pattern: 'مَفْعُولٌ' },
                'كَاتِبٌ': { pos: 'noun', meaning: 'writer', pattern: 'فَاعِلٌ' },
                'يَكْتُبُ': { pos: 'verb', meaning: 'he writes', pattern: 'يَفْعُلُ' }
            }
        },
        'رحم': {
            meaning: 'to have mercy',
            forms: {
                'رَحْمَةٌ': { pos: 'noun', meaning: 'mercy', pattern: 'فَعْلَةٌ' },
                'رَحِيمٌ': { pos: 'adjective', meaning: 'merciful', pattern: 'فَعِيلٌ' },
                'رَاحِمٌ': { pos: 'adjective', meaning: 'merciful', pattern: 'فَاعِلٌ' },
                'يَرْحَمُ': { pos: 'verb', meaning: 'he has mercy', pattern: 'يَفْعَلُ' }
            }
        },
        'علم': {
            meaning: 'to know',
            forms: {
                'عِلْمٌ': { pos: 'noun', meaning: 'knowledge', pattern: 'فِعْلٌ' },
                'عَلِيمٌ': { pos: 'adjective', meaning: 'knowing', pattern: 'فَعِيلٌ' },
                'عَالِمٌ': { pos: 'noun', meaning: 'scholar', pattern: 'فَاعِلٌ' },
                'يَعْلَمُ': { pos: 'verb', meaning: 'he knows', pattern: 'يَفْعَلُ' }
            }
        },
        'حكم': {
            meaning: 'to judge',
            forms: {
                'حُكْمٌ': { pos: 'noun', meaning: 'judgment', pattern: 'فُعْلٌ' },
                'حَكِيمٌ': { pos: 'adjective', meaning: 'wise', pattern: 'فَعِيمٌ' },
                'حَاكِمٌ': { pos: 'noun', meaning: 'judge', pattern: 'فَاعِلٌ' },
                'يَحْكُمُ': { pos: 'verb', meaning: 'he judges', pattern: 'يَفْعُلُ' }
            }
        }
    },
    
    // Function to extract root from an Arabic word
    extractRoot: function(word) {
        // This is a simplified implementation
        // In a real app, this would use proper Arabic morphology algorithms
        
        // Remove diacritics for matching
        const cleanWord = word.replace(/[\u064B-\u0652]/g, '');
        
        // Check for common patterns
        for (const root in this.roots) {
            // Check if the root is contained in the word
            if (cleanWord.includes(root)) {
                return root;
            }
            
            // Check for common forms
            const rootData = this.roots[root];
            for (const form in rootData.forms) {
                if (cleanWord === form.replace(/[\u064B-\u0652]/g, '')) {
                    return root;
                }
            }
        }
        
        // If no match found, try to extract possible root
        if (cleanWord.length >= 3) {
            // For words with 3 letters, return the word itself
            if (cleanWord.length === 3) {
                return cleanWord.split('').join('-');
            }
            
            // For longer words, extract possible 3-letter root
            // This is a very simplified approach
            if (cleanWord.length === 4) {
                // For 4-letter words, try removing first letter
                return cleanWord.substring(1).split('').join('-');
            } else if (cleanWord.length >= 5) {
                // For longer words, try letters 2,3,4
                return cleanWord.substring(1, 4).split('').join('-');
            }
        }
        
        // Return the first 3 letters as a fallback
        return cleanWord.substring(0, 3).split('').join('-');
    },
    
    // Function to analyze an Arabic word
    analyzeWord: function(word) {
        const root = this.extractRoot(word);
        const rootData = this.roots[root.replace(/-/g, '')];
        
        const analysis = {
            word: word,
            root: root,
            rootMeaning: rootData ? rootData.meaning : 'Unknown',
            pos: 'Unknown',
            pattern: 'Unknown',
            meaning: 'Unknown'
        };
        
        if (rootData) {
            // Check if the word matches any form in the root data
            const cleanWord = word.replace(/[\u064B-\u0652]/g, '');
            
            for (const form in rootData.forms) {
                if (cleanWord === form.replace(/[\u064B-\u0652]/g, '')) {
                    const formData = rootData.forms[form];
                    analysis.pos = formData.pos;
                    analysis.pattern = formData.pattern;
                    analysis.meaning = formData.meaning;
                    break;
                }
            }
        }
        
        return analysis;
    },
    
    // Function to get word frequency in Quran
    getWordFrequency: function(word) {
        // This is a simplified implementation
        // In a real app, this would search through a complete Quran database
        
        const cleanWord = word.replace(/[\u064B-\u0652]/g, '');
        
        // Sample frequency data
        const frequencies = {
            'الله': 2699,
            'رحمن': 57,
            'رحيم': 114,
            'كتاب': 230,
            'علم': 854,
            'حكم': 210,
            'صلاة': 99,
            'زكاة': 32,
            'صيام': 13,
            'حج': 10
        };
        
        return frequencies[cleanWord] || 0;
    },
    
    // Function to find verses containing a word
    findVersesWithWord: function(word, limit = 5) {
        // This is a simplified implementation
        // In a real app, this would search through a complete Quran database
        
        const cleanWord = word.replace(/[\u064B-\u0652]/g, '');
        
        // Sample verse data
        const verseData = {
            'الله': [
                { surah: 1, ayah: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
                { surah: 1, ayah: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
                { surah: 2, ayah: 163, text: 'وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ لَا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ' }
            ],
            'رحمن': [
                { surah: 1, ayah: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
                { surah: 55, ayah: 1, text: 'الرَّحْمَٰنُ' },
                { surah: 59, ayah: 22, text: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ' }
            ],
            'كتاب': [
                { surah: 2, ayah: 2, text: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ' },
                { surah: 10, ayah: 1, text: 'الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ' },
                { surah: 18, ayah: 1, text: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ' }
            ]
        };
        
        const verses = verseData[cleanWord] || [];
        return verses.slice(0, limit);
    },
    
    // Function to get grammar explanation
    getGrammarExplanation: function(word, context) {
        // This is a simplified implementation
        // In a real app, this would use proper Arabic grammar analysis
        
        const analysis = this.analyzeWord(word);
        
        let explanation = `The word "${word}" is a ${analysis.pos}.`;
        
        if (analysis.rootMeaning !== 'Unknown') {
            explanation += ` It is derived from the root "${analysis.root}" which means "${analysis.rootMeaning}".`;
        }
        
        if (analysis.pattern !== 'Unknown') {
            explanation += ` It follows the pattern "${analysis.pattern}".`;
        }
        
        if (analysis.meaning !== 'Unknown') {
            explanation += ` In this context, it means "${analysis.meaning}".`;
        }
        
        // Add context-specific grammar notes
        if (context && context.includes('في')) {
            explanation += ' The preposition "في" (in) indicates that this word is in a prepositional phrase.';
        }
        
        return explanation;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = arabicTools;
} else {
    window.arabicTools = arabicTools;
}