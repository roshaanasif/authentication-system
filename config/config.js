const dotenv=require('dotenv')

dotenv.config()

if (!process.env.MONGO_DB_URI || !process.env.PORT) {
    throw new Error("ENVIRONMENTAL variables missing");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}

if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_USER){
    throw new Error("Google OAuth ENVIRONMENTAL variables missing");
}

const config={
    MONGO_DB_URI:process.env.MONGO_DB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    PORT:process.env.PORT,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER:process.env.GOOGLE_USER
}


module.exports = config;
