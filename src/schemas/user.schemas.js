import { z } from 'zod';
import { PASSWORD_REGEX } from '../constants/regex.js';

// Base Schema
export const UserSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/), 
    email: z.string().email(),
    password: z.string().regex(PASSWORD_REGEX, {
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, '
    }),
    isVerified: z.boolean().optional().default(false)
});