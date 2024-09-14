const { Router } = require("express");
const authController = require("../controllers/authController");
const MenuController = require("../controllers/MenuController");
const CategoryController = require("../controllers/CategoryController");
const PaymentController = require("../controllers/PaymentController"); // Import PaymentController
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

// Login, register, logout
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authenticateToken, authController.getUser);
router.post("/logout", authController.logout);

// Menu
router.post("/addMenu", MenuController.addMenu);
router.get("/allMenu", MenuController.getMenu);

// Category
router.post("/addCategory", CategoryController.addCategory);
router.get("/categories", CategoryController.getAllCategory);
router.get("/category/:category", CategoryController.getCategoryByName);

// Payment
router.post("/addPayment", PaymentController.addPayment);
router.get("/payments", PaymentController.getAllPayments);
router.patch("/payment", PaymentController.updatePayment);
router.delete("/payment", PaymentController.deletePayment);

module.exports = router;
