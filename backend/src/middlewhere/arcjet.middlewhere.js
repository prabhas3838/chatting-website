import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    return next(); // Temporarily disable Arcjet protection
   
    
     
     
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests, please try again later." });
      }

      return res.status(403).json({ message: "Access denied." });
    }

    if (decision.results.some(isSpoofedBot)) {
      return res
        .status(403)
        .json({ message: "Spoofed bot detected. Access denied." });
    }

    next();
  } catch (error) {
    console.error("Arcjet protection error:", error);

    if (process.env.NODE_ENV === "production") {
      return res
        .status(503)
        .json({ message: "Service temporarily unavailable" });
    }

    next();
  }
};
