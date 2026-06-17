import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HttpError } from '../utils/http-error.js';

export const hasRequiredRole = (userRole, requiredRoles = []) => requiredRoles.length === 0 || requiredRoles.includes(userRole);

export const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Unauthorized'));
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new HttpError(401, 'Invalid token'));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !hasRequiredRole(req.user.role, roles)) {
    return next(new HttpError(403, 'Forbidden'));
  }

  next();
};
