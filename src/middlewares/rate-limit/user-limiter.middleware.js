import rateLimit from "express-rate-limit";
import { USER_RATE_LIMIT } from "../../config/rateLimit.js";
import { RateLimitError } from "../../utils/errors/rateLimit.js";

export const userLimiter = rateLimit({
  ...USER_RATE_LIMIT,

  keyGenerator: (req) => {
    // Always return a string
    if (req.user && req.user._id) {
      return req.user._id.toString();
    }
    return req.ip; // fallback to IP
  },

  // skip: (req) => req.user && req.user.isAdmin,

  handler: (req, res, next, options) => {
    const retryAfter = Math.ceil(USER_RATE_LIMIT.windowMs / 1000);
    res.setHeader("Retry-After", retryAfter);
    next(new RateLimitError(options.message, options.statusCode));
  },
});
