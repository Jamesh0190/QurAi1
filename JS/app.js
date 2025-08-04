import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Search, 
  BookOpen, 
  Mic, 
  MicOff, 
  Volume2, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Download,
  BookMarked,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Languages,
  Compass,
  Calculator,
  Calendar,
  ChevronRight,
  Star,
  Activity,
  Bookmark,
  Share2,
  Heart,
  PlayCircle,
  Clock,
  BarChart3,
  Trophy,
  Book,
  Headphones,
  MapPin,
  Filter,
  X
} from 'lucide-react';
import { 
  mockSurahs, 
  mockVerses, 
  mockReciters, 
  mockTranslations,
  mockUserProgress,
  mockTajweedRules,
  analyzeRecitation 
} from './data/mockData';

const AiQuranApp = () => {
  // State management
  const [currentView, setCurrentView] = useState('quran');
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProgress, setUserProgress] = useState(mockUserProgress);
  const [showTafsir, setShowTafsir] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState('sahih');
  const [tajweedMode, setTajweedMode] = useState(true);
  const [recitationAnalysis, setRecitationAnalysis] = useState(null);
  const [bookmarkedVerses, setBookmarkedVerses] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  // Audio management
  const audioRef = useRef(null);
  
  // Apply dark mode to body
  useEffect(() => {
    document.body.className = darkMode ? 'dark bg-gray-900' : 'bg-gray-50';
  }, [darkMode]);
  
  // Toggle bookmark for a verse
  const toggleBookmark = useCallback((verseId) => {
    setBookmarkedVerses(prev => 
      prev.includes(verseId) 
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
    );
  }, []);
  
  // Toggle playback
  const togglePlayback = useCallback(() => {
    setIsPlaying(!isPlaying);
    // Mock audio playback
    setTimeout(() => setIsPlaying(false), 3000);
  }, [isPlaying]);
  
  // Toggle recording
  const toggleRecording = useCallback(() => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const analysis = analyzeRecitation();
        setRecitationAnalysis(analysis);
      }, 3000);
    }
  }, [isRecording]);
  
  // Navigation Component
  const Navigation = () => (
    <nav className={`${darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-200'} border-b px-4 py-3 sticky top-0 z-50 shadow-sm`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-30"></div>
            <BookOpen className="w-8 h-8 text-emerald-600 relative z-10" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">AiQuran</h1>
          <span className="text-xs bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-2 py-1 rounded-full font-medium shadow-sm">BETA</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSearchModal(true)}
            className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} group`}
          >
            <Search className="w-5 h-5 group-hover:text-emerald-500 transition-colors" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} group`}
          >
            {darkMode ? 
              <Sun className="w-5 h-5 group-hover:text-yellow-400 transition-colors" /> : 
              <Moon className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
            }
          </button>
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <User className="w-5 h-5 text-indigo-500 relative z-10" />
            </div>
            <span className={`font-medium ${darkMode ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors`}>Muhammad A.</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-1 lg:space-x-4 mt-4 overflow-x-auto pb-1">
        {[
          { id: 'quran', label: 'Quran', icon: BookOpen },
          { id: 'recitation', label: 'AI Coach', icon: Mic },
          { id: 'memorization', label: 'Hifz Tracker', icon: Target },
          { id: 'progress', label: 'Progress', icon: TrendingUp },
          { id: 'tools', label: 'Tools', icon: Settings }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
              currentView === id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : darkMode 
                  ? 'text-gray-300 hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm lg:text-base font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  // Search Modal Component
  const SearchModal = () => (
    showSearchModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
        <div className={`w-full max-w-2xl rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 animate-fade-in`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Search Quran</h3>
            <button 
              onClick={() => setShowSearchModal(false)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search verses, topics, or themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 placeholder-gray-500'
              }`}
            />
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {['Patience', 'Forgiveness', 'Gratitude', 'Prayer', 'Charity', 'Hereafter'].map((tag, index) => (
                <button 
                  key={index}
                  onClick={() => setSearchQuery(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Filter by</h4>
            <div className="flex flex-wrap gap-2">
              {['Makki', 'Madani', 'Short Surahs', 'Stories', 'Paradise', 'Judgment Day'].map((filter, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveFilters(prev => 
                    prev.includes(filter) 
                      ? prev.filter(f => f !== filter)
                      : [...prev, filter]
                  )}
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1 ${
                    activeFilters.includes(filter)
                      ? 'bg-emerald-500 text-white'
                      : darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span>{filter}</span>
                  {activeFilters.includes(filter) && <X className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => setShowSearchModal(false)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Apply Search
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Quran Reader Component
  const QuranReader = () => (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Surah List */}
        <div className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-4 shadow-sm h-fit lg:sticky lg:top-24`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <BookMarked className="w-5 h-5 mr-2 text-emerald-500" />
              Surahs
            </h3>
            <div className="relative">
              <select 
                className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
              >
                <option>All Surahs</option>
                <option>Makki</option>
                <option>Madani</option>
              </select>
              <ChevronRight className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
          </div>
          
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {mockSurahs.map((surah) => (
              <button
                key={surah.id}
                onClick={() => setSelectedSurah(surah.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  selectedSurah === surah.id
                    ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-300 border text-emerald-900 dark:text-emerald-100 shadow-sm'
                    : darkMode
                      ? 'hover:bg-gray-700/50'
                      : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{surah.id}. {surah.name}</div>
                    <div className="text-lg text-right mt-1 arabic-text">{surah.arabicName}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {surah.verses} verses • {surah.type}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-2 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Verse Display */}
        <div className={`lg:col-span-3 ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-4 lg:p-6 shadow-sm`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">
                {mockSurahs.find(s => s.id === selectedSurah)?.name}
                <span className="text-lg ml-2 arabic-text">
                  {mockSurahs.find(s => s.id === selectedSurah)?.arabicName}
                </span>
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                {mockSurahs.find(s => s.id === selectedSurah)?.type} • {mockSurahs.find(s => s.id === selectedSurah)?.verses} verses
              </p>
            </div>
            
            <div className="flex flex-wrap items-start lg:items-center gap-3">
              <div className="relative">
                <select 
                  value={currentReciter} 
                  onChange={(e) => setCurrentReciter(Number(e.target.value))}
                  className={`appearance-none pl-3 pr-8 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                >
                  {mockReciters.map(reciter => (
                    <option key={reciter.id} value={reciter.id}>{reciter.name}</option>
                  ))}
                </select>
                <ChevronRight className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
              
              <button
                onClick={togglePlayback}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {mockVerses[selectedSurah]?.map((verse) => (
              <div 
                key={verse.id} 
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-md ${
                  selectedVerse === verse.id
                    ? 'border-emerald-300 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20'
                    : darkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedVerse(selectedVerse === verse.id ? null : verse.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-right">
                    <p className="verse-arabic text-emerald-900 dark:text-emerald-100 text-lg leading-relaxed">
                      {verse.arabic}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(verse.id);
                    }}
                    className={`p-1.5 rounded-full ${bookmarkedVerses.includes(verse.id) ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-200 dark:hover:bg-gray-700`}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarkedVerses.includes(verse.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 italic`}>
                  {verse.transliteration}
                </div>
                
                <div className="text-base mb-4 leading-relaxed">
                  {verse.translation}
                </div>
                
                {selectedVerse === verse.id && showTafsir && (
                  <div className={`mt-4 p-4 rounded-xl transition-all ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-emerald-500" />
                      Tafsir (Commentary)
                    </h4>
                    <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {verse.tafsir}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTafsir(!showTafsir);
                      }}
                      className={`text-sm px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {showTafsir ? 'Hide' : 'Show'} Tafsir
                    </button>
                    <button className={`text-sm px-3 py-1.5 rounded-lg flex items-center space-x-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <PlayCircle className="w-4 h-4" />
                      <span>Play Audio</span>
                    </button>
                    <button className={`text-sm px-3 py-1.5 rounded-lg flex items-center space-x-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    {selectedSurah}:{verse.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Recitation Coach Component
  const RecitationCoach = () => (
    <div className="max-w-5xl mx-auto p-4 lg:p-6">
      <div className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <div className="relative mr-3">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-30"></div>
              <Mic className="w-6 h-6 text-red-500 relative z-10" />
            </div>
            AI Recitation Coach
          </h2>
          <span className="text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full font-medium">NEW</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-white'} shadow-sm`}>
            <h3 className="font-bold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-emerald-500" />
              Practice Verse
            </h3>
            <div className="text-right mb-4">
              <p className="verse-arabic text-emerald-900 dark:text-emerald-100 text-2xl leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic mb-2`}>
              Bismillah-ir-Rahman-ir-Raheem
            </p>
            <p className="text-sm">
              In the name of Allah, the Most Gracious, the Most Merciful.
            </p>
            
            <div className="mt-4 flex items-center space-x-3">
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Headphones className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <ChevronRight className="w-5 h-5 rotate-90" />
              </button>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <ChevronRight className="w-5 h-5 -rotate-90" />
              </button>
            </div>
          </div>
          
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-white'} shadow-sm`}>
            <h3 className="font-bold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Live Analysis
            </h3>
            {recitationAnalysis ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Overall Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{width: `${recitationAnalysis.score}%`}}
                      ></div>
                    </div>
                    <span className="text-xl font-bold text-emerald-600">{recitationAnalysis.score}%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'Pronunciation', value: recitationAnalysis.pronunciation, color: 'bg-blue-500' },
                    { name: 'Rhythm', value: recitationAnalysis.rhythm, color: 'bg-purple-500' },
                    { name: 'Makharij', value: recitationAnalysis.makharij, color: 'bg-orange-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{width: `${item.value}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {['Pronunciation', 'Rhythm', 'Makharij'].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                      <span className="text-sm text-gray-400">--</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mb-8">
          <button
            onClick={toggleRecording}
            className={`flex items-center space-x-3 mx-auto px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 ${
              isRecording 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/20 pulse-recording' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            <span>{isRecording ? 'Stop Recording' : 'Start Practice'}</span>
          </button>
          
          {isRecording && (
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                AI is analyzing your recitation...
              </p>
            </div>
          )}
        </div>
        
        {recitationAnalysis && (
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border border-blue-200 dark:border-blue-800 fade-in`}>
            <h3 className="font-bold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              AI Feedback
            </h3>
            <div className="space-y-3">
              {recitationAnalysis.feedback.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2">Recommendations</h4>
              <div className="flex flex-wrap gap-2">
                {['Practice Makharij Al-Halq', 'Focus on Madd Asli', 'Review Ghunnah rules'].map((rec, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Memorization Tracker Component
  const MemorizationTracker = () => (
    <div className="max-w-5xl mx-auto p-4 lg:p-6">
      <div className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <div className="relative mr-3">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-30"></div>
              <Target className="w-6 h-6 text-purple-500 relative z-10" />
            </div>
            Hifz Tracker
          </h2>
          <span className="text-xs bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded-full font-medium">POPULAR</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-2xl text-center hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-emerald-900/20 to-teal-900/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50'}`}>
            <div className="relative mx-auto w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-30"></div>
              <Award className="w-16 h-16 mx-auto text-emerald-500 relative z-10" />
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-1">{userProgress.versesMemorized}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Verses Memorized</div>
          </div>
          
          <div className={`p-6 rounded-2xl text-center hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
            <div className="relative mx-auto w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
              <TrendingUp className="w-16 h-16 mx-auto text-blue-500 relative z-10" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{userProgress.accuracy}%</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy Rate</div>
          </div>
          
          <div className={`p-6 rounded-2xl text-center hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-orange-900/20 to-amber-900/20' : 'bg-gradient-to-br from-orange-50 to-amber-50'}`}>
            <div className="relative mx-auto w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-30"></div>
              <Calendar className="w-16 h-16 mx-auto text-orange-500 relative z-10" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">{userProgress.streak}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</div>
          </div>
        </div>
        
        <div className={`p-6 rounded-2xl mb-6 ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-white'} shadow-sm`}>
          <h3 className="text-lg font-bold mb-4">Current Goal: {userProgress.currentGoal.surah}</h3>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{userProgress.currentGoal.progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full progress-bar" 
                style={{width: `${userProgress.currentGoal.progress}%`}}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>{userProgress.currentGoal.versesCompleted}/{userProgress.currentGoal.totalVerses} verses</span>
              <span>{userProgress.currentGoal.daysLeft} days left</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Today's Review:</h4>
            {['Verse 1-10', 'Verse 11-20', 'Verse 21-30'].map((verses, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-sm ${darkMode ? 'bg-gray-700/50' : 'bg-white'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${index === 0 ? 'bg-emerald-100 dark:bg-emerald-900/30' : index === 1 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                    <Clock className={`w-5 h-5 ${index === 0 ? 'text-emerald-600' : index === 1 ? 'text-blue-600' : 'text-purple-600'}`} />
                  </div>
                  <span className="text-sm font-medium">{verses}</span>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-3 py-1.5 rounded-lg border border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  Practice
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-purple-900/20 to-indigo-900/20' : 'bg-gradient-to-br from-purple-50 to-indigo-50'} shadow-sm`}>
            <h3 className="font-bold mb-4 text-purple-700 dark:text-purple-300">Completed Surahs</h3>
            <div className="space-y-3">
              {userProgress.completedSurahs.map((surah, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{surah}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ml-auto">
                    {Math.floor(Math.random() * 30) + 1} days ago
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20' : 'bg-gradient-to-br from-blue-50 to-cyan-50'} shadow-sm`}>
            <h3 className="font-bold mb-4 text-blue-700 dark:text-blue-300">Quick Stats</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Study Time', value: `${Math.floor(userProgress.totalTime / 60)}h ${userProgress.totalTime % 60}m`, icon: Clock, color: 'text-blue-600' },
                { label: 'Best Streak', value: '21 days', icon: Trophy, color: 'text-amber-600' },
                { label: 'Favorite Time', value: 'After Fajr', icon: Sun, color: 'text-orange-600' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    <div className="font-medium">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Progress Dashboard Component
  const ProgressDashboard = () => (
    <div className="max-w-6xl mx-auto p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
            <TrendingUp className="w-6 h-6 text-blue-500 relative z-10" />
          </div>
          Learning Progress
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full font-medium">INSIGHTS</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Study Time', value: `${Math.floor(userProgress.totalTime / 60)}h ${userProgress.totalTime % 60}m`, color: 'blue', icon: Clock, bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' },
          { label: 'Verses Completed', value: userProgress.versesMemorized, color: 'emerald', icon: BookOpen, bg: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20' },
          { label: 'Average Accuracy', value: `${userProgress.accuracy}%`, color: 'purple', icon: Target, bg: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' },
          { label: 'Current Streak', value: `${userProgress.streak} days`, color: 'orange', icon: Award, bg: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20' }
        ].map((stat, index) => (
          <div key={index} className={`p-6 rounded-2xl hover:shadow-md transition-all duration-300 bg-gradient-to-br ${stat.bg} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`text-xs px-2 py-1 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-700 dark:text-${stat.color}-300`}>
                +12%
              </div>
            </div>
            <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-6 mb-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Weekly Progress</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
              Best: Thu
            </span>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between space-x-2">
          {userProgress.weeklyStats.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-90 ${
                  day.day === 'Thu' 
                    ? 'bg-gradient-to-t from-emerald-500 to-teal-500' 
                    : 'bg-gradient-to-t from-blue-500 to-indigo-500'
                }`}
                style={{height: `${(day.minutes / 120) * 200}px`}}
                title={`${day.minutes} minutes - ${day.accuracy}% accuracy`}
              ></div>
              <span className={`text-xs mt-2 ${day.day === 'Thu' ? 'font-medium text-emerald-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Hover over bars to see details</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-6 shadow-sm`}>
          <h3 className="text-lg font-bold mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {[
              { title: "First Surah Completed", desc: "Mastered Al-Fatiha", icon: "🏆", time: "2 days ago", color: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20" },
              { title: "Week Streak", desc: "7 consecutive days of practice", icon: "🔥", time: "5 days ago", color: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20" },
              { title: "Perfect Recitation", desc: "100% accuracy on 5 verses", icon: "⭐", time: "1 week ago", color: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" }
            ].map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:shadow-sm bg-gradient-to-br ${achievement.color}`}>
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.desc}</div>
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{achievement.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border rounded-2xl p-6 shadow-sm`}>
          <h3 className="text-lg font-bold mb-4">Learning Insights</h3>
          <div className="space-y-5">
            {[
              { 
                label: 'Most Active Time', 
                value: 'After Fajr (6-8 AM)', 
                percent: 85,
                color: 'bg-emerald-500',
                bg: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
              },
              { 
                label: 'Strongest Skill', 
                value: 'Pronunciation (92%)', 
                percent: 92,
                color: 'bg-blue-500',
                bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
              },
              { 
                label: 'Focus Area', 
                value: 'Tajweed Rules (78%)', 
                percent: 78,
                color: 'bg-orange-500',
                bg: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20'
              }
            ].map((insight, index) => (
              <div key={index} className={`p-4 rounded-xl bg-gradient-to-br ${insight.bg}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{insight.label}</span>
                  <span className="text-sm font-bold">{insight.value}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className={`${insight.color} h-2 rounded-full`} style={{width: `${insight.percent}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Islamic Tools Component
  const IslamicTools = () => (
    <div className="max-w-6xl mx-auto p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-sm opacity-30"></div>
            <Settings className="w-6 h-6 text-indigo-500 relative z-10" />
          </div>
          Islamic Tools & Resources
        </h2>
        <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full font-medium">ESSENTIALS</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { 
            icon: Compass, 
            title: 'Qibla Finder', 
            desc: 'Find the direction of prayer anywhere in the world',
            color: 'emerald',
            badge: 'GPS',
            bg: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
          },
          { 
            icon: Calculator, 
            title: 'Zakat Calculator', 
            desc: 'Calculate your Zakat obligations accurately',
            color: 'blue',
            badge: 'Finance',
            bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
          },
          { 
            icon: Languages, 
            title: 'Arabic Grammar', 
            desc: 'Root word analysis & grammar explanations',
            color: 'purple',
            badge: 'AI-Powered',
            bg: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
          },
          { 
            icon: Download, 
            title: 'Offline Content', 
            desc: 'Download surahs and audio for offline use',
            color: 'orange',
            badge: 'Offline',
            bg: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20'
          },
          { 
            icon: Volume2, 
            title: 'Audio Library', 
            desc: 'Complete recitation collection from 20+ reciters',
            color: 'red',
            badge: 'HD Audio',
            bg: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'
          },
          { 
            icon: Search, 
            title: 'Smart Search', 
            desc: 'AI-powered semantic search across the Quran',
            color: 'green',
            badge: 'Beta',
            bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
          }
        ].map((tool, index) => (
          <div 
            key={index}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${tool.bg} shadow-sm ${
              darkMode 
                ? 'border-gray-700 hover:border-gray-600' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${tool.color}-100 dark:bg-${tool.color}-900/30`}>
                <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900/30 text-${tool.color}-700 dark:text-${tool.color}-300`}>
                {tool.badge}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tool.desc}</p>
            <div className="mt-4">
              <button className={`text-sm font-medium text-${tool.color}-600 hover:text-${tool.color}-700 flex items-center space-x-1`}>
                <span>Launch Tool</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Book className="w-5 h-5 mr-2 text-emerald-500" />
          Tajweed Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTajweedRules.map((rule) => (
            <div 
              key={rule.id}
              className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-sm bg-gradient-to-br ${
                darkMode 
                  ? 'from-gray-800 to-gray-900 border-gray-700' 
                  : 'from-white to-gray-50 border-gray-200'
              } border`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{backgroundColor: rule.color}}
                ></div>
                <h4 className="font-bold">{rule.name}</h4>
                <span className="arabic-text text-lg">{rule.arabic}</span>
              </div>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {rule.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {rule.examples.map((example, index) => (
                  <span 
                    key={index}
                    className={`arabic-text px-3 py-1.5 rounded-lg text-sm ${
                      darkMode 
                        ? 'bg-gray-700/50 hover:bg-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors cursor-pointer`}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'quran':
        return <QuranReader />;
      case 'recitation':
        return <RecitationCoach />;
      case 'memorization':
        return <MemorizationTracker />;
      case 'progress':
        return <ProgressDashboard />;
      case 'tools':
        return <IslamicTools />;
      default:
        return <QuranReader />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation />
      <SearchModal />
      
      {/* Main Content */}
      <main className="pb-20">
        {renderCurrentView()}
      </main>
      
      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-200'} border-t mt-12`}>
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-30"></div>
                <BookOpen className="w-6 h-6 text-emerald-600 relative z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">AiQuran</span>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 max-w-2xl mx-auto`}>
              Revolutionizing Islamic Education with AI Technology. Empowering Muslims worldwide with modern tools for Quran learning and understanding.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              {['About', 'Privacy', 'Terms', 'Contact', 'API', 'Blog', 'Careers', 'Donate'].map((item, index) => (
                <a key={index} href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-medium">
                  {item}
                </a>
              ))}
            </div>
            <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                © 2024 AiQuran. Built with ❤️ for the Muslim Ummah.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AiQuranApp;