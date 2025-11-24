import ApiError from "../../utils/errors/api-error.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApiError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // Mongo duplicate key: parse key from err.keyValue or err.message
  const value = err.keyValue ? JSON.stringify(err.keyValue) : "Duplicate field";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new ApiError(message, 400);
};

const handleJWTError = () =>
  new ApiError("Invalid token. Please log in again.", 401);
const handleJWTExpiredError = () =>
  new ApiError("Your token has expired. Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  // Programming or unknown error: don't leak details
  console.error("UNEXPECTED ERROR 💥", err);
  return res.status(500).json({
    success: false,
    status: "error",
    message: "Something went wrong",
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    // Create shallow copy and preserve message
    let error = { ...err };
    error.message = err.message;

    // Mongoose / Mongo specific handlers
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);

    // JWT errors
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
