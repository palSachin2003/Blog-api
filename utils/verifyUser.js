import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

const JWT_SECRET = 'YOUR_JWT_SECRET';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization;
  // console.log(token);
  
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return next(errorHandler(401, 'Unauthorized...'));
    }
    req.user = user;
    next();
  });
};
