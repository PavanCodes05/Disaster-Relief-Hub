import authenticate from "./authenticationMiddleware.js";

const donorAuthorization = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "donor") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in donor authorization middleware" });
  }
};

export default donorAuthorization;
