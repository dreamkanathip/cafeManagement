const Category = require("../models/category")

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        const categorydb = await Category.findOne({ categoryName: categoryName })
        if (categorydb) {
          return res.status(404).send({ message: "Category already exist"});
        }
        const newCategory = new Category ({
            categoryName
        })

        const result = await newCategory.save();
        res.status(201).json({ message: "Category Added", result: newCategory });
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
      const { categoryName } = req.body;
      const payload = {
        categoryName,
      }

      console.log(payload)
      const result = await Category.findOneAndUpdate(req.params.id, req.body, {
        new: true,});
      
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