const Menu = require("../models/menu");

const addMenu = async(req, res) => {
  try {
    const {name, price, description, category } = req.body
    const imageBase64 = req.file.buffer.toString('base64');
    const payload = new Menu({
      name,
      price,
      description,
      category,
      image: imageBase64
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
      if (!result) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).send(result)
    } catch (err) {
      console.error("Error fetching menu info:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  const getMenuById = async (req, res) => {
    try {
      const { _id } = req.params;
      const result = await Menu.findById(_id)
      if (!result) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).send(result)
    } catch (err) {
      console.error("Error fetching menu info:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  }

const deleteMenu = async(req, res) => {
  try {
    const { _id } = req.params;
    const result = await Menu.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}

const updateMenu = async(req, res) => {
  try {
    const { _id } = req.params;
    const { name, price, description, category} = req.body;
    const payload = {
      name,
      price,
      description,
      category,
    }
    if (req.file) {
      const imageBase64 = req.file.buffer.toString('base64');
      payload.image = imageBase64;
    }
    console.log(payload)
    const result = await Menu.findOneAndReplace({_id:_id}, payload);
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item update successfully"});
  } catch (err) {
    console.error("Error update menu item:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}
module.exports = { addMenu, getMenu, deleteMenu, updateMenu, getMenuById }