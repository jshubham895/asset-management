import jwt from "jsonwebtoken";
import env from "../config/environment.js";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied");
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    } else {
      return res.status(403).send("Incorrect token");
    }

    const verified = jwt.verify(token, env.jwt_secret);
    req.user = {
      id: verified.id,
    };
    next();
  } catch (err) {
    return res.status(500).json({ status: false, error: err });
  }
};
