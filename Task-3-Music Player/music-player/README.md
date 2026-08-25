# Vibe - Premium Music Player

A modern, responsive web-based music player application with a premium dark streaming interface inspired by Spotify, Apple Music, and YouTube Music.

## Features

### Core Music Player
- Play/Pause, Previous, Next track controls
- Progress bar with seek functionality
- Volume control with mute/unmute
- Shuffle and Repeat modes (off, repeat all, repeat one)
- Automatic next song on track end

### Library & Discovery
- Featured music section with album artwork
- Popular songs list with sorting
- Browse by category (Pop, Hip Hop, Rock, Electronic, Jazz, Classical, Lo-Fi, Workout, Chill)
- Dynamic search across songs, artists, and albums
- Recently played tracking

### Playlist Management
- Create custom playlists
- Add/remove songs from playlists
- Play entire playlists
- Delete playlists
- View playlist details

### Favorites System
- Heart/favorite songs
- View all favorited songs
- Animated heart icons
- Persisted in localStorage

### Queue System
- View playing queue
- Play songs directly from queue
- Remove songs from queue

### UI/UX Features
- Premium dark theme with glassmorphism effects
- Light/dark theme toggle
- Dynamic time-based greeting
- Toast notifications for actions
- Responsive design (desktop, tablet, mobile)
- Smooth animations and transitions
- Album artwork with hover effects
- Animated equalizer for playing songs
- Hamburger menu for mobile navigation

### Keyboard Shortcuts
- `Space` - Play/Pause
- `Ctrl+Right Arrow` - Next song
- `Ctrl+Left Arrow` - Previous song
- `M` - Mute/Unmute

### Data Persistence
- Favorites stored in localStorage
- Playlists stored in localStorage
- Recently played history
- Volume and playback preferences
- Theme preference

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- HTML5 Audio API
- Web Audio API (for demo tone generation)
- Font Awesome 6.5.1 (icons)
- Google Fonts (Inter)

## Folder Structure

```
music-player/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── album1.svg - album15.svg
│   │   └── default-album.svg
│   └── music/
│       └── (audio files)
└── README.md
```

## How to Run

1. Clone or download the project
2. Open `index.html` in a modern web browser
3. The application runs entirely client-side - no server required

## How to Add Music

1. Add your audio files (MP3, WAV, OGG) to `assets/music/`
2. Add album cover images (JPG, PNG, SVG) to `assets/images/`
3. Update the `songs` array in `js/script.js`:

```javascript
{
    id: 16,
    title: "Your Song Title",
    artist: "Artist Name",
    album: "Album Name",
    category: "Pop",
    duration: "3:45",
    cover: "assets/images/your-cover.jpg",
    audio: "assets/music/your-song.mp3"
}
```

## How localStorage Works

The application stores user data in the browser's localStorage:

| Key | Description |
|-----|-------------|
| `vibe_favorites` | Array of favorited song IDs |
| `vibe_playlists` | Array of playlist objects with songs |
| `vibe_recentlyPlayed` | Array of recently played song IDs |
| `vibe_volume` | Current volume level (0-1) |
| `vibe_muted` | Mute state (true/false) |
| `vibe_shuffle` | Shuffle state (true/false) |
| `vibe_repeat` | Repeat mode (0=off, 1=all, 2=one) |
| `vibe_theme` | Theme preference (light/dark) |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- [ ] Audio visualizer
- [ ] Drag and drop file upload
- [ ] Import/Export playlists
- [ ] Search history
- [ ] Crossfade between songs
- [ ] Audio equalizer
- [ ] Lyrics display
- [ ] Social sharing
- [ ] PWA support
- [ ] Offline mode

## License

This project is for educational purposes. Demo audio files are placeholders - replace with your own content or royalty-free music.

## Screenshots

*Coming soon - add screenshots of the application here*
