// ===== Music Data =====
const songs = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Ray",
        album: "Midnight Dreams",
        category: "Pop",
        duration: "3:42",
        cover: "assets/images/album1.svg",
        audio: "assets/music/song1.mp3"
    },
    {
        id: 2,
        title: "Neon Lights",
        artist: "Synthwave Collective",
        album: "Neon Nights",
        category: "Electronic",
        duration: "4:15",
        cover: "assets/images/album2.svg",
        audio: "assets/music/song2.mp3"
    },
    {
        id: 3,
        title: "Jazz After Dark",
        artist: "The Smooth Quartet",
        album: "Late Night Sessions",
        category: "Jazz",
        duration: "5:08",
        cover: "assets/images/album3.svg",
        audio: "assets/music/song3.mp3"
    },
    {
        id: 4,
        title: "Urban Flow",
        artist: "MC Vibe",
        album: "Street Beats",
        category: "Hip Hop",
        duration: "3:28",
        cover: "assets/images/album4.svg",
        audio: "assets/music/song4.mp3"
    },
    {
        id: 5,
        title: "Rock Anthem",
        artist: "The Voltage",
        album: "Electric Soul",
        category: "Rock",
        duration: "4:33",
        cover: "assets/images/album5.svg",
        audio: "assets/music/song5.mp3"
    },
    {
        id: 6,
        title: "Peaceful Mind",
        artist: "Ambient Waves",
        album: "Serenity",
        category: "Classical",
        duration: "6:12",
        cover: "assets/images/album6.svg",
        audio: "assets/music/song6.mp3"
    },
    {
        id: 7,
        title: "Summer Vibes",
        artist: "DJ Sunshine",
        album: "Beach Party",
        category: "Pop",
        duration: "3:55",
        cover: "assets/images/album7.svg",
        audio: "assets/music/song7.mp3"
    },
    {
        id: 8,
        title: "Lo-Fi Study",
        artist: "Chill Beats",
        album: "Focus Mode",
        category: "Lo-Fi",
        duration: "4:20",
        cover: "assets/images/album8.svg",
        audio: "assets/music/song8.mp3"
    },
    {
        id: 9,
        title: "Pump It Up",
        artist: "Energy Team",
        album: "Workout Mix",
        category: "Workout",
        duration: "3:18",
        cover: "assets/images/album9.svg",
        audio: "assets/music/song9.mp3"
    },
    {
        id: 10,
        title: "Rainy Day",
        artist: "Melancholy Sounds",
        album: "Grey Skies",
        category: "Chill",
        duration: "4:45",
        cover: "assets/images/album10.svg",
        audio: "assets/music/song10.mp3"
    },
    {
        id: 11,
        title: "Cosmic Journey",
        artist: "Space Synth",
        album: "Galaxy Sounds",
        category: "Electronic",
        duration: "5:30",
        cover: "assets/images/album11.svg",
        audio: "assets/music/song11.mp3"
    },
    {
        id: 12,
        title: "Heartbreak Hotel",
        artist: "The Blues Brothers",
        album: "Soul Kitchen",
        category: "Jazz",
        duration: "4:10",
        cover: "assets/images/album12.svg",
        audio: "assets/music/song12.mp3"
    },
    {
        id: 13,
        title: "Rebel Yell",
        artist: "The Voltage",
        album: "Electric Soul",
        category: "Rock",
        duration: "3:58",
        cover: "assets/images/album5.svg",
        audio: "assets/music/song13.mp3"
    },
    {
        id: 14,
        title: "Chill Zone",
        artist: "Lofi Dreams",
        album: "Study Session",
        category: "Lo-Fi",
        duration: "4:05",
        cover: "assets/images/album8.svg",
        audio: "assets/music/song14.mp3"
    },
    {
        id: 15,
        title: "Dancefloor",
        artist: "DJ Sunshine",
        album: "Beach Party",
        category: "Pop",
        duration: "3:40",
        cover: "assets/images/album7.svg",
        audio: "assets/music/song15.mp3"
    }
];

const categories = ["All", "Pop", "Hip Hop", "Rock", "Electronic", "Jazz", "Classical", "Lo-Fi", "Workout", "Chill"];

// ===== State =====
let currentSong = null;
let currentSongIndex = -1;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: off, 1: all, 2: one
let queue = [];
let queueIndex = -1;
let favorites = [];
let playlists = [];
let recentlyPlayed = [];
let currentVolume = 0.7;
let isMuted = false;
let activeSection = 'home';
let activeCategory = 'All';
let audio = null;
let uploadedFiles = []; // {file, objectUrl, coverObjectUrl}
let nextSongId = 100; // Start uploaded song IDs from 100

