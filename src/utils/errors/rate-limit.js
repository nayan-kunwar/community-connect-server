export class RateLimitError extends Error {
  constructor(message, statusCode = 429, retryAfter) {
    super(message);
    this.name = "RateLimitError";
    this.statusCode = statusCode;
    this.retryAfter = retryAfter;
  }
}
