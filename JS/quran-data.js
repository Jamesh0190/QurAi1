// Sample Quran data structure
const quranData = {
    surahs: [
        { id: 1, name: "Al-Fatihah", arabicName: "الفاتحة", verses: 7, revelation: "Meccan", juz: 1 },
        { id: 2, name: "Al-Baqarah", arabicName: "البقرة", verses: 286, revelation: "Medinan", juz: 1 },
        { id: 3, name: "Ali 'Imran", arabicName: "آل عمران", verses: 200, revelation: "Medinan", juz: 3 },
        { id: 4, name: "An-Nisa'", arabicName: "النساء", verses: 176, revelation: "Medinan", juz: 4 },
        { id: 5, name: "Al-Ma'idah", arabicName: "المائدة", verses: 120, revelation: "Medinan", juz: 6 },
        { id: 6, name: "Al-An'am", arabicName: "الأنعام", verses: 165, revelation: "Meccan", juz: 7 },
        { id: 7, name: "Al-A'raf", arabicName: "الأعراف", verses: 206, revelation: "Meccan", juz: 8 },
        { id: 8, name: "Al-Anfal", arabicName: "الأنفال", verses: 75, revelation: "Medinan", juz: 9 },
        { id: 9, name: "At-Tawbah", arabicName: "التوبة", verses: 129, revelation: "Medinan", juz: 10 },
        { id: 10, name: "Yunus", arabicName: "يونس", verses: 109, revelation: "Meccan", juz: 11 },
        // More surahs would be included in a complete implementation
    ],
    verses: {
        1: [
            {
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                translations: {
                    sahih: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
                    pickthall: "In the name of Allah, the Beneficent, the Merciful.",
                    yusuf: "In the name of Allah, Most Gracious, Most Merciful."
                },
                transliteration: "Bismillah ir-Rahman ir-Raheem"
            },
            {
                arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                translations: {
                    sahih: "All praise is for Allah—Lord of all worlds,",
                    pickthall: "Praise be to Allah, the Lord of the Worlds,",
                    yusuf: "Praise be to Allah, the Cherisher and Sustainer of the Worlds;"
                },
                transliteration: "Al-hamdu lillahi rabbil 'alamin"
            },
            {
                arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
                translations: {
                    sahih: "the Entirely Merciful, the Especially Merciful,",
                    pickthall: "The Beneficent, the Merciful.",
                    yusuf: "Most Gracious, Most Merciful;"
                },
                transliteration: "Ar-Rahman ir-Raheem"
            },
            {
                arabic: "مَالِكِ يَوْمِ الدِّينِ",
                translations: {
                    sahih: "Master of the Day of Judgment.",
                    pickthall: "Master of the Day of Judgment,",
                    yusuf: "Master of the Day of Judgment."
                },
                transliteration: "Maliki yawmid-deen"
            },
            {
                arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                translations: {
                    sahih: "You alone we worship and You alone we ask for help.",
                    pickthall: "Thee (alone) we worship; Thee (alone) we ask for help.",
                    yusuf: "Thee do we worship, and Thine aid we seek."
                },
                transliteration: "Iyyaka na'budu wa iyyaka nasta'in"
            },
            {
                arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                translations: {
                    sahih: "Guide us to the Straight Path,",
                    pickthall: "Show us the straight path,",
                    yusuf: "Show us the straight way,"
                },
                transliteration: "Ihdinas-siratal mustaqim"
            },
            {
                arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
                translations: {
                    sahih: "the path of those You have blessed—not those You are displeased with, or those who are astray.",
                    pickthall: "The path of those whom Thou hast favoured; Not the (path) of those who earn Thine anger nor of those who go astray.",
                    yusuf: "The way of those on whom Thou hast bestowed Thy Grace, those whose (portion) is not wrath, and who go not astray."
                },
                transliteration: "Siratal-ladhina an'amta 'alayhim ghayril-maghdubi 'alayhim wa lad-dallin"
            }
        ],
        2: [
            {
                arabic: "الم",
                translations: {
                    sahih: "Alif, Lam, Meem.",
                    pickthall: "Alif. Lam. Mim.",
                    yusuf: "A.L.M."
                },
                transliteration: "Alif Lam Meem"
            },
            {
                arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
                translations: {
                    sahih: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
                    pickthall: "This is the Scripture whereof there is no doubt, a guidance for those who ward off (evil).",
                    yusuf: "This is the Book; in it is guidance sure, without doubt, to those who fear Allah;"
                },
                transliteration: "Dhalikal-kitabu la rayba fihi hudan lil-muttaqin"
            },
            // More verses would be included in a complete implementation
        ],
        // More surahs would be included in a complete implementation
    },
    juz: {
        1: {
            start: { surah: 1, ayah: 1 },
            end: { surah: 2, ayah: 141 }
        },
        2: {
            start: { surah: 2, ayah: 142 },
            end: { surah: 2, ayah: 252 }
        },
        // More juz would be included in a complete implementation
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quranData;
} else {
    window.quranData = quranData;
}