// ===== DOM Elements =====
const elements = {
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    closeSidebarBtn: document.getElementById('closeSidebarBtn'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    navItems: document.querySelectorAll('.nav-item'),
    playlistList: document.getElementById('playlistList'),
    createPlaylistBtn: document.getElementById('createPlaylistBtn'),
    createPlaylistFullBtn: document.getElementById('createPlaylistFullBtn'),

    // Header
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    themeToggle: document.getElementById('themeToggle'),

    // Content
    contentWrapper: document.getElementById('contentWrapper'),
    homeSection: document.getElementById('homeSection'),
    searchSection: document.getElementById('searchSection'),
    discoverSection: document.getElementById('discoverSection'),
    librarySection: document.getElementById('librarySection'),
    favoritesSection: document.getElementById('favoritesSection'),
    recentlyPlayedListSection: document.getElementById('recentlyPlayedListSection'),
    playlistDetailSection: document.getElementById('playlistDetailSection'),

    // Home
    greeting: document.getElementById('greeting'),
    featuredGrid: document.getElementById('featuredGrid'),
    recentlyPlayedGrid: document.getElementById('recentlyPlayedGrid'),
    songsList: document.getElementById('songsList'),
    categoriesGrid: document.getElementById('categoriesGrid'),
    recentlyPlayedSection: document.getElementById('recentlyPlayedSection'),

    // Search
    searchResults: document.getElementById('searchResults'),

    // Discover
    discoverCategories: document.getElementById('discoverCategories'),
    discoverSongs: document.getElementById('discoverSongs'),

    // Library
    libraryGrid: document.getElementById('libraryGrid'),

    // Favorites
    favoritesContent: document.getElementById('favoritesContent'),

    // Recently Played
    recentlyPlayedList: document.getElementById('recentlyPlayedList'),

    // Playlist Detail
    playlistDetailHeader: document.getElementById('playlistDetailHeader'),
    playlistDetailContent: document.getElementById('playlistDetailContent'),

    // Queue
    queuePanel: document.getElementById('queuePanel'),
    queueList: document.getElementById('queueList'),
    closeQueueBtn: document.getElementById('closeQueueBtn'),
    queueBtn: document.getElementById('queueBtn'),

    // Bottom Player
    playerAlbumImg: document.getElementById('playerAlbumImg'),
    playerSongTitle: document.getElementById('playerSongTitle'),
    playerSongArtist: document.getElementById('playerSongArtist'),
    playerFavoriteBtn: document.getElementById('playerFavoriteBtn'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    shuffleBtn: document.getElementById('shuffleBtn'),
    repeatBtn: document.getElementById('repeatBtn'),
    currentTime: document.getElementById('currentTime'),
    totalTime: document.getElementById('totalTime'),
    progressBar: document.getElementById('progressBar'),
    progressFill: document.getElementById('progressFill'),
    progressThumb: document.getElementById('progressThumb'),
    volumeBtn: document.getElementById('volumeBtn'),
    volumeSlider: document.getElementById('volumeSlider'),
    volumeFill: document.getElementById('volumeFill'),
    volumeThumb: document.getElementById('volumeThumb'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),

    // Modals
    createPlaylistModal: document.getElementById('createPlaylistModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    playlistNameInput: document.getElementById('playlistNameInput'),
    cancelPlaylistBtn: document.getElementById('cancelPlaylistBtn'),
    savePlaylistBtn: document.getElementById('savePlaylistBtn'),

    addToPlaylistModal: document.getElementById('addToPlaylistModal'),
    closeAddToPlaylistModalBtn: document.getElementById('closeAddToPlaylistModalBtn'),
    playlistSelectionList: document.getElementById('playlistSelectionList'),
    cancelAddToPlaylistBtn: document.getElementById('cancelAddToPlaylistBtn'),

    // Upload Music
    addMusicBtn: document.getElementById('addMusicBtn'),
    addMusicHeaderBtn: document.getElementById('addMusicHeaderBtn'),
    uploadMusicModal: document.getElementById('uploadMusicModal'),
    closeUploadModalBtn: document.getElementById('closeUploadModalBtn'),
    uploadDropzone: document.getElementById('uploadDropzone'),
    audioFileInput: document.getElementById('audioFileInput'),
    coverImageInput: document.getElementById('coverImageInput'),
    uploadPreviewList: document.getElementById('uploadPreviewList'),
    uploadForm: document.getElementById('uploadForm'),
    uploadSongTitle: document.getElementById('uploadSongTitle'),
    uploadSongArtist: document.getElementById('uploadSongArtist'),
    uploadSongAlbum: document.getElementById('uploadSongAlbum'),
    uploadSongCategory: document.getElementById('uploadSongCategory'),
    coverUploadArea: document.getElementById('coverUploadArea'),
    coverPreviewImg: document.getElementById('coverPreviewImg'),
    coverPlaceholder: document.getElementById('coverPlaceholder'),
    cancelUploadBtn: document.getElementById('cancelUploadBtn'),
    saveUploadBtn: document.getElementById('saveUploadBtn'),

    // Toast
    toastContainer: document.getElementById('toast-container')
};

// ===== Audio Setup =====
let webAudioContext = null;
let webAudioSource = null;
let webAudioGain = null;
let webAudioOscillator = null;
let webAudioStartTime = 0;
let webAudioDuration = 0;
let isUsingWebAudio = false;

// Tone frequencies for each song
const toneFrequencies = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047];

function generateToneBlob(frequency, duration) {
    return new Promise((resolve) => {
        const sampleRate = 44100;
        const numSamples = Math.floor(sampleRate * duration);
        const buffer = new ArrayBuffer(44 + numSamples * 2);
        const view = new DataView(buffer);

        // WAV header
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + numSamples * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, numSamples * 2, true);

        // Generate audio data (sine wave with fade in/out)
        for (let i = 0; i < numSamples; i++) {
            const t = i / sampleRate;
            const fadeIn = Math.min(1, i / (sampleRate * 0.05));
            const fadeOut = Math.min(1, (numSamples - i) / (sampleRate * 0.05));
            const sample = Math.sin(2 * Math.PI * frequency * t) * 12000 * fadeIn * fadeOut;
            view.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, sample)), true);
        }

        resolve(new Blob([buffer], { type: 'audio/wav' }));
    });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function playWithWebAudio(song) {
    if (!webAudioContext) {
        webAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    stopWebAudio();

    const freq = toneFrequencies[(song.id - 1) % toneFrequencies.length];
    const durationSeconds = parseDuration(song.duration);

    webAudioOscillator = webAudioContext.createOscillator();
    webAudioGain = webAudioContext.createGain();

    webAudioOscillator.type = 'sine';
    webAudioOscillator.frequency.setValueAtTime(freq, webAudioContext.currentTime);

    webAudioGain.gain.setValueAtTime(currentVolume * 0.5, webAudioContext.currentTime);

    webAudioOscillator.connect(webAudioGain);
    webAudioGain.connect(webAudioContext.destination);

    webAudioOscillator.start();
    webAudioStartTime = webAudioContext.currentTime;
    webAudioDuration = durationSeconds;
    isUsingWebAudio = true;

    // Set total time display
    elements.totalTime.textContent = song.duration;

    // Update progress via interval
    if (window._webAudioInterval) clearInterval(window._webAudioInterval);
    window._webAudioInterval = setInterval(() => {
        if (!isUsingWebAudio) return;
        const elapsed = webAudioContext.currentTime - webAudioStartTime;
        if (elapsed >= webAudioDuration) {
            handleSongEnd();
            return;
        }
        const percent = (elapsed / webAudioDuration) * 100;
        elements.progressFill.style.width = percent + '%';
        elements.progressThumb.style.left = percent + '%';
        elements.currentTime.textContent = formatTime(elapsed);
    }, 100);
}

function stopWebAudio() {
    if (webAudioOscillator) {
        try { webAudioOscillator.stop(); } catch (e) {}
        webAudioOscillator = null;
    }
    if (window._webAudioInterval) {
        clearInterval(window._webAudioInterval);
        window._webAudioInterval = null;
    }
    isUsingWebAudio = false;
}

function parseDuration(durationStr) {
    const parts = durationStr.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function initAudio() {
    audio = new Audio();
    audio.volume = currentVolume;

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseIcon();
    });
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseIcon();
    });
    audio.addEventListener('error', () => {
        // Only use Web Audio API fallback for demo songs, not uploaded songs
        if (currentSong && !isUsingWebAudio && !currentSong.isUploaded) {
            playWithWebAudio(currentSong);
        } else if (currentSong && currentSong.isUploaded) {
            showToast('Error playing this song. The file may have been moved or deleted.', 'error');
        }
    });
}

// ===== LocalStorage =====
function loadFromStorage() {
    try {
        favorites = JSON.parse(localStorage.getItem('vibe_favorites')) || [];
        playlists = JSON.parse(localStorage.getItem('vibe_playlists')) || [];
        recentlyPlayed = JSON.parse(localStorage.getItem('vibe_recentlyPlayed')) || [];
        currentVolume = parseFloat(localStorage.getItem('vibe_volume')) || 0.7;
        isMuted = localStorage.getItem('vibe_muted') === 'true';
        isShuffle = localStorage.getItem('vibe_shuffle') === 'true';
        repeatMode = parseInt(localStorage.getItem('vibe_repeat')) || 0;
    } catch (e) {
        console.warn('Failed to load from localStorage:', e);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('vibe_favorites', JSON.stringify(favorites));
        localStorage.setItem('vibe_playlists', JSON.stringify(playlists));
        localStorage.setItem('vibe_recentlyPlayed', JSON.stringify(recentlyPlayed));
        localStorage.setItem('vibe_volume', currentVolume.toString());
        localStorage.setItem('vibe_muted', isMuted.toString());
        localStorage.setItem('vibe_shuffle', isShuffle.toString());
        localStorage.setItem('vibe_repeat', repeatMode.toString());
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
    }
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Greeting =====
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Evening 🌙';
    if (hour < 12) greeting = 'Good Morning ☀️';
    else if (hour < 18) greeting = 'Good Afternoon 🌤️';
    elements.greeting.textContent = greeting;
}

