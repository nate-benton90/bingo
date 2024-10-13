# Backend Dockerfile

FROM node:16

WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install
RUN npm install --save-dev @types/express @types/bcryptjs @types/jsonwebtoken @types/pg @types/cors @types/node

# Copy app source code
COPY . ./

# Build the TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD ["npm", "start"]
