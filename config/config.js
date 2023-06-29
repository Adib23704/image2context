import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
dotenv.config();

export const httpClient = axios.create({
    baseURL: 'https://www.astica.org:9141/vision',
    timeout: 60 * 1e3,
    headers: { "Content-Type": "application/json" },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});