import morgan from "morgan";
import logger from "../config/logger.js";

// Custom morgan format using Winston
const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

// Define morgan middleware
const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream,
    skip: () => process.env.NODE_ENV === "test", // skip logs in test
  }
);

export default httpLogger;