// ===== Navigation =====
function setActiveSection(section) {
    activeSection = section;
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === section);
    });

    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    const sectionMap = {
        'home': elements.homeSection,
        'search': elements.searchSection,
        'discover': elements.discoverSection,
        'library': elements.librarySection,
        'favorites': elements.favoritesSection,
        'recently-played': elements.recentlyPlayedListSection,
        'playlist-detail': elements.playlistDetailSection
    };

    if (sectionMap[section]) {
        sectionMap[section].classList.add('active');
    }

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        elements.sidebar.classList.remove('open');
    }
}

// ===== Render Functions =====
function renderFeatured() {
    const featured = songs.slice(0, 5);
    elements.featuredGrid.innerHTML = featured.map(song => `
        <div class="featured-card" data-song-id="${song.id}" ondblclick="playSongById(${song.id})">
            <img src="${song.cover}" alt="${song.title}" class="featured-card-img" loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%231a1a28%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2240%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
            <div class="featured-card-overlay">
                <span class="featured-card-title">${song.title}</span>
                <span class="featured-card-artist">${song.artist}</span>
            </div>
            <button class="featured-card-play" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `).join('');
}

function renderRecentlyPlayedGrid() {
    const recent = recentlyPlayed.slice(0, 6);
    if (recent.length === 0) {
        elements.recentlyPlayedSection.style.display = 'none';
        return;
    }
    elements.recentlyPlayedSection.style.display = 'block';
    elements.recentlyPlayedGrid.innerHTML = recent.map(id => {
        const song = songs.find(s => s.id === id);
        if (!song) return '';
        return `
            <div class="song-grid-card" ondblclick="playSongById(${song.id})">
                <img src="${song.cover}" alt="${song.title}" class="song-grid-card-img" loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 160%22%3E%3Crect fill=%22%231a1a28%22 width=%22160%22 height=%22160%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2232%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
                <div class="song-grid-card-title">${song.title}</div>
                <div class="song-grid-card-artist">${song.artist}</div>
            </div>
        `;
    }).join('');
}

