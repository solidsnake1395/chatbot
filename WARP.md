# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a full-stack chatbot application integrating Google's Gemini AI API. The architecture follows a client-server pattern with React frontend and Express backend communicating through REST API.

### Core Architecture

**Frontend (React + Vite)**
- Single Page Application with real-time chat interface
- Built with React 19, using modern hooks (useState, useRef, useEffect)
- Vite-based development server with HMR and proxy configuration
- Component structure: `App.jsx` → `Chat.jsx` (main chat interface)

**Backend (Express + Node.js)**
- RESTful API server on port 5000
- Single `/api/chat` endpoint for Google Gemini AI integration
- Uses `@google/genai` SDK with `gemini-2.0-flash` model
- Environment-based configuration for API keys

**Key Integration Points**
- Vite proxy redirects `/api/*` requests from frontend to backend (`http://localhost:5000`)
- Frontend communicates with backend via fetch API calls
- Error handling implemented on both client and server sides

## Development Commands

### Setup and Installation
```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env file with: GEMINI_API_KEY=your_api_key_here
```

### Development Workflow
```bash
# Start frontend development server (port 3000)
npm run dev

# Start backend server (port 5000) - run in separate terminal
node server/server.js
```

### Build and Production
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

## Environment Configuration

**Required Environment Variables:**
- `GEMINI_API_KEY`: Google Gemini AI API key (stored in `.env`)

**Port Configuration:**
- Frontend dev server: 3000 (Vite default)
- Backend API server: 5000 (configurable in `server/server.js`)
- Proxy setup in `vite.config.js` routes frontend API calls to backend

## Key Files and Structure

**Frontend:**
- `src/Chat.jsx`: Main chat component with message state management and UI
- `src/Chat.css`: Chat interface styling
- `vite.config.js`: Development server and proxy configuration

**Backend:**
- `server/server.js`: Express server with Gemini AI integration
- `.env`: Environment variables (not in version control)

**Configuration:**
- `package.json`: Scripts and dependencies
- `eslint.config.js`: Linting rules with React-specific plugins
- `.gitignore`: Standard Vite/React gitignore with Node.js additions

## Development Notes

**AI Integration:**
- Uses Google's `@google/genai` library (not `@google/generative-ai`)
- Model: `gemini-2.0-flash`
- Request format: `{ message: string }` → `{ reply: string }`

**Frontend State Management:**
- Messages stored in local component state (useState)
- Loading states handled for better UX
- Auto-scroll to bottom on new messages

**Error Handling:**
- Frontend displays user-friendly error messages
- Backend logs errors and returns structured error responses
- API connection failures gracefully handled

## Testing and Development

Since this is a real-time chat application, test both frontend and backend simultaneously:

1. Start backend: `node server/server.js`
2. Start frontend: `npm run dev`  
3. Verify proxy works by testing chat functionality
4. Check browser console and server logs for errors

Remember to ensure the Gemini API key is properly configured in the `.env` file before testing AI functionality.