import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const key = process.env.KEY;
    const authorized = jwt.verify(token, key);
    if (authorized) {
      next();
    } else {
      console.log("invalid token");
      res.status(401).json("unauthorized");
      return;
    }
  } catch (error) {
    res.status(500).json("server error");
  }
};
