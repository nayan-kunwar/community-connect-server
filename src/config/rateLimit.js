export const USER_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: (req) => (req.user?._id ? 1000 : 200),
  premiumMax: 1000,
  adminMax: 5000,
  headers: true,
};
