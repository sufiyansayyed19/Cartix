import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // From env or 15 minutes
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5, // From env or 5 attempts
    message: 'Too many login attempts from this IP, please try again after 15 minutes.',
    skipSuccessfulRequests: true, // Don't count successful requests
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for registration
export const registerLimiter = rateLimit({
    windowMs: parseInt(process.env.REGISTER_RATE_LIMIT_WINDOW) || 60 * 60 * 1000, // From env or 1 hour
    max: parseInt(process.env.REGISTER_RATE_LIMIT_MAX) || 3, // From env or 3 attempts
    message: 'Too many accounts created from this IP, please try again after an hour.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for password reset
export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 password reset attempts per hour
    message: 'Too many password reset attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
