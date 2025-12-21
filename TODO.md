# TODO: Fix Index.html Development Issue

## Problem Analysis
- Backend only serves frontend in production mode (`NODE_ENV === "production"`)
- No build folder exists for frontend
- Missing development setup for frontend-backend integration
- Vite dev server and Express server need proper coordination

## Plan

### Step 1: Fix Backend Development Setup
- [ ] Update backend server.js to handle development mode
- [ ] Add proxy configuration for frontend API calls
- [ ] Configure CORS for development
- [ ] Add development-specific route handling

### Step 2: Update Frontend Configuration
- [ ] Configure Vite proxy to backend during development
- [ ] Update API base URLs for development vs production
- [ ] Add development environment configuration

### Step 3: Build and Test Setup
- [ ] Create build folder for production
- [ ] Test both development and production modes
- [ ] Update package.json scripts for easier development

### Step 4: Environment Configuration
- [ ] Create proper .env files for both frontend and backend
- [ ] Set up NODE_ENV properly
- [ ] Configure ports and URLs

## Expected Outcomes
- Frontend accessible during development (http://localhost:5173)
- Backend API accessible during development (http://localhost:5000)
- Production build works with static file serving
- Proper development workflow established
