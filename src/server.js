import { app } from "./app.js";
import { config } from "./config/config.js"; 
import { connectToMongoDB } from "./config/db.js";
import logger from "./utils/logger.js";

connectToMongoDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  });
