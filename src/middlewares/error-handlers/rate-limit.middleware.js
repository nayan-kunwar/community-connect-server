import { RateLimitError } from "../../utils/errors/rate-limit.js";

export const handleRateLimitError = (err, req, res, next) => {
  if (err instanceof RateLimitError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.retryAfter && { retryAfter: `${err.retryAfter} seconds` }),
    });
  }

  next(err);
};
