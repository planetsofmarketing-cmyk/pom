// Simple in-memory rate limiter for serverless
// In production with multiple instances, use Redis instead

const ipMap = new Map<string, { count: number; firstRequest: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10);
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
  const now = Date.now();

  const entry = ipMap.get(ip);

  if (!entry || now - entry.firstRequest > windowMs) {
    // New window
    ipMap.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10);
  const now = Date.now();
  for (const [ip, entry] of ipMap.entries()) {
    if (now - entry.firstRequest > windowMs) {
      ipMap.delete(ip);
    }
  }
}, 600000);
