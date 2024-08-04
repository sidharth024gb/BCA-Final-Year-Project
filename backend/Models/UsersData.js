import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  order_id: String,
  item: Object,
  trader: Object,
  dateOfOrder: Number,
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: "pending" },
  deliveryAddress: String,
  paymentOption: String,
});

const deliverSchema = new mongoose.Schema({
  order_id: String,
  item: Object,
  trader: Object,
  deliveryAddress: String,
  dateOfOrder: Number,
  dateOfDelivery: Number,
  quantity: Number,
  totalPrice: Number,
  status: String,
  paymentOption: String,
});

const cancelSchema = new mongoose.Schema({
  order_id: String,
  item: Object,
  trader: Object,
  deliveryAddress: String,
  dateOfOrder: Number,
  dateOfCancel: Number,
  quantity: Number,
  totalPrice: Number,
  status: String,
  cancelReason:String,
  cancelBy:String,
  paymentOption: String,
});

const returnSchema = new mongoose.Schema({
  order_id: String,
  item: Object,
  trader: Object,
  deliveryAddress: String,
  dateOfOrder: Number,
  dateOfDelivery: Number,
  dateOfReturn: Number,
  quantity: Number,
  totalPrice: Number,
  status: String,
  returnStatus: { type: String, default: "requested" },
  returnReason: String,
  rejectionReason:String,
  paymentOption: String,
});

const cartSchema = new mongoose.Schema({
  item_id: String,
  category: String,
  quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
  user_id: String,
  created_at: { type: Number, default: Date.now() },
  profileImage: { type: String, default: "default-profilePicture.jpeg" },
  userName: String,
  age: { type: Number, default: 18 },
  gender: String,
  bio: { type: String, default: "Hi There, I am a Member of Trade Connect " },
  password: { type: String, required: true },
  phone: { type: Number, default: 1234567890 },
  email: String,
  location: String,
  address: String,
  deliveryOption: { type: String, default: "local" },
  returnDays: { type: Number, default: 7 },
  returnPolicy:{type:String,default:"Not Specified"},
  paymentDetails: {
    upi: String,
    bank: {
      accountNumber: String,
      bankName: String,
      ifscCode: String,
    },
  },
  rating: Array,
  cart: [cartSchema],
  listedItems: Array,
  sell: {
    type: {
      orders: [orderSchema],
      delivered: [deliverSchema],
      cancelled: [cancelSchema],
      returns: [returnSchema],
    },
    default: {
      orders: [],
      delivered: [],
      cancelled: [],
      returns: [],
    },
  },
  buy: {
    type: {
      orders: [orderSchema],
      delivered: [deliverSchema],
      cancelled: [cancelSchema],
      returns: [returnSchema],
    },
    default: {
      orders: [],
      delivered: [],
      cancelled: [],
      returns: [],
    },
  },
});

const usersData = mongoose.model("UsersData", userSchema);

export default usersData;
