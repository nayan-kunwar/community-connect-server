import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;
// Define custom colors
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  verbose: "cyan",
  debug: "blue",
  silly: "grey",
};

// Add colors to winston
winston.addColors(colors);

// For console: colorized & formatted
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  })
);

// For file: JSON with timestamp
const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  json()
);

const transportFile = new winston.transports.DailyRotateFile({
  dirname: "logs",
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxFiles: "14d",
  level: "info",
});

const transportError = new winston.transports.DailyRotateFile({
  dirname: "logs",
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxFiles: "30d",
  level: "error",
});

const logger = winston.createLogger({
  level: "info",
  format: fileFormat,
  transports: [transportFile, transportError],
});
logger.levels = {
  ...winston.config.npm.levels,
  http: 4,
};
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

export default logger;
