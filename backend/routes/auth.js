const { Router } = require("express");
const authController = require("../controllers/authController");
const MenuController = require("../controllers/MenuController");
const CategoryController = require("../controllers/CategoryController");
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authenticateToken, authController.getUser);
router.post("/logout", authController.logout);
// Menu
router.post("/addMenu", MenuController.addMenu);
router.get("/allMenu", MenuController.getMenu);
// Category
router.post("/addCategory", CategoryController.addCategory)
router.get("/categories", CategoryController.getAllCategory)
router.get("/category/:category", CategoryController.getCategoryByName)

module.exports = router;
