import mongoose from "mongoose";

const deliveredOrdersSchema = new mongoose.Schema({
  order_id: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  item: Object,
  buyer: Object,
  seller: Object,
  dateOfOrder: Number,
  dateOfDelivery: Number,
  quantity: Number,
  totalPrice: Number,
  status: String,
  deliveryAddress: String,
  paymentOption: String,
});

const deliveredOrders = mongoose.model("delivered-orders", deliveredOrdersSchema);

export default deliveredOrders;
