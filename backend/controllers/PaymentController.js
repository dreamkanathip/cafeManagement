const getSumPrice = (req, res) => {
  // ดึงข้อมูลราคาสุทธิจาก cart
  const sumPrice = OrderService.getSumPrice(); // ตรวจสอบว่าฟังก์ชันนี้คืนค่าที่ถูกต้อง

  if (sumPrice === null) {
    return res.status(404).json({ message: "Cart is empty" });
  }

  res.status(200).json({ sumPrice });
};