function renderSongsList() {
    const filtered = activeCategory === 'All' ? songs : songs.filter(s => s.category === activeCategory);
    elements.songsList.innerHTML = filtered.map((song, index) => {
        const isCurrentSong = currentSong && currentSong.id === song.id;
        const isFav = favorites.includes(song.id);
        return `
            <div class="song-item ${isCurrentSong && isPlaying ? 'playing' : ''}" data-song-id="${song.id}" ondblclick="playSongById(${song.id})">
                <div class="song-item-num">
                    <span class="num-text">${index + 1}</span>
                    <div class="equalizer">
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                    </div>
                </div>
                <div class="song-item-title-group">
                    <img src="${song.cover}" alt="${song.title}" class="song-item-art" loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 44 44%22%3E%3Crect fill=%22%231a1a28%22 width=%2244%22 height=%2244%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
                    <div class="song-item-info">
                        <div class="song-item-title">${song.title}${song.isUploaded ? '<span class="badge-new">New</span>' : ''}</div>
                        <div class="song-item-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="song-item-album">${song.album}</div>
                <div class="song-item-duration">${song.duration}</div>
                <div class="song-item-actions">
                    <button class="song-action-btn favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${song.id})" aria-label="Toggle favorite">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="song-action-btn play-song-btn" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="song-action-btn" onclick="event.stopPropagation(); openAddToPlaylistModal(${song.id})" aria-label="Add to playlist">
                        <i class="fas fa-plus"></i>
                    </button>
                    ${song.isUploaded ? `<button class="song-action-btn delete-btn" onclick="event.stopPropagation(); deleteSong(${song.id})" aria-label="Delete song"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>
        `;
    }).join('');

    if (filtered.length === 0) {
        elements.songsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎵</div>
                <h3>No songs found</h3>
                <p>Try selecting a different category or add your own music!</p>
            </div>
        `;
    }
}

function renderCategories() {
    elements.categoriesGrid.innerHTML = categories.map(cat => `
        <button class="category-chip ${activeCategory === cat ? 'active' : ''}" onclick="filterByCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function renderFeaturedDiscover() {
    elements.discoverCategories.innerHTML = categories.filter(c => c !== 'All').map(cat => `
        <button class="discover-category-chip ${activeCategory === cat ? 'active' : ''}" onclick="filterByCategory('${cat}')">
            ${cat}
        </button>
    `).join('');

    const filtered = activeCategory === 'All' ? songs : songs.filter(s => s.category === activeCategory);
    elements.discoverSongs.innerHTML = filtered.map(song => `
        <div class="discover-song-card" ondblclick="playSongById(${song.id})">
            <img src="${song.cover}" alt="${song.title}" class="discover-song-card-img" loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 180 180%22%3E%3Crect fill=%22%231a1a28%22 width=%22180%22 height=%22180%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2236%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
            <div class="discover-song-card-title">${song.title}</div>
            <div class="discover-song-card-artist">${song.artist}</div>
            <button class="discover-song-card-play" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `).join('');
}

function renderPlaylists() {
    elements.playlistList.innerHTML = playlists.map(pl => `
        <li class="playlist-item" onclick="viewPlaylist(${pl.id})">
            <div class="playlist-item-icon"><i class="fas fa-music"></i></div>
            <div class="playlist-item-info">
                <div class="playlist-item-name">${pl.name}</div>
                <div class="playlist-item-count">${pl.songs.length} songs</div>
            </div>
            <button class="playlist-item-delete" onclick="event.stopPropagation(); deletePlaylist(${pl.id})" aria-label="Delete playlist">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `).join('');
}

function renderLibrary() {
    const allPlaylistsSection = `
        <div class="library-card" onclick="setActiveSection('favorites')">
            <div class="library-card-icon" style="background: linear-gradient(135deg, #ec4899, #f43f5e);">
                <i class="fas fa-heart"></i>
            </div>
            <div class="library-card-title">Favorites</div>
            <div class="library-card-count">${favorites.length} songs</div>
        </div>
        <div class="library-card" onclick="setActiveSection('recently-played')">
            <div class="library-card-icon" style="background: linear-gradient(135deg, #3b82f6, #06b6d4);">
                <i class="fas fa-history"></i>
            </div>
            <div class="library-card-title">Recently Played</div>
            <div class="library-card-count">${recentlyPlayed.length} songs</div>
        </div>
    `;

    const playlistCards = playlists.map(pl => `
        <div class="library-card" onclick="viewPlaylist(${pl.id})">
            <div class="library-card-icon">
                <i class="fas fa-music"></i>
            </div>
            <div class="library-card-title">${pl.name}</div>
            <div class="library-card-count">${pl.songs.length} songs</div>
        </div>
    `).join('');

    elements.libraryGrid.innerHTML = allPlaylistsSection + playlistCards;
}

function renderFavorites() {
    if (favorites.length === 0) {
        elements.favoritesContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❤️</div>
                <h3>No favorites yet</h3>
                <p>Start hearting songs to add them to your favorites.</p>
            </div>
        `;
        return;
    }

    elements.favoritesContent.innerHTML = favorites.map((id, index) => {
        const song = songs.find(s => s.id === id);
        if (!song) return '';
        const isCurrentSong = currentSong && currentSong.id === song.id;
        return `
            <div class="song-item ${isCurrentSong && isPlaying ? 'playing' : ''}" data-song-id="${song.id}" ondblclick="playSongById(${song.id})">
                <div class="song-item-num">
                    <span class="num-text">${index + 1}</span>
                    <div class="equalizer">
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                    </div>
                </div>
                <div class="song-item-title-group">
                    <img src="${song.cover}" alt="${song.title}" class="song-item-art" loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 44 44%22%3E%3Crect fill=%22%231a1a28%22 width=%2244%22 height=%2244%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
                    <div class="song-item-info">
                        <div class="song-item-title">${song.title}</div>
                        <div class="song-item-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="song-item-album">${song.album}</div>
                <div class="song-item-duration">${song.duration}</div>
                <div class="song-item-actions">
                    <button class="song-action-btn favorite-btn active" onclick="event.stopPropagation(); toggleFavorite(${song.id})" aria-label="Remove from favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="song-action-btn play-song-btn" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                        <i class="fas fa-play"></i>
                    </button>
                    ${song.isUploaded ? `<button class="song-action-btn delete-btn" onclick="event.stopPropagation(); deleteSong(${song.id})" aria-label="Delete song"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderRecentlyPlayedList() {
    if (recentlyPlayed.length === 0) {
        elements.recentlyPlayedList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🕐</div>
                <h3>No recently played songs</h3>
                <p>Start listening to music and it will appear here.</p>
            </div>
        `;
        return;
    }

    elements.recentlyPlayedList.innerHTML = recentlyPlayed.map((id, index) => {
        const song = songs.find(s => s.id === id);
        if (!song) return '';
        const isCurrentSong = currentSong && currentSong.id === song.id;
        return `
            <div class="song-item ${isCurrentSong && isPlaying ? 'playing' : ''}" data-song-id="${song.id}" ondblclick="playSongById(${song.id})">
                <div class="song-item-num">
                    <span class="num-text">${index + 1}</span>
                    <div class="equalizer">
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                    </div>
                </div>
                <div class="song-item-title-group">
                    <img src="${song.cover}" alt="${song.title}" class="song-item-art" loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 44 44%22%3E%3Crect fill=%22%231a1a28%22 width=%2244%22 height=%2244%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
                    <div class="song-item-info">
                        <div class="song-item-title">${song.title}</div>
                        <div class="song-item-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="song-item-album">${song.album}</div>
                <div class="song-item-duration">${song.duration}</div>
                <div class="song-item-actions">
                    <button class="song-action-btn favorite-btn ${favorites.includes(song.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${song.id})" aria-label="Toggle favorite">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="song-action-btn play-song-btn" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                        <i class="fas fa-play"></i>
                    </button>
                    ${song.isUploaded ? `<button class="song-action-btn delete-btn" onclick="event.stopPropagation(); deleteSong(${song.id})" aria-label="Delete song"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderQueue() {
    if (queue.length === 0) {
        elements.queueList.innerHTML = `
            <div class="queue-empty">
                <i class="fas fa-list-ul"></i>
                <p>Queue is empty</p>
            </div>
        `;
        return;
    }

    elements.queueList.innerHTML = queue.map((song, index) => `
        <div class="queue-item ${index === queueIndex ? 'current' : ''}" onclick="playSongFromQueue(${index})">
            <div class="queue-item-num">${index + 1}</div>
            <img src="${song.cover}" alt="${song.title}" class="queue-item-art" loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect fill=%22%231a1a28%22 width=%2240%22 height=%2240%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2214%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
            <div class="queue-item-info">
                <div class="queue-item-title">${song.title}</div>
                <div class="queue-item-artist">${song.artist}</div>
            </div>
            <button class="queue-item-remove" onclick="event.stopPropagation(); removeFromQueue(${index})" aria-label="Remove from queue">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function renderPlaylistDetail(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    elements.playlistDetailHeader.innerHTML = `
        <div class="playlist-detail-cover">
            <i class="fas fa-music"></i>
        </div>
        <div class="playlist-detail-info">
            <h1>${playlist.name}</h1>
            <div class="playlist-detail-meta">${playlist.songs.length} songs</div>
            <div class="playlist-detail-actions">
                <button class="playlist-play-btn" onclick="playPlaylist(${playlist.id})">
                    <i class="fas fa-play"></i>
                    Play
                </button>
                <button class="playlist-delete-btn" onclick="deletePlaylist(${playlist.id})">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    `;

    if (playlist.songs.length === 0) {
        elements.playlistDetailContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎵</div>
                <h3>Your playlist is empty</h3>
                <p>Add some songs and start listening.</p>
            </div>
        `;
        return;
    }

    elements.playlistDetailContent.innerHTML = playlist.songs.map((id, index) => {
        const song = songs.find(s => s.id === id);
        if (!song) return '';
        const isCurrentSong = currentSong && currentSong.id === song.id;
        return `
            <div class="song-item ${isCurrentSong && isPlaying ? 'playing' : ''}" data-song-id="${song.id}" ondblclick="playSongById(${song.id})">
                <div class="song-item-num">
                    <span class="num-text">${index + 1}</span>
                    <div class="equalizer">
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                        <div class="eq-bar"></div>
                    </div>
                </div>
                <div class="song-item-title-group">
                    <img src="${song.cover}" alt="${song.title}" class="song-item-art" loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 44 44%22%3E%3Crect fill=%22%231a1a28%22 width=%2244%22 height=%2244%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
                    <div class="song-item-info">
                        <div class="song-item-title">${song.title}</div>
                        <div class="song-item-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="song-item-album">${song.album}</div>
                <div class="song-item-duration">${song.duration}</div>
                <div class="song-item-actions">
                    <button class="song-action-btn favorite-btn ${favorites.includes(song.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${song.id})" aria-label="Toggle favorite">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="song-action-btn" onclick="event.stopPropagation(); removeFromPlaylist(${playlist.id}, ${song.id})" aria-label="Remove from playlist">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="song-action-btn play-song-btn" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                        <i class="fas fa-play"></i>
                    </button>
                    ${song.isUploaded ? `<button class="song-action-btn delete-btn" onclick="event.stopPropagation(); deleteSong(${song.id})" aria-label="Delete song"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ===== Playback Functions =====
function playSongById(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    currentSong = song;
    currentSongIndex = songs.findIndex(s => s.id === songId);

    // Build queue from all songs starting from current
    queue = [...songs];
    queueIndex = currentSongIndex;

    // Update recently played
    recentlyPlayed = recentlyPlayed.filter(id => id !== songId);
    recentlyPlayed.unshift(songId);
    if (recentlyPlayed.length > 10) recentlyPlayed = recentlyPlayed.slice(0, 10);
    saveToStorage();

    // Stop any existing Web Audio
    stopWebAudio();

    // Play audio
    if (audio) {
        audio.src = song.audio;
        audio.load();
        audio.play().catch(() => {
            // Only use Web Audio fallback for demo songs
            if (!song.isUploaded) {
                playWithWebAudio(song);
            } else {
                showToast('Error playing this song.', 'error');
            }
        });
    }

    updatePlayerUI();
    renderAll();
}

function playSongFromQueue(index) {
    if (index < 0 || index >= queue.length) return;
    queueIndex = index;
    currentSong = queue[index];
    currentSongIndex = songs.findIndex(s => s.id === currentSong.id);

    recentlyPlayed = recentlyPlayed.filter(id => id !== currentSong.id);
    recentlyPlayed.unshift(currentSong.id);
    if (recentlyPlayed.length > 10) recentlyPlayed = recentlyPlayed.slice(0, 10);
    saveToStorage();

    // Stop any existing Web Audio
    stopWebAudio();

    if (audio) {
        audio.src = currentSong.audio;
        audio.load();
        audio.play().catch(() => {
            if (!currentSong.isUploaded) {
                playWithWebAudio(currentSong);
            } else {
                showToast('Error playing this song.', 'error');
            }
        });
    }

    updatePlayerUI();
    renderAll();
}

function togglePlayPause() {
    if (!currentSong) {
        // Play first song if nothing selected
        if (songs.length > 0) {
            playSongById(songs[0].id);
        }
        return;
    }

    if (isPlaying) {
        if (isUsingWebAudio && webAudioContext) {
            webAudioContext.suspend();
            isPlaying = false;
            updatePlayPauseIcon();
        } else if (audio) {
            audio.pause();
        }
    } else {
        if (isUsingWebAudio && webAudioContext) {
            webAudioContext.resume();
            isPlaying = true;
            updatePlayPauseIcon();
        } else if (audio) {
            audio.play().catch(() => {
                // Try Web Audio fallback
                playWithWebAudio(currentSong);
            });
        }
    }
}

function nextSong() {
    if (queue.length === 0) return;

    if (isShuffle) {
        queueIndex = Math.floor(Math.random() * queue.length);
    } else {
        queueIndex = (queueIndex + 1) % queue.length;
    }

    playSongFromQueue(queueIndex);
}

function previousSong() {
    if (queue.length === 0) return;

    // If more than 3 seconds in, restart
    if (audio && audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    if (isShuffle) {
        queueIndex = Math.floor(Math.random() * queue.length);
    } else {
        queueIndex = (queueIndex - 1 + queue.length) % queue.length;
    }

    playSongFromQueue(queueIndex);
}

function handleSongEnd() {
    if (repeatMode === 2) {
        // Repeat one
        audio.currentTime = 0;
        audio.play().catch(() => {});
    } else if (repeatMode === 1) {
        // Repeat all
        nextSong();
    } else {
        // No repeat
        if (queueIndex < queue.length - 1) {
            nextSong();
        } else {
            isPlaying = false;
            updatePlayPauseIcon();
        }
    }
}

function handleAudioError() {
    showToast('Error loading audio file. The file may be missing.', 'error');
    isPlaying = false;
    updatePlayPauseIcon();
}

function updateProgress() {
    if (!audio || !audio.duration) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    elements.progressFill.style.width = percent + '%';
    elements.progressThumb.style.left = percent + '%';
    elements.currentTime.textContent = formatTime(audio.currentTime);
}

function updateDuration() {
    if (!audio || !audio.duration) return;
    elements.totalTime.textContent = formatTime(audio.duration);
}

function seekTo(e) {
    const rect = elements.progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    if (isUsingWebAudio && webAudioContext && currentSong) {
        // For Web Audio, we can't really seek, but update the visual
        const duration = parseDuration(currentSong.duration);
        const currentTime = percent * duration;
        elements.currentTime.textContent = formatTime(currentTime);
        elements.progressFill.style.width = (percent * 100) + '%';
        elements.progressThumb.style.left = (percent * 100) + '%';
    } else if (audio && audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
}

function setVolume(e) {
    const rect = elements.volumeSlider.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    currentVolume = percent;
    isMuted = false;
    if (audio) audio.volume = currentVolume;
    if (webAudioGain) webAudioGain.gain.setValueAtTime(currentVolume * 0.5, webAudioContext.currentTime);
    updateVolumeUI();
    saveToStorage();
}

function toggleMute() {
    isMuted = !isMuted;
    if (audio) audio.volume = isMuted ? 0 : currentVolume;
    if (webAudioGain) webAudioGain.gain.setValueAtTime(isMuted ? 0 : currentVolume * 0.5, webAudioContext.currentTime);
    updateVolumeUI();
    saveToStorage();
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    elements.shuffleBtn.classList.toggle('active', isShuffle);
    saveToStorage();
    showToast(isShuffle ? 'Shuffle enabled' : 'Shuffle disabled', 'info');
}

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    elements.repeatBtn.classList.toggle('active', repeatMode > 0);
    const icon = elements.repeatBtn.querySelector('i');
    if (repeatMode === 2) {
        icon.className = 'fas fa-redo';
        elements.repeatBtn.style.position = 'relative';
    } else {
        icon.className = 'fas fa-redo';
    }
    saveToStorage();
    const messages = ['Repeat off', 'Repeat all', 'Repeat one'];
    showToast(messages[repeatMode], 'info');
}

// ===== UI Updates =====
function updatePlayerUI() {
    if (!currentSong) return;
    elements.playerAlbumImg.src = currentSong.cover;
    elements.playerAlbumImg.onerror = function() {
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'%3E%3Crect fill='%231a1a28' width='56' height='56'/%3E%3Ctext x='50%25' y='50%25' fill='%238b5cf6' font-size='20' text-anchor='middle' dy='.35em'%3E♪%3C/text%3E%3C/svg%3E";
    };
    elements.playerSongTitle.textContent = currentSong.title;
    elements.playerSongArtist.textContent = currentSong.artist;

    // Update favorite button
    const isFav = favorites.includes(currentSong.id);
    elements.playerFavoriteBtn.classList.toggle('active', isFav);
    elements.playerFavoriteBtn.innerHTML = `<i class="${isFav ? 'fas' : 'far'} fa-heart"></i>`;

    document.title = `${currentSong.title} - ${currentSong.artist} | Vibe`;
}

function updatePlayPauseIcon() {
    const icon = elements.playPauseBtn.querySelector('i');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    elements.playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
}

function updateVolumeUI() {
    const volume = isMuted ? 0 : currentVolume;
    const percent = volume * 100;
    elements.volumeFill.style.width = percent + '%';
    elements.volumeThumb.style.left = percent + '%';

    const icon = elements.volumeBtn.querySelector('i');
    if (volume === 0 || isMuted) {
        icon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        icon.className = 'fas fa-volume-down';
    } else {
        icon.className = 'fas fa-volume-up';
    }
}

// ===== Favorites =====
function toggleFavorite(songId) {
    const index = favorites.indexOf(songId);
    if (index === -1) {
        favorites.push(songId);
        showToast('Added to Favorites', 'success');
    } else {
        favorites.splice(index, 1);
        showToast('Removed from Favorites', 'info');
    }
    saveToStorage();
    renderAll();
}

// ===== Playlists =====
function openCreatePlaylistModal() {
    elements.createPlaylistModal.classList.add('active');
    document.body.classList.add('modal-open');
    elements.playlistNameInput.value = '';
    elements.playlistNameInput.focus();
}

function closeCreatePlaylistModal() {
    elements.createPlaylistModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function savePlaylist() {
    const name = elements.playlistNameInput.value.trim();
    if (!name) {
        showToast('Please enter a playlist name', 'error');
        return;
    }

    const newPlaylist = {
        id: Date.now(),
        name: name,
        songs: []
    };

    playlists.push(newPlaylist);
    saveToStorage();
    closeCreatePlaylistModal();
    renderPlaylists();
    renderLibrary();
    showToast('Playlist created successfully!', 'success');
}

function deletePlaylist(playlistId) {
    playlists = playlists.filter(p => p.id !== playlistId);
    saveToStorage();
    renderPlaylists();
    renderLibrary();
    if (activeSection === 'playlist-detail') {
        setActiveSection('library');
    }
    showToast('Playlist deleted', 'info');
}

function viewPlaylist(playlistId) {
    setActiveSection('playlist-detail');
    renderPlaylistDetail(playlistId);
}

function playPlaylist(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist || playlist.songs.length === 0) return;

    queue = playlist.songs.map(id => songs.find(s => s.id === id)).filter(Boolean);
    queueIndex = 0;
    currentSong = queue[0];
    currentSongIndex = songs.findIndex(s => s.id === currentSong.id);

    // Stop any existing Web Audio
    stopWebAudio();

    if (audio) {
        audio.src = currentSong.audio;
        audio.load();
        audio.play().catch(() => {
            // Fallback to Web Audio API tone generation
            playWithWebAudio(currentSong);
        });
    }

    recentlyPlayed = recentlyPlayed.filter(id => id !== currentSong.id);
    recentlyPlayed.unshift(currentSong.id);
    if (recentlyPlayed.length > 10) recentlyPlayed = recentlyPlayed.slice(0, 10);
    saveToStorage();

    updatePlayerUI();
    renderAll();
}

// ===== Add to Playlist =====
let addToPlaylistSongId = null;

function openAddToPlaylistModal(songId) {
    addToPlaylistSongId = songId;

    if (playlists.length === 0) {
        elements.playlistSelectionList.innerHTML = `
            <div class="playlist-selection-empty">
                No playlists yet. Create one first.
            </div>
        `;
    } else {
        elements.playlistSelectionList.innerHTML = playlists.map(pl => `
            <div class="playlist-selection-item" onclick="addSongToPlaylist(${pl.id}, ${songId})">
                <div class="playlist-selection-item-icon"><i class="fas fa-music"></i></div>
                <div>
                    <div class="playlist-selection-item-name">${pl.name}</div>
                    <div class="playlist-selection-item-count">${pl.songs.length} songs</div>
                </div>
            </div>
        `).join('');
    }

    elements.addToPlaylistModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeAddToPlaylistModal() {
    elements.addToPlaylistModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    addToPlaylistSongId = null;
}

function addSongToPlaylist(playlistId, songId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    if (playlist.songs.includes(songId)) {
        showToast('Song already in playlist', 'info');
    } else {
        playlist.songs.push(songId);
        saveToStorage();
        renderPlaylists();
        showToast(`Added to "${playlist.name}"`, 'success');
    }

    closeAddToPlaylistModal();
}

function removeFromPlaylist(playlistId, songId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    playlist.songs = playlist.songs.filter(id => id !== songId);
    saveToStorage();
    renderPlaylistDetail(playlistId);
    renderPlaylists();
    showToast('Removed from playlist', 'info');
}

// ===== Upload Music =====
let selectedCoverFile = null;

function openUploadModal() {
    elements.uploadMusicModal.classList.add('active');
    document.body.classList.add('modal-open');
    uploadedFiles = [];
    selectedCoverFile = null;
    elements.uploadPreviewList.innerHTML = '';
    elements.uploadForm.style.display = 'none';
    elements.saveUploadBtn.disabled = true;
    elements.uploadSongTitle.value = '';
    elements.uploadSongArtist.value = '';
    elements.uploadSongAlbum.value = '';
    elements.uploadSongCategory.value = 'Pop';
    elements.coverPreviewImg.style.display = 'none';
    elements.coverPlaceholder.style.display = 'flex';
    elements.audioFileInput.value = '';
    elements.coverImageInput.value = '';
}

function closeUploadModal() {
    elements.uploadMusicModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    // Only revoke URLs that were NOT saved as songs
    const savedUrls = new Set(songs.filter(s => s.isUploaded).map(s => s.audio));
    uploadedFiles.forEach(f => {
        if (f.objectUrl && !savedUrls.has(f.objectUrl)) {
            URL.revokeObjectURL(f.objectUrl);
        }
        if (f.coverObjectUrl && !savedUrls.has(f.coverObjectUrl)) {
            URL.revokeObjectURL(f.coverObjectUrl);
        }
    });
    uploadedFiles = [];
    selectedCoverFile = null;
}

function handleAudioFileSelect(files) {
    const audioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/flac', 'audio/aac', 'audio/mp4', 'audio/x-m4a'];
    const validFiles = Array.from(files).filter(f => {
        if (f.type && audioTypes.some(t => f.type.includes(t.split('/')[1]))) return true;
        // Also check extension
        const ext = f.name.split('.').pop().toLowerCase();
        return ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'wma'].includes(ext);
    });

    if (validFiles.length === 0) {
        showToast('Please select valid audio files (MP3, WAV, OGG, FLAC, AAC)', 'error');
        return;
    }

    validFiles.forEach(file => {
        const objectUrl = URL.createObjectURL(file);
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        uploadedFiles.push({
            file,
            objectUrl,
            coverObjectUrl: null,
            title: fileName,
            artist: 'Unknown Artist',
            album: 'Unknown Album',
            category: 'Pop'
        });
    });

    renderUploadPreview();
    elements.uploadForm.style.display = 'block';
    elements.saveUploadBtn.disabled = false;

    // Auto-fill title from first file if only one
    if (uploadedFiles.length === 1) {
        elements.uploadSongTitle.value = uploadedFiles[0].title;
    }
}

function renderUploadPreview() {
    elements.uploadPreviewList.innerHTML = uploadedFiles.map((f, index) => `
        <div class="upload-preview-item">
            <div class="upload-preview-icon">
                <i class="fas fa-music"></i>
            </div>
            <div class="upload-preview-info">
                <div class="upload-preview-name">${f.file.name}</div>
                <div class="upload-preview-size">${formatFileSize(f.file.size)}</div>
            </div>
            <button class="upload-preview-remove" onclick="removeUploadedFile(${index})" aria-label="Remove file">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removeUploadedFile(index) {
    if (uploadedFiles[index].objectUrl) URL.revokeObjectURL(uploadedFiles[index].objectUrl);
    if (uploadedFiles[index].coverObjectUrl) URL.revokeObjectURL(uploadedFiles[index].coverObjectUrl);
    uploadedFiles.splice(index, 1);
    renderUploadPreview();
    if (uploadedFiles.length === 0) {
        elements.uploadForm.style.display = 'none';
        elements.saveUploadBtn.disabled = true;
    }
}

function handleCoverImageSelect(file) {
    if (!file || !file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
    }

    if (selectedCoverFile && selectedCoverFile.objectUrl) {
        URL.revokeObjectURL(selectedCoverFile.objectUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    selectedCoverFile = { file, objectUrl };
    elements.coverPreviewImg.src = objectUrl;
    elements.coverPreviewImg.style.display = 'block';
    elements.coverPlaceholder.style.display = 'none';
}

function saveUploadedSongs() {
    const title = elements.uploadSongTitle.value.trim();
    const artist = elements.uploadSongArtist.value.trim();

    if (!title) {
        showToast('Please enter a song title', 'error');
        return;
    }
    if (!artist) {
        showToast('Please enter an artist name', 'error');
        return;
    }
    if (uploadedFiles.length === 0) {
        showToast('Please select at least one audio file', 'error');
        return;
    }

    const coverUrl = selectedCoverFile ? selectedCoverFile.objectUrl : null;

    uploadedFiles.forEach((f, index) => {
        const songId = nextSongId++;
        const newSong = {
            id: songId,
            title: uploadedFiles.length > 1 ? `${title} ${index + 1}` : title,
            artist: artist,
            album: elements.uploadSongAlbum.value.trim() || 'Unknown Album',
            category: elements.uploadSongCategory.value,
            duration: '0:00',
            cover: coverUrl || 'assets/images/default-album.svg',
            audio: f.objectUrl,
            isUploaded: true
        };

        // Get actual duration
        const tempAudio = new Audio();
        tempAudio.src = f.objectUrl;
        tempAudio.addEventListener('loadedmetadata', () => {
            newSong.duration = formatTime(tempAudio.duration);
            updateUploadedSongDuration(songId, newSong.duration);
        });

        songs.push(newSong);

        // Store metadata in localStorage (without the audio data)
        saveUploadedSongMetadata(newSong);
    });

    closeUploadModal();
    renderAll();
    showToast(`${uploadedFiles.length} song(s) added to library!`, 'success');
}

function updateUploadedSongMetadata(songId, duration) {
    try {
        const stored = JSON.parse(localStorage.getItem('vibe_uploaded_metadata')) || [];
        const song = songs.find(s => s.id === songId);
        if (song) {
            const existingIndex = stored.findIndex(m => m.id === songId);
            const metadata = {
                id: song.id,
                title: song.title,
                artist: song.artist,
                album: song.album,
                category: song.category,
                duration: duration,
                isUploaded: true
            };
            if (existingIndex >= 0) {
                stored[existingIndex] = metadata;
            } else {
                stored.push(metadata);
            }
            localStorage.setItem('vibe_uploaded_metadata', JSON.stringify(stored));
        }
    } catch (e) {
        console.warn('Failed to save uploaded metadata:', e);
    }
}

function updateUploadedSongDuration(songId, duration) {
    const song = songs.find(s => s.id === songId);
    if (song) {
        song.duration = duration;
        updateUploadedSongMetadata(songId, duration);
        renderAll();
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ===== Delete Song =====
function deleteSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    // Confirm deletion
    if (!confirm(`Delete "${song.title}" by ${song.artist}?`)) return;

    // If this song is currently playing, stop it
    if (currentSong && currentSong.id === songId) {
        if (audio) {
            audio.pause();
            audio.src = '';
        }
        stopWebAudio();
        currentSong = null;
        isPlaying = false;
        updatePlayPauseIcon();
        elements.playerSongTitle.textContent = 'No song selected';
        elements.playerSongArtist.textContent = 'Select a song to play';
        elements.playerAlbumImg.src = 'assets/images/default-album.svg';
        document.title = 'Vibe - Premium Music Player';
    }

    // Remove from songs array
    const songIndex = songs.findIndex(s => s.id === songId);
    if (songIndex > -1) {
        songs.splice(songIndex, 1);
    }

    // Remove from favorites
    favorites = favorites.filter(id => id !== songId);

    // Remove from recently played
    recentlyPlayed = recentlyPlayed.filter(id => id !== songId);

    // Remove from playlists
    playlists.forEach(pl => {
        pl.songs = pl.songs.filter(id => id !== songId);
    });

    // Remove from queue
    queue = queue.filter(s => s.id !== songId);
    if (queueIndex >= queue.length) queueIndex = queue.length - 1;

    // Revoke object URL if uploaded
    if (song.isUploaded && song.audio && song.audio.startsWith('blob:')) {
        URL.revokeObjectURL(song.audio);
    }

    // Remove metadata from localStorage
    try {
        const stored = JSON.parse(localStorage.getItem('vibe_uploaded_metadata')) || [];
        const updated = stored.filter(m => m.id !== songId);
        localStorage.setItem('vibe_uploaded_metadata', JSON.stringify(updated));
    } catch (e) {}

    saveToStorage();
    renderAll();
    showToast(`"${song.title}" deleted`, 'info');
}

// ===== Queue =====
function toggleQueue() {
    elements.queuePanel.classList.toggle('open');
    renderQueue();
}

function removeFromQueue(index) {
    queue.splice(index, 1);
    if (index < queueIndex) queueIndex--;
    if (index === queueIndex && queue.length > 0) {
        queueIndex = Math.min(queueIndex, queue.length - 1);
    }
    renderQueue();
}

// ===== Search =====
function searchSongs(query) {
    if (!query.trim()) {
        setActiveSection('home');
        elements.clearSearchBtn.classList.remove('visible');
        return;
    }

    elements.clearSearchBtn.classList.add('visible');
    const lowerQuery = query.toLowerCase();
    const results = songs.filter(song =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery)
    );

    setActiveSection('search');

    if (results.length === 0) {
        elements.searchResults.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try searching for another artist or song.</p>
            </div>
        `;
        return;
    }

    elements.searchResults.innerHTML = `
        <div class="songs-list-header">
            <span class="col-num">#</span>
            <span class="col-title">TITLE</span>
            <span class="col-album">ALBUM</span>
            <span class="col-duration"><i class="fas fa-clock"></i></span>
            <span class="col-actions"></span>
        </div>
        <div class="songs-list">
            ${results.map((song, index) => {
                const isCurrentSong = currentSong && currentSong.id === song.id;
                const isFav = favorites.includes(song.id);
                return `
                    <div class="song-item ${isCurrentSong && isPlaying ? 'playing' : ''}" data-song-id="${song.id}" ondblclick="playSongById(${song.id})">
                        <div class="song-item-num">
                            <span class="num-text">${index + 1}</span>
                            <div class="equalizer">
                                <div class="eq-bar"></div>
                                <div class="eq-bar"></div>
                                <div class="eq-bar"></div>
                            </div>
                        </div>
                        <div class="song-item-title-group">
                            <img src="${song.cover}" alt="${song.title}" class="song-item-art" loading="lazy"
                                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 44 44%22%3E%3Crect fill=%22%231a1a28%22 width=%2244%22 height=%2244%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238b5cf6%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.35em%22%3E♪%3C/text%3E%3C/svg%3E'">
                            <div class="song-item-info">
                                <div class="song-item-title">${song.title}</div>
                                <div class="song-item-artist">${song.artist}</div>
                            </div>
                        </div>
                        <div class="song-item-album">${song.album}</div>
                        <div class="song-item-duration">${song.duration}</div>
                        <div class="song-item-actions">
                            <button class="song-action-btn favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${song.id})" aria-label="Toggle favorite">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="song-action-btn play-song-btn" onclick="event.stopPropagation(); playSongById(${song.id})" aria-label="Play ${song.title}">
                                <i class="fas fa-play"></i>
                            </button>
                            <button class="song-action-btn" onclick="event.stopPropagation(); openAddToPlaylistModal(${song.id})" aria-label="Add to playlist">
                                <i class="fas fa-plus"></i>
                            </button>
                            ${song.isUploaded ? `<button class="song-action-btn delete-btn" onclick="event.stopPropagation(); deleteSong(${song.id})" aria-label="Delete song"><i class="fas fa-trash"></i></button>` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function clearSearch() {
    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.remove('visible');
    setActiveSection('home');
}

// ===== Category Filter =====
function filterByCategory(category) {
    activeCategory = category;
    renderCategories();
    renderSongsList();
    renderFeaturedDiscover();
}

// ===== Render All =====
function renderAll() {
    renderFeatured();
    renderRecentlyPlayedGrid();
    renderSongsList();
    renderCategories();
    renderFeaturedDiscover();
    renderPlaylists();
    renderLibrary();
    renderFavorites();
    renderRecentlyPlayedList();
    renderQueue();
}

// ===== Theme Toggle =====
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('vibe_theme', isLight ? 'light' : 'dark');
    const icon = elements.themeToggle.querySelector('i');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}

function loadTheme() {
    const theme = localStorage.getItem('vibe_theme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        const icon = elements.themeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }
}

// ===== Utility =====
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== Keyboard Shortcuts =====
function handleKeyboard(e) {
    // Don't trigger when typing in input
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowRight':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                nextSong();
            }
            break;
        case 'ArrowLeft':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                previousSong();
            }
            break;
        case 'KeyM':
            toggleMute();
            break;
    }
}

// ===== Event Listeners =====
function initEventListeners() {
    // Sidebar
    elements.hamburgerBtn.addEventListener('click', () => {
        elements.sidebar.classList.add('open');
    });

    elements.closeSidebarBtn.addEventListener('click', () => {
        elements.sidebar.classList.remove('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && elements.sidebar.classList.contains('open')) {
            if (!elements.sidebar.contains(e.target) && !elements.hamburgerBtn.contains(e.target)) {
                elements.sidebar.classList.remove('open');
            }
        }
    });

    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveSection(item.dataset.section);
        });
    });

    // Search
    let searchTimeout;
    elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchSongs(e.target.value);
        }, 300);
    });

    elements.clearSearchBtn.addEventListener('click', clearSearch);

    // Theme
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Player controls
    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.nextBtn.addEventListener('click', nextSong);
    elements.prevBtn.addEventListener('click', previousSong);
    elements.shuffleBtn.addEventListener('click', toggleShuffle);
    elements.repeatBtn.addEventListener('click', toggleRepeat);

    // Favorite from player
    elements.playerFavoriteBtn.addEventListener('click', () => {
        if (currentSong) toggleFavorite(currentSong.id);
    });

    // Progress bar
    elements.progressBar.addEventListener('click', seekTo);

    // Progress bar drag (mouse + touch)
    let isDraggingProgress = false;
    elements.progressBar.addEventListener('mousedown', (e) => {
        isDraggingProgress = true;
        seekTo(e);
    });
    document.addEventListener('mousemove', (e) => {
        if (isDraggingProgress) seekTo(e);
    });
    document.addEventListener('mouseup', () => {
        isDraggingProgress = false;
    });
    elements.progressBar.addEventListener('touchstart', (e) => {
        isDraggingProgress = true;
        seekTo(e.touches[0]);
    }, { passive: true });
    elements.progressBar.addEventListener('touchmove', (e) => {
        if (isDraggingProgress) seekTo(e.touches[0]);
    }, { passive: true });
    elements.progressBar.addEventListener('touchend', () => {
        isDraggingProgress = false;
    });

    // Volume
    elements.volumeBtn.addEventListener('click', toggleMute);
    elements.volumeSlider.addEventListener('click', setVolume);

    // Volume drag (mouse + touch)
    let isDraggingVolume = false;
    elements.volumeSlider.addEventListener('mousedown', (e) => {
        isDraggingVolume = true;
        setVolume(e);
    });
    document.addEventListener('mousemove', (e) => {
        if (isDraggingVolume) setVolume(e);
    });
    document.addEventListener('mouseup', () => {
        isDraggingVolume = false;
    });
    elements.volumeSlider.addEventListener('touchstart', (e) => {
        isDraggingVolume = true;
        setVolume(e.touches[0]);
    }, { passive: true });
    elements.volumeSlider.addEventListener('touchmove', (e) => {
        if (isDraggingVolume) setVolume(e.touches[0]);
    }, { passive: true });
    elements.volumeSlider.addEventListener('touchend', () => {
        isDraggingVolume = false;
    });

    // Queue
    elements.queueBtn.addEventListener('click', toggleQueue);
    elements.closeQueueBtn.addEventListener('click', () => {
        elements.queuePanel.classList.remove('open');
    });

    // Playlist Modal
    elements.createPlaylistBtn.addEventListener('click', openCreatePlaylistModal);
    elements.createPlaylistFullBtn.addEventListener('click', openCreatePlaylistModal);
    elements.closeModalBtn.addEventListener('click', closeCreatePlaylistModal);
    elements.cancelPlaylistBtn.addEventListener('click', closeCreatePlaylistModal);
    elements.savePlaylistBtn.addEventListener('click', savePlaylist);
    elements.playlistNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') savePlaylist();
    });

    // Add to Playlist Modal
    elements.closeAddToPlaylistModalBtn.addEventListener('click', closeAddToPlaylistModal);
    elements.cancelAddToPlaylistBtn.addEventListener('click', closeAddToPlaylistModal);

    // Close modals on overlay click
    elements.createPlaylistModal.addEventListener('click', (e) => {
        if (e.target === elements.createPlaylistModal) closeCreatePlaylistModal();
    });
    elements.addToPlaylistModal.addEventListener('click', (e) => {
        if (e.target === elements.addToPlaylistModal) closeAddToPlaylistModal();
    });

    // Upload Music
    elements.addMusicBtn.addEventListener('click', openUploadModal);
    elements.addMusicHeaderBtn.addEventListener('click', openUploadModal);
    elements.closeUploadModalBtn.addEventListener('click', closeUploadModal);
    elements.cancelUploadBtn.addEventListener('click', closeUploadModal);
    elements.saveUploadBtn.addEventListener('click', saveUploadedSongs);
    elements.uploadMusicModal.addEventListener('click', (e) => {
        if (e.target === elements.uploadMusicModal) closeUploadModal();
    });

    // Dropzone click to open file picker
    elements.uploadDropzone.addEventListener('click', () => {
        elements.audioFileInput.click();
    });

    // Audio file input change
    elements.audioFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleAudioFileSelect(e.target.files);
        }
    });

    // Drag and drop on dropzone
    elements.uploadDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadDropzone.classList.add('drag-over');
    });

    elements.uploadDropzone.addEventListener('dragleave', () => {
        elements.uploadDropzone.classList.remove('drag-over');
    });

    elements.uploadDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadDropzone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleAudioFileSelect(e.dataTransfer.files);
        }
    });

    // Cover image upload
    elements.coverUploadArea.addEventListener('click', () => {
        elements.coverImageInput.click();
    });

    elements.coverImageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleCoverImageSelect(e.target.files[0]);
        }
    });

    // Fullscreen
    elements.fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// ===== Initialize =====
function init() {
    initAudio();
    loadFromStorage();
    loadTheme();
    initEventListeners();
    updateGreeting();
    updateVolumeUI();

    // Restore shuffle/repeat state
    elements.shuffleBtn.classList.toggle('active', isShuffle);
    elements.repeatBtn.classList.toggle('active', repeatMode > 0);

    // Set initial volume
    if (audio) audio.volume = currentVolume;

    renderAll();

    // Update greeting periodically
    setInterval(updateGreeting, 60000);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
