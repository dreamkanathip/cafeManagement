const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = Router();

router.post("/register", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const record = await User.findOne({ email: email });
    if (record) {
      return res.status(400).send({
        message: "Email is already registered",
      });
    }

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const result = await user.save();

    // JWT Token
    const { _id } = result;
    const token = jwt.sign({ _id: _id }, "secret", { expiresIn: "1d" });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json({
      message: "Registration successful",
      user: result,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: "User not Found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Password is Incorrect",
      });
    }

    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "1d" });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).send({
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: "Invalid authentication token",
      });
    }

    const user = await User.findOne({ _id: claims._id });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const { password, ...data } = user.toJSON();
    return res.send(data);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({
        message: "Invalid authentication token",
      });
    } else {
      return res.status(500).send({
        message: "Internal server error",
      });
    }
  }
});

router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.send({
    message: "Logout successful",
  });
});

module.exports = router;
