"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
async function ensureDb() {
    try {
        if (mongoose_1.default.connection.readyState === 1)
            return; // already connected
        if (!config_1.default.database_url)
            throw new Error('DATABASE_URL is missing');
        await mongoose_1.default.connect(config_1.default.database_url);
    }
    catch (err) {
        console.error('❌ Database connection error:', err);
        throw err;
    }
}
// Local dev: start HTTP server
if (!process.env.VERCEL) {
    ensureDb()
        .then(() => {
        const port = Number(config_1.default.port) || 5000;
        app_1.default.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
        .catch(() => {
        process.exit(1);
    });
}
// Vercel/serverless handler: ensure DB per invocation and delegate to Express
async function handler(req, res) {
    // Respond to health checks without touching the database
    if (req.url?.startsWith('/health')) {
        return res.status(200).json({ ok: true });
    }
    try {
        await ensureDb();
    }
    catch {
        return res.status(500).send('Internal Server Error');
    }
    return (0, app_1.default)(req, res);
}
//# sourceMappingURL=server.js.map