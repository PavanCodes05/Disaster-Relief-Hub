import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
