# Onboarding Privacy Meta SDK

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd onboarding-privacy-meta-sdk
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Meta SDK Initialization
To initialize the Meta SDK, you must provide your Facebook Pixel ID:
1. Create a `.env` file in the project root (if it doesn't exist).
2. Add the following line, replacing `your-pixel-id` with your actual Facebook Pixel ID:
   ```env
   REACT_APP_FACEBOOK_PIXEL_ID=your-pixel-id
   ```

### Running the App
Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production
To create an optimized production build:
```bash
npm run build
```

### Project Structure
- `src/` - Source code for the app
- `public/` - Static assets
- `package.json` - Project metadata and scripts

---


