import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list 
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

//remove food item
const removeFood = async (req, res) => {
  try {
    const foodId = req.body?._id || req.body?.id;

    if (!foodId) {
      return res.json({ success: false, message: "Food id is required" });
    }

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    if (food.image) {
      try {
        await fs.promises.unlink(`uploads/${food.image}`);
      } catch (fileError) {
        if (fileError.code !== "ENOENT") {
          console.log(fileError);
        }
      }
    }

    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addFood, listFood, removeFood };
