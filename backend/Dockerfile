# Backend Dockerfile
FROM node:16 AS build
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Copy app source code
COPY . ./

# Build the TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001
CMD ["node", "dist/index.js"]
