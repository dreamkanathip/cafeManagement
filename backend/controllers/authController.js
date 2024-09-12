const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Registration
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "Email already registered" });

    const user = new User({ name, email, password: hashedPassword });
    const result = await user.save();

    res.status(201).json({ message: "Registration successful", user: result });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send({ message: "Invalid password" });

    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "1d" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    res.status(200).send({ message: "Login successful" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get User Info
const getUser = (req, res) => {
  const { password, ...userData } = req.user.toJSON();
  res.send(userData);
};

// Logout
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "Logout successful" });
};

module.exports = { register, login, getUser, logout };
