# Bingo

This is an over-engineered full stack that incorperates a lof
of different software for just the simple reason of being
able to quickly and easily configure and test "stuff" as
the user wants.

Enjoy.

---

Determining workspace structure

Deciding which workspace information to collect

Gathering workspace info

# Project Overview

This repository contains a full-stack application with a frontend, backend, database, and proxy server. The application is containerized using Docker and orchestrated with Docker Compose.

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

## Services

### Frontend

The frontend is a React application built with TypeScript. It uses Tailwind CSS for styling.

- **Dockerfile**: Builds the React app and serves it using Nginx.
- **Environment Variables**: Configured in `.env` file.
- **Build Context**: [`[`./frontend`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22.%2Ffrontend%22%5D "docker-compose.yml")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Ffrontend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\frontend")

### Backend

The backend is an Express.js application built with TypeScript. It connects to a PostgreSQL database.

- **Dockerfile**: Installs dependencies, builds the TypeScript files, and runs the application.
- **Environment Variables**: Configured in [``docker-compose.yml``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fdocker-compose.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\docker-compose.yml").
- **Build Context**: [`[`./backend`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22.%2Fbackend%22%5D "docker-compose.yml")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fbackend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\backend")

### Database

The database service uses PostgreSQL.

- **Image**: `postgres:13`
- **Volumes**: 
  - [`postgres_data`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22postgres_data%22%5D "docker-compose.yml") for persistent storage.
  - [`[`./db/init.sql`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22.%2Fdb%2Finit.sql%22%5D "docker-compose.yml")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fdb%2Finit.sql%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\db\init.sql") for initializing the database.

### Proxy

The proxy service uses Nginx to handle HTTPS and route traffic to the frontend and backend services.

- **Dockerfile**: Configures Nginx.
- **Volumes**: 
  - [`[`./proxy/default.conf`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22.%2Fproxy%2Fdefault.conf%22%5D "docker-compose.yml")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fproxy%2Fdefault.conf%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\proxy\default.conf") for Nginx configuration.
  - [``./certs``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fcerts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\certs") for SSL certificates.

## Docker Compose

The [``docker-compose.yml``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fdocker-compose.yml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\docker-compose.yml") file orchestrates the services.

```yml
services:
  frontend:
    build:
      context: ./frontend
    environment:
      - REACT_APP_API_BASE_URL=https://localhost
  backend:
    build:
      context: ./backend
    expose:
      - "3001"
    ports:
      - "3001:3001"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: bloopdb
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: bloopdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
  proxy:
    build:
      context: ./proxy
    volumes:
      - ./proxy/default.conf:/etc/nginx/conf.d/default.conf
      - ./certs:/etc/nginx/certs
    ports:
      - "443:443"
      - "80:80"
    depends_on:
      - frontend
      - backend
volumes:
  postgres_data:
```

## Running the Application

1. **Build and start the services**:
   ```sh
   docker-compose up --build
   ```

2. **Access the application**:
   - Frontend: `http://localhost`
   - Backend: `http://localhost:3001`
   - Database: `localhost:5432`
   - Proxy: `https://localhost`

## SSL Certificates

The [``certs``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fcerts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\certs") directory contains SSL certificates used by the proxy service to enable HTTPS.

- `localhost.crt`: SSL certificate.
- `localhost.key`: SSL key.

## Backend API

The backend exposes a REST API for user management.

- **Base URL**: `/api/users`
- **Routes**: Defined in [`[`backend/src/routes/userRoutes.ts`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22backend%2Fsrc%2Froutes%2FuserRoutes.ts%22%5D "docker-compose.yml")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fbackend%2Fsrc%2Froutes%2FuserRoutes.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\backend\src\routes\userRoutes.ts")
- **Controllers**: Defined in [`[`backend/src/controllers/userController.ts`](command:_github.copilot.openSymbolInFile?%5B%22docker-compose.yml%22%2C%22backend%2Fsrc%2Fcontrollers%2FuserController.ts%22%5D "docker-compose.yml")`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fnbent%2Fdev_testing%2Ffullstack%2Fbingo%2Fbackend%2Fsrc%2Fcontrollers%2FuserController.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\nbent\dev_testing\fullstack\bingo\backend\src\controllers\userController.ts")

## Frontend Application

The frontend is a React application that interacts with the backend API.

- **Entry Point**: [`frontend/src/index.tsx`](command:_github.copilot.openSymbolInFile?%5B%22frontend%2Fsrc%2Findex.tsx%22%2C%22frontend%2Fsrc%2Findex.tsx%22%5D "frontend/src/index.tsx")
- **Pages**: Defined in [`frontend/src/CapybaraPage.tsx`](command:_github.copilot.openSymbolInFile?%5B%22frontend%2Fsrc%2FCapybaraPage.tsx%22%2C%22frontend%2Fsrc%2FCapybaraPage.tsx%22%5D "frontend/src/CapybaraPage.tsx")

## Proxy Configuration

The proxy service uses Nginx to route traffic and handle SSL termination.

- **Configuration**: Defined in [`proxy/default.conf`](command:_github.copilot.openSymbolInFile?%5B%22proxy%2Fdefault.conf%22%2C%22proxy%2Fdefault.conf%22%5D "proxy/default.conf")

## Database Initialization

The database is initialized with a SQL script.

- **Initialization Script**: [`db/init.sql`](command:_github.copilot.openSymbolInFile?%5B%22db%2Finit.sql%22%2C%22db%2Finit.sql%22%5D "db/init.sql")

## Development

### Backend

1. **Install dependencies**:
   ```sh
   cd backend
   npm install
   ```

2. **Start the development server**:
   ```sh
   npm run dev
   ```

### Frontend

1. **Install dependencies**:
   ```sh
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```sh
   npm start
   ```

## Building and Running with Docker

1. **Build and start the services**:
   ```sh
   docker-compose up --build
   ```

2. **Stop the services**:
   ```sh
   docker-compose down
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.