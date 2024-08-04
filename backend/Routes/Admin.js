import express from "express";
import adminData from "../Models/AdminData.js";
import jwt from "jsonwebtoken";
import placedOrders from "../Models/PlacedOrders.js";
import deliveredOrders from "../Models/DeliveredOrders.js";
import returnedOrders from "../Models/ReturnedOrders.js";
import cancelOrders from "../Models/CancelledOrders.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminData.findOne({ email: email, password: password });

    if (!admin) {
      return res.send({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: admin.email, password: admin.password },
      process.env.secretKey
    );

    return res
      .status(200)
      .send({ success: true, message: "Logged In Successfully", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/orders/details", async (_, res) => {
  try {
    const placedOrdersContainer = await placedOrders
      .find({})
      .select("-_id -__v");
    const deliveredOrdersContainer = await deliveredOrders
      .find({})
      .select("-_id -__v");
    const returnOrdersContainer = await returnedOrders
      .find({})
      .select("-_id -__v");
    const cancelOrdersContainer = await cancelOrders
      .find({})
      .select("-_id -__v");

    res
      .status(200)
      .send({
        success: true,
        placedOrders: placedOrdersContainer,
        delivered: deliveredOrdersContainer,
        returns: returnOrdersContainer,
        cancels: cancelOrdersContainer,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
