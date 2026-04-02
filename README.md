# VIN Decoder

**VIN Decoder** is a lightweight Single Page Application (SPA) that decodes a Vehicle Identification Number (VIN) to extract detailed information about a vehicle. It utilizes the public [NHTSA API](https://vpic.nhtsa.dot.gov/api/) for comprehensive and official vehicle variables.

**[Live Demo](https://dimononon.github.io/vin-decoder/)**

---

## Features

- **VIN Decoding:** Input a 17-character VIN to fetch make, model, year, and detailed specifications.
- **Search History:** Automatically saves your 3 most recent, successful VIN decodes locally using `localStorage`.
- **Global Caching:** Vehicle Variables definitions are fetched once from the API and cached globally via React Context to severely reduce unnecessary network traffic.
- **Variable Encyclopedia:** Full list of available vehicle variables, filtered through a real-time, case-insensitive search feature.
- **Minimalistic UI:** Custom-built relying securely on modern Vanilla CSS with strict BEM structure formatting.
- **Robust Validation:** Strict pre-submission input rules (removes illegal `I`, `O`, `Q` characters, adheres to standard 17 string-length boundaries).

## Tech Stack

- **Framework:** React 19 (Hooks, Context, Memoization)
- **Routing:** React Router v7 (`HashRouter` natively configured for GitHub pages)
- **Language:** TypeScript
- **Styling:** Vanilla CSS3 + variables + layout Grid/Flexbox
- **Build Tool:** Vite

## Getting Started

### Prerequisites

Make sure you have Node.js and NPM installed on your machine.

### Installation & Local Server

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dimononon/vin-decoder.git
   cd vin-decoder
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   _The application will now be running on `http://localhost:5173/vin-decoder/`_

### Building for Production

To generate a fully optimized and minified production build:

```bash
npm run build
```

### Deployment (GitHub Pages)

The project includes automated deployment scripts specifically designed for simple push-and-forget publishing.
To publish your local changes to `gh-pages` branch, simply run:

```bash
npm run deploy
```

## API Reference

This project strictly relies on the U.S. Department of Transportation (`NHTSA`).

- **Decode Endpoint:** `/vehicles/decodevin/{vin}?format=json`
- **Variables Endpoint:** `/vehicles/getvehiclevariablelist?format=json`
