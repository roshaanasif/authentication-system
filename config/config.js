const dotenv=require('dotenv')

dotenv.config()

if (!process.env.MONGO_DB_URI || !process.env.PORT) {
    throw new Error("ENVIRONMENTAL variables missing");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}

const config={
    MONGO_DB_URI:process.env.MONGO_DB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    PORT:process.env.PORT
}


module.exports = config;
