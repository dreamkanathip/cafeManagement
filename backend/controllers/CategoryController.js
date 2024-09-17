const Category = require("../models/category")

const addCategory = async (req, res) => {
    try {
        const { category } = req.body
        const categorydb = await Category.findOne({ categoryName: category })
        if (categorydb) return res.status(404).send({ message: "Category Already Exist" });

        const newCategory = new Category ({
            category
        })

        const result = await newCategory.save();
        res.status(201).json({ message: "Category Added", newCategory: result });
    } catch (err) {
        console.error("Error Occured:", err);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getAllCategory = async (req, res) => {
    try {
        const result = await Category.find()
        res.status(200).send(result)
      } catch (err) {
        console.error("Error fetching menu info:", err);
        res.status(500).send({ message: "Internal server error" });
      }
}

const getCategoryById = async (req, res) => {
    try {
      const { _id } = req.params;
      const result = await Category.findById(_id)
      if (!result) {
        return res.status(404).json({ message: "Category item not found" });
      }
      res.status(200).send(result)
    } catch (err) {
      console.error("Error fetching category info:", err);
      res.status(500).send({ message: "Internal server error" });
    }
}

const deleteCategory = async(req, res) => {
    try {
      const { _id } = req.params;
      const result = await Category.findByIdAndDelete(_id);
      if (!result) {
        return res.status(404).json({ message: "Category item not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error("Error deleting category item:", err);
      res.status(500).send({ message: "Internal server error" });
    }
}

const updateCategory = async(req, res) => {
    try {
      const { _id } = req.params;
      const { category } = req.body;
      const payload = {
        category,
      }

      console.log(payload)
      const result = await Category.findOneAndReplace({_id:_id}, payload);
      
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Category item not found" });
      }
      res.status(200).json({ message: "Category update successfully"});
    } catch (err) {
      console.error("Error update category item:", err);
      res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = { addCategory, getAllCategory, getCategoryById, deleteCategory, updateCategory }