
# Bingo

This project is an over-engineered full-stack application designed to integrate multiple software components for experimentation and testing.

## Project Overview

This repository contains a full-stack application with a frontend, backend, database, and proxy server. The entire application is containerized using Docker and orchestrated with Docker Compose.

## Repository Structure

```
backend/
    Dockerfile
    package.json
    src/
        controllers/
            userController.ts
        db.ts
        index.ts
        routes/
            userRoutes.ts
    tsconfig.json
certs/
    localhost.crt
    localhost.key
db/
    init.sql
docker-compose.yml
frontend/
    .env
    Dockerfile
    package.json
    postcss.config.js
    public/
        index.html
    src/
        App.tsx
        CapybaraPage.tsx
        index.css
        index.tsx
    tailwind.config.js
    tsconfig.json
proxy/
    default.conf
    Dockerfile
README.md
```

---

## Services

### Frontend
- **Framework**: React with TypeScript.
- **Styling**: Tailwind CSS.
- **Server**: Nginx.
- **Configuration**: `.env`.

### Backend
- **Framework**: Express.js with TypeScript.
- **Database**: PostgreSQL.
- **Environment Variables**: Defined in `docker-compose.yml`.

### Database
- **Service**: PostgreSQL.
- **Initialization Script**: `db/init.sql`.

### Proxy
- **Service**: Nginx.
- **Purpose**: Handles HTTPS and routes traffic.

---

## Docker Compose Configuration

The services are defined in `docker-compose.yml`. Below is a summary:

- **Frontend**:
  - Port: `80`.
- **Backend**:
  - Port: `3001`.
  - Dependencies: Database.
- **Database**:
  - Port: `5432`.
  - Persistent storage: `postgres_data`.
- **Proxy**:
  - Ports: `80`, `443`.

### Volumes
- **PostgreSQL Data**: Persistent storage for database data.

---

## Running the Application

### Start Services
```sh
docker-compose up --build
```

### Stop Services
```sh
docker-compose down
```

### Access Points
- **Frontend**: `http://localhost`
- **Backend**: `http://localhost:3001`
- **Database**: `localhost:5432`
- **Proxy**: `https://localhost`

---

## Development Instructions

### Backend
1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Start development server:
   ```sh
   npm run dev
   ```

### Frontend
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start development server:
   ```sh
   npm start
   ```

---

## Infrastructure Diagram

The following diagram illustrates the application's architecture:

![Infrastructure Diagram](diagram.png)
