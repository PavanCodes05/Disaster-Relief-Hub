import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("Passed");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    console.log("Authenticated");
    next();
  } catch (error) {
    res.status(500).json({ message: "Error in authentication middleware" });
  }
};

export default authenticate;