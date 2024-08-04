import mongoose from "mongoose";

const placedOrdersSchema = new mongoose.Schema({
  order_id: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  item: Object,
  buyer: Object,
  seller: Object,
  dateOfOrder: Number,
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: "pending" },
  deliveryAddress: String,
  paymentOption: String,
});

const placedOrders = mongoose.model("placed-orders", placedOrdersSchema);

export default placedOrders;
