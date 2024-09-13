const Menu = require("../models/menu");
const Category = require("../models/category")

// Add Menu
const addMenu = async (req, res) => {
    try {
        const { itemName, price, category } = req.body
        const categorydb = await Category.findOne({ category })
        if (!categorydb) return res.status(404).send({ message: "Category not found" });

        if (req.category != categorydb) {
            return res.status(400).send({ message: "Invalid category" });
        }

        const newMenu = new Menu ({
            itemName,
            price,
            category
        })

        const result = await newMenu.save();
        res.status(201).json({ message: "Menu Added", newMenu: result });
        
    } catch (error) {
        console.error("Error Occured:", error);
        res.status(500).send({ message: "Internal server error" });
    }
    
}
//get Menu
const getMenu = async (req, res) => {
    try {
      const menu = await Menu.find({})
      if (!menu) return res.status(404).send({ message: "Menu not found" });
    } catch (err) {
      console.error("Error fetching menu info:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  };

module.exports = { addMenu, getMenu }