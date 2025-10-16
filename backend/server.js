import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { connectDB } from "./config/dbConnection.js";
import router from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Import models (this triggers model definitions + associations)
import "./models/index.js";

// Import the syncModels function
import { syncModels } from './models/index.js';

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
// Increase payload size limit for image uploads (base64 encoded images can be large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: [process.env.USER_URL, process.env.ADMIN_URL, process.env.SELLER_URL],
  credentials: true,
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(colors.red("Error:"), err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    await syncModels();
    
    console.log(colors.green("✅ Database & Tables Synced Successfully!"));
    
    app.listen(PORT, () => {
      console.log(colors.cyan(`🚀 Server running on port ${PORT}`));
      console.log(colors.yellow(`📝 Environment: ${process.env.NODE_ENV || 'development'}`));
    });
  } catch (error) {
    console.error(colors.red("❌ Failed to start server:"), error);
    process.exit(1);
  }
};

startServer();
