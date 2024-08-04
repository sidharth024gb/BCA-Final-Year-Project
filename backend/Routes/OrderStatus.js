import express from "express";
import usersData from "../Models/UsersData.js";
import placedOrders from "../Models/PlacedOrders.js";
import cancelOrders from "../Models/CancelledOrders.js";
import deliveredOrders from "../Models/DeliveredOrders.js";
import returnedOrders from "../Models/ReturnedOrders.js";

const router = express.Router();

router.put("/cancel", async (req, res) => {
  try {
    const { order_id, trader_id, userState, cancelReason } = req.body;
    const cancelDate = Date.now();

    let buyer, seller;

    if (!order_id || !trader_id || !userState || !cancelReason) {
      return res.send({ success: false, message: "Missing data" });
    }

    if (userState === "buyer") {
      buyer = await usersData.findOne({ user_id: req.user.user_id });
      seller = await usersData.findOne({ user_id: trader_id });
    } else if (userState === "seller") {
      buyer = await usersData.findOne({ user_id: trader_id });
      seller = await usersData.findOne({ user_id: req.user.user_id });
    }

    if (!buyer || !seller) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const buyOrder = buyer.buy.orders.find(
      (item) => item.order_id === order_id
    );
    const sellOrder = seller.sell.orders.find(
      (item) => item.order_id === order_id
    );

    if (!buyOrder || !sellOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    buyer.buy.orders.pull({ order_id: order_id });
    seller.sell.orders.pull({ order_id: order_id });

    buyer.buy.cancelled.push({
      ...buyOrder.toObject(),
      dateOfCancel: cancelDate,
      cancelBy: userState,
      cancelReason: cancelReason,
    });
    seller.sell.cancelled.push({
      ...sellOrder.toObject(),
      dateOfCancel: cancelDate,
      cancelBy: userState,
      cancelReason: cancelReason,
    });

    await buyer.save();
    await seller.save();

    const cancelOrder = await placedOrders
      .findOneAndDelete({
        order_id: order_id,
      })
      .select("-_id -__v");

    if (!cancelOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found in placed-orders" });
    }

    await cancelOrders.create({
      ...cancelOrder.toObject(),
      dateOfCancel: cancelDate,
      cancelBy: userState,
      cancelReason: cancelReason,
    });

    res
      .status(200)
      .send({ success: true, message: "Order Cancelled Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occured while cancelling order");
  }
});

router.put("/orderStatus", async (req, res) => {
  const { order_id, trader_id, status, userState } = req.body;
  if (order_id && trader_id && status && userState) {
    try {
      let seller, buyer;
      if (userState === "seller") {
        seller = await usersData.findOne({ user_id: req.user.user_id });
        buyer = await usersData.findOne({ user_id: trader_id });
      } else if (userState === "buyer") {
        seller = await usersData.findOne({ user_id: trader_id });
        buyer = await usersData.findOne({ user_id: req.user.user_id });
      }

      if (!seller || !buyer) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      const sellOrder = seller.sell.orders.find(
        (item) => item.order_id === order_id
      );
      const buyOrder = buyer.buy.orders.find(
        (item) => item.order_id === order_id
      );

      if (!sellOrder || !buyOrder) {
        return res
          .status(404)
          .send({ success: false, message: "Order not found" });
      }

      sellOrder.status = status;
      buyOrder.status = status;

      await seller.save();
      await buyer.save();

      await placedOrders.findOneAndUpdate(
        { order_id: order_id },
        { $set: { status: status } }
      );

      res.status(200).send({ success: true, message: "Order Status Updated" });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).send({ success: false, message: "Missing Data" });
  }
});

router.put("/delivered", async (req, res) => {
  try {
    const { order_id, trader_id } = req.body;
    const deliveredDate = Date.now();

    if (!order_id || !trader_id) {
      return res.status(400).send({ success: false, message: "Missing Data" });
    }

    //no if statement because delivery confirmation is done by the buyer only
    const buyer = await usersData.findOne({ user_id: req.user.user_id });
    const seller = await usersData.findOne({ user_id: trader_id });

    if (!buyer || !seller) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const buyOrder = buyer.buy.orders.find(
      (item) => item.order_id === order_id
    );
    const sellOrder = seller.sell.orders.find(
      (item) => item.order_id === order_id
    );

    if (!buyOrder || !sellOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    buyer.buy.orders.pull({ order_id: order_id });
    seller.sell.orders.pull({ order_id: order_id });

    buyer.buy.delivered.push({
      ...buyOrder.toObject(),
      status: "delivered",
      dateOfDelivery: deliveredDate,
    });
    seller.sell.delivered.push({
      ...sellOrder.toObject(),
      status: "delivered",
      dateOfDelivery: deliveredDate,
    });

    await buyer.save();
    await seller.save();

    const orderDetails = await placedOrders.findOneAndDelete({
      order_id: order_id,
    });

    if (!orderDetails) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found in database" });
    }

    await deliveredOrders.create({
      ...orderDetails.toObject(),
      status: "delivered",
      dateOfDelivery: deliveredDate,
    });

    return res
      .status(200)
      .send({ success: true, message: "Thank you for your confirmation" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.put("/return/request", async (req, res) => {
  try {
    const { order_id, trader_id, returnReason } = req.body;
    const returnDate = Date.now();

    if (!order_id || !trader_id || !returnReason) {
      return res.status(400).send({ success: false, message: "Missing Data" });
    }

    //no if statement because only buyer can request return
    const buyer = await usersData.findOne({ user_id: req.user.user_id });
    const seller = await usersData.findOne({ user_id: trader_id });

    if (!buyer || !seller) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const buyOrder = buyer.buy.delivered.find(
      (order) => order.order_id === order_id
    );
    const sellOrder = seller.sell.delivered.find(
      (order) => order.order_id === order_id
    );

    if (!buyOrder || !sellOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    buyer.buy.delivered.pull({ order_id: order_id });
    seller.sell.delivered.pull({ order_id: order_id });

    buyer.buy.returns.push({
      ...buyOrder.toObject(),
      dateOfReturn: returnDate,
      returnReason: returnReason,
    });
    seller.sell.returns.push({
      ...sellOrder.toObject(),
      dateOfReturn: returnDate,
      returnReason: returnReason,
    });

    await buyer.save();
    await seller.save();

    const returnOrder = await deliveredOrders.findOneAndDelete({
      order_id: order_id,
    });
    if (!returnOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found in database" });
    }

    await returnedOrders.create({
      ...returnOrder.toObject(),
      dateOfReturn: returnDate,
      returnReason: returnReason,
    });

    return res.status(200).send({ success: true, message: "Return Requested" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

router.put("/return/status", async (req, res) => {
  try {
    const { order_id, trader_id, returnStatus, rejectionReason } = req.body;

    if (!order_id || !trader_id || !returnStatus || !rejectionReason) {
      return res.status(400).send({ success: false, message: "Missing Data" });
    }

    // No if statement because only seller can update the status
    const buyer = await usersData.findOne({ user_id: trader_id });
    const seller = await usersData.findOne({ user_id: req.user.user_id });

    if (!buyer || !seller) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const buyOrder = buyer.buy.returns.find(
      (order) => order.order_id === order_id
    );
    const sellOrder = seller.sell.returns.find(
      (order) => order.order_id === order_id
    );

    if (!buyOrder || !sellOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    buyOrder.returnStatus = returnStatus;
    buyOrder.rejectionReason = rejectionReason;
    sellOrder.returnStatus = returnStatus;
    sellOrder.rejectionReason = rejectionReason;

    await buyer.save();
    await seller.save();

    const returnOrder = await returnedOrders.findOne({ order_id: order_id });

    if (!returnOrder) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found in database" });
    }

    returnOrder.returnStatus = returnStatus;
    returnOrder.rejectionReason = rejectionReason;

    await returnOrder.save();

    return res
      .status(200)
      .send({ success: true, message: "Return Status Updated" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
