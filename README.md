# Haverford College Qiskit Fall Fest 2025 - Professional Edition

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

This project is part of the Haverford College Qiskit Fall Fest 2025.

For questions or issues:
- Email: haverfordquantum@gmail.com
- Discord: [Join our server](https://discord.gg/qPmNF3ae)

---

**Built with ❤️ for Qiskit Fall Fest 2025**
