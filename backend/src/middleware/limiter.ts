import rateLimit, {MemoryStore} from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 1 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again after a minute",
  standardHeaders: true,
  legacyHeaders: false,
  store: new MemoryStore()
});

export { rateLimiter };
