const Category = require("../models/category")

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        const categorydb = await Category.findOne({ categoryName })
        if (categorydb) return res.status(404).send({ message: "Category Already Exist" });

        const newCategory = new Category ({
            categoryName
        })

        const result = await newCategory.save();
        res.status(201).json({ message: "Category Added", newCategory: result });
    } catch (err) {
        console.error("Error Occured:", err);
        res.status(500).send({ message: "Internal server error" });
    }
}

const getAllCategory = async (req, res) => {
    const categories = await Category.find({})
    if (!categories) return res.status(404).send({ message: "No Categories found" });
}

const getCategoryByName = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const category = await Category.findOne({ categoryName })
        if (!category) return res.status(404).send({ message: "Category Not Found" });

        res.status(200).json(category);
    } catch (err) {
        console.error("Error Occurred:", err);
        res.status(500).send({ message: "Internal server error" });
    }
    
}

module.exports = { addCategory, getAllCategory, getCategoryByName }