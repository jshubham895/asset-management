import jwt from "jsonwebtoken";
import UserDao from "../dao/userDao.js";
import env from "../config/environment.js";
const userDao = new UserDao();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getUserByEmail(email);
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const copyUser = {
      _id: user._id,
    };
    const token = generateToken({ id: copyUser._id });
    return res.status(200).json({
      success: true,
      message: "login successfull",
      token,
      user: copyUser,
    });
  } catch (err) {
    return res.status(err.status ?? 500).json({
      success: false,
      error: err.error?.message ?? err.message ?? "some went wrong",
    });
  }
};

function generateToken(payload) {
  const token = jwt.sign(payload, env.jwt_secret);
  return token;
}
