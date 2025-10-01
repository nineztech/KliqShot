import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 60000,  // Connection timeout
    },
    pool: {
      max: 20,                // Maximum number of connections in pool
      min: 5,                 // Minimum number of connections in pool
      acquire: 60000,         // Maximum time to get connection from pool
      idle: 10000,            // Maximum time connection can be idle
      evict: 1000,            // Check for idle connections every 1s
    },
    logging: false, 
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ],
      max: 3
    }
  }
);

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(colors.green("✅ MySQL Database Connected Successfully!"));
  } catch (error) {
    console.error(colors.red("❌ Error connecting to MySQL:"), error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };