const Menu = require("../models/menu");

const addMenu = async(req, res) => {
  try {
    const { name, price, category } = req.body
    const payload = new Menu({
      name,
      price,
      description,
      category
    })
    const result = await payload.save();
    res.status(201).json({ message: "Add menu successssssssss!", payload: result});
  } catch(err) {
    throw new Error(err)
  }
}

//get Menu
const getMenu = async (req, res) => {
    try {
      const result = await Menu.find()
      res.status(200).send(result)
    } catch (err) {
      console.error("Error fetching menu info:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  };

module.exports = { addMenu, getMenu }