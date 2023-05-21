import {config} from "dotenv";

config();

export default {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "nodejs-api",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 3306,
    timeout: process.env.DB_TIMEOUT || 10000
};