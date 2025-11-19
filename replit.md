# Secure Real-Time Multiplayer Game

## Overview
This is a FreeCodeCamp Information Security project - a real-time multiplayer game built with Express.js, Socket.IO, and HTML5 Canvas. The game is designed to be secure and handle multiple players simultaneously in real-time.

## Project Structure
- `server.js` - Main Express server with Socket.IO integration
- `public/` - Client-side game files
  - `game.mjs` - Main game logic (ES module)
  - `Player.mjs` - Player class definition
  - `Collectible.mjs` - Collectible items class
  - `style.css` - Game styling
- `views/` - HTML templates
  - `index.html` - Main game page
- `routes/` - API routes
  - `fcctesting.js` - FreeCodeCamp testing routes
- `tests/` - Test files
  - `1_unit-tests.js` - Unit tests
  - `2_functional-tests.js` - Functional tests

## Technology Stack
- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML5 Canvas, ES6 Modules
- **Security**: Helmet.js, CORS
- **Testing**: Mocha, Chai

## Configuration
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows external connections)
- **CORS**: Enabled for all origins (for FCC testing)

## Running the Application
The application runs automatically via the "Start application" workflow. The server listens on port 5000 and serves:
- Main game page at `/`
- Static assets from `/public` and `/assets`
- Socket.IO client library at `/socket.io/socket.io.js`

## Development Notes
- Socket.IO is initialized and connected to the Express server
- The game uses ES6 modules on the client side
- CORS is enabled for FreeCodeCamp testing purposes
- Dependencies are managed via npm

## Recent Changes (November 18, 2025)
- Configured server to run on port 5000 and bind to 0.0.0.0 for Replit compatibility
- Initialized Socket.IO server with connection/disconnection handlers
- Installed all npm dependencies
- Set up workflow for automatic application startup

## Next Steps
This is a boilerplate project. The game logic needs to be implemented in:
- `public/Player.mjs` - Player movement, collision detection, and ranking
- `public/Collectible.mjs` - Collectible item behavior
- `public/game.mjs` - Game loop, rendering, and Socket.IO event handlers
- `server.js` - Server-side game state management and Socket.IO events
