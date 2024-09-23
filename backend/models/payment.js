const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const mongoose = require("mongoose");

// เพิ่ม route สำหรับการดึงราคาสุทธิ
router.get('/sumPrice', PaymentController.getSumPrice);

// เพิ่ม route อื่นๆ สำหรับ PaymentController ถ้าต้องการ
// router.post('/', PaymentController.addPayment);
// router.get('/', PaymentController.getAllPayments);
// router.get('/:id', PaymentController.getPaymentById);
// router.put('/:id', PaymentController.updatePayment);
// router.delete('/:id', PaymentController.deletePayment);
const paymentSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    paymentImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
module.exports = router; // ส่งออก router ที่ถูกต้อง
