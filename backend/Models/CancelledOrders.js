import mongoose from "mongoose";

const cancelOrdersSchema = new mongoose.Schema({
  order_id: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  item: Object,
  buyer: Object,
  seller: Object,
  dateOfOrder: Number,
  dateOfCancel: Number,
  quantity: Number,
  totalPrice: Number,
  status: String,
  cancelBy: String,
  cancelReason:String,
  deliveryAddress: String,
  paymentOption: String,
});

const cancelOrders = mongoose.model("cancel-orders", cancelOrdersSchema);

export default cancelOrders;
