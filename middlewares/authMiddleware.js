import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};