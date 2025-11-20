import logger from "../config/logger.js";

export const logInfo = (message, meta) => {
  logger.info(message, meta);
};

export const logError = (message, meta) => {
  logger.error(message, meta);
};

export default logger;
