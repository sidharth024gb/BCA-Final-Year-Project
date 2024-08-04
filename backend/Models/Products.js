import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item_id: String,
  itemImage: String,
  itemName: String,
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  quantity:{type:Number,default:1},
  description: String,
  tags: String,
  rating: Array,
  bought:{type:Number,default:0},
  deliveryOption: String,
  deliveryCharge:Number,
  category: String,
  location: String,
  created_at: Number,
  seller: String,
  condition: { type: String, required: true },
  returnDays: Number,
});

const productsSchema = new mongoose.Schema({
  Electronics:[itemSchema],
  Fashion:[itemSchema],
  Home_And_Garden:[itemSchema],
  Sports_And_Outdoors:[itemSchema],
  Toys_And_Hobbies:[itemSchema],
  Stationery:[itemSchema],
});

const products = mongoose.model("Products", productsSchema);

export default products;
