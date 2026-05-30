# Zexon Zadanie

A simple React application for tracking device UUIDs and their current battery percentages.

## Project Initialization
As no NextJS allowed, I assumed no framework should be used, so used Vite tool to init React App

```npm create vite@latest zexon -- --template react-ts```

## Prerequisites
- Node.js
- npm or yarn

## Backend [server.js](server.js)

There is also simple express backend to handle API requests (GET & POST) 

## How to Run

1. **Install dependencies**

   ```npm install```

2. **Run application** (Will run also server.js to handle API requests)

   ```npm run dev``` [Run script](package.json#L7)

## App Structure
1. **Components** [Components](./src/components/)

2. **API Functions** [API Functions](./src/functions/api.ts)

3. **Components** [Zod Schemas](./src/schemas/index.ts)

## Note
The application expects **React App** running on vite default **port 5173**  
http://localhost:5173

The application expects a **Backend Server** running on **port 3001** to handle API requests.  
http://localhost:3001
