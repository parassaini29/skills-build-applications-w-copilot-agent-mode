"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.use('/api', api_1.default);
async function start() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
}
start().catch((error) => {
    console.error('Failed to start backend:', error);
    process.exit(1);
});
