import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import usersData from "../Models/UsersData.js";
import products from "../Models/Products.js";
import placedOrders from "../Models/PlacedOrders.js";

const router = express.Router();

function generateUniqueId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 12; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

router.post("/online/create", async (req, res) => {
  try {
    const { items, paymentOption, deliveryAddress } = req.body;

    if (items.length > 0 && paymentOption && deliveryAddress) {
      let amount = 0;
      const productsContainer = await products.findOne({});
      for (const orderItem of items) {
        if (productsContainer[orderItem.category]) {
          const item = productsContainer[orderItem.category].find(
            (i) => i.item_id === orderItem.item_id
          );
          if (item) {
            const price = parseInt(
              item.price - item.price * (item.discount / 100)
            );
            const totalPrice = parseInt(
              price * orderItem.quantity + item.deliveryCharge
            );

            amount += totalPrice;
          }
        }
      }

      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: parseInt(amount) * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
        notes: {
          deliveryAddress: deliveryAddress,
          paymentOption: paymentOption,
        },
      };

      instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send({ success: false, message: "Error while creating order" });
        }
        return res.status(200).send({
          success: true,
          orderDetails: order,
        });
      });
    } else {
      return res.send({ success: false, message: "Missing Data" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error while  online create process" });
  }
});

router.post("/online/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const { items, paymentOption, deliveryAddress } = req.body.orders;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const productsContainer = await products.findOne({});
      for (const orderItemDetails of items) {
        if (productsContainer[orderItemDetails.category]) {
          const orderItem = await productsContainer[
            orderItemDetails.category
          ].find((i) => i.item_id === orderItemDetails.item_id);

          if (orderItem) {
            orderItem.bought += 1;
            const price = parseInt(
              orderItem.price - orderItem.price * (orderItem.discount / 100)
            );
            const totalPrice = parseInt(
              price * orderItemDetails.quantity + orderItem.deliveryCharge
            );

            const buyer = await usersData.findOne({
              user_id: req.user.user_id,
            });
            const seller = await usersData.findOne({
              user_id: orderItem.seller,
            });
            const orderDate = Date.now();
            const orderID = generateUniqueId();

            const buyerDetails = {
              user_id: buyer.user_id,
              userName: buyer.userName,
              age: buyer.age,
              gender: buyer.gender,
              email: buyer.email,
              phone: buyer.phone,
              address: buyer.address,
              profileImage: buyer.profileImage,
              location: buyer.location,
            };

            const sellerDetails = {
              user_id: seller.user_id,
              userName: seller.userName,
              age: seller.age,
              gender: seller.gender,
              email: seller.email,
              phone: seller.phone,
              address: seller.address,
              profileImage: seller.profileImage,
              returnPolicy: seller.returnPolicy,
              location: seller.location,
            };

            const updatedBuyer = await buyer.updateOne({
              $push: {
                "buy.orders": {
                  order_id: orderID,
                  item: orderItem,
                  trader: sellerDetails,
                  dateOfOrder: orderDate,
                  quantity: orderItemDetails.quantity,
                  totalPrice: totalPrice,
                  deliveryAddress: deliveryAddress,
                  paymentOption: paymentOption,
                },
              },
            });

            const updatedSeller = await seller.updateOne({
              $push: {
                "sell.orders": {
                  order_id: orderID,
                  item: orderItem,
                  trader: buyerDetails,
                  dateOfOrder: orderDate,
                  quantity: orderItemDetails.quantity,
                  totalPrice: totalPrice,
                  deliveryAddress: deliveryAddress,
                  paymentOption: paymentOption,
                },
              },
            });

            if (
              updatedBuyer.modifiedCount > 0 &&
              updatedSeller.modifiedCount > 0
            ) {
              await productsContainer.save();
              console.log("traders modified");
              await placedOrders.create({
                order_id: orderID,
                razorpay_order_id: razorpay_order_id,
                razorpay_payment_id: razorpay_payment_id,
                item: orderItem,
                buyer: buyerDetails,
                seller: sellerDetails,
                dateOfOrder: orderDate,
                quantity: orderItemDetails.quantity,
                totalPrice: totalPrice,
                deliveryAddress: deliveryAddress,
                paymentOption: paymentOption,
              });
              await usersData.updateOne(
                { user_id: req.user.user_id },
                { $set: { cart: [] } }
              );
            } else {
              return res
                .status(400)
                .send({ success: false, message: "Traders are not updated" });
            }
          }
        }
      }
      return res
        .status(200)
        .send({ success: true, message: "Payment done successfully" });
    } else {
      return res
        .status(500)
        .send({ success: false, message: "Payment verification failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/cash", async (req, res) => {
  const { items, paymentOption, deliveryAddress } = req.body;

  if (items.length > 0 && deliveryAddress && paymentOption) {
    const productsContainer = await products.findOne({});

    for (const orderItemDetails of items) {
      if (productsContainer[orderItemDetails.category]) {
        const orderItem = await productsContainer[
          orderItemDetails.category
        ].find((i) => i.item_id === orderItemDetails.item_id);

        if (orderItem) {
          orderItem.bought += 1;
          const price = parseInt(
            orderItem.price - orderItem.price * (orderItem.discount / 100)
          );
          const totalPrice = parseInt(
            price * orderItemDetails.quantity + orderItem.deliveryCharge
          );

          const buyer = await usersData.findOne({
            user_id: req.user.user_id,
          });
          const seller = await usersData.findOne({
            user_id: orderItem.seller,
          });
          const orderDate = Date.now();
          const orderID = generateUniqueId();

          const buyerDetails = {
            user_id: buyer.user_id,
            userName: buyer.userName,
            age: buyer.age,
            gender: buyer.gender,
            email: buyer.email,
            phone: buyer.phone,
            address: buyer.address,
            profileImage: buyer.profileImage,
            location: buyer.location,
          };

          const sellerDetails = {
            user_id: seller.user_id,
            userName: seller.userName,
            age: seller.age,
            gender: seller.gender,
            email: seller.email,
            phone: seller.phone,
            address: seller.address,
            profileImage: seller.profileImage,
            returnPolicy: seller.returnPolicy,
            location: seller.location,
          };

          const updatedBuyer = await buyer.updateOne({
            $push: {
              "buy.orders": {
                order_id: orderID,
                item: orderItem,
                trader: sellerDetails,
                dateOfOrder: orderDate,
                quantity: orderItemDetails.quantity,
                totalPrice: totalPrice,
                deliveryAddress: deliveryAddress,
                paymentOption: paymentOption,
              },
            },
          });

          const updatedSeller = await seller.updateOne({
            $push: {
              "sell.orders": {
                order_id: orderID,
                item: orderItem,
                trader: buyerDetails,
                dateOfOrder: orderDate,
                quantity: orderItemDetails.quantity,
                totalPrice: totalPrice,
                deliveryAddress: deliveryAddress,
                paymentOption: paymentOption,
              },
            },
          });

          if (
            updatedBuyer.modifiedCount > 0 &&
            updatedSeller.modifiedCount > 0
          ) {
            await productsContainer.save();
            console.log("traders modified");
            await placedOrders.create({
              order_id: orderID,
              razorpay_order_id: "Cash on Delivery",
              razorpay_payment_id: "Cash on Delivery",
              item: orderItem,
              buyer: buyerDetails,
              seller: sellerDetails,
              dateOfOrder: orderDate,
              quantity: orderItemDetails.quantity,
              totalPrice: totalPrice,
              deliveryAddress: deliveryAddress,
              paymentOption: paymentOption,
            });
            await usersData.updateOne(
              { user_id: req.user.user_id },
              { $set: { cart: [] } }
            );
          } else {
            return res.status(400).send({
              sucess: false,
              message: "Orders not placed successfully",
            });
          }
        }
      }
    }
    return res
      .status(200)
      .send({ sucess: true, message: "Orders placed successfully" });
  } else {
    return res.send({ sucess: false, message: "Invalid Token" });
  }
});

export default router;
