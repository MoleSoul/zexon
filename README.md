# Zexon Zadanie

A simple React application for tracking device UUIDs and their current battery percentages.

## Project Initialization
As no NextJS allowed, I assumed no framework should be used, so used Vite tool to init React App

```npm create vite@latest zexon -- --template react-ts```

## Prerequisites
- Node.js
- npm or yarn

## Backend

There is also simple express backend to handle API requests (GET & POST) - server.js

## How to Run

1. **Install dependencies**

   ```npm install```

2. **Run application** (Will run also server.js to handle API requests)

   ```npm run dev```

## Note
The application expects React app running on vite default port http://localhost:5173 

The application expects a backend server running on http://localhost:3001 to handle API requests.
