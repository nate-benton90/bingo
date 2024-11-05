# Use Node.js for building the React app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies, including Tailwind CSS, PostCSS, and Autoprefixer
RUN npm install
RUN npm install -D tailwindcss postcss autoprefixer

# Copy everything else (this includes the public and src directories)
COPY . .

# Build the React app with Tailwind CSS
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
