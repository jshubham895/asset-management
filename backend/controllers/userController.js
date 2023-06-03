import UserDao from "../dao/userDao.js";
const userDao = new UserDao();

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userDao.createUser(name, email, password);
    return res.status(201).json({ success: true, message: "user registered" });
  } catch (err) {
    return res
      .status(err?.status || 500)
      .json({ success: false, error: err.message ?? err ?? "server error" });
  }
};
