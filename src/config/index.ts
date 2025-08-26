import dotenv from "dotenv";
import path from "path";

dotenv.config()

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT  ? parseInt(process.env.PORT, 10) : 4000,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4000'],
    db: {
      filename: process.env.DB_FILENAME || './database.sqlite'
    }

}

export default config
