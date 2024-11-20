"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use((0, cors_1.default)({
    origin: 'https://localhost',
    credentials: true
}));
app.use(express_1.default.json()); // This line is essential for parsing JSON
// Routes
app.use('/api/users', userRoutes_1.default); // Ensure this matches the URL used in the frontend
const httpsOptions = {
    key: fs_1.default.readFileSync('certs/localhost.key'),
    cert: fs_1.default.readFileSync('certs/localhost.crt')
};
https_1.default.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
