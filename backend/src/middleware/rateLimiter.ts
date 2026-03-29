import rateLimit from 'express-rate-limit';


export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 mins 
  max: 200, 
  standardHeaders: true,
  legacyHeaders: false,
});


export const actionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1 min
  max: 10, 
  message: { message: "Too many actions. Please wait a minute." },
  standardHeaders: true,
  legacyHeaders: false,
});


export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hr
  max: 5, 
  message: { message: "Too many uploads. Try again in an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});