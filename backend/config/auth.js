import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "../config/.env",
});
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (typeof token !== "string") {
      return res.status(401).json({
        message: "Invalid token format",
        token: `${req.cookies.token}`,
        success: false,
      });
    }
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decode.userId;
    next();
  } catch (err) {
    console.log(err);
  }
};

export default isAuthenticated;
