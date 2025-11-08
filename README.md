# Haverford College Qiskit Fall Fest 2025 - Professional Edition

A modern, professional website for the Haverford College Qiskit Fall Fest 2025 with enhanced speaker management and poster display functionality.

## 🎉 What's New in This Version

### Major Improvements

1. **Dedicated Speakers Page**
   - Professional speaker cards with detailed information
   - Modal dialogs for full speaker profiles
   - Speaker bios, credentials, and social links
   - Session times and locations

2. **Speaker Poster Functionality**
   - Upload and display speaker presentation posters
   - Full-screen lightbox viewer with zoom controls
   - Download capability for posters
   - Responsive design for all devices

3. **Bug Fixes**
   - Fixed JavaScript file reference issue
   - Corrected HTML structure problems in organizers.html
   - Fixed footer structure in index.html
   - Improved navigation consistency

4. **Enhanced Professional Appearance**
   - Improved typography and spacing
   - Consistent styling across all pages
   - Smooth animations and transitions
   - Better visual hierarchy

## 📁 Project Structure

```
HaverfordQuantum-Professional/
├── index.html              # Home page
├── about.html             # About Us page
├── speakers.html          # NEW: Speakers page with poster functionality
├── organizers.html        # Organizers page (HTML structure fixed)
├── sponsors.html          # Sponsors page
├── registration.html      # Registration page
├── styles.css            # Main stylesheet (enhanced with speaker styles)
├── script.js             # Main JavaScript file (renamed from complete-js-file.js)
├── speakers.js           # NEW: Speaker page functionality
├── speakers-data.json    # NEW: Speaker data structure
└── [images]              # All image assets
```

## 🚀 Getting Started

### Quick Start

1. **Clone or download this repository**
2. **Open `index.html` in a web browser** - That's it!

This is a static website, so no build process or server is required.

### For Development

If you want to test locally with a development server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Then open: http://localhost:8000
```

## 📝 How to Add Speakers and Posters

### Step 1: Edit the Speaker Data

Open `speakers-data.json` and add your speaker information:

```json
{
  "id": "speaker1",
  "name": "Dr. Jane Smith",
  "title": "Quantum Computing Researcher",
  "organization": "IBM Quantum",
  "bio": "Dr. Smith is a leading researcher in quantum algorithms...",
  "talkTitle": "Introduction to Quantum Machine Learning",
  "talkAbstract": "In this talk, we will explore...",
  "image": "speakers/jane-smith.jpg",
  "poster": "posters/jane-smith-poster.pdf",
  "sessionTime": "November 14th, 2:00 PM - 3:00 PM",
  "sessionRoom": "Room 301, KINSC",
  "social": {
    "linkedin": "https://linkedin.com/in/janesmith",
    "twitter": "https://twitter.com/janesmith",
    "website": "https://janesmith.com"
  }
}
```

### Step 2: Add Speaker Images

1. Create a `speakers` folder in the root directory
2. Add speaker headshot images (recommended: 600x600px, square format)
3. Reference them in `speakers-data.json` as shown above

### Step 3: Add Speaker Posters

1. Create a `posters` folder in the root directory
2. Add poster images (JPG/PNG) or PDFs
3. Reference them in the `poster` field in `speakers-data.json`

**Note:** If a speaker doesn't have a poster yet, set `"poster": null` in the JSON file.

## ✨ Key Features

### Speaker Management
- **Dynamic Loading**: Speakers load from JSON file for easy updates
- **Rich Profiles**: Display full bios, credentials, and social links
- **Session Details**: Show times and locations for each talk

### Poster Viewing
- **Thumbnail Preview**: See poster thumbnails in speaker profiles
- **Full-Screen View**: Click to view posters in full-screen lightbox
- **Zoom Controls**: Zoom in/out and reset zoom on posters
- **Download**: Direct download links for all posters

### Responsive Design
- Fully responsive across desktop, tablet, and mobile
- Touch-friendly controls for mobile devices
- Optimized images for faster loading

### Professional Polish
- Smooth animations and transitions
- Consistent branding and color scheme
- Accessible design (keyboard navigation supported)
- Modern glassmorphism effects

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css` (lines 9-22):

```css
:root {
    --primary-purple: #8b5cf6;
    --primary-blue: #3b82f6;
    --primary-pink: #ec4899;
    --dark-bg: #0f0f23;
    --darker-bg: #050510;
}
```

### Styling

All speaker-specific styles are in `styles.css` starting at line 1101:
- Speaker cards
- Modal dialogs
- Poster lightbox
- Responsive breakpoints

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: No framework dependencies
- **JSON**: Data-driven content management

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight (no external dependencies)
- Fast loading times
- Optimized images recommended
- Static site (no server-side processing)

## 📱 Pages Overview

1. **Home** (`index.html`)
   - Hero section with event details
   - Program overview
   - Featured speakers preview
   - Sponsors showcase

2. **About Us** (`about.html`)
   - Mission statement
   - Event information
   - FAQ section

3. **Speakers** (`speakers.html`) ⭐ NEW
   - Full speaker directory
   - Detailed profiles with modals
   - Poster viewing functionality

4. **Organizers** (`organizers.html`)
   - Lead organizers
   - Core team members
   - Contact information

5. **Sponsors** (`sponsors.html`)
   - Sponsor tiers
   - Logo showcase

6. **Registration** (`registration.html`)
   - Registration information
   - Countdown timer

## 🆚 Comparison with Original

### What's Fixed
- ✅ JavaScript file reference bug resolved
- ✅ HTML structure errors corrected
- ✅ Footer inconsistencies fixed
- ✅ Navigation updated across all pages

### What's Added
- ✅ Complete speakers page with poster functionality
- ✅ Speaker data management system (JSON)
- ✅ Modal dialogs for detailed information
- ✅ Poster lightbox with zoom controls
- ✅ Enhanced professional styling
- ✅ Improved responsive design

### What's Improved
- ✅ Better code organization
- ✅ More consistent styling
- ✅ Enhanced user experience
- ✅ Better accessibility

## 📄 License

This project is part of the Haverford College Qiskit Fall Fest 2025.

## 🤝 Contributing

To update speaker information:
1. Edit `speakers-data.json`
2. Add images to appropriate folders
3. Test locally
4. Deploy updated files

## 📞 Support

For questions or issues:
- Email: haverfordquantum@gmail.com
- Discord: [Join our server](https://discord.gg/qPmNF3ae)

---

**Built with ❤️ for Qiskit Fall Fest 2025**

*Enhanced with Claude Code - Making quantum computing accessible to everyone!*
