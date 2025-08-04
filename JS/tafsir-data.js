// Sample Tafsir data structure
const tafsirData = {
    'ibn-kathir': {
        1: {
            1: "Bismillah is the first verse of the Quran according to the majority of scholars, though some consider it a separate verse that opens every Surah except At-Tawbah. It signifies that we begin with the name of Allah before every action, seeking His blessings.",
            2: "Alhamdulillah is an expression of gratitude to Allah for all His blessings. The verse establishes that all praise belongs to Allah alone, who is the Lord of all that exists, emphasizing His sovereignty over creation.",
            3: "Ar-Rahman and Ar-Raheem are two of Allah's names derived from mercy. Ar-Rahman refers to Allah's vast mercy that encompasses all of creation, while Ar-Raheem refers to His special mercy for the believers in the Hereafter.",
            4: "This verse establishes Allah's sole ownership and authority over the Day of Judgment, when all creation will be held accountable for their deeds. It reminds believers of the ultimate reality they will face.",
            5: "This verse establishes the core principle of monotheism (Tawheed) - that worship and seeking help should be directed to Allah alone. It defines the purpose of human existence as worship of the Creator.",
            6: "This verse is a supplication for guidance to the Straight Path - Islam. It recognizes that humans are in need of divine guidance and cannot find the right path on their own.",
            7: "This verse describes the Straight Path as the path of those upon whom Allah has bestowed His favor - the prophets, the truthful, the martyrs, and the righteous. It contrasts this with those who have earned Allah's anger and those who are astray."
        },
        2: {
            1: "The letters Alif-Lam-Meem are among the disconnected letters (Al-Muqatta'at) that appear at the beginning of some Surahs. Their exact meaning is known only to Allah, though scholars have suggested various interpretations.",
            2: "This verse establishes the Quran as a book of guidance without doubt for those who have Taqwa (consciousness of Allah). It defines the purpose of the Quran as providing divine guidance to humanity."
        }
    },
    'tabari': {
        1: {
            1: "At-Tabari explains that Bismillah signifies seeking help through Allah's name and beginning actions with His mention. He cites various opinions on whether it's part of the first Surah or a separate verse that precedes each Surah.",
            2: "Alhamdulillah is explained as praise that encompasses all forms of praise for Allah, who is the Creator, Owner, and Disposer of all affairs. Tabari elaborates on the concept of Rabb (Lord) as indicating Allah's nurturing and sustaining of creation.",
            3: "Tabari provides extensive linguistic analysis of Ar-Rahman and Ar-Raheem, explaining how these names encompass different aspects of Allah's mercy. He cites numerous prophetic traditions about the significance of these names.",
            4: "Tabari discusses the concept of ownership (Mulk) in relation to the Day of Judgment, explaining how this verse establishes Allah's absolute authority over that Day when no one else will have any power or say.",
            5: "This verse is analyzed as establishing the exclusive right of Allah to be worshipped and the exclusive right of Allah to be sought for help. Tabari explains how this defines the relationship between Creator and creation.",
            6: "The request for guidance (Hidayah) is explained as seeking knowledge of the truth and ability to follow it. Tabari discusses how this supplication encompasses all aspects of guidance needed by humans.",
            7: "Tabari provides detailed analysis of who those upon whom Allah has bestowed favor are, citing various prophetic traditions and scholarly opinions. He explains the differences between those who have earned anger and those who are astray."
        },
        2: {
            1: "Tabari discusses the various scholarly opinions regarding the meaning of the disconnected letters like Alif-Lam-Meem. He presents multiple interpretations while emphasizing that their true meaning is known only to Allah.",
            2: "The concept of guidance (Hidayah) is extensively analyzed, with Tabari explaining how the Quran serves as a guide for those who have Taqwa - those who protect themselves from Allah's punishment by following His commands."
        }
    },
    'qurtubi': {
        1: {
            1: "Al-Qurtubi discusses the importance of beginning with Bismillah for all significant actions, citing numerous prophetic traditions. He explains how this practice brings blessings and success to the undertaking.",
            2: "The concept of praise (Hamd) is analyzed as being distinct from thanks (Shukr) - praise is for who Allah is, while thanks is for what He does. Al-Qurtubi explains how this verse establishes that all forms of praise belong to Allah alone.",
            3: "Al-Qurtubi provides a comprehensive explanation of Allah's mercy, discussing how Ar-Rahman and Ar-Raheem encompass different aspects of mercy. He cites verses and hadith that illustrate Allah's vast mercy.",
            4: "The concept of ownership (Mulk) is discussed in relation to divine justice. Al-Qurtubi explains how Allah's ownership on the Day of Judgment will be absolute, with no intercession except by His permission.",
            5: "This verse is analyzed as establishing the core of Islamic monotheism. Al-Qurtubi explains how worship ('Ibadah) encompasses all forms of obedience and devotion that should be directed exclusively to Allah.",
            6: "Al-Qurtubi discusses the Straight Path (Sirat al-Mustaqim) as Islam, which is the middle path between extremes. He explains how this supplication is one of the most comprehensive and important prayers.",
            7: "Al-Qurtubi provides detailed analysis of the two groups mentioned - those who have earned anger and those who are astray. He explains the differences between them and cites scholarly opinions on who they refer to."
        },
        2: {
            1: "Al-Qurtubi discusses the disconnected letters (Al-Muqatta'at) at length, presenting various scholarly opinions while emphasizing that their true meaning is known only to Allah. He explains how these letters demonstrate the miraculous nature of the Quran.",
            2: "The concept of Taqwa is extensively analyzed as being a comprehensive term that includes belief, righteous deeds, and avoiding what Allah has prohibited. Al-Qurtubi explains how this quality is necessary for benefiting from the Quran's guidance."
        }
    },
    'jalalayn': {
        1: {
            1: "Jalalayn provides a concise explanation that Bismillah means 'I begin with the name of Allah', and that it is a verse that opens every Surah except At-Tawbah, signifying seeking blessings through Allah's name.",
            2: "Alhamdulillah means 'all praise is for Allah' who is the Lord of all worlds, nurturing them with His blessings. This verse establishes that all forms of praise belong exclusively to Allah.",
            3: "Ar-Rahman (the Entirely Merciful) and Ar-Raheem (the Especially Merciful) are two names derived from mercy, with the former indicating vast mercy for all creation and the latter indicating special mercy for believers.",
            4: "Malik means Owner, and yawm ad-deen refers to the Day of Judgment when Allah will judge His creation. This verse establishes Allah's sole authority over that Day.",
            5: "This verse means 'You alone we worship and You alone we ask for help', establishing the core principle of monotheism that worship and seeking help should be directed exclusively to Allah.",
            6: "Ihdina means 'guide us', and as-sirat al-mustaqim means 'the Straight Path' which is Islam. This verse is a supplication for divine guidance to the right path.",
            7: "This verse explains the Straight Path as the path of those upon whom Allah has bestowed favor (the prophets, the truthful, the martyrs, and the righteous), not the path of those who have earned anger (the Jews) or those who are astray (the Christians)."
        },
        2: {
            1: "Jalalayn explains that Alif-Lam-Meem are among the disconnected letters whose meaning is known only to Allah, though they may indicate that the Quran is composed of such letters that Arabs use in their speech.",
            2: "This verse means 'This is the Book about which there is no doubt, a guidance for those conscious of Allah'. It establishes the Quran as a book of certain guidance for those who have Taqwa."
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = tafsirData;
} else {
    window.tafsirData = tafsirData;
}