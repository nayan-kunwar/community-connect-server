import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Returns JWT options based on token type
export const getJwtOptions = (type) => ({
    expiresIn:
        type === "access"
            ? config.ACCESS_TOKEN_EXPIRY
            : config.REFRESH_TOKEN_EXPIRY,
});

// Generate JWT token
export const generateToken = (payload, secret, type) => {
    return jwt.sign(payload, secret, getJwtOptions(type));
};
