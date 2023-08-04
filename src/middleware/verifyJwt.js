import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // bearer token
  if (authHeader && !authHeader.startsWith('Bearer ')) { return res.sendStatus(401); } // unauthorized
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) { return res.sendStatus(403); } // invalid token; forbidden
      req.user = decoded;
      next();
    }
  );
};

export default verifyJWT;
