const { Router } = require("express");
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authenticateToken, authController.getUser);
router.post("/logout", authController.logout);

module.exports = router;
