import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import usersData from "./Models/UsersData.js";
import products from "./Models/Products.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import PlaceOrders from "./Routes/PlaceOrders.js";
import OrderStatus from "./Routes/OrderStatus.js";
import features from "./Models/Features.js";
import adminData from "./Models/AdminData.js";
import Admin from "./Routes/Admin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static("uploads"));

mongoose
  .connect("mongodb://localhost:27017/OriginTrade")
  .then(() => {
    console.log("Database Connected Successfully...");
  })
  .catch((err) => {
    console.log("Database Not Connected!!!");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server Started...");
});

// products.create({});
// features.create({});
// adminData.create({});
const secretKey = process.env.secretKey;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/itemImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadImage = multer({
  storage: storage2,
}).single("itemImage");

const upload = multer({
  storage: storage,
}).single("profileImage");

function generateUniqueId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 12; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

app.use("/admin", Admin);

app.get("/get/products", async (_, res) => {
  await products
    .find({})
    .select("-_id -__v")
    .then((products) => {
      if (products.length === null) {
        return res
          .status(404)
          .send({ success: false, message: "No products found" });
      }
      res.send({ success: true, products: products[0] });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: "Error finding products" });
    });
});

app.get("/homepage/content", async (_, res) => {
  try {
    const productsContainer = await products
      .findOne({})
      .select("-_id -__v")
      .lean();
    const users = await usersData
      .find({
        rating: { $exists: true, $not: { $size: 0 } },
      })
      .select("-_id -password -__v -cart -sell -buy -paymentDetails");
    const homepageFeatures = await features.find({}).select("-_id");

    const bestDeals = Object.keys(productsContainer).reduce(
      (filteredData, category) => {
        if (Array.isArray(productsContainer[category])) {
          const filteredCategory = productsContainer[category].filter(
            (item) => item.discount >= 50
          );

          filteredData[category] = filteredCategory;
        } else {
          console.log("not array");
        }

        return filteredData;
      },
      {}
    );

    const bestSellers = users.filter((user) => {
      const totalRating = user.rating.reduce((sumOfRating, eachRating) => {
        return sumOfRating + eachRating.rating;
      }, 0);

      return totalRating / user.rating.length >= 4;
    });

    res.status(200).send({
      bestDeals: bestDeals,
      bestSellers: bestSellers,
      features: homepageFeatures,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/trader/get", async (req, res) => {
  const { trader_id } = req.body;

  if (!trader_id) {
    return res.status(400).send({ success: false, message: "Missing Data" });
  }

  await usersData
    .findOne({ user_id: trader_id })
    .select("-_id -__v -password -paymentDetails -sell -buy -cart")
    .then((traderData) => {
      if (traderData) {
        return res.status(200).send({ success: true, traderData: traderData });
      } else {
        return res
          .status(404)
          .send({ success: false, message: "User Not Found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/Signup", upload, (req, res) => {
  const paymentDetails = JSON.parse(req.body.paymentDetails);

  if (
    req.body.userName &&
    req.body.email &&
    req.body.phone &&
    req.body.age &&
    req.body.gender &&
    req.body.location &&
    req.body.address &&
    req.body.password &&
    paymentDetails.upi &&
    paymentDetails.bank.accountNumber &&
    paymentDetails.bank.bankName &&
    paymentDetails.bank.ifscCode
  ) {
    if (req.body.password === req.body.confirmPassword) {
      usersData
        .findOne({ email: req.body.email })
        .then((resp) => {
          if (resp) {
            res.send({ success: false, message: "Account already exist..." });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                console.log(err);
                return res.send({
                  success: false,
                  message: "Error while generating salt...",
                });
              }
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                  console.log(err);
                  return res.send({
                    success: false,
                    message: "Error while hashing...",
                  });
                }
                const newUser = new usersData({
                  user_id: generateUniqueId(),
                  created_at: Date.now(),
                  profileImage: req.file
                    ? req.file.filename
                    : "default-profilePicture.jpeg",
                  userName: req.body.userName,
                  email: req.body.email,
                  phone: req.body.phone,
                  age: req.body.age,
                  gender: req.body.gender,
                  bio: req.body.bio
                    ? req.body.bio
                    : "Hi There, I am a Member of Trade Connect",
                  location: req.body.location,
                  address: req.body.address,
                  deliveryOption: req.body.deliveryOption
                    ? req.body.deliveryOption
                    : "local",
                  returnDays: req.body.returnDays ? req.body.returnDays : 7,
                  returnPolicy: req.body.returnPolicy
                    ? req.body.returnPolicy
                    : "Not Specified",
                  paymentDetails: {
                    upi: paymentDetails.upi,
                    bank: {
                      accountNumber: paymentDetails.bank.accountNumber,
                      bankName: paymentDetails.bank.bankName,
                      ifscCode: paymentDetails.bank.ifscCode,
                    },
                  },
                  password: hash,
                });

                newUser
                  .save()
                  .then((ack) => {
                    if (ack) {
                      const token = jwt.sign(
                        { user_id: ack.user_id, email: ack.email },
                        secretKey
                        // { expiresIn: "1h" }
                      );
                      res.send({
                        success: true,
                        message: "Account Created Successfully",
                        token: token,
                      });
                    } else {
                      res.send({
                        success: false,
                        message: "Account not Created",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log("Error while creating account", err);
                    res.send({
                      success: false,
                      message: "Error Occured",
                    });
                  });
              });
            });
          }
        })
        .catch((err) => {
          console.log("Error finding user", err);
          res.send({
            success: false,
            message: "Errror Occured in finding account",
          });
        });
    } else {
      res.send({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }
  } else {
    res.send({ success: false, message: "misssing Data" });
  }
});

app.post("/Login", (req, res) => {
  if (req.body.email && req.body.password) {
    usersData
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) {
              console.log("Error while comparing password", err);
              return res.send({
                success: false,
                message: "Error while comparing password",
              });
            }
            if (isMatch) {
              const token = jwt.sign(
                { user_id: user.user_id, email: user.email },
                secretKey
              );
              res.send({
                success: true,
                message: "Logged In Successfully",
                token: token,
              });
            } else {
              res.send({
                success: false,
                message: "Password is incorrect",
              });
            }
          });
        } else {
          res.send({
            success: false,
            message: "User not Found",
          });
        }
      })
      .catch((err) => {
        console.error("Errer while finding user:", err);
        if (err.response) {
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        } else {
          console.error(err.message);
        }
        res.send({
          success: false,
          message: "Errror Occured in finding account",
        });
      });
  } else {
    res.send({ success: false, message: "misssing Data" });
  }
});

app.use((req, res, next) => {
  let authToken = req.headers.authtoken;
  if (authToken) {
    jwt.verify(authToken, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Token" });
      }

      req.user = decoded;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
});

app.post("/get/user", (req, res) => {
  usersData
    .findOne({ email: req.user.email })
    .select("-_id -password -__v")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.post("/homepage/recommendations", async (req, res) => {
  try {
    const productsContainer = await products
      .findOne({})
      .select("-_id -__v")
      .lean();
    const user = await usersData.findOne({ user_id: req.user.user_id });

    let productTags = [];

    if (user.cart.length > 0) {
      const cartTags = user.cart.reduce((tags, itemInfo) => {
        const item = productsContainer[itemInfo.category].find(
          (item) => item.item_id === itemInfo.item_id
        );
        if (item) {
          const itemTags = item.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

          tags = tags.concat(itemTags);
        }

        return tags;
      }, []);

      productTags = productTags.concat(cartTags);
    }

    if (user.buy.orders.length > 0) {
      const orderTags = user.buy.orders.reduce((tags, order) => {
        const itemTags = order.item.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase());
        tags = tags.concat(itemTags);

        return tags;
      }, []);

      productTags = productTags.concat(orderTags);
    }

    if (user.buy.delivered.length > 0) {
      const deliveredTags = user.buy.delivered.reduce((tags, order) => {
        const itemTags = order.item.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase());
        tags = tags.concat(itemTags);

        return tags;
      }, []);

      productTags = productTags.concat(deliveredTags);
    }

    productTags = [...new Set(productTags)];

    if (!productTags) {
      return res.send({ success: false });
    }

    const recommendProducts = Object.keys(productsContainer).reduce(
      (filteredItems, category) => {
        const filteredCategory = productsContainer[category].filter((item) => {
          const itemTags = item.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());
          return (
            itemTags.some((tag) => productTags.includes(tag)) &&
            (item.location === user.location ||
              item.deliveryOption === "domestic")
          );
        });
        if (filteredCategory) {
          filteredItems = filteredItems.concat(filteredCategory);
        }

        return filteredItems;
      },
      []
    );

    return res.status(200).send({ success: true, products: recommendProducts });
  } catch (err) {
    console.log(err);
  }
});

app.put("/rating", async (req, res) => {
  try {
    const { id, rateItem, category, rating } = req.body;
    let ratingObject;
    const productsContainer = await products.findOne({});

    if (!id || !rateItem || !rating) {
      return res.status(400).send({ success: false, message: "missing data" });
    }

    if (id === req.user.user_id) {
      return res.send({ success: false, message: "you can't rate yourself" });
    }

    if (rateItem === "user") {
      ratingObject = await usersData.findOne({ user_id: id });

      if (!ratingObject) {
        return res.send({ success: false, message: "user not found" });
      }
    } else if (rateItem === "product") {
      if (!category) {
        return res
          .status(400)
          .send({ success: false, message: "missing data" });
      }

      ratingObject = await productsContainer[category].find(
        (item) => item.item_id === id
      );

      if (ratingObject.seller === req.user.user_id) {
        return res.send({
          success: false,
          message: "You can't rate your own product",
        });
      }

      if (!ratingObject) {
        return res
          .status(404)
          .send({ success: false, message: "product not found" });
      }
    } else {
      console.log("Wrong rateItem");
    }

    const existingUserRating = await ratingObject.rating.find(
      (item) => item.user_id === req.user.user_id
    );

    if (existingUserRating) {
      existingUserRating.rating = rating;
    } else {
      ratingObject.rating.push({ user_id: req.user.user_id, rating: rating });
    }

    if (rateItem === "user") {
      await usersData.updateOne(
        { user_id: id },
        { $set: { rating: ratingObject.rating } }
      );
    }

    if (rateItem === "product") {
      await products.updateOne(
        {},
        { $set: { [`${category}.$[elem].rating`]: ratingObject.rating } },
        { arrayFilters: [{ "elem.item_id": id }] }
      );
    }

    return res
      .status(200)
      .send({ success: true, message: "Thanks for your rating" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

app.put("/Cart/add", async (req, res) => {
  if (req.body.item_id && req.body.category && req.body.seller) {
    if (req.user.user_id === req.body.seller) {
      return res.send({
        success: false,
        message: "You can't purchase your own product",
      });
    } else {
      await usersData
        .findOne({ user_id: req.user.user_id })
        .then(async (user) => {
          if (user) {
            const isItemExist = user.cart.find(
              (item) => item.item_id === req.body.item_id
            );
            if (isItemExist) {
              res.send({
                success: false,
                message: "Item already added to cart",
              });
            } else {
              user.cart.push({
                item_id: req.body.item_id,
                category: req.body.category,
              });
              await user.save();
              res.send({ success: true, message: "Item added to cart" });
            }
          } else {
            res.send({ success: false, message: "User Not Found" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    res.send({ success: false, message: "Missing Data" });
  }
});

app.put("/Cart/remove", async (req, res) => {
  if (req.body.item_id) {
    await usersData
      .findOneAndUpdate(
        { user_id: req.user.user_id },
        {
          $pull: { cart: { item_id: req.body.item_id } },
        }
      )
      .then((updatedUser) => {
        if (updatedUser) {
          res.send({ success: true, message: "Item removed from cart" });
        } else {
          res.send({ success: false, message: "Item not found in cart" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ success: false, message: "Missing Data" });
  }
});

app.put("/Cart/quantity/change", async (req, res) => {
  if (req.body.item_id && req.body.quantityLimit && req.body.operation) {
    const user = await usersData.findOne({ user_id: req.user.user_id });
    const item = user.cart.find((item) => item.item_id === req.body.item_id);

    if (req.body.operation === "+") {
      if (item.quantity < req.body.quantityLimit) {
        item.quantity = item.quantity + 1;
      }
    }
    if (req.body.operation === "-") {
      if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
      }
    }

    await user.save();
    res.send({ success: true, message: "Quantity Changed" });
  } else {
    res.send({ success: false, message: "Missing Data" });
  }
});

app.use("/placeOrders", PlaceOrders);

app.use("/order", OrderStatus);

app.put("/profile/update", upload, async (req, res) => {
  const paymentDetails = JSON.parse(req.body.paymentDetails);
  if (
    req.body.userName &&
    req.body.phone &&
    req.body.age &&
    req.body.gender &&
    req.body.location &&
    req.body.address &&
    paymentDetails.upi &&
    paymentDetails.bank.accountNumber &&
    paymentDetails.bank.bankName &&
    paymentDetails.bank.ifscCode
  ) {
    usersData
      .updateOne(
        { user_id: req.user.user_id },
        {
          $set: {
            profileImage: req.file
              ? req.file.filename
              : req.body.oldProfileImage,
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            gender: req.body.gender,
            bio: req.body.bio,
            location: req.body.location,
            address: req.body.address,
            deliveryOption: req.body.deliveryOption,
            returnDays: req.body.returnDays,
            returnPolicy: req.body.returnPolicy,
            paymentDetails: {
              upi: paymentDetails.upi,
              bank: {
                accountNumber: paymentDetails.bank.accountNumber,
                bankName: paymentDetails.bank.bankName,
                ifscCode: paymentDetails.bank.ifscCode,
              },
            },
          },
        }
      )
      .then((userUpdated) => {
        if (userUpdated.modifiedCount > 0) {
          if (req.file) {
            if (req.body.oldProfileImage !== "default-profilePicture.jpeg") {
              const imagePath = path.join(
                __dirname,
                "uploads/profileImages",
                req.body.oldProfileImage
              );
              fs.unlink(imagePath, (err) => {
                console.log(err);
              });
            }
          }
          res.send({ success: true, message: "Profile Updated" });
        } else {
          res.send({ success: false, message: "Profile Not Updated" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ success: false, message: "Missing Data" });
  }
});

app.delete("/account/delete", async (req, res) => {
  const user = await usersData.findOne({ user_id: req.user.user_id });

  if (!user) {
    return res.send({ success: false, messsage: "User Not Found" });
  }

  if (user.sell.orders.length > 0 || user.buy.orders.length > 0) {
    return res.send({
      success: false,
      message: "Please complete your orders before deleting your account!!!",
    });
  }

  const unfinishedSellReturns = user.sell.returns.filter(
    (order) => order.returnStatus === "requested"
  );
  const unfinishedBuyReturns = user.buy.returns.filter(
    (order) => order.returnStatus === "requested"
  );

  if (unfinishedBuyReturns.length > 0) {
    return res.send({
      success: false,
      message: "Please complete your buy returns to delete the account!!!",
    });
  }

  if (unfinishedSellReturns.length > 0) {
    return res.send({
      success: false,
      message: "Please complete your sell returns to delete the account!!!",
    });
  }

  await usersData
    .findOneAndDelete({ user_id: req.user.user_id })
    .then(async (userDeleted) => {
      if (userDeleted) {
        if (userDeleted.profileImage !== "default-profilePicture.jpeg") {
          const userImagePath = path.join(
            __dirname,
            "uploads/profileImages",
            userDeleted.profileImage
          );
          fs.unlink(userImagePath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        const categories = [
          "Electronics",
          "Fashion",
          "Home_And_Garden",
          "Sports_And_Outdoors",
          "Toys_And_Hobbies",
          "Stationery",
        ];

        const pullOperation = categories.reduce((acc, category) => {
          acc[category] = { seller: req.user.user_id };
          return acc;
        }, {});

        await products
          .findOneAndUpdate({}, { $pull: pullOperation })
          .then(async (updatedProduts) => {
            if (updatedProduts) {
              const itemsToRemove = [];
              for (const category of categories) {
                if (updatedProduts[category]) {
                  updatedProduts[category].forEach((product) => {
                    if (product.seller === req.user.user_id) {
                      itemsToRemove.push({ item_id: product.item_id });
                      if (product.itemImage !== null) {
                        const imagePath = path.join(
                          __dirname,
                          "uploads/itemImages",
                          product.itemImage
                        );
                        fs.unlink(imagePath, (err) => {
                          if (err) {
                            console.log(
                              `Failed to delete image:${imagePath}`,
                              err
                            );
                          }
                        });
                      }
                    }
                  });
                }
              }

              if (itemsToRemove.length > 0) {
                await usersData.updateMany(
                  {},
                  {
                    $pull: {
                      cart: {
                        $or: itemsToRemove,
                        // .map(item => ({ item_id: item.item_id }))
                      },
                    },
                  }
                );
              }

              return res.send({
                success: true,
                message: "Account Deleted",
              });
            } else {
              return res.send({
                success: false,
                message: "Products Not Deleted",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500).send({
              success: false,
              message: "Products Not Deleted Error Occured",
            });
          });
      } else {
        res.send({ success: false, message: "Account Not Deleted" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .sendStatus(500)
        .send({ success: false, message: "Account Not Deleted Error Occured" });
    });
});

app.put("/item/add", uploadImage, async (req, res) => {
  if (
    req.file &&
    req.body.itemName &&
    req.body.price >= 0 &&
    req.body.quantity >= 1 &&
    req.body.description &&
    req.body.deliveryCharge >= 0 &&
    req.body.tags &&
    req.body.category &&
    req.body.condition
  ) {
    const user = await usersData.findOne({ email: req.user.email });
    const item_id = generateUniqueId();
    products
      .findOneAndUpdate(
        {},
        {
          $push: {
            [req.body.category]: {
              item_id: item_id,
              created_at: Date.now(),
              itemImage: req.file ? req.file.filename : null,
              itemName: req.body.itemName,
              price: req.body.price || 0,
              discount: req.body.discount || 0,
              quantity: req.body.quantity || 1,
              description: req.body.description || null,
              tags: req.body.tags,
              location: req.body.location || user.location,
              category: req.body.category,
              condition: req.body.condition,
              returnDays: req.body.returnDays || user.returnDays,
              deliveryOption: req.body.deliveryOption || user.deliveryOption,
              deliveryCharge: req.body.deliveryCharge,
              seller: req.user.user_id,
            },
          },
        },
        { new: true }
      )
      .then(async () => {
        await user.updateOne({
          $push: {
            listedItems: { item_id: item_id, category: req.body.category },
          },
        });
        await user.save();
        res.send({ success: true, message: "Item Added" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ success: false, message: " Please fill all required fields" });
  }
});

app.put("/item/update", uploadImage, async (req, res) => {
  if (
    req.body.itemName &&
    req.body.price >= 0 &&
    req.body.quantity >= 1 &&
    req.body.description &&
    req.body.tags &&
    req.body.location &&
    req.body.category &&
    req.body.condition &&
    req.body.returnDays &&
    req.body.deliveryOption &&
    req.body.deliveryCharge >= 0
  ) {
    const categories = [
      "Electronics",
      "Fashion",
      "Home_And_Garden",
      "Sports_And_Outdoors",
      "Toys_And_Hobbies",
      "Stationery",
    ];

    const pullOperation = categories.reduce((acc, category) => {
      acc[category] = { item_id: req.body.item_id };
      return acc;
    }, {});

    await products
      .updateOne(
        {},
        {
          $pull: pullOperation,
        }
      )
      .then(async () => {
        await products
          .updateOne(
            {},
            {
              $push: {
                [req.body.category]: {
                  item_id: req.body.item_id,
                  itemImage: req.file
                    ? req.file.filename
                    : req.body.oldItemImage,
                  itemName: req.body.itemName,
                  price: req.body.price ? req.body.price : 0,
                  discount: req.body.discount ? req.body.discount : 0,
                  quantity: req.body.quantity || 1,
                  description: req.body.description,
                  tags: req.body.tags,
                  location: req.body.location,
                  category: req.body.category,
                  condition: req.body.condition,
                  returnDays: req.body.returnDays,
                  deliveryOption: req.body.deliveryOption,
                  deliveryCharge: req.body.deliveryCharge,
                  created_at: req.body.created_at,
                  seller: req.body.seller,
                },
              },
            }
          )
          .then(async (isUpdated) => {
            if (isUpdated.modifiedCount > 0) {
              if (req.file) {
                if (req.body.oldItemImage !== null) {
                  const imagePath = path.join(
                    __dirname,
                    "uploads/itemImages",
                    req.body.oldItemImage
                  );
                  fs.unlink(imagePath, (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                }
              }
              const updateUser = await usersData.updateOne(
                {
                  email: req.user.email,
                  "listedItems.item_id": req.body.item_id,
                },
                { $set: { "listedItems.$.category": req.body.category } }
              );

              await usersData.updateMany(
                {
                  "cart.item_id": req.body.item_id,
                },
                { $set: { "cart.$.category": req.body.category } }
              );

              res.send({
                success: true,
                message: "Item Updated",
              });
            } else {
              console.log("No Modification Done");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ success: false, message: "Please fill all required fields" });
  }
});

app.delete("/item/delete", async (req, res) => {
  const { item_id, category, image } = req.body;

  if (item_id && category && image) {
    await products
      .updateOne({}, { $pull: { [category]: { item_id: item_id } } })
      .then(async (productUpdated) => {
        if (productUpdated.modifiedCount > 0) {
          await usersData.updateOne(
            { email: req.user.email },
            { $pull: { ["listedItems"]: { item_id: item_id } } }
          );
          if (image !== null) {
            const imagePath = path.join(__dirname, "uploads/itemImages", image);

            fs.unlink(imagePath, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
          await usersData.updateMany(
            { "cart.item_id": item_id },
            { $pull: { ["cart"]: { item_id: item_id } } }
          );
          res.send({ success: true, message: " Item Deleted" });
        } else {
          res.send({ success: false, message: " Item not Deleted" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send({ success: false, message: "Missing Data" });
  }
});

app.listen(8000, () => {
  console.log("Server Started at port 8000");
});
