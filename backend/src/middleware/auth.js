const jwt = require('jsonwebtoken');

/**
 * Requires a valid JWT. Returns 401 if missing or invalid.
 */
function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Tries to verify JWT but allows the request through even without one.
 * Attaches req.user if valid token found.
 */
function optionalAuth(req, _res, next) {
  const token = extractToken(req);
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      // ignore invalid token
    }
  }
  next();
}

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
  if (req.cookies?.session) return req.cookies.session;
  if (req.cookies?.token) return req.cookies.token;
  return null;
}

module.exports = { requireAuth, optionalAuth };
