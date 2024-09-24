const { Router } = require("express");
const multer = require("multer"); // Import multer for file uploads
const authController = require("../controllers/authController");
const MenuController = require("../controllers/MenuController");
const CategoryController = require("../controllers/CategoryController");
const PaymentController = require("../controllers/PaymentController"); // Import PaymentController
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

const storage = multer.memoryStorage(); // In-memory storage for multer
const upload = multer({ storage: storage });

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authenticateToken, authController.getUser);
router.get("/check-auth", authenticateToken, authController.getUser);
router.post("/logout", authController.logout);


// Menu
router.post("/addMenu",  authenticateToken, upload.single("image"), MenuController.addMenu);
router.get("/allMenu", authenticateToken, MenuController.getMenu);
router.get("/menu/:_id", authenticateToken, MenuController.getMenuById);
router.delete("/menu/:_id",authenticateToken,  MenuController.deleteMenu);
router.put(
  "/menuUpdate/:_id",
  authenticateToken,
  upload.single("image"),
  MenuController.updateMenu
);

// Category
router.get("/allCategory", authenticateToken, CategoryController.getAllCategory);
router.post("/category", authenticateToken, CategoryController.addCategory);
router.get("/category/:_id", authenticateToken, CategoryController.getCategoryById);
router.delete("/category/:_id", authenticateToken, CategoryController.deleteCategory);
router.patch("/categoryUpdate/:_id", authenticateToken, CategoryController.updateCategory);

// Payment
// router.post("/addPayment", PaymentController.addPayment);
// router.get("/payments", PaymentController.getAllPayments);
// router.patch("/payment", PaymentController.updatePayment);
// router.delete("/payment", PaymentController.deletePayment);

module.exports = router;
