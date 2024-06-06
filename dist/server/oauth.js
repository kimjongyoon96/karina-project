"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeCodeForAccessToken = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
async function exchangeCodeForAccessToken(code) {
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const data = new URLSearchParams({
        client_id: process.env.CLIENT_ID || "",
        client_secret: process.env.CLIENT_SECRET || "",
        code,
        redirect_uri: `${process.env.REACT_APP_API_URL}/auth/google/redirect`,
        grant_type: "authorization_code",
    }).toString();
    try {
        const response = await axios_1.default.post(tokenUrl, data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const { access_token, refresh_token } = response.data;
        return { access_token, refresh_token };
    }
    catch (error) {
        console.error("Error exchanging authorization code for access token:", error);
        throw error;
    }
}
exports.exchangeCodeForAccessToken = exchangeCodeForAccessToken;
exports.default = exchangeCodeForAccessToken;
