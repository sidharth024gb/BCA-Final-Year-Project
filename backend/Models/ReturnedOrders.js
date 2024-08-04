import mongoose from "mongoose";

const returnedOrdersSchema = new mongoose.Schema({
  order_id: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  item: Object,
  buyer: Object,
  seller: Object,
  dateOfOrder: Number,
  dateOfDelivery: Number,
  dateOfReturn: Number,
  quantity: Number,
  totalPrice: Number,
  status: String,
  returnStatus: { type: String, default: "requested" },
  returnReason: String,
  rejectionReason:String,
  deliveryAddress: String,
  paymentOption: String,
});

const returnedOrders = mongoose.model("returned-orders", returnedOrdersSchema);

export default returnedOrders